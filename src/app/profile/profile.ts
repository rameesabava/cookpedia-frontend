import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { AsyncPipe } from '@angular/common';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [Header, Footer, AsyncPipe, AdminModuleRoutingModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  imgURL:any = signal("https://static.vecteezy.com/system/resources/thumbnails/033/051/579/small_2x/user-interface-icon-png.png")

  api=inject(ApiService)
  downloadList$ = this.api.getUserDownloadListAPI()
  username:string = ""
  userId:string = ""

  ngOnInit(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.username = user.username
      this.userId = user._id
      user.picture && this.imgURL.set(`${this.api.server_url}/uploads/${user.picture}`)
    }
  }

  uploadPicture(event:Event){
    const input = event.target as HTMLInputElement
    if(input.files && input.files.length>0){
      const uploadFile = input.files[0]
      const reqBody = new FormData()
      reqBody.append("picture",uploadFile)
      this.api.updateUserProfileAPI(this.userId,reqBody).subscribe((res:any)=>{
        alert("User Profile Updated Successfully")
        sessionStorage.setItem("user",JSON.stringify(res))
        this.imgURL.set(`${this.api.server_url}/uploads/${res.picture}`)
      })
    }
  }
}
