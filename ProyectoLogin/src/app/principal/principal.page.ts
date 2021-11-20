import { DataService } from './../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getUsuario();
  }

  async getUsuario() {
    const loggedUser = await this.dataService.get('usuario');
    console.log(loggedUser);
  }
}
