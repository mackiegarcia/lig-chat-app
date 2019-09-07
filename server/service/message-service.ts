import { createConnection } from 'typeorm';
import { Message } from '../orm/src/entity/Message';
import { StatusCode } from '../config/status-code';
const databaseConfig = require('../config/database-config.json');

export default class MessageService {
    dbConfig: any;
    result = {
        status: StatusCode.OK,
        data: null,
        error: null
    };
    constructor() {
        this.dbConfig = { ...databaseConfig };
        this.dbConfig.entities = [ Message ];
    }

    async connect() {
        return await createConnection(this.dbConfig);
    }

    async getMessages() {
        try {
            const connection = await this.connect();
            const messageRepository = connection.getRepository(Message);
            const messages = await messageRepository.find();
            connection.close();
            this.result.data = messages;
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }

    async addMessage(userId, message) {
        try {
            this.result.data = null;
            const connection = await this.connect();
            const messageRepository = connection.getRepository(Message);
            const msg = new Message();
            msg.userId = userId;
            msg.msg = message;
            this.result.data = await messageRepository.save(msg);
            connection.close();
            return this.result;
        } catch (error) {
            this.result.status = StatusCode.BAD_REQUEST;
            this.result.error = error;
            return this.result;
        }
    }
}