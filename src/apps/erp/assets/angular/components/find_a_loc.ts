import { Component } from '@angular/core';

@Component({
    selector: 'ups-find-location',
    templateUrl: 'assets/resources/angular/erp/assets/angular/templates/returns_find_location.tpl.html'
})

export class FindALocationComponent {
    //Subscreens
    resultsMapView:boolean = false;
    resultsView:string = "1";

    constructor () {

    }
    changeResultsView():void {
        if (this.resultsView == "1") {
            this.resultsMapView = false;
        } else {
            this.resultsMapView = true;
        }
    }

}
