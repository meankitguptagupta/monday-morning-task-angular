import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup
  fields: FormArray;

  constructor(private _fb: FormBuilder, private _sevice:AddressService) { }

  ngOnInit() {
    this.addressForm = new FormGroup({
      addresses: this._fb.array([]),
    })

    this.fields = this.addressForm.get('addresses') as FormArray;
  }

  createItem() {
    return this._fb.group({
      address: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      street: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      country: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    });
  }

  addremoveFields(index: number = null): void {
    if (!index)
      return this.fields.push(this.createItem());

    this.fields.removeAt(index-1);
  }

  onSubmit():void {
    this._sevice.post(this.addressForm.value).subscribe(res => {
      alert('success')
    }, err => {
      console.log(err)
      alert(err.error.message)
    })
  }

}
