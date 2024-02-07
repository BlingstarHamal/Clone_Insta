from django.shortcuts import render
from rest_framework.views import APIView
from .models import Feed # .models 해당 앱 내의 모델

# Create your views here.
class Main(APIView):
    def get(self,request):
        feed_list = Feed.objects.all() 
        # print(feed_list)
        
        for feed in feed_list:
            print(feed.content)
            
        return render(request, 'clone_insta/main.html',context=dict(feeds=feed_list))