class HomeController extends PqController{
    static NAME:string="HomeController";
    private pxy:HomeProxy;
    private bgDict:Object;
    private split:number=20;
    private speed:Array<number>=[0,0,0];
    private timeCount:number=0;
    private gameTime:number=5;
    private itemHeight:number=142;
    private result:Array<any>=[0,1,2];
    private goldList:Array<any>=[];
    private goldFactory: egret.MovieClipDataFactory;
    static self:HomeController;
    constructor(){
        super();
        var btnNameList:Array<any>=["btn0","btn_close"];
        for(var i:number=0;i<btnNameList.length;i++){
            this.btnNameList.push(btnNameList[i]);
            this.funcList.push(this.itemClick);
        }
        this.target = this;
        HomeController.self=this;
    }
    public execute(param:Object=null,type:string=null){
        switch(type){
            case HomeCmd.SHOW_WINDOW:
                this.showWindow();
            break;
            case HomeCmd.CLOSE_WINDOW:
                this.closeWindow();
            break;
            case HomeCmd.MODULE_NAME:
                this.initView();
            break;
        }
    }
    private initView(){
        this.ui=new HomeView();
        this.pxy=this.getProxy(HomeProxy.NAME);
        this.inited=true;
        this.showWindow();
        this.createView();
    }
    private showWindow(){
        if(!this.inited){
            this.call(SysCmd.LOAD_MODULE_RES,HomeCmd.MODULE_NAME);
            return;
        }
        this.call(SysCmd.ADD_TO_STAGE,this.ui,2);
    }
    private closeWindow(){
        this.call(SysCmd.REMOVE_FROM_STAGE,this.ui);
    }
    private createView(){
        
    }
    private itemClick(type:string,target:any){
        if(type=="btn0"){
            startLaba();
            this.ui.uiDict["btn0"].visible=false;
            this.ui.uiDict["btn1"].visible=true;
            Timing.addListen("startLottery",0.01,this.run,this);
            Timing.setTimeOut("showResult",2,this.showResult,this);
        }else{
            closeWin();
            //this.closeWindow();
        }
        Timing.removeListen("addGold");
        Timing.removeListen("moveGold");
        this.ui.uiDict["goldbox"].removeChildren(); 
    }
    private run(){
        this.timeCount++;
        this.speed[0]+=1;
        if(this.timeCount>this.split*2)this.speed[1]+=1;
        if(this.timeCount>this.split*4)this.speed[2]+=1;
        var list:Array<any>=[this.ui.item0,this.ui.item1,this.ui.item2];
        for(var i:number=0;i<3;i++){
            list[i].y+=(this.speed[i]>50?50:this.speed[i]);
            if(list[i].y>=this.itemHeight*4)list[i].y=0;
        }
    }
    public setResult(res){
        this.result=res;
        Timing.setTimeOut("showResult",2,this.showResult,this);
    }
    private showResult(){
        this.timeCount=0;
        this.speed=[0,0,0];
        Timing.removeListen("startLottery");
        this.ui.item0.y=this.itemHeight*this.result[0];
        this.ui.item1.y=this.itemHeight*this.result[1];
        this.ui.item2.y=this.itemHeight*this.result[2];
        this.resetBtn();
        if(this.result[0]==this.result[1]&&this.result[0]==this.result[2])this.showWin();
    }
    private showWin(){
        this.goldList=[];
        if(!this.goldFactory){
            let goldPng = RES.getRes("gold_png");
            let goldJson = RES.getRes("gold_json");
            this.goldFactory = new egret.MovieClipDataFactory(goldJson, goldPng);
        }
        Timing.addListen("addGold",0.05,this.createGold,this);
        Timing.addListen("moveGold",0.01,this.moveGold,this);
    }
    private createGold(){
        let gold: egret.MovieClip = new egret.MovieClip(this.goldFactory.generateMovieClipData("gold"));
        gold.x=Math.random()*250+100;
        gold.play(-1);
        gold.scaleX=0.8;
        gold.scaleY=0.8;
        this.goldList.push(gold);
        this.ui.uiDict["goldbox"].addChild(gold);
    }
    private moveGold(){
        for(var i:number=0;i<this.goldList.length;i++){
            this.goldList[i].y+=5;
            if(this.goldList[i].y>this.ui.stage.stageHeight&&this.goldList[i].parent)this.goldList[i].parent.removeChild(this.goldList[i]);
        }
    }
    private resetBtn(){
        this.ui.uiDict["btn1"].visible=false;
        this.ui.uiDict["btn0"].visible=true;
    }
}
declare function closeWin();
declare function startLaba();