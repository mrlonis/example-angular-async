import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FakeModel } from '../model';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  private readonly http = inject(HttpClient);

  fakeApiCall1() {
    return this.http.get<FakeModel>('/api/fake1');
  }

  fakeApiCall2() {
    return this.http.get<FakeModel>('/api/fake2');
  }

  fakeApiCall3() {
    return this.http.get<FakeModel>('/api/fake3');
  }

  fakeApiCall4() {
    return this.http.get<FakeModel>('/api/fake4');
  }

  fakeApiCall5() {
    return this.http.get<FakeModel>('/api/fake5');
  }
}
