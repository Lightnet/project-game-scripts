import { Component } from '@angular/core';

@Component({
    selector: 'scripteditorlayout',
    template: `
        <div style="height:100%;width:100%;">
            <div style="width:20%;height:100%;float:left;margin:0;padding:0;">
                <scripteditormenu></scripteditormenu>
                <scripteditorexplore></scripteditorexplore>
            </div>
            <div style="width:80%;height:100%;float:left;">
            <codeeditor-component style="margin:0;padding:0;"></codeeditor-component>
            </div>
        </div>
    `
})
export class ScriptEditorLayout {

}
