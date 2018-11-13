import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import { PlaceService } from '../services/place.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Place} from '../models/place'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public place: Place = new Place();
  public gridOptions: GridOptions;
  public registerForm: FormGroup;
  public errorMessage: string = '';


  constructor(private placeService: PlaceService) {
    this.setGridOptions();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(this.credentials.name, [
        Validators.required,
      ]),
      'email': new FormControl(this.credentials.email, [Validators.email, Validators.required]),
      'password': new FormControl(this.credentials.password, Validators.required)
    });
  }

  setGridOptions(){
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
        {
            headerName: "ID",
            field: "id",
            width: 100
        },
        {
            headerName: "Value",
            field: "value",
            //cellRendererFramework: RedComponentComponent,            
            width: 100
        },

    ];
    this.gridOptions.rowData = this.rowData;
    this.gridOptions.onGridReady = this.getAllPlaces.bind(this)
  
  }

  get rowData() {
    return [
      {id: 5, value: 10},
      {id: 10, value: 15},
      {id: 15, value: 20}
    ]
  }
  set rowData(data) {
    this.rowData = data;
  }

  getAllPlaces(agGridParams) {
    this.placeService.getAllPlaces().subscribe((places) => {
        agGridParams.api.setRowData(places);
        //updates$.subscribe((updates) => agGridParams.api.updateRowData({update: updates}));
    })
  }

  register() {
    if(this.registerForm.valid) {
      this.errorMessage = '';
      this.placeService.register(this.registerForm.value).subscribe(() => {
        this.router.navigateByUrl('/home');
      }, (err: any) => {
        this.errorMessage = err.error.message;
      });
    }
    else{
      for(var control in this.registerForm.controls){
        this.registerForm.get(control).markAsDirty();
      }
    }
  }
}
