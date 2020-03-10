class UiHelper extends egret.DisplayObjectContainer{
    constructor() {
        super();
    }
    /**创建文本框     
     * color:颜色    
     * size:字体大小    
     * font:字体    
     * align:对齐方式    
     * bold:粗体    
     * name:名字    
     * x:    
     * y:    
     * width:    
     * height:    
     * visible:显示隐藏    
     * multiline:是否多行    
     * type:文本类别 input输入文本    
     * text:文本内容    
     * displayAsPassword:是否密码     
     * parent:父级    
    */
    static createTxt(param:Object): egret.TextField {
        var txt: egret.TextField = new egret.TextField();
        if (param["color"]) txt.textColor = param["color"];
        else txt.textColor = 0x000000;
        if (param["size"]) txt.size = param["size"];
        else txt.size = 12;
        if(param["font"])txt.fontFamily=param["font"];
        if (param["align"]) txt.textAlign = param["align"];
        if (param["bold"] != null) txt.bold = param["bold"];
        if (param["name"]) txt.name = param["name"];
        if (param["x"]) txt.x = param["x"];
        if (param["y"]) txt.y = param["y"];
        if (param["width"]) txt.width = param["width"];
        if (param["height"]) txt.height = param["height"];
        if (param["visible"] != null) txt.visible = param["visible"];
        //if (param["touchEnabled"] != null) txt.touchEnabled = param["touchEnabled"];
        if (param["multiline"] != null) txt.multiline = param["multilinet"];
        if (param["type"]) txt.type = param["type"];
        if (param["text"]) txt.text = param["text"];
        if(param["displayAsPassword"])txt.displayAsPassword=param["displayAsPassword"];
        if (param["parent"]) param["parent"].addChild(txt);
        return txt;
    }
    /**创建自定义文本框     
     * color:颜色    
     * size:字体大小    
     * font:字体    
     * align:对齐方式    
     * bold:粗体    
     * name:名字    
     * background:boolean是否显示背景    
     * backgroundcolor背景颜色      
     * border是否显示边框    
     * bordercolor边框颜色
     * tipText:提示文本    
     * x:    
     * y:    
     * width:    
     * height:    
     * visible:显示隐藏    
     * multiline:是否多行    
     * type:文本类别 input输入文本    
     * text:文本内容    
     * displayAsPassword:是否密码     
     * parent:父级    
    */
    static createMTxt(param:Object): PqTextField {
        var txt: PqTextField = new PqTextField();
        if (param["color"]) txt.textColor = param["color"];
        else txt.textColor = 0x000000;
        if (param["size"]) txt.size = param["size"];
        else txt.size = 12;
        if(param["font"])txt.fontFamily=param["font"];
        if (param["align"]) txt.textAlign = param["align"];
        if (param["bold"] != null) txt.bold = param["bold"];
        if (param["name"]) txt.name = param["name"];
        if (param["x"]) txt.x = param["x"];
        if (param["y"]) txt.y = param["y"];
        if (param["width"]) txt.width = param["width"];
        if (param["height"]) txt.height = param["height"];
        if (param["visible"] != null) txt.visible = param["visible"];
        //if (param["touchEnabled"] != null) txt.touchEnabled = param["touchEnabled"];
        if (param["multiline"] != null) txt.multiline = param["multilinet"];
        if (param["type"]) txt.type = param["type"];
        if (param["text"]) txt.text = param["text"];
        if (param["tipText"]) txt.tipText = param["tipText"];
        if (param["backGround"]) txt.background = param["backGround"];
        if (param["backGroundColor"]) txt.backgroundColor = param["backGroundColor"].replace("#","0x");
        if (param["border"]) txt.border = param["border"];
        if (param["borderColor"]) txt.borderColor = param["borderColor"];
        if(param["displayAsPassword"])txt.displayAsPassword=param["displayAsPassword"];
        if (param["parent"]) param["parent"].addChild(txt);
        return txt;
    }
    /**发光 */
    static stroke(obj:any,color:any,blur:number,strength:number){
        let n=new egret.GlowFilter(color,1,blur,blur,strength,100,!1,!1);
        obj.filters=[n]
    }
    /**描边 */
    static filter(obj:any,color:any=0xfffe3d, alpha:number=0.8, blurX:number=35, blurY:number=35,strength:number=2, quality:number=100, inner:boolean=false, knockout:boolean=false){
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,strength, quality, inner, knockout );
        obj.filters=[glowFilter];
    }
    /**去色 */
    static grayfilter(obj:any){
        var filter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3,0.6,0,0,0,0.3,0.6,0,0,0,0.3,0.6,0,0,0,0,0,0,1,0]) ;
        obj.filters=[filter];
    }
    /**取消滤镜/恢复颜色 */
    static unfilter(obj:any){
        obj.filters=[];
    }
		/**
		 *绘制矩形    
		 *  x 坐标    
		 *  y 坐标    
		 *  w 宽    
		 *  h 高    
		 *  border 边框大小    
		 *  borderColor 边框颜色    
		 *  backColor 填充颜色    
		 *  alpha 透明度    
		 * @return
		 *
		 */
    static createRect(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6): egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.drawRect(x, y, w, h);
        sp.graphics.endFill();
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawRect(x, y, w, h);
        }
        return sp;
	}
		/**
		 *绘制矩形    
		 *  x 坐标    
		 *  y 坐标    
		 *  w 宽    
		 *  h 高    
		 *  border 边框大小    
		 *  borderColor 边框颜色    
		 *  backColor 填充颜色    
		 *  alpha 透明度    
		 * @return
		 *
		 */
    static drawRect(sp:egret.Sprite,x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6){
        sp.graphics.clear();
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.drawRect(x, y, w, h);
        sp.graphics.endFill();
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawRect(x, y, w, h);
        }
	}
	/**
	 * 绘制圆角矩形    
	 *  x 坐标    
	 *  y 坐标    
	 *  w 宽度    
	 *  h 高度    
	 *  border 边框大小    
	 *  borderColor 边框颜色    
	 *  backColor 填充颜色    
	 *  alpha 透明度    
	 * @return
	 *
	 */
    static createRoundRect(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6, rangle: number= 20): egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
        sp.graphics.endFill();
        sp.cacheAsBitmap=true;
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
            sp.graphics.endFill();
        }
        return sp;
	}
	/**
	 * 绘制圆角矩形    
	 *  x 坐标    
	 *  y 坐标    
	 *  w 宽度    
	 *  h 高度    
	 *  border 边框大小    
	 *  borderColor 边框颜色    
	 *  backColor 填充颜色    
	 *  alpha 透明度    
	 * @return
	 *
	 */
    static drawRoundRect(sp:egret.Sprite,x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6, rangle: number= 20){
        sp.graphics.clear();
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
        sp.graphics.endFill();
        sp.cacheAsBitmap=true;
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
            sp.graphics.endFill();
        }
	}
	/**
	 *绘制圆    
	 *  x 圆心坐标    
	 *  y 圆心坐标    
	 *  radius 半径    
	 *  color 填充颜色    
	 *  border 边框大小    
	 *  borderColor 边框颜色    
	 *  alpha 透明度    
	 * @return
	 *
	 */
    static createCircle(x: number, y: number, radius: number, border: number = 0, borderColor: number = 0x000000, color: number = 0x333333, alpha: number= 1): egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(color, alpha);
        sp.graphics.drawCircle(x, y, radius);
        sp.graphics.endFill();
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawCircle(x, y, radius);
        }
        return sp;
	}
	/**
	 *绘制椭圆    
	 *  x 坐标    
	 *  y 坐标    
	 *  w 宽    
	 *  h 高    
	 *  color 颜色    
	 *  border 边框大小    
	 *  borderColor 边框颜色    
	 *  alpha 透明度    
	 * @return
	 *
	 */
    static createEllipse(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x000000, color: number= 0x333333, alpha: number= 1): egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(color, alpha);
        sp.graphics.drawEllipse(x, y, w, h);
        sp.graphics.endFill();
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawEllipse(x, y, w, h);
        }
        return sp;
	}
    static drawCurve(sp:egret.Sprite,color:number,x0:number,y0:number,x1:number,y1:number,x2:number,y2:number){
        sp.graphics.lineStyle(1,color,1);
        sp.graphics.moveTo(x0,y0);
        sp.graphics.curveTo(x1,y1,x2,y2);
    }
    /**绘制四边形    
     * pointList:梯形四个点坐标,顺序为【左上，右上，右下，左下】    
     * backColor:梯形背景颜色    
     * alpha:透明度    
     * border:边宽    
     * borderColor:边颜色    
     * borderAlpha:边透明度    
     * radiusX:X轴弯曲长度    
     * radiusY:Y轴弯曲长度    
     */
    static drawTrapezoid(sp:any,pointList:Array<egret.Point>,backColor: number= 0x999999, alpha: number= 0.6, border: number= 0, borderColor: number= 0x333333,borderAlpha:number=1,  radiusX: number= 20,radiusY:number=20){
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.lineStyle(border,borderColor,borderAlpha);
        sp.graphics.moveTo(pointList[0].x, pointList[0].y);
        sp.graphics.lineTo(pointList[1].x, pointList[1].y);
        sp.graphics.lineTo(pointList[2].x, pointList[2].y);
        sp.graphics.lineTo(pointList[3].x, pointList[3].y);
        sp.graphics.lineTo(pointList[0].x,pointList[0].y);
        sp.graphics.endFill();
        //return sp;
    }
    /**绘制圆角四边形    
     * pointList:梯形四个点坐标,顺序为【左上，右上，右下，左下】    
     * backColor:梯形背景颜色    
     * alpha:透明度    
     * border:边宽    
     * borderColor:边颜色    
     * borderAlpha:边透明度    
     * radiusX:X轴弯曲长度    
     * radiusY:Y轴弯曲长度    
     */
    static drawRoundTrapezoid(sp:any,pointList:Array<egret.Point>,backColor: number= 0x999999, alpha: number= 0.6, border: number= 0, borderColor: number= 0x333333,borderAlpha:number=1,  radiusX: number= 20,radiusY:number=20){
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.lineStyle(border,borderColor,borderAlpha);
        sp.graphics.moveTo(pointList[0].x, pointList[0].y+radiusY);
        sp.graphics.curveTo(pointList[0].x,pointList[0].y,pointList[0].x+radiusX,pointList[0].y);
        sp.graphics.lineTo(pointList[1].x-radiusX, pointList[1].y);
        sp.graphics.curveTo(pointList[1].x, pointList[1].y, pointList[1].x, pointList[1].y+radiusY);
        sp.graphics.lineTo(pointList[2].x, pointList[2].y-radiusY);
        sp.graphics.curveTo(pointList[2].x, pointList[2].y, pointList[2].x-radiusX, pointList[2].y);
        sp.graphics.lineTo(pointList[3].x+radiusX, pointList[3].y);
        sp.graphics.curveTo(pointList[3].x, pointList[3].y, pointList[3].x, pointList[3].y-radiusY);
        sp.graphics.lineTo(pointList[0].x,pointList[0].y+radiusY);
        sp.graphics.endFill();
        //return sp;
    }
}