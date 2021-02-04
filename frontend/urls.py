from django.urls import path
from .views import index

app_name = 'frontend'
urlpatterns = [
    path('', index),
    path('list', index),
    path('draft', index),
    path('data', index),
    path('mockdraft', index),
]
