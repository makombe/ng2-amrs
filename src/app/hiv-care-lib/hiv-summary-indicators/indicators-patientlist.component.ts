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
                let monthYear = params['period'].split('|');
                this.indicator = params['indicator'];
                this.setDateRange(monthYear);
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
    setDateRange(monthYear) {
        let startDate = monthYear[0].split('/');
        let endDate = monthYear[1].split('/');
        this.startDate = moment([startDate[2], startDate[1] - 1, startDate[0]]);
        this.endDate = moment([endDate[2], endDate[1] - 1, endDate[0]]);
    }

    loadPatientData() {
        this.resourceService.getHivSummaryIndicatorsPatientList({
            endDate: this.endDate.endOf('month').format(),
            indicator: this.indicator,
            locationUuids: this.locationUuid,
            startIndex: this.startIndex,
            startDate: this.startDate.format(),
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
