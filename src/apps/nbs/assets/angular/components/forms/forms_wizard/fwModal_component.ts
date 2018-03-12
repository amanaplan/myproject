import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { FormsWizStep1Component } from "./formsWizStep1_component";
import { FormsWizStep2_2Component } from "./formsWizStep2_2_component";
import { FormsWizStep2_1Component } from "./formsWizStep2_1_component";
import { FormsWizStep2_3_0_Component } from "./formsWizStep2_3_0_component";
import { FormsWizStep2_4Component } from "./formsWizStep2_4_component";


@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizModal.tpl.html',
})

export class FWModalComponent implements AfterViewInit {



    @ViewChild('modal1') modal1;

    constructor (public _route: Router) {
         _route.events.subscribe((val) => {
            switch(_route.url){
                case '/forms/forms_wizard/formsWizModal/step1' :
                    this.modal1.setProperties(
                        {
                        component : FormsWizStep1Component,
                        title : "What are you shipping"
                        });
                    break;
                case '/forms/forms_wizard/formsWizModal/s21' :
                    this.modal1.setProperties(
                        {
                        component : FormsWizStep2_1Component,
                        title : "What are you shipping"
                        });
                    break;
                case '/forms/forms_wizard/formsWizModal/s22' :
                    this.modal1.setProperties(
                        {
                        component : FormsWizStep2_2Component,
                        title : "What are you shipping"
                        });
                    break;
                case '/forms/forms_wizard/formsWizModal/s23' :
                    this.modal1.setProperties(
                        {
                        component : FormsWizStep2_3_0_Component,
                        title : "NAFTA Certificate of Origin"
                        });
                    break;
                case '/forms/forms_wizard/formsWizModal/s24' :
                    this.modal1.setProperties(
                        {
                        component : FormsWizStep2_4Component,
                        title : "Find or enter a tariff code."
                        });
                    break;
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

}
