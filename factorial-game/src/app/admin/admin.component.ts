import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../modals/user/user.component'
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList = [];

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.loadUsers();
  }

  ngOnInit (): void {
  }

  delete (email) {

  }

  openDialog (action, loginid): void {
    let data = {};
    if (action != "new") {
      //lookup user
      for (let usr of this.userList) {
        if (usr.email === loginid) {
          data = usr;
          break;
        }
      }
    }
    const dialogRef = this.dialog.open(UserComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result, action);

      if (action == "new") {

        //some validations
        let messages = [];
        if (!result.user.email)
          messages.push["ERROR: Email is Mandatory."];
        if (!result.user.firs_name)
          messages.push["ERROR: First name is Mandatory."];
        if (!result.user.last_name)
          messages.push["ERROR: Last Name is Mandatory."];
        if (!result.user.password)
          messages.push["ERROR: Password is Mandatory."];
        if (!result.user.password2)
          messages.push["ERROR: Password Confirmation is Mandatory."];

        if (result.user.password && result.user.password2 && result.user.password != result.user.password2) {
          messages.push["ERROR: Password Confirmation does not match password."];
        }

        console.log('msges ', messages);
        if (messages.length > 0) {
          alert(JSON.stringify(messages));
        } else {
          //save to remote api
          this.registeruser(result.user);
        }

      }

    });
  }




  loadUsers () {
    this.userList = [];
    this.authService.listUsers().subscribe(
      (res) => {
        console.log("results ......", res);
        for (let user of res.data) {
          this.userList.push(user);
        }
      },
      (err) => {
        console.log('HTTP Error  !!!!!!!!!!!!!!!! ', err);
        alert("ERROR: Could not retrieve data.");
      }
    );
  }

  registeruser (user) {
    this.authService.registerUser(user).subscribe(
      (res) => {
        console.log("results ......", res);
        if (res.status == 0) {
          //success
          alert("Success: User saved successfully.");

          //refresh
          this.loadUsers();
        } else {
          alert(`Error: ${res.message}`);
        }
      },
      (err) => {
        console.log('HTTP Error  !!!!!!!!!!!!!!!! ', err);
        alert("ERROR: Could not register user.");
      }
    );
  }


}
