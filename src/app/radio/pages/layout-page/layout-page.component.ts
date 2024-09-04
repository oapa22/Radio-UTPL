import { Component } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
  selector: 'radio-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://wallpaperbat.com/img/192020-minimal-forest-wallpaper-top-free-minimal-forest-background.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'}
  ]
}
