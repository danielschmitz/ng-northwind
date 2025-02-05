import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CoreModule } from '../../core.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../Category';

@Component({
  selector: 'app-form-category',
  imports: [CoreModule],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.css'
})
export class FormCategoryComponent implements OnInit {

  @Input() category: Category | undefined
  @Output() onSave = new EventEmitter<Category>();
  fb = inject(FormBuilder);
  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });  
  }

  ngOnInit(): void {
    if (this.category) {
      this.formGroup.patchValue(this.category);
    }
  }

  onSubmit() {
    this.onSave.emit(this.formGroup.value as Category);
  }
    
  
}
