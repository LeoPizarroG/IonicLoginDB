import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-general',
  templateUrl: './tab-general.page.html',
  styleUrls: ['./tab-general.page.scss'],
})
export class TabGeneralPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.router.navigate(['tab-general/perfil']);
  }

  cerrarSesion() {
    this.presentAlertMultipleButtons();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }
}
