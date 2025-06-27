from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model 
User = get_user_model()
from rest_framework import serializers
from .models import MakeUp, Cosmetic, Bundle, Offer

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret


class RegisterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id','email','password')
        extra_kwargs = { 'password': {'write_only':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

    # backend_api/serializers.py


class MakeUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = MakeUp
        fields = '__all__'

class CosmeticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosmetic
        fields = '__all__'

class BundleSerializer(serializers.ModelSerializer):
    products = CosmeticSerializer(many=True, read_only=True)
    product_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Cosmetic.objects.all(), source='products'
    )

    image = serializers.ImageField(required=False)  # ✅ Add this line

    class Meta:
        model = Bundle
        fields = ['id', 'title', 'products', 'product_ids', 'offer_price', 'image'] 

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'
