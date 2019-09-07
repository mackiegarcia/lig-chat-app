import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('Messages')
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('text')
    msg: string;
}
