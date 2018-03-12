import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/route_main';
import { PickupComponent }  from './components/pickup_point';
import { DeliveryComponent }  from './components/delivery';
import { UnsubscribeComponent }  from './components/unsubscribe';

import { SharedModule } from '../../../../common/apps/assets/angular/shared';
import { UpsDrawer } from '../../../../common/apps/assets/angular/drawer';

import { RouterModule, Routes } from '@angular/router';

import {FormsModule, ReactiveFormsModule } from '@angular/forms'

const appRoutes: Routes = [
    {
        path: 'unsubscribe',
        component: UnsubscribeComponent
    },
    {
        path: 'deliverymanage/:id',
        component: DeliveryComponent
    },
    {
        path: '**',
        component: PickupComponent
    }
];

@NgModule({
    imports : [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations : [
        AppComponent,
        PickupComponent,
        UpsDrawer,
        DeliveryComponent,
        UnsubscribeComponent
    ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {}
