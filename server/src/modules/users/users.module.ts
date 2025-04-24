import { Module } from '@nestjs/common';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from './providers/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
