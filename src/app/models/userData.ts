export class userData
{
  public id: number | undefined;
  public name: String | undefined;
  public surname: String | undefined;
  public email : String | undefined;
  public cell: String | undefined;
  public username: String | undefined;
  public password: String | undefined;
  public role: String | undefined;

  public constructor ()
  {
    this.id = 0;
    this.name = "";
    this.surname = "";
    this.email = "";
    this.cell = "";
    this.username = "";
    this.password = "";
    this.role = "";
  }
}
