import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { CertificateOfOrigin } from "./co_component";

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/certificate_of_origin/co_wrapper.tpl.html',
})

export class coWrapperComponent implements AfterViewInit {

    @ViewChild('modal1') modal1;

    constructor (public _route: Router) {    }

    ngAfterViewInit(): void {
        this.modal1.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((val) => {
                this.modal1.closePopup();
            });
        });
    }

    changeRoute(choice : string){

        console.log("changeRoute()");

        switch(choice){
            case 'co' :
                this.modal1.setProperties(
                    {
                    component : CertificateOfOrigin
                    }
                );
                this.modal1.open();
                console.log("co");
                break;
        }
    }

}
