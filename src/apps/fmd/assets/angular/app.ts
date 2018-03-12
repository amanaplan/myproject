import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*import { FormsModule, ReactiveFormsModule } from '@angular/forms';*/

import { AppComponent }  from './components/follow_delivery';

//import { BrowserWindow } from '../shared/window';

import { SharedModule } from '../../../../common/apps/assets/angular/shared'

@NgModule({
    imports : [
        BrowserModule,
        //FormsModule,
        //ReactiveFormsModule,
        SharedModule
    ],
    declarations : [
        AppComponent
    ],
    bootstrap : [
        AppComponent
    ],
    /*providers : [
        BrowserWindow
    ]*/
})
export class AppModule {}
