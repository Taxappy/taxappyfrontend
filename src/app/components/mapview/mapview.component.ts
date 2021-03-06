import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Marcador } from '../../class/marcador.class';






@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit {

  coordsActua: any;
  marcadores: Marcador[] = [];
  marcadoresActual: Marcador[] = [];

  lat: number;
  lng: 75.61827329202217;

  @Output() ubicacion = new EventEmitter<any>();

  constructor() {

    // this.marcadores = [];

    this.ubicacion = new EventEmitter();
    const onUbicacionConcedida = ubicacion => {
      this.marcadores = [];
      const nuevoMarcador = new Marcador(ubicacion.coords.latitude, ubicacion.coords.longitude);
      this.marcadores.push(nuevoMarcador);
      this.marcadoresActual.push(nuevoMarcador);
      this.ubicacion.emit({lat: ubicacion.coords.latitude, lng: ubicacion.coords.longitude});
    }

    const onErrorDeUbicacion = err => {
      console.log("Error obteniendo ubicación: ", err);
    }

    const opcionesDeSolicitud = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000 // Esperar solo 5 segundos
    };
    // Solicitar
    navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);


  }

  ngOnInit(): void {


  }



  cambiarMarcador(evento) {
    this.marcadores = [];
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.ubicacion.emit(coords);
  }
}
