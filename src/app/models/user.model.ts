export class User {

    

    constructor(
                public id:                  String | undefined,
                public adamant:             number | undefined,
                public user_id:             number | undefined,
                public start_time:          number | undefined,        
                public ip:                  String | undefined,
                private token_id:           String | undefined,
                public refresh_token_id:    String | undefined,
                public _expirationDate:     Date | undefined,  
                public active:              number | undefined,
                public userData:            any | undefined 
        )
        {
            if (this._expirationDate!=null)
                this._expirationDate = new Date(this._expirationDate);
        }
    public get oldToken()
    {
        return this.token_id;
    }
    public get token() {       
        let data_attuale = new Date();        
        if (this._expirationDate!=null)
        {
            if (!this._expirationDate ||  data_attuale > this._expirationDate) {
                return null;
            }
        }        
        return this.token_id;
    }

    public get refresh_token() {
        return this.refresh_token_id;
    }
}