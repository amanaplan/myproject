"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var forms_1 = require("@angular/forms");
var DeliveryComponent = (function () {
    function DeliveryComponent(_router, _route, fb) {
        this._router = _router;
        this._route = _route;
        this.alertsSignedUp = false;
        this.pickupDefault = true;
        this.pickupHistory = false;
        this.pickupSuccess = false;
        this.pickupNoAction = false;
        this.pickupMissed = false;
        this.pickupNone = false;
        this.pickupError = false;
        this.pickupStatusNone = true;
        this.pickupStatusToday = false;
        this.pickupStatusTomorrow = false;
        this.pickupStatusPassed = false;
        this.pickupStatusNotToday = false;
        this.pickupStatusError = false;
        this.pickupSuccessNoAction = false;
        this.pickupSuccessOnDemandSuccess = false;
        this.pickupSuccessOnDemandOtherDay = false;
        this.pickupMissedPassed = false;
        this.pickupMissedPassedDayChoices = false;
        this.pickupMissedNotSet = false;
    }
    DeliveryComponent.prototype.ngOnInit = function () {
        var id = +this._route.snapshot.params['id'];
        jQuery('#pickupModal').modal('show');
    };
    DeliveryComponent.prototype.alertSubscribe = function () {
        this.alertsSignedUp = true;
    };
    DeliveryComponent.prototype.clearAllDisplay = function () {
        this.pickupDefault = false;
        this.pickupHistory = false;
        this.pickupSuccess = false;
        this.pickupNoAction = false;
        this.pickupMissed = false;
        this.pickupNone = false;
        this.pickupError = false;
        this.pickupStatusNone = true;
        this.pickupStatusToday = false;
        this.pickupStatusTomorrow = false;
        this.pickupStatusPassed = false;
        this.pickupStatusNotToday = false;
        this.pickupStatusError = false;
        this.pickupSuccessNoAction = false;
        this.pickupSuccessOnDemandSuccess = false;
        this.pickupSuccessOnDemandOtherDay = false;
        this.pickupMissedPassed = false;
        this.pickupMissedPassedDayChoices = false;
    };
    DeliveryComponent.prototype.demoHistoryDisplay = function () {
        this.clearAllDisplay();
        this.pickupHistory = true;
    };
    DeliveryComponent.prototype.demoDefaultDisplay = function () {
        this.clearAllDisplay();
        this.pickupDefault = true;
    };
    DeliveryComponent.prototype.demoSuccessDisplay = function () {
        this.clearAllDisplay();
        this.pickupStatusNone = false;
        this.pickupStatusToday = true;
        this.pickupSuccess = true;
    };
    DeliveryComponent.prototype.demoSuccessNoActionDisplay = function () {
        this.demoSuccessDisplay();
        this.pickupSuccessNoAction = true;
    };
    DeliveryComponent.prototype.demoMissedOnDemandAvailableDisplay = function () {
        this.clearAllDisplay();
        this.pickupMissed = true;
        this.pickupStatusNone = false;
        this.pickupStatusPassed = true;
    };
    DeliveryComponent.prototype.demoMissedNoChoicesDisplay = function () {
        this.clearAllDisplay();
        this.pickupStatusNone = false;
        this.pickupStatusPassed = true;
        this.pickupMissed = true;
        this.pickupMissedPassed = true;
    };
    DeliveryComponent.prototype.demoMissedChoicesDisplay = function () {
        this.demoMissedNoChoicesDisplay();
        this.pickupMissedPassedDayChoices = true;
    };
    DeliveryComponent.prototype.demoOnCall = function () {
        this.pickupMissed = true;
        this.pickupMissedPassed = true;
    };
    DeliveryComponent.prototype.demoRequestPickupAfterMissed = function () {
        this.clearAllDisplay();
        this.pickupSuccess = true;
        this.pickupStatusNone = false;
        this.pickupStatusTomorrow = true;
        this.pickupSuccessOnDemandOtherDay = true;
    };
    DeliveryComponent.prototype.demoOnDemandNoPickuptimeDisplay = function () {
        this.clearAllDisplay();
        this.pickupMissed = true;
        this.pickupStatusNone = false;
        this.pickupStatusNotToday = true;
        this.pickupMissedNotSet = true;
    };
    DeliveryComponent.prototype.demoErrorDisplay = function () {
        this.clearAllDisplay();
        this.pickupStatusNone = false;
        this.pickupStatusError = true;
        this.pickupError = true;
    };
    return DeliveryComponent;
}());
DeliveryComponent = __decorate([
    core_1.Component({
        templateUrl: 'assets/resources/scripts/angular2/pickup_point/templates/delivery_manage.tpl.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, forms_1.FormBuilder])
], DeliveryComponent);
exports.DeliveryComponent = DeliveryComponent;
