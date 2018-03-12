import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { ElectronicExportComponent } from "./eei_component";


@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/EEI/eei_wrapper.tpl.html',
})

export class EEIWrapperComponent implements AfterViewInit {

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
        this.modal1.setProperties({component : ElectronicExportComponent});
        this.modal1.open();
      }

}
