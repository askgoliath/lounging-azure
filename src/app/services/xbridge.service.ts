import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class XBridge{
    //windowRef : Window ;
    constructor(){
        //this.windowRef = getWindow();
    }

    Get<T>( handler : string, params? : { [key: string]: any } ): Promise<T>{
        var request: XRequest = {
            HandlerName : handler,
            ParamsObject : params,
            paramsJSON : JSON.stringify(params),
            Type : XMessageType.GET,
            CallbackFunctionName : ''
        };
        let promise = new Promise<T>((resolve, reject) => {
            this.NativeFunction("XRequest", request, function(response : XResponse<T>){
                if(response.Success)
                    resolve(response.ResultObject);
                else
                    reject(response.Result);   
            });
        });
        return promise;
    }
    
    private NativeFunction = function (action, data, callback) {
        var callbackId = window.nativeFuncs2.push(callback) - 1;
        window.Native(action, JSON.stringify(data) + '!' + callbackId);
    };
    private randId() {
        return Math.random().toString(36).substr(2, 10);
    }
}

declare global {
    interface Window { Native: any; nativeFuncs2: any}
}

function getWindow (): any {
    return window;
}


//Move below to objects file and import
export class XMessage
{
    Type: XMessageType;
    HandlerName: string;
}

export interface XRequest extends XMessage{
    paramsJSON: string;
    ParamsObject: { [key: string]: any };
    CallbackFunctionName: string;
}

export class XResponse<T> extends XMessage
{
    Result: string;

    get ResultObject() : T {
        return JSON.parse(this.Result);
    }
    set ResultObject(obj : T){
        this.Result = JSON.stringify(obj);
    }
    ResultType: XResultType;
    Success: boolean;
}

export enum XMessageType {
    GET = 1,
    POST = 2, 
    SUBSCRIBE = 3, 
    ACT = 4
}

export enum XResultType {
    TEXT = 1, 
    JSON = 2, 
    STREAM = 3, 
}

export interface Lounger
{
    Id: string;

    UserName: string;

    FirstName: string;

    LastInitial: string;
}