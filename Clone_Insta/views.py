from django.shortcuts import render
from rest_framework.views import APIView


class Sub(APIView):
    def get(self,request):
        print('get')
        return render(request, 'clone_insta/main.html')

    def post(self,request):
        print('post')
        return render(request, 'clone_insta/main.html')