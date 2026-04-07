from django.db import connection
from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from django.http import JsonResponse

from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserSerializer,
    PatientSerializer,
    DoctorProfileSerializer,
)

from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile, AppUser

UserModel = get_user_model()


# =========================
# USER REGISTER
# =========================
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


# =========================
# USER LOGIN
# =========================
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        print(f"Login attempt with data: {request.data}")

        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            login(request, user)

            # Ensure session is saved
            request.session.save()
            print(f"Session created: {request.session.session_key}")
            print(f"User authenticated: {request.user}")

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_400_BAD_REQUEST
        )


# =========================
# USER LOGOUT
# =========================
class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


# =========================
# CURRENT USER VIEW
# =========================
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)


# =========================
# CHECK EMAIL
# =========================
def check_email(request):
    email = request.GET.get("email")

    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        return JsonResponse({"email_exists": email_exists})

    return JsonResponse(
        {"error": "Email parameter is missing"},
        status=400
    )


# =========================
# PATIENT PROFILE
# =========================
class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        profile = getattr(request.user, "patientprofile", None)

        if not profile:
            return Response(
                {"error": "User does not have a profile"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        profile = request.user.patientprofile

        serializer = PatientSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# DOCTOR LIST VIEW
# =========================
class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get("sp", "")

        if speciality == "All":
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(
                speciality__iexact=speciality
            )

        return queryset.order_by("?")[:12]


# =========================
# INSERT SAMPLE DOCTOR DATA
# =========================
def insert_data(request):
    query = """
    INSERT INTO Accounts_doctorprofile
    (name, speciality, gender, experience, address, city, state, country)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """

    values = [
        ("Dr. John Smith", "Family Medicine", "male", 15, "123 Main St", "New York", "NY", "USA"),
        ("Dr. Emma Thompson", "Family Medicine", "female", 12, "456 Elm St", "Los Angeles", "CA", "USA"),
        ("Dr. Michael Johnson", "Pediatrician", "male", 18, "789 Oak St", "Chicago", "IL", "USA"),
        ("Dr. Olivia Davis", "Gynecologist", "female", 25, "321 Maple St", "Houston", "TX", "USA"),
        ("Dr. Benjamin Smith", "Cardiologist", "male", 22, "654 Pine St", "Boston", "MA", "USA"),
    ]

    with connection.cursor() as cursor:
        cursor.executemany(query, values)

    return render(request, "index.html")


# =========================
# CHECK ADMIN
# =========================
def check_admin(request):
    email = request.GET.get("email")

    if email:
        try:
            user = AppUser.objects.get(email=email)
            return JsonResponse({
                "email_exists": True,
                "is_superuser": user.is_superuser
            })

        except AppUser.DoesNotExist:
            return JsonResponse({
                "email_exists": False,
                "is_superuser": False
            })

    return JsonResponse(
        {"error": "Email parameter is missing"},
        status=400
    )
