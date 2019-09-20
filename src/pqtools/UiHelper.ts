class UiHelper extends egret.DisplayObjectContainer{
    constructor() {
        super();
    }
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
        if (param["parent"]) param["parent"].addChild(txt);
        if (param["type"]) txt.type = param["type"];
        if (param["text"]) txt.text = param["text"];
        if (param["parent"]) param["parent"].addChild(txt);
        return txt;
    }
    static stroke(obj:any,color:any,blur:number,strength:number){
        let n=new egret.GlowFilter(color,1,blur,blur,strength,100,!1,!1);
        obj.filters=[n]
    }
    static filter(obj:any,color:any=0xfffe3d, alpha:number=0.8, blurX:number=35, blurY:number=35,strength:number=2, quality:number=100, inner:boolean=false, knockout:boolean=false){
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,strength, quality, inner, knockout );
        obj.filters=[glowFilter];
    }
    static grayfilter(obj:any){
        var filter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3,0.6,0,0,0,0.3,0.6,0,0,0,0.3,0.6,0,0,0,0,0,0,1,0]) ;
        obj.filters=[filter];
    }
    static unfilter(obj:any){
        obj.filters=[];
    }
    /**重绘图形 */
    static reDraw(sp:egret.Sprite,color:any,alpha:number,x:number,y:number,w:number,h:number){
        sp.graphics.clear();
        sp.graphics.beginFill(color,alpha);
        sp.graphics.drawRect(x,y,w,h);
        sp.graphics.endFill();
    }
		/**
		 *绘制矩形
		 * @param x 坐标
		 * @param y 坐标
		 * @param w 宽
		 * @param h 高
		 * @param border 边框大小
		 * @param borderColor 边框颜色
		 * @param backColor 填充颜色
		 * @param alpha 透明度
		 * @return
		 *
		 */
    static drawRect(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6): egret.Sprite{
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
	 * 绘制圆角矩形
	 * @param x 坐标
	 * @param y 坐标
	 * @param w 宽度
	 * @param h 高度
	 * @param border 边框大小
	 * @param borderColor 边框颜色
	 * @param backColor 填充颜色
	 * @param alpha 透明度
	 * @return
	 *
	 */
    static drawRoundRect(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x333333, backColor: number= 0x999999, alpha: number= 0.6, rangle: number= 20): egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(backColor, alpha);
        sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
        sp.graphics.endFill();
        if (border != 0) {
            sp.graphics.lineStyle(border, borderColor, alpha);
            sp.graphics.drawRoundRect(x, y, w, h, rangle, rangle);
            sp.graphics.endFill();
        }
        return sp;
	}
	/**
	 *绘制圆
	 * @param x 圆心坐标
	 * @param y 圆心坐标
	 * @param radius 半径
	 * @param color 填充颜色
	 * @param border 边框大小
	 * @param borderColor 边框颜色
	 * @param alpha 透明度
	 * @return
	 *
	 */
    static drawCircle(x: number, y: number, radius: number, border: number = 0, borderColor: number = 0x000000, color: number = 0x333333, alpha: number= 1): egret.Sprite{
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
	 * @param x 坐标
	 * @param y 坐标
	 * @param w 宽
	 * @param h 高
	 * @param color 颜色
	 * @param border 边框大小
	 * @param borderColor 边框颜色
	 * @param alpha 透明度
	 * @return
	 *
	 */
    static drawEllipse(x: number, y: number, w: number, h: number, border: number= 0, borderColor: number= 0x000000, color: number= 0x333333, alpha: number= 1): egret.Sprite{
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