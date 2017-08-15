import { Component } from '@angular/core';

import {GameService} from '../services/game.service';

@Component({
    selector: 'assets-list',
    template: `
        Assets
        <!--<button (click)="refresh()">Refresh</button>-->
        <!--
        <div *ngIf="gameservice.scene">
            <a *ngFor="let obj of gameservice.scene.children">
                <label>{{obj.name}}</label>
            </a>
        </div>
        -->
    `
})
export class AssetsList {
    constructor(gameservice:GameService){
        //console.log(gameservice);
        this.gameservice = gameservice;
    }

    refresh(){
        console.log("refresh");
        console.log(this.gameservice);
        //console.log(this.gameservice.scene.children[0]);
    }
}
