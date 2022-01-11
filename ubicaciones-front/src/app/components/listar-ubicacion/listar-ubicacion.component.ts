import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-listar-ubicacion',
  templateUrl: './listar-ubicacion.component.html',
  styleUrls: ['./listar-ubicacion.component.css']
})
export class ListarUbicacionComponent implements OnInit {
  listUbicaciones: Ubicacion[] = [];

  constructor(private _ubicacionService: UbicacionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerUbicaciones();
  }

  obtenerUbicaciones() {
    this._ubicacionService.getUbicacion().subscribe(data => {
      this.listUbicaciones = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUbicacion(id: any) {
    this._ubicacionService.eliminarUbicacion(id).subscribe(data => {
      this.toastr.error('La ubicacion fue eliminada con exito','Ubicacion eliminada!');
      this.obtenerUbicaciones();
    }, error => {
      console.log(error);
    })
  }

}
