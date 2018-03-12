//import {packagesInShipment} from './packageShipment';

export interface packageDetail /*extends packagesInShipment*/ {
    /*id : number,
    sendName : string,
    shippedOn : string,
    shippedToStreet : string,
    shippedToCity : string,
    shippedToState : string,
    shippedToZip: string,
    shippedToCountry : string,
    shippedService : string,
    packagesInShipmentTotal: number,
    showAllPackages ?: boolean,
    packagesInShipment : packagesInShipment[]*/

    id : number,
    trackNum : string,
    descrip : string,
    status : string,
    additionalInfo : string,
    exception : boolean,
    actionRequired : boolean,
    delivered : boolean,
    date : string,
    time : string
}
