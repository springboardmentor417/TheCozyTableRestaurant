import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    // If user is logged in, allow access
    return true;
  } else {
    // If user is not logged in, alert and redirect to login
    alert('You need to log in to access this page.');
    router.navigate(['/login']);
    return false;
  }
};
