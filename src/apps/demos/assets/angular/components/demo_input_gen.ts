import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    template: `<div class="row">
            <div class="col-sm-5">
                <div class="ups-form_group">
                    <label for="formType" class="ups-form_label">Type:</label>
                    <div class="ups-dropdown_wrapper ups-input_wrapper">
                        <select class="ups-dropdown" id="formType" [(ngModel)]="formType" (ngModelChange)="updatePreview()">
                            <option value="0">Textbox</option>
                            <option value="1">Dropdown</option>
                            <option value="2">Checkbox</option>
                            <option value="3">Radio</option>
                        </select>
                    </div>
                </div>
                <fieldset class="ups-form_group">
                    <legend class="ups-form_label">
                        Options
                    </legend>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="required" class="ups-checkbox-custom" [(ngModel)]="codeProps.required">
                                <label for="required" class="ups-checkbox-custom-label">
                                    Required
                                </label>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="hasSubheader" class="ups-checkbox-custom" [(ngModel)]="codeProps.hasSubheader">
                                <label for="hasSubheader" class="ups-checkbox-custom-label">
                                     Subheader
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="hasUnit" class="ups-checkbox-custom" [(ngModel)]="codeProps.hasUnit">
                                <label for="hasUnit" class="ups-checkbox-custom-label">
                                    Has Unit
                                </label>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="helpBtn" class="ups-checkbox-custom" [(ngModel)]="codeProps.helpBtn">
                                <label for="helpBtn" class="ups-checkbox-custom-label">
                                    Help Button
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="hasCalendar" class="ups-checkbox-custom" disabled>
                                <label for="hasCalendar" class="ups-checkbox-custom-label">
                                    Has Calendar
                                </label>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="includeAngular" class="ups-checkbox-custom" disabled>
                                <label for="includeAngular" class="ups-checkbox-custom-label">
                                    Include Angular Code
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="ups-form_group" *ngIf="codeProps.hasAngular">
                    <legend class="ups-form_label">Angular Options</legend>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="hasModelVar" class="ups-checkbox-custom" [(ngModel)]="angOptions.hasModelVar">
                                <label for="hasModelVar" class="ups-checkbox-custom-label">
                                    ngModel
                                </label>
                            </div>
                            <div class="ups-indent_with_input" *ngIf="angOptions.hasModelVar">
                                <label for="modelVar" class="ups-readerTxt">ngModel Variable</label>
                                <div class="ups-text_wrapper ups-input_wrapper">
                            		<input type="text"
                            			class="ups-form_input"
                            			id="modelVar"
                            			name="modelVar"
                                        [(ngModel)]="angOptions.modelVar">
                            	</div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="ups-buttonList_wrapper ups-input_wrapper">
                                <input type="checkbox" id="hasCtrlName" class="ups-checkbox-custom" [(ngModel)]="angOptions.hasCtrlName">
                                <label for="hasCtrlName" class="ups-checkbox-custom-label">
                                    formControlName
                                </label>
                            </div>
                            <div class="ups-indent_with_input" *ngIf="angOptions.hasCtrlName">
                                <label for="fCtrlName" class="ups-readerTxt">formControlName Variable</label>
                                <div class="ups-text_wrapper ups-input_wrapper">
                            		<input type="text"
                            			class="ups-form_input"
                            			id="fCtrlName"
                            			name="fCtrlName"
                                        [(ngModel)]="angOptions.fCtrlName">
                            	</div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div class="ups-form_group">
                    <label for="idName" class="ups-form_label">Id &amp; Name:</label>
                    <div class="ups-text_wrapper ups-input_wrapper">
                        <input type="text" class="ups-form_input" id="idName" value="" [(ngModel)]="codeProps.idName">
                    </div>
                </div>
                <div class="ups-form_group">
                    <label for="fLabel" class="ups-form_label">Label:</label>
                    <div class="ups-text_wrapper ups-input_wrapper">
                        <input type="text" class="ups-form_input" id="fLabel" value="Label" [(ngModel)]="codeProps.fLabel">
                    </div>
                </div>
                <div *ngIf="codeProps.hasSubheader">
                    <div class="ups-form_group">
                        <label for="subheader" class="ups-form_label">Subheader:</label>
                        <div class="ups-text_wrapper ups-input_wrapper">
                            <input type="text" class="ups-form_input" id="subheader" value="USD" [(ngModel)]="codeProps.subheader">
                        </div>
                    </div>
                </div>
                <div *ngIf="codeProps.hasUnit">
                    <div class="ups-form_group">
                        <label for="unitType" class="ups-form_label">Unit Type:</label>
                        <div class="ups-text_wrapper ups-input_wrapper">
                            <input type="text" class="ups-form_input" id="unitType" value="USD" [(ngModel)]="codeProps.unitType" maxlength="5" size="6">
                        </div>
                    </div>
                </div>
                <div *ngIf="codeProps.helpBtn">
                    <div class="ups-form_group">
                        <label for="helpBtnTxt" class="ups-form_label">Help Button Tooltip:</label>
                        <div class="ups-textArea_wrapper ups-input_wrapper">
                            <textarea class="ups-textArea" id="helpBtnTxt" rows="3" [(ngModel)]="codeProps.helpBtnTxt"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
                <div class="ups-group">
                    <button class="ups-cta ups-cta_primary" (click)="copyClipboard()">Copy to Clipboard</button>
                    <span *ngIf="copied">Copied to clipboard!</span>
                </div>
                <div class="ups-code_editor" #mainEditor>
                    <div class="ups-code_editor_line">
                        &lt;div class="ups-form_group<span *ngIf="codeProps.required"> ups-form_required</span><span *ngIf="codeProps.hasUnit"> ups-input_has_unit</span>"&gt;
                    </div>
                    <div class="ups-code_editor_line">
                        <span class="ups-code_editor_tab"></span>&lt;label for="{{ codeProps.idName }}" class="ups-form_label"&gt;
                    </div>
                    <div class="ups-code_editor_line">
                        <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>{{ codeProps.fLabel }}
                    </div>
                    <div class="ups-code_editor_line" *ngIf="codeProps.required">
                        <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="ups-required_indicator" aria-hidden="true"&gt;&lt;/span&gt;
                    </div>
                    <div class="ups-code_editor_line">
                        <span class="ups-code_editor_tab"></span>&lt;/label&gt;
                    </div>
                    <div class="ups-code_editor_line" *ngIf="codeProps.hasSubheader">
                        <span class="ups-code_editor_tab"></span>&lt;p class="ups-form_subheader" id="{{ codeProps.idName}}_subhelp"&gt;{{ codeProps.subheader }}&lt;/p&gt;
                    </div>
                    <ng-container *ngIf="codeProps.helpBtn">
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span>&lt;div class="ups-help"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;button type="button" class="ups-help_link"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="icon ups-icon-questioncircle" aria-hidden="true"&gt;&lt;/span&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>Help
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;/button&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;div class="ups-help_tooltip ups-help_tooltip_topleft"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;button type="button" class="ups-help_close"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="icon ups-icon-x ups-iconAlone" aria-hidden="true"&gt;&lt;/span&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="ups-readerTxt"&gt;Close&lt;/span&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;/button&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;p&gt;{{ codeProps.helpBtnTxt }}&lt;/p&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;/div&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span>&lt;/div&gt;
                        </div>
                    </ng-container>
                    <!--<div class="ups-help">
                        <button type="button" id="ups-formHelp2" class="ups-help_link">
                            <span class="icon ups-icon-questioncircle" aria-hidden="true"></span>
                            Help
                        </button>
                        <div class="ups-help_tooltip ups-help_tooltip_topleft">
                            <button type="button" class="ups-help_close">
                                <span class="icon ups-icon-x ups-iconAlone" aria-hidden="true"></span>
                                <span class="ups-readerTxt">Close</span>
                            </button>
                            <p>Lorem ipsum</p>
                        </div>
                    </div>-->
                    <ng-container *ngIf="(formType == 0)">
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span>&lt;div class="ups-text_wrapper ups-input_wrapper"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;input type="text"
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>class="ups-form_input"
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>id="{{ codeProps.idName }}"
                        </div>

                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span>name="{{ codeProps.idName }}"</span><ng-container *ngIf="!codeProps.required && !codeProps.hasSubheader">&gt;</ng-container>
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.hasSubheader">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>aria-describedby="{{ codeProps.idName }}_subhelp"
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.required">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>aria-required="true"
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.required">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>required&gt;
                        </div>

                        <div class="ups-code_editor_line" *ngIf="codeProps.hasUnit">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="ups-input_unit_measure"&gt;{{ codeProps.unitType }}&lt;/span&gt;
                        </div>
                    </ng-container>
                    <ng-container *ngIf="(formType == 1)">
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span>&lt;div class="ups-dropdown_wrapper ups-input_wrapper"&gt;
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;select class="ups-dropdown"
                        </div>
                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>id="{{ codeProps.idName }}"
                        </div>

                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span>name="{{ codeProps.idName }}"</span><ng-container *ngIf="!codeProps.required && !codeProps.hasSubheader">&gt;</ng-container>
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.hasSubheader">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>aria-describedby="{{ codeProps.idName }}_subhelp"
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.required">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>aria-required="true"
                        </div>
                        <div class="ups-code_editor_line" *ngIf="codeProps.required">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>required&gt;
                        </div>

                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;option&gt;Select One&lt;/option&gt;
                        </div>

                        <div class="ups-code_editor_line">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;/select&gt;
                        </div>

                        <div class="ups-code_editor_line" *ngIf="codeProps.hasUnit">
                            <span class="ups-code_editor_tab"></span><span class="ups-code_editor_tab"></span>&lt;span class="ups-input_unit_measure"&gt;{{ codeProps.unitType }}&lt;/span&gt;
                        </div>

                    </ng-container>

                    <div class="ups-code_editor_line">
                        <span class="ups-code_editor_tab"></span>&lt;/div&gt;
                    </div>

                    <div class="ups-code_editor_line">
                        &lt;/div&gt;
                    </div>






                        <!--<div class="ups-help">
                            <button type="button" id="ups-formHelp2" class="ups-help_link">
                                <span class="icon ups-icon-questioncircle" aria-hidden="true"></span>
                                Help
                            </button>
                            <div class="ups-help_tooltip ups-help_tooltip_topleft">
                                <button type="button" class="ups-help_close">
                                    <span class="icon ups-icon-x ups-iconAlone" aria-hidden="true"></span>
                                    <span class="ups-readerTxt">Close</span>
                                </button>
                                <p>Lorem ipsum</p>
                            </div>
                        </div>-->




                        <!--<div *ngIf="(formType == 1)">
                            <span class="tabIndent"></span>&lt;div class="ups-text_wrapper ups-dropdown_wrapper"&gt;
                        </div>
                        <div *ngIf="(formType == 1)">
                            <span class="tabIndent"></span><span class="tabIndent"></span>&lt;select name="{{ codeProps.idName }}"<br>
                            <span class="tabIndent"></span><span class="tabIndent"></span>
                            class="ups-form_input"<br>
                            <span class="tabIndent"></span><span class="tabIndent"></span>
                            id="{{ codeProps.idName }}"
                            <span *ngIf="codeProps.required">
                                <br><span class="tabIndent"></span><span class="tabIndent"></span>aria-required="true"<br>
                                <span class="tabIndent"></span><span class="tabIndent"></span>
                                required
                            </span>&gt;<br>
                            <span class="tabIndent"></span><span class="tabIndent"></span><span class="tabIndent"></span><span class="tabIndent"></span>&lt;option value="0"&gt;Select One&lt;/option&gt;<br>
                            <span class="tabIndent"></span><span class="tabIndent"></span>&lt;/select&gt;
                            <span *ngIf="codeProps.hasUnit">&lt;span class="ups-input_unit_measure"&gt;{{ codeProps.unitType }}&lt;/span&gt;<br></span>
                        </div>
                        <br>-->
                </div>

                <textarea style="width: 0; height: 0; position: relative; z-index: -1;" #editorCopyTxtArea></textarea>

                <div class="ups-code_preview">
                    <div class="ups-code_preview_legend">
                        Preview
                    </div>
                    <div [innerHTML]="coderHTML" #codePreviewInner>
                    </div>
                </div>

            </div>
        </div>`,
    styles: [`
                .ups-code_editor {
                    padding: 5px;
                    background-color: #242424;
                    color: white;
                    font-family: monospace;
                    counter-reset: editor;
                    position: relative;
                    margin-bottom: 25px;
                }

                .ups-code_editor:before {
                    content: " ";
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 40px;
                    background-color: #404040;
                    z-index: 1;
                }

                .ups-code_editor .ups-code_editor_line:before {
                    content: counter(editor);
                    counter-increment: editor;
                    display: inline-block;
                    width: 40px;
                    position: relative;
                    z-index: 2;
                    margin-left: -45px;
                }

                .ups-code_editor .ups-code_editor_line {
                    margin-left: 45px;
                    word-wrap: break-word;
                }

                .ups-code_editor .ups-code_editor_line .ups-code_editor_tab {
                    margin-left: 2em;
                }

                .ups-code_editor .ups-code_editor_line .ups-code_editor_tab:before {
                    content: "\\0009";
                }

                .ups-code_preview {
                    border: 2px solid #CCC;
                    border-radius: 4px;
                    padding: 45px 15px;
                    position: relative;
                }

                .ups-code_preview .ups-code_preview_legend {
                    position: absolute;
                    top: -13px;
                    left: 20px;
                    background-color: white;
                    border: 2px solid #CCC;
                    border-radius: 4px;
                    padding: 2px 5px;
                }
            `]
})
export class DemoInputGenComponent {
    codeProps = {
        required : false,
        hasUnit : false,
        helpBtn : false,
        hasSubheader : false,
        hasAngular : false,
        subheader : "Lorem ipsum",
        idName : "idElem",
        fLabel : "Label",
        unitType : "USD",
        helpBtnTxt : "Lorem ipsum"
    };

