import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListQuestionComponent } from './admin-list-question.component';

describe('AdminListQuestionComponent', () => {
  let component: AdminListQuestionComponent;
  let fixture: ComponentFixture<AdminListQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
