import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Product Id was not number:${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found for Id :${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Error in retrieving Product for Id :${id}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}