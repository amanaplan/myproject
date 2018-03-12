import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

declare var $:any;

@Component({
    selector: 'ups-nbs-schedule',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/schedule_component.tpl.html'
})
export class NBSScheduleComponent implements INBS {
    nbsBase:nbsComp;
    private schedView:boolean = true;
    
    rateTblWWEF:boolean = false;
    rateTbl5:boolean = false;
    rateTbl4:boolean = true;
    rateTbl3day: boolean = false;
    rateTbl2dayWeekend:boolean = false;
    rateTbl2day:boolean = false;
    rateTbl2dayAlt:boolean = false;
    rateTbl1day:boolean = false;

    constructor(nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;
    }

    falsify(){
        this.rateTblWWEF = false;
        this.rateTbl5 = false;
        this.rateTbl4 = false;
        this.rateTbl3day = false;
        this.rateTbl2dayWeekend = false;
        this.rateTbl2day = false;
        this.rateTbl2dayAlt = false;
        this.rateTbl1day = false;
    }

    setSchedView(c:boolean){
        this.schedView = c;
    }

    getSchedView():boolean {
        return this.schedView;
    }

    rateTbl4Btn(){
        this.falsify();
        this.rateTbl4 = true;
    }
    
    rateTbl5Btn(){
        this.falsify();
        this.rateTbl5 = true;
    }

    rateTbl3dayBtn() {
        this.falsify();
        this.rateTbl3day = true;
    }
    
    rateTbl2dayWeekendBtn(){
        this.falsify();
        this.rateTbl2dayWeekend = true;
    }
    
    rateTbl2dayBtn(){
        this.falsify();
        this.rateTbl2day = true;
    }
    
    rateTbl2dayAltBtn(){
        this.falsify();
        this.rateTbl2dayAlt = true;
    }
    
    rateTbl1dayBtn(){
        this.falsify();
        this.rateTbl1day = true;
    }
    
    rateTblWWEFBtn(){
        this.falsify();
        this.rateTblWWEF = true;
    }

    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);

    }

    nbsFormValid():boolean {
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
}
