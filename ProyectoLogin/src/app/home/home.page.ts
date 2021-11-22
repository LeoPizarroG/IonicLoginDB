import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiService } from './../services/api_service/api.service';
import { DataService } from './../services/data_service/data.service';

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
  uid: string;
  esGuardarSesion = false;

  constructor(
    private loadingController: LoadingController,
    private dataService: DataService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
   console.log(this.esGuardarSesion);
  }

  ionViewDidEnter(){
   this.healthCheck();
   // DESCOMENTAR ESTA LÍNEA PARA ACTIVAR FUNCIONALIDAD DE MANTENER SESIÓN.
   this.mantenerSesionIniciada();
  }

  login() {
    if (this.usuario && this.contrasena) {
      this.iniciarSesion();
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
  }

  addUsuario() {
    this.dataService.set('usuario', this.usuario);
    this.dataService.set('contrasena', this.contrasena);
  }

  healthCheck() {
    this.apiService.getHome().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  iniciarSesion() {
    this.apiService.loginUsuario(this.usuario, this.contrasena).subscribe( (respuesta) => {
      if(Object.keys(respuesta).length === 0) {
        return this.noData();
      }
      else {
        this.addUsuario();
        this.dataService.set('sesionIniciada', true);
        this.recuperarDatos();
        this.router.navigate(['tab-general']);
      }
    }, (error) => {
      console.log(error);
    });
  }

  async mantenerSesionIniciada() {
    const mantener = await this.dataService.get('mantener');
    const sesionIniciada = await this.dataService.get('sesionIniciada');
    if (mantener === true && sesionIniciada === true) {
      this.usuario = await this.dataService.get('usuario');
      this.contrasena = await this.dataService.get('contrasena');
      this.iniciarSesion();
    }

  }

  change() {
    this.dataService.set('mantener', this.esGuardarSesion);
  }

  recuperarDatos() {
    this.apiService.obtenerDatosUsuario(this.usuario).subscribe(
      (respuesta) => {
        if ('id' in respuesta && 'email' in respuesta) {
          this.dataService.set('email', respuesta.email);
          this.dataService.set('id', respuesta.id);
        } else {
          console.log('¡Error!');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
