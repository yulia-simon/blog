import { UserEntity as User } from '../../entities';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(User)().createMany(10)

    }
}
