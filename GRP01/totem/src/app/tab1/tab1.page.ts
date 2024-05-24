import { PasswordService } from './../services/password.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IPassword } from '../interfaces/IPassword';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  password: IPassword = {
    priority: ''
  }

  constructor(
    private passwordService: PasswordService,
    private alertController: AlertController
  ) { }

  createPassword(password: string) {
    this.password.priority = password;

    this.passwordService.createTicket(this.password).subscribe(
      (response) => {
        console.log('Password created successfully', response);
        this.ticketCreateSucess(response.password)
        this.password = {
          priority: ''
        }
      },
      (error) => {
        console.error('Error creating Password', error);
      }
    );
  }

  async ticketCreateSucess(password: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: `Sua senha é ${password}`,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
