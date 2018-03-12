import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserWindow } from "../../../../../../../common/apps/assets/angular/window";
import { ViewPorts } from "../../../../../../../common/apps/assets/angular/viewports";

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

import { FormsWizStep1Component } from "./formsWizStep1_component";
import { FormsWizStep2_2Component } from "./formsWizStep2_2_component";
import { FormsWizStep2_1Component } from "./formsWizStep2_1_component";
import { FormsWizStep2_3_0_Component } from "./formsWizStep2_3_0_component";
import { FormsWizStep2_4Component } from "./formsWizStep2_4_component";
import { FormsWizStep2_5Component } from "./formsWizStep2_5_component";
import { FormsWizStep2_6Component } from "./formsWizStep2_6_component";
import { FormsWizStep2_7Component } from "./formsWizStep2_7_component";
import { FormsWizStep3Component } from './formsWizStep3_component';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizWrapper.tpl.html',
    providers : [ BrowserWindow, ViewPorts ]
})

export class FormsWizWrapperComponent implements AfterViewInit {

    /*properties*/
    nbsBase:nbsComp
    name: string;

    @ViewChild('modal1') modal1;

    constructor (public _route: Router) {
    }

    ngAfterViewInit(): void {
        console.log(this.modal1);
        // console.log("sdkjfh");
        // this.modal1.setProperties(
        // {
        //     component : FormsWizStep1Component,
        //     title : "What are you shipping"
        // });
        // this.modal1.open();
    }

    wizChangeRoute(c:string){
        this.name = c;
        console.log("wizChangeRoute()");
        // this._route.navigate(['/forms/forms_wizard/formsWizModal/' + this.name]);
        switch(this.name){
            case 's1':
                this.modal1.setProperties(
                    {
                    component : FormsWizStep1Component,
                    title : "What are you shipping"
                    });
                this.modal1.open();
                break;
            case 's21' :
                this.modal1.setProperties(
                    {
                    component : FormsWizStep2_1Component,
                    title : "U.S. Certificate of Origin"
                    });
                this.modal1.open();
                break;
            case 's22' :
                this.modal1.setProperties(
                    {
                    component : FormsWizStep2_2Component,
                    title : "NAFTA Certificate of Origin"
                    });
                this.modal1.open();
                break;
            case 's23' :
                this.modal1.setProperties(
                    {
                    component : FormsWizStep2_3_0_Component,
                    title : "NAFTA Certificate of Origin"
                    });
                this.modal1.open();
                break;
            case 's24' :
                this.modal1.setProperties(
                    {
                    component : FormsWizStep2_4Component,
                    title : "Find or enter a tariff code."
                    });
                this.modal1.open();
                break;
            case 's25' :
                this.modal1.setProperties (
                    {
                    component : FormsWizStep2_5Component,
                    title : "Electronic Export Information (EEI)"
                    });
                this.modal1.open();
                break;
            case 's26' :
                this.modal1.setProperties (
                    {
                    component : FormsWizStep2_6Component,
                    title : "Electronic Export Information (EEI)"
                    });
                this.modal1.open();
                break;
            case 's27' :
                this.modal1.setProperties (
                    {
                    component : FormsWizStep2_7Component,
                    title : "Electronic Export Information (EEI)"
                    });
                this.modal1.open();
                break;
            case 's3':
                this.modal1.setProperties(
                    {
                    component : FormsWizStep3Component,
                    title : "Review Products"
                    });
                this.modal1.open();
                break;
            default:
                console.log("There is not a modal built for this step yet.");
        }
    }
}
