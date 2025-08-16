import { Component, Input, ContentChild, TemplateRef, AfterContentInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbIconModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements AfterContentInit, OnDestroy {

  @Input() items: any[] = [];
  @Input() autoplay: boolean = false;
  @Input() autoplayInterval: number = 5000;

  // Plantilla para el fondo (existente)
  @ContentChild('itemTemplate', { static: false }) itemTemplateRef!: TemplateRef<any>;

  // ¡NUEVO! Plantilla para el contenido superpuesto
  @ContentChild('overlayTemplate', { static: false }) overlayTemplateRef!: TemplateRef<any>;

  public currentIndex = 0;
  private intervalId?: number;

  ngAfterContentInit(): void {
    if (this.autoplay && this.items.length > 1) {
      this.startAutoplay();
    }
  }

  public next(): void {
    
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  public prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  private startAutoplay(): void {
    this.intervalId = window.setInterval(() => this.next(), this.autoplayInterval);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  get transformStyle(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}