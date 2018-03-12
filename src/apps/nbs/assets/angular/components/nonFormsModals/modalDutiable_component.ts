import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../services/nbs_comp';
import { INBS } from '../../interfaces/inbs';
import { Subject, Observable} from 'rxjs/Rx';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/nonFormModals/modalDutiable.tpl.html',
})

export class ModalDutiableComponent implements AfterViewInit {

    /*properties*/
    nbsBase:nbsComp;
    modalDutiable:FormGroup; //formGroup object
    dEvent = new Subject();
    guest:boolean = true;
    loggedIn:boolean = false;
    withSaved:boolean = false;
    unitType:boolean = false;
    numShipping:boolean = true;
    savedItemSelected:boolean = false;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The ModalDutiable has loaded.");
        this.nbsBase = nbsProvider;
        this.modalDutiable = fb.group({}); // And this to all modals to get close btn to work
        
    }

    ngAfterViewInit(): void {

        // console.log("sdkjfh");
        // this.modal1.open();
        // console.log(this.modal1.modalShown);
    }
    
    continueBtnClick():Observable<any> {
        return this.dEvent;
    }
    
    sendContinueEvent(): void {
        this.dEvent.next(1);
    }
}
