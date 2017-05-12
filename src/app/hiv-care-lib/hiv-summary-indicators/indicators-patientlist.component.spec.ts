import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { DataListsModule } from '../../data-lists/data-lists.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgamrsSharedModule } from '../../shared/ngamrs-shared.module';

import {
    MomentPipe
} from 'ng2-openmrs-formentry/src/app/components/date-time-picker/pipes/moment.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { HivSummaryIndicatorsPatientListComponent } from './indicators-patientlist.component';
import {
    HivSummaryIndicatorsResourceService
} from '../../etl-api/hiv-summary-indicators-resource.service';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
}
class MockActivatedRoute {
    params = Observable.of([{ 'id': 1 }]);
    data = Observable.of({ 'moh731Params': 1 });
}

class FakeHivSummaryIndicatorsResourceService {

    getHivSummaryIndicatorsPatientList(params): Observable<any> {
        return Observable.of({ status: 'okay' });
    }

}

describe('Component: HivSummaryIndicatorsPatientListComponent', () => {
    let currentTestComponent: HivSummaryIndicatorsPatientListComponent;
    let currentTestFixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HivSummaryIndicatorsPatientListComponent,
                MomentPipe
            ],
            imports: [
                NgamrsSharedModule,
                CommonModule,
                AgGridModule,
                DataListsModule
            ]
        }).overrideComponent(HivSummaryIndicatorsPatientListComponent, {
            set: {
                providers: [
                    {
                        provide: HivSummaryIndicatorsResourceService,
                        useClass: FakeHivSummaryIndicatorsResourceService
                    },
                    { provide: Router, useClass: MockRouter },
                    {
                        provide: ActivatedRoute, useClass: MockActivatedRoute
                    }
                ]
            }
        }).compileComponents().then(() => {
            currentTestFixture = TestBed.createComponent(HivSummaryIndicatorsPatientListComponent);
            currentTestComponent = currentTestFixture.componentInstance;
        });

    }));

    it('should have a defined component', (done) => {
        expect(currentTestComponent).toBeDefined();
        done();
    });

    it('should render component properties correctly', (done) => {
        spyOn(currentTestComponent, 'ngOnInit');
        currentTestComponent.startDate = moment(new Date());
        currentTestComponent.endDate = moment(new Date());
        currentTestComponent.locationUuid = '08fec056-1352-11df-a1f1-0026b9348838';
        currentTestComponent.indicator = 'On Arvs';
        currentTestComponent.startAge = 0;
        currentTestComponent.endAge = 120;
        currentTestComponent.ngOnInit();
        currentTestFixture.detectChanges();
        let h3strong: Array<DebugElement> = currentTestFixture.debugElement
            .queryAll(By.css('h3'));
        let h5strong: Array<DebugElement> = currentTestFixture.debugElement
            .queryAll(By.css('h5'));
        let onArvs = h3strong[0].nativeElement;
        let date = h5strong[0].nativeElement;
        expect(h3strong.length).toBe(1);
        expect(h5strong.length).toBe(1);
        expect(onArvs.textContent).toContain('On Arvs');
        expect(date.textContent).toContain(moment(new Date()).format('DD/MM/YYYY'));
        expect(date.textContent).toContain(moment(new Date()).format('DD/MM/YYYY'));
        done();
    });
});