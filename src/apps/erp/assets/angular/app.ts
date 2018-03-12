import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LabelComponent }  from './components/label';
import { LabelExpiredComponent }  from './components/label_expired';
import { ReturnComponent }  from './components/return';
import { ReturnExpiredComponent }  from './components/return_expired';
import { AppComponent } from './components/route_main';
import { FindALocationComponent } from './components/find_a_loc';
import { SampleLabelComponent } from './components/sample_label'; //DO NOT ADD TO PRODUCTION

import { PageTitle } from '../../../../common/apps/assets/angular/pageTitle';

import { SharedModule } from '../../../../common/apps/assets/angular/shared';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'returnExpired',
        component: ReturnExpiredComponent
    },
    {
        path: 'returnSkipAllowed',
        component: ReturnComponent
    },
    {
        path: 'return',
        component: ReturnComponent
    },
    // {
    //     path: 'label',
    //     component: LabelComponent
    // },
    {
        path: 'labelExpired',
        component: LabelExpiredComponent
    },
    {
        path: 'sampleLabel',
        component: SampleLabelComponent //DO NOT ADD TO PRODUCTION
    },
    {
        path: '**',
        component: LabelComponent
    }
];

@NgModule({
    imports : [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    declarations : [
        AppComponent,
        //AppExpiredComponent,
        ReturnComponent,
        ReturnExpiredComponent,
        LabelComponent,
        LabelExpiredComponent,
        FindALocationComponent,
        SampleLabelComponent, //DO NOT ADD TO PRODUCTION
        PageTitle
    ],
    bootstrap : [
        AppComponent
    ]
})
export class AppModule {}
