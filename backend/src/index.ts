import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { NewUser, UpdateUser } from './types';
import { validateUser } from './validation/validation';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/heartbeat', async (req, res) => {
  res.send(`I'm alive!`);
});

// get all users
app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// get user by id
app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  res.json(user);
});

// post new user
app.post('/user', async (req, res) => {
  const user: NewUser = req.body;

  // run validations
  const validation = await validateUser(user);
  if (!validation?.valid) {
    res.statusCode = 400;
    res.send(JSON.stringify({ errorMessage: validation?.message }));
    return;
  }

  // create new user
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        lastUpdated: new Date(),
      },
    });
    res.json(newUser);
  } catch (e) {
    // error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.message);
      res.statusCode = 400;
      res.send(e.message);
    }
    throw e;
  }
});

// put user
app.put('/user', async (req, res) => {
  // run validations
  const checkUser: NewUser = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  const validation = await validateUser(checkUser);
  if (!validation?.valid) {
    res.statusCode = 400;
    res.send(JSON.stringify({ errorMessage: validation?.message }));
    return;
  }

  // update existing user
  try {
    const user: UpdateUser = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
    });
    res.json(updatedUser);
  } catch (e) {
    // error handling
    if (
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      console.log(e.message);
      res.statusCode = 400;
      res.send(e.message);
    }

    throw e;
  }
});

app.listen(3000, () => {
  console.log('App is running on port 3000!');
});
