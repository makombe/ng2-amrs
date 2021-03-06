import { FormsModule } from '@angular/forms';
import { SelectModule } from 'angular2-select';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LocationResourceService } from '../../../openmrs-api/location-resource.service';
import { LocationFilterComponent } from './location-filter.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NgSelectModule } from '@ng-select/ng-select';

const locations = [
  {
    uuid: '123',
    countyDistrict: 'Wareng',
    stateProvince: 'Uasin Gishu',
    name: 'MTRH Module 1',
    display: 'MTRH Module 1'
  },
  {
    uuid: '456',
    countyDistrict: 'Wareng',
    stateProvince: 'Uasin Gishu',
    name: 'MTRH Module 2',
    display: 'MTRH Module 2'
  },
  {
    uuid: '789',
    countyDistrict: 'Kosirai',
    stateProvince: 'Nandi',
    name: 'Mosoriot',
    display: 'Mosoriot'
  }
];

class FakeLocationResourceService {
  private locations = new BehaviorSubject<any>(null);

  constructor() {
  }

  getLocations(): Observable<any> {
    this.locations.next(locations);
    return this.locations.asObservable();
  }
}

describe('Component: Location Filter Component', () => {
  let component: LocationFilterComponent;
  let fixture: ComponentFixture<LocationFilterComponent>;
  let locationResourceService: LocationResourceService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgSelectModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: LocationResourceService,
          useClass: FakeLocationResourceService
        }
      ],
      declarations: [LocationFilterComponent]
    });
    fixture = TestBed.createComponent(LocationFilterComponent);
    component = fixture.componentInstance;
    locationResourceService = TestBed.get(LocationResourceService);
  }));

  afterEach(async(() => {
    TestBed.resetTestingModule();
    // component.locationUuids = undefined;
    // component.county = undefined;
  }));

  it('should instantiate the component', (done) => {
    expect(component).toBeTruthy();
    done();
  });
  it('should generate locations, counties, locationDropdownOptions, countyDropdownOptions in ' +
    'the correct format', async(() => {
    spyOn(component, 'resolveLocationDetails').and.callThrough();
    component.resolveLocationDetails();
    let _locations = {
      '123': {
        uuid: '123',
        district: 'Wareng',
        county: 'Uasin Gishu',
        facility: 'MTRH Module 1',
        facilityName: 'MTRH Module 1'
      },
      '456': {
        uuid: '456',
        district: 'Wareng',
        county: 'Uasin Gishu',
        facility: 'MTRH Module 2',
        facilityName: 'MTRH Module 2'
      },
      '789': {
        uuid: '789',
        district: 'Kosirai',
        county: 'Nandi',
        facility: 'Mosoriot',
        facilityName: 'Mosoriot'
      }
    };
    let counties = {
      'Uasin Gishu': [
        {
          uuid: '123',
          countyDistrict: 'Wareng',
          stateProvince: 'Uasin Gishu',
          name: 'MTRH Module 1',
          display: 'MTRH Module 1'
        },
        {
          uuid: '456',
          countyDistrict: 'Wareng',
          stateProvince: 'Uasin Gishu',
          name: 'MTRH Module 2',
          display: 'MTRH Module 2'
        }
      ],
      'Nandi': [
        {
          uuid: '789',
          countyDistrict: 'Kosirai',
          stateProvince: 'Nandi',
          name: 'Mosoriot',
          display: 'Mosoriot'
        }
      ]
    };
    expect(component.locations).toEqual(_locations);
    expect(component.counties).toEqual(counties);
    expect(component.locationDropdownOptions).toEqual(
      [
        {value: '123', label: 'MTRH Module 1'},
        {value: '456', label: 'MTRH Module 2'},
        {value: '789', label: 'Mosoriot'}
      ]);
    expect(component.countyDropdownOptions).toEqual(['Uasin Gishu', 'Nandi']);
  }));

  it('should set locations when a county is given', fakeAsync(() => {
    component.county = 'Uasin Gishu';
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.selectedLocations).toEqual([
      {value: '123', label: 'MTRH Module 1'},
      {value: '456', label: 'MTRH Module 2'}
    ]);
  }));

  it('should set county when an array of locations is given', fakeAsync(() => {
    component.locationUuids = ['123', '456'];
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.selectedCounty).toEqual('Uasin Gishu');
  }));

  it('should set county when a coma separated string of locations is given', fakeAsync(() => {
    component.locationUuids = '123,456';
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.selectedCounty).toEqual('Uasin Gishu');
  }));

  it('should NOT set county when locations from different counties are given', fakeAsync(() => {
    // 123 = Uasin Gishu && 789 = Nandi
    component.locationUuids = '123,789';
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.selectedCounty).toEqual('');
  }));

});

