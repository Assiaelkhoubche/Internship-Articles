from rest_framework.serializers import ModelSerializer
from .models import CustomUser



class UserSerializer(ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','username','password','email', 'is_pro']
        extra_kwargs={'password':{'write_only':True}}
    
    def create(self,validate_data):
        user=CustomUser.objects.create_user(**validate_data)
        return user