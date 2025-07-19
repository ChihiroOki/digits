import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  const userPromises = [];
  for (const account of config.defaultAccounts) {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    userPromises.push(
      prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          email: account.email,
          password,
          role,
        },
      }),
    );
  }
  await Promise.all(userPromises);

  const stuffPromises = [];
  for (const data of config.defaultData) {
    const condition = data.condition as Condition || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    stuffPromises.push(
      prisma.stuff.upsert({
        where: { id: config.defaultData.indexOf(data) + 1 },
        update: {},
        create: {
          name: data.name,
          quantity: data.quantity,
          owner: data.owner,
          condition,
        },
      }),
    );
  }
  await Promise.all(stuffPromises);

  const contactPromises = [];
  for (const contact of config.defaultContacts) {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    contactPromises.push(
      prisma.contact.upsert({
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
          image: contact.image,
          description: contact.description,
          owner: contact.owner,
        },
      }),
    );
  }
  await Promise.all(contactPromises);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
