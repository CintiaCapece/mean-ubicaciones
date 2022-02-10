import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaUbicacionComponent } from './mapa-ubicacion.component';

describe('MapaUbicacionComponent', () => {
  let component: MapaUbicacionComponent;
  let fixture: ComponentFixture<MapaUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
