from django.contrib import admin
from django.urls import path
from django.conf.urls import url,include
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path('', views.main),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
