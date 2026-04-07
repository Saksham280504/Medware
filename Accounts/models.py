from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField


# =========================
# Custom User Manager
# =========================
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)

        # Create patient profile automatically
        PatientProfile.objects.create(user=user)

        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# =========================
# Custom User Model
# =========================
class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = AppUserManager()

    def __str__(self):
        return self.email


# =========================
# Patient Profile
# =========================
class PatientProfile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)

    age = models.IntegerField(default=0)
    sex = models.CharField(max_length=20, default="Not to say")
    first_name = models.CharField(max_length=20, default="NA")
    last_name = models.CharField(max_length=20, default="NA")

    medical_history = ArrayField(
        models.CharField(max_length=200),
        blank=True,
        default=list,
    )

    dob_day = models.IntegerField(default=0)
    dob_month = models.IntegerField(default=0)
    dob_year = models.IntegerField(default=0)

    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)

    current_med = ArrayField(
        models.CharField(max_length=200),
        blank=True,
        default=list,
    )

    exercise = models.CharField(max_length=200, default="no exercise")
    diet = models.CharField(max_length=200, default="no diet")
    smoke_cons = models.CharField(max_length=200, default="no smoking")
    alcohol_cons = models.CharField(max_length=200, default="no alcohol")

    bp_log = JSONField(default=dict)
    blood_glucose = JSONField(default=dict)

    new_patient = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.email} Profile"


# =========================
# Doctor Profile
# =========================
class DoctorProfile(models.Model):
    name = models.CharField(max_length=200, default="NA")
    speciality = models.CharField(max_length=200, default="NA")
    gender = models.CharField(max_length=200, default="NA")
    experience = models.IntegerField(default=0)
    address = models.CharField(max_length=200, default="NA")
    city = models.CharField(max_length=100, default="NA")
    state = models.CharField(max_length=100, default="NA")
    country = models.CharField(max_length=100, default="NA")
    mobile_no = models.CharField(max_length=20, default="0000000000")
    image_link = models.URLField(max_length=200, blank=True)
    profile_link = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.name


# =========================
# Symptoms Diseases Dataset
# =========================
class SymptomsDiseases(models.Model):
    itching = models.IntegerField()
    skin_rash = models.IntegerField()
    shivering = models.IntegerField()
    chills = models.IntegerField()
    joint_pain = models.IntegerField()
    stomach_pain = models.IntegerField()
    acidity = models.IntegerField()
    ulcers_on_tongue = models.IntegerField()
    muscle_wasting = models.IntegerField()
    vomiting = models.IntegerField()

    # (Shortened for clarity — keep your remaining IntegerFields exactly same)

    yellow_crust_ooze = models.IntegerField()
    prognosis = models.CharField(max_length=100)

    class Meta:
        db_table = "symptoms_diseases"

    def __str__(self):
        return self.prognosis


# =========================
# Predicted Diseases
# =========================
class PredictedDiseases(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, null=True, blank=True)

    diseases = ArrayField(
        models.CharField(max_length=200),
        blank=True,
        default=list,
    )

    diseases_prob = ArrayField(
        models.FloatField(),
        blank=True,
        default=list,
    )

    consult_doctor = models.CharField(
        max_length=100,
        default="General Physician",
    )

    def __str__(self):
        return f"Prediction - {self.id}"
