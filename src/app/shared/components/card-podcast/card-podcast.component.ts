import { Component, Input, OnInit } from '@angular/core';
import { Podcasts } from '../../interfaces/podcasts.interfaces';

@Component({
  selector: 'shared-card-podcast',
  templateUrl: './card-podcast.component.html',
  styleUrl: './card-podcast.component.css'
})
export class CardPodcastComponent implements OnInit{
  @Input()
  public podcast!:Podcasts;

  ngOnInit(): void {
    if(!this.podcast) throw new Error('Podcast property is required');
  }
}
