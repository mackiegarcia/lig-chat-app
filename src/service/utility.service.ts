import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  constructor(private accountSvc: AccountService) { }

  createSession(userId, username): void {
    sessionStorage.setItem('loggedUserId', userId);
    sessionStorage.setItem('loggedUserName', username);
    this.accountSvc.getAllUsers().subscribe(users => {
      const usrs = {};
      if (users) {
        users.forEach(user => usrs[user.id] = user.username);
        sessionStorage.setItem('users', JSON.stringify(usrs));
      }
    });
  }

  destroySession(): void {
    sessionStorage.removeItem('loggedUserId');
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('loggedUserName');
  }

  getSession(): any {
    const sessionData = {
      loggedUserId: sessionStorage.getItem('loggedUserId'),
      loggedUserName: sessionStorage.getItem('loggedUserName'),
      users: sessionStorage.getItem('users'),
    };
    return sessionData;
  }

  isLoggedInUser(userId): boolean {
    return userId.toString() === sessionStorage.getItem('loggedUserId');
  }

  scollDownWindow(): void {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }
}

export interface ChatMessage {
  id: number;
  username: string;
  message: string;
  userId: number;
  isLoggedInUser: boolean;
}
