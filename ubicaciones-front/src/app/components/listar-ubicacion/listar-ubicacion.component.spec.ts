import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ListarUbicacionComponent } from './listar-ubicacion.component';

describe('ListarUbicacionComponent', () => {
  let component: ListarUbicacionComponent;
  let fixture: ComponentFixture<ListarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule],
      declarations: [ ListarUbicacionComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ListarUbicacionComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
