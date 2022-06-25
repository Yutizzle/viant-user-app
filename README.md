# How to run this app

1. Run the "npm install" command inside both backend and frontend directories to install all dependencies

2. Create and run a postgres database (use below docker command):
   docker run --name local-pg-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

3. Run the database migrations using the following command in the user-app/backend directory:
   npx prisma migrate deploy

4. Run the the following command in the user-app/backend directory to establish link between prisma and .env file:
   npx prisma generate

5. In your terminal, change the directory to user-app/backend and run the following command:
   npm run dev

6. Open another terminal and change the directory to user-app/frontend and run the following command:
   npm run start

7. The browser window will automatically open the application
