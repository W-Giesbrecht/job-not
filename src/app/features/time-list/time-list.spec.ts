import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeList } from './time-list';

describe('TimeList', () => {
  let component: TimeList;
  let fixture: ComponentFixture<TimeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeList],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
