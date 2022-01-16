import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { Ubicacion } from 'src/app/models/ubicacion';

import { CrearUbicacionComponent } from './crear-ubicacion.component';
import { ListarUbicacionComponent } from '../listar-ubicacion/listar-ubicacion.component';

describe('Testing CrearUbicacionComponent', () => {
  let component: CrearUbicacionComponent;
  let lista: ListarUbicacionComponent;
  let fixture: ComponentFixture<CrearUbicacionComponent>;
  let ubicacionHttpSpy: jasmine.SpyObj<UbicacionService>;

  beforeEach(async () => {
    
    ubicacionHttpSpy = jasmine.createSpyObj<UbicacionService>('UbicacionService',['obtenerUbicacion','editarUbicacion','guardarUbicacion']);

    await TestBed.configureTestingModule({
      imports: [BrowserModule,AppRoutingModule,ReactiveFormsModule,BrowserAnimationsModule,ToastrModule.forRoot()],
      declarations: [ CrearUbicacionComponent, ListarUbicacionComponent ],
      providers: [{provide: UbicacionService, useValue: ubicacionHttpSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUbicacionComponent);
    component = fixture.componentInstance;
  });

  it('Debe existir el componente CrearUbicacion', () => {
    expect(component).toBeTruthy();
  });

  it('Debe devolver OK si se completan los campos obligatorios', () => {
    fixture.detectChanges();

    const rubro = component.ubicacionForm.controls['rubro']
    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']
    rubro.setValue('LICORERIA')
    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    expect(component.ubicacionForm.valid).toBeTrue();
  });

  it('UbicacionForm debe ser invalido cuando no se completan los campos requeridos', () => {
    fixture.detectChanges();

    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']

    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    expect(component.ubicacionForm.invalid).toBeTrue();
  });

  it('Si id no es nulo, esEditar me devuelve True', () => {
    component.id = "3";
    expect(component.esEditar(component.id)).toBeTrue();
  });

  it('Si id es nulo, esEditar me devuelve False', () => {
    component.id = null;
    expect(component.esEditar(component.id)).toBeFalse();
  });

 it('Debe devolver la Ubicacion que tiene el ID 3', () => {
    const newUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};

    ubicacionHttpSpy.obtenerUbicacion.and.returnValue(of(newUbicacion));

    const ubicacionAgregada: Ubicacion = component.obtenerUbicacionSeleccionada("3");

    expect(ubicacionAgregada.rubro).toBe(newUbicacion.rubro);
    expect(ubicacionAgregada.direccion).toBe(newUbicacion.direccion);
    expect(ubicacionAgregada.localidad).toBe(newUbicacion.localidad);
  });

  /*it('Debe devolver error si el ID 3 no tiene ubicacion asociada', () => {
    const mensaje_error = "Error";

    ubicacionHttpSpy.obtenerUbicacion.and.throwError(mensaje_error);

    //component.obtenerUbicacionSeleccionada("3");

    expect(component.obtenerUbicacionSeleccionada("3")).toThrowError(mensaje_error);
    //expect(component.titulo_mensaje).toEqual('Upps! Ocurrio un error');
  });

   it('Debe devolver OK si se completan los campos obligatorios aaayyy', () => {
    fixture.detectChanges();

    const rubro = component.ubicacionForm.controls['rubro']
    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']
    rubro.setValue('LICORERIA')
    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    const newUbicacion: Ubicacion = {rubro:rubro.value,direccion:direccion.value,localidad:localidad.value,fechaCreacion:"2022-01-16T18:56:55.920Z",id:"3"};

    ubicacionHttpSpy.guardarUbicacion.and.returnValue(of(newUbicacion));

    component.agregarUbicacion();

    newUbicacion.localidad = "Caseros";

    ubicacionHttpSpy.editarUbicacion.and.returnValue(of(newUbicacion));
    
    component.id = '3';
    component.agregarUbicacion();

    component.obtenerUbicacionSeleccionada(component.id);
    
    expect(component.UBICACION).toBe(newUbicacion);
  });*/

});
