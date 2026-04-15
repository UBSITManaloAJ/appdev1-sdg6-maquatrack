import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgInfo } from './sdg-info';

describe('SdgInfo', () => {
  let component: SdgInfo;
  let fixture: ComponentFixture<SdgInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdgInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(SdgInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
