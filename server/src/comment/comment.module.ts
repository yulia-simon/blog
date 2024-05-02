import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostEntity, CommentEntity } from '../entities';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([CommentEntity, PostEntity]),
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule { }
