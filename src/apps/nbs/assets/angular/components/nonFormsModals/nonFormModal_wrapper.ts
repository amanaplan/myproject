import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { ModalInvAddComponent } from './modalInvAdd_component';
import { ModalResiCommComponent } from './modalResiComm_component';
import { ModalDutiableComponent } from './modalDutiable_component';
import { ModalBetaComponent } from './modalBeta_component';

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/nonFormModals/nonFormModal_wrapper.tpl.html',
})

export class NonFormModalWrapperComponent implements AfterViewInit {

    @ViewChild('modal1') modal1;

    constructor (public _route: Router) {    }

    ngAfterViewInit(): void {
        this.modal1.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((val) => {
                this.modal1.closePopup();
            });
        });
    }

    changeRoute(c:string){
        // console.log("changeRoute()");
        switch(c){
            case 'invAdd' : 
                this.modal1.setProperties(
                    {
                    title : 'We could not validate your address.',
                    component : ModalInvAddComponent
                    }
                );
                this.modal1.open();
                break;
            case 'resiComm' : 
                this.modal1.setProperties(
                    {
                    title : 'Please tell us a little more about your destination address.',
                    component : ModalResiCommComponent
                    }
                );
                this.modal1.open();
                break;
            case 'dutiable' : 
                this.modal1.setProperties(
                    {
                    title : 'We could not validate your address.',
                    component : ModalDutiableComponent
                    }
                );
                this.modal1.open();
                break;
            case 'beta' : 
                this.modal1.setProperties(
                    {
                    title : 'Welcome to a new way to ship.',
                    component : ModalBetaComponent
                    }
                );
                this.modal1.open();
                break;
        }
    }
}
