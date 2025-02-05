import { Component, inject } from '@angular/core';
import { CoreModule } from '../../core.module';
import { FormCategoryComponent } from '../form/form-category.component';
import { Category } from '../Category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  imports: [CoreModule, FormCategoryComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  loading = false;
  categoryService = inject(CategoryService);
  router = inject(Router);
  snak = inject(MatSnackBar);

  onSave($event: Category) {
    this.loading = true;
    console.log('category?', $event);
    this.categoryService.createCategory($event).subscribe({
      next: (result) => {
        console.log('category created', result);
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.snak.open(error.message);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
