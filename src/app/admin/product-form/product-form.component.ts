import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
    
  categories$;
  product = {};
  id;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id'); // takes product id from activated route
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(res => this.product = res); // fetches a product matching the id from database
   }
 

   // updates existing product if id exists in database,
   // else creates a new entry
   save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/manageproducts']);
   }

   delete() {
     if (!confirm("Are you sure you want to delete this product?")) return; 
     
       this.productService.delete(this.id);
       this.router.navigate(['/admin/manageproducts']);
     
   }
}
