import { ApiService } from './../services/api_service/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string;
  email: string;
  nuevaContrasena: string;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async resultadoCambio(resultado: string) {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: resultado,
      duration: 3000,
    });
    await loading.present();
  }

  recuperarPass() {
    this.apiService
      .recuperarContrasena(this.usuario, this.email, this.nuevaContrasena)
      .subscribe((respuesta) => {
        if (respuesta['recuperacion'] === 'exitosa') {
          this.resultadoCambio('¡Cambio Exitoso!');
          this.router.navigate(['home']);
        } else {
          this.resultadoCambio('¡Ingrese datos válidos!')
        }
      }, (error) => {
        console.log(error);
        this.resultadoCambio('¡Ocurrió un error!')
      });
  }
}
