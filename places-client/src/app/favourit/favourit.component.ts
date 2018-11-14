import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-favourit',
  templateUrl: './favourit.component.html',
  styleUrls: ['./favourit.component.css']
})
export class FavouritComponent implements OnInit, ICellRendererAngularComp {

  public params: any;
  constructor() { }

  ngOnInit() {
  }

  agInit(params: any): void {
      this.params = params;
  }

  refresh(): boolean {
    return true;
  }

  public markOrUnMarkPlaceAsFavourite(isFavourite) {
    let parentComponent = this.params.context.homeComponent;
    parentComponent.markOrUnMarkPlaceAsFavourite(this.params.node.rowIndex , isFavourite)
  }

}
