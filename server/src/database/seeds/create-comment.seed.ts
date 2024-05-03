import { CommentEntity as Comment } from '../../entities';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Comment)().createMany(5)

    }
}
