import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages = this.http.get<any[]>('http://localhost:4201');
  title = 'lig-chat-app';

  constructor(private http: HttpClient) {}
}
