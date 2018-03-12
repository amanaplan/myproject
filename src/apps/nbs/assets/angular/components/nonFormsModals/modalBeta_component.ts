import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs/Rx';

import { nbsComp } from '../../services/nbs_comp';
import { INBS } from '../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/nonFormModals/modalBeta.tpl.html',
})

export class ModalBetaComponent implements AfterViewInit {

    /*properties*/
    nbsBase:nbsComp;
    dEvent = new Subject(); // for event handling

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The ModalBeta has loaded.");
        this.nbsBase = nbsProvider;


    }

    ngAfterViewInit(): void {}

    continueBtnClick():Observable<any> {
        return this.dEvent;
    }

    sendContinueEvent(): void {
        this.dEvent.next(1);
    }

    closeEvent():Observable<any> {
        this.dEvent.next(1);
        return this.dEvent;
    }
}
