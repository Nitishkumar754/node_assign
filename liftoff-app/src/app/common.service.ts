import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment}  from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  serverUrl = environment.serverUrl
  
  

  commonService(body, method, endurl){
    console.log("body >>>>>>>>>>>>>> ", body)
   
    if(method=='get' || method=='GET'){
    	return this.http.get(this.serverUrl+"api/"+endurl);
    }
    else{
    	return this.http.post(this.serverUrl+"api/"+endurl, body);
    }

    
      
  }
  
}
