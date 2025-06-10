import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';
import { PresentacionEnlacesComponent } from './components/presentacion-enlaces/presentacion-enlaces.component';
export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'crear-encuesta', 
        component: CrearEncuestaComponent
    },
    {
        path: 'presentacion-enlaces',
        component: PresentacionEnlacesComponent
    }
];
