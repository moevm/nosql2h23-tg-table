#!/bin/bash
pip install -r requirements.txt
cd src
gunicorn --workers 1 --worker-class uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000