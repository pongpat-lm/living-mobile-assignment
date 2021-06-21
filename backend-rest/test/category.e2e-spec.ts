import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/category/category.module'; 
import { CategoryService } from '../src/category/category.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from '../src/store/store.module';
import { MenuModule } from '../src/menu/menu.module';
import { StoreService } from '../src/store/store.service';

describe('CategoryController (e2e)', () => {
    let app: INestApplication;
    let storeService: StoreService;
    let categoryService: CategoryService;
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
                StoreModule,
                MenuModule
            ],
            providers: [CategoryService, StoreService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        storeService = module.get<StoreService>(StoreService);
        categoryService = module.get<CategoryService>(CategoryService);

        const createStoreInput = {
            id: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0',
            name: "KFC",
            description: "Chic",
            rating: 8
        };
        await storeService.create(createStoreInput);
    });

    describe('Find all categories', () => {
        it('When there is one category, then return that category', async () => {
            const createCategoryInput = {
                name: 'Chicken',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };
            await categoryService.create(createCategoryInput);

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
                .expect(500)
        });
    });

    describe("Update category", () => {
        it('When update with valid input, then response 200 (OK) with updated category', async () => {
            // arrange
            const createCategoryInput = {
                id: '8570d6d2-9fb1-4bce-aaef-a685343956e7',
                name: 'Chicken',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            const updateCategoryInput = {
                name: 'Fish',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            await categoryService.create(createCategoryInput);

            return request(app.getHttpServer())
                .put(`/category/${createCategoryInput.id}`)
                .send(updateCategoryInput)
                .expect(200)
        });

        it('When update with invalid input(name is not string), then response 400', async () => {
            // arrange
            const createCategoryInput = {
                id: '8570d6d2-9fb1-4bce-acef-a685343956e7',
                name: 'Chicken',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            const updateCategoryInput = {
                name: 7600,
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            await categoryService.create(createCategoryInput);

            return request(app.getHttpServer())
                .put(`/category/${createCategoryInput.id}`)
                .send(updateCategoryInput)
                .expect(400)
        });
    })

    describe("Delete category", () => {
        it('When delete with valid input, then response 200 (OK) with deleted category', async () => {
            // arrange
            const createCategoryInput = {
                id: '816b177a-85b1-4b86-85c7-2ddf67575722',
                name: 'Pork',
                storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
            };

            await categoryService.create(createCategoryInput);

            return request(app.getHttpServer())
                .delete(`/category/${createCategoryInput.id}`)
                .expect(200)
        });
    })

    afterAll(async () => {
        await app.close();
    });
});