import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage-ui',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage-ui.component.html',
  styleUrls: ['./homepage-ui.component.css'], // Fix: Corrected 'styleUrl' to 'styleUrls'
})

    export class HomepageUIComponent {
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

