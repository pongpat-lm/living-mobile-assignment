import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MenuModule } from '../src/menu/menu.module'; 
import { MenuService } from '../src/menu/menu.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

describe('StoreController (e2e)', () => {
    let app: INestApplication;
    let service: MenuService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                MenuModule,
            ],
            providers: [MenuService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<MenuService>(MenuService);
    });

    describe('Find all menus', () => {
        it('When there is one menu, then return that menu', async () => {
            const createMenuInput = {
                name: 'AB',
                categoryId: '202a7b22-41c6-4061-a583-71ee6988315c',
                price: 99
            };
            await service.create(createMenuInput);

            return request(app.getHttpServer())
                .get('/menu')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createMenuInput),
                    );
                });
        });
    });

    describe('Create menu', () => {
        it('When create with valid input, then response 200 (OK) with created menu', async () => {
            // arrange
            const createMenuInput = {
                name: 'AAA',
                categoryId: '202a7b22-41c6-4061-a583-71ee6988315c',
                price: 99
            };

            return request(app.getHttpServer())
                .post('/menu')
                .send(createMenuInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createMenuInput),
                    );
                });
        });

        it('When create with invalid input (categoryId does not exist in category), then response 400', async () => {
            // arrange
            const createMenuInput = {
                name: 'CCC',
                categoryId: 'sdm-sdf',
                price: 43
            };

            return request(app.getHttpServer())
                .post('/menu')
                .send(createMenuInput)
                .expect(400)
        });
    });

    afterAll(async () => {
        await app.close();
    });
});