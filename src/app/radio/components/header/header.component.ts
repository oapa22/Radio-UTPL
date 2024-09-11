import { Component, Input } from '@angular/core';
import { BrowserRoute } from '../../interfaces/browser-route';

@Component({
  selector: 'radio-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()
  public currentRoute:string = '';

  @Input() public browserRoutes:BrowserRoute[] = [];

}
