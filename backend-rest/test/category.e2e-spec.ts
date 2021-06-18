import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/category/category.module'; 
import { CategoryService } from '../src/category/category.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

describe('StoreController (e2e)', () => {
    let app: INestApplication;
    let service: CategoryService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                CategoryModule,
            ],
            providers: [CategoryService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<CategoryService>(CategoryService);
    });

    describe('Find all categories', () => {
        it('When there is one category, then return that category', async () => {
            const createCategoryInput = {
                name: 'Chicken',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };
            await service.create(createCategoryInput);

            return request(app.getHttpServer())
                .get('/category')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createCategoryInput),
                    );
                });
        });
    });

    describe('Create category', () => {
        it('When create with valid input, then response 200 (OK) with created category', async () => {
            // arrange
            const createCategoryInput = {
                name: 'Chicken',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            return request(app.getHttpServer())
                .post('/category')
                .send(createCategoryInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createCategoryInput),
                    );
                });
        });

        it('When create with invalid input (storeId does not exist in store), then response 400', async () => {
            // arrange
            const createCategoryInput = {
                name: 'Fish',
                storeId: 'sdm-sdf'
            };

            return request(app.getHttpServer())
                .post('/category')
                .send(createCategoryInput)
                .expect(400)
        });
    });

    afterAll(async () => {
        await app.close();
    });
});