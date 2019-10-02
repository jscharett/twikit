import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly uploadURL = '/api/csv';

  constructor(private readonly httpClient: HttpClient) { }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(this.uploadURL, formData);
  }
}
