import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/models/userData';
import { OpComWaitingService } from 'src/app/services/op-com-waiting.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements  OnInit {



  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('xxx'),
    surname: new FormControl(''),
    email: new FormControl(''),
    cell: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });

  state: String = "EDIT";
  editpassw: boolean = false;


  public constructor(public dialogRef: MatDialogRef<UserFormComponent>,  private userServ:UsersService, @Inject(MAT_DIALOG_DATA) public editedUser: userData, private opcom: OpComWaitingService )
  {
    this.state = "EDIT";
  }

  close()
  {
    this.dialogRef.close();
  }

  resetForm()
  {
    let dato = document.getElementById("inputNome");
    if (dato!=null)
    {

    }
  }


  ngOnInit()
  {
    this.state = "EDIT";
    this.form.reset();

    this.editpassw = false;
    if (this.editedUser.id!=undefined && this.editedUser.id!=0)
    {
      this.state = "EDIT";


      this.form.controls['id'].setValue(this.editedUser.id);
      this.form.controls['name'].setValue(this.editedUser.name);
      this.form.controls['surname'].setValue(this.editedUser.surname);
      this.form.controls['email'].setValue(this.editedUser.email);
      this.form.controls['cell'].setValue(this.editedUser.cell);
      this.form.controls['username'].setValue(this.editedUser.username);
      //this.form.controls['password'].setValue(this.editedUser.password);
      this.form.controls['role'].setValue(this.editedUser.role);
    }
    else
    {
      this.state = "NEW";
    }

  }

  resetFormData()
  {
    this.form.reset();
  }

  test()
  {
    alert(this.form.controls['name'].value);
  }

  setModPassw(val: boolean)
  {
    this.editpassw = val;
  }

  boxcompiled()
  {
  //  alert('name='+this.form.controls['name'].value+", surname="+this.form.controls['surname'].value+", email="+this.form.controls['email'].value+", cell="+this.form.controls['cell'].value+", username="+this.form.controls['username'].value+", role="+this.form.controls['role'].value+", password="+this.form.controls['password'].value+", editpassw"+this.editpassw);


    return (this.form.controls['name'].value!=""
        &&
        this.form.controls['surname'].value!=""
        &&
        this.form.controls['email'].value!=""
        &&
        this.form.controls['cell'].value!=""
        &&
        this.form.controls['username'].value!=""
        &&
        this.form.controls['role'].value!=""
        &&
        (
          this.form.controls['password'].value!=""
          ||
          !this.editpassw
        )
      );
  }
  save()
  {
      this.form.controls['username'].setValue(this.form.controls['email'].value);
      if (this.boxcompiled())
      {
        this.userServ.callVerifyUserAlreadyExists(this.form.value.username, this.form.value.email).subscribe((result)=>{
        if (result != 0 && (this.form.value.id==undefined || this.form.value.id==0))
            {
              alert("Utente già esistente: non puoi inserire un utente con lo stesso username o email");
              return;
            }
            else
            {

              this.form.value.username = this.form.value.email;
              let data = {
                id: this.form.value.id,
                name: this.form.value.name,
                surname: this.form.value.surname,
                email: this.form.value.email,
                cell: this.form.value.cell,
                username: this.form.value.username,
                password: this.form.value.password,
                actioninfo: {actionState: this.state, editpassw: this.editpassw},
                role: this.form.value.role,
              };

              this.userServ.callSaveUser(data).subscribe((result: any)=>{

                if (!isNaN(result) && result>0)
                {
                  alert("Utente salvato correttamente");
                  this.dialogRef.close();
                }
                this.state = 'SAVED';
                this.opcom.user = data;
              });
        }
      });
    }
    else
    {
      alert("Compilare tutti i campi obbligatori");
    }
  }
}
