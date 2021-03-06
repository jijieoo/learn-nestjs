import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExpectionsFilter } from './core/filter/all-expections.filter';
import { logger } from './core/middleware/logger.middleware';
import { ValidationPipe } from './core/pipe/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.useGlobalInterceptors(new DataFormatInterceptor());

    // 全局参数校验 pipe
    app.useGlobalPipes(new ValidationPipe());

    // 全局异常捕获 filter
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExpectionsFilter(httpAdapter));

    app.use(logger);
    await app.listen(3000);
}
bootstrap();
