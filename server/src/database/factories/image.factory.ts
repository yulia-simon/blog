import { define, factory } from 'typeorm-seeding';
import { Faker } from 'faker';
import { BlogEntity, BlogImageEntity } from '../../entities';


define(BlogImageEntity, (faker: typeof Faker) => {
    const image = new BlogImageEntity();
    image.id = faker.random.uuid();
    const sections = ['tech', 'travel', 'food', 'lifestyle', 'business'];
    const category = faker.random.arrayElement(sections);
    const num = Math.floor(Math.random() * 100) + 1;
    image.url = `https://source.unsplash.com/1600x900/?${category}/${num}`;
    image.createdAt = faker.date.past();
    image.updatedAt = faker.date.past();
    image.blog = factory(BlogEntity)() as any;
    return image;
});
