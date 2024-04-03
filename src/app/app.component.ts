import { Component } from '@angular/core';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firebootcamp-crm';

  companyCount$ = this.companyService.getCompanies().pipe(
    map(companies => companies.length),
  );

  constructor(
    private companyService: CompanyService,
  ) {
  }
}
