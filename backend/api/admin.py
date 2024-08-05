from django.contrib import admin
from .models import CustomUser, Category, Article, Tag
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(Tag)