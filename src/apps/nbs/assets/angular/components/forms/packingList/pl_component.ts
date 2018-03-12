import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/packingList/packingList_modal.tpl.html',
})

export class PackingListComponent implements AfterViewInit {

    /*properties*/
    dEvent = new Subject();
    nbsBase:nbsComp;
    plModal:FormGroup; //formGroup object
    hasPkg:boolean = true;
    productsComplete:boolean = false;
    complete:boolean = false;
    wwef:boolean = false;
    numbers:Array<number>;
    productsLoop = [
        {
            items : [
                { 
                    package  : "" 
                }
            ]
        }
    ]
    

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The Packing list has loaded.");
        this.nbsBase = nbsProvider;
        this.plModal = fb.group({
            "descGoods01" : ['', Validators.required],
            "descGoods02" : ['', Validators.required]
        })

        this.numbers = new Array(10).fill(null).map((x,i)=>i);
    }

    ngAfterViewInit(): void {

        // console.log("sdkjfh");
        // this.modal1.open();
        // console.log(this.modal1.modalShown);
    }

    closeEvent():Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        this.dEvent.next(true);
        return this.dEvent;
    }

    nbsFormValid(){ 
        
        if (this.plModal.get('descGoods01').invalid) {
            return false;
        }

        if (this.plModal.get('descGoods02').invalid) {
            return false;
        }
        
        return true; 
    }

    formSave() {
        this.nbsBase.nbsGlobalFormSubmit = true;
        this.plModal.get('descGoods01').markAsTouched();
        this.plModal.get('descGoods02').markAsTouched();
        if(!this.plModal.get('descGoods01').valid){return false;}
        if(!this.plModal.get('descGoods02').valid){return false;}
        this.closeEvent();
        return true;
    }

    addProd() {
        // Ask Neal what happens if they reach the limit of added packages.  Then build that solution.
        this.productsLoop.push({
            items : [{
                package : ""
            }]
        });
    }

    assignItems(index : number) {
        // Ask Neal what happens if they reach the limit of assigned items.  Then build that solution.
        this.productsLoop[index].items.push({
            package : ""
        });
    }
}
