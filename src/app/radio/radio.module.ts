import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SharedModule } from "../shared/shared.module";
import { SectionAboutUsComponent } from './components/section-about-us/section-about-us.component';
import { SectionScheduleComponent } from './components/section-schedule/section-schedule.component';
import { ElementRadioComponent } from './components/element-radio/element-radio.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';
import { CarouselSpotifyComponent } from './components/carousel-spotify/carousel-spotify.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProjectTemplateComponent } from './pages/project-template/project-template.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    AboutUsPageComponent,
    SchedulePageComponent,
    ProjectsPageComponent,
    ContactPageComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    SectionAboutUsComponent,
    SectionScheduleComponent,
    ElementRadioComponent,
    MessageBoardComponent,
    CarouselSpotifyComponent,
    PaginationComponent,
    ProjectTemplateComponent,
  ],
  imports: [
    CommonModule,

    RadioRoutingModule,
    SharedModule
]
})
export class RadioModule { }
