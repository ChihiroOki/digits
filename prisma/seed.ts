import { PrismaClient, Role, Condition } from '@prisma/client';
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

  config.defaultData.forEach(async (data) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else if (data.condition === 'fair') {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name}(${data.owner})`);

    // You must provide a unique identifier for the 'where' clause, such as 'id'
    // If you don't have an id, you may need to query for it first or change your schema to make 'name' unique
    // Here is an example assuming you have 'id' in your data:
    // You must provide a unique identifier for the 'where' clause, such as 'id'
    // If you don't have an id, you may need to query for it first or change your schema to make 'name' unique
    // Here is an example assuming you have 'id' in your data:
    // First, try to find the existing stuff by name and owner
    const existingStuff = await prisma.stuff.findFirst({
      where: {
        name: data.name,
        owner: data.owner,
      },
    });

    if (existingStuff) {
      await prisma.stuff.update({
        where: { id: existingStuff.id },
        data: {
          quantity: data.quantity,
          condition,
        },
      });
    } else {
      await prisma.stuff.create({
        data: {
          name: data.name,
          quantity: data.quantity,
          owner: data.owner,
          condition,
        },
      });
    }
  });
  config.defaultContacts.forEach(async (contact) => {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: {
        firstName_lastName: {
          firstName: contact.firstName,
          lastName: contact.lastName,
        },
      },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        description: contact.description,
        image: contact.image,
        owner: contact.owner,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
