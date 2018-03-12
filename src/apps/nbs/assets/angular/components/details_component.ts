import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

declare var $:any;

@Component({
    selector: 'ups-nbs-details-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/details_section.tpl.html'
})
export class NBSDetailsComponent implements INBS {
    detailsEditable:boolean = false;
    addonsCODLocationAccept:boolean = true;
    addonsNotificationsEmails = []; //collection of emails in addons section
    addonsNotifyEmailProblem:boolean = false;
    addonsCOD:boolean = false;

    nbsDetailsOptions:FormGroup;
    nbsBase:nbsComp;

    options = [
        {copy : 'Signature Required'},
        {copy : 'Adult Signature Required'},
        {copy : 'No Signature Required (Shipper Release)'},
        {copy : 'Delivery Confirmation'},
        {copy : 'C.O.D. ($nn.nn)'},
        {copy : 'Declared Value ($xxx)'},
        {copy : 'Large Package'},
        {copy : 'Additional Handling'},
        {copy : 'Reference 1 (or custom reference label): {Reference Value}'},
        {copy : 'Reference 2 (or custom reference label): {Reference Value }'},
        {copy : 'Lithium Batteries'},
        {copy : 'Deliver only to Receivers Address'},
        {copy : 'UPS Carbon Neutral'},
        {copy : 'No Third Party Pickup'},
        {copy : 'Package Release Code'},
        { copy: 'Email Notifications' },
        {copy : 'UPS Premium Care<sup>TM</sup>'}
    ]

    constructor(private fb:FormBuilder, nbsProvider:nbsComp) {
        this.nbsDetailsOptions = fb.group({
            'notifyProblemEmailAddress' : ['', [Validators.required, Validators.email]],
            'codCurrency' : ['', Validators.required]
        });

        this.nbsBase = nbsProvider;
    }

    /**
     * @name addonsRemoveEmail
     * @argument number(indexOf in array)
     * @author wdriver /abrown
     * @returns void
     * @description
     * Removes email in addons array
     */
    addonsRemoveEmail(index):void {
        this.addonsNotificationsEmails.splice(index, 1);
    }

    /**
     * @name addonsAddEmail
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * Adds email to addons array
     */
    addonsAddEmail():void {
        if (this.addonsNotificationsEmails.length == 0) {
            this.addonsNotificationsEmails.push({
                value : 'email@from.com',
                notifyShip : false,
                notifyException : false,
                notifyDelivery : false
            });
        } else if (this.addonsNotificationsEmails.length == 1) {
            this.addonsNotificationsEmails.push({
                value : 'email@to.com',
                notifyShip : false,
                notifyException : false,
                notifyDelivery : false
            });
        } else {
            this.addonsNotificationsEmails.push({
                value : '',
                notifyShip : false,
                notifyException : false,
                notifyDelivery : false
            });
        }
    }

    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);
        this.nbsDetailsOptions.controls['notifyProblemEmailAddress'].markAsTouched();
        this.nbsDetailsOptions.controls['codCurrency'].markAsTouched();
    }

    nbsFormValid():boolean {
        if (!this.nbsDetailsOptions.controls['notifyProblemEmailAddress'].valid && this.addonsNotifyEmailProblem) {
            return false;
        }

        if (!this.nbsDetailsOptions.controls['codCurrency'].valid && this.addonsCOD) {
            return false;
        }

        return true;
    }

    /**
     * @author wdriver / abrown
     * @returns ???
     * @description
     * ????????????????
     */
    nbsFormErrors():InbsFormErrors[] {
        return 
    }

    nbsFormTouched():boolean {
        return this.nbsDetailsOptions.touched;
    }
}
