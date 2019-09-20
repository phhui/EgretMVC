class HttpHelper{
    static get(url:string,params:any,callback:Function,target:any,errFunc:Function=null){
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url+"?"+HttpHelper.urlEncode(params),egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,callback,target);
        if(errFunc)request.addEventListener(egret.IOErrorEvent.IO_ERROR,errFunc,target);
        //request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
    static post(url:string,params:any,callback:Function,target:any,errFunc:Function=null){
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url,egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setRequestHeader("Accept","application/json, text/plain, */*");
        request.withCredentials=true;
        request.send(HttpHelper.urlEncode(params));
        request.addEventListener(egret.Event.COMPLETE,callback,target);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,errFunc,target);
        //request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }
    static urlEncode(param:any, key:string=null, encode:boolean=true) {
        if(param==null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += HttpHelper.urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    }
}