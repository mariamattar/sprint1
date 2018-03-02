import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class StoreService {
result:any;
  constructor(private _http: Http) { }
getProducts(){
	return this._http.get("http://localhost:3000/api/product/getProducts")
		.map(result=>this.result=result.json().data);
}

deleteConfirm(){
	return this._http.delete("http://localhost:3000/api/product/deleteProduct/:productId")
		.map(result=>this.result=result.json().data);

}
creatConfirm(){
	return this._http.post("http://localhost:3000/api//product/createProduct")
		.map(result=>this.result=result.json().data);

}
editConfirm(){
	return this._http.patch("http://localhost:3000/api/product/updateProduct/:productId")
		.map(result=>this.result=result.json().data);

}
}
