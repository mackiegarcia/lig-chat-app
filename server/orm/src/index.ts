import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {User} from './entity/User';

createConnection().then(async connection => {
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);
    console.log('Here you can setup and run express/koa/any other framework.');
}).catch(error => console.log(error));
