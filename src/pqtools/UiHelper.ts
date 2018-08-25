class UiHelper extends egret.DisplayObjectContainer{
	static self: UiHelper = new UiHelper();
    constructor() {
        super();
    }
    public createTxt(param:Object): egret.TextField {
        var txt: egret.TextField = new egret.TextField();
        if (param["color"]) txt.textColor = param["color"];
        else txt.textColor = 0x000000;
        if (param["size"]) txt.size = param["size"];
        else txt.size = 12;
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
}