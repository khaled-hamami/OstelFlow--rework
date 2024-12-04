from graphql_relay import from_global_id
from django_filters import FilterSet, CharFilter, BooleanFilter
from graphene_django import DjangoObjectType
from .models import Hotel
from django.db.models import Exists
import graphene
from django.db import models


class HasImagesFilter(BooleanFilter):
    def filter(self, qs, value):
        if value is not None:
            qs = qs.annotate(has_images=Exists("images")).filter(has_images=value)
        return qs


class HotelFilter(FilterSet):
    images = HasImagesFilter()

    class Meta:
        model = Hotel
        fields = {
            "name": ["exact", "icontains", "istartswith"],
            "description": ["exact", "icontains", "istartswith"],
            "price": ["exact", "lt", "gt"],
            "location": ["exact", "icontains", "istartswith"],
            "rating": ["exact", "lt", "gt"],
            "type": ["exact", "icontains", "istartswith"],
            "preference": ["exact", "icontains", "istartswith"],
        }


class HotelType(DjangoObjectType):
    class Meta:
        model = Hotel
        fields = "__all__"
        interfaces = (graphene.relay.Node,)


from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    all_hotels = DjangoFilterConnectionField(HotelType, filterset_class=HotelFilter)
    hotel = graphene.Field(HotelType, id=graphene.String(required=True))

    def resolve_hotel(self, info, id):
        _, id = from_global_id(id)

        if id:
            return Hotel.objects.get(pk=id)
        else:
            raise Exception("Invalid ID")


schema = graphene.Schema(query=Query)
