class HttpHelper{
    static debug:boolean=false;
    static domain:string="";
    static ioErrorFunc:Function;
    static get(url:string,params:any,callback:Function,target:any,errFunc:Function=null,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT){
        this.request(url,egret.HttpMethod.GET,params,callback,errFunc,target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"]]);
    }
    static post(url:string,params:any,callback:Function,target:any,errFunc:Function=null,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT){
        this.request(url,egret.HttpMethod.POST,params,callback,errFunc,target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"]]);
    }
    static ajaxGet(url:string,params:any,callback:Function,target:any,errFunc:Function=null,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT){
        this.request(url,egret.HttpMethod.GET,params,callback,errFunc,target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"],["X-Requested-With","XMLHttpRequest"]]);
    }
    static ajaxPost(url:string,params:any,callback:Function,target:any,errFunc:Function=null,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT){
        this.request(url,egret.HttpMethod.POST,params,callback,errFunc,target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"],["X-Requested-With","XMLHttpRequest"]]);
    }
    /**get数据并自动解析为JSON对象 */
    static getJson(url: string, param: any, onComplete: Function, target: any, errorFunc?,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT) {
        this.request(url,egret.HttpMethod.GET, param, (obj: any) => {onComplete.apply(target, [this.parse(obj)]);},null,target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"]]);
    }
    /**post数据并自动解析为JSON对象 */
    static postJson(url: string, param: any, onComplete: Function, target: any, errorFunc?,withCredentials:boolean=true,responseType:string=egret.HttpResponseType.TEXT) {
        this.request(url,egret.HttpMethod.POST, param, (obj: any) => {onComplete.apply(this, [this.parse(obj)]);},null, target,responseType,withCredentials,[["Content-Type", "application/x-www-form-urlencoded;charset=utf-8"],["Accept","application/json, text/plain, */*"]]);
    }
    static parse(e:Event){
        try{return JSON.parse(e.currentTarget["response"]);
		}catch(err){return {msg:e.currentTarget["response"]};}
    }
    static request(url:string,method:any,params:any,callback:Function,errFunc:Function,target:any,responseType:any,withCredentials:boolean,header:Array<Array<string>>){
        url=url.substr(0,4)=="http"?url:HttpHelper.domain+url;
        errFunc=errFunc||HttpHelper.ioErrorFunc||HttpHelper.errFunc;
        let request = new egret.HttpRequest();
        request.responseType = responseType;
        header.map((item)=>{request.setRequestHeader(item[0],item[1]);});
        request.withCredentials=withCredentials;
        if(method==egret.HttpMethod.GET){
            url+="?"+HttpHelper.paramParse(params);
            url=url.replace("?&","?");
            if(this.debug)console.log("httpGet >>>>>>"+url);
            request.open(url,egret.HttpMethod.GET);
            request.send();
        }else{
            if(this.debug)console.log("httpPost >>>>>>"+url);
            if(this.debug)console.log("httpPost params >>>>>>"+HttpHelper.paramParse(params));
            request.open(url,egret.HttpMethod.POST);
            request.send(HttpHelper.paramParse(params));
        }
        request.addEventListener(egret.Event.COMPLETE,callback,target);
        if(errFunc)request.addEventListener(egret.IOErrorEvent.IO_ERROR,errFunc,target);
        request.addEventListener(egret.ProgressEvent.PROGRESS,HttpHelper.onGetProgress,this);
    }
    static onGetProgress(e:any){
        //console.log("...");
    }
    static errFunc(data:egret.IOErrorEvent){
        console.log("http request failed >>>>>>  "+data.currentTarget._url);
    }
    static paramParse(param:any,key:string=null,encode:boolean=true){
        if(param==null) return '';
        let paramStr = '';
        let t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += HttpHelper.paramParse(param[i], k, encode);
            }
        }
        return paramStr;
    }
}