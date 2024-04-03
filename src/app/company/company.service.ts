import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';

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
      tap(x => console.log('TAP - getCompanies', x.length)),
      catchError(this.errorHandler<Company[]>),
      finalize(() => console.log('FINALIZE - getCompanies'))
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    console.log('deleteCompany', companyId);
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.errorHandler<Company>),
    );
  }

  // 1. returning an empty observable to show its completed
  // 2. use http interceptor and move this logic to a global error handler
  private errorHandler<T>(error: Error): Observable<T> {
    console.error('Error in company service', error);
    return new Observable<T>();
  }
}
