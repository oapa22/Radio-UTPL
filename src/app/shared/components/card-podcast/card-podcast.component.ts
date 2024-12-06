import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from '../../interfaces/podcast.interface';

@Component({
    selector: 'shared-card-podcast',
    templateUrl: './card-podcast.component.html',
    styleUrl: './card-podcast.component.css',
    standalone: false
})
export class CardPodcastComponent implements OnInit{
  @Input()
  public podcast!:Podcast;

  ngOnInit(): void {
    if(!this.podcast) throw new Error('Podcast property is required');
  }
}
