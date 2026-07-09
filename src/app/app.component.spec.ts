import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { AppComponent } from './app.component';
import { FakeModel } from './model';
import { FakeApiService } from './services';

const MOCK_API1_RESPONSE: FakeModel = { fake: 'api1-value' };

/** Flush all pending microtasks by yielding to a macrotask. */
const flushAsync = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function createMockApiService() {
  return {
    fakeApiCall1: vi.fn().mockReturnValue(of(MOCK_API1_RESPONSE)),
    fakeApiCall2: vi.fn().mockReturnValue(of({})),
    fakeApiCall3: vi.fn().mockReturnValue(of({})),
    fakeApiCall4: vi.fn().mockReturnValue(of({})),
    fakeApiCall5: vi.fn().mockReturnValue(of({})),
  };
}

describe('AppComponent', () => {
  let mockApiService: ReturnType<typeof createMockApiService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: FakeApiService, useValue: mockApiService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('initial signal state (before ngOnInit)', () => {
    it('loading should be true', () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      expect(componentInstance.loading()).toBe(true);
    });

    it('ngOnInitDone should be false', () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      expect(componentInstance.ngOnInitDone()).toBe(false);
    });

    it('api1 should be undefined', () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      expect(componentInstance.api1).toBeUndefined();
    });
  });

  describe('template rendering while loading', () => {
    it('should display "Loading..." before API calls resolve', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.loading')?.textContent?.trim()).toBe('Loading...');
      expect(el.querySelector('.loading-done')).toBeNull();

      await flushAsync();
    });

    it('should not display ngOnInit done indicator before ngOnInit resolves', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.ng-on-init-done')).toBeNull();

      await flushAsync();
    });
  });

  describe('after ngOnInit completes', () => {
    it('loading should be false', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();

      expect(fixture.componentInstance.loading()).toBe(false);
    });

    it('ngOnInitDone should be true', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();

      expect(fixture.componentInstance.ngOnInitDone()).toBe(true);
    });

    it('api1 should be set to the fakeApiCall1 response', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();

      expect(fixture.componentInstance.api1).toEqual(MOCK_API1_RESPONSE);
    });

    it('should call every API method exactly once', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();

      expect(mockApiService.fakeApiCall1).toHaveBeenCalledTimes(1);
      expect(mockApiService.fakeApiCall2).toHaveBeenCalledTimes(1);
      expect(mockApiService.fakeApiCall3).toHaveBeenCalledTimes(1);
      expect(mockApiService.fakeApiCall4).toHaveBeenCalledTimes(1);
      expect(mockApiService.fakeApiCall5).toHaveBeenCalledTimes(1);
    });

    it('should display "Done Loading" in the template', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.loading-done')?.textContent?.trim()).toBe('Done Loading');
      expect(el.querySelector('.loading')).toBeNull();
    });

    it('should display the ngOnInit done indicator in the template', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      await flushAsync();
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.ng-on-init-done')?.textContent?.trim()).toBe('ngOnInit Done');
    });
  });

  describe('callFakeApi2', () => {
    it('should not call the API when api1 is undefined', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      await componentInstance.callFakeApi2();
      expect(mockApiService.fakeApiCall2).not.toHaveBeenCalled();
    });

    it('should call the API when api1 is set', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      componentInstance.api1 = MOCK_API1_RESPONSE;
      await componentInstance.callFakeApi2();
      expect(mockApiService.fakeApiCall2).toHaveBeenCalledTimes(1);
    });
  });

  describe('callFakeApi3', () => {
    it('should not call the API when api1 is undefined', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      await componentInstance.callFakeApi3();
      expect(mockApiService.fakeApiCall3).not.toHaveBeenCalled();
    });

    it('should call the API when api1 is set', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      componentInstance.api1 = MOCK_API1_RESPONSE;
      await componentInstance.callFakeApi3();
      expect(mockApiService.fakeApiCall3).toHaveBeenCalledTimes(1);
    });
  });

  describe('callFakeApi4', () => {
    it('should not call the API when api1 is undefined', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      await componentInstance.callFakeApi4();
      expect(mockApiService.fakeApiCall4).not.toHaveBeenCalled();
    });

    it('should call the API when api1 is set', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      componentInstance.api1 = MOCK_API1_RESPONSE;
      await componentInstance.callFakeApi4();
      expect(mockApiService.fakeApiCall4).toHaveBeenCalledTimes(1);
    });
  });

  describe('callFakeApi5', () => {
    it('should not call the API when api1 is undefined', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      await componentInstance.callFakeApi5();
      expect(mockApiService.fakeApiCall5).not.toHaveBeenCalled();
    });

    it('should call the API when api1 is set', async () => {
      const { componentInstance } = TestBed.createComponent(AppComponent);
      componentInstance.api1 = MOCK_API1_RESPONSE;
      await componentInstance.callFakeApi5();
      expect(mockApiService.fakeApiCall5).toHaveBeenCalledTimes(1);
    });
  });
});
