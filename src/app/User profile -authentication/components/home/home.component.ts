import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbCarouselModule, RouterModule, ], // Import NgbCarouselModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

   // Carousel images
    carouselImages: string[] = [
    'assets/TajLife2v.jpg',
    'assets/CozyTable2v.png',
    'assets/CozyDine2v.jpg',
  ];

  ngAfterViewInit() {
    $(document).ready(function () {
      $(".home-header").fadeIn(2000);
      $(".menu").hide().fadeIn(3000);
      $(".dashboard").hover(
        function () {
          $(this).css("color", "#f4e041");
        },
        function () {
          $(this).css("color", "#ffffff");
        }
      );
    });
  }
  ngAfterViewInitt(){$(document).ready(function () {
    $('.grid-box').hover(function () {
        $(this).find('.grid-box-text').css('animation', 'slideIn 0.5s forwards ease-in-out');
    }, function () {
        $(this).find('.grid-box-text').css('animation', '');
    });
});}
  
images = [
  { src: 'assets/chill.jpg', text: 'Get Started with Your Order!', showText: false },
  { src: 'assets/Family.jpg', text: 'Enjoy Now Delicious Food with Family!', showText: false },
  { src: 'assets/Starter1.jpg', text: 'Get Ready for Your Meal', showText: false },
  { src: 'assets/DineSmall.jpg', text: 'Our Deserts & Drinks Will AddUp the Enlightment!', showText: false }
];

onHover(index: number): void {
  this.images[index].showText = true;
}

onLeave(index: number): void {
  this.images[index].showText = false;
}

}
