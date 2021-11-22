import { DataService } from './../../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre: string;
  correo: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUsuario();
  }

  async getUsuario() {
    this.nombre = await this.dataService.get('usuario');
    this.correo = await this.dataService.get('email');
  }

}
