import { Injectable } from '@angular/core';

@Injectable()
export class nbsComp {
    public sectionIs: string = 'null';
    private nbsInSinglePage: boolean = false;

    public nbsGlobalFormSubmit:boolean = false;

    public setNbsInSinglePg(sety:boolean):void {
        this.nbsInSinglePage = sety;
    }

    public getNbsInSinglePg():boolean {
        return this.nbsInSinglePage;
    }
}
