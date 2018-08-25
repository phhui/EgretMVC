class MapsController extends PqController{
    static NAME:string="MapsController";
    constructor(){
        super();
        //this.btnNameList.push("submit");
        //this.funcList.push(this.submit);
        this.target = this;
    }
    public execute(param:Object=null,type:string=null){
        switch(type){
            case MapsCmd.SHOW_WINDOW:
                this.showWindow();
            break;
            case MapsCmd.CLOSE_WINDOW:
                this.closeWindow();
            break;
            case MapsCmd.MODULE_NAME:
                this.initView();
            break;
        }
    }
    private initView(){
        console.log(">>waxj<<");
        this.ui=new MapsView();
    }
    private showWindow(){
        if(!this.inited){
            this.call(SysCmd.LOAD_MODULE_RES,MapsCmd.MODULE_NAME);
            return;
        }
    }
    private closeWindow(){

    }
}