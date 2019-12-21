import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
///import {snapshotToArray} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userInput: string = '';
  passInput: string = '';
  nameInput: string = '';

  constructor(private router: Router) { }

  registrar(){
    var ref = firebase.database().ref('login/');
    if(this.userInput != null && this.passInput != null && this.nameInput != null){
      ref.push({contrasena:this.passInput,cuenta:this.userInput,nombre:this.nameInput});
      this.userInput = '';
      this.passInput = '';
      this.nameInput = '';
    }
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
