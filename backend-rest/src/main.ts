import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // config Swagger document's descriptions
  const config = new DocumentBuilder()
    .setTitle('Store')
    .setVersion('1.0')
    .build();

  // create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); // setup Swagger document at route "/api"
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
