import { Timestamp } from '@angular/fire/firestore';

export interface Message {
    id?: string;
    name: string;
    date: Timestamp;
    photo_url: string;
    photo_filename: string;
    audio_url: string;
    audio_filename: string;
  }
  