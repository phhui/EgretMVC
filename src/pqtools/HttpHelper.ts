class HttpHelper{
    static httprequest:egret.HttpRequest=new egret.HttpRequest();
    static get(url:string,complete:Function,target:any,error:Function=null){
        this.request(egret.HttpMethod.GET,url,complete,target,null,error);
    }
    static post(url:string,data:any,complete:Function,target:any,error:Function=null){
        this.request(egret.HttpMethod.POST,url,complete,target,data,error);
    }
    static request(type:string,url:string,complete:Function,target:any,data:any=null,error:Function=null){
        this.httprequest.responseType = egret.HttpResponseType.TEXT;
        this.httprequest.withCredentials=true;
        this.httprequest.open(url,type);
        //request.setRequestHeader("User-Agent","Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36");
        this.httprequest.setRequestHeader("X-Requested-With","XMLHttpRequest");
        this.httprequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        this.httprequest.send(data);
        this.httprequest.addEventListener(egret.Event.COMPLETE,complete,target);
        if(error)this.httprequest.addEventListener(egret.IOErrorEvent.IO_ERROR,error,target);
    }
}