import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdProgressSpinnerModule, MdProgressBarModule, MdTabsModule
} from '@angular/material';

import {
  DateTimePickerModule
} from 'ng2-openmrs-formentry/src/app/components/date-time-picker';
import { EtlApi } from '../etl-api/etl-api.module';
import { DataListsModule } from '../shared/data-lists/data-lists.module';

@NgModule({
  imports: [
    DateTimePickerModule,
    EtlApi,
    DataListsModule,
    CommonModule,
    FormsModule,
    MdTabsModule,
    MdProgressSpinnerModule,
    MdProgressBarModule
  ],
  exports: [],
  declarations: [],
  providers: [],

})
export class OncologyProgramModule { }
