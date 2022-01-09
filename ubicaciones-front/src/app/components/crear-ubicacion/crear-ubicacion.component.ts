import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ubicacion } from 'src/app/models/ubicacion';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.ubicacionForm = this.fb.group({
      rubro: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarUbicacion(){
    const UBICACION: Ubicacion = {
      rubro: this.ubicacionForm.get('rubro')?.value,
      direccion: this.ubicacionForm.get('direccion')?.value,
      localidad: this.ubicacionForm.get('localidad')?.value
    }

    console.log(UBICACION);
    this.toastr.success('La ubicación fue registrada con éxito!', 'Ubicación registrada!');
    this.router.navigate(['/']);
  }

  /*validacionCamposFormulario(){}*/

}
