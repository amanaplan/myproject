import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//services
import { PopupService } from '../../../../common/apps/assets/angular/popup_service';
import { BrowserWindow } from '../../../../common/apps/assets/angular/window';
import { ViewPorts } from '../../../../common/apps/assets/angular/viewports';
import { ClaimsService } from './services/claims_tbl.service';

//components
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { AddClaimComponent } from './components/addclaim.component';
import { HonestyStatementComponent } from './components/honesty_statement.component';
import { AddClaimDetailsComponent } from './components/addclaim_details.component';

//external components
import { PageTitle } from '../../../../common/apps/assets/angular/pageTitle';
import { UPSOfficalDatePicker } from '../../../../common/apps/assets/angular/datepicker_official';
import { UpsDrawer } from '../../../../common/apps/assets/angular/drawer';
import { UpsHelpBtn } from '../../../../common/apps/assets/angular/help_btn';
import { PointIdClick } from '../../../../common/apps/assets/angular/point_id_click';

const appRoutes: Routes = [
    { path: 'addclaimdetail', component: AddClaimDetailsComponent },
    { path: 'honestystatement', component: HonestyStatementComponent },
    { path: 'addclaim', component: AddClaimComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports : [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    declarations : [
        AppComponent,
        HomeComponent,
        UPSOfficalDatePicker,
        UpsDrawer,
        AddClaimComponent,
        UpsHelpBtn,
        PointIdClick,
        HonestyStatementComponent,
        AddClaimDetailsComponent,
        PageTitle
    ],
    providers : [
        PopupService,
        ClaimsService,
        BrowserWindow,
        ViewPorts
    ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {}
