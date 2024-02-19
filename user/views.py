from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from django.contrib.auth.hashers import make_password, check_password


# Create your views here.
class Join(APIView):
    def get(self, request):
        return render(request, "user/join.html")
    
    # 회원 가입
    def post(self, request):
        email= request.data.get('email', None)
        nickname = request.data.get('nickname', None) 
        name = request.data.get('name', None)
        password = request.data.get('password', None)
        
        User.objects.create(email=email,nickname=nickname,name=name,password=make_password(password),profile_image='default_profile.jpg')
        
        return Response(status=200)

class Login(APIView):
    def get(self, request):
        return render(request, "user/login.html")
    
    # 로그인
    def post(self,request):
        email= request.data.get('email', None)
        password = request.data.get('password', None)
        
        user=User.objects.filter(email=email).first()
        
        if user is None:
            return Response(status=400,data=dict(message="가입하지 않거나, 잘못된 이메일 입니다."))
        
        if user.check_password(password):
            # 로그인을 했다. 세션이나 쿠키에 로그인정보 적용
            request.session['email']=email
            return Response(status=200)
        else:
            return Response(status=400,data=dict(message="이메일이나 패스워드가 틀렸습니다."))
        
        
class LogOut(APIView):
    def get(self, request):
        request.session.flush()
        return render(request, "user/login.html")