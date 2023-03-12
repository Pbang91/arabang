import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger' 
import { IsEmail, IsOptional, IsString } from "class-validator";

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  _id: number;

  @IsEmail()
  @ApiProperty()
  @Column({length: 200})
  email: string;

  @IsString()
  @ApiProperty()
  @Column({length: 100})
  image: string;

  @ApiProperty()
  @Column({ default: true })
  is_valid : boolean;

  @IsString()
  @ApiProperty()
  @Column({length: 50})
  name: string;

  @IsOptional()
  @ApiProperty()
  @Column({length: 20, default: null})
  phone: string;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;
}