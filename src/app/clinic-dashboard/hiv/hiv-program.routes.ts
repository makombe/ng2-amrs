import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Moh731ReportComponent } from './moh-731/moh-731-report.component';
import {
    HivSummaryIndicatorComponent
} from './hiv-summary-indicators/hiv-summary-indicator.component';
import {
    HivSummaryIndicatorsPatientListComponent
} from '../../hiv-care-lib/hiv-summary-indicators/indicators-patientlist.component';
import { PatientListHIVComponent } from './hiv-summary-indicators/patient-list';

const routes: Routes = [
    {
        path: 'landing-page',
        component: Moh731ReportComponent // replace with landing page for module
    },
    {
        path: 'moh-731-report',
        component: Moh731ReportComponent // replace with landing page for module
    },
    {
        path: 'hiv-summary-indicator-report',
      //  component: HivSummaryIndicatorComponent
        children: [
            {
                path: '',
                component: HivSummaryIndicatorComponent
            },
            {
                path: 'patient-list/:indicator/:period',
                component: HivSummaryIndicatorsPatientListComponent,
            }
        ]
    },
    /*{
        path: 'patient-list/:indicator/:period',
        component: PatientListHIVComponent,
    }*/
];

export const clinicDashboardHivRouting: ModuleWithProviders =
    RouterModule.forChild(routes);
