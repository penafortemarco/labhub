import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = inject(AuthService).getRole();

  if (role === 'admin') return true;

  inject(Router).navigate(['/inventory']);
  return false;
};
