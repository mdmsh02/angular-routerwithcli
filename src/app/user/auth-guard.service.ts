import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    

    constructor(private authService: AuthService,
        private router: Router) { }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path)
    }    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        if (!this.authService.isLoggedIn()) {
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}