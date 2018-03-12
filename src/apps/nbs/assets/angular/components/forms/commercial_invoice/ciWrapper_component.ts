import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { CommercialInvoiceComponent } from "./ci_component";


@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/commercial_invoice/ci_wrapper.tpl.html',
})

export class CIWrapperComponent implements AfterViewInit {

    @ViewChild('modal1') modal1;

    constructor (public _route: Router) {    }

    ngAfterViewInit(): void {
        this.modal1.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((val) => {
                this.modal1.closePopup();
            });
        });
    }

    changeRoute(){
        this.modal1.setProperties({component : CommercialInvoiceComponent});
        this.modal1.open();
      }

}
