import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ReplyPageComponent } from '../../adminComponent/reply-page/reply-page.component';

@Component({
  selector: 'app-adminchart',
  standalone: true,
  imports: [HttpClientModule, MatCardModule],
  templateUrl: './adminchart.component.html',
  styleUrls: ['./adminchart.component.css'],
})
export class AdminchartComponent implements OnInit, AfterViewInit {
  data: any;
  charts: any[] = [];
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    Chart.register(...registerables);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const jsonUrl = 'http://localhost:3000/feedback';

    this.http.get(jsonUrl).subscribe(
      (response: any) => {
        this.data = response || [];

        const ratingCounts = this.extractRatingCounts(this.data, 'rating');
        const foodQualityCounts = this.extractRatingCounts(
          this.data,
          'foodQuality'
        );
        const valueForMoneyCounts = this.extractRatingCounts(
          this.data,
          'valueForMoney'
        );
        const monthlySales = this.extractMonthlySales(this.data);

        if (this.isBrowser) {
          if (Object.keys(ratingCounts).length > 0) {
            this.createPieChart(ratingCounts);
          }
          if (Object.keys(foodQualityCounts).length > 0) {
            this.createDoughnutChart(foodQualityCounts);
          }
          if (Object.keys(valueForMoneyCounts).length > 0) {
            this.createDoughnutChartForValueForMoney(valueForMoneyCounts);
          }
          if (Object.keys(monthlySales).length > 0) {
            this.createBarChart(monthlySales);
          }
        }
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      console.warn('DOM is not available in this platform');
    }
  }

  extractRatingCounts(data: any, type: string): { [key: number]: number } {
    const counts: { [key: number]: number } = {};
    data.forEach((user: any) => {
      const value = user[type];
      if (value !== undefined) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    return counts;
  }

  extractMonthlySales(data: any): { [key: string]: number } {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthlySales: { [key: string]: number } = {};

    data.forEach((user: any) => {
      if (user.selectedDate) {
        const [day, month, year] = user.selectedDate.split('/');
        const monthName = monthNames[parseInt(month) - 1];
        monthlySales[monthName] = (monthlySales[monthName] || 0) + 1;
      }
    });

    return monthlySales;
  }

  createPieChart(ratingCounts: { [key: number]: number }): void {
    this.createChart(
      'feedbackChart',
      'pie',
      ratingCounts,
      'Ratings Distribution',
      'Rating'
    );
  }

  createDoughnutChart(foodQualityCounts: { [key: number]: number }): void {
    this.createChart(
      'foodQualityChart',
      'doughnut',
      foodQualityCounts,
      'Food Quality Distribution',
      'Quality'
    );
  }

  createDoughnutChartForValueForMoney(valueForMoneyCounts: {
    [key: number]: number;
  }): void {
    this.createChart(
      'valueForMoneyChart',
      'doughnut',
      valueForMoneyCounts,
      'Value for Money Distribution',
      'Value'
    );
  }

  createBarChart(monthlySales: { [key: string]: number }): void {
    this.createChart(
      'salesBarChart',
      'bar',
      monthlySales,
      'Monthly Sales Outcomes',
      ''
    );
  }

  createChart(
    canvasId: string,
    type: 'pie' | 'doughnut' | 'bar',
    dataObj: { [key: string | number]: number },
    label: string,
    itemLabelPrefix: string
  ): void {
    if (!this.isBrowser) {
      return;
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (canvas) {
      const labels = Object.keys(dataObj).map((key) => {
        if (itemLabelPrefix) {
          return `${itemLabelPrefix} ${key}`;
        }
        return key;
      });
      const data = Object.values(dataObj);

      const chart = new Chart(canvas, {
        type: type,
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: [
                'rgba(255, 165, 0, 0.6)', // Orange
                'rgba(255, 215, 0, 0.6)', // Gold
                'rgba(255, 140, 0, 0.6)', // Dark Orange
                'rgba(255, 223, 186, 0.6)', // Light Orange
                'rgba(255, 200, 87, 0.6)', // Soft Yellow
              ],
              borderColor: [
                'rgba(255, 140, 0, 1)',
                'rgba(255, 215, 0, 1)',
                'rgba(255, 165, 0, 1)',
                'rgba(255, 223, 186, 1)',
                'rgba(255, 200, 87, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: type === 'bar' ? { y: { beginAtZero: true } } : undefined,
        },
      });

      this.charts.push(chart);
    } else {
      console.error(`Canvas element with id "${canvasId}" not found`);
    }
  }
}
