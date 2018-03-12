import { Component, ViewChildren, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $:any;

@Component({
    selector: 'ups-erp',
    templateUrl: 'assets/resources/angular/erp/assets/angular/templates/return_route.tpl.html'
})

//AppComponent No OnInit Version
 export class AppComponent {
    // constructor(public _router: Router) {
    //
    //         _router.events.subscribe((val) => {
    //             //Issue with this
    //             // Chrome: VoiceOver still says Returns your Package
    //             // Firefox: Voiceover is okay
    //             // "Return Your Package" appears very briefly before names are changed
    //             if (_router.url == '/') {
    //                 $('title').replaceWith('<title>Label Your Package | UPS | WEM</title>');
    //                 $('h1').replaceWith('<h1>Label Your Package</h1>');
    //             } else if (_router.url == '/return' || '/returnSkipAllowed' || '/returnExpired' || '/labelExpired') {
    //                 $('title').replaceWith('<title>Return Your Package | UPS | WEM</title>');
    //                 $('h1').replaceWith('<h1>Return Your Package</h1>');
    //             }
    //           });
    //
    // }
}

//AppComponent OnInit Version
// export class AppComponent implements OnInit {
//     constructor(public _router: Router) {
//
//             _router.events.subscribe((val) => {
//                 //Issue with this
//                 // Chrome: VoiceOver still says Returns your Package
//                 // Firefox: Voiceover is okay
//                 // "Return Your Package" appears very briefly before names are changed
//                 if (_router.url == '/') {
//                     $('title').replaceWith('<title>Label Your Package | UPS | WEM</title>');
//                     $('h1').replaceWith('<h1>Label Your Package</h1>');
//                 } else if (_router.url == '/return' || '/returnSkipAllowed' || '/returnExpired' || '/labelExpired') {
//                     $('title').replaceWith('<title>Return Your Package | UPS | WEM</title>');
//                     $('h1').replaceWith('<h1>Return Your Package</h1>');
//                 }
//               });
//
//     }
//
//     ngOnInit() {
//          $('h1').attr('tabindex','-1');
//          this._router.events
//           .subscribe((event) => {
//             if (event instanceof NavigationEnd) {
//               $('h1').focus();
//             }
//           });
//     }
// }
