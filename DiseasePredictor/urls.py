from django.urls import path
from .views import predict, insert_patient_data, train

app_name = "DiseasePredictor"

urlpatterns = [
    path('prediction/<str:symptoms>/', predict, name='prediction'),
    path('insertpd/', insert_patient_data, name='insert_patient_data'),
    path('train/', train, name='train_model'),
]
