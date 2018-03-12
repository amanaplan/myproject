import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

import { returnHistory } from '../interfaces/returnHistory';
import { returnHistoryDetail } from '../interfaces/returnHistoryDetail';

import { returnHistoryService } from '../services/returnHistory.service';
declare var $:any;

@Component({
    /*selector: 'ups-pickup-point',*/
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_history.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    //providers: [  ]
    providers : [ BrowserWindow, ViewPorts, returnHistoryService]
})

// export class ReturnsHistoryComponent {
//
// }
export class ReturnsHistoryComponent implements AfterViewInit {

    //Variable for Viewport
    viewportSize:vp;

    //Gets Mock data from Json file and returns it to template
    allReturnHistory:returnHistory[];

    getReturns() {
        this.returnService.getReturns().subscribe((res) => {
            this.allReturnHistory = <returnHistory[]>res
            //console.log(this.allReturnHistory);
        });
    }

    constructor(private returnService: returnHistoryService, private viewportService: ViewPorts) {
        this.getReturns();

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });
    }

    resize(e) {

    }

    ngAfterViewInit():void {
    }

    //Adds button functionality
    returnHistoryDetail:boolean = false;

    demoreturnHistoryDetailRow():void {
        //this.clearAllDisplay();
        this.returnHistoryDetail = true;
    }

}
