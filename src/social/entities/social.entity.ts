import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('socials')
export class SocialEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({length: 20})
    type: string;

    @Column({length: 200})
    access_token: string;

    @Column({length: 200})
    refresh_token: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated_at: Date;
}