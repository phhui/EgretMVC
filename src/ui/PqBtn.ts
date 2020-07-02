class PqBtn extends egret.Sprite{
    private _selected:boolean=false;
    private _defSkin:string;
    private _selectedSkin:string;
    private _curStatus:number=0;
    public _status:Array<string>=[];
    private _childList:Object={};
    constructor(){
        super();
    }
    public get selected():boolean{
        return this._selected;
    }
    public set selected(value:boolean){
        this._selected=value;
        if(this._selectedSkin&&value&&this._childList[this._selectedSkin]){
            this.removeChildren();
            this.addChild(this._childList[this._selectedSkin]);
        }else if(this._defSkin&&this._childList[this._defSkin]){
            this.removeChildren();
            this.addChild(this._childList[this._defSkin]);
        }
    }
    public set status(value:string){
        if(!this._childList[value])throw new Error("按钮"+this.name+"中未设置状态样式"+value);
        this.removeChildren();
        this.addChild(this._childList[value]);
    }
    public set defSkin(value:string){
        this._defSkin=value;
    }
    public set selectSkin(value:string){
        this._selectedSkin=value;
    }
    private addStatus(name:string,child:egret.DisplayObject){
        this._childList[name]=child;
        this._status.push(name);
    }
    public addChild(child: egret.DisplayObject): egret.DisplayObject{
        super.addChild(child);
        this.addStatus(child.name,child);
        return child;
    }
}