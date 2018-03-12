import {returnHistoryDetail} from './returnHistoryDetail';

export interface returnHistory {
    id : number,
    dateReturnCreated : string,
    returnTrackingNumber : string,
    policyNameCategory : string,
    billingAccountNumber : string,
    returnHistoryDetail? : returnHistoryDetail
}
