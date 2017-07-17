import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCreateComponent } from './forms-create.component';

describe('FormsCreateComponent', () => {
  let component: FormsCreateComponent;
  let fixture: ComponentFixture<FormsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsCreateComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
