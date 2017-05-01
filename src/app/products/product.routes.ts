import { ProductEditGuard } from './product-guard.service';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductResolver } from './product-resolver.service';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';

export const ROUTES = [

    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent, resolve: { product: ProductResolver } },
    {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { product: ProductResolver },
        canDeactivate: [ProductEditGuard],
        children: [
            { path: 'info', component: ProductEditInfoComponent },
            { path: 'tags', component: ProductEditTagsComponent },
            { path: '', redirectTo: 'info', pathMatch: 'full' }
        ]
    }
]