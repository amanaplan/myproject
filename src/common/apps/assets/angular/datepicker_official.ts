/******************************************************************************
### DOCUMENTATION: (How do I use this Component) ###
This component can be used to implement a datepicker either inline or attached
to an input field.


** Add this imports to your app.ts file **
import { UPSOfficalDatePicker } from '../../../../common/apps/assets/angular/datepicker_official';


** Add the component to the declarations of your app. **


** Add this element in your template where the datepicker should appear.
Note: To attach to an input, put the element after .ups-text_wrapper, but inside
the .ups-form_group **
<ups-offical-datepicker></ups-offical-datepicker>


** Add an angular id on the element so it can be controlled **
<ups-offical-datepicker #awesomeDP></ups-offical-datepicker>


** Add this code to your component before the constructor **
@ViewChild('awesomeDP') awesomeDP;


** An [(ngModel)] can be added onto the element and it will return the locale
date string in the view. Note that this same variable can be used on the input
to bind the value. **
<ups-offical-datepicker [(ngModel)]="dpVal" #awesomeDP></ups-offical-datepicker>

<input ... [(ngModel)]="dpVal">


** Use the ViewChild variable to open and close the datepicker **
awesomeDP.toggle();
awesomeDP.show();
awesomeDP.hide();


### Additional Features ###
This component has additional features that can be used to extend the
awesomeness.

** Set a date **
awesomeDP.setDate(year, month, date)


** Set a date using locale string (Default: MM/DD/YYYY) **
awesomeDP.setDateStr(localeStr)


** Check if a date is valid using the localeStr (Default: MM/DD/YYYY) **
awesomeDP.isValid(localeStr)


** Return date in a locale string (Default: MM/DD/YYYY)**
awesomeDP.getDateStr()


** Return date in a javascript Date() object **
awesomeDP.getDate()


** Check if date is in min / max range **
isValidRangeStr(str) //uses locale for str format
isValidRange(year, month, date)


** Set the configuration of the datepicker (configurable values listed below) **
awesomeDP.setConfig({
    defaultVisible : false, // bool, default: false
    useShortWeekdayWord : true, // bool, default: true
    closeOnDatePick : false, // bool, default: false
    minDate : null, // new Date() | null
    maxDate : null, // new Date() | null
    showTodayBtn : true, // bool, default: true
    showClearBtn : true, // bool, default: true
    showCloseBtn : true // bool, default: true
    isInline : false // bool, default: false
    disabledDates : [] // array, default : []
})

** Config values explained: **
defaultVisible  -  Should the datepicker be shown on load
useShortWeekdayWord  -  In the datepicker table, should the short day word (Mon, Tues, ...) be used
closeOnDatePick  -  Should the datepicker close after choosing a date from the Calendar
minDate  -  Sets the minimum date allowed to be picked (does not prevent wrong date from being entered)
maxDate  -  Sets the maximum date allowed to be picked (does not prevent wrong date from being entered)
showTodayBtn - Whether the today button should be visible (at the bottom)
showClearBtn - Whether the clear button should be visible (at the bottom)
showCloseBtn - Whether the close button should be visible (at the bottom)
isInline - Sets whether the calendar is inline or not (automatically turns off bottom btns and set defaultvisible to true)
disabledDates - Set specific dates to be disabled, accepts array of js dates (ex: [new Date(), new Date()])


## Popup Service ##
This service notifies all datepickers when they open so that only 1 datepicker
is on the screen at a time.

** Import the service (app.ts) **
import { PopupService } from '../../../../common/apps/assets/angular/popup_service';


** Add it to your providers in your @NgModule **
@NgModule {
    ...
    providers : [
        ...
        PopupService
    ]
    ...
}



## Locales (Help, I'm in another language and I need a translate) ##
Another locale can be loaded either using the service or the datepicker component
itself. Using the datepicker service ensures all datepicker components receive
the locale.


** Load a locale **
loadLocale(localeName, localeConfig)


** Locale config object **
{
    "daysOfWeek" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "daysOfWeekShort" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "months" : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "datepickerCaptionTxt" : "Datepicker Calendar",
    "prevMonthTxt" : "Previous Month",
    "nextMonthTxt" : "Next Month",
    "monthLabel" : "Month",
    "yearLabel" : "Year",
    "todayBtnTxt" : "Today",
    "clearBtnTxt" : "Clear",
    "closeBtnTxt" : "Close",
    "startOfWeek" : 0,
    "yearOffset" : 10,
    "formatDate" : "MM/DD/YYYY" //https://momentjs.com/docs/#/displaying/format/
}


** Setting the loaded locale **
setLocale(localeName)


** DpLocaleService (service for setting the datepicker in the whole app)**
import { DpLocaleService } from '../../../../common/apps/assets/angular/dp_locale_service';


** Add it to your providers in your @NgModule **
@NgModule {
    ...
    providers : [
        ...
        DpLocaleService
    ]
    ...
}


** Methods used for setting locale **
loadLocale(localeName, localeConfig) // locale config listed above
setLocale(localeName)


*******************************************************************************/

