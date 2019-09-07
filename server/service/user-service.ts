import { createConnection } from 'typeorm';
import { User } from '../orm/src/entity/User';
import { StatusCode } from '../config/status-code';
const databaseConfig = require('../config/database-config.json');

export default class UserService {
    dbConfig: any;
    result = {
        status: StatusCode.OK,
        data: null,
        error: null
    };
    constructor() {
        this.dbConfig = { ...databaseConfig };
        this.dbConfig.entities = [ User ];
    }

    async connect() {
        return await createConnection(this.dbConfig);
    }

    async getUsers() {
        try {
            const connection = await this.connect();
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find({ select : ['id', 'username']});
            await connection.close();
            this.result.data = users;
            return this.result.data;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    async getUserByUsername(name) {
        const connection = await this.connect();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne({username: name});
        await connection.close();
        return user;
    }

    async addUser(name, password) {
        try {
            const userExist = await this.getUserByUsername(name);
            this.result.data = null;
            if (!userExist) {
                const connection = await this.connect();
                const userRepository = connection.getRepository(User);
                const user = new User();
                user.username = name;
                user.password = password;
                this.result.data = await userRepository.save(user);
                await connection.close();
                return this.result;
            }
            this.result.status = StatusCode.FORBIDDEN;
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    async loginUser(name, password) {
        try {
            const userExist = await this.getUserByUsername(name);
            this.result.data = null;
            if (userExist) {
                if (userExist.password === password) {
                    this.result.status = StatusCode.OK;
                    this.result.data = userExist;
                } else {
                    this.result.status = StatusCode.FORBIDDEN;
                    this.result.error = 'password is incorrect';
                }
                return this.result;
            }
            this.result.status = StatusCode.UNAUTHORIZED;
            this.result.error = 'user doesnt exists';
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }
}
