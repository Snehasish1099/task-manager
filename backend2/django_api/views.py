from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class StandardResponseMixin:
    def format_response(self, data, message="Success", status_code=status.HTTP_200_OK, error=False):
        return Response(
            {
                "status": status_code,
                "error": error,
                "data": data,
                "message": message
            },
            status=status_code
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return self.format_response([], "No data found.", status.HTTP_404_NOT_FOUND, error=True)
        
        serializer = self.get_serializer(queryset, many=True)
        return self.format_response(serializer.data, "Data available.")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.format_response(serializer.data, "Data available.")
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return self.format_response(response.data, "Data created successfully.", status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return self.format_response(response.data, "Data updated successfully.", response.status_code)

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return self.format_response(response.data, "Data deleted successfully.", status.HTTP_200_OK)
    
    
class TaskViewSet(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # permission_classes = [IsAuthenticated] 
