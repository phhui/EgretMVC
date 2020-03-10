class SoundHelper{
    static soundDict:Object={};
    static playList:Array<any>=[];
    /**使用音乐 */
    static musicEff:boolean=true;
    /**音效 */
    static soundEff:boolean=true;
    /**使用音效 */
    static useSound:boolean=true;
    /**
     * name:资源名|资源URL
     * loops:播放次数
    */
    static play(name:string,loops:number=1){
        let sound:egret.Sound=ResMgr.getSound(name);
        if(!sound){
            console.log(name+" no find");
            return;
        }
        
        if(loops<=0){
            this.playList.push({name:name,c:SoundHelper.useSound&&SoundHelper.musicEff?sound.play(0,loops):null,s:sound});
        }else if(SoundHelper.useSound){
            if(!SoundHelper.soundEff)return;
            else sound.play(0,loops);
        }
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
    static setSoundEff(onOff:boolean){
        SoundHelper.soundEff=onOff;
    }
    static setMusicEff(onOff:boolean){
        SoundHelper.musicEff=onOff;
        SoundHelper.stopMusic(onOff);
    }
    /**设置声音，包括音乐和音效 */
    static setSound(onOff:boolean){
        SoundHelper.useSound=onOff;
        SoundHelper.stopMusic(onOff);
    }
    static stopMusic(onOff:boolean){
        for(let i:number=0;i<this.playList.length;i++){
            if(onOff){
                this.playList[i].c=this.playList[i].s.play();
            }else{
                if(this.playList[i].c)this.playList[i].c.stop();
            }
        }
    }
}