import { Component } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {

  companies: Company[] = [];

  constructor() {
    this.companies = [
      { name: 'Company 1', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 2', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 3', phone: '123-456-7890', email: 'one@one.com' },
      { name: 'Company 4', phone: '123-456-7890', email: 'one@one.com' },
    ];
  }

}
