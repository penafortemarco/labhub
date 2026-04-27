import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth";
import { inject } from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn()) {
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  return true;
};
