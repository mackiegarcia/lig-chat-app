import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
