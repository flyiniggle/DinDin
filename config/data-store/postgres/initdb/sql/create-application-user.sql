\c :APP_DB_NAME;
CREATE USER :APP_USER ENCRYPTED PASSWORD :APP_PWORD;
GRANT CONNECT ON DATABASE :APP_DB_NAME TO :APP_USER;
GRANT USAGE ON SCHEMA :APP_SCHEMA TO :APP_USER;
GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA :APP_SCHEMA TO :APP_USER;

ALTER USER :APP_USER SET search_path TO "$user", public, :APP_SCHEMA;
SET search_path TO "$user", public, :APP_SCHEMA;

ALTER DEFAULT PRIVILEGES FOR ROLE :ADMIN_USER IN SCHEMA :APP_SCHEMA GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON TABLES TO :APP_USER;
ALTER DEFAULT PRIVILEGES FOR ROLE :ADMIN_USER IN SCHEMA :APP_SCHEMA GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO :APP_USER;
ALTER DEFAULT PRIVILEGES FOR ROLE :ADMIN_USER IN SCHEMA :APP_SCHEMA GRANT EXECUTE ON FUNCTIONS TO :APP_USER;
ALTER DEFAULT PRIVILEGES FOR ROLE :ADMIN_USER IN SCHEMA :APP_SCHEMA GRANT USAGE ON TYPES TO :APP_USER;
ALTER DEFAULT PRIVILEGES FOR ROLE :ADMIN_USER GRANT USAGE ON SCHEMAS TO :APP_USER;

\echo created application user :APP_USER;