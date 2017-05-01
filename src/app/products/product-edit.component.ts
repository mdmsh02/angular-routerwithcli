import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: '../products/product-edit.component.html',
    styleUrls: ['../products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    private currentProduct: IProduct;
    private originalProduct: IProduct;

    get product(): IProduct{
        return this.currentProduct;
    }
    set product(value: IProduct) {
        this.currentProduct = value;
        this.originalProduct = Object.assign({},value);
    }
    get isDirty(): boolean {
        return JSON.stringify(this.currentProduct) !== JSON.stringify(this.originalProduct);
    }

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private routerService: Router) { }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (true === true) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.routerService.navigate(['/products']);
    }
    reset(): void {
        this.currentProduct = null;
        this.originalProduct = null;
    }
    ngOnInit(): void {
        this.route.data.subscribe( data => {
            this.onProductRetrieved(data['product']);
        });
    }
}
