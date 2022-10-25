import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppService } from '../app.service';
import QRCode from "qrcode"
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sbirka',
  templateUrl: './sbirka.component.html',
  styleUrls: ['./sbirka.component.scss']
})
export class SbirkaComponent implements OnInit {
  id: number
  data: any
  prispevekForm
  statutarniOrgany?: any[]

  constructor(private route: ActivatedRoute, public _AppService: AppService, private router: Router, private fb: FormBuilder) { 
    this.id = this.route.snapshot.params['id']
    this.prispevekForm = fb.group({
      castka: [100, Validators.required]
    })
  }

  async ngOnInit() {
    this.data = await this._AppService.makeAPIRequest("/sbirka/" + this.id) 
    if(!this.data) {
      this.router.navigate([""])
      return
    }
    console.log(this.data);

    var detaily = await this._AppService.makeAPIRequest<any[]>("/detaily/" + this.data.properties.ico)
    if(detaily) {
      console.log(detaily);
      
      this.statutarniOrgany = detaily
    }
    
  }

  get bankDetails() {
    var bankAccount = this.data.properties.cislo_bankovniho_uctu
    var prefix = (bankAccount.includes("-")) ? bankAccount.split("-")[0] : undefined
    var cislo: any
    var cisloBanky: any
    if(bankAccount.includes("-")) {
      cislo = bankAccount.split("-")[1].split("/")[0]
      cisloBanky =  bankAccount.split("-")[1].split("/")[1]
    } else {
      cislo = bankAccount.split("/")[0]
      cisloBanky =  bankAccount.split("/")[1]
    }
    return {
      prefix,
      cislo,
      cisloBanky
    }

    // https://api.paylibo.com/paylibo/generator/czech/image?compress=false&size=440&accountPrefix=123&accountNumber=184567&bankCode=0100&amount=100&currency=CZK
  }

  get QRCodeURL(): string {
    if(this.bankDetails.prefix) {
      return `https://api.paylibo.com/paylibo/generator/czech/image?compress=false&size=440&accountPrefix=${this.bankDetails.prefix}&accountNumber=${this.bankDetails.cislo}&bankCode=${this.bankDetails.cisloBanky}&amount=${this.prispevekForm.value.castka}&currency=CZK`
    }else{
      return `https://api.paylibo.com/paylibo/generator/czech/image?compress=false&size=440&accountNumber=${this.bankDetails.cislo}&bankCode=${this.bankDetails.cisloBanky}&amount=${this.prispevekForm.value.castka}&currency=CZK`
    }
  }

  uppercase(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
