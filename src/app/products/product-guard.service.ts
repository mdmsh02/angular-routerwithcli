import { Injectable } from '@angular/core';
import { ProductEditComponent } from './product-edit.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    
    constructor() { }

    canDeactivate(component: ProductEditComponent): boolean {
        if(component.isDirty){
            let name = component.product.productName || 'New Product';
            return confirm(`Navigate away and loose all changes to ${name}?`);
        }
        return true;
    }
}