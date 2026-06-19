import { Component } from '@angular/core';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";

@Component({
  selector: 'app-pnf',
  imports: [AdminModuleRoutingModule],
  templateUrl: './pnf.html',
  styleUrl: './pnf.css',
})
export class Pnf {
  role:string = "user"

  constructor(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.role = user.role
    }
  }
}
