import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefManagementComponent } from './pref-management.component';

describe('PrefManagementComponent', () => {
  let component: PrefManagementComponent;
  let fixture: ComponentFixture<PrefManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrefManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
