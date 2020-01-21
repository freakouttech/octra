FROM postgres:9.3
COPY scripts/*.sql /docker-entrypoint-initdb.d/
ADD scripts/init.sql /docker-entrypoint-initdb.d
ADD scripts/migrate.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/init.sql
RUN chmod a+r /docker-entrypoint-initdb.d/migrate.sql