import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger' 

@Entity()
export class Users {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({length: 200})
  email: string;

  @ApiProperty()
  @Column({length: 100})
  kakaoId: string;

  @ApiProperty()
  @Column({length: 100})
  image: string;

  @ApiProperty()
  @Column({ default: true })
  isValid : boolean;

  @ApiProperty()
  @Column({length: 50})
  firstName: string;

  @ApiProperty()
  @Column({length: 50})
  lastName: string;

  @ApiProperty()
  @Column({length: 20})
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