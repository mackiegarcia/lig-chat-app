import UserService from './service/user-service';
import MessageService from './service/message-service';
import { StatusCode } from './config/status-code';
import * as express from 'express';
const userService = new UserService();
const messagService = new MessageService();
export const routes = express.Router();

routes.get('/user/getAll', async (req, res) => {
    const result = await userService.getUsers();
    res.send(result);
});

routes.post('/user/add', async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error: 'username/password not populated'
    };
    if (req.body.username &&  req.body.password){
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 &&  password.length !== 0) {
            result = await userService.addUser(username, password);
        }
    }
    res.send(result);
});

routes.post('/user/login', async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error: 'username/password not populated'
    };
    if (req.body.username &&  req.body.password){
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        if (username.length !== 0 &&  password.length !== 0) {
            result = await userService.loginUser(username, password);
        }
    }
    res.send(result);
});

routes.get('/message/getAll', async (req, res) => {
    const result = await messagService.getMessages();
    res.send(result);
});

routes.post('/message/add', async (req, res) => {
    let result = {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error: 'userId not populated / message is empty'
    };
    const userId = req.body.userId.trim();
    const message = req.body.message.trim();

    if (userId && message.length > 0) {
        result = await messagService.addMessage(userId, message);
    }
    res.send(result);
});
