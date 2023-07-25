from django.shortcuts import render
from django.http import JsonResponse

import requests

# Create your views here.

def main_page(request):
    return render(request, 'index.html')


def query(request):
    word = request.GET['word']

    url = f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}'
    r = requests.get(url)

    try:
        response = r.json()[0]
    except:
        return JsonResponse({'error': f'Cannot find the word "{word}" in dictionary database.'})
    
    return JsonResponse({'wordInfo': response})

