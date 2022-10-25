import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import {GeolocationService} from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  searchFilteredData: any[] = []
 data: any[] = []
  obtainedData: any[] = [] 
  sort = new FormControl("zahajeni")
  search = new FormControl("")
  ukrajina: boolean = false

  constructor(public _AppService: AppService, private httpClient: HttpClient, private readonly geolocation$: GeolocationService) { }

  async ngOnInit() {
    this.obtainedData = (await this._AppService.makeAPIRequest<any>("/sbirky")) || []
    
    this.sortTable()
    
    console.log(this.data);
    
    this.sort.valueChanges.subscribe(change => {
      this.sortTable()
    })

    this.search.valueChanges.subscribe(change => {
      this.useSearch()
    })

    this.getPosition()
  }

  async sortTable() {
    switch(this.sort.value){
      case "zahajeni":
        this.data = this.obtainedData.filter(s => !!s.properties.zahajeni).sort((a, b) => (new Date(b.properties.zahajeni).getTime() ?? 0) - (new Date(a.properties.zahajeni).getTime() ?? 0))
        break
      case "obec":
        this.data = this.obtainedData.sort((a, b) => a.properties.nazev_obce.localeCompare(b.properties.nazev_obce))
        break
      case "nazev":
        this.data = this.obtainedData.sort((a, b) => a.properties.nazev.localeCompare(b.properties.nazev))
        break
      case "geolokace":
        var position = await this.getPosition()
        this.data = (await this._AppService.makeAPIRequest<any>("/sbirky", "GET", {x: position?.coords?.latitude, y: position?.coords.longitude})) || []
        console.log(this.data);
        
        console.log(position);
        
        
        
        break
    }
    
    if(this.ukrajina) {
      this.data = this.data.filter(f => f.properties.ucel.toLowerCase().includes("ukraj"))
    }

    this.useSearch()
   
  }

  async useSearch() {
    if(!this.search.value) {
      this.searchFilteredData = this.data
      return
    }
    this.searchFilteredData = this.data.filter(item => {
      return item.properties.ucel.toLowerCase().includes(this.search.value)
    })
    return
  }

  switchUkrajina(value: boolean) {
    this.ukrajina = value
    this.sortTable()
  }

  async getPosition() {
    return new Promise<any>((resolve, reject) => {
      try{
        this.geolocation$.subscribe(resolve)
      } catch{
        resolve(undefined)
      }
      
    })
    
  }

  formatDistance(distance: any) {
    return Math.floor(distance) / 1000
  }
}
