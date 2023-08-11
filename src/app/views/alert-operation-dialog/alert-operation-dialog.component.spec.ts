import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertOperationDialogComponent } from './alert-operation-dialog.component';

describe('AlertOperationDialogComponent', () => {
  let component: AlertOperationDialogComponent;
  let fixture: ComponentFixture<AlertOperationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertOperationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
