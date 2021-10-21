from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    return render(request=request,template_name="principal/index.html")

def calculadora(request):
    return render(request=request,template_name="principal/calculadora.html")

def aprendaeconomizar(request):
    return render(request=request,template_name="principal/aprendaeconomizar.html")

def resultados(request):
    return render(request=request,template_name="principal/resultados.html")

def referencias(request):
    return render(request=request,template_name="principal/referencias.html")

def sobre(request):
    return render(request=request,template_name="principal/sobre.html")

def pagina_inexistente(request):
    return render(request=request, template_name="principal/nonexistent_page.html")