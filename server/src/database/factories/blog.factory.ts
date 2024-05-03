
import { define, factory } from 'typeorm-seeding';
import { Faker } from 'faker';
import { BlogEntity, BlogImageEntity, UserEntity } from '../../entities';

define(BlogEntity, (faker: typeof Faker) => {
    const blog = new BlogEntity();
    blog.title = faker.lorem.words(4);
    const sections = ['tech', 'travel', 'food', 'lifestyle', 'business'];
    blog.topic = faker.random.arrayElement(sections);
    blog.slug = faker.helpers.slugify(blog.title);
    blog.content = faker.lorem.words(500);
    blog.createdAt = faker.date.past();
    blog.updatedAt = faker.date.past();
    blog.author = factory(UserEntity)() as any
    return blog;
});
