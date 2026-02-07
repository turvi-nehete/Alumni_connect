#!/bin/bash
set -o errexit

echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Installing Backend..."
cd backend
pip install -r requirements.txt
python3 manage.py collectstatic --noinput
python3 manage.py migrate
echo "Build Completed!"
