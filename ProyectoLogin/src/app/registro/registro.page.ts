import { ApiService } from './../services/api_service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  ionicForm: FormGroup;
  esEnviadoFormulario = false;
  usuario: string;
  contrasena: string;
  email: string;
  regexCorreo = '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duocuc|profesor.duoc)\.cl$';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(50),
      Validators.pattern(this.regexCorreo),
      Validators.required,
      Validators.minLength(6)])],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  submitForm() {
    this.esEnviadoFormulario = true;
    if (this.ionicForm.valid) {
      //TODO: Añadir servicio para registrar usuario.
      this.usuario = this.ionicForm.value.usuario;
      this.contrasena = this.ionicForm.value.contrasena;
      this.email = this.ionicForm.value.email;
      this.crearUsuario(this.usuario, this.contrasena, this.email);
      // this.registroExitoso();

    } else {
      console.log('¡Datos inválidos o no ingresados!');
      return false;
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  crearUsuario(usuario: string, contrasena: string, correo: string) {
    this.apiService.crearUsuario(usuario, contrasena, correo).subscribe((exitoso) => {
      console.log(exitoso);
      if (exitoso.registro === '¡Registro exitoso!') {
        this.registroExitoso('¡Registrado exitosamente!');
      } else {
        this.registroExitoso('¡El correo ya está en uso!');
      }
    }, (error) => {
      console.log(error);
    });
  }

  async registroExitoso(registro: string) {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: registro,
      spinner: null,
      duration: 3000
    });
    await loading.present();

    const { data } = await loading.onDidDismiss();
    if ( data == null ) {
      if(registro === '¡Registrado exitosamente!') {
        this.router.navigate(['home']);
      }
    }
  }
}
