class TweenLite {
    constructor() {
        
    }
    static to(obj:any,time:number,params:any=null) {
        var tw: egret.Tween = egret.Tween.get(obj);
        tw.wait(params&&params.delay?params.delay:0,true).to(params, time, params ? params.ease : null);
        if (params && params.onComplete)tw.call(params.onComplete,params.target,params.onCompleteParams);
    }
} 