import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatAiService {

  private apiUrl = 'https://localhost:44309/api/ChatAi';

  constructor(private http: HttpClient) {}

  sendQuestion(question: string): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>(this.apiUrl, { question });
  }
}
