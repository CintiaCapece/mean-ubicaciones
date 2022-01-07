import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUbicacionComponent } from './components/crear-ubicacion/crear-ubicacion.component';
import { ListarUbicacionComponent } from './components/listar-ubicacion/listar-ubicacion.component';

const routes: Routes = [
  { path: '', component: CrearUbicacionComponent},
  { path: 'crear-ubicacion', component: CrearUbicacionComponent},
  { path: 'editar-ubicacion/:id', component: CrearUbicacionComponent},
  { path: 'listar-ubicacion', component: ListarUbicacionComponent},
  { path: '**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
