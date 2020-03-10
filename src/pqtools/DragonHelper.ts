class DragonHelper{
    static createdb(res, root): dragonBones.EgretArmatureDisplay {
        let dragonbonesData = RES.getRes(res + "_ske");
        let textureData = RES.getRes(res + "_tex");
        let texture = RES.getRes(res + "_png");
        let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);
        let egretarmaturedisplay = egretFactory.buildArmatureDisplay(root);
        egretarmaturedisplay.armature.cacheFrameRate = 24;
        return egretarmaturedisplay;
    }
}