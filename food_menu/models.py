from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Avg

category_choice = (
    ('burger', "burger"),
    ('roll', "roll"),
    ('lanch', "lanch"),
    ('salat', "salat"),
    ('drinks', "drinks"),
)

class Item_food(models.Model):
    class Meta():
        db_table = 'food'
    avatar = models.ImageField(upload_to='img',verbose_name='аватарка',default='img/standart.png', blank=False, null=True)
    name = models.CharField(verbose_name='имя',max_length=100,default='')
    choices = models.CharField(verbose_name='категория',max_length=9,choices=category_choice)
    price = models.IntegerField(verbose_name='цена')
    about_item = models.CharField(verbose_name='о товаре',max_length=300,default='')
    kkal = models.IntegerField(verbose_name='калории')
    fats = models.IntegerField(verbose_name='жиры')
    proteins = models.IntegerField(verbose_name='белки')
    carbohydrates = models.IntegerField(verbose_name='углеводы')

class Composition_food(models.Model):
    class Meta():
        db_table = 'Composition_food'
    item_food = models.ForeignKey(Item_food, on_delete=models.CASCADE)
    component  = models.CharField(verbose_name='компонент',max_length=100,default='')