import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zadost',
  templateUrl: './zadost.component.html',
  styleUrls: ['./zadost.component.scss']
})
export class ZadostComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      email: ["", [Validators.email, Validators.required]],
      nazev: ["", Validators.required],
      ucel: ["", Validators.required],
      spolecnost: ["", Validators.required],
      ICO: ["", Validators.required],
      web: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
