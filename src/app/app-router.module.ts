import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        data: { preload: false},
        canActivate: [AuthGuard],
        loadChildren: "app/products/product.module#ProductModule"
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { enableTracing: true, preloadingStrategy: SelectiveStrategy })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SelectiveStrategy
    ]
})
export class AppRoutingModule { }