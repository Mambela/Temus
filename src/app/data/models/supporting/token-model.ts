


export class TokenData{

    token_type: string;
    expires_in: Date;
    private _access_token: string;
    private _refresh_token: string;

    constructor(stToken_type:string,stExpires_In:Date,stAccess_token:string,stRefresh_Token:string)
    {
        this.token_type = stToken_type;
        this.expires_in = stExpires_In;
        this._access_token = stAccess_token;
        this._refresh_token = stRefresh_Token;
    }
    

    get access_token()
    {
        if(!this.expires_in || new Date() > this.expires_in)
        {
            return null;
        }

        return this._access_token;
    }
    
}