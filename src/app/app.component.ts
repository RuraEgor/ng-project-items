import { Component } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-rura-egor-test';
  
  constructor(private _ItemsService: ItemsService){
    this._ItemsService.clearStore();
  }
}
