import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular/main';
import { TabViewModule } from 'primeng/primeng';

import { Moh731TabularComponent } from './moh-731-report/moh-731-tabular.component';
import { Moh731ReportFilters } from './moh-731-report/moh-731-report-filters.component';
import { Moh731ReportBaseComponent } from './moh-731-report/moh-731-report-base.component';
import { EtlApi } from '../etl-api/etl-api.module';
import { NgamrsSharedModule } from '../shared/ngamrs-shared.module';
import { MOHReportComponent } from './moh-731-report/moh-731-report-pdf-view.component';
import { MOHReportService } from './moh-731-report/moh-731-report-pdf-view.service';
import { LocationResourceService } from '../openmrs-api/location-resource.service';
import {
    HivSummaryIndicatorBaseComponent
} from './hiv-summary-indicators/hiv-summary-report-base.component';
import {
    ReportFilters
} from './report-filters/report-filters.component';
import { SelectModule } from 'angular2-select';
import { HivSummaryTabularComponent } from './hiv-summary-indicators/hiv-summary-tabular.component';
import { DataListsModule } from '../data-lists/data-lists.module';
import {
    HivSummaryIndicatorsPatientListComponent
} from './hiv-summary-indicators/indicators-patientlist.component';
@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        EtlApi,
        FormsModule,
        CommonModule,
        TabViewModule,
        NgamrsSharedModule,
        SelectModule,
        DataListsModule
    ],
    exports: [
        Moh731TabularComponent,
        Moh731ReportFilters,
        EtlApi,
        CommonModule,
        TabViewModule,
        NgamrsSharedModule,
        MOHReportComponent,
        ReportFilters,
        HivSummaryTabularComponent,
        HivSummaryIndicatorsPatientListComponent
    ],
    declarations: [
        Moh731TabularComponent,
        Moh731ReportBaseComponent,
        Moh731ReportFilters,
        MOHReportComponent,
        HivSummaryIndicatorBaseComponent,
        ReportFilters,
        HivSummaryTabularComponent,
        HivSummaryIndicatorsPatientListComponent
    ],
    providers: [MOHReportService, LocationResourceService],
})
export class HivCareLibModule { }
