@echo on

echo Executing JavaScript file...

node api_test_rso-apis.js

echo Accessing the database...

@echo off

set MYSQL_USER=root
set MYSQL_PASSWORD=admin
set MYSQL_DB=cop4710db_test

mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DB% -e "ALTER TABLE rsos AUTO_INCREMENT = 2"

echo Reset AUTO_INCREMENT value