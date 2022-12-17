import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { IItem } from '../../models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  details: boolean = false;
  
  res: string = '';
  
  loading: boolean = true;
  titleFl: string = '';
  
  // items$: Observable<IItem[]>;
  items: IItem[] = [];
  
  constructor(private _ItemsService: ItemsService){}
  
  ngOnInit(): void {
    this.loading = true;
    this._ItemsService.getAll().subscribe(
      (el) => {
          this.items = el;
          this.loading = false;
      }
    );
  }
}
