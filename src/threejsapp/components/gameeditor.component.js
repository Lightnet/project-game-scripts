//setup app

import { NgModule, Component, Input, Attribute } from '@angular/core';
import 'rxjs/add/operator/map';

import {GameService} from '../services/game.service';

import '../../js/three.min.js';
import '../../js/postprocessing/EffectComposer.js';
import '../../js/shaders/CopyShader.js';

import {Threejs_game} from '../threejs_game/threejs_game';

import '../../js/jquery.min.js';
import '../../js/jquery-ui.min.js';
import '../../js/jquery.layout.min.js';

@Component({
    selector: 'gameeditor',
    template: `
    <editormenu></editormenu>
    <div id="container" style="height:100%;">
        <div class="ui-layout-center" style="margin: 0;padding : 0;">
            <!--<canvas id="renderCanvas"></canvas>-->
            <div id="renderCanvas"></div>
        </div>
        <div class="ui-layout-north">

        </div>
        <div class="ui-layout-south" style="margin: 0;padding : 0;">
            <editorpanel></editorpanel>
        </div>
        <div class="ui-layout-east">
            <scene-list></scene-list>
            <objectprops></objectprops>
        </div>
        <div class="ui-layout-west">
            <assets-list></assets-list>
        </div>
    </div>
    `
})
export class GameEditor implements OnInit{

    scene = null;

    constructor(gameservice:GameService){
        this.gameservice = gameservice;
    }

    ngOnInit(): void {
        console.log("init layout!");

        this.setup_layout();
        this.init();
    }

    setup_layout(){
        var self = this;
        $('#container').layout({
            resizable:true,
            onresize:()=>{
                //console.log("resize");
                self.resizecanvas();
            }
        });
        var layout = $('#container').layout();
        layout.sizePane("south", 250);
        layout.toggle("north");
    }

    resizecanvas(){
        if((this.camera !=null)&&(this.renderer != null)){
            var layout = $('#container').layout();
            var width     = layout.state.center.innerWidth;
            var height     = layout.state.center.innerHeight;
            //this.camera.aspect = width / height;
            //this.camera.updateProjectionMatrix();
            //this.renderer.setSize( width,height );
            layout = null;
            width = null;
            height = null;
        }
    }

    init(){
        var config;
        config = {bupdateobjects:true};
        var game = new Threejs_game(config);
        console.log(game);
        this.gameservice.app = game;
    }
}
