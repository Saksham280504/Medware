from django.urls import path
from .views import predict, insert_patient_data, train, health_check

app_name = "DiseasePredictor"

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('prediction/<str:symptoms>/', predict, name='prediction'),
    path('insertpd/', insert_patient_data, name='insert_patient_data'),
    path('train/', train, name='train_model'),
]
