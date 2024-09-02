import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPodcastComponent } from './new-podcast.component';

describe('NewPodcastComponent', () => {
  let component: NewPodcastComponent;
  let fixture: ComponentFixture<NewPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPodcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
