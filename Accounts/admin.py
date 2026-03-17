from django.contrib import admin
from .models import (
    AppUser,
    PatientProfile,
    DoctorProfile,
    SymptomsDiseases,
    PredictedDiseases,
)


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ("user_id", "email", "username", "is_staff")
    search_fields = ("email",)


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "age", "sex", "new_patient")


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "speciality", "experience")


@admin.register(SymptomsDiseases)
class SymptomsDiseasesAdmin(admin.ModelAdmin):
    list_display = ("prognosis",)


@admin.register(PredictedDiseases)
class PredictedDiseasesAdmin(admin.ModelAdmin):
    list_display = ("id", "consult_doctor")
