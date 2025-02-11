import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  fetchToken() {
    return this.http.get<any>('http://localhost:3001/api/superblocks/token');
  }
}

