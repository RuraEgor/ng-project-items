import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from '../../../services/items.service';
import { IItem } from '../../models/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  id!: number;
  item$!: Observable<IItem>;
  
  constructor(
    private _activateRoute: ActivatedRoute,
    private _itemsService: ItemsService
  ){
    this.id = _activateRoute.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.item$ = this._itemsService.getItem(this.id);
  }
}
