import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  private readonly companies$ = new BehaviorSubject<Company[]>([]);

  constructor(
    private httpClient: HttpClient,
  ) {
    this.loadCompanies();
   }

  private loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`).pipe(
      tap(x => console.log('TAP - getCompanies', x.length)),
      catchError(this.errorHandler<Company[]>),
      finalize(() => console.log('FINALIZE - getCompanies'))
    ).subscribe(companies => this.companies$.next(companies));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.errorHandler<Company>),
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company).pipe(
      catchError(this.errorHandler<Company>),
      tap(() => this.loadCompanies()),
    );
  }

  updateCompany(companyId: number, company: Company): Observable<Company> {
    company.id = companyId;
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${companyId}`, company).pipe(
      catchError(this.errorHandler<Company>),
      tap(() => this.loadCompanies()),
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    console.log('deleteCompany', companyId);
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`).pipe(
      catchError(this.errorHandler<Company>),
      tap(() => this.loadCompanies()),
    );
  }

  // 1. returning an empty observable to show its completed
  // 2. use http interceptor and move this logic to a global error handler
  private errorHandler<T>(error: Error): Observable<T> {
    console.error('Error in company service', error);
    return new Observable<T>();
  }
}
