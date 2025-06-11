import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';
import { PresentacionEnlacesComponent } from './components/presentacion-enlaces/presentacion-enlaces.component';
import { ResponderEncuestaComponent } from './components/responder-encuesta/responder-encuesta.component';
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
    },
    {
    path: 'responder/:id/:codigo',
    component: ResponderEncuestaComponent
    }
];