    angOptions = {
        hasModelVar : true,
        hasCtrlName : false,
        modelVar : "aVar",
        fCtrlName : "aName"
    }

    formType = "0";

    copied:boolean = false;
    copiedTimer = null;

    coderHTML = "";

    @ViewChild('mainEditor') mainEditor;
    @ViewChild('editorCopyTxtArea') editorCopyTxtArea;
    @ViewChild('codePreviewInner') codePreviewInner;

    constructor () {

    }

    ngAfterViewInit() {
        /*console.log(this.mainEditor.nativeElement.childNodes.length);

        var idRemove = [];

        for (var f = 0; f < this.mainEditor.nativeElement.childNodes.length; f++) {
            if (this.mainEditor.nativeElement.childNodes[f] && this.mainEditor.nativeElement.childNodes[f].nodeType) {
                if (this.mainEditor.nativeElement.childNodes[f].nodeType != 3) {
                    if (this.mainEditor.nativeElement.childNodes[f].textContent.trim() == "") {
                        idRemove.push(f);
                    }
                    this.mainEditor.nativeElement.childNodes[f].textContent = this.mainEditor.nativeElement.childNodes[f].textContent.trim();
                }
            }
        }*/

        /*for (var h = 0; h < idRemove.length; h++) {
            this.mainEditor.nativeElement.removeChild(this.mainEditor.nativeElement.childNodes[h]);
        }*/
        //this.codePreviewInner.nativeElement.innerHTML =


        /*console.log(this.mainEditor);*/
    }

