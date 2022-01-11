import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-listar-ubicacion',
  templateUrl: './listar-ubicacion.component.html',
  styleUrls: ['./listar-ubicacion.component.css']
})
export class ListarUbicacionComponent implements OnInit {
  listUbicaciones: Ubicacion[] = [];

  constructor(private _ubicacionService: UbicacionService) { }

  ngOnInit(): void {
    this.obtenerUbicaciones();
  }

  obtenerUbicaciones() {
    this._ubicacionService.getUbicacion().subscribe(data => {
      console.log(data);
      this.listUbicaciones = data;
    }, error => {
      console.log(error);
    })
  }

}
