import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  config.defaultContacts.forEach(async (contact) => {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    // Try to find the contact first by firstName and lastName
    const existingContact = await prisma.contact.findFirst({
      where: {
        firstName: contact.firstName,
        lastName: contact.lastName,
      },
    });

    if (existingContact) {
      await prisma.contact.update({
        where: { id: existingContact.id },
        data: {
          address: contact.address,
          description: contact.description,
          image: contact.image,
          owner: contact.owner,
        },
      });
    } else {
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
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
