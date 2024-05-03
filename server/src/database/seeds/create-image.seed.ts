import { BlogImageEntity } from '../../entities';
import { Factory, Seeder } from 'typeorm-seeding';

export class ImageCreateSeed implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(BlogImageEntity)().createMany(5)

    }
}
