import { ApiProperty } from '@nestjs/swagger';
import { IUser, Role } from '../../../types/user.type';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements Omit<IUser, 'id' | 'role'> {
  @ApiProperty({ example: 'email@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User phone',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @ApiProperty({
    example: '123 Main St, City, Country',
    description: 'User address',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
}
