import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CrearUbicacionComponent } from './crear-ubicacion.component';

describe('Testing CrearUbicacionComponent', () => {
  let component: CrearUbicacionComponent;
  let fixture: ComponentFixture<CrearUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule],
      declarations: [ CrearUbicacionComponent ]
    })
    .compileComponents();
  });

  it('Debe existir el componente CrearUbicacion', () => {
    const fixture = TestBed.createComponent(CrearUbicacionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Debe devolver OK si se completan los campos obligatorios', () => {
    const fixture = TestBed.createComponent(CrearUbicacionComponent);
    const component = fixture.componentInstance;
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
    const fixture = TestBed.createComponent(CrearUbicacionComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const direccion = component.ubicacionForm.controls['direccion']
    const localidad = component.ubicacionForm.controls['localidad']

    direccion.setValue('Calle Falsa 123')
    localidad.setValue('Las Toninas')

    expect(component.ubicacionForm.invalid).toBeTrue();
  });

  it('Si id no es nulo, el titulo tiene que ser Editar Ubicacion', () => {
    const fixture = TestBed.createComponent(CrearUbicacionComponent);
    const component = fixture.componentInstance;

    component.id = '61de0a226003b374bafec9b9';
    component.esEditar();
    expect(component.titulo).toBe('Editar Ubicacion');
  });

  it('Si id es nulo, el titulo tiene que ser Alta Ubicacion', () => {
    const fixture = TestBed.createComponent(CrearUbicacionComponent);
    const component = fixture.componentInstance;

    component.id = null;
    component.esEditar();
    expect(component.titulo).toBe('Alta Ubicacion');
  });
});
