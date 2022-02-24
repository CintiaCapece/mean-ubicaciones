import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { ListarUbicacionComponent } from './listar-ubicacion.component';

describe('ListarUbicacionComponent', () => {
  let component: ListarUbicacionComponent;
  let fixture: ComponentFixture<ListarUbicacionComponent>;
  let ubicacionHttpSpy: jasmine.SpyObj<UbicacionService>;

  beforeEach(async () => {

    ubicacionHttpSpy = jasmine.createSpyObj<UbicacionService>('UbicacionService',['getUbicacion','eliminarUbicacion']);

    await TestBed.configureTestingModule({
      imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()],
      declarations: [ ListarUbicacionComponent ],
      providers: [{provide: UbicacionService, useValue: ubicacionHttpSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarUbicacionComponent);
    component = fixture.componentInstance;
  });

  it('La instancia de ListarUbicacionComponent debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('Debe ser 1 la cantidad de ubicaciones ', () => {
    const newUbicacion: Ubicacion = {rubro:'LICORERIA',nombre:'LICORERIA',direccion:'Calle Falsa 123',localidad:'Las Toninas',provincia:'Las Toninas',pais:'Las Toninas',_id: "3"};

    ubicacionHttpSpy.getUbicacion.and.returnValue(of([newUbicacion]));
    component.obtenerUbicaciones();
    component.listUbicaciones.length

    expect(component.listUbicaciones.length).toBe(1);
   // expect(ubicacionAgregada.direccion).toBe(newUbicacion.direccion);
    //expect(ubicacionAgregada.localidad).toBe(newUbicacion.localidad);
  });

});
