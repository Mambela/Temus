



export class TemusMessage {
    
    success:boolean;
    message:string;

    constructor(setSuccess:boolean,stMessage:string)
    {
        this.message = stMessage;
        this.success = setSuccess;

    }
    

}