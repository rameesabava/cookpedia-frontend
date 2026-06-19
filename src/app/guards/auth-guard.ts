import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const user = JSON.parse(sessionStorage.getItem("user") || "")
  if(user.role=="user"){
    return true
  }else{
alert("Unauthorised access!!!")
router.navigateByUrl('/login')
return false
  }
};