import { Component, Optional, ViewChild, ElementRef, TemplateRef, ViewContainerRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { PopupService } from './popup_service';
import { DpLocaleService } from './dp_locale_service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

declare var $:any;

@Component({
    selector: 'ups-offical-datepicker',
    templateUrl: 'assets/resources/angular/common/templates/datepicker_official.tpl.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UPSOfficalDatePicker),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => UPSOfficalDatePicker),
            multi: true,
        }
    ]
})
export class UPSOfficalDatePicker implements ControlValueAccessor {
    private bsDpModel = moment({hour: 0, minute: 0, seconds: 0, milliseconds: 0});
    private visible:boolean = false;
    private currentLocale:string = "en";

    private locale = {
        "en" : {
            "daysOfWeek" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "daysOfWeekShort" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "months" : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "datepickerCaptionTxt" : "Datepicker Calendar",
            "prevMonthTxt" : "Previous Month",
            "nextMonthTxt" : "Next Month",
            "monthLabel" : "Month",
            "yearLabel" : "Year",
            "todayBtnTxt" : "Today",
            "clearBtnTxt" : "Clear",
            "closeBtnTxt" : "Close",
            "startOfWeek" : 0,
            "yearOffset" : 10,
            "formatDate" : "MM/DD/YYYY" //https://momentjs.com/docs/#/displaying/format/
        }
    }

    private config = {
        defaultVisible : false,
        useShortWeekdayWord : true,
        closeOnDatePick : false,
        minDate : null,
        maxDate : null,
        showTodayBtn : true,
        showClearBtn : true,
        showCloseBtn : true,
        disabledDates : [],
        isInline : false
    }

    private generatedWeek = [];
    private monthsNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    private propagateChange = (newVal: any) => { };

    private focusAfterClose = null;

    constructor (@Optional() private pService:PopupService, @Optional() private DpLocaleService:DpLocaleService, private el:ElementRef, private viewContainer: ViewContainerRef) {
        this.generateWeeks();

        this.generateYear();
    }

    ngOnInit() {
        if (this.pService) {
            this.pService.messageSub().subscribe((msg) => {
                if (msg == 1 && !this.config.isInline) {
                    this.hide();
                }
            })
        }

        if (this.DpLocaleService) {
            this.retrieveLocaleServiceConfigs();

            this.setLocale(this.DpLocaleService.getCurrentLocale());

            this.DpLocaleService.messageSub().subscribe((msgVal) => {
                switch (msgVal) {
                    case 1 :
                        this.retrieveLocaleServiceConfigs();
                    break;
                    case 2 :
                        this.setLocale(this.DpLocaleService.getCurrentLocale());
                    break;
                }
            });
        }
    }

    //sets the ngModel view value on load
    ngAfterViewInit() {
        this.propagateChange(this.getDateStr());
    }

