import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JWTModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  imports: [
    JWTModule.register({
      global: true,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
