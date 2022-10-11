# Back End

How to start

# 1 Create virtual Enviroment

pipenv shell

# 2 install dependencies

pipenv install

# 3 Migrate migrations

pipenv run init
pipenv run migrate (skip if you have not made changes to the models on the `./src/api/models.py`)
pipenv run upgrade

# 4 Run app

pipenv run start

# To modify URL at .env

mysql url: mysql://puadmin:**\***@mysql.nuevo.publiexcr.com/sisvallas2021

# To install Mysql module:

pip install mysqlclient ( or use next command)

pip3 install mysqlclient

# Flask Error: Target database is not up to date.

flask db stamp head

# Flask error: ERROR [flask_migrate] Error: Can't locate revision identified by 'edcd63e9db6c'

psql
\c database
drop table alembic_version;

# dreamhost

Connect to your new database from the command line with:

# Gitpod greenlet error

pip install greenlet

# npm ERR!

nvm install v14.18.1
nvm use v14.18.1
npm install

# psql FATAL password authentication failed for user "postgres"

psql -U default (terminal)
\password (psql shell)
Enter new password:

# WSL Install PostgreSQL (ubuntu)

docs/Install_postgres.md

# WSL postgreSQL commands (ubuntu)

-sudo service postgresql status (checking the status of your database)
-sudo service postgresql start (to start running your database)
-sudo service postgresql stop (to stop running your database.)

-sudo passwd postgres (To set a password, enter password, close terminal)
-sudo -u postgres psql (Connect to the postgres service and open the psql shell)

# Psql shell

-\q (exit postgres)

# Generate FLASK_SECRET_KEY

python
import os;
print(os.urandom(16));
