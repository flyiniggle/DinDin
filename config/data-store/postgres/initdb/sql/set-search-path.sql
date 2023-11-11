ALTER USER :POSTGRES_SUPER_USER SET search_path TO :APP_SCHEMA, "$user", public;
ALTER USER :ADMIN_USER SET search_path TO :APP_SCHEMA, "$user", public;
ALTER USER :APP_USER SET search_path TO :APP_SCHEMA, "$user", public;

\echo added  :APP_SCHEMA to search path;