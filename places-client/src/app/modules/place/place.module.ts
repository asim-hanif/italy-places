import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FavouritComponent } from './favourit/favourit.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { PlaceService } from './place.service';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([FavouritComponent]),
    MapModule,
  ],
  declarations: [HomeComponent, FavouritComponent, AddPlaceComponent],
  exports: [HomeComponent, FavouritComponent, AddPlaceComponent],
  providers: [PlaceService],
})
export class PlaceModule { }
