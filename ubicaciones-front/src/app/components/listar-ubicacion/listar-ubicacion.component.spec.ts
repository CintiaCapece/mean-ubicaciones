import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUbicacionComponent } from './listar-ubicacion.component';

describe('ListarUbicacionComponent', () => {
  let component: ListarUbicacionComponent;
  let fixture: ComponentFixture<ListarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
