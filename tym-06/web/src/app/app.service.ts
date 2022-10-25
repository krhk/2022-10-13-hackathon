import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}
  
  async makeRequest<o>(
    url: string,
    method: string = 'GET',
    body?: any
  ): Promise<o | undefined> {
    var response = await firstValueFrom<any>(
      this.http.request(
        method,
        `${url}${method == 'GET' ? `?${new URLSearchParams(body).toString()}` : ''}`,
        {
          body: body,
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        }
      )
    ).catch((error) => {
      this._snackBar.open('Error: ' + error.statusText, undefined, {
        duration: 5000,
      });
    });
    if (response?.error) {
      this._snackBar.open(response.error, undefined, {
        duration: 5000,
      });
      return;
    }
    return response;
  }

  async makeAPIRequest<o>(
    url: string,
    method: string = 'GET',
    body?: any
  ): Promise<o | undefined> {
    var response = await firstValueFrom<any>(
      this.http.request(
        method,
        `/api${url}${method == 'GET' ? `?${new URLSearchParams(body).toString()}` : ''}`,
        {
          body: body,
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        }
      )
    ).catch((error) => {
      this._snackBar.open('Error: ' + error.statusText, undefined, {
        duration: 5000,
      });
    });
    if (response?.error) {
      this._snackBar.open(response.error, undefined, {
        duration: 5000,
      });
      return;
    }
    return response;
  }

  formatDate(dateString: string) {
    let date = new Date(dateString);
    return (
      ('0' + date.getDate()).slice(-2) +
      '.' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '.' +
      date.getFullYear()
    );
  }
}
