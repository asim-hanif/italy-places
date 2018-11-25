import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { FavouritComponent } from '../favourit/favourit.component';
import { PlaceService } from '../place.service';
import { Place } from 'src/app/models/place';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public gridOptions: GridOptions;

  constructor(private placeService: PlaceService, ) {
    this.setGridOptions();
  }

  ngOnInit() {

  }

  setGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: 'Sr.',
        valueGetter: 'node.id',
      },
      {
        headerName: 'Name',
        field: 'name',
      },
      {
        headerName: 'Type',
        field: 'type',
      },
      {
        headerName: 'Address',
        field: 'address',
      },
      {
        headerName: 'Telephone Number',
        field: 'telephoneNo',
      },
      {
        headerName: 'Favourite',
        field: 'isFavourite',
        cellRenderer: 'FavouritComponent',
      },


    ];
    this.gridOptions.context = { homeComponent: this };
    this.gridOptions.frameworkComponents = {
      FavouritComponent: FavouritComponent,
    };
    this.gridOptions.onGridReady = this.onGridReady.bind(this);
  }

  onGridReady() {
    this.gridOptions.api.sizeColumnsToFit();
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.getAllPlaces();
  }

  onWindowResize() {
    setTimeout(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });
  }

  getAllPlaces() {
    this.placeService.getAllPlaces().subscribe((places) => {
      this.gridOptions.api.setRowData(places);
    });
  }  

  markOrUnMarkPlaceAsFavourite(index, isFavourite) {
    const rowNode = this.gridOptions.api.getRowNode(index);
    const place: Place = rowNode.data;
    place.isFavourite = isFavourite;
    rowNode.setData(place);

    this.placeService.setIsFavourite({ placeId: place._id, isFavourite: isFavourite }).subscribe(() => {
    }, (err: any) => {
    });
  }

  search(searchInput) {
    if (!searchInput.value) { return; }

    this.placeService.searchPlaces({ searchText: searchInput.value }).subscribe((places) => {
      this.gridOptions.api.setRowData(places);
    });
  }

  showAllPlaces() {
    const favouritePlacesFilter = this.gridOptions.api.getFilterInstance('isFavourite');
    favouritePlacesFilter.setModel(null);
    this.gridOptions.api.onFilterChanged();
  }

  showFavouritePlaces() {
    const favouritePlacesFilter = this.gridOptions.api.getFilterInstance('isFavourite');
    favouritePlacesFilter.setModel({
      type: 'equals',
      filter: true,
    });
    this.gridOptions.api.onFilterChanged();
  }
  clearSearch(searchInput) {
    if (!searchInput.value) {
      this.getAllPlaces();
    }
  }  

  onPlaceAddition(place) {
    this.gridOptions.api.updateRowData({ add: [place] })
  }
  
}
