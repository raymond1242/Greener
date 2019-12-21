import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userInput: string = '';
  passInput: string = '';

  constructor(public alertController: AlertController, private router: Router) { }

  Validar(){
    var ref = firebase.app().database().ref('login');
    if(ref){
      console.log('OK');
    }
    else{
      console.log('PROBLEM');
    }
    var cons = this.passInput;
    var cue = this.userInput;
    var obj = this;
    var al = this.alertController;
    ref.once("value").then(function(snapshot){
      var x = 0;
      snapshot.forEach(function(data){
        if(data.val().contrasena == cons && data.val().cuenta == cue){
          x=1;
          var miStorage = window.localStorage;
          obj.router.navigate(['/home']);
          miStorage.setItem('cuenta', data.val().nombre);
        }
      });
      if(x==0){
        const alert = al.create({
          header : 'Error',
          message: 'Usuario o Contraseña incorrectos',
          buttons: [
            {
              text: 'Volver a Intentar',
              cssClass: 'alertButton',
            }
            ]}).then(alert=> alert.present());
      }
        
    });
  }

  Registrar(){
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
