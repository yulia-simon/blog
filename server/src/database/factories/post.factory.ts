import { define, factory } from 'typeorm-seeding';
import { Faker } from 'faker';
import { PostEntity, BlogEntity, UserEntity } from '../../entities';


define(PostEntity, (faker: typeof Faker) => {
    const post = new PostEntity();
    post.title = faker.lorem.words(4);
    post.content = faker.lorem.words(350);
    post.createdAt = faker.date.past();
    post.updatedAt = faker.date.past();
    post.blog = factory(BlogEntity)() as any;
    post.author = factory(UserEntity)() as any;
    return post;
});

