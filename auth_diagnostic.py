#!/usr/bin/env python
"""
Authentication Diagnostic Script
Run this in Django shell to verify session authentication is working
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.test import Client
from rest_framework.test import APIClient

UserModel = get_user_model()

print("=" * 60)
print("AUTHENTICATION DIAGNOSTIC TEST")
print("=" * 60)

# Test 1: Check if AppUser exists
print("\n[TEST 1] Checking for test user...")
try:
    user = UserModel.objects.get(email="test@test.com")
    print("✓ Test user found: test@test.com")
except UserModel.DoesNotExist:
    print("✗ Test user NOT found. Creating one...")
    user = UserModel.objects.create_user(
        email="test@test.com",
        username="testuser",
        password="Test@1234"
    )
    print(f"✓ Created test user: {user.email}")

# Test 2: Check Django Session
print("\n[TEST 2] Testing Django REST Framework Session Authentication...")
client = APIClient()

# Try to access protected endpoint without auth
print("  - Testing /user/ without authentication...")
response = client.get('/user/')
print(f"    Response: {response.status_code}")
if response.status_code == 403:
    print("    ✓ Correctly rejected unauthenticated request")
else:
    print(f"    ✗ Unexpected response: {response.data}")

# Test 3: Test Login
print("\n[TEST 3] Testing login flow...")
login_data = {
    'email': 'test@test.com',
    'password': 'Test@1234'
}
response = client.post('/login/', login_data)
print(f"  - Login response: {response.status_code}")
if response.status_code == 200:
    print("    ✓ Login successful")
    print(f"    Response data: {response.data}")
else:
    print(f"    ✗ Login failed: {response.data}")

# Test 4: Check if session cookie is set
print("\n[TEST 4] Checking session storage...")
if hasattr(client, 'cookies'):
    cookies = client.cookies
    print(f"  - Cookies stored: {len(cookies)} cookies")
    for cookie_name in cookies:
        print(f"    • {cookie_name}")
    if 'sessionid' in cookies:
        print("    ✓ Session ID cookie is present")
    else:
        print("    ✗ Session ID cookie is MISSING!")

# Test 5: Test authenticated endpoint after login
print("\n[TEST 5] Testing authenticated endpoint after login...")
response = client.get('/user/')
print(f"  - /user/ response: {response.status_code}")
if response.status_code == 200:
    print("    ✓ Authentication successful!")
    print(f"    User data: {response.data}")
else:
    print(f"    ✗ Authentication failed: {response.data}")

# Test 6: Check CORS settings
print("\n[TEST 6] Checking CORS and Session Settings...")
from django.conf import settings
print(f"  - CORS_ALLOW_CREDENTIALS: {settings.CORS_ALLOW_CREDENTIALS}")
print(f"  - CORS_ALLOWED_ORIGINS: {settings.CORS_ALLOWED_ORIGINS}")
print(f"  - SESSION_COOKIE_SAMESITE: {settings.SESSION_COOKIE_SAMESITE}")
print(f"  - SESSION_COOKIE_SECURE: {settings.SESSION_COOKIE_SECURE}")
print(f"  - CSRF_COOKIE_SAMESITE: {settings.CSRF_COOKIE_SAMESITE}")

print("\n" + "=" * 60)
print("DIAGNOSTIC COMPLETE")
print("=" * 60)
