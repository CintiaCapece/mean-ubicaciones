import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { CrearUbicacionComponent } from './crear-ubicacion.component';

describe('Testing CrearUbicacionComponent', () => {
  let component: CrearUbicacionComponent;
  let fixture: ComponentFixture<CrearUbicacionComponent>;
  let ubicacionHttpSpy: jasmine.SpyObj<UbicacionService>;

  beforeEach(async () => {
    
    ubicacionHttpSpy = jasmine.createSpyObj<UbicacionService>('UbicacionService',['obtenerUbicacion','editarUbicacion','guardarUbicacion']);

    await TestBed.configureTestingModule({
      imports: [BrowserModule,AppRoutingModule,ReactiveFormsModule,BrowserAnimationsModule,ToastrModule.forRoot()],
      declarations: [ CrearUbicacionComponent ],
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

  it('Si id no es nulo, el titulo tiene que ser Editar Ubicacion', () => {
    ubicacionHttpSpy.obtenerUbicacion.and.returnValue(of([
      {id:1,rubro:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas'},
      {id:2,rubro:'HELADERIA',direccion:'Calle Falsa 234',localidad:'Las Toninas'}
    ]));

    component.id = '1';
    component.esEditar();
    expect(component.titulo).toBe('Editar Ubicacion');
  });

  it('Si id es nulo, el titulo tiene que ser Alta Ubicacion', () => {
    component.id = null;
    component.esEditar();
    expect(component.titulo).toBe('Alta Ubicacion');
  });

  it('Debe devolver OK si se completan los campos obligatorios aaa', () => {
    fixture.detectChanges();

    const rubro = component.ubicacionForm.controls['rubro']
    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']
    rubro.setValue('LICORERIA')
    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    ubicacionHttpSpy.guardarUbicacion.and.returnValue(of([
      {id:3,rubro:rubro,direccion:direccion,localidad:localidad}
    ]));

    component.agregarUbicacion();
    
    expect(component.ubicacionForm.contains).toEqual('La ubicación fue registrada con éxito!');
  });

  it('Debe devolver OK si se completan los campos obligatorios aaayyy', () => {
    fixture.detectChanges();

    const rubro = component.ubicacionForm.controls['rubro']
    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']
    rubro.setValue('LICORERIA')
    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    ubicacionHttpSpy.editarUbicacion.and.returnValue(of([
      {id:3,rubro:rubro.value,direccion:direccion.value,localidad:localidad.value}
    ]));

    component.id = '3';
    component.agregarUbicacion();
    
    expect(component.ubicacionForm.contains).toEqual('La ubicación fue registrada con éxito!');
  });

});
