import { Component } from '@angular/core';
import {GameService} from '../services/game.service';

import '../../js/three.min.js';

@Component({
    selector: 'navmenu',
    styleUrls:  ['./components/navmenu.component.css'],
    template: `
        <ul>
        <li class="dropdown" >
        <a href="#" class="dropbtn">File</a>
        <div class="dropdown-content" style="z-index:5">
          <a href="#">Open Scene</a>
          <a href="#">Load Scene</a>
          <a href="#">Save Scene</a>
          <a href="#"  (click)="clearscene();">Clear Scene</a>
          <a href="#">Delete Scene</a>
        </div>
        </li>
        <li class="dropdown">
        <a href="#" class="dropbtn">Edit</a>
        <div class="dropdown-content" style="z-index:5">
          <a href="#">Delete Object</a>
        </div>
        </li>

        <li class="dropdown">
        <a href="#" class="dropbtn">Components</a>
        <div class="dropdown-content" style="z-index:5">
          <a href="#" (click)="addcube();" >Cube</a>
          <a href="#">Sphere</a>
          <a href="#">Plane</a>
          <a href="#">Mesh</a>
          <a href="#">Material</a>
        </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Packages</a>
        <div class="dropdown-content" style="z-index:5">
          <a href="#">Scripts</a>
          <a href="#">Mods</a>
        </div>
        </li>
        <li class="dropdown"><a href="#" class="dropbtn">Help</a>
        <div class="dropdown-content" style="z-index:5">
          <a href="#">Docs</a>
          <a href="#">About</a>
        </div>
        </li>
        <li><a href="#" class="dropbtn">Build</a></li>
        <li><a href="#" class="dropbtn">Debug</a></li>
        <li><a href="#" class="dropbtn">Play</a></li>
        <li><a href="#" class="dropbtn">Stop</a></li>
        </ul>
    `
})
export class NavMenu {
    constructor(gameservice:GameService){
        this.gameservice = gameservice;
    }

    clearscene(){
        if(this.gameservice.scene !=null){
            var objscene = this.gameservice.scene;
            while (objscene.children.length)
            {
                objscene.remove(objscene.children[0]);
            }
        }
    }

    addcube(){
        if(this.gameservice.scene !=null){
            console.log("cube");
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    		var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
    		var cube = new THREE.Mesh( geometry, material );
            cube.name = "cube";
    		this.gameservice.scene.add( cube );
        }
    }
}
