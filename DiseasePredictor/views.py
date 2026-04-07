from Accounts.models import SymptomsDiseases, PredictedDiseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
import csv
from django.db import transaction
import os
import pickle


MODEL_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), "model.pkl")


# =====================================================
# HEALTH CHECK - DEBUG ENDPOINT
# =====================================================
@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """Debug endpoint to verify authentication status"""
    user_info = {
        "is_authenticated": request.user.is_authenticated,
        "user": str(request.user) if request.user else "AnonymousUser",
        "session_key": request.session.session_key,
    }
    return Response(user_info)


# =====================================================
# INSERT TRAINING DATA INTO DATABASE
# =====================================================
def insert_patient_data(request):
    data_path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        "Training.csv"
    )

    with open(data_path, "r") as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row

        with transaction.atomic():
            for row in reader:
                symptom_values = [int(value) for value in row[:-1]]
                prognosis = row[-1]

                field_names = [
                    field.name
                    for field in SymptomsDiseases._meta.get_fields()
                    if field.name not in ["id", "prognosis"]
                ]

                field_values = dict(zip(field_names, symptom_values))

                SymptomsDiseases.objects.create(
                    prognosis=prognosis,
                    **field_values
                )

    return render(request, "index.html")


# =====================================================
# DATA SCALING
# =====================================================
def scale_dataset(dataframe, oversample=False):
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    data = np.hstack((X, np.reshape(y, (-1, 1))))
    return data, X, y


# =====================================================
# TRAIN MODEL
# =====================================================
def train(request):
    # Load training data directly from CSV file (all 129 symptoms)
    csv_path = os.path.join(os.path.dirname(__file__), 'Training.csv')
    data = pd.read_csv(csv_path)

    _, X, Y = scale_dataset(data)

    svm_model = SVC(probability=True)
    svm_model.fit(X, Y)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(svm_model, f)

    return render(request, "index.html")


# =====================================================
# PREDICT DISEASE
# =====================================================
@api_view(["GET"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def predict(request, symptoms=""):
    try:
        # Debug: Check if user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {"error": "User not authenticated. Session may be invalid."},
                status=401
            )

        if not os.path.exists(MODEL_PATH):
            return Response({"error": "Model not trained yet."})

        with open(MODEL_PATH, "rb") as f:
            svm_model = pickle.load(f)

        # Convert symptoms string (binary format expected)
        x = np.asarray(list(symptoms), dtype=np.int_)
        x = x.reshape(1, -1)

        Y_ = svm_model.predict(x)
        probas = svm_model.predict_proba(x)

        top5_indices = np.argsort(probas, axis=1)[:, -5:]
        top5_values = np.take_along_axis(probas, top5_indices, axis=1)
        top5_labels = svm_model.classes_[top5_indices]

        pd_list = top5_labels[0][::-1].tolist()
        predicted_disease = pd_list[0]
        pd_prob = top5_values[0][::-1].astype(float).tolist()

        # =====================================================
        # DOCTOR MAPPING
        # =====================================================
        doctor_map = {
            "Rheumatologist": ["Osteoarthristis", "Arthritis"],
            "Cardiologist": ["Heart attack", "Bronchial Asthma", "Hypertension"],
            "ENT specialist": ["(vertigo) Paroymsal Positional Vertigo", "Hypothyroidism"],
            "Neurologist": ["Varicose veins", "Paralysis (brain hemorrhage)", "Migraine"],
            "Allergist/Immunologist": ["Allergy", "Pneumonia", "AIDS", "Common Cold"],
            "Urologist": ["Urinary tract infection"],
            "Dermatologist": ["Acne", "Chicken pox", "Fungal infection", "Psoriasis", "Impetigo"],
            "Gastroenterologist": [
                "Peptic ulcer diseae", "GERD", "Chronic cholestasis",
                "Alcoholic hepatitis", "Jaundice",
                "Hepatitis B", "Hepatitis C"
            ],
        }

        consultdoctor = "Other"

        for doctor, diseases in doctor_map.items():
            if predicted_disease in diseases:
                consultdoctor = doctor
                break

        # =====================================================
        # SAVE PREDICTION (per user, not global)
        # =====================================================
        user = request.user if request.user.is_authenticated else None

        if user:
            PredictedDiseases.objects.filter(user=user).delete()
            PredictedDiseases.objects.create(
                user=user,
                diseases=pd_list,
                diseases_prob=pd_prob,
                consult_doctor=consultdoctor
            )
            data = PredictedDiseases.objects.filter(user=user)
        else:
            data = [PredictedDiseases(
                diseases=pd_list,
                diseases_prob=pd_prob,
                consult_doctor=consultdoctor
            )]

        serializer = PredictionSerializer(data, many=True)

        return Response(serializer.data)
    except Exception as e:
        import traceback
        error_msg = f"Prediction error: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return Response(
            {"error": str(e), "details": traceback.format_exc()},
            status=500
        )
