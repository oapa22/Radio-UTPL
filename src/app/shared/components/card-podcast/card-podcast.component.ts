import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from '../../interfaces/podcast.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'shared-card-podcast',
  templateUrl: './card-podcast.component.html',
  styleUrl: './card-podcast.component.css'
})
export class CardPodcastComponent implements OnInit{
  @Input()
  public podcast!:Podcast;
  safeContent: SafeHtml | null = null;
  
  constructor(
    private sanitizer: DomSanitizer,
  ){

  }
  ngOnInit(): void {
    if(!this.podcast) throw new Error('Podcast property is required');
    if (this.podcast) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.podcast.frame || '');
    }
  }
}
