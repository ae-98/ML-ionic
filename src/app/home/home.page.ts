import { Component } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  photos:any = [];
  constructor(public camera : Camera ,public file : File) {}
  upload(){
    var options:CameraOptions={
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData)=>{
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0,imageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(path,filename).then((base64data)=>{
        this.photos.push(base64data);
      })
    })
  }
}