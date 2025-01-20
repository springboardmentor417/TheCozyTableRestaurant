import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements AfterViewInit {
  
  // 
  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initMap();
    }
  }

  private async initMap(): Promise<void> {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    // Dynamically import Leaflet only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      // Initialize the map
      this.map = L.map(mapContainer, {
        center: [19.076, 72.8777], // Mumbai, India
        zoom: 12, // Adjusted zoom level for a closer view
      });

      // Add a tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Add markers and tooltips for Bandra and Marine Lines
      const locations = [
        {
          lat: 19.060, // Bandra
          lon: 72.8369,
          description: 'Bandra - The Queen of Suburbs!',
        },
        {
          lat: 18.9438, // Marine Lines
          lon: 72.8233,
          description: 'Marine Lines - Scenic beauty by the bay!',
        },
      ];

      locations.forEach((location) => {
        const marker = L.marker([location.lat, location.lon]).addTo(this.map);
        marker.bindTooltip(location.description, { permanent: false, direction: 'top' });
      });
    }
  }
}
