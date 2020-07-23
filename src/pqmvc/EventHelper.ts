class EventHelper{
    static listenList:Object={};
    static _objPool:Array<any>=[];
    static once(key:string,func:Function,target:any){
        this._listener(key,func,target,true);
    }
    static addListener(key:string,func:Function,target:any){
        this._listener(key,func,target);
    }
    static _listener(key:string,func:Function,target:any,once:boolean=false){
        if(EventHelper.checkRepeat(key,func,target))throw new Error(key+"已有监听存在！");
        if(this.listenList[key]){
            this.listenList[key].push(this._newObj(key,func,target,once));
        }else this.listenList[key]=[this._newObj(key,func,target,once)];
    }
    static checkRepeat(key:string,func:Function,target:any){
        if(!this.listenList[key])return false;
        for(let i:number=0;i<this.listenList[key].length;i++){
            let obj:any=this.listenList[key][i];
            if(obj.key==key&&obj.target===target)return true;
        }
        return false;
    }
    static sys_clear_all_listen(){
        EventHelper.listenList={};
    }
    static remove(key:string,func:Function=null,target:any=null){
        if(this.listenList[key]){
            if(target){
                for(let i:number=0;i<this.listenList[key].length;i++){
                    let obj:any=this.listenList[key][i];
                    if(obj.key==key&&obj.target===target){
                        this.listenList[key][i]=null;
                        this.listenList[key].splice(i,1);
                    }
                }
            }else if(this.listenList[key].length>1){
                throw new Error("事件【"+key+"】存在多个监听，请指定监听函数进行删除");
            }else this.listenList[key]=null;
        }
    }
    static call(key:string,...args){
        args.unshift(key);
        if(this.listenList[key]){
            let list=this.listenList[key];
            for(let i:number=0;i<list.length;i++){
                let obj:any=list[i];
                obj.func.apply(obj.target,args);
                if(obj.once){
                    this._freeObj(obj);
                    this.listenList[key][i]=null;
                    this.listenList[key].splice(i,1);
                }
            }
        }else{
            //console.log("系统中没有针对"+key+"事件的监听！");
            //throw new Error("系统中没有针对"+key+"事件的监听！");
        }
    }
    static send(e: any, eventType: Array<any>, func: Array<any>, target: any) {
        var n: number = eventType.length;
        for (var i: number = 0; i < n; i++) {
            if ((typeof(eventType[i])=="string"&&e.target.name == eventType[i])||(typeof(eventType[i])=="object"&&e.target==eventType[i])) {
                func[i].apply(target, [eventType[i], e]);
                return;
            }
        }
	}

    static _newObj(key:string,func:Function,target:any,once:boolean=false){
        let obj;
        if(this._objPool.length){
            obj=this._objPool.shift();
            obj.key=key;
            obj.func=func;
            obj.target=target;
            obj.once=once;
        }
        else obj={key:key,func:func,target:target,once:once};
        return obj;
    }
    static _freeObj(obj){
        obj.key=null;
        obj.func=null;
        obj.target=null;
        obj.once=null;
        this._objPool.push(obj);
    }
}
