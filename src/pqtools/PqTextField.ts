class PqTextField extends egret.Sprite{
    private txt:egret.TextField;
    private bg:egret.Sprite;
    private tipTxt:egret.TextField;
    private tipStr:string="";
    private _border:boolean=true;
    private _borderColor:number=0xffffff;
    private _backColor:number=0x666666;
    constructor(){
        super();
        this.bg=new egret.Sprite();
        this.tipTxt=new egret.TextField();
        this.txt=new egret.TextField();
        this.addChild(this.bg);
        this.addChild(this.tipTxt);
        this.addChild(this.txt);
        this.bg.visible=false;
        this.bg.x=-10;
        this.bg.y=-10;
        this.bg.cacheAsBitmap=true;
        this.tipTxt.textColor=0x999999;
        this.txt.cacheAsBitmap=true;
        this.txt.addEventListener(egret.TextEvent.CHANGE,this.updateText,this);
    }
    private updateText(e:egret.TextEvent){
        this.tipTxt.text=(this.txt.text.length>0?"":this.tipStr);
    }
    private updateBg(){
        UiHelper.drawRoundRect(this.bg,0,0,this.txt.width+20,this.txt.height+10,this._border?0.5:0,this._borderColor,this._backColor,1,25);
    }
    public set tipText(value:string){
        this.tipTxt.text=value;
        this.tipStr=value;
    }
    public set width(value:number){
        this.txt.width=value;
        this.tipTxt.width=value;
        this.updateBg();
    }
    public set height(value:number){
        this.txt.height=value;
        this.tipTxt.height=value;
        this.updateBg();
    }
    public set background(value:boolean){
        this.bg.visible=value;
    }

    public set backgroundColor(value:number){
        this._backColor=value;
        this.updateBg();
    }

    public set bold(value:boolean){
        this.txt.bold=value;
    }

    public set border(value:boolean){
        this._border=value;
    }

    public set borderColor(value:number){
        this._borderColor=value;
        this.updateBg();
    }

    public set displayAsPassword(value:boolean){
        this.txt.displayAsPassword=value;
    }

    public set fontFamily(value:string){
        this.txt.fontFamily=value;
    }

    public set inputType(value:string){
        this.txt.inputType=value;
    }

    public set italic(value:boolean){
        this.txt.italic=value;
    }

    public set lineSpacing(value:number){
        this.txt.lineSpacing=value;
    }

    public set maxChars(value:number){
        this.txt.maxChars=value;
    }

    public get maxScrollV(){
        return this.txt.maxScrollV;
    }

    public set multiline(value:boolean){
        this.txt.multiline=value;
    }

    public get numLines(){
        return this.txt.numLines;
    }

    public set restrict(value:string){
        this.txt.restrict=value;
    }

    public set scrollV(value:number){
        this.txt.scrollV=value;
    }

    public set size(value:number){
        this.txt.size=value;
        this.tipTxt.size=value;
    }

    public set stroke(value:number){
        this.txt.stroke=value;
    }

    public set strokeColor(value:number){
        this.txt.strokeColor=value;
    }

    public set text(value:string){
        this.txt.text=value||"";
        this.tipTxt.text=(value.length>0?"":this.tipStr);
    }
    public get text(){
        return this.txt.text;
    }

    public set textAlign(value:string){
        this.txt.textAlign=value;
        this.tipTxt.textAlign=value;
    }
    public set textColor(value:number){
        this.txt.textColor=value;
    }

    public set textFlow(value:Array<any>){
        this.txt.textFlow=value;
    }

    public get textHeight(){
        return this.txt.textHeight;
    }

    public get textWidth(){
        return this.txt.textWidth;
    }

    public set type(value:string){
        this.txt.type=value;
    }
    public set verticalAlign(value:string){
        this.txt.verticalAlign=value;
    }
    public set rotation(value:number){
        this.txt.rotation=value;
    }
    public set filters(value:Array<any>){
        this.txt.filters=value;
    }
    public set cacheAsBitmap(value:boolean){
        this.txt.cacheAsBitmap=value;
    }
    public set wordWrap(value:boolean){
        this.txt.wordWrap=value;
    }
}