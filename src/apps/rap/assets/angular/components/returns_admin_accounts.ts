import { Component, ViewChild, OnChanges, ElementRef, OnInit, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin_accounts.tpl.html'
})

export class ReturnsAdminAccountsComponent {

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
    }



}
