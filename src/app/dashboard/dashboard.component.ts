import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[];
  categories$;
  category: string;

  breakpoint = 1;
  opened: boolean;

  constructor(productService: ProductService, categoryService: CategoryService, route: ActivatedRoute) {

    productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;  //  queryParamMap returns an observable with a paramMap object
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });

    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 2;
    if (window.innerWidth >= 1200) this.breakpoint = 3;
  }


  // shows additional columns when view width is higher
  // TODO: more elegant solution?
  onResize(event) {
    if (event.target.innerWidth <= 450) this.breakpoint = 1;
    else if (event.target.innerWidth < 1200) this.breakpoint = 2;
    else if (event.target.innerWidth >= 1200) this.breakpoint = 3;
  }

}
