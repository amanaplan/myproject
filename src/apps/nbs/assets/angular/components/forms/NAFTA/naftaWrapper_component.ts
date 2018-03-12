import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { NAFTAComponent } from "./nafta_component";


@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/NAFTA/nafta_wrapper.tpl.html',
})

export class NAFTAWrapperComponent implements AfterViewInit {

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
            case 'nco' :
                this.modal1.setProperties(
                    {
                    component : NAFTAComponent
                    }
                );
                this.modal1.open();
                console.log("nco");
                break;
        }
    }

}
