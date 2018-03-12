import { AbstractControl } from '@angular/forms';

export const ValidateEqual = (testVar) => {
    return (frmCtrl: AbstractControl) => {
        if (frmCtrl.value != testVar) {
            return {
                valEqual : {
                    valid : false
                }
            }
        }

        return null;
    }
}

export const ValidateNotEqual = (testVar) => {
    return (frmCtrl: AbstractControl) => {
        if (frmCtrl.value == testVar) {
            return {
                valNotEqual : {
                    valid : false
                }
            }
        }

        return null;
    }
}



/*export function ValidateEqual(frmCtrl: AbstractControl, anotherVar) {
    console.log(anotherVar);


}

export function ValidateNotEqual(frmCtrl: AbstractControl, anotherVar) {
    console.log(anotherVar);

    if (frmCtrl.value == 0) {
        return {
            valNotEqual : {
                valid : false
            }
        }
    }

    return null;
}*/
