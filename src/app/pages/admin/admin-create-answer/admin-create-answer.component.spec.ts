import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateAnswerComponent } from './admin-create-answer.component';

describe('AdminCreateAnswerComponent', () => {
  let component: AdminCreateAnswerComponent;
  let fixture: ComponentFixture<AdminCreateAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
