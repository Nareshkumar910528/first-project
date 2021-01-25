import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsProjComponent } from './rxjs-proj.component';

describe('RxjsComponent', () => {
  let component: RxjsProjComponent;
  let fixture: ComponentFixture<RxjsProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
