import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearUbicacionComponent } from './components/crear-ubicacion/crear-ubicacion.component';
import { ListarUbicacionComponent } from './components/listar-ubicacion/listar-ubicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearUbicacionComponent,
    ListarUbicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
