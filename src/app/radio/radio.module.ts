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
  ],
  imports: [
    CommonModule,

    RadioRoutingModule,
    SharedModule
]
})
export class RadioModule { }
