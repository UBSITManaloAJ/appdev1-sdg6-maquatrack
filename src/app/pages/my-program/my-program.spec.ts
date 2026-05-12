import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgram } from './my-program';

describe('MyProgram', () => {
  let component: MyProgram;
  let fixture: ComponentFixture<MyProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgram],
    }).compileComponents();

    fixture = TestBed.createComponent(MyProgram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
