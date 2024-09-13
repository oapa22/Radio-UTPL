import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRadioComponent } from './element-radio.component';

describe('ElementRadioComponent', () => {
  let component: ElementRadioComponent;
  let fixture: ComponentFixture<ElementRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
