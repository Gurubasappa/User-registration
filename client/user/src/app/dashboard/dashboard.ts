import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
   users = [];
   user = "";

  constructor(private fb: FormBuilder,private http: HttpClient) {
    
   }

 
  ngOnInit() {
    this.http.post('http://localhost:8088/api/user/getAllUsers', {})
    .subscribe((response) => {
         if(response){
            this.users = response['result'];
         console.log('response received is ', this.users);

         }
         
    })
  }
  getUser(id){
    console.log("==========",id)
    this.http.get('http://localhost:8088/api/user/getindividualUser/'+id)
    .subscribe((response) => {
         if(response){
            this.user = response['result'];
         console.log('response received is ', response);

         }
         
    })
  }
  deleteUser(id){
    this.http.post('http://localhost:8088/api/user/deleteindividualUser', {id:id})
    .subscribe((response) => {
         if(response){
            this.users = response['result'];
         console.log('response received is ', this.users);

         }
    })
   
  }
  createuser(){
      
  }

  
}