import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      catchError(this.errorHandler)
    );
  }

  // 1. returning an empty observable to show its completed
  // 2. use http interceptor and move this logic to a global error handler
  private errorHandler(error: Error): Observable<Company[]> {
    console.error('Error in company service', error);
    return new Observable<Company[]>();
  }
}
