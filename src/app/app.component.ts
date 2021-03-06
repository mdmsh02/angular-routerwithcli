import { MessageService } from './messages/message.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(private authService: AuthService,
                private router:Router,
                private messageService: MessageService) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
     }
     checkRouterEvent(routerEvent: Event): void {
         if(routerEvent instanceof NavigationStart){
             this.loading = true;
         }
         if(routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationError){
             this.loading = false;
         }
     }

    logOut(): void {
        this.authService.logout();
        console.log('Log out');
        this.router.navigateByUrl('/welcome');
    }
    displayMessages(): void {
        this.router.navigate([{outlets: {popup:['messages']}}]);
        this.messageService.isDisplayed = true;
    }
    hideMessages(): void {
        this.router.navigate([{outlets: {popup:null}}]);
        this.messageService.isDisplayed = false;
    }
    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
    isDisplayed(): boolean {
        return this.messageService.isDisplayed;
    }
}
