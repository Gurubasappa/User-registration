import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-dashboard',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    imgLabelName: string;
    selectedFileName: any;
    fileSize: any;
    fileSelected: boolean;
    url = '';
    fileToUpload: File = null;
    invalidDocumentFile: boolean;
    // public customStampUploaderTemplate: FileUploader = new FileUploader({ url: "http://localhost:8088/api/user/uploadimage"});

    shortLink: string = ""; 
    loading: boolean = false; // Flag variable 
    file: File = null; // Variable to store file 
    uploadedFiles: Array < File > ;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    
   }

  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        profile: ['', Validators.required],

    });

  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.http.post('http://localhost:8088/api/user/createUser', this.registerForm.value)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChange(event) { 
    this.file = event.target.files[0]; 
    } 

   
    fileChange(element) {
        var fileName = element.target.files[0];
        this.registerForm.controls['profile'].setValue(fileName.name);
        this.uploadedFiles = element.target.files;
    }

    upload() {
        let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        this.http.post('http://localhost:8088/api/upload', formData)
        .subscribe((response) => {
             console.log('response received is ', response);
        })
    }
}