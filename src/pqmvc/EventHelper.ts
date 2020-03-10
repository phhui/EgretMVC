class EventHelper{
    static listenList:Object={};
    static addListener(key:string,func:Function,target:any){
        if(EventHelper.checkRepeat(key,func,target))throw new Error(key+"已有监听存在！");
        if(this.listenList[key]){
            this.listenList[key].push({key:key,func:func,target:target});
        }else this.listenList[key]=[{key:key,func:func,target:target}];
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
                    if(obj.key==key&&obj.target===target)this.listenList[key][i]=null;
                }
            }else if(this.listenList[key].length>1){
                throw new Error("事件【"+key+"】存在多个监听，请指定监听函数进行删除");
            }else this.listenList[key]=null;
        }
        let j:number=0;
        while(j<this.listenList[key].length){
            if(this.listenList[key][j]==null)this.listenList[key].splice(j,1);
            j++;
        }
    }
    static call(key:string,...args){
        args.unshift(key);
        if(this.listenList[key]){
            let list=this.listenList[key];
            for(let i:number=0;i<list.length;i++){
                let obj:any=list[i];
                obj.func.apply(obj.target,args);
            }
        }else{
            console.log("系统中没有针对"+key+"事件的监听！");
            //throw new Error("系统中没有针对"+key+"事件的监听！");
        }
    }
    static send(e: any, eventType: Array<any>, func: Array<any>, target: any) {
        var n: number = eventType.length;
        for (var i: number = 0; i < n; i++) {
            if (e.target.name == eventType[i]) {
                func[i].apply(target, [eventType[i], e]);
                return;
            }
        }
	}
}