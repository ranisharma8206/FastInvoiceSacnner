#! /bin/bash

export FLASK_APP=application.py
export FLASK_ENV=development

flask run --host=0.0.0.0
