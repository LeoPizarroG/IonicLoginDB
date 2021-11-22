import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api_service/api.service';
import { DataService } from './../../services/data_service/data.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  usuario: string;
  contrasena: string;
  email: string;
  id?: number;

  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.recuperarDatos();
    this.getUsuario();
  }

  async getUsuario() {
    this.usuario = await this.dataService.get('usuario');
    this.contrasena = await this.dataService.get('contrasena');
    this.email = await this.dataService.get('email');
    this.id = await this.dataService.get('id');
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

  actualizarDatos(usuario: string, email: string, contrasena: string) {
    this.apiService.actualizarDatosUsuario(this.id, usuario, contrasena, email)
      .subscribe((respuesta) => {
        if (respuesta['actualizacion'] === 'exitosa') {
          this.resultadoCambio('¡Actualización exitosa!');
          this.dataService.clear();
          this.router.navigate(['home']);
        }
      }, (error) => {
        console.log(error);
      });
  }

  async logout() {
    await this.dataService.clear();
    this.router.navigate(['home']);
  }

  async resultadoCambio(resultado: string) {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: resultado,
      duration: 3000,
    });
    await loading.present();
  }
}
