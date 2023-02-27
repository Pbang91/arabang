import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 200})
  email: string;

  @Column({length: 100})
  kakaoId: string;

  @Column({length: 100})
  image: string;

  @Column({ default: true })
  isValid : boolean;

  @Column({length: 50})
  firstName: string;

  @Column({length: 50})
  lastName: string;

  @Column({length: 20})
  phone: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}