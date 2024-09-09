import { Component, OnInit } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'radio-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {


  constructor(public router:Router){}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  public getCurrentRoute():string{
    const stringRoute:string = this.router.url;
    return stringRoute;
  }

}