    //parse the date that was entered in ngModel
    writeValue(newVal) {
        this.setDateStr(newVal);
    }

    //tell angular that we want changes to the ngModel
    registerOnChange(chg) {
        this.propagateChange = chg;
    }

    registerOnTouched(chg) {
    }

    validate(val) {
        //console.log(val);
        return (!this.isValid(val.value)) ? null : {
            datePickerError: {
                valid: false,
            },
        };
    }

    //set the focus element after datepicker is closed
    setFocusClose(newFocusAfterClose) {
        this.focusAfterClose = newFocusAfterClose;
    }

    //toggle the datepicker visible or not visible
    toggle(newFocusAfterClose) {
        if (!this.visible) {
            if (this.pService) {
                this.pService.closeOpenedPopups();
            }

            if (newFocusAfterClose) {
                this.focusAfterClose = newFocusAfterClose
            } else {
                this.focusAfterClose = null;
            }
        }

        this.visible = !this.visible;
    }

    //show the datepicker
    show(newFocusAfterClose) {
        if (this.pService) {
            this.pService.closeOpenedPopups();
        }

        if (newFocusAfterClose) {
            this.focusAfterClose = newFocusAfterClose
        } else {
            this.focusAfterClose = null;
        }

        this.visible = true;
    }

    //hide the datepicker
    hide() {
        this.visible = false;

        if (this.focusAfterClose) {
            $(this.focusAfterClose).focus();
        }
    }

    //returns whether datepicker is opened
    isDpOpened() {
        return this.visible;
    }

    //set the date to today's date
    today() {
        var today = moment({hour: 0, minute: 0, seconds: 0, milliseconds: 0});
        this.setDate(today.year(), today.month(), today.date());
    }

    //clear the ngModel view only (does not clear the date returned from this component)
    clear() {
        this.propagateChange("");
    }

    //go to the next month
    nextMonth() {
        this.bsDpModel.add(1, "months");
        //this.bsDpModel.setMonth(this.bsDpModel.getMonth() + 1);
        this.generateWeeks();

        this.checkMinMax(this.bsDpModel.year(), this.bsDpModel.month(), this.bsDpModel.date());
    }

    //go to the previous month
    prevMonth() {
        this.bsDpModel.subtract(1, "months");
        this.generateWeeks();

        this.checkMinMax(this.bsDpModel.year(), this.bsDpModel.month(), this.bsDpModel.date());
    }

    //update to a specific month
    updateMonth(event) {
        this.bsDpModel.month(event);
        this.generateWeeks();

        this.checkMinMax(this.bsDpModel.year(), event, this.bsDpModel.date());
    }

    //update to a specific year
    updateYear(event) {
        this.bsDpModel.year(event);
        this.generateWeeks();

        this.checkMinMax(event, this.bsDpModel.month(), this.bsDpModel.date());
    }

    //event for clicking on a specific date (not used to set a date)
    chooseDate(newYear, newMonth, newDay) {
        this.setDate(newYear, newMonth, newDay);

        if (!this.config.closeOnDatePick) {
            setTimeout(function () {
                //console.log($('#ups-official-dp-chooser-' + String(newYear) + String(newMonth) + String(newDay)));
                $('#ups-official-dp-chooser-' + String(newYear) + String(newMonth) + String(newDay)).focus();
            });
        }

        if (this.config.closeOnDatePick) {
            this.hide();
        }
    }

    //sets a specific date
    setDate(newYear, newMonth, newDay) {
        this.bsDpModel.set({
            "year" : newYear,
            "month" : newMonth,
            "date" : newDay
        });

        this.generateWeeks();
    }

    //receives a string following locale setting for formatting
    setDateStr(newVal) {
        var tempDate = moment(newVal, this.getLocaleObj().formatDate, true);
        if (tempDate.isValid()) {

            this.setDate(tempDate.year(), tempDate.month(), tempDate.date());
        }
    }

