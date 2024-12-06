import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FakeModel } from './model';
import { FakeApiService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading = true;
  api1?: FakeModel;
  ngOnInitDone = false;

  constructor(private readonly api: FakeApiService) {}

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async ngOnInit() {
    console.log('Calling fake API 1');
    await this.callFakeApi1();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all([this.callFakeApi2(), this.callFakeApi3(), this.callFakeApi4(), this.callFakeApi5()]).then(() => {
      this.loading = false;
    });
    this.ngOnInitDone = true;
  }

  async callFakeApi1() {
    console.log('Calling fake API 1');
    this.api1 = await firstValueFrom(this.api.fakeApiCall1());
    console.log('Fake API 1 response:', this.api1);
  }

  async callFakeApi2() {
    if (this.api1) {
      console.log('Calling fake API 2');
      await firstValueFrom(this.api.fakeApiCall2());
    }
  }

  async callFakeApi3() {
    if (this.api1) {
      console.log('Calling fake API 3');
      await firstValueFrom(this.api.fakeApiCall3());
    }
  }

  async callFakeApi4() {
    if (this.api1) {
      console.log('Calling fake API 4');
      await firstValueFrom(this.api.fakeApiCall4());
    }
  }

  async callFakeApi5() {
    if (this.api1) {
      console.log('Calling fake API 5');
      await firstValueFrom(this.api.fakeApiCall5());
    }
  }
}
