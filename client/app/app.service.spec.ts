import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ AppService ]
  }));

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('should make post call', () => {
    const service: AppService = TestBed.get(AppService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    service.upload(4).subscribe(() => {});

    const req = httpMock.expectOne(`/api/csv`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('file')).toEqual('4');
    req.flush([]);
  });
});
