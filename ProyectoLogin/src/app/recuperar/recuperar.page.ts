import { ApiService } from './../services/api_service/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string;
  correo: string;
  nuevaContrasena: string;
  esEnviadoFormulario = false;
  ionicForm: FormGroup;
  regexCorreo = '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duocuc|profesor.duoc)\.cl$';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(50),
      Validators.pattern(this.regexCorreo),
      Validators.required,
      Validators.minLength(6)])],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  async resultadoCambio(resultado: string) {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: resultado,
      duration: 3000,
      spinner: null,
    });
    await loading.present();
  }

  recuperarPass() {
    this.apiService
      .recuperarContrasena(this.usuario, this.correo, this.nuevaContrasena)
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

  submitForm() {
    this.esEnviadoFormulario = true;
    if (this.ionicForm.valid) {
      this.usuario = this.ionicForm.value.user;
      this.nuevaContrasena = this.ionicForm.value.password;
      this.correo = this.ionicForm.value.email;
      this.recuperarPass();
    } else {
      console.log('¡Datos inválidos o no ingresados!');
      return false;
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
