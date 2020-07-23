class Timing{
    static frame:number=30;
    static farmeCount:number=0;
    static s: number = 50;//计时间隔(毫秒)
    static t: egret.Timer;
    static timeEventList: Object={};
    static frameEventList:Object={};
    static inited: Boolean = false;
    static sp:egret.Sprite;
    static runTimer:boolean=false;
    static runEnterFrame:boolean=false;
    static _objPool:Array<any>=[];
    constructor() {
    }
    static init() {
        this.t = new egret.Timer(this.s, 0);
        this.inited = true;
        this.sp=new egret.Sprite();
    }
    /**
     *创建计时器
     * @param key 名字
     * @param interval 间隔(秒)
     * @param callBack 回调方法
     * @param target  回调目标
     * @param param 回调参数
     * @param execNum 执行次数
     *
     */
    static addListen(key: string, interval: number, callBack: Function, target: any, param: any = null, execNum: number = -1): void {
        if (!this.inited) this.init()
        if (this.timeEventList[key]) return;
        if (interval < this.s) interval = this.s;
        this.timeEventList[key] = this._newObj(key,callBack,target,param,this.t.currentCount, interval, execNum);
        if(!this.runTimer){
            this.t.addEventListener(egret.TimerEvent.TIMER, this.run, this);
            this.t.start();
            this.runTimer=true;
        }
    }
    /**
     *创建帧事件
     * @param key 名字
     * @param callBack 回调方法
     * @param target  回调目标
     * @param param 回调参数
     *
     */
    static addEnterFrame(key: string, callBack: Function, target: any, param: any = null): void {
        if (!this.inited) this.init()
        if (this.frameEventList[key]) return;
        this.frameEventList[key] = this._newObj(key,callBack,target,param);
        if(!this.runEnterFrame){
            Timing.sp.addEventListener(egret.Event.ENTER_FRAME,this.enterframe,this);
            this.runEnterFrame=true;
        }
    }
    static setTimeOut(key: string, interval: number, callBack: Function, target: any, param: any = null): void {
        Timing.addListen(key, interval, callBack, target, param, 1);
    }
    /**
     *删除指定计时
     * @param key 名字
     *
     */
    static removeListen(key: string): void {
        this._freeObj(this.timeEventList[key]);
        this.timeEventList[key] = null;
    }
    static removeEventFrame(key:string){
        this._freeObj(this.frameEventList[key]);
        this.frameEventList[key]=null;
    }
    static sys_remove_all_listen(){
        for(let i in this.timeEventList){
            this.removeListen(i);
        }
        this.timeEventList={};
    }
    static enterframe(e:egret.Event){
        let hasItem:boolean=false;
        for (let i in this.frameEventList) {
            let o:any = this.frameEventList[i];
            if (o != null && o.func != null) {
                if (o.param != null) o.func.apply(o.target,[o.param]);
                else o.func.apply(o.target,null);
                hasItem=true;
            }
        }
        if(!hasItem){
            // console.log("not enterframe task,enterframeEvent stop!");
            this.sp.removeEventListener(egret.Event.ENTER_FRAME,this.enterframe,this);
            this.runEnterFrame=false;
        }
    }
    static run(): void {
        let hasItem:boolean=false;
        for (let i in this.timeEventList) {
            let o:any = this.timeEventList[i];
            if(o)hasItem=true;
            if (o != null && o.func != null && (this.t.currentCount - o.time) * this.s >= o.interval) {
                if(o.execNum!=-1){
                    o.execNum--;
                    if(o.execNum<1){
                        this.timeEventList[i]=null;
                        delete this.timeEventList[i];
                    }
                }
                if (o.param != null) o.func.apply(o.target,[o.param]);
                else o.func.apply(o.target,null);
                if (o.execNum ==0)this._freeObj(o);
                else o.time = this.t.currentCount;
            }
        }
        if(!hasItem){
            // console.log("not timer task,timer stop!");
            this.t.stop();
            this.t.removeEventListener(egret.TimerEvent.TIMER, this.run, this);
            this.runTimer=false;
        }
    }
    static _newObj(key,func, target, param, time=null, interval=null, execNum=null){
        let obj;
        if(this._objPool.length){
            obj=this._objPool.shift();
            obj.key=key;
            obj.func=func;
            obj.target=target;
            obj.param=param;
            obj.time=time;
            obj.interval=interval;
            obj.execNum=execNum;
        }else obj={key:key,func: func, target: target, param: param, time:time, interval: interval, execNum: execNum};
        return obj;
    }
    static _freeObj(obj){
        if(!obj)return;
        obj.key=null;
        obj.func=null;
        obj.target=null;
        obj.once=null;
        obj.param=null;
        obj.time=null;
        obj.interval=null;
        obj.execNum=null;
        this._objPool.push(obj);
    }
} 
