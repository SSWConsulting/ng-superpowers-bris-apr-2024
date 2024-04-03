import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable, Subject, finalize } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;

  constructor(private readonly companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  deleteCompany(company: Company): void {
    console.log('deleteCompany', company);
    this.companyService.deleteCompany(company.id).pipe(
      finalize(() => console.log('FINALIZE - deleteCompany')),
    ).subscribe(() => this.loadCompanies());
  }

  private loadCompanies(): void {
    this.companies$ = this.companyService.getCompanies();

    // this.companyService.getCompanies()
    //   .pipe(untilDestroyed(this))
    //   .subscribe(x => console.log('SUBSCRIBE - getCompanies', x.length));
  }
}
