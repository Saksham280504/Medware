"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import index, load_icon
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('admin/', admin.site.urls),

    # Main React entry
    path('', index),

    # Apps
    path('', include("Accounts.urls")),
    path('', include("DiseasePredictor.urls")),

    # Frontend routes handled by React
    path("contactdoctor/", index),
    path("dashboard/", index),

    # Favicon / icon
    path(
        "icon.svg",
        RedirectView.as_view(
            url=staticfiles_storage.url("icon.svg")
        )
    ),
]

