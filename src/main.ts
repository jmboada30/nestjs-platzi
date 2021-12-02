import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // LA SIGUIENTE LINEA ACTIVA LAS VALIDACIONES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // LA SIG LINEA ACTIVA LA SERIALIZACION
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // LAS SIGS LINEA ACTIVA LA AUTODOCUMENTACION CON SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // ACTIVAMOS LOS CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  console.log(await app.getUrl());
}
bootstrap();
