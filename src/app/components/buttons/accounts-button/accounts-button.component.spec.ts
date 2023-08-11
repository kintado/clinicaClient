import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsButtonComponent } from './accounts-button.component';

describe('AccountsButtonComponent', () => {
  let component: AccountsButtonComponent;
  let fixture: ComponentFixture<AccountsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
