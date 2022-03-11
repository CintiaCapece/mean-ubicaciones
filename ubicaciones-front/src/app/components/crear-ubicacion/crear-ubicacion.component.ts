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
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    })
    this.mensaje = " ";
    this.titulo_mensaje = " ";
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.setearTitulosBotones();
  }

  ngOnInit(): void {
  }

  procesarUbicacion(){
    let UBICACION: Ubicacion = {
      rubro: this.ubicacionForm.controls['rubro'].value,
      nombre: this.ubicacionForm.controls['nombre'].value,
      direccion: this.ubicacionForm.controls['direccion'].value,
      localidad: this.ubicacionForm.controls['localidad'].value,
      provincia: this.ubicacionForm.controls['provincia'].value,
      pais: this.ubicacionForm.controls['pais'].value,
      latitud: this.ubicacionForm.controls['latitud'].value,
      longitud: this.ubicacionForm.controls['longitud'].value,
    }
    if(this.id != null){
      this.editarUbicacion(UBICACION);
    }else{
      this.agregarUbicacion(UBICACION);
    }
  }

  setearTitulosBotones(){
    if(this.id != null){
      this.titulo = 'Editar Ubicacion';
      this.boton = 'MODIFICAR';
      this.obtenerUbicacionSeleccionada(this.id);
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
    if (this.id == null){
      this.mensaje = 'No se reconoce la ubicacion';
      this.titulo_mensaje = 'Upps! Ocurrio un error';
      console.log(this.mensaje);
      this.toastr.error(this.mensaje, this.titulo_mensaje);
      this.ubicacionForm.reset();
      this.router.navigate(['/']);
    } else {
      this._ubicacionService.editarUbicacion(this.id,ubicacion).subscribe(data => {
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
  }

  obtenerUbicacionSeleccionada(id: string): Ubicacion {
    let ubicacion: Ubicacion = {
      rubro: " ",
      nombre: " ",
      direccion: " ",
      localidad: " ",
      provincia: " ",
      pais: " ",
      latitud: 0,
      longitud: 0
    }
    this._ubicacionService.obtenerUbicacion(id).subscribe(data => {
      ubicacion.rubro= data.rubro,
      ubicacion.nombre= data.nombre,
      ubicacion.direccion= data.direccion,
      ubicacion.localidad= data.localidad,
      ubicacion.provincia= data.provincia,
      ubicacion.pais= data.pais,
      ubicacion.latitud= data.latitud,
      ubicacion.longitud= data.longitud

      this.ubicacionForm.setValue({
        rubro: data.rubro,
        nombre: data.nombre,
        direccion: data.direccion,
        localidad: data.localidad,
        provincia: data.provincia,
        pais: data.pais,
        latitud: data.latitud,
        longitud: data.longitud
      })
    }, error => {
      this.mensaje = error;
      this.titulo_mensaje = 'Upps! Ocurrio un error';
      this.toastr.error(this.mensaje, this.titulo_mensaje);
      this.ubicacionForm.reset();
    })
    return ubicacion;
  }

  /*validacionCamposFormulario(){}*/

}
