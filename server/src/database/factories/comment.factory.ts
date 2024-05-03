import { define, factory } from 'typeorm-seeding';
import { Faker } from 'faker';
import { CommentEntity, BlogEntity, UserEntity, PostEntity } from '../../entities';


define(CommentEntity, (faker: typeof Faker) => {
    const comment = new CommentEntity();
    comment.content = faker.lorem.sentence();
    comment.createdAt = faker.date.past();
    comment.updatedAt = faker.date.past();
    comment.blog = factory(BlogEntity)() as any;
    comment.user = factory(UserEntity)() as any;
    comment.post = factory(PostEntity)() as any;

    return comment;
});

