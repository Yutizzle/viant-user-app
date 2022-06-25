# How to run this app

1. Run the "npm install" command inside both backend and frontend directories to install all dependencies

2. Create and run a postgres database (use below docker command):
   docker run --name local-pg-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

3. In your terminal, change the directory to user-app/backend and run the following command:
   npm run dev

4. Open another terminal and change the directory to user-app/frontend and run the following command:
   npm run start

5. The browser window will automatically open the application
