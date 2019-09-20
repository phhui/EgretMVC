class LoadMgr extends PqMvc{
    private loadList:Array<any>=[];
    private loadIndex:number=0;
    private curList:Array<any>;
    constructor(){
        super();
        this.registerEvent();
    }
    private registerEvent(){
        this.addListen(SysCmd.LOAD_CONFIG,this.loadConfig,this);
        this.addListen(SysCmd.LOAD_MODULE_RES,this.loadModule,this);
    }
    private async loadConfig(){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.groupLoaded,this);
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this );
        await RES.loadConfig("resource/default.res.json", "resource/");
        await RES.loadGroup("preload",0);
        await RES.loadGroup("baseRes",1);
    }
    private onResourceLoadErr(e:RES.ResourceEvent){
        console.log(JSON.stringify(e.data));
    }
    private groupLoaded(e:RES.ResourceEvent){
        switch(e.groupName){
            case "preload":
                Loading.self.show("开始加载基础资源...");
            break;
            case "baseRes":
                Loading.self.close();
                this.call(SysCmd.CONFIG_COMPLETE);
            break;
        }
    }
    private loadModule(event:string,name:string=null){
        //console.log("load module>>"+name);
        Loading.self.show("正在加载模块资源...");
        this.loadList.push(name);
        if(this.loadList.length==1){
            this.getConfig();
        }
    }
    private getConfig(){
        Config.configDict[this.loadList[0]]=RES.getRes(this.loadList[0]);
        var list=RES.getRes(this.loadList[0]);
        this.curList=[];
        var n: number = list.length;
        for (var i: number = 0; i < n; i++) {
            if(list[i].sheet||!list[i].url)continue;
            if (list[i].category == "img" || list[i].category == "res" || list[i].category == "btn")this.curList.push(list[i]);
        }
        if(this.curList.length>0){
            this.load();
        }else{
            this.loadNextList();
        }
    }
    private load(){
        var url:string=this.curList[this.loadIndex].url;
        RES.getResByUrl(url,this.resLoaded,this,this.curList[this.loadIndex].type);
    }
    private resLoaded(e:any,url:string){
        ResMgr.map[url]=e;
        this.loadIndex+=1;
        this.loadIndex>=this.curList.length?this.loadNextList():this.load();
    }
    private loadNextList(){
        this.loadIndex=0;
        this.call(this.loadList[0]);
        this.loadList.shift();
        this.loadList.length>0?this.getConfig():Loading.self.close();
    }
}