import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class ImageService {

   private image : string

   constructor(
     private camera : Camera) {}

   cameraImage() : Promise<any>
   {
      return new Promise(resolve =>
      {
         let cameraOptions : CameraOptions = {
            sourceType         : this.camera.PictureSourceType.CAMERA,
            destinationType    : this.camera.DestinationType.DATA_URL,
            quality            : 50,
            targetHeight       : 500,
            targetWidth        : 500,
            encodingType       : this.camera.EncodingType.JPEG,
            correctOrientation : true,
            allowEdit          : true,
            mediaType          : this.camera.MediaType.ALLMEDIA
         };
         this.camera.getPicture(cameraOptions)
         .then((data) =>
         {
          this.image 	= "data:image/jpeg;base64," + data;
          resolve(this.image);
         });
      });
   }

   galleryImage() {
     return new Promise(resolve =>
      {
        let cameraOptions : CameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          quality: 100,
          targetWidth: 400,
          targetHeight: 400,
          encodingType: this.camera.EncodingType.JPEG,
          correctOrientation: true
        };
        this.camera.getPicture(cameraOptions)
        .then((data) => 
        {
          this.image 	= "data:image/jpeg;base64," + data;
          resolve(this.image);
        });
      });
   }

}