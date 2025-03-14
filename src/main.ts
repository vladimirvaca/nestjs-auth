/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global prefix
  app.setGlobalPrefix('api/v1');

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Basic authentication - Nestjs')
    .setContact('Vladimir Vaca', 'https://example.com', 'ramvlay@gmail.com')
    .setDescription('Example of a basic authentication using Nestjs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // start the app
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().then(() => {
  console.log('Server is running!');
});
