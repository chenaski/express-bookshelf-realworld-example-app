#!/bin/bash

set -euo pipefail

psql -d postgres -c "DROP DATABASE IF EXISTS \"$1\";"
psql -d postgres -c "CREATE DATABASE \"$1\";"
pg_dump -d realworld | psql "$1"
psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"$1\" to deploy;";
