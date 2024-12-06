import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private readonly http: HttpClient) {}

  fakeApiCall1() {
    return this.http.get<string>('/api/fake1');
  }
}