    ngAfterViewChecked() {
        this.codePreviewInner.nativeElement.innerHTML = this.transformEditorText(this.mainEditor.nativeElement);
    }

    updatePreview() {
        /*var that = this;
        setTimeout(function () {

        })*/
    }

    transformEditorText(node) {
        var completedText = "";

        for (var f = 0; f < node.childNodes.length; f++) {
            if (node.childNodes[f].nodeType) {
                if (node.childNodes[f].nodeType == 1) {
                    if (node.childNodes[f].childNodes.length > 0) {
                        for (var l = 0; l < node.childNodes[f].childNodes.length; l++) {
                            if (node.childNodes[f].childNodes[l].className == "ups-code_editor_tab") {
                                completedText += "    ";
                            }
                        }
                    }

                    completedText += node.childNodes[f].textContent.trim();

                    if (node.childNodes[f].className == "ups-code_editor_line") {
                        completedText += "\n";
                    }
                }
            }
        }

        return completedText;
    }

    copyClipboard() {
        this.editorCopyTxtArea.nativeElement.value = this.transformEditorText(this.mainEditor.nativeElement);
        this.editorCopyTxtArea.nativeElement.select();
        /*var r = document.createRange();
        r.selectNode(this.editorCopyTxtArea.nativeElement);
        window.getSelection().addRange(r);*/
        document.execCommand('copy');

        clearTimeout(this.copiedTimer);
        var that = this;
        this.copiedTimer = setTimeout(function () {
            that.copied = false;
        }, 5000);
        this.copied = true;
    }
}
