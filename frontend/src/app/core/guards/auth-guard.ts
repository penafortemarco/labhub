import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;
};
