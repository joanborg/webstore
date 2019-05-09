import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from './services/auth-guard.service';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';



const routes: Routes = [
  { path : "", component: DashboardComponent },
  { path : "login", component: LoginComponent },  
  { path : "shoppingcart", component: ShoppingCartComponent },
  { path : "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  { path : "myorders", component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path : "admin/manageproducts", component: ManageProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path : "admin/manageorders", component: ManageOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path : "admin/products/new", component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path : "admin/products/:id", component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path : "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
