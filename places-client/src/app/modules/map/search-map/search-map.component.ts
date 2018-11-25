import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchMapPlace, SearchMapPlaceDetails, SearchMapService } from '../search-map.service';
import { debounce } from 'src/app/services/utils.service';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})
export class SearchMapComponent implements OnInit {

  searchText: string;

  searchResults: SearchMapPlace[];

  showSearchResults: boolean;

  showLoaderGif: boolean;

  region: string;

  @Output()
  placeSelected: EventEmitter<SearchMapPlaceDetails>;

  constructor(private searchMapService: SearchMapService) {
    this.searchText = '';
    this.region = 'lt';
    this.placeSelected = new EventEmitter<SearchMapPlaceDetails>();
    this.searchResults = [];
    this.showSearchResults = false;
    this.showLoaderGif = false;
  }

  ngOnInit() {
  }

  search(searchText: string) {    
    this.showLoaderGif = true;
    this.searchMapService.search(searchText).subscribe((searchResults) => {
      this.searchResults = searchResults;
      this.showSearchResults = true;
      this.showLoaderGif = false;
    })
  }

  searchDebounced = debounce(this.search.bind(this), 500);

  getPlaceDetails(placeId) {  
    this.showLoaderGif = true;
    this.showSearchResults = false;
    this.searchMapService.getPlaceDetail(placeId).subscribe((place) => {
      this.placeSelected.emit(place)
      this.showLoaderGif = false;
    })
  }
}
