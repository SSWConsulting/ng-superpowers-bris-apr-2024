import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Company 1', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 2', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 3', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 4', phone: '123-456-7890', email: 'one@one.com' },
    ];
  }

}
