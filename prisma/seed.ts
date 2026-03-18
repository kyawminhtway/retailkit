import { ADMIN_NAME, ADMIN_PASSWORD, ADMIN_USERNAME } from '#/constants/general.js';
import { hashPassword } from '#/server/auth/auth.server.js';
import { PrismaClient } from '../src/generated/prisma/client.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
    // Create Admin User
    const userCount = await prisma.user.count();
    if(userCount == 0){
        const password = await hashPassword(ADMIN_PASSWORD);
        await prisma.user.create({
            data: {
                name: ADMIN_NAME,
                password,
                username: ADMIN_USERNAME,
            }
        });
    }
    console.log('Admin user has been created/already created successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
