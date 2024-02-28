@echo on

echo Executing JavaScript file...

node api_test_event-apis.js

echo Accessing the database...

@echo off

set MYSQL_USER=root
set MYSQL_PASSWORD=admin
set MYSQL_DB=cop4710db_test

mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DB% -e "ALTER TABLE events AUTO_INCREMENT = 1;"
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DB% -e "ALTER TABLE event_lists AUTO_INCREMENT = 1;"

echo Reset AUTO_INCREMENT value