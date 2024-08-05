from django.urls import path

from .views import (
    ArticleListView,
    ArticleRetreiveView,
    ArticleUpdateView,
    ArticleDeleteView,
    ArticleCreateView,
    UserListView,
    CreateUserView,
)



urlpatterns=[
         
      path('articles/',ArticleListView.as_view(), name='articles'),
      path('articles/<str:pk>/',ArticleRetreiveView.as_view(), name='article-detail'),
      path('articles/create/', ArticleCreateView.as_view , name='article-create'),  
      path('articles/<str:pk>/update/', ArticleUpdateView.as_view(), name='article-update'),
      path('articles/<str:pk>/delete/',ArticleDeleteView.as_view(), name='article-delete') ,
      path('users/',UserListView.as_view(), name='users'),
]