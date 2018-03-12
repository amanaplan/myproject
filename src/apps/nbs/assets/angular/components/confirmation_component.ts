import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

declare var $:any;

@Component({
    selector: 'ups-confSection',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/conf_section.tpl.html',
    providers : [ BrowserWindow]
})

export class NBSConfirmationComponent implements OnInit {


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
    cancelOrder:boolean = false;
    manageShipGuests:boolean = true;
    manageShipLogged:boolean = false;
    questionShipTip:boolean = false;
    termalView:boolean = false;

    constructor (nbsProvider:nbsComp) {
        console.log("The Confirmation Section has loaded.");
        this.nbsBase = nbsProvider;
    }

    ngOnInit() {
        //this.
    }
    /**
    * @name:falsify
    * @author: wdriver
    * @return: void
    * @description: turns all variables false
    */
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
        this.cancelOrder = false;
        this.manageShipGuests = false;
        this.manageShipLogged = false;
    }

    shipSumaryChange():void {
        switch(this.demoShipSumary) {
            case 'guest':
                this.falsify();
                this.guest = true;
                this.deliveryDefault = true;
                this.confDefault = true;
                this.manageShipGuests = true;
                break;
            case 'printCTA':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPref1 = true;
                this.manageShipLogged = true;
                break;
            case 'wPickup':
                this.falsify();
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.wPickupApDelivery = true;
                this.setPref1 = true;
                this.manageShipLogged = true;
                break;
            case 'shipTicket':
                this.falsify();
                this.deliveryDefault = true;
                this.shippingTicket = true;
                this.setPref1 = true;
                this.manageShipLogged = true;
                break;
            case 'setPref1':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPref1 = true;
                this.manageShipLogged = true;
                break;
            case 'setPrefInt':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPrefInt = true;
                this.manageShipLogged = true;
                break;
            case 'cancelOrder':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPrefInt = true;
                this.cancelOrder = true;
                this.manageShipLogged = true;
            break;
            case 'manageShipGuests':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPrefInt = true
                this.manageShipGuests = true;
            break;
            case 'manageShipLogged':
                this.falsify();
                this.otherInfo = true;
                this.trkNumwPkup = true;
                this.confDefault = true;
                this.deliveryDefault = true;
                this.setPrefInt = true;
                this.manageShipLogged = true;
            break;
            default:
                console.log('shipSomaryChange() error');
        }

    }

}
