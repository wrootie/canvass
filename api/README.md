## Setup for local dev

0. Setup MYSQL

0. Ensure that MySQL is installed
1. Ensure that root user is using password that you've specified within .env

```
// Login to MYSQL
mysql -u root -p

// At the MySQL prompt, run this to set the password
UPDATE mysql.user SET Password=PASSWORD({{ PW Name in .env }}) WHERE User='root';

// Update privileges
FLUSH PRIVILEGES;
```

2. Ensure that the db has been created with the name specified within .env

```
mysql> CREATE DATABASE {{DB Name in .env}};
```

// Run the migration
3. npm run migrate
4. npm run dev

## Deployment
// TODO
Build for production: npm run build && npm start