    //check if string is valid based on locale setting
    isValid(chkStr) {
        var tempDate = moment(chkStr, this.getLocaleObj().formatDate, true);
        if (tempDate.isValid()) {
            return true;
        }

        return false;
    }

    //check date is in valid range
    isValidRangeStr(chkStr) {
        if (this.isValid(chkStr)) {
            var mObj = moment(chkStr, this.getLocaleObj().formatDate);

            if (this.isValidRange(mObj.year(), mObj.month() + 1, mObj.date())) {
                return true;
            }

            /*if (this.checkMinMax(mObj.year(), mObj.month(), mObj.date())) {
                return true;
            }*/

            /*if (minDate && tempDate.isSameOrBefore(minDate, "day")) {
                return false;
            }

            //if (maxDate && tempDate.unix() > maxDate.unix()) {
            if (maxDate && tempDate.isSameOrAfter(maxDate, "day")) {
                disabled = true;
            }*/
        }

        return false;
    }

    //check date is in valid range
    isValidRange(year, month, day) {
        var mObj = moment(year + "-" + month + "-" + day, "YYYY-MM-DD");

        var minDate = this.config.minDate;
        var maxDate = this.config.maxDate;

        if (minDate && mObj.isSameOrBefore(minDate, "day")) {
            return false;
        }

        if (maxDate && mObj.isSameOrAfter(maxDate, "day")) {
            return false;
        }

        /*if (this.checkMinMax(year, month, day)) {
            return true;
        }*/

        if (this.checkInDisabledDates(mObj.toDate())) {
            return false;
        }

        return true;
    }

    //returns javascript date
    getDate() {
        return this.bsDpModel.toDate();
    }

    //return date string based on locale
    getDateStr() {
        return this.bsDpModel.format(this.getLocaleObj().formatDate);
    }

    //returns array of days of week based on locale
    getDaysWeek() {
        var daysOfWeek = [];

        for (var u = this.getLocaleObj().startOfWeek; u < 7; u++) {
            daysOfWeek.push(this.getDayofWeekWord(u));
        }

        if (this.getLocaleObj().startOfWeek != 0) {
            for (u = 0; u < this.getLocaleObj().startOfWeek; u++) {
                daysOfWeek.push(this.getDayofWeekWord(u));
            }
        }

        return daysOfWeek;
    }

    //set config of datepicker
    setConfig(newConfig) {
        for (var key in newConfig) {
            if (newConfig.hasOwnProperty(key)) {
                switch (key) {
                    case 'defaultVisible' :
                        this.config.defaultVisible = newConfig[key];
                        this.visible = this.config.defaultVisible;
                    break;
                    case 'useShortWeekdayWord' :
                        this.config.useShortWeekdayWord = newConfig[key];
                    break;
                    case 'closeOnDatePick' :
                        this.config.closeOnDatePick = newConfig[key];
                    break;
                    case 'minDate' :
                        this.config.minDate = newConfig[key];
                    break;
                    case 'maxDate' :
                        this.config.maxDate = newConfig[key];
                    break;
                    case 'showTodayBtn' :
                        this.config.showTodayBtn = newConfig[key];
                    break;
                    case 'showClearBtn' :
                        this.config.showClearBtn = newConfig[key];
                    break;
                    case 'showCloseBtn' :
                        this.config.showCloseBtn = newConfig[key];
                    break;
                    case 'disabledDates' :
                        if (newConfig[key].length) {
                            this.config.disabledDates.splice(0, this.config.disabledDates.length);

                            for (var i = 0; i < newConfig[key].length; i++) {
                                this.config.disabledDates.push(newConfig[key][i]);
                            }
                        }
                    break;
                    case 'isInline' :
                        this.config.isInline = newConfig[key];

                        if (newConfig[key] == true) {
                            this.config.defaultVisible = true;
                            this.config.showClearBtn = false;
                            this.config.showCloseBtn = false;
                            this.config.showTodayBtn = false;

                            this.visible = this.config.defaultVisible;
                        }
                    break;
                }
            }
        }

        this.generateWeeks();
    }

