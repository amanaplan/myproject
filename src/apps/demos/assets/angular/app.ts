import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, TooltipModule } from 'ngx-bootstrap';

import { PopupService } from '../../../../common/apps/assets/angular/popup_service';
import { DpLocaleService } from '../../../../common/apps/assets/angular/dp_locale_service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './components/route_main';
import { DemoCACComponent } from './components/demo_cac_component';
import { DemoCPCComponent } from './components/demo_cpc_component';
import { DemoALTCPCComponent } from './components/demo_alt_cpc_component';
import { DemoDrawerComponent } from './components/demo_drawer';
import { DemoDrawerListComponent } from './components/demo_drawerlist';
import { DemoDatepickerComponent } from './components/demo_datepicker';
import { DemoInputGenComponent } from './components/demo_input_gen';

import { UPSCACComponent } from '../../../../common/apps/assets/angular/cac';
import { UPSCPCComponent } from '../../../../common/apps/assets/angular/cpc';
import { UPSALTCPCComponent } from '../../../../common/apps/assets/angular/altcpc';
import { UpsDrawer } from '../../../../common/apps/assets/angular/drawer';
import { UpsDrawerList } from '../../../../common/apps/assets/angular/drawer_list';
import { UPSOfficalDatePicker } from '../../../../common/apps/assets/angular/datepicker_official';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
    {
        path: 'cac',
        component: DemoCACComponent
    },
    {
        path: 'cpc',
        component: DemoCPCComponent
    },
    {
        path: 'altcpc',
        component: DemoALTCPCComponent
    },
    {
        path: 'drawer',
        component: DemoDrawerComponent
    },
    {
        path: 'drawerlist',
        component: DemoDrawerListComponent
    },
    {
        path: 'datepicker',
        component: DemoDatepickerComponent
    },
    {
        path: 'inputgen',
        component: DemoInputGenComponent
    }
];

@NgModule({
    imports : [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule,
        DatepickerModule.forRoot()
    ],
    declarations : [
        AppComponent,
        UPSCACComponent,
        UPSCPCComponent,
        UPSALTCPCComponent,
        UpsDrawer,
        UpsDrawerList,
        UPSOfficalDatePicker,
        DemoCACComponent,
        DemoCPCComponent,
        DemoALTCPCComponent,
        DemoDrawerComponent,
        DemoDrawerListComponent,
        DemoDatepickerComponent,
        DemoInputGenComponent
    ],
    providers : [
        PopupService
    ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {}
