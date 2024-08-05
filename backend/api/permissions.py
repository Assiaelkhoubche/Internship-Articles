
from rest_framework.permissions import BasePermission, DjangoModelPermissions

class IsUserManager(BasePermission):

    def has_permission(self, request, view):
        return request.user.groups.filter(name='userManager').exists();


class IsUserCustomer(BasePermission):

    def has_permission(self, request,view):
        return request.user.groups.filter(name='userCustomer').exists();
    


class IsUserManagerWithModelPermission(DjangoModelPermissions):
    def has_permission(self, request,view):
        if request.user.groups.filter(name='userManager').exists():
            return True
        return False
