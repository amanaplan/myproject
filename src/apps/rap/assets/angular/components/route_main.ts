import { Component, ViewChildren, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $:any;

@Component({
    selector: 'ups-returns-portal',
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/return_route.tpl.html'
})

export class AppComponent implements OnInit {
    subAdministrationPanel:boolean = false;

     constructor(public _router: Router) {
        //  _router.events.subscribe((val) => {
        //       if (_router.url == '/administration/users') {
        //           this.subAdministrationPanel = true;
        //       } else if (_router.url == '/administration/edit') {
        //           this.subAdministrationPanel = true;
        //       } else if (_router.url == '/administration/inviteUser') {
        //           this.subAdministrationPanel = true;
        //       } else if (_router.url == '/administration/delete') {
        //           this.subAdministrationPanel = true;
        //       } else if (_router.url == '/returnsPanel') {
        //           this.subAdministrationPanel = false;
        //       } else if (_router.url == '/returnsHistory') {
        //           this.subAdministrationPanel = false;
        //       } else {
        //           this.subAdministrationPanel = false;
        //       }
         //
        //   });
     }

    //The below code helps set the focus to the h1 regardless of which page the user navigates to
    //Note: Do not forget to import "NavigationEnd" from the @angular/router library
     ngOnInit() {
         $('h1').attr('tabindex','-1');
         this._router.events
          .subscribe((event) => {
            if (event instanceof NavigationEnd) {
              $('h1').focus();
            }
          });
    }

}
