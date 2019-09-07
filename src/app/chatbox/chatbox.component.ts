import { Component, OnInit } from '@angular/core';
import { UtilityService, ChatMessage } from '../../service/utility.service';
import { MessageService } from '../../service/message.service';
import { MessagingService } from '../../service/messaging.service';
import { StatusCode } from '../../../server/config/status-code';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  private chatMessages: ChatMessage[];
  private chatMessage = '';
  private loggedUserId: number;
  private loggedUserName: string;
  private users: any;
  constructor(private utilSvc: UtilityService,
              private msgSvc: MessageService,
              private chatSvc: MessagingService) { }

  ngOnInit() {
    const sessionData = this.utilSvc.getSession();
    this.loggedUserId = sessionData.loggedUserId;
    this.loggedUserName = sessionData.loggedUserName;
    this.users = JSON.parse(sessionData.users);
    if (this.loggedUserId === null) {
      location.href = '/login';
    }

    this.msgSvc.getAllMessages().subscribe(result => {
      this.chatMessages = this.parseChatMessages(result.data);
      this.chatSvc.onMessage(this.chatMessages);
    });
  }

  logout(): void {
    this.utilSvc.destroySession();
    location.href = '/login';
  }

  sendMessage(): void {
    this.msgSvc.addMessage(this.loggedUserId, this.chatMessage).subscribe(result => {
      this.chatMessage = '';
      if (result.status === StatusCode.OK) {
        const chat: ChatMessage = {
          id: result.data.id,
          message: result.data.msg,
          username: this.loggedUserName,
          userId: this.loggedUserId,
          isLoggedInUser: null
        };
        this.chatSvc.send(chat);
        this.utilSvc.scollDownWindow();
      }
    });
  }

  parseChatMessages(messages): Array<ChatMessage> {
    const chats = [];
    messages.forEach(msg => {
      let chatOwner = this.users[msg.userId];
      if (!chatOwner) {
        chatOwner = 'unknown';
      }
      const chat: ChatMessage = {
        id: msg.id,
        message: msg.msg,
        username: chatOwner,
        userId: msg.userId,
        isLoggedInUser: this.utilSvc.isLoggedInUser(msg.userId)
      };
      chats.push(chat);
    });
    return chats;
  }
}