    //load a locale
    loadLocale(newLocaleName, newLocaleConfig) {
        this.locale[newLocaleName] = newLocaleConfig;
    }

    //set the locale after it's loaded
    setLocale(newLocale:string) {
        if (this.locale[newLocale]) {
            this.currentLocale = newLocale;

            this.bsDpModel.locale(newLocale);
        }
    }

    //get the currently set locale
    getLocale():string {
        return this.currentLocale;
    }

    private getLocaleObj() {
        return this.locale[this.currentLocale];
    }

    private getDayofWeekWord(index) {
        /*if (this.useShortWeekdayWord) {
            return this.getLocaleObj().daysOfWeekShort[index];
        }

        return this.getLocaleObj().daysOfWeek[index];*/

        return {
            "short" : this.getLocaleObj().daysOfWeekShort[index],
            "long" : this.getLocaleObj().daysOfWeek[index]
        };
    }

    private checkMinMax(year, month, day) {
        //var tempDate = moment(year + "-" + month + "-" + day, "YYYY-MM-DD", true);
        if (this.config.minDate) {
            if (moment(year + "-" + (month + 1) + "-" + day, "YYYY-MM-DD").isBefore(this.config.minDate, "day")) {
                this.setDate(this.config.minDate.getFullYear(), this.config.minDate.getMonth(), this.config.minDate.getDate());
            }
        }

        if (this.config.maxDate) {
            if (moment(year + "-" + (month + 1) + "-" + day, "YYYY-MM-DD").isAfter(this.config.maxDate, "day")) {
                this.setDate(this.config.maxDate.getFullYear(), this.config.maxDate.getMonth(), this.config.maxDate.getDate());
            }
        }
    }

    private generateWeeks() {
        var generatedWeek = [];

        var minDate = null;
        var maxDate = null;

        var todayDate = moment();

        if (this.config.minDate) {
            minDate = moment(this.config.minDate);
        }

        if (this.config.maxDate) {
            maxDate = moment(this.config.maxDate);
        }

        var tempDate = moment(this.bsDpModel.clone());
        var daysInMonth = tempDate.daysInMonth();

        tempDate.date(1);

        var startingDayMonth = tempDate.day();
        var startingPos = 0;

        if (startingDayMonth != this.getLocaleObj().startOfWeek) {
            startingPos = (startingDayMonth - this.getLocaleObj().startOfWeek);

            if (startingPos < 0) {
                startingPos = (7 + startingPos);
            }
        }

        tempDate.subtract(startingPos, "days");

        for (var j = 0; j < 42; j++) {
            var selDate = (tempDate.valueOf() == this.bsDpModel.valueOf()) ? true : false;
            var disabled = false;

            //if (minDate && tempDate.unix() < minDate.unix()) {
            if (minDate && tempDate.isSameOrBefore(minDate, "day")) {
                disabled = true;
            }

            //if (maxDate && tempDate.unix() > maxDate.unix()) {
            if (maxDate && tempDate.isSameOrAfter(maxDate, "day")) {
                disabled = true;
            }

            if (this.checkInDisabledDates(tempDate.toDate())) {
                disabled = true;
            }

            var today = (todayDate.isSame(tempDate, "day")) ? true : false;

            if (generatedWeek[generatedWeek.length - 1] && generatedWeek[generatedWeek.length - 1].length < 7) {
                generatedWeek[generatedWeek.length - 1].push({
                    "year" : tempDate.year(),
                    "month" : tempDate.month(),
                    "day" : tempDate.date(),
                    "disabled" : disabled,
                    "selDate" : selDate,
                    "today" : today,
                });
            } else {
                generatedWeek.push([{
                    "year" : tempDate.year(),
                    "month" : tempDate.month(),
                    "day" : tempDate.date(),
                    "disabled" : disabled,
                    "selDate" : selDate,
                    "today" : today,
                }]);
            }

            tempDate.add(1, "day");
        }

        this.generatedWeek = generatedWeek;
        this.propagateChange(this.getDateStr());
    }

