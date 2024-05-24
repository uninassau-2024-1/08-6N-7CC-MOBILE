import { IMetrics } from '../interfaces/IMetrics';
import { PasswordService } from './../services/password.service';
import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  metrics: IMetrics = {
    formattedGenericResults: {
      SE: 0,
      SG: 0,
      SP: 0
    },
    formattedAttendanceResults: {
      SE: 0,
      SG: 0,
      SP: 0
    },
    totalAttendance: 0,
    totalGenerated: 0
  }

  constructor(
    private passwordService: PasswordService,
    private ionRouterOutlet: IonRouterOutlet
  ) {}


  ionViewDidEnter() {
    this.passwordService.metricsOfAttendance().subscribe((metrics) => {
      if (metrics.totalGenerated > 0) {
        this.metrics = metrics;
      }
    });
  }
}
