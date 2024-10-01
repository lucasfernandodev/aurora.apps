#!/usr/bin/sh

docker build -t aurora.app:1.0 . && docker-compose up -d