import { AfterViewInit, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Icon, tileLayer, Marker, Map } from 'leaflet';
import * as citiesData from '../assets/data/offers.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
  <div class="ij-logo-container">
    <img [ngSrc]="ij_logo" width="138" height="34" />
  </div>
  <div class="map-container">
    <div class="map-frame">
      <div id="map"></div>
    </div>
  </div>
`,
  styles: [`
  .ij-logo-container {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  }

  .map-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 30px;
    padding-bottom: 60px;
    padding-right: 150px;
    padding-left: 150px;
  }
  
  .map-frame {
    border: 2px solid black;
    height: 100%;
    margin-top: 60px;
  }
  
  #map {
    height: 100%;
  }
  `]
})
export class AppComponent implements AfterViewInit {
  ij_logo = '../../../assets/images/ij-logo-default_primary.webp';
  citiesData: any = citiesData;
  currLat = 41.40387579036046;
  currLng = 2.1743379420319395;
  icon = new Icon({
    iconUrl: '../../../assets/images/ij-logo_reduced.webp',
    iconSize: [30, 30],
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    const map = new Map('map').setView(
      [40.43295133137188, -3.1],
      6
    );
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    this.citiesData.default.forEach((offer: any) => {
      const marker = new Marker([offer.lat, offer.lng], {
        icon: this.icon,
      }).addTo(map);
      const shortenedRequirementMin =
        offer.requirementMin.substring(0, 200) + '...';

      const popupContent = `
      <div style="max-width: 400px; border-radius: 10px; padding: 20px;">
      <h3 style="font-size: 24px; margin-bottom: 10px; color: #ff5252;">${offer.title}</h3>
      <p style="font-size: 16px;"><strong>Categoría:</strong> <span>${offer.category.value}</span></p>
      <p style="font-size: 16px;"><strong>Tipo de contrato:</strong> <span>${offer.contractType.value}</span></p>
      <p style="font-size: 16px;"><strong>Subcategoría:</strong> <span>${offer.subcategory.value}</span></p>
      <p style="font-size: 16px;"><strong>Experiencia mínima:</strong> <span>${offer.experienceMin.value}</span></p>
      <p style="font-size: 16px;"><strong>Jornada laboral:</strong> <span>${offer.workDay.value}</span></p>
      <p style="font-size: 16px;"><strong>Nivel de estudio:</strong> <span>${offer.study.value}</span></p>
      <p style="font-size: 16px;"><strong>Requisitos mínimos:</strong></p>
      <p style="font-size: 16px;">${shortenedRequirementMin}</p>
      <p><a href="${offer.link}" target="_blank" style="color: #2196f3; text-decoration: none; font-size: 16px;">Ver oferta completa</a></p>
    </div>
      `;

      const popupOptions = {
        maxWidth: 400,
      };
      marker.bindPopup(popupContent, popupOptions);
    });
  }
}
