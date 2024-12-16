import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByUserComponent } from './task-by-user.component';

describe('TaskByUserComponent', () => {
  let component: TaskByUserComponent;
  let fixture: ComponentFixture<TaskByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskByUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
