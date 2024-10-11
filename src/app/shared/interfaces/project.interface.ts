import { Timestamp } from '@angular/fire/firestore';

export interface Project {
  id?: string;
  title: string;
  date: Timestamp;
  keywords: string;
  summary: string;
  photo_url: string;
  photo_filename: string;
  content: string;
  likes: number;
}
