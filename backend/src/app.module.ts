import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './utils/prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from './utils/jwt/jwt.module';
import { CategoryModule } from './resources/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
