import { NewUser } from '../types';
import { PrismaClient } from '@prisma/client';

export const validateUser = async (user: NewUser) => {
  const { id, username, email, password, firstName, lastName } = user;
  const validation = { valid: false, message: '' };

  const prisma = new PrismaClient();

  // validate username and email are unique
  const getUserName = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  const getEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (getUserName?.username === username && getUserName.id !== id) {
    return { ...validation, message: 'Username already exists!' };
  }
  if (getEmail?.email === email && getEmail.id !== id) {
    return { ...validation, message: 'Email already exists!' };
  }

  // validate username is only alphanumeric characters
  if (!username.match(/^[0-9A-Za-z]+$/)) {
    return { ...validation, message: 'Username must be alphanumeric only!' };
  }

  // validate password is no more than 32 characters and only alphanumeric characters
  if (!password.match(/^[0-9A-Za-z]+$/)) {
    return { ...validation, message: 'Password must be alphanumeric only!' };
  }
  if (password.length > 32) {
    return { ...validation, message: 'Password must be no more than 32 characters long!' };
  }

  // validate first name and last name only contain alphabets, space, and single quotes
  if (!firstName.match(/^[A-Za-z ']+$/)) {
    return {
      ...validation,
      message: 'First name must only contain alphabets, space, and single quotes!',
    };
  }
  if (!lastName.match(/^[A-Za-z ']+$/)) {
    return {
      ...validation,
      message: 'Last name must only contain alphabets, space, and single quotes!',
    };
  }

  // validation successful
  return { ...validation, valid: true };
};
