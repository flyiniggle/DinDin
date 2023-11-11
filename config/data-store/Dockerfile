FROM postgres:15

# Build app
WORKDIR /
COPY config/data-store/postgres/config /etc/db/config
COPY config/data-store/postgres/initdb /docker-entrypoint-initdb.d