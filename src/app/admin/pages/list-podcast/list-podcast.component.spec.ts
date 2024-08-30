import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPodcastComponent } from './list-podcast.component';

describe('ListPodcastComponent', () => {
  let component: ListPodcastComponent;
  let fixture: ComponentFixture<ListPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPodcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
