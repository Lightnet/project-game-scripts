import { Component } from '@angular/core';

@Component({
    selector: 'scripteditormenu',
    template: `
        Action
        <button (click)="ScriptReload();">Reload</button>
        <button (click)="ScriptSave();">Save</button>
        <button (click)="ScriptRun();">Run</button>
        <button (click)="ScriptCreate();">Create</button>
        <button (click)="ScriptDelete();">Delete</button>
    `
})
export class ScriptEditorMenu {

    ScriptReload(){
        console.log('Reload');
    }

    ScriptSave(){
        console.log('Save');
    }

    ScriptRun(){
        console.log('Run');
    }

    ScriptDelete(){
        console.log('Delete');
    }

    ScriptCreate(){
        console.log('Create');
    }
}
