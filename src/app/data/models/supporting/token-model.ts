


export class TokenData{

    token_type: string;
    expires_in: Date;
    private access_token: string;
    private refresh_token: string;

    constructor(stToken_type:string,stExpires_In:Date,stAccess_token:string,stRefresh_Token:string)
    {
        this.token_type = stToken_type;
        this.expires_in = stExpires_In;
        this.access_token = stAccess_token;
        this.refresh_token = stRefresh_Token;
    }
    

    get _access_token()
    {
        if(!this.expires_in || new Date() > this.expires_in)
        {
            return null;
        }

        return this.access_token;
    }
    
}