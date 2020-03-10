class LayerMgr extends PqMvc{
	private map:egret.Sprite;
	private scene:egret.Sprite;
	private menu:egret.Sprite;
	private win:egret.Sprite;
	private guide:egret.Sprite;
	private top:egret.Sprite; 
	private loading:egret.Sprite;
	private layerList:Array<any>;
	private stg:egret.Stage;
	private curWinName:String;
	private curWin:Object;
	private init:Boolean=false;
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage(e:egret.Event){
		if(this.init)return;
		this.init=true;
		this.stg=this.stage;
		this.map=this.createLayer("map");
		this.scene=this.createLayer("scene");
		this.menu=this.createLayer("menu");
		this.win=this.createLayer("win");
		this.guide=this.createLayer("top");
		this.top=this.createLayer("guide");
		this.loading=this.createLayer("loading");
		this.layerList=[this.map,this.scene,this.menu,this.win,this.top,this.guide,this.loading];
		this.addListen(SysCmd.ADD_TO_STAGE,this.show,this);
		this.addListen(SysCmd.REMOVE_FROM_STAGE,this.remove,this);
		this.stage.addEventListener(egret.Event.RESIZE,this.resize,this);
	}
	private createLayer(name:string){
		let sp:egret.Sprite=new egret.Sprite();
		sp.name=name;
		sp.touchEnabled=false;
		this.addChild(sp);
		return sp;
	}
	/**0地图,1场景，2菜单，3窗口，4菜单/公告 ，5引导，6进度条**/
	public getLayer(i:number):egret.Sprite{
		return this.layerList[i] as egret.Sprite;
	}
	/**添加显示对象，layer添加到指定层次，0地图,1场景，2云，3窗口，4菜单/公告 ，5进度条**/
	public show(event:string,obj:egret.DisplayObject,layer:number=3,x:number=0,y:number=0,offx:number=0,offy:number=0):void{
		if(layer==3){
			this.curWinName=obj.name;
			this.curWin=obj;
		}
		this.layerList[layer].addChild(obj);
	}
	/**移除显示对象**/
	public remove(event:string,obj:egret.DisplayObject):void{
		if(!obj||!obj.parent)return;
		if(obj.parent)obj.parent.removeChild(obj);
	}
	private keyDown(e:KeyboardEvent):void{
		//this.call(SysCmd.KEY_BOARD_DOWN,e);
	}
	private keyUp(e:KeyboardEvent):void{
		//this.call(SysCmd.KEY_BOARD_UP,e);
	}
	private resize(e:Event):void{
		this.call(SysCmd.RESIZE,e);
	}
}