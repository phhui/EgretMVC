class TweenLite {
    constructor() {
        
    }
    /**
     * obj    移动对象
     * time   移动时间(秒)
     * params 参数
     */
    static to(obj:any,time:number,params:any=null) {
        var tw: egret.Tween = egret.Tween.get(obj);
        tw.wait(params&&params.delay?params.delay:0,true).to(params, time*1000, params ? params.ease : null);
        if (params && params.onComplete)tw.call(params.onComplete,params.target,params.onCompleteParams);
    }
    /**均速移动 
     * obj  移动对象
     * time 移动时间(秒)
     * to   目标位置
    */
    static moveByTime(obj:any,time:number,to:egret.Point){
        
    }
    static moveBySpeed(obj:any,speed:number,to:egret.Point){

    }
} 