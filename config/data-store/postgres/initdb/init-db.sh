#!/bin/bash
set -e

PGPASSWORD="$(cat /run/secrets/postgres-superuser-password)" psql -v ON_ERROR_STOP=1 \
    -v APP_DB_NAME="$POSTGRES_APPLICATION_DATABASE_NAME" \
    -f '/docker-entrypoint-initdb.d/sql/create-app-db.sql'


PGPASSWORD="$(cat /run/secrets/postgres-superuser-password)" psql -d $POSTGRES_APPLICATION_DATABASE_NAME \
    -v ON_ERROR_STOP=1 \
    -v ADMIN_USER="$POSTGRES_ADMIN_USER" \
    -v ADMIN_PWORD="'$(cat /run/secrets/postgres-admin-password)'" \
    -v APP_DB_NAME="$POSTGRES_APPLICATION_DATABASE_NAME" \
    -v APP_SCHEMA="$POSTGRES_APPLICATION_SCHEMA_NAME" \
    -f '/docker-entrypoint-initdb.d/sql/create-admin-user.sql'

PGPASSWORD="$(cat /run/secrets/postgres-admin-password)" psql -d $POSTGRES_APPLICATION_DATABASE_NAME \
    -U $POSTGRES_ADMIN_USER \
    -v ON_ERROR_STOP=1 \
    -v ADMIN_USER="$POSTGRES_ADMIN_USER" \
    -v APP_DB_NAME="$POSTGRES_APPLICATION_DATABASE_NAME" \
    -v APP_SCHEMA="$POSTGRES_APPLICATION_SCHEMA_NAME" \
    -f '/docker-entrypoint-initdb.d/sql/create-app-schema.sql'

PGPASSWORD="$(cat /run/secrets/postgres-superuser-password)" psql -v ON_ERROR_STOP=1 \
    -v ADMIN_USER="$POSTGRES_ADMIN_USER" \
    -v APP_USER="$POSTGRES_APPLICATION_USER" \
    -v APP_PWORD="'$(cat /run/secrets/postgres-application-password)'" \
    -v APP_DB_NAME="$POSTGRES_APPLICATION_DATABASE_NAME" \
    -v APP_SCHEMA="$POSTGRES_APPLICATION_SCHEMA_NAME" \
    -v CONTROL_SCHEMA="$POSTGRES_CONTROL_SCHEMA_NAME" \
    -f '/docker-entrypoint-initdb.d/sql/create-application-user.sql'

PGPASSWORD="$(cat /run/secrets/postgres-superuser-password)" psql -v ON_ERROR_STOP=1 \
    -v ADMIN_USER="$POSTGRES_ADMIN_USER" \
    -v APP_USER="$POSTGRES_APPLICATION_USER" \
    -v APP_SCHEMA="$POSTGRES_APPLICATION_SCHEMA_NAME" \
    -v CONTROL_SCHEMA="$POSTGRES_CONTROL_SCHEMA_NAME" \
    -f '/docker-entrypoint-initdb.d/sql/set-search-path.sql'
