FROM postgres:12-alpine

# Variables used by postgres image - defining user, password and database name
ENV POSTGRES_DB="store"
ENV POSTGRES_USER="postgres"
ENV POSTGRES_PASSWORD="secret"




# All SQL and SH files from docker-entrypoint-initdb.d will be run after creation od postgres container
# Script restoredb.sh restores (pg_restore) DVD Rental database
COPY restoredb.sh /docker-entrypoint-initdb.d/