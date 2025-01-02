import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rateing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rateing.component.html',
  styleUrls: ['./star-rateing.component.css'],
})
export class StarRateingComponent {
  @Input() maxRating: number = 5;
  @Input() color: string = '#fcc419';
  @Input() size: number = 24;
  @Output() onSetRating = new EventEmitter<number>();

  rating: number = 0; // Current rating
  tempRating: number = 0; // Temporary rating for hover effect

  handleRate(rating: number): void {
    this.rating = rating;
    this.onSetRating.emit(rating);
  }

  setTemporaryRating(rating: number): void {
    this.tempRating = rating;
  }

  clearTemporaryRating(): void {
    this.tempRating = 0;
  }
}
