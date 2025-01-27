import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import { HomepageUIComponent } from "../homepage-ui/homepage-ui.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbCarouselModule, RouterModule, HomepageUIComponent], // Import NgbCarouselModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
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
  
  
}
