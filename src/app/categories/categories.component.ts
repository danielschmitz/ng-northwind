import { Component } from '@angular/core';
import { CategoryListComponent } from './list/list.component';
import { CoreModule } from '../core.module';

@Component({
  selector: 'app-categories',
  imports: [CoreModule, CategoryListComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
