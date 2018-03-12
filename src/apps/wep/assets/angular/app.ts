import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './components/route_main';

import { WEPComponent }  from './components/wep_component';

import { SharedModule } from '../../../../common/apps/assets/angular/shared';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { PointIdClick } from '../../../../common/apps/assets/angular/point_id_click';

const appRoutes: Routes = [

    {
        path: '**',
        component: WEPComponent
    }
];

@NgModule({
    imports : [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule
    ],
    declarations : [
        AppComponent,
        PointIdClick,
        WEPComponent
    ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {}
