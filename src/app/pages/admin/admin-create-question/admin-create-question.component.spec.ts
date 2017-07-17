import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateQuestionComponent } from './admin-create-question.component';

describe('AdminCreateQuestionComponent', () => {
  let component: AdminCreateQuestionComponent;
  let fixture: ComponentFixture<AdminCreateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
