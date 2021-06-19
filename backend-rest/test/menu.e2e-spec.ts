import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MenuModule } from '../src/menu/menu.module'; 
import { MenuService } from '../src/menu/menu.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from '../src/store/store.module';
import { CategoryModule } from '../src/category/category.module';
import { StoreService } from '../src/store/store.service';
import { CategoryService } from '../src/category/category.service';

describe('MenuController (e2e)', () => {
    let app: INestApplication;
    let storeService: StoreService;
    let categoryService: CategoryService;
    let menuService: MenuService;
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
                StoreModule,
                CategoryModule
            ],
            providers: [MenuService, StoreService, CategoryService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        storeService = module.get<StoreService>(StoreService);
        categoryService = module.get<CategoryService>(CategoryService);
        menuService = module.get<MenuService>(MenuService);

        const createStoreInput = {
            id: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0',
            name: "KFC",
            description: "Chic",
            rating: 8
        };

        const createCategoryInput = {
            id: '202a7b22-41c6-4061-a583-71ee6988315c',
            name: 'Chicken',
            storeId: '32bf845d-6863-40f1-8cb8-6a9dafcb99c0'
        };

        await storeService.create(createStoreInput);
        await categoryService.create(createCategoryInput);
    });

    describe('Find all menus', () => {
        it('When there is one menu, then return that menu', async () => {
            
            const createMenuInput = {
                name: 'AB',
                categoryId: '202a7b22-41c6-4061-a583-71ee6988315c',
                price: 99
            };

            await menuService.create(createMenuInput);

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