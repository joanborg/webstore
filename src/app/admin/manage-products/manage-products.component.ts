import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy {

  products: any[];          // TODO: fix issues with products model
  filteredProducts: any[];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'key'];


  // TODO: add paginator and sort header

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(res => this.filteredProducts = this.products = res);
  }


// if query value is provided, filters products with matching letters, else lists all products.

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
