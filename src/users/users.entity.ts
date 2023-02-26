import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  kakaoId: string;

  @Column()
  image: string;

  @Column({ default: true })
  isValid : boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}