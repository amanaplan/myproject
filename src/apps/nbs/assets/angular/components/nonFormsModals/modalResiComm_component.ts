import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs/Rx';

import { nbsComp } from '../../services/nbs_comp';
import { INBS } from '../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/nonFormModals/modalResiComm.tpl.html',
})

export class ModalResiCommComponent  {

    /*properties*/
    nbsBase:nbsComp;
    modalInvAdd:FormGroup; //formGroup object
    dEvent = new Subject(); // for event handling
    modalUseAdd:boolean = false;
    modalIsResAdd:boolean = false;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        // console.log("The ModalInvAdd has loaded.");
        this.nbsBase = nbsProvider;
        // this.modalInvAdd = fb.group({}); // And this to all modals to get close btn to work
    }
    
    continueBtnClick():Observable<any> {
        return this.dEvent;
    }
    
    closeEvent():Observable<any> {
        // console.log(this.dEvent);
        this.dEvent.next(true);
        return this.dEvent;
    }
    
}
