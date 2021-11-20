import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string;
  contrasena: string;
  formularioEnviado = false;

  constructor(private loadingController: LoadingController) {}

  ngOnInit() { }

  login() {
    if(this.usuario && this.contrasena) {
      console.log(this.usuario);
      console.log(this.contrasena);
      // const usuarioLogin = {
      //   usuario : this.usuario,
      //   contrasena: this.contrasena
      // };
      // this.storage.set('user', usuarioLogin);
    } else {
      this.noData();
    }
  }

  async noData() {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: '¡Ingrese datos válidos!',
      duration: 2000,
      spinner: null
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
