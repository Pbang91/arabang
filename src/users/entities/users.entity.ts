import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger' 
import { IsEmail, IsOptional, IsString } from "class-validator";

@Entity('users')
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @ApiProperty()
  @Column({length: 200})
  email: string;

  @IsString()
  @ApiProperty()
  @Column({length: 100})
  kakaoId: string;

  @IsString()
  @ApiProperty()
  @Column({length: 100})
  image: string;

  @ApiProperty()
  @Column({ default: true })
  isValid : boolean;

  @IsString()
  @ApiProperty()
  @Column({length: 50})
  firstName: string;

  @IsString()
  @ApiProperty()
  @Column({length: 50})
  lastName: string;

  @IsOptional()
  @ApiProperty()
  @Column({length: 20, default: null})
  phone: string;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}