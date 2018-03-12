import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/a4_index.tpl.html',
    providers : [ BrowserWindow, ViewPorts]
})

export class A4NBS_IndexComponent implements OnInit {

    /*properties*/
    //Global Var
    vpSize:vp;
    nbsBase:nbsComp;

    constructor (private viewport:ViewPorts, nbsProvider:nbsComp, public _router: Router) {
        
        this.nbsBase = nbsProvider;

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
    }

    ngOnInit() {
        //this.
    }

 }
