import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss'
})
export class CompanyEditComponent implements OnInit {

  companyId!: number;
  isNewCompany!: boolean;

  // companyForm = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  //   phone: new FormControl(''),
  // });

  // companyForm = this.fb.group({
  //   name: this.fb.control(''),
  //   email: this.fb.control(''),
  //   phone: this.fb.control(''),
  // });

  companyForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId).subscribe(company => {
        this.companyForm.patchValue(company);
      });
    }
  }

  saveCompany(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company = this.companyForm.value as Company;
    const serviceObservable = this.isNewCompany
      ? this.companyService.addCompany(company)
      : this.companyService.updateCompany(this.companyId, company);

    serviceObservable.subscribe(() => this.router.navigateByUrl('/company/list'));

    // if (this.isNewCompany) {
    //   this.companyService.addCompany(company).subscribe(() => {
    //     this.router.navigateByUrl('/company/list');
    //   });
    // } else {
    //   this.companyService.updateCompany(this.companyId, company).subscribe(() => {
    //     this.router.navigateByUrl('/company/list');
    //   });
    // }
  }
}
