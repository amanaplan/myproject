import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/packingList/plInProgress_modal.tpl.html',
})

export class PLInProgressComponent implements AfterViewInit {
    
    /*properties*/
    dEvent = new Subject();
    nbsBase:nbsComp;
    plInProgressModal:FormGroup; //formGroup object
    editShipInfo:boolean = false;
    addBtn:boolean = true;
    editProd:boolean = false;
    manNoProd:boolean = false;
    manWithProd:boolean = true;
    rtg:boolean = false;
    wwef:boolean = false;
    reviewAddress = [
        {groupValue : '[Country or Territory]'},
        {groupValue : '[Contact Name]'},
        {groupValue : '[Company Name]'},
        {groupValue : '[Street Adress]'},
        {groupValue : '[Address 2]'},
        {groupValue : '[Address 3]'},
        {groupValue : '[City], [State], [Zip]'},
        {groupValue : '[Email]'},
        {groupValue : '[Phone]'},
    ]
    

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The In Progress Modal has loaded.");
        this.nbsBase = nbsProvider;
    }

    ngAfterViewInit(): void {   }
    
    closeEvent():Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        this.dEvent.next(true);
        return this.dEvent;
    }

    changeState(state : string) {
        
        this.manNoProd = false;
        this.addBtn = false;
        this.editProd = false;
        this.manWithProd = false;
        this.rtg = false;
        this.wwef = false;
        
        switch(state){
            case 'noProd' :
                this.manNoProd = true;
                this.addBtn = true;
                break;
            case 'withProd' : 
                this.manWithProd = true;
                break;
            case 'ready' :
                this.rtg = true;
                break;
            case 'wwef' :
                this.wwef = true;
                break;
            default:
                console.log("You fell through the switch")

        }
    }
}
