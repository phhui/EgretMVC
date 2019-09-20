class SoundHelper{
    static soundDict:Object={};
    static playList:Array<any>=[];
    static useSound:boolean=true;
    /**
     * name:资源名|资源URL
     * loops:播放次数
     * only：是否独占，若独占则会暂停所有当前正在播放的声音
     * startTime:开始播放位置
    */
    static play(name:string,loops:number=1){
        let sound:egret.Sound=ResMgr.getSound(name);
        if(!sound){
            console.log(name+" no find");
            return;
        }
        if(!SoundHelper.useSound){
            if(loops<=0)this.playList.push({name:name,c:null,s:sound});
            return;
        }
        let channel = sound.play(0,loops);
        if(loops<=0)this.playList.push({name:name,c:channel,s:sound});
    }
    static pause(name:string=null){
        for(let i:number=0;i<this.playList.length;i++){
            if(name){
                if(this.playList[i].name==name&&this.playList[i].c)this.playList[i].c.stop();
            }else{
                this.playList[i].c.stop();
            }
        }
    }
    static unpause(){
        for(let i:number=0;i<this.playList.length;i++){
            if(name){
                if(this.playList[i].name==name)this.playList[i].c.unpause();
            }else{
                this.playList[i].c.unpause();
            }
        }
    }
    static setSound(onOff:boolean){
        SoundHelper.useSound=onOff;
        for(let i:number=0;i<this.playList.length;i++){
            if(onOff){
                this.playList[i].c=this.playList[i].s.play();
            }else{
                if(this.playList[i].c)this.playList[i].c.stop();
            }
        }
    }
}