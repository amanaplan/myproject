import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './components/route_main';
import { MainTrackingComponent }  from './components/main_track';
import { MultiTrackingComponent }  from './components/multi_track';
import { AdditionalPackagesComponent } from './components/additional_packages';

import { EnterTrackingComponent } from './components/enter_tracking_num';
import { SendUpdatesComponent } from './components/send_updates';
import { NotificationCompleteComponent } from './components/notification_complete';
import { TrackReferenceComponent } from './components/track_reference';
import { ImportNumbersComponent } from './components/import_numbers';
import { OtherTrackingServicesComponent } from './components/other_tracking_services';
import { UpdatesSelectionComponent } from './components/updates_selection';

import { UPSShowMore } from './directives/char_length';
import { UPSTextAdjust } from './directives/text_adjust';
import { TextAdjustService } from './services/textAdjust.service';

import { SharedModule } from '../../../../common/apps/assets/angular/shared';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PointIdClick } from '../../../../common/apps/assets/angular/point_id_click';
import { PageTitle } from '../../../../common/apps/assets/angular/pageTitle';
import { UpsDrawer } from '../../../../common/apps/assets/angular/drawer';
import { UPSModalComponent } from '../../../../common/apps/assets/angular/modal';
import { UpsDatePicker } from '../../../../common/apps/assets/angular/upsdatepicker';

import { PopupService } from '../../../../common/apps/assets/angular/popup_service';

import { UPSOfficalDatePicker } from '../../../../common/apps/assets/angular/datepicker_official';

import { DpLocaleService } from '../../../../common/apps/assets/angular/dp_locale_service';

const appRoutes: Routes = [
    {
        path: 'multipackage',
        component: MultiTrackingComponent
    },
    {
        path: 'enternum',
        component: EnterTrackingComponent
    },
    {
        path: 'enternum/loggedin',
        component: EnterTrackingComponent
    },
    {
        path: '**',
        component: MainTrackingComponent
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
        HttpModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot()
    ],
    declarations : [
        AppComponent,
        MainTrackingComponent,
        MultiTrackingComponent,
        PointIdClick,
        UPSShowMore,
        EnterTrackingComponent,
        PageTitle,
        UpsDrawer,
        UPSModalComponent,
        AdditionalPackagesComponent,
        UPSTextAdjust,
        UpsDatePicker,
        SendUpdatesComponent,
        NotificationCompleteComponent,
        TrackReferenceComponent,
        ImportNumbersComponent,
        OtherTrackingServicesComponent,
        UpdatesSelectionComponent,
        UPSOfficalDatePicker
    ],
    providers: [
        TextAdjustService,
        PopupService,
        DpLocaleService
    ],
    bootstrap : [
        AppComponent
    ],
    entryComponents : [
        SendUpdatesComponent,
        NotificationCompleteComponent,
        TrackReferenceComponent,
        ImportNumbersComponent,
        OtherTrackingServicesComponent,
        UpdatesSelectionComponent
    ]
})
export class AppModule {
    constructor(private DpLocaleService: DpLocaleService) {
        /*setTimeout(function () {
            DpLocaleService.loadLocale("mini", {
                "daysOfWeek" : ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
                "daysOfWeekShort" : ["S", "M", "T", "W", "T", "F", "S"],
                "months" : ["Jan", "Feb", "Mar", "Apr", "Ma", "Ju", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                "datepickerCaptionTxt" : "Dp Cal",
                "prevMonthTxt" : "Previous",
                "nextMonthTxt" : "Next",
                "monthLabel" : "M",
                "yearLabel" : "Y",
                "todayBtnTxt" : "Now",
                "clearBtnTxt" : "Clr",
                "closeBtnTxt" : "X",
                "startOfWeek" : 1,
                "yearOffset" : 5,
                "formatDate" : "YYYY-MM-DD"
            });

            DpLocaleService.setLocale("mini");
        }, 10000);*/


    }
}
