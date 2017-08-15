//setup app

//import { NgModule, Component, Input, Attribute } from '@angular/core';
import { NgModule, Component } from '@angular/core';
import { FormsModule }    from '@angular/forms';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//import { ActivatedRoute, RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';

import {AceEditorDirective, AceEditorComponent} from 'ng2-ace-editor';

import { MainApp } from './app.component';

import {AssetsList} from './components/assets.component';
import {SceneList} from './components/scene.component';
import {Objectprops} from './components/objectprops.component';
import {GameEditor} from './components/gameeditor.component';
import {CodeEditor} from './components/codeeditor.component';
import {ScriptEditorExplore} from './components/scripteditorexplore.component';
import {ScriptEditorLayout} from './components/scripteditorlayout.component';
import {ScriptEditorMenu} from './components/scripteditormenu.component';
import {EditorMenu} from './components/editormenu.component';
import {EditorPanel} from './components/editorpanel.component';


import {NavMenu} from './components/navmenu.component';
import {GameService} from './services/game.service';

//const routing = RouterModule.forRoot([
    //{ path: '', component: Hello },
    //{ path: 'ciao/:name', component: Ciao },
//]);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        MainApp,
        AceEditorDirective,
        AceEditorComponent,
        GameEditor,
        NavMenu,
        ScriptEditorLayout,
        SceneList,
        AssetsList,
        ScriptEditorMenu,
        ScriptEditorExplore,
        CodeEditor,
        Objectprops,
        EditorPanel,
        EditorMenu
    ],
    providers: [
        GameService
    ],
    bootstrap: [MainApp],
})
export class AppModule {

}
