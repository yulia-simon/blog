import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectConfig, ConfigService } from 'nestjs-config';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { TokenEntity, UserEntity as User, UserEntity } from '../entities';
import { Pagination, PaginationOptionsInterface } from '../utils/paginate';
import { UpdateUserDto } from './dto';
import { RegisterDto } from '../auth/dto/index';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private saltRounds: number;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    @InjectConfig() private readonly config: ConfigService,
  ) {
    this.saltRounds = config.get('app.salt_rounds', 10);
  }

  async getPaginatedUsers(paginationOptions: PaginationOptionsInterface): Promise<Pagination<User>> {
    try {
      const limit = paginationOptions.limit || 10;
      const page = paginationOptions.page || 0;
      const [users, total] = await this.userRepository.findAndCount({
        take: limit,
        skip: page,
      });

      return new Pagination<User>({
        results: users,
        total,
      });
    } catch (err) {
      this.logger.error('Error while fetching users ', err);
      throw err;
    }
  }

  async create(userData: RegisterDto): Promise<User> {
    try {
      const user = await this.userRepository.create({
        ...userData,
        password: await this.getHash(userData.password),
      });

      const createdUser = await this.userRepository.save(user);
      return createdUser;
    } catch (err) {
      this.logger.error(' Error while creating user ', err);
      throw err;
    }
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();

      if (!user) {
        throw new NotFoundException(`User  not found`);
      }
      const { firstName, lastName, role } = updatedUser;

      const fieldsToUpdate: Partial<UserEntity> = {
        firstName,
        lastName,
        role,
      };

      await this.userRepository.update(id, fieldsToUpdate);

      const updatedUserEntity = await this.userRepository.findOne({
        where: { id },
        select: ['id', 'firstName', 'lastName', 'role'],
      });

      return updatedUserEntity;
    } catch (err) {
      this.logger.error('Error while updating user ', err);
      throw err;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
        select: ['id', 'firstName', 'lastName', 'role'],
      });
    } catch (err) {
      this.logger.error('Error while finding by email user ', err);
      throw err;
    }
  }

  async findById(userId: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { id: userId } });
    } catch (err) {
      this.logger.error('Error while finding user ', err);
      throw err;
    }
  }

  async findUserByToken(id: string): Promise<UserEntity> {
    try {
      const tokenEntity = await this.tokenRepository.findOne({
        where: { userId: id },
      });
      if (!tokenEntity) {
        throw new NotFoundException('Token not found');
      }
      return tokenEntity.user;
    } catch (err) {
      this.logger.error('Error while fetching user ', err);
      throw err;
    }
  }

  async getHash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (err) {
      this.logger.error('Error while hashing password ', err);
      throw err;
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      this.logger.error('Error while comparing password ', err);
      throw err;
    }
  }

  async findByCredentials(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email })
        .getOne();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (err) {
      this.logger.error('Error while finding user ', err);
      throw err;
    }
  }

  async remove(userId: string): Promise<string> {
    try {
      await this.userRepository.delete(userId);

      return 'User deleted successfully';
    } catch (err) {
      this.logger.error('Error in remove service', err);
      throw err;
    }
  }
}
