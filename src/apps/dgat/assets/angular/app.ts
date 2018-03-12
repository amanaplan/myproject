import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DgatComponent } from './components/dgat_component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/route_dgat';
import { UPSCACComponent } from '../../../../common/apps/assets/angular/cac';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nbsComp } from '../../../nbs/assets/angular/services/nbs_comp';

const appRoutes: Routes = [
    { path: '**', component: DgatComponent }
]

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { useHash: true })

    ],
    declarations: [
        DgatComponent,
        AppComponent,
        UPSCACComponent
    ],

    providers : [
        nbsComp
    ],

    bootstrap: [
        AppComponent
    ],
})

export class AppModule {
    
 }