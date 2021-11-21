import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { DataService } from './../services/data_service/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private dataService: DataService, private router: Router) { }

  async canLoad() {
    const esSesionIniciada = await this.dataService.get('sesionIniciada');

    if(esSesionIniciada === true) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
