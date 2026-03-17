from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


# =========================
# Full Registration Validation
# =========================
def custom_validation(data):
    email = data.get("email", "").strip()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    # Email validation
    if not email:
        raise ValidationError("An email is required.")

    if UserModel.objects.filter(email=email).exists():
        print(UserModel.objects.filter(email=email).exists())
        raise ValidationError("Choose another email.")

    # Password validation
    if not password or len(password) < 8:
        raise ValidationError("Choose another password. Minimum 8 characters required.")

    # Username validation
    if not username:
        raise ValidationError("Choose another username.")

    return data


# =========================
# Individual Field Validators
# =========================
def validate_email(data):
    email = data.get("email", "").strip()

    if not email:
        raise ValidationError("An email is needed.")

    if UserModel.objects.filter(email=email).exists():
        raise ValidationError("This email is already in use.")

    return True


def validate_username(data):
    username = data.get("username", "").strip()

    if not username:
        raise ValidationError("Choose another username.")

    return True


def validate_password(data):
    password = data.get("password", "").strip()

    if not password:
        raise ValidationError("A password is needed.")

    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long.")

    return True
