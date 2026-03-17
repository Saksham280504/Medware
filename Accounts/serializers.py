from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import PatientProfile, PredictedDiseases, DoctorProfile

UserModel = get_user_model()


# =========================
# User Register Serializer
# =========================
class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ("email", "username", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"]
        )
        user_obj.username = validated_data["username"]
        user_obj.save()
        return user_obj


# =========================
# User Login Serializer
# =========================
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data["email"],  # because USERNAME_FIELD = 'email'
            password=data["password"]
        )

        if not user:
            raise ValidationError("Invalid credentials")

        data["user"] = user
        return data


# =========================
# Basic User Serializer
# =========================
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ("email", "username")


# =========================
# Patient Serializer
# =========================
class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientProfile
        fields = "__all__"

    def create(self, validated_data):
        user = self.context["request"].user
        profile = PatientProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# =========================
# Prediction Serializer
# =========================
class PredictionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PredictedDiseases
        fields = ("diseases", "diseases_prob", "consult_doctor")


# =========================
# Doctor Profile Serializer
# =========================
class DoctorProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorProfile
        fields = "__all__"
