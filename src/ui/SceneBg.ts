class SceneBg extends egret.Sprite{
    private mapsItem:egret.Bitmap;
    private mapsInfo:egret.Rectangle;
    private w:number;
    private h:number;
    private row:number;
    private col:number;
    private gridDict:Object={};
    private keyDict:Array<string>=new Array<string>();
    private keyStr:string="";
    constructor(){
        super();
        this.touchEnabled=true;
        this.touchChildren=false;
    }
    public init(img:egret.Bitmap,rect:egret.Rectangle){
        if(!this.stage)throw new Error("请先添加反舞台再初始化。");
        if(this.mapsItem){
            throw new Error("已初始化");
        }else{
            this.mapsItem=img;
            this.mapsInfo=rect;
            this.col=Math.ceil(this.stage.stageWidth/this.mapsInfo.width);
            this.row=Math.ceil(this.stage.stageHeight/this.mapsInfo.height);
            this.update();
        }
    }
    public update(){
        let newKey:Array<string>=new Array<string>();
        let newKeyStr:string="";
        let startx:number=Math.round(this.x/this.mapsInfo.width);
        let starty:number=Math.round(this.y/this.mapsInfo.height);
        console.log(this.x+"********"+this.mapsInfo.width);
        console.log("起始索引》》》"+startx+"---"+starty);
        for(let i:number=0;i<this.row;i++){
            for(let j:number=0;j<this.col;j++){
                let x:number=i-startx;
                let y:number=j-starty;
                newKey.push(x.toString()+"-"+y.toString());
                let key:string="|"+x.toString()+"-"+y.toString()+"|";
                newKeyStr+=key;
                if(this.keyStr.indexOf(key)==-1){
                    console.log("找不到>>>"+key);
                    let sp:egret.Sprite=this.createItem(x*this.mapsInfo.width,y*this.mapsInfo.height);
                    this.gridDict[x+"-"+y]=sp;
                }
            }
        }
        for(let k:number=0;k<this.keyDict.length;k++){
            if(newKeyStr.indexOf("|"+this.keyDict[k]+"|")==-1){
                console.log("移除>>>>>"+this.keyDict[k]);
                this.gridDict[this.keyDict[k]].parent.removeChild(this.gridDict[this.keyDict[k]]);
                this.gridDict[this.keyDict[k]]=null;
            }
        }
        this.keyDict=newKey;
        this.keyStr=newKeyStr;
    }
    private createItem(x:number,y:number):egret.Sprite{
        let sp:egret.Sprite=new egret.Sprite();
        var bm:egret.Bitmap=new egret.Bitmap(this.mapsItem.texture);
        sp.addChild(bm);
        bm.x=0-this.mapsInfo.x;
        bm.y=0-this.mapsInfo.y;
        sp.x=x;
        sp.y=y;
        this.addChild(sp);
        return sp;
    }
}