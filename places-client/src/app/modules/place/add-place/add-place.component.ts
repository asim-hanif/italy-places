import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Place } from 'src/app/models/place';
import { PlaceService } from '../place.service';
import { SearchMapPlaceDetails } from '../../map/search-map.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  public addPlaceForm: FormGroup;

  public errorMessage: string;

  public place: Place;
  
  public latitude: number = 30.375321;
  
  public longitude: number = 69.345116;

  @Output()
  placeAdded: EventEmitter<Place>;

  constructor(private placeService: PlaceService) {
    this.place = new Place();
    this.placeAdded = new EventEmitter<Place>()
  }

  ngOnInit() {
    this.addPlaceForm = new FormGroup({
      'name': new FormControl(this.place.name, Validators.required),
      'type': new FormControl(this.place.type, [Validators.required]),
      'telephoneNo': new FormControl(this.place.telephoneNo, Validators.required),
      'address': new FormControl(this.place.address, Validators.required)
    });
  }

  addPlace() {
    if (this.addPlaceForm.valid) {

      this.errorMessage = '';
      this.placeService.addPlace(this.addPlaceForm.value).subscribe((place) => {

        this.addPlaceForm.reset();
        this.placeAdded.emit(place);

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

  onPlaceSelected(place: SearchMapPlaceDetails) {
    this.latitude = place.latitude;
    this.longitude = place.logitude;
    this.addPlaceForm.setValue(place.place);
  }

  isFieldNotValid(formControl: AbstractControl) {
    return (formControl.dirty || formControl.touched) && formControl.invalid;
  }

}
