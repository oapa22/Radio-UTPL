import { Timestamp } from '@angular/fire/firestore';

export interface Podcast {
  id?: string;
  title: string;
  date: Timestamp;
  frame: string;
}
