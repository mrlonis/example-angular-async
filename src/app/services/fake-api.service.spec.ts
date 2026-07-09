import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakeModel } from '../model';
import { FakeApiService } from './fake-api.service';

const MOCK_RESPONSE: FakeModel = { fake: 'test-value' };

describe('FakeApiService', () => {
  let service: FakeApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FakeApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fakeApiCall1 should send a GET request to /api/fake1 and return the response', () => {
    let result: FakeModel | undefined;

    service.fakeApiCall1().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/fake1');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE);
    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('fakeApiCall2 should send a GET request to /api/fake2 and return the response', () => {
    let result: FakeModel | undefined;

    service.fakeApiCall2().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/fake2');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE);
    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('fakeApiCall3 should send a GET request to /api/fake3 and return the response', () => {
    let result: FakeModel | undefined;

    service.fakeApiCall3().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/fake3');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE);
    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('fakeApiCall4 should send a GET request to /api/fake4 and return the response', () => {
    let result: FakeModel | undefined;

    service.fakeApiCall4().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/fake4');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE);
    expect(result).toEqual(MOCK_RESPONSE);
  });

  it('fakeApiCall5 should send a GET request to /api/fake5 and return the response', () => {
    let result: FakeModel | undefined;

    service.fakeApiCall5().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/fake5');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RESPONSE);
    expect(result).toEqual(MOCK_RESPONSE);
  });
});
