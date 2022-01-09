import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ubicacionForm = this.fb.group({
      rubro: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarUbicacion(){
    console.log("Cintia no te golpees")
  }

  /*validacionCamposFormulario(){}*/

}
