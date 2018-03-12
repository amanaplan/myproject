import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
    selector: 'ups-progress-tracker',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/progressTracker.tpl.html',
})

export class ProgressTrackerComponent implements OnInit {
    
    /*properties*/
    stepNumber:number = 1;

    steps = [
        {
            'name' : "Where",
            'link' : "#/gfWrapper/whereFrom"
        },
        {
            'name' : "What",
            'link' : "#/gfWrapper/what"
        },
        {
            'name' : "How",
            'link' : "#/gfWrapper/when"
        },
        {
            'name' : "Details",
            'link' : "#/gfWrapper/addons"
        },
        {
            'name' : "Payment",
            'link' : "#/gfWrapper/payment"
        },
        {
            'name' : "Review",
            'link' : "#"
        }
    ];

    constructor (public _router: Router) {
        console.log("The progress tracker component has loaded.")
        _router.events.subscribe((val) => {
            switch(_router.url){
                case '/gfWrapper/whereFrom':
                    break;
                case '/gfWrapper/whereTo':
                    break;
                case '/gfWrapper/what':
                    this.stepNumber = 2;
                    break;
                case '/gfWrapper/when':
                    this.stepNumber = 3;
                    break;
                case '/gfWrapper/addons':
                    this.stepNumber = 4;
                    break;
                case '/gfWrapper/forms':
                    this.stepNumber = 4;
                    break;
                case '/gfWrapper/payment':
                    this.stepNumber = 5;
                    break;
                default:
                    console.log("The progress tracker is broken.\n\n");
            }
        });
    }

    ngOnInit() {
        //this.
    }

}