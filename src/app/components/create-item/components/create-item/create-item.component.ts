import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ItemsService } from '../../../../../services/items.service';
import { IItem } from '../../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  
  constructor(
    private _ItemsService: ItemsService,
    private _router: Router
  ){
    if (!this._ItemsService.isStore()) this._router.navigate(['/']);
  }
  
  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    price: new FormControl<number>(0, [
      Validators.required,
      // Validators.pattern('^[^0]'),
      this.checkPrice()
    ]),
    image: new FormControl<string>('https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', [
      Validators.required,
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    category: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  })
  
  checkPrice(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    
    const value = control.value;
    
    if (!value || (value <= 0)) return {'checkPrice': true}
    
    return value;
  }
}
  
  get title(){
    return this.form.controls['title'] as FormControl
  }
  
  get price(){
    return this.form.controls['price'] as FormControl
  }
  
  get image(){
    return this.form.controls['image'] as FormControl
  }
  
  get description(){
    return this.form.controls['description'] as FormControl
  }
  
  get category(){
    return this.form.controls['category'] as FormControl
  }
  
  submit(){
    let formZn = this.form.value;
    const znId = Math.round(Math.random() * 10000)
    
    let item: IItem = {
      id: znId as number,
      title: formZn.title as string,
      price: formZn.price as number,
      image: formZn.image as string,
      description: formZn.description as string,
      category: formZn.category as string
    }
    
    this._ItemsService.setItem(item);
  }
}
