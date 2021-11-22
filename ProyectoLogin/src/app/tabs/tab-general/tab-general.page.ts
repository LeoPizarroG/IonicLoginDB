import { DataService } from './../../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-general',
  templateUrl: './tab-general.page.html',
  styleUrls: ['./tab-general.page.scss'],
})
export class TabGeneralPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private dataService: DataService) { }

  ngOnInit() {
    this.router.navigate(['tab-general/perfil']);
  }

  cerrarSesion() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'cerrarSesion',
      header: '¿Desea Cerrar Sesión?',
      buttons: [
        {
          text: 'Sí',
          role: 'logout',
          cssClass: 'close-session',
          handler: (blah) => {
            this.dataService.clear();
            this.router.navigate(['home']);
          }
        }, {
          text: 'No',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
