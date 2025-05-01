from django.db import models

# Create your models here.
class Task(models.Model):
    username = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()
    effort_to_finish = models.IntegerField()
    due_date = models.DateField()

    def __str__(self):
        return self.title