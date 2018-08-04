import { Component, OnInit } from '@angular/core';
declare var device;

@Component({
	selector: 'registro',
	templateUrl: '../views/registro.html'
})
export class RegistroComponent implements OnInit{
	public titulo: string;

	constructor(){		
	}

	ngOnInit(){
		document.addEventListener("deviceready", function(){alert(device.platform);}, false);
	}
}