    private generateYear() {
        var yearDisplay = [];

        var yearBeforeOffset = (this.bsDpModel.year() - this.getLocaleObj().yearOffset);
        var yearAfterOffset = (this.bsDpModel.year() + this.getLocaleObj().yearOffset);

        for (var b = yearBeforeOffset; b < this.bsDpModel.year(); b++) {
            var disabled = false;

            if (this.config.minDate && (b < this.config.minDate.getFullYear())) {
                disabled = true;
            }

            yearDisplay.push({
                "year" : b,
                "disabled" : disabled
            });
        }

        for (var b = this.bsDpModel.year(); b < yearAfterOffset; b++) {
            var disabled = false;

            if (this.config.maxDate && (b > this.config.maxDate.getFullYear())) {
                disabled = true;
            }

            yearDisplay.push({
                "year" : b,
                "disabled" : disabled
            });
        }

        return yearDisplay;
    }

    private generateMonth() {
        //var getCurMonthNum = this.bsDpModel.month();
        var retMonths = [];

        for (var n = 0; n < this.monthsNums.length; n++) {
            var disabled = false;

            if (this.config.minDate) {
                var minStr = Number(String(this.config.minDate.getFullYear()) + this.formatNum(this.config.minDate.getMonth()));
                var minCurStr = Number(String(this.bsDpModel.year()) + this.formatNum(this.monthsNums[n]));

                if (minCurStr < minStr) {
                    disabled = true;
                }
            }

            if (this.config.maxDate) {
                var maxStr = Number(String(this.config.maxDate.getFullYear()) + this.formatNum(this.config.maxDate.getMonth()));
                var maxCurStr = Number(String(this.bsDpModel.year()) + this.formatNum(this.monthsNums[n]));

                if (maxCurStr > maxStr) {
                    disabled = true;
                }
            }

            retMonths.push({
                "month" : this.monthsNums[n],
                "disabled" : disabled
            })
        }

        return retMonths;
    }

    private formatNum(num) {
        if (num < 10) {
            return "0" + String(num);
        }

        return String(num);
    }

    private checkLocaleConfig(newConfig) {
        if (!(newConfig.daysOfWeek
            && newConfig.daysOfWeekShort
            && newConfig.months
            && newConfig.startOfWeek
            && newConfig.yearOffset
            && newConfig.datepickerCaptionTxt
            && newConfig.prevMonthTxt
            && newConfig.nextMonthTxt
            && newConfig.monthLabel
            && newConfig.yearLabel
            && newConfig.todayBtnTxt
            && newConfig.clearBtnTxt
            && newConfig.closeBtnTxt)) {
            console.log("INVALID: Your locale config does not contain the required parameters.");
            return false;
        }

        if (newConfig.daysOfWeek.length != 7
            || newConfig.daysOfWeekShort.length != 7
            || newConfig.months.length != 12) {
            console.log("INVALID: Your locale config does not contain the required values for days and months.");
            return false;
        }

        if (isNaN(newConfig.startOfWeek) || isNaN(newConfig.yearOffset)) {
            console.log("INVALID: Your locale config does not contain the required values for startOfWeek / yearOffset.");
            return false;
        }

        if (newConfig.startOfWeek < 0 || newConfig.startOfWeek > 6) {
            console.log("INVALID: Your locale config does not contain the required values for startOfWeek.");
            return false;
        }

        return true;
    }

    private retrieveLocaleServiceConfigs() {
        var loadLocales = this.DpLocaleService.retrieveAllLocales();

        for (var key in loadLocales) {
            if (loadLocales.hasOwnProperty(key)) {
                this.loadLocale(key, loadLocales[key]);
            }
        }
    }

    private checkInDisabledDates(jsDateObj) {
        for (var i = 0; i < this.config.disabledDates.length; i++) {
            if (moment(this.config.disabledDates[i]).isSame(jsDateObj, "day")) {
                return true;
            }
        }

        return false;
    }
}
