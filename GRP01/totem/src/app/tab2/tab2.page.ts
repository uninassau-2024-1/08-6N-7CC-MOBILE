import { Component, OnInit } from '@angular/core';
import { IPassword, IPasswordResponse } from '../interfaces/IPassword';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  allPasswords: IPasswordResponse[] = []
  lastAttendanceIsTrue: IPasswordResponse = {
    id: '',
    password: '',
    priority: '',
    isAttendance: 0,
    createdAt: ''
  }

  constructor(
    private passwordService: PasswordService,
  ) { }

  ngOnInit(): void {
    this.passwordService.listAllTPasswordsIsAttendanceTrue().subscribe((password) => {

      this.allPasswords = password;
    })

    this.passwordService.findLastAttendanceIsTrue().subscribe((password) => {

      this.lastAttendanceIsTrue = password;
    })
  }

  callPassword() {
    this.passwordService.callAttendance().subscribe((password) => {
      console.log(`senha chamada com foi ${password}`)
      this.ngOnInit()
    })
  }
}
