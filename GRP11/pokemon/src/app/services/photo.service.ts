import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      quality: 100
    });
  }
}
