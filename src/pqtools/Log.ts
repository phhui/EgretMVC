class Log{
    static stg:egret.Stage;
    static enabled:boolean=false;
    static logRecord:Array<any>=[[],[],[],[]];
    static logPanel:egret.Sprite;
    static txt:egret.TextField;
    static logType:number=0;
    static _pos:egret.Point=new egret.Point();
    static isInit:boolean=false;
    static _log=console.log;
    static _cmd:egret.TextField;
    static _touchNum:number=0;
    static _help:string="\r\n\r\n命令  call>Login_show_window\r\n发送Login_show_window消息\r\n\r\n命令  connect>127.0.0.1:10000\r\nsocket连接到127.0.0.1:10000\r\n\r\n其它参数为发送GM指令";
    static goHandler:Function;
    static goTarget:any;
    static appLogFunc:Function;
    public static log(msg:string){
        Log.logRecord[1].push(Log.getTime()+" "+msg+"\n");
        Log.trace(msg,1);
    }
    public static logDebug(msg:string){
        Log.logRecord[2].push(Log.getTime()+" "+msg+"\n");
        Log.trace(msg,2);
    }
    public static logNet(msg:string){
        Log.logRecord[3].push(Log.getTime()+" "+msg+"\n");
        Log.trace(msg,3);
    }
    public static trace(msg:string,type:number=0){
        Log._log(msg);
        if(msg)if(this.appLogFunc)this.appLogFunc(msg);
        if(!this.enabled)return;
        if(!Log.isInit)Log.init();
        if(msg){
            Log.logRecord[0].push(Log.getTime()+" "+msg+"\n");
            if(Log.logRecord[0].length>20)Log.logRecord[0].shift();
        }
        if(Log.logRecord[type].length>20)Log.logRecord[type].shift();
        if(Log.logType==type)Log.txt.text=Log.logRecord[type].toString().replace(/,/g, "");
    }
    public static dragStart(e:egret.TouchEvent){
        Log.stg.addEventListener(egret.TouchEvent.TOUCH_MOVE,Log.drag,this);
        Log._pos.x=e.stageX-Log.logPanel.x;
        Log._pos.y=e.stageY-Log.logPanel.y;
    }
    public static dragEnd(e:egret.TouchEvent){
        Log.stg.removeEventListener(egret.TouchEvent.TOUCH_MOVE,Log.drag,this);
    }
    public static drag(e:egret.TouchEvent){
        Log.logPanel.x=e.stageX-Log._pos.x;
        Log.logPanel.y=e.stageY-Log._pos.y;
    }
    public static getTime(){
        var myDate = new Date();
        let m=myDate.getMinutes();
        let s=myDate.getSeconds();
        return m+":"+s+":"+(new Date()).getTime().toString().substr(10,2);
    }
    public static init(){
        Log.stg=egret.MainContext.instance.stage;
        Log.isInit=true;
        console.log=Log.trace;
        Log.stg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,Log.touch,this);
        Log.stg.addEventListener(egret.TouchEvent.TOUCH_END,Log.touch,this);
        Log.createPanel();
    }
    private static touch(e:egret.TouchEvent){
        switch(e.target.name){
            case "X":
                if(this.logPanel.parent)this.logPanel.parent.removeChild(this.logPanel);
            break;
            case "all":
                this.logType=0;
                this.trace("",this.logType);
            break;
            case "log":
                this.logType=1;
                this.trace("",this.logType);
            break;
            case "net":
                this.logType=3;
                this.trace("",this.logType);
            break;
            case "GO":
                if(e.type!="touchTap")return;
                if(this.goTarget&&this.goHandler)this.goHandler.apply(this.goTarget,[this._cmd.text]);
                else this.runCmd();
            break;
            default:
                if(e.type!="touchBegin")return;
                if(e.localX<200&&this._touchNum==0)this._touchNum=1;
                else if(e.localX>200&&e.localX<400&&this._touchNum==1)this._touchNum=2;
                else if(e.localX>400&&this._touchNum==2)this._touchNum=3;
                else this._touchNum=0;
                if(this._touchNum>2){
                    this.stg.addChild(this.logPanel);
                    this.logPanel.x=100;
                    this.logPanel.y=200;
                    this._touchNum=0;
                }else {
                    Timing.setTimeOut("touchTimeout",5000,()=>{this._touchNum=0},this);
                }
            break;
        }
    }
    private static createBtn(text:string,x:number=0,y:number=0,w:number=80,h:number=25){
        let btn:egret.Sprite=UiHelper.createRect(0,0,w,h,1,0x000,0x005757,1);
        UiHelper.createTxt({text:text,width:w,height:h,size:h-2,color:0xffffff,align:"center",parent:btn});
        btn.cacheAsBitmap=true;
        btn.touchEnabled=true;
        btn.touchChildren=false;
        btn.name=text;
        btn.x=x;
        btn.y=y;
        this.logPanel.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touch,this);
        return btn;
    }
    public static createPanel(){
        Log.logPanel=UiHelper.createRect(0,0,600,800,2,0xff0000,0x000000,0.8);
        Log.txt=UiHelper.createTxt({width:600,height:700,y:30,color:0xffffff,size:26,multiline:true});
        Log.logPanel.addChild(Log.txt);
        Log.logPanel.touchEnabled=true;
        this.createBtn("X",550,0,50,50);
        this.createBtn("all",0,0,60,30);
        this.createBtn("log",80,0,60,30);
        this.createBtn("net",160,0,60,30);
        this.createBtn("GO",520,750,80,50);
        this.logPanel.addChild(UiHelper.createRect(0,750,520,50,1,0xCE0000,0x000000,0.6));
        this._cmd=UiHelper.createTxt({border:1,borderColor:0xCE0000,type:"input",width:520,height:50,y:750,size:46,color:0xffffff,parent:this.logPanel});
        Log.logPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,Log.dragStart,Log);
        Log.logPanel.addEventListener(egret.TouchEvent.TOUCH_END,Log.dragEnd,Log);
    }
    public static setGohandler(func:Function,target:any){
        this.goTarget=target;
        this.goHandler=func;
    }
    public static runCmd(){
        
    }
}