import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchMapService } from '../services/search-map.service';
import { Place } from '../models/place';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})
export class SearchMapComponent implements OnInit {

  searchText: string;

  region: string;

  @Output()
  placeSelected: EventEmitter<Place>;

  constructor(searchMapService: SearchMapService) {
    this.searchText = '';
    this.region = 'lt';
    this.placeSelected = new EventEmitter<Place>();
  }

  ngOnInit() {
  }

  search() {
    this.placeSelected.emit();
  }
}
