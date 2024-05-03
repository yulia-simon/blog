import { define, factory } from 'typeorm-seeding';
import { Faker } from 'faker';
import { BlogEntity, BlogImageEntity } from '../../entities';


define(BlogImageEntity, (faker: typeof Faker) => {
    const image = new BlogImageEntity();
    image.id = faker.random.uuid();
    const sections = ['tech', 'travel', 'food', 'lifestyle', 'business'];
    const category = faker.random.arrayElement(sections);
    image.url = faker.image.food()
    image.createdAt = faker.date.past();
    image.updatedAt = faker.date.past();
    image.blog = factory(BlogEntity)() as any;
    return image;
});
