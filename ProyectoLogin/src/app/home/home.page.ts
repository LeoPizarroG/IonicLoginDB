import { ApiService } from './../services/api_service/api.service';
import { DataService } from './../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: string;
  contrasena: string;
  formularioEnviado = false;
  listData = [];

  constructor(
    private loadingController: LoadingController,
    private dataService: DataService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {}

  ionViewDidEnter(){
   this.healthCheck();
  }

  login() {
    if (this.usuario && this.contrasena) {
      console.log(this.usuario);
      console.log(this.contrasena);
      this.addUsuario();
      this.router.navigate(['principal']);
    } else {
      this.noData();
    }
  }

  async noData() {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: '¡Ingrese datos válidos!',
      duration: 2000,
      spinner: null,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async addUsuario() {
    await this.dataService.set('usuario', this.usuario);
    await this.dataService.set('contrasena', this.contrasena);
  }

  healthCheck() {
    this.apiService.getHome().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
