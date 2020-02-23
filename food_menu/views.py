from django.shortcuts import render , redirect
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import FormView
from django.contrib.auth import authenticate, login
from .models import *
from django.contrib.auth.models import User
#from .forms import *
from django.http import JsonResponse


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def food_menu(request):
    args = {}
    user = auth.get_user(request)
    print(request.data)
    print(request.data.dict()['page'])
    if request.data.dict()['page'] == '2':
        return render(request, 'about_us.html', args)
    elif request.data.dict()['page'] == '3':
        return render(request, 'stocks.html', args)
    elif request.data.dict()['page'] == '4':
        return render(request, 'quality.html', args)

@api_view(['POST'])
def listItem(request):
    args = {}
    user = auth.get_user(request)
    if request.method == 'POST':
        args["newData"] = {}
        category_choice = ['burger','roll','lanch','salat','drinks']
        listItem = Item_food.objects.filter(choices = category_choice[int(request.data.dict()['page']) - 1])
        for item in listItem:
            listComponent = Composition_food.objects.filter(item_food = item)
            array = []
            for i in listComponent:
                array.append(i.component)
            args["newData"][item.id] = ({'id':item.id,'listComponent': array, 'avatarUrl':item.avatar.url,'name':item.name,'price':item.price,'about_item':item.about_item,'kkal':item.kkal,'fats':item.fats,'proteins':item.proteins,'carbohydrates':item.carbohydrates})
        return Response(args, status=status.HTTP_200_OK)
