import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserWindow } from "../../../../../common/apps/assets/angular/window";
import { ViewPorts } from "../../../../../common/apps/assets/angular/viewports";

import { ModalDutiableComponent } from "./nonFormsModals/modalDutiable_component";

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/gf_modal.tpl.html',
})

export class GFModalComponent implements AfterViewInit {

    

    @ViewChild('modal1') modal1;
    
    constructor (public _route: Router) {
         _route.events.subscribe((val) => {
            switch(_route.url){
                case '1' :
                    this.modal1.setProperties(
                        {
                        component : ModalDutiableComponent,
                        title : "What are you shipping"
                        });
                    break;
            //     case '/forms/forms_wizard/formsWizModal/s21' :
            //         this.modal1.setProperties(
            //             {
            //             component : FormsWizStep2_1Component,
            //             title : "What are you shipping"
            //             });
            //         break;
            //     case '/forms/forms_wizard/formsWizModal/s22' :
            //         this.modal1.setProperties(
            //             {
            //             component : FormsWizStep2_2Component,
            //             title : "What are you shipping"
            //             });
            //         break;
            //     case '/forms/forms_wizard/formsWizModal/s23' :
            //         this.modal1.setProperties(
            //             {
            //             component : FormsWizStep2_3_0_Component,
            //             title : "NAFTA Certificate of Origin"
            //             });
            //         break;
            //     case '/forms/forms_wizard/formsWizModal/s24' :
            //         this.modal1.setProperties(
            //             {
            //             component : FormsWizStep2_4Component,
            //             title : "Find or enter a tariff code."
            //             });
            //         break;
                default:
                    console.log("There is not a modal built for this step yet.");
            }
         });
    }

    ngAfterViewInit(): void {

        // console.log("sdkjfh");
        this.modal1.open();
        // console.log(this.modal1.modalShown);
    }

    thisthing(){
        this.modal1.setProperties({
            component : ModalDutiableComponent,
            title : "What are you shipping"
        });
    }

}