import { ApiService } from './../../services/api_service/api.service';
import { DataService } from './../../services/data_service/data.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.page.html',
  styleUrls: ['./actualizar-perfil.page.scss'],
})
export class ActualizarPerfilPage implements OnInit {

  ionicForm: FormGroup;
  esEnviadoFormulario = false;
  usuario: string;
  contrasena: string;
  confirmacion: string;
  email: string;
  id: number;
  regexCorreo = '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duocuc|profesor.duoc)\.cl$';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
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
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmacion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
    this.getUsuario();
  }

  ionViewDidEnter() {
  }

  async getUsuario() {
    this.usuario = await this.dataService.get('usuario');
    this.contrasena = await this.dataService.get('contrasena');
    this.email = await this.dataService.get('email');
    this.id = await this.dataService.get('id');
  }

  actualizarDatos(usuario: string, email: string, contrasena: string) {
    this.apiService.actualizarDatosUsuario(this.id, usuario, contrasena, email)
      .subscribe((respuesta) => {
        if (respuesta['actualizacion'] === 'exitosa') {
          this.resultadoCambio('¡Actualización exitosa!');
          this.dataService.clear();
          this.router.navigate(['home']);
        } else {
          this.resultadoCambio('¡Actualización Fallida!');
        }
      }, (error) => {
        console.log(error);
      });
  }

  async resultadoCambio(resultado: string) {
    const loading = await this.loadingController.create({
      cssClass: 'no-data-css',
      message: resultado,
      duration: 3000,
      spinner: null
    });
    await loading.present();
  }

  eliminarCuenta() {
    this.apiService.borrarCuenta(this.id).subscribe( (respuesta) => {
      if(respuesta['eliminacion'] === 'exitosa') {
        this.resultadoCambio('¡Cuenta Eliminada!');
        this.dataService.clear();
        this.router.navigate(['home']);
      } else {
        this.resultadoCambio('¡Hubo un error!');
      }
    }, (error) => {
      console.log(error);
    });
  }

  submitForm() {
    this.esEnviadoFormulario = true;
    if (this.ionicForm.valid) {
      this.contrasena = this.ionicForm.value.contrasena;
      this.confirmacion = this.ionicForm.value.confirmacion;
      console.log(this.contrasena);
      console.log(this.confirmacion);
      if(this.contrasena !== this.confirmacion) {
        return this.resultadoCambio('¡Confirmación Incorrecta!');
      } else {
        this.usuario = this.ionicForm.value.usuario;
        this.contrasena = this.ionicForm.value.contrasena;
        this.actualizarDatos(this.usuario, this.email, this.contrasena);
      }
      console.log('validos')
    } else {
      console.log('¡Datos inválidos o no ingresados!');
      return false;
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
