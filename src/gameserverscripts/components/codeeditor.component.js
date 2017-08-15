//add "AceEditorDirective" to your modules list

import { AceEditorDirective } from 'ng2-ace-editor';
import { Component } from '@angular/core';
import 'zone.js/dist/zone';

@Component({
    selector: 'codeeditor-component',
    template: `
    <div ace-editor
       [text]="text"
       [options]="options"
       [readOnly]="false"
       [autoUpdateContent]="true"
       (textChanged)="onChange($event)"
       style="min-height: 200px; height:100%; width:100%; overflow: auto;margin: 0;padding : 0;"></div>
    `
})
export class CodeEditor {
    text:string = "Test";
    //options:any = {maxLines: 1000, printMargin: false};
    options:any = { printMargin: false};

    onChange(code) {
        console.log("new code", code);
    }
}
