import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { CrearUbicacionComponent } from './components/crear-ubicacion/crear-ubicacion.component';
import { ListarUbicacionComponent } from './components/listar-ubicacion/listar-ubicacion.component';
import { MapaUbicacionComponent } from './components/mapa-ubicacion/mapa-ubicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearUbicacionComponent,
    ListarUbicacionComponent,
    MapaUbicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
