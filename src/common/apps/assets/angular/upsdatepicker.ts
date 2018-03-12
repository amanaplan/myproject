import { Component, Optional } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { PopupService } from './popup_service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'ups-datepicker',
    templateUrl: 'assets/resources/angular/common/templates/datepicker.tpl.html'
})

export class UpsDatePicker {
    public dt: Date = new Date();
    public minDate: Date = void 0;
    public events: any[];
    //public today: Date;
    public tomorrow: Date;
    public afterTomorrow: Date;
    public dateDisabled: {date: Date, mode: string}[];
    public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'MM/DD/YYYY',
      'shortDate'];
    public format: string = this.formats[0];
    public dateOptions: any = {
      formatYear: 'YY',
      startingDay: 1
    };
    private opened: boolean = false;
    private returnsDatePicker:boolean = false;

    dtChanged = new BehaviorSubject(this.dt);

    //private pService:PopupService;

    constructor (@Optional() private pService:PopupService) {
    }

    ngOnInit() {
        if (!this.pService) {
            return;
        }

        this.pService.messageSub().subscribe((msg) => {
            if (msg == 1) {
                //this.closeDatePicker();
                this.returnsDatePicker = false;
            }
        })
    }


    public getDate(): number {
      return this.dt && this.dt.getTime() || new Date().getTime();
       //return this.dt;
    }

    public today(): void {
        this.dt = new Date();
        this.updateModel(this.dt);
    }

    private updateModel(nDt): void {
        this.dt = nDt;
        this.dtChanged.next(this.dt);
    }

    public dtSub() : Observable<Date> {
        return this.dtChanged;
    }


    // public d20090824(): void {
    //   this.dt = moment('2009-08-24', 'YYYY-MM-DD')
    //     .toDate();
    // }

    // public disableTomorrow(): void {
    //   this.dateDisabled = [{date: this.tomorrow, mode: 'day'}];
    // }

    // todo: implement custom class cases
    // public getDayClass(date: any, mode: string): string {
    //   if (mode === 'day') {
    //     let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    //
    //     for (let event of this.events) {
    //       let currentDay = new Date(event.date).setHours(0, 0, 0, 0);
    //
    //       if (dayToCheck === currentDay) {
    //         return event.status;
    //       }
    //     }
    //   }
    //
    //   return '';
    // }

    public disabled(date: Date, mode: string): boolean {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }

    // public open(): void {
    //   this.opened = !this.opened;
    // }

    public clear(): void {
      this.dt = void 0;
      this.dateDisabled = undefined;
      this.updateModel(this.dt);
    }

    // public toggleMin(): void {
    //   this.dt = new Date(this.minDate.valueOf());
    // }

    //My Own Code

    //This toggles the DatePicker On and Off
    showDatePicker():void {
        if (!this.returnsDatePicker && this.pService) {
            this.pService.closeOpenedPopups();
        }

        this.returnsDatePicker = !this.returnsDatePicker;
    }

    //This toggles the DatePicker Off
    closeDatePicker():void {
        this.returnsDatePicker = false;

    }

    dMoment(dateStr, format, strict):boolean {
        return false;
        //return dp(dateStr, format, strict).isValid();
    }
}
