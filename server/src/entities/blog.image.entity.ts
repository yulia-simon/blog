import { Entity, Column, ManyToOne } from 'typeorm';
import { BlogEntity, BaseEntity } from '.';

@Entity({ name: 'images' })
export class BlogImageEntity extends BaseEntity {
    @Column()
    url: string;

    @ManyToOne(() => BlogEntity, (blog) => blog.posts, { onDelete: 'CASCADE' })
    blog: BlogEntity;

}
