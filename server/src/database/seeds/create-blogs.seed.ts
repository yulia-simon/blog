import { BlogEntity, UserEntity as User } from '../../entities';
import { Factory, Seeder } from 'typeorm-seeding';

export class BlogreateSeed implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(BlogEntity)().createMany(2)

    }
}
