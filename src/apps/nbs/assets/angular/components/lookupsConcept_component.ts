import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';
import { Http, HttpModule } from '@angular/http';

declare var $:any;

@Component({
    selector: 'ups-confSection',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/lookupConcept.tpl.html',
})

export class LookupsConceptComponent implements OnInit {
    

    /*properties*/
    nbsBase:nbsComp;

    //demo button Properties
    guest:boolean = true;
    otherInfo:boolean = false;
    trkNumwPkup:boolean = false;
    wPickupApDelivery: boolean = false;
    confDefault: boolean = true;
    shippingTicket: boolean = false;
    deliveryDefault: boolean = true;
    demoShipSumary: string = 'guest';
    setPref1:boolean = false;
    setPrefInt:boolean = false;

    constructor (nbsProvider:nbsComp, private http:Http) {
        console.log("The Confirmation Section has loaded.");
        this.nbsBase = nbsProvider;
        // this.http.get('../mocks/lookups/lookupConcept.json')
        // this.http.get('lookupConcept.json').subscribe(res => this.data = res.json());
        // console.log(this.data.get('lookup001'));
    }
    data;

    ngOnInit() {
        //this.
    }

    falsify() {
        this.trkNumwPkup = false;
        this.otherInfo = false;
        this.guest = false;
        this.confDefault = false;
        this.deliveryDefault = false;
        this.wPickupApDelivery = false;
        this.shippingTicket = false;
        this.setPref1 = false;
        this.setPrefInt = false;

    }

    shipSumaryChange():void {
        switch(this.demoShipSumary) {
            case 'guest':
                this.falsify();
                this.guest = true;
                this.deliveryDefault = true;
                this.confDefault = true;
                break;
            case 'printCTA':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPref1 = true;
                break;
            case 'wPickup':
                this.falsify();
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.wPickupApDelivery = true;
                this.setPref1 = true;
                break;
            case 'shipTicket':
                this.falsify();
                this.deliveryDefault = true;
                this.shippingTicket = true;
                this.setPref1 = true;
                break;
            case 'setPref1':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPref1 = true;
                break;
            case 'setPrefInt':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPrefInt = true;
                break;
            default:
                console.log('shipSomaryChange() error');
        }

    }

}
