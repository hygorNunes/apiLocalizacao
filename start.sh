#!/bin/sh

cd /app

touch .env

echo APP_NAME=${APP_NAME} >> .env
echo NODE_ENV=production >> .env
echo BASE_PATH=${BASE_PATH}
echo DATABASE_MONGO_CONNECTION_STRING=mongodb://${MONGODB_USER}:${MONGODB_PASS}${MONGODB_URL}:27017/${MONGODB_DB} >> .env
echo DATABASE_CONNECTION_STRING=mysql://${MARIADB_USER}:${MARIADB_PASS}@${MARIADB_HOST}:3306/${MARIADB_DB} >> .env
echo SECRET=${SECRET_TOKEN} >> .env
echo PORT=${PORT_API} >> .env

echo SMTP_SERVER=${SMTP_SERVER} >> .env
echo SMTP_PORT=${SMTP_PORT} >> .env
echo SMTP_USER=${SMTP_USER} >> .env
echo SMTP_PASS=${SMTP_PASS} >> .env
echo SMTP_SECURE=${SMTP_SECURE} >> .env

echo ONESIGNAL_API_ID=${ONESIGNAL_API_ID} >> .env
echo ONESIGNAL_HOST=${ONESIGNAL_HOST} >> .env
echo ONESIGNAL_PATH=${ONESIGNAL_PATH} >> .env
echo ONESIGNAL_PORT=${ONESIGNAL_PORT} >> .env
echo ONESIGNAL_TOKEN=${ONESIGNAL_TOKEN} >> .env

NODE_ENV=production npm run start;