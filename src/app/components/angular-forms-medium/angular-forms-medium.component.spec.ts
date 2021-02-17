import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormsMediumComponent } from './angular-forms-medium.component';

describe('AngularFormsMediumComponent', () => {
  let component: AngularFormsMediumComponent;
  let fixture: ComponentFixture<AngularFormsMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFormsMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormsMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
