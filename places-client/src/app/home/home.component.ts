import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { PlaceService } from '../services/place.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Place } from '../models/place'
import { FavouritComponent } from '../favourit/favourit.component';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public place: Place = new Place();
  public gridOptions: GridOptions;
  public addPlaceForm: FormGroup;
  public errorMessage: string = '';


  constructor(private placeService: PlaceService) {
    this.setGridOptions();
  }

  ngOnInit() {
    this.addPlaceForm = new FormGroup({
      'name': new FormControl(this.place.name, Validators.required),
      'type': new FormControl(this.place.type, [Validators.required]),
      'telephoneNo': new FormControl(this.place.telephoneNo, Validators.required),
      'address': new FormControl(this.place.address, Validators.required)
    });
  }

  setGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "Sr.",
        valueGetter: 'node.id',
      },
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Type",
        field: "type",
      },
      {
        headerName: "Address",
        field: "address",
      },
      {
        headerName: "Telephone Number",
        field: "telephoneNo",
      },
      {
        headerName: "Favourite",
        field: "isFavourite",
        cellRenderer: "FavouritComponent",
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
    window.addEventListener("resize", this.onWindowResize.bind(this));

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
    })
  }

  addPlace() {
    if (this.addPlaceForm.valid) {

      this.errorMessage = '';
      this.placeService.addPlace(this.addPlaceForm.value).subscribe((place) => {

        this.addPlaceForm.reset();
        this.gridOptions.api.updateRowData({ add: [place] })

      }, (err: any) => {

        this.errorMessage = err.error.message;
      });
    }
    else {
      for (var control in this.addPlaceForm.controls) {
        this.addPlaceForm.get(control).markAsDirty();
      }
    }
  }

  isFieldNotValid(formControl: AbstractControl) {
    return (formControl.dirty || formControl.touched) && formControl.invalid;
  }

  markOrUnMarkPlaceAsFavourite(index, isFavourite) {
    let rowNode = this.gridOptions.api.getRowNode(index);
    let place: Place = rowNode.data;
    place.isFavourite = isFavourite;
    rowNode.setData(place);

    this.placeService.setIsFavourite({ placeId: place._id, isFavourite: isFavourite }).subscribe((place) => {
    }, (err: any) => {
    });
  }

  search(searchText) {
    this.placeService.searchPlaces({searchText: searchText}).subscribe((places) => {
      this.gridOptions.api.setRowData(places);
    })
  }
}
