import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListCategoryComponent } from './survey-list-category.component';

describe('SurveyListCategoryComponent', () => {
  let component: SurveyListCategoryComponent;
  let fixture: ComponentFixture<SurveyListCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
