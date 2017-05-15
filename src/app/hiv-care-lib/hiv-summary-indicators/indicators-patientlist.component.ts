import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import * as _ from 'lodash';
import {
    HivSummaryIndicatorsResourceService
} from '../../etl-api/hiv-summary-indicators-resource.service';

@Component({
    selector: 'hiv-summary-indicators-patient-list',
    templateUrl: 'indicators-patientlist.component.html'
})
export class HivSummaryIndicatorsPatientListComponent implements OnInit {
    routeParamsSubscription: Subscription;
    indicator: string;
    translatedIndicator: string;
    patientData: any;
    startDate: any;
    endDate: any;
    startAge: any;
    endAge: any;
    startIndex: number = 0;
    locationUuid: any;
    isLoading: boolean = false;
    dataLoaded: boolean = false;
    overrideColumns: Array<any> = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private resourceService: HivSummaryIndicatorsResourceService) {
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe((params) => {
            if (params) {
                let period = params['period'].split('|');
                this.indicator = params['indicator'];
                console.log('indicator------>', this.indicator);
                this.getDateRange(period);
                this.startAge = params['startAge'];
                this.endAge = params['endAge'];
                this.overrideColumns.push({
                    field: 'identifiers',
                    onCellClicked: (column) => {
                        this.redirectTopatientInfo(column.data.patient_uuid);
                    },
                    cellRenderer: (column) => {
                        return '<a href="javascript:void(0);" title="Identifiers">'
                            + column.value + '</a>';
                    }
                });

                this.loadPatientData();
            }

        });
    }
    getDateRange(period) {
        this.startDate = period[0].split('/');
        this.endDate = period[1].split('/');
    }

    loadPatientData() {
        this.resourceService.getHivSummaryIndicatorsPatientList({
            endDate: this.endDate,
            indicator: this.indicator,
            locationUuids: '08fec056-1352-11df-a1f1-0026b9348838',
            startDate: this.startDate,
            startAge: this.startAge,
            endAge: this.endAge
        }).subscribe((report) => {
            this.patientData = this.patientData ? this.patientData.concat(report) : report;
            this.isLoading = false;
            this.startIndex += report.length;
            if (report.length < 300) {
                this.dataLoaded = true;
            }
        });
    }

    loadMorePatients() {
        this.isLoading = true;
        this.loadPatientData();
    }

    redirectTopatientInfo(patientUuid) {
        if (patientUuid === undefined || patientUuid === null) {
            return;
        }
        this.router.navigate(['/patient-dashboard/' + patientUuid + '/general/landing-page']);
    }

}
