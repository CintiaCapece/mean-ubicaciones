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

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _ubicacionService: UbicacionService,
    private aRouter: ActivatedRoute) {
    this.ubicacionForm = this.fb.group({
      rubro: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUbicacion(){
    const UBICACION: Ubicacion = {
      rubro: this.ubicacionForm.get('rubro')?.value,
      direccion: this.ubicacionForm.get('direccion')?.value,
      localidad: this.ubicacionForm.get('localidad')?.value
    }

    if(this.id !== null){
      this._ubicacionService.editarUbicacion(this.id,UBICACION).subscribe(data => {
        this.toastr.info('La ubicación fue actualizada con éxito!', 'Ubicación actualizada!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.ubicacionForm.reset();
      })
    } else{
      this._ubicacionService.guardarUbicacion(UBICACION).subscribe(data => {
        this.toastr.success('La ubicación fue registrada con éxito!', 'Ubicación registrada!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.ubicacionForm.reset();
      })
    }
 
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Ubicacion';
      this.boton = 'MODIFICAR';
      this._ubicacionService.obtenerUbicacion(this.id).subscribe(data => {
        this.ubicacionForm.setValue({
          rubro: data.rubro,
          direccion: data.direccion,
          localidad: data.localidad
        })
      }, error => {
        console.log(error);
        this.ubicacionForm.reset();
      })
    }
  }

  /*validacionCamposFormulario(){}*/

}
