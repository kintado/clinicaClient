import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UsersService } from 'src/app/services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { OpComWaitingService } from 'src/app/services/op-com-waiting.service';
declare var $: any;
declare var init_view: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any = [

  ]

  selectedUsersIDlist: any = [];


  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private config: ConfigService, private authservice: AuthService, private usersservice: UsersService, public dialog: MatDialog, private opcom: OpComWaitingService) { }

  async loadUsers()
  {
    this.usersList = await this.usersservice.loadUsers();
    this.chRef.detectChanges();
    $('#example').DataTable();
    this.testUpdate();
  }

  addUSERIDtoSelectedUsersIDlist(user_id: number)
  {
    if (this.selectedUsersIDlist.indexOf(user_id)==-1)
    {
      this.selectedUsersIDlist.push(user_id);
    }
  }

  removeUSERIDfromSelectedUsersIDlist(user_id: number)
  {
    if (this.selectedUsersIDlist.indexOf(user_id)!=-1)
    {
      this.selectedUsersIDlist.splice(this.selectedUsersIDlist.indexOf(user_id), 1);
    }
  }

  changeSelectOfUser(user_id: number, event: any)
  {
    if (event.target.checked)
    {
      this.addUSERIDtoSelectedUsersIDlist(user_id);
    }
    else
    {
      this.removeUSERIDfromSelectedUsersIDlist(user_id);
    }
  }

  removeSelectedUsersIDlistInTable(remained:any = [])
  {
    let usersTableBody = document.getElementById('usersTableBody');
    if (usersTableBody)
    {
      let n = this.selectedUsersIDlist.length;
      for (let i=0; i<n; i++)
      {
        if (remained.indexOf(this.selectedUsersIDlist[i])==-1)
        {
          let tr = document.getElementById('tr_user_'+this.selectedUsersIDlist[i]);
          if (tr!=null)
          {
            usersTableBody!.removeChild(tr);
          }
        }
      }
      this.selectedUsersIDlist = [];
    }
  }

  deleteSelectedUsers()
  {
    this.usersservice.deleteUsers(this.selectedUsersIDlist).subscribe((res: any) => {
    if (res=='OK')
    {
      alert("Utenti eliminati con successo");
      this.removeSelectedUsersIDlistInTable();
    }
    else if (JSON.parse(res).length>0)
    {
      res = JSON.parse(res);
      alert(res.length+" utenti rimasti!");
      this.removeSelectedUsersIDlistInTable(res);
    }
    else
    {
      alert("Errore durante l'eliminazione degli utenti");
    }
    });

  }

  ngOnInit() {
    init_view("users");
    this.loadUsers();

  }

  openUserForm()
  {
    let enterAnimationDuration = "0ms";
    let exitAnimationDuration = "0ms";
    this.dialog.open(UserFormComponent, {
      width: "auto",
      height: "auto",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {},
      disableClose: true
    });
  }

  editUserForm(user: any)
  {

    let enterAnimationDuration = "0ms";
    let exitAnimationDuration = "0ms";
    this.dialog.open(UserFormComponent, {
      width: "auto",
      height: "auto",
      enterAnimationDuration,
      exitAnimationDuration,
      data: user,
      disableClose: true
    });
  }

  refresh_user_data_in_table(user: any)
  {
    if (document.getElementById('user_name_'+user.id))
    {
      document.getElementById('user_name_'+user.id)!.innerHTML = user.name;
      document.getElementById('user_surname_'+user.id)!.innerHTML = user.surname;
      document.getElementById('user_email_'+user.id)!.innerHTML = user.email;
      document.getElementById('user_cell_'+user.id)!.innerHTML = user.cell;
      document.getElementById('user_usename_'+user.id)!.innerHTML = user.username;
    }
    else
    {
      location.reload();
    }

  }

  mustToUpdate()
  {
    return (this.opcom.user!=null);
  }

  testUpdate()
  {
    if (this.mustToUpdate())
    {
      this.refresh_user_data_in_table(this.opcom.user);
      this.opcom.user = null;
    }
    setTimeout(() => {
      this.testUpdate();
    }, 1000);
  }

  deleteUser(user: any)
  {
    if (confirm("Sei sicuro di voler eliminare l'utente "+user.name+" "+user.surname+"?"))
    {
        this.usersservice.obsUserIsDeletable(user.id).
                        subscribe((res: any) => {
                          if (res=='1')
                          {
                            this.usersservice.delete(user.id).subscribe((res: any) => {
                              if (res=='1')
                              {
                                alert("Utente eliminato con successo");
                                this.loadUsers();
                              }
                              else
                              {
                                alert("Errore durante l'eliminazione dell'utente");
                              }
                            });
                          }
                          else
                          {
                            alert("Da NON eliminare");
                          }
                });
      }


  }

  changeRole(rolebox:any, user: any)
  {
    var role = "OPERATORE";
    if (rolebox.checked)
    {
      role = "ADMIN";
    }

    this.usersservice.setRole(user.id, role).subscribe((res: any) => {

                                                                                  if (res=='1')
                                                                                      {
                                                                                        //alert("Ruolo modificato con successo");
                                                                                        //this.loadUsers();
                                                                                      }
                                                                                      else
                                                                                      {
                                                                                        alert("Errore durante la modifica del ruolo");
                                                                                      }
                                                                                    });

  }

  setActiveState(user: any, state: boolean)
  {
    this.usersservice.setActiveState(user.id, state).subscribe((res: any) => {
          if (res!='1')
          {
            alert("Errore durante la modifica dello stato");
          }
        });
  }

  selectAllUsers(event: any)
  {
    if (event.target.checked)
    {
      let n = this.usersList.length;
      for (let i=0; i<n; i++)
      {
        document.getElementById('user_checkbox_'+this.usersList[i].id)!.setAttribute('checked', 'checked');
      }
    }
    else
    {
      let n = this.usersList.length;
      for (let i=0; i<n; i++)
      {
        document.getElementById('user_checkbox_'+this.usersList[i].id)!.removeAttribute('checked');
      }
    }
  }
}
