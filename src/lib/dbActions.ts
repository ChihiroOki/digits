'use server';

import { Contact } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new contact to the database.
 * @param contact the contact object to be added.
 */
export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  image: string;
  owner: string;
}) {
  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      description: contact.description,
      image: contact.image,
      owner: contact.owner,
    },
  });
  redirect('list');
}

export async function addNote(note: { note: string; owner:string; contactId: number, createdAt: Date }) {
  await prisma.note.create({
    data: {
      note: note.note,
      owner: note.owner,
      contactId: note.contactId,
    },
  });
  redirect('/list');
}
export async function editContacts(contact: Contact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      description: contact.description,
      image: contact.image,
      owner: contact.owner,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing contact in the database.
 * @param contact, an object with the following properties: id, firstName, lastName, address, description, image, owner.
 */
export async function editContact(contact: Contact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      description: contact.description,
      image: contact.image,
      owner: contact.owner,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
