import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;
  titulo = "Alta Ubicacion";
  boton = "INGRESAR";
  id: string | null;
  mensaje: string;
  titulo_mensaje: string;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _ubicacionService: UbicacionService,
    private aRouter: ActivatedRoute) {
    this.ubicacionForm = this.fb.group({
      rubro: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.mensaje = " ";
    this.titulo_mensaje = " ";
  }

  ngOnInit(): void {
  }

  procesarUbicacion(id: string | null){
    const UBICACION: Ubicacion = {
      rubro: this.ubicacionForm.get('rubro')?.value,
      direccion: this.ubicacionForm.get('direccion')?.value,
      localidad: this.ubicacionForm.get('localidad')?.value
    }

    if(this.esEditar(id)){
      this.editarUbicacion(UBICACION);
    }else{
      this.agregarUbicacion(UBICACION);
    }
  }

  agregarUbicacion(ubicacion: Ubicacion){
    this._ubicacionService.guardarUbicacion(ubicacion).subscribe(data => {
      this.mensaje = 'La ubicación fue registrada con éxito!';
      this.titulo_mensaje = 'Ubicación registrada!';
      this.toastr.success(this.mensaje, this.titulo_mensaje);
      this.router.navigate(['/']);
    }, error => {
      this.mensaje = error;
      this.titulo_mensaje = 'Upps! Ocurrio un error';
      this.toastr.error(this.mensaje, this.titulo_mensaje);
      this.ubicacionForm.reset();
    })
 
  }

  editarUbicacion(ubicacion: Ubicacion){
    const id = this.id || "1";
    this.titulo = 'Editar Ubicacion';
    this.boton = 'MODIFICAR';
    this.obtenerUbicacionSeleccionada(id)
    this._ubicacionService.editarUbicacion(id,ubicacion).subscribe(data => {
      this.mensaje = 'La ubicación fue actualizada con éxito!';
      this.titulo_mensaje = 'Ubicación actualizada!';
      this.toastr.info(this.mensaje, this.titulo_mensaje);
      this.router.navigate(['/']);
    }, error => {
      this.mensaje = error;
      this.titulo_mensaje = 'Upps! Ocurrio un error';
      this.toastr.error(this.mensaje, this.titulo_mensaje);
      this.ubicacionForm.reset();
    })
  }

  esEditar(id: string | null): boolean{
    return id !== null;
  }

  obtenerUbicacionSeleccionada(id: string): Ubicacion {
    let UBICACION: Ubicacion = {
      rubro: " ",
      direccion: " ",
      localidad: " "
    }
    this._ubicacionService.obtenerUbicacion(id).subscribe(data => {
      UBICACION.rubro= data.rubro,
      UBICACION.direccion= data.direccion,
      UBICACION.localidad= data.localidad

      this.ubicacionForm.setValue({
        rubro: data.rubro,
        direccion: data.direccion,
        localidad: data.localidad
      })
    }, error => {
      this.mensaje = error;
      this.titulo_mensaje = 'Upps! Ocurrio un error';
      this.toastr.error(this.mensaje, this.titulo_mensaje);
      this.ubicacionForm.reset();
    })
    return UBICACION;

  }

  /*validacionCamposFormulario(){}*/

}
