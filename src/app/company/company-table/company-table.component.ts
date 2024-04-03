import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTableComponent {

  @Input({ required: true })
  companies!: Company[];

  @Output()
  companyDeleted = new EventEmitter<Company>();
}
