#!/bin/bash
set -o errexit

echo "Using Pre-built Frontend (Skipping npm install)..."
# We expect frontend/dist to be committed to the repo now.

echo "Installing Backend..."
cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
echo "Build Completed!"
