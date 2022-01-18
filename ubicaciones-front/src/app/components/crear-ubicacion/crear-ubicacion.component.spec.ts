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

 it('Debe devolver la Ubicacion que tiene el ID 3', () => {
    const newUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};

    ubicacionHttpSpy.obtenerUbicacion.and.returnValue(of(newUbicacion));

    const ubicacionAgregada: Ubicacion = component.obtenerUbicacionSeleccionada("3");

    expect(ubicacionAgregada.rubro).toBe(newUbicacion.rubro);
    expect(ubicacionAgregada.direccion).toBe(newUbicacion.direccion);
    expect(ubicacionAgregada.localidad).toBe(newUbicacion.localidad);
  });

  it('Debe devolver mensaje de que se agrego la ubicacion cuando se agrega una nueva', () => {
    const newUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas'};

    ubicacionHttpSpy.guardarUbicacion.and.returnValue(of(newUbicacion));

    component.agregarUbicacion(newUbicacion);

    expect(component.titulo_mensaje).toEqual('Ubicación registrada!');
    expect(component.mensaje).toEqual('La ubicación fue registrada con éxito!');
  });

  it('Debe devolver mensaje de que se actualizo la ubicacion cuando se pasa un id y se modifica', () => {
    const actualizaUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};

    ubicacionHttpSpy.editarUbicacion.and.returnValue(of(actualizaUbicacion));

    component.id = "3";
    component.editarUbicacion(actualizaUbicacion);

    expect(component.titulo_mensaje).toEqual('Ubicación actualizada!');
    expect(component.mensaje).toEqual('La ubicación fue actualizada con éxito!');
  });

  it('Debe devolver error de que no se reconocio el id dentro del editarUbicacion', () => {
    const actualizaUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};
    component.id = null;
    component.editarUbicacion(actualizaUbicacion);

    expect(component.titulo_mensaje).toEqual('Upps! Ocurrio un error');
    expect(component.mensaje).toEqual('No se reconoce la ubicacion');
  });

  it('Si id no es nulo, debe llamar al servicio de editarUbicacion', () => {
    component.id = "3";
    const actualizaUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};
    ubicacionHttpSpy.editarUbicacion.and.returnValue(of(actualizaUbicacion));
    component.procesarUbicacion(component.id);
    expect(ubicacionHttpSpy.editarUbicacion).toHaveBeenCalled();
  });

  it('Si id es nulo, debe llamar al servicio de agregarUbicacion', () => {
    component.id = null;
    const newUbicacion: Ubicacion = {rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',_id: "3"};
    ubicacionHttpSpy.guardarUbicacion.and.returnValue(of(newUbicacion));
    component.procesarUbicacion(component.id);
    expect(ubicacionHttpSpy.guardarUbicacion).toHaveBeenCalled();
  });

});
