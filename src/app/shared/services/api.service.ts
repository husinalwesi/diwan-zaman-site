import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as qs from "qs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getBaseURL() {
    return "http://diwan-zaman.com/api/api.php?type=api&action=";
  }

  getHomeData(): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}getHomeData`, {
      params: {}
    });
  }

  getSiteContent(): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}getSiteContent`, {
      params: {}
    });
  }

  getProductByID(id): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}getProductByID`, {
      params: { id: id }
    });
  }

  getSharedData(): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}getSharedData`);
  }

  getOrderDetail(id): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}getOrderDetails`, {
      params: { id: id }
    });
  }

  updateOrder(data): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}editOrderCode`, {
      params: data
    });
  }

  checkOrderCode(data): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}checkOrderCode`, {
      params: data
    });
  }

  confirmPhone(data): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}confirmPhone`, {
      params: data
    });
  }

  createOrder(data): Observable<any> {
    return this.httpClient.post<any>(`${this.getBaseURL()}createOrder`, JSON.stringify(data));
  }
  getUserData(body): Observable<any> {
    return this.httpClient.get<any>(`${this.getBaseURL()}/user/${body.id}?_format=json`);
  }


  sendMessage(body): Observable<any> {
    return this.httpClient.post<any>(`https://api.twilio.com/2010-04-01/Accounts/AC3caef4f4beaf4a961b5a475fa2a86063/Messages.json`, qs.stringify(body), {
      headers: new HttpHeaders().set('Authorization', 'Basic QUMzY2FlZjRmNGJlYWY0YTk2MWI1YTQ3NWZhMmE4NjA2Mzo0ODQ2ZTkzZDAxMTdhYWM1YjBiNTU5YjhmMGExOGZlZQ==').set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

}
