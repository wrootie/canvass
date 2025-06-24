## Setup for local dev

0. Create `.env` file

```
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=new_password
DB_NAME=canvassing_app
JWT_SECRET='zxcvbnm1234567890qwertyuiopasdfghjk'
JWT_EXPIRES_IN='7D'
```

1. Setup MYSQL

2. Ensure that MySQL is installed
3. Ensure that root user is using password that you've specified within .env

```
// Login to MYSQL
mysql -u root -p

// At the MySQL prompt, run this to set the password
UPDATE mysql.user SET Password=PASSWORD({{ PW Name in .env }}) WHERE User='root';

// Update privileges
FLUSH PRIVILEGES;
```

4. Ensure that the db has been created with the name specified within .env

```
mysql> CREATE DATABASE {{DB Name in .env}};
```

// Run the migration
5. npm run migrate
6. npm run dev

## Deployment
// TODO
Build for production: npm run build && npm start
