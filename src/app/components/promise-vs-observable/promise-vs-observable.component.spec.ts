import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromiseVsObservableComponent } from './promise-vs-observable.component';

describe('PromiseVsObservableComponent', () => {
  let component: PromiseVsObservableComponent;
  let fixture: ComponentFixture<PromiseVsObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromiseVsObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromiseVsObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
