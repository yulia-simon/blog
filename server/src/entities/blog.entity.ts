import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity, CommentEntity, PostEntity } from '.';

@Entity({ name: 'blogs' })
export class BlogEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  topic: string;


  @ManyToOne(() => UserEntity, (user) => user.blogs)
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.blog, { cascade: ['remove'] })
  comments: CommentEntity[];

  @OneToMany(() => PostEntity, (post) => post.blog, { cascade: ['remove'] })
  posts: PostEntity[];
}
