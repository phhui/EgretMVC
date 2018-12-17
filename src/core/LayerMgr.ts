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
		this.map=new egret.Sprite();
		this.scene=new egret.Sprite();
		this.menu=new egret.Sprite();
		this.win=new egret.Sprite();
		this.guide=new egret.Sprite();
		this.top=new egret.Sprite();
		this.map.name="map";
		this.scene.name="scene";
		this.menu.name="menu";
		this.win.name="win";
		this.top.name="top";
		this.guide.name="guide";
		this.loading=new egret.Sprite();
		this.scene.touchEnabled=false;
		this.menu.touchEnabled=false;
		this.win.touchEnabled=false;
		this.top.touchEnabled=false;
		this.guide.touchEnabled=false;
		this.loading.touchEnabled=false;
		this.layerList=[this.map,this.scene,this.menu,this.win,this.top,this.guide,this.loading];
		this.addChild(this.map);
		this.addChild(this.scene);
		this.addChild(this.menu);
		this.addChild(this.win);
		this.addChild(this.top);
		this.addChild(this.guide);
		this.addChild(this.loading);
		this.addListen(SysCmd.ADD_TO_STAGE,this.show,this);
		this.addListen(SysCmd.REMOVE_FROM_STAGE,this.remove,this);
		//this.stage.addEventListener(KeyboardEvent.KEY_DOWN,keyDown);
		//this.stage.addEventListener(KeyboardEvent.KEY_UP,keyUp);
		//this.stage.addEventListener(Event.RESIZE,resize);
		//this.addChild(HoverTip.self);
		//this.addChild(Tips.self);
		//addChild(fps);
	}
	/**0地图,1场景，2云，3窗口，4菜单/公告 ，5引导，6进度条**/
	public getLayer(i:number):egret.Sprite{
		return this.layerList[i] as egret.Sprite;
	}
	/**添加显示对象，layer添加到指定层次，0地图,1场景，2云，3窗口，4菜单/公告 ，5进度条**/
	public show(event:string,obj:egret.DisplayObject,layer:number=3):void{
		if(layer==99){
			this.curWinName=obj.name;
			this.curWin=obj;
			obj.x=(this.stage.stageWidth-obj.width)/2;
			obj.y=(this.stage.stageHeight-obj.height)/2;
		}3
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