import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'radio-element-radio',
  templateUrl: './element-radio.component.html',
  styleUrl: './element-radio.component.css'
})
export class ElementRadioComponent implements OnInit{
  @ViewChild('audioCanvas', { static: true }) audioCanvas!: ElementRef<HTMLCanvasElement>;

  public audioContext!: AudioContext;
  public analyser!: AnalyserNode;
  public dataArray!: Uint8Array;
  public audio!: HTMLAudioElement;
  public source!: MediaElementAudioSourceNode;
  public canvasContext!: CanvasRenderingContext2D;
  public isPlaying: boolean = false;
  // audioUrl: string = 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/audio_message%2FAs%20It%20Was.mp3?alt=media&token=7853d292-fb3d-442a-9e89-4ccd830da3ad';
  public audioUrl: string = 'La Muralla Verde (Official Audio).mp3';
  public safeUrl: SafeResourceUrl = '';

  public rangeValue: number = 50;

  constructor(private sanitizer: DomSanitizer){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioUrl);
  }

  public ngOnInit(): void {
    // Crear el contexto de audio y el analizador
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    // Crear el audio
    this.audio = new Audio(this.audioUrl);
    this.onRangeChange(`${this.rangeValue}`);
    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    // Obtener el contexto del canvas
    this.canvasContext = this.audioCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    // Inicializar la animación de las barras
    this.animateBars();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
      this.audioContext.resume();
      console.log("Rango del valor del input: ",this.rangeValue);
    }
    this.isPlaying = !this.isPlaying;
  }

  public animateBars() {
    requestAnimationFrame(() => this.animateBars());

    // Obtener los datos de frecuencia
    this.analyser.getByteFrequencyData(this.dataArray);

    const canvas = this.audioCanvas.nativeElement;
    const width = canvas.width;
    const height = canvas.height;

    // Limitar el número de barras a 100
    const numBars = 100;

    // Ajustar el ancho de cada barra proporcional al número de barras y al ancho del canvas
    const barWidth = width / numBars;

    let barHeight: number;
    let x = 0;

    // Limpiar el canvas antes de dibujar
    this.canvasContext.clearRect(0, 0, width, height);

    // Punto medio del eje 'Y'
    const centerY = height / 2;

    for (let i = 0; i < numBars; i++) {
      // Escalar la altura de la barra proporcional a la altura del canvas
      barHeight = (this.dataArray[i] / 255) * (height / 2); // Escala de 0 a la mitad del alto del canvas

      // Cambiar los colores de las barras (opcional, para un efecto visual)
      // const r = barHeight + 25 * (i / this.dataArray.length);
      // const g = 250 * (i / this.dataArray.length);
      // const b = 50;

      let r = 0;
      let g = 0;
      let b = 0;

      if( i < this.rangeValue){
        r = 255;
        g = 255;
        b = 255;
      } else {
        r = 131;
        g = 131;
        b = 131;
      }

      this.canvasContext.fillStyle = `rgb(${r},${g},${b})`;

      // Dibujar cada barra centrada verticalmente
      this.canvasContext.fillRect(x, centerY - barHeight, barWidth, barHeight * 2); // Centrar la barra y hacerla crecer desde el centro en ambas direcciones

      x += barWidth + 1; // Añadir espacio entre las barras
    }
  }

  public onRangeChange(value: string) {
    let currenteAudioVolume = 0;

    this.rangeValue = parseInt(value); // Convertir el valor a número
    currenteAudioVolume = +value/100;

    this.audio.volume = currenteAudioVolume;
    console.log("Longitud de barra: ",this.rangeValue, "Volumen: ", currenteAudioVolume);
  }
}
