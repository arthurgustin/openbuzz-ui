import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectListComponent } from './prospect-list.component';

describe('CompanyListComponent', () => {
  let component: ProspectListComponent;
  let fixture: ComponentFixture<ProspectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
