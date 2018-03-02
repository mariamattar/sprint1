import { Component, OnInit } from '@angular/core';
// Import the DataService
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { StoreService } from './store.service';
@Component({
  selector: 'app-store',
  template: `
     <ng2-smart-table [settings]="settings" [source]="products" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
      (createConfirm)="onCreateConfirm($event)" (custom)="onCustom($event)"></ng2-smart-table>

   `,
  styleUrls: ['./store.component.scss']

})
export class StoreComponent implements OnInit {
// Define a users property to hold our user data
products: Array<any>;
// Create an instance of the StoreService through dependency injection
  constructor(private _storeService: StoreService, public h:Http) { 
  this._storeService.getProducts().subscribe(res => this.products = res);
  
  }
ngOnInit(){

}



  settings = {
  	delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    // actions: {
    //   custom: [
    //     {
    //       name: 'view',
    //       title: 'View ',
    //     },
    //     {
    //       name: 'edit',
    //       title: 'Edit ',
    //     },
    //     {
    //       name: 'delete',
    //       title: 'Delete ',
    //     },
    //     {
    //       name: 'duplicate',
    //       title: 'Duplicate ',
    //     },
    //   ],
    // },
    columns: {

      name: {
        title: 'Full Name',
      },
      price: {
        title: 'Price',
      },
      createdAt:{
      	title: 'Created At:'
      },
      updatedAt:{
      	title: 'Updated At:'
      },
      sellerName:{
      	title: 'Seller'
      }
    }
  };
onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
this.h.delete("http://localhost:3000/api/product/deleteProduct/"+event.data._id)
		.subscribe(res => this.products = res);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
    	var id = event.newData._id;
      var object ={
      	name: event.newData.name,
      	price: parseInt(event.newData.price)
      }
      this.h.patch('http://localhost:3000/api/product/updateProduct/'+id,object)
      .subscribe();
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      
      var object ={
      	name: event.newData.name,
      	price: parseInt(event.newData.price)
      }
      this.h.post('http://localhost:3000/api/product/createProduct',object)
      .subscribe();
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  // data = [
  //   {
  //     id: 1,
  //     name: 'Leanne Graham',
  //     username: 'Bret',
  //     email: 'Sincere@april.biz',
  //   },
  //   {
  //     id: 2,
  //     name: 'Ervin Howell',
  //     username: 'Antonette',
  //     email: 'Shanna@melissa.tv',
  //   },
  //   {
  //     id: 3,
  //     name: 'Clementine Bauch',
  //     username: 'Samantha',
  //     email: 'Nathan@yesenia.net',
  //   },
  //   {
  //     id: 4,
  //     name: 'Patricia Lebsack',
  //     username: 'Karianne',
  //     email: 'Julianne.OConner@kory.org',
  //   },
  //   {
  //     id: 5,
  //     name: 'Chelsey Dietrich',
  //     username: 'Kamren',
  //     email: 'Lucio_Hettinger@annie.ca',
  //   },
  // ];

  // onCustom(event) {
  //   alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  // }
}

}