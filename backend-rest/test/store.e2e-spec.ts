import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/store/store.module'; 
import { StoreService } from '../src/store/store.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

describe('StoreController (e2e)', () => {
    let app: INestApplication;
    let service: StoreService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                StoreModule,
            ],
            providers: [StoreService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<StoreService>(StoreService);
    });

    describe('Find all stores', () => {
        it('When there is one store, then return that store', async () => {
            const createStoreInput = {
                name: 'KFC',
                description: 'Chicken',
                rating: 5,
            };
            await service.create(createStoreInput);

            return request(app.getHttpServer())
                .get('/store')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createStoreInput),
                    );
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});