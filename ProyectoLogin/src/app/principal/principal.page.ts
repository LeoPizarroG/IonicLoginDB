import { DataService } from './../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string;
  contrasena: string;
  email: string;
  id?: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getUsuario();
  }

  async getUsuario() {
    this.usuario = await this.dataService.get('usuario');
    this.contrasena = await this.dataService.get('contrasena');
    // TODO: Añadir resto de datos del usuario a storage local.
    // this.email = await this.dataService.get('email');
    // this.id = await this.dataService.get('id');
  }
}
