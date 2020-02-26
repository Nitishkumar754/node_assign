import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private common:CommonService) { }
  user = {}
  successMsg:String;
  errorMsg:String;
  myemail:String
  friends = [];
  mutual = {};
  mutual_friends = [];
  ngOnInit() {
  	this.getMembers();
  }
  members = {}


  userRegister(){
  	this.common.commonService(this.user, "POST", "profile/create")
    .subscribe((data:any)=>{
      console.log("data>>>>>>>>>>>>>>>>> ", data)
      this.getMembers();
      this.user = [];
      this.errorMsg='';
      this.successMsg = "Profile created!!"
      
    },
    error=>{
    this.errorMsg = error.error.message;
    this.successMsg = ''
      console.log("error is >>>>>>>>>>>>>>>>>>> ", error)
    })
  }


  getMembers(){
  	this.common.commonService(this.user, "GET", "profile/list")
    .subscribe((data:any)=>{
      console.log("data>>>>>>>>>>>>>>>>> ", data)
      this.members = data.members;
    },
    error=>{
      console.log("error is >>>>>>>>>>>>>>>>>>> ", error)
    })
  }

  listAllFriend(){
  	this.common.commonService({email:this.myemail}, "POST", "friend/list/friend")
    .subscribe((data:any)=>{
      console.log("data>>>>>>>>>>>>>>>>> ", data)
      this.friends = data.friends;
    },
    error=>{
      console.log("error is >>>>>>>>>>>>>>>>>>> ", error)
    })

  }



  addNewFriend(new_fr_email){

  	this.common.commonService({email:new_fr_email}, "POST", "friend/make/friend")
    .subscribe((data:any)=>{
      console.log("data>>>>>>>>>>>>>>>>> ", data)
      this.friends = data.friends;
    },
    error=>{
      console.log("error is >>>>>>>>>>>>>>>>>>> ", error)
    })

  }

  getMutualfriend(){

  	this.common.commonService({email1:this.mutual.email1, email2:this.mutual.email2}, "POST", "friend/mutual/friend")
    .subscribe((data:any)=>{
      console.log("data>>>>>>>>>>>>>>>>> ", data)
      this.mutual_friends = data.mutual_friends;
      console.log("mutual_friends>>>>>>>>>>>>> ",this.mutual_friends);
    },
    error=>{
      console.log("error is >>>>>>>>>>>>>>>>>>> ", error)
    })

  }


}
