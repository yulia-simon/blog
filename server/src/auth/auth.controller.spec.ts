import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { TokenEntity, UserEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;
    let tokenRepository: Repository<TokenEntity>;
    let config;
    let controller: AuthController;

    const mockUser = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'user',
    } as UserEntity;

    const mockConfig = { environment: { NODE_ENV: 'PROD' } };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findByCredentials: jest.fn(() => mockUser),
                        create: jest.fn(() => mockUser),
                        findById: jest.fn(() => mockUser),
                        findByEmail: jest.fn(() => mockUser),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(() => 'token'),
                    },
                },
                {
                    provide: getRepositoryToken(TokenEntity),
                    useClass: Repository,
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key) => mockConfig[key]),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        tokenRepository = module.get<Repository<TokenEntity>>(getRepositoryToken(TokenEntity));
        config = module.get<ConfigService>(ConfigService).get('jwt');
        controller = module.get<AuthController>(AuthController);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('register', () => {
        it('should call register', async () => {
            const registerDto: RegisterDto = {
                email: 'admin@example.com',
                password: 'Strongpass123',
            };
            const mockUser = { id: 1, email: 'admin@example.com' };
            jest.spyOn(authService, 'register').mockResolvedValue(JSON.stringify(mockUser));
            await controller.register(registerDto);
            expect(authService.register).toHaveBeenCalledTimes(1);
        });
    });
    describe('login', () => {
        it('should call login', async () => {
            const loginDto: LoginDto = {
                email: '',
                password: '',
            };
            const response: Response = {} as Response;
            const agent: string = 'test agent';
            jest.spyOn(authService, 'login').mockImplementation(
                (_loginDto: LoginDto, _agent: string, _res: Response<any, Record<string, any>>) =>
                    Promise.resolve(undefined),
            );
            await controller.login(loginDto, response, agent);
            expect(authService.login).toHaveBeenCalledWith(loginDto, agent, response);
        });
    });
});
