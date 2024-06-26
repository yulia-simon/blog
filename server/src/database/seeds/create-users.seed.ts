import { BlogEntity, UserEntity } from '../../entities';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class UserCreateSeed implements Seeder {
    public async run(factory: Factory, connection: any): Promise<any> {
        try {
            const entityManager = connection.createEntityManager();

            const adminEmail = 'admin@example.com';
            const adminPassword = 'Admin2024';

            const existingAdmin = await entityManager.findOne(UserEntity, { where: { email: adminEmail } });

            if (!existingAdmin) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);

                const createdAdmin = await entityManager.insert(UserEntity, {
                    email: adminEmail,
                    password: hashedPassword,
                    firstName: 'Admin',
                    lastName: 'Example',
                    createdAt: new Date(),
                    role: 'admin',
                });

                await entityManager.save(createdAdmin);
            }
            const existingUser = await entityManager.findOne(UserEntity, { where: { email: adminEmail } });

            const blog = await entityManager.insert(UserEntity, {
                title: 'Blog 1',
                topic: 'tech',
                slug: 'blog-1',
                content: 'Blog 1 content',
                author: [existingUser],
            });
            await entityManager.save(blog);
        } finally {
            await connection.close();
        }
    }
}
