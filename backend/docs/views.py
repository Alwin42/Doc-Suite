import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt # Temporary: for APIs you generally use proper token CSRF handling later
def verify_pin(request):
    if request.method == 'POST':
        # 1. Parse the JSON sent by React
        data = json.loads(request.body)
        user_pin = data.get('pin')

        # 2. Check the PIN (Ideally against a hashed value in your database)
        if user_pin == "123456": # Master PIN logic here
            # 3. Return a success signal and a token
            return JsonResponse({
                "message": "Authentication successful", 
                "token": "generate-a-secure-jwt-here"
            }, status=200)
        else:
            # 4. Return an error for wrong PINs
            return JsonResponse({"error": "Invalid PIN"}, status=401)