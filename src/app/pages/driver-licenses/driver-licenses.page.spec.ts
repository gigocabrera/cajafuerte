import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverLicensesPage } from './driver-licenses.page';

describe('DriverLicensesPage', () => {
  let component: DriverLicensesPage;
  let fixture: ComponentFixture<DriverLicensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLicensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverLicensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
