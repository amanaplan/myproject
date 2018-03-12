import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INBS } from '../interfaces/inbs';
import { nbsComp } from '../services/nbs_comp';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    selector:'ups-nbs-intForms-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/intForms_section.tpl.html'
})

export class NBSIntFormsComponent implements INBS {

    // var
    vpSize: vp;
    nbsBase:nbsComp;
    describeShipment:string = 'default';
    intForms_whatship: string;
    input1Disabled: boolean = false;
    input2:boolean = true;
    alert1:boolean = true;
    lever1:boolean = true;
    lever1Copy1:boolean = true;
    review:boolean = false;
    intFormsEdit:boolean = false;
    needHelpRB:string = '1';

    reviewForms = [
        {
            "isItCompleted" : true,
            "label" : "Commercial Invoice",
            "selected" : false,
            "icon" : "edit",
            "iconText" : "Edit"
        },
        {
            "isItCompleted" : false,
            "label" : "U.S. Certificate of Origin",
            "selected" : false,
            "icon" : "edit",
            "iconText" : "Edit"
        },
        {
            "isItCompleted" : true,
            "label" : "NAFTA Certificate of Origin",
            "selected" : false,
            "icon" : "edit",
            "iconText" : "Edit"
        }
    ];

    constructor (nbsProvider:nbsComp, private viewport:ViewPorts) {
        this.nbsBase = nbsProvider;
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
    }

    demoBtn(clicked:string) {

        this.intForms_whatship = "";
        this.input1Disabled = false;
        this.input2 = true;
        this.lever1 = true;
        this.lever1Copy1 = true;
        this.review = false;

        switch(clicked){
            case 'default':
                this.input2 = false;
                this.lever1 = false;
                break;
            case 'letter':
                this.intForms_whatship = "Documents";
                this.input1Disabled = true;
                this.input2 = false;
                this.lever1 = false;
                break;
            case 'whysend':
                this.input2 = false;
                this.lever1 = false;
                break;
            case 'gnifc':
                this.lever1 = false;
                break;
            case 'mfn':
                this.input2 = false;
                break;
            case 'stand':
                break;
            case 'uspr':
                this.lever1Copy1 = false;
                break;
            case 'review':
                this.review = true;
                this.intFormsEdit = false;
                break;
        }
    }

    nbsFormSubmit(): void {}
    nbsFormValid():boolean {return true;}
}
