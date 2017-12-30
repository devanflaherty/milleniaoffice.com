var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DebugGui;
(function (DebugGui) {
    var $el = $("#debug-window");
    var traceLine = "";
    var logLines = "";
    var updateText = function () {
        if ($el) {
            $el.html(traceLine + "<br>" + logLines);
        }
    };
    DebugGui.log = function (l) {
        logLines += (l + "<br>");
        updateText();
    };
    DebugGui.trace = function (l) {
        traceLine = l;
        updateText();
    };
})(DebugGui || (DebugGui = {}));
/** Gyro camera with touch-controlled yaw. Only use with the gyro-enabled devices. */
var GyroTouchCamera = (function (_super) {
    __extends(GyroTouchCamera, _super);
    function GyroTouchCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentTouchRot = new BABYLON.Quaternion();
        _this.cumulativeTouchRot = BABYLON.Quaternion.RotationAxis(BABYLON.Vector3.Up(), Utils.Deg2Rad * 0.0);
        _this._sensibility = -1.0;
        return _this;
    }
    Object.defineProperty(GyroTouchCamera.prototype, "sensibility", {
        set: function (s) {
            this._sensibility = -s;
        },
        enumerable: true,
        configurable: true
    });
    /** Forces the camera's rotation to another value (yaw / vertical axis only) */
    GyroTouchCamera.prototype.setYaw = function (yaw) {
        var currentGyroYaw = this.rotationQuaternion.toEulerAngles().y;
        // DebugGui.log("From normal to gyro: Gyro  yaw:" + currentGyroYaw + " normal cam yaw: " + yaw)
        this.cumulativeTouchRot = BABYLON.Quaternion.RotationAxis(BABYLON.Vector3.Up(), yaw - currentGyroYaw);
        ;
    };
    GyroTouchCamera.prototype._checkInputs = function () {
        _super.prototype._checkInputs.call(this);
        BABYLON.Quaternion.RotationAxisToRef(BABYLON.Vector3.Up(), this._sensibility * this.cameraRotation.y, this.currentTouchRot);
        this.cumulativeTouchRot.multiplyToRef(this.currentTouchRot, this.cumulativeTouchRot);
        this.cumulativeTouchRot.multiplyToRef(this.rotationQuaternion, this.rotationQuaternion);
    };
    return GyroTouchCamera;
}(BABYLON.DeviceOrientationCamera));
var MOApp;
(function (MOApp) {
    MOApp.Paths = {};
    MOApp.Paths.root = "";
    MOApp.Paths.gui = MOApp.Paths.root + "assets/gui/";
    MOApp.Paths.panoramas = MOApp.Paths.root + "assets/panos/";
    MOApp.Paths.shaders = MOApp.Paths.root + "assets/shaders/";
    MOApp.main = function () {
        NKDevice.detectGyroscope();
        NKGuiManager.init();
        SceneManager.init("pano-canvas");
        VeuxView.init();
        NKHotspotManager.init("pano-hotspot-container");
        ProgressBar.init();
        NKStateMachine.init();
        NKCampusManager.init("pano-campus-container");
        NKMapView.init("pano-map");
        VeuxView.setTint(0);
        MOApp.homePanorama = VeuxData.getPano(0);
        SceneManager.setActive(true);
        // Set initial visibility.
        NKGuiManager.$welcome.hide();
        NKGuiManager.$backButton.hide();
        NKMapView.$container.hide();
        NKHotspotManager.setVisible(false, false);
        NKCampusManager.setVisible(false, false);
        NKStateMachine.changeState(NKStateMachine.STATE_WELCOME);
        if (NKDevice.isIOS) {
            NKGuiManager.$fsButton.hide();
        }
        else {
            NKGuiManager.fsToogle.onToggleEvent.addListener(OnFullScreen);
        }
    };
    var OnHotspot = function (panoName) {
        VeuxView.setPanorama(VeuxData.getPanoByTitle(panoName));
    };
    var OnFullScreen = function (onoff) {
        window.parent.goFullScreen(onoff);
    };
})(MOApp || (MOApp = {}));
$(document).ready(MOApp.main);
function UpdateFSButton() {
    NKGuiManager.fsToogle.setValue(false, false);
}
// 
/** Scene manager preloads assets, creates scene/engine, and manages device orientation change.
 * This class is only used by AppManager.
 */
var SceneManager;
(function (SceneManager) {
    var ________public_vars________;
    SceneManager.FOV_WIDE = 1.5;
    SceneManager.FOV_NORMAL = 1.15;
    /** Is the view active, does it render and update? */
    SceneManager.isActive = false;
    SceneManager.userWantsGyro = true;
    var ________private_vars________;
    var arcCam;
    var gyroCam;
    var freeCam;
    var canvas;
    var $canvas;
    var checkViewSizeInterval;
    var camRotation = BABYLON.Vector3.Zero();
    var renderW, renderH, renderScaling;
    var canvasW, canvasH, oldCanvasW, oldCanvasH;
    var ________public_methods________;
    /** Creates the scene  and preloads assets. */
    SceneManager.init = function (canvasId) {
        SceneManager.onRender = new NKLiteEvent();
        canvas = document.getElementById(canvasId);
        $canvas = $(canvas);
        SceneManager.engine = new BABYLON.Engine(canvas, false);
        SceneManager.scene = new BABYLON.Scene(SceneManager.engine);
        SceneManager.scene.clearColor = new BABYLON.Color3(0, 0, 0);
        // Cameras
        freeCam = new BABYLON.FreeCamera("freeCam", BABYLON.Vector3.Zero(), SceneManager.scene);
        freeCam.inputs.clear();
        freeCam.inputs.addMouse();
        freeCam.angularSensibility = -2 * freeCam.angularSensibility;
        freeCam.attachControl(canvas, true);
        if (NKDevice.isMobile) {
            gyroCam = new GyroTouchCamera("gyroCam", BABYLON.Vector3.Zero(), SceneManager.scene);
            gyroCam.sensibility = 1.5;
            gyroCam.attachControl(canvas, true);
        }
        SceneManager.scene.activeCamera = null;
        // Set free camera on by default.
        SceneManager.setGyroActive(false);
        // setFOV( NKDevice.isMobile ? 1 : 1.2);
        SceneManager.setFOV(SceneManager.FOV_WIDE);
        // Set update loop
        SceneManager.engine.runRenderLoop(onUpdate);
        $(window).resize(onResize);
        onResize();
        // Init render.
        SceneManager.scene.render();
    };
    /** Defines whether scene will render and camera check apply. */
    SceneManager.setActive = function (onoff) {
        SceneManager.isActive = onoff;
    };
    var oldGyroYaw = -9999;
    var gyroEuler = BABYLON.Vector3.Zero();
    var gyroExtraEuler = BABYLON.Vector3.Zero();
    SceneManager.setGyroActive = function (isGyroOn) {
        SceneManager.userWantsGyro = isGyroOn;
        isGyroOn = isGyroOn && (NKDevice.isMobile && NKDevice.hasGyro);
        if (isGyroOn) {
            if (SceneManager.scene.activeCamera != gyroCam) {
                SceneManager.scene.activeCamera = gyroCam;
                gyroCam._checkInputs();
                gyroCam.rotationQuaternion.toEulerAnglesToRef(gyroEuler);
                gyroCam.cumulativeTouchRot.toEulerAnglesToRef(gyroExtraEuler);
                gyroCam.cameraRotation.x = 0;
                gyroCam.cameraRotation.y = 0;
                freeCam.cameraRotation.y = 0;
                freeCam.cameraRotation.x = 0;
                if (oldGyroYaw != -9999) {
                    gyroExtraEuler.y += (oldGyroYaw - gyroEuler.y) - (oldGyroYaw - freeCam.rotation.y);
                }
                BABYLON.Quaternion.RotationAxisToRef(BABYLON.Vector3.Up(), gyroExtraEuler.y, gyroCam.cumulativeTouchRot);
                gyroCam.update();
            }
            else {
                DebugGui.log("Gyro camera is already active!");
            }
        }
        else {
            if (SceneManager.scene.activeCamera != freeCam) {
                if (gyroCam) {
                    gyroCam.rotationQuaternion.toEulerAnglesToRef(gyroEuler);
                    freeCam.rotation.y = gyroEuler.y;
                    freeCam.rotation.x = gyroEuler.x;
                    gyroCam.cameraRotation.x = 0;
                    gyroCam.cameraRotation.y = 0;
                    freeCam.cameraRotation.y = 0;
                    freeCam.cameraRotation.x = 0;
                    oldGyroYaw = gyroEuler.y;
                }
                SceneManager.scene.activeCamera = freeCam;
            }
        }
    };
    SceneManager.setFOV = function (fov) {
        freeCam.fov = fov;
        if (gyroCam)
            gyroCam.fov = fov;
    };
    SceneManager.setFOVMode = function (fovMode) {
        freeCam.fovMode = fovMode;
        if (gyroCam)
            gyroCam.fovMode = fovMode;
    };
    SceneManager.resetCamera = function (axis) {
        if (axis === void 0) { axis = BABYLON.Axis.Y; }
        if (SceneManager.scene.activeCamera == gyroCam) {
            // Gyrocam will mess up if we try to reset X axis.
            if (axis == BABYLON.Axis.Y) {
                gyroCam.resetToCurrentRotation(axis);
            }
            gyroCam.cumulativeTouchRot = BABYLON.Quaternion.Identity();
        }
        else {
            if (axis == BABYLON.Axis.Y) {
                freeCam.rotation.y = 0;
            }
            else {
                freeCam.rotation.x = 0;
            }
        }
    };
    SceneManager.setXAngle = function (xangle) {
        console.log("Set X Angle!");
        if (SceneManager.scene.activeCamera == freeCam) {
            console.log("\tSetting it!");
            freeCam.rotation.x = xangle * Utils.Deg2Rad;
        }
    };
    /** Nudges the camera to rotate it a little bit; abstract units provided. */
    SceneManager.nudgeCamera = function (amount) {
        SceneManager.scene.activeCamera.cameraRotation.y = .01 * amount;
    };
    var dir;
    /** Returns camera yaw (rotation around vertical axis) in radians. */
    SceneManager.getCameraYaw = function () {
        dir = SceneManager.scene.activeCamera.getTarget().normalize();
        return Math.atan2(dir.x, dir.z);
    };
    SceneManager.getCanvas = function () {
        return $canvas;
    };
    SceneManager.createDebugBox = function (pos) {
        var box = BABYLON.Mesh.CreateBox("box", 0.2, SceneManager.scene);
        box.position.copyFrom(pos);
    };
    var offScreenPos = new BABYLON.Vector3(-1000, -1000, 0);
    var frustrumPlanes;
    SceneManager.getScreenCoordinate = function (pos3D) {
        dir = SceneManager.scene.activeCamera.getDirection(BABYLON.Vector3.Forward()).normalize();
        pos3D = pos3D.normalize();
        dir = dir.subtractInPlace(pos3D);
        if (Math.abs(dir.length()) > 1.4) {
            return offScreenPos;
        }
        return BABYLON.Vector3.Project(pos3D, BABYLON.Matrix.Identity(), SceneManager.scene.getTransformMatrix(), SceneManager.scene.activeCamera.viewport.toGlobal(renderW, renderH))
            .scaleInPlace(renderScaling);
    };
    var ________private_methods________;
    /** Renders the scene every frame (when active) */
    var onUpdate = function () {
        if (SceneManager.isActive) {
            canvasW = $canvas.width();
            canvasH = $canvas.height();
            if (canvasW != oldCanvasW || canvasH != oldCanvasH) {
                onResize();
            }
            SceneManager.onRender.invoke();
            SceneManager.scene.render();
            oldCanvasH = canvasH;
            oldCanvasW = canvasW;
            // frustrumPlanes = BABYLON.Frustum.GetPlanes(scene.getTransformMatrix());
            // Debug
            // let s:string = "CAM NAME: " + scene.activeCamera.name + ", YAW:" + Utils.ToDegString(getCameraYaw());
            // if (gyroCam) {
            // 	s += "<br>GYRO ROT Y:" + (Utils.Rad2Deg * gyroCam.rotationQuaternion.toEulerAngles().y).toFixed(2) + "<br>GYRO TCH:" + (Utils.Rad2Deg * gyroCam.cumulativeTouchRot.toEulerAngles().y).toFixed(2);
            // }
            // DebugGui.trace(s);
        }
    };
    /** Checks for window resize, AND orientation change.*/
    var onResize = function () {
        SceneManager.engine.resize();
        renderScaling = SceneManager.engine.getHardwareScalingLevel();
        renderW = SceneManager.engine.getRenderWidth();
        renderH = SceneManager.engine.getRenderHeight();
        SceneManager.setFOVMode(!NKDevice.isLandscape() ? BABYLON.Camera.FOVMODE_VERTICAL_FIXED : BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED);
    };
})(SceneManager || (SceneManager = {}));
var Utils;
(function (Utils) {
    Utils.Rad2Deg = 180.0 / Math.PI;
    Utils.Deg2Rad = 1.0 / Utils.Rad2Deg;
    Utils.SetCoordinatesFromRadial = function (ath, atv, dist, result) {
        result.y = dist * Math.sin(Utils.Deg2Rad * atv);
        var proj = dist * Math.cos(Utils.Deg2Rad * atv);
        result.x = proj * Math.cos(Utils.Deg2Rad * ath);
        result.z = proj * Math.sin(Utils.Deg2Rad * ath);
    };
    Utils.ToDegString = function (n, decimals) {
        if (decimals === void 0) { decimals = 2; }
        return (Utils.Rad2Deg * n).toFixed(decimals);
    };
})(Utils || (Utils = {}));
var VeuxData;
(function (VeuxData) {
    var Data = (function () {
        function Data() {
        }
        return Data;
    }());
    VeuxData.Data = Data;
    VeuxData.defaultPano = new Data();
    VeuxData.defaultPano.title = "";
    VeuxData.defaultPano.image = "Default.jpg";
    VeuxData.defaultPano.sizeKB = 150;
    VeuxData.defaultPano.initYaw = 0;
    var panosPerFolder = {};
    for (var i = 0; i < PanoData.length; i++) {
        if (panosPerFolder[PanoData[i].folder] == null) {
            panosPerFolder[PanoData[i].folder] = new Array();
        }
        panosPerFolder[PanoData[i].folder].push(PanoData[i]);
    }
    VeuxData.getPanoByTitle = function (panoTitle) {
        for (var i = 0; i < PanoData.length; i++) {
            if (PanoData[i].title == panoTitle) {
                return PanoData[i];
            }
        }
        return null;
    };
    VeuxData.getPanoIndex = function (panoTitle) {
        for (var i = 0; i < PanoData.length; i++) {
            if (PanoData[i].title == panoTitle) {
                return i;
            }
        }
        return -1;
    };
    VeuxData.getPano = function (panoIndex) {
        return PanoData[panoIndex];
    };
    VeuxData.getPanoCount = function () {
        return PanoData.length;
    };
    VeuxData.getFolderCount = function (folderName) {
        return panosPerFolder[folderName].length;
    };
})(VeuxData || (VeuxData = {}));
// NOTE: Trying asset manager.
var VeuxView;
(function (VeuxView) {
    VeuxView.currentPanoFileName = "";
    VeuxView.currentPanoTitle = "";
    var MobileFolder = "mobile/";
    var ShaderParamTint = "multiplier";
    var ShaderParamTexture = "texture";
    var material;
    var texture;
    var model;
    var tint = 1;
    var fadeDimmed;
    var initPanoAngle;
    var isLowQuality;
    var mobileFolderAddition;
    var assetManager;
    var samplingMode;
    function ________public_methods________() { }
    VeuxView.init = function () {
        isLowQuality = NKDevice.isMobile && !NKDevice.isTablet;
        mobileFolderAddition = isLowQuality ? MobileFolder : "";
        VeuxView.onPanoChangeStart = new NKLiteEvent();
        VeuxView.onPanoChangeFinish = new NKLiteEvent();
        VeuxView.onPanoLoadingProgress = new NKLiteEvent();
        VeuxView.onPanoLoadedEvent = new NKLiteEvent();
        model = BABYLON.MeshBuilder.CreateSphere("panoSphere", { segments: 64, diameter: 10 }, SceneManager.scene);
        BABYLON.Engine.ShadersRepository = MOApp.Paths.shaders;
        var shaderOptions = {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "multiplier", "texture"]
        };
        material = new BABYLON.ShaderMaterial("panoMat", SceneManager.scene, "panorama", shaderOptions);
        material.backFaceCulling = false;
        VeuxView.setTint(0);
        model.material = material;
        assetManager = new BABYLON.AssetsManager(SceneManager.scene);
        assetManager.useDefaultLoadingScreen = false;
        samplingMode = NKDevice.isMobile ? BABYLON.Texture.BILINEAR_SAMPLINGMODE : BABYLON.Texture.TRILINEAR_SAMPLINGMODE;
    };
    VeuxView.setPanorama = function (panoData, dimmed) {
        if (dimmed === void 0) { dimmed = false; }
        if (panoData.title != VeuxView.currentPanoTitle) {
            VeuxView.onPanoChangeStart.invoke();
            VeuxView.currentPanoTitle = panoData.title;
            var size = isLowQuality ? panoData.mobileSize : panoData.sizeKB;
            VeuxView.setTexture(panoData.image, size, dimmed);
            initPanoAngle = panoData.initYaw;
        }
    };
    VeuxView.setTexture = function (imageFile, sizeInKB, dimmed) {
        if (dimmed === void 0) { dimmed = false; }
        if (imageFile != VeuxView.currentPanoFileName) {
            fadeDimmed = dimmed;
            var hasTexture = VeuxView.currentPanoFileName != "";
            VeuxView.currentPanoFileName = imageFile;
            loadFileSize = sizeInKB * 1024.0;
            if (hasTexture) {
                fadeOut(0, loadNewTexture);
            }
            else {
                loadNewTexture();
            }
            // Value that will "skip" the angle update.
            initPanoAngle = -1000;
            // loadNewTexture(PanoFolder + currentPanoFile, sizeInKB * 1024.0);
        }
    };
    VeuxView.setTint = function (tintVal) {
        // // console.log("\t\tset tint:" + tintVal);
        tint = tintVal;
        material.setFloat(ShaderParamTint, tintVal);
    };
    VeuxView.animTint = function (tintVal) {
        fromTint = tint;
        toTint = tintVal;
        timeStart = Date.now();
        fadeCallback = null;
        SceneManager.onRender.addListener(onFading);
    };
    // export let getRotation = ():number => {
    // 	return model.rotation.y;
    // }
    function ________loader________() { }
    var texLoader;
    var loadPercent, loadFileSize;
    var imageTask;
    var loadNewTexture = function () {
        if (texture) {
            texture.dispose();
            texture = null;
        }
        console.log("loading new texture:", MOApp.Paths.panoramas + VeuxView.currentPanoFileName);
        assetManager.reset();
        imageTask = null;
        imageTask = assetManager.addTextureTask("new map", MOApp.Paths.panoramas + VeuxView.currentPanoFileName, true, false, samplingMode);
        imageTask.onSuccess = onTaskLoaded;
        imageTask.onError = onTaskError;
        assetManager.load();
        // imageTask.run(SceneManager.scene, onTaskLoaded, onTaskError);
        // texLoader = new XMLHttpRequest();
        // texLoader.onprogress = onLoadProgress;
        // texLoader.onload = onLoaded;
        // // console.log("Load texture:" + MOApp.Paths.panoramas + mobileFolderAddition + currentPanoFileName);
        // texLoader.open("GET", MOApp.Paths.panoramas + currentPanoFileName);
        // texLoader.responseType = "arraybuffer";
        // texLoader.send();
    };
    var onLoadProgress = function (e) {
        // NOT USED IN THIS FILE (not using XttmlRequest)
        loadPercent = e.loaded / loadFileSize;
        if (loadPercent > 1)
            loadPercent = 1;
        VeuxView.onPanoLoadingProgress.invoke(loadPercent);
        // // console.log("Progress:" + loadPercent + " loaded: " + e.loaded);
        // GuiManager.setPreloaderProgress(perc);
    };
    var onTaskLoaded = function (task) {
        texture = task.texture;
        task = null;
        material.setTexture(ShaderParamTexture, texture);
        if (initPanoAngle > -1000) {
            updatePanoAngle();
        }
        VeuxView.onPanoLoadedEvent.invoke();
        setTimeout(function () {
            fadeIn(fadeDimmed ? .5 : 1.0, onPanoReady);
        }, 500);
    };
    var onTaskError = function (task) {
        console.log("Texture Loading ERROR!");
    };
    var onLoaded = function () {
        if (texLoader.readyState == 4) {
            texture = BABYLON.Texture.LoadFromDataString("panoTexture", texLoader.response, SceneManager.scene, true, true, false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);
            // texture = BABYLON.Texture.LoadFromDataString("panoTexture", texLoader.response, SceneManager.scene, true, true, false, 
            material.setTexture(ShaderParamTexture, texture);
            if (initPanoAngle > -1000) {
                updatePanoAngle();
            }
            VeuxView.onPanoLoadedEvent.invoke();
            setTimeout(function () {
                fadeIn(fadeDimmed ? .5 : 1.0, onPanoReady);
            }, 500);
        }
        else {
            console.log("Loader gave some funny value:", texLoader.readyState);
        }
    };
    var updatePanoAngle = function () {
        // model.rotation.y = SceneManager.getCameraYaw() + Utils.Deg2Rad * (90.0 - initPanoAngle);
        VeuxView.panoRotation = initPanoAngle;
        model.rotation.y = Utils.Deg2Rad * (90 - VeuxView.panoRotation); //Utils.Deg2Rad * (90.0 - initPanoAngle);
    };
    var onPanoReady = function () {
        VeuxView.onPanoChangeFinish.invoke();
    };
    function ________fader________() { }
    ;
    /** Initial value of the tint (0 = black) */
    var fromTint;
    /** Target value of the tint (0=black)*/
    var toTint;
    /** Duration of fade in seconds (sort of - not accurate!) */
    var fadeDuration = 1000;
    var timeStart;
    var timeNow;
    var elapsed;
    var fadeCallback;
    var fadeIn = function (finalTint, _callback) {
        if (finalTint === void 0) { finalTint = 1; }
        if (_callback === void 0) { _callback = null; }
        fromTint = tint;
        toTint = finalTint;
        timeStart = Date.now();
        fadeCallback = _callback;
        SceneManager.onRender.addListener(onFading);
        // // console.log("FADE IN FROM ", fromTint, " to ", toTint);
    };
    var fadeOut = function (finalTint, _callback) {
        if (finalTint === void 0) { finalTint = 0; }
        if (_callback === void 0) { _callback = null; }
        fromTint = tint;
        toTint = 0;
        timeStart = Date.now();
        fadeCallback = _callback;
        SceneManager.onRender.addListener(onFading);
        // // console.log("FADE OUT FROM ", fromTint, " to ", toTint);
    };
    var onFading = function () {
        elapsed = Date.now() - timeStart;
        // // console.log("\tfade elapsed:" + elapsed + " from duration: " + fadeDuration);
        if (elapsed <= fadeDuration) {
            VeuxView.setTint(fromTint + (elapsed / fadeDuration) * (toTint - fromTint));
        }
        else {
            VeuxView.setTint(toTint);
            SceneManager.onRender.removeListener(onFading);
            if (fadeCallback) {
                fadeCallback();
            }
        }
    };
})(VeuxView || (VeuxView = {}));
var NKDevice;
(function (NKDevice) {
    NKDevice.isIOS = false;
    NKDevice.isTablet = false;
    NKDevice.isAndroid = false;
    NKDevice.isAndroidTablet = false;
    NKDevice.isTablet = false;
    NKDevice.isiPad = false;
    NKDevice.isLandscape = function () {
        return $(window).width() > $(window).height();
    };
    var getMobileOperatingSystem = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        // What's this "I" thing ?!
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
            NKDevice.isAndroid = true;
            //TODO: Maybe not working well:
            NKDevice.isAndroidTablet = !(/mobile/i.test(userAgent));
            return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPhone|iPod|iPad/i.test(userAgent) && !window.MSStream) {
            // alert("Found IOS!");
            NKDevice.isIOS = true;
            NKDevice.isiPad = /iPad/.test(userAgent);
            return "iOS";
        }
        else {
            // alert("NOT found IOS!");
        }
        return "unknown";
    };
    NKDevice.os = getMobileOperatingSystem();
    NKDevice.isMobile = NKDevice.isIOS || NKDevice.isAndroid;
    NKDevice.isTablet = NKDevice.isiPad || NKDevice.isAndroidTablet;
    NKDevice.hasGyro = false;
    NKDevice.detectGyroscope = function () {
        NKDevice.onGyroFoundEvent = new NKLiteEvent();
        window.addEventListener("devicemotion", function (event) {
            if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
                NKDevice.hasGyro = true;
                NKDevice.onGyroFoundEvent.invoke();
            }
        });
    };
})(NKDevice || (NKDevice = {}));
var NKLiteEvent = (function () {
    function NKLiteEvent() {
        var _this = this;
        this.listeners = [];
        this.addListener = function (listener) {
            if (_this.listeners.indexOf(listener) == -1) {
                _this.listeners.push(listener);
            }
        };
        this.removeListener = function (listener) {
            _this.listeners = _this.listeners.filter(function (l) { return l !== listener; });
        };
        this.invoke = function (data) {
            _this.listeners.slice(0).forEach(function (h) { return h(data); });
        };
    }
    return NKLiteEvent;
}());
var NKStateHome = (function () {
    function NKStateHome() {
        var _this = this;
        this.onEnter = function () {
            NKUI.SetButtonText(NKGuiManager.$backButton, "EXIT");
            NKUI.SetButtonIcon(NKGuiManager.$backButton, "btn-exit.png");
            // Check if the home panorama is already loaded.
            if (VeuxView.currentPanoTitle == MOApp.homePanorama.title) {
                NKCampusManager.setVisible(true);
            }
            else {
                VeuxView.onPanoLoadedEvent.addListener(_this.onHomePanoLoaded);
                VeuxView.setPanorama(MOApp.homePanorama);
            }
            NKHotspotManager.setVisible(false);
            NKGuiManager.$backButton.click(_this.onBackButton);
            NKGuiManager.$mapButton.fadeOut();
            // NKGuiManager.gyroToggle.setValue(NKDevice.hasGyro);
            if (NKDevice.hasGyro) {
                NKGuiManager.$gyroButton.fadeIn();
            }
            else {
                NKGuiManager.$gyroButton.fadeOut();
            }
            NKCampusManager.onCampusLinkEvent.addListener(_this.onClickedTour);
            NKHotspotManager.onClicked.addListener(_this.onClickedLink);
            SceneManager.nudgeCamera(-3);
            // Disable foot menu
            // Set amenities toggle: false
            // Show amenities gui
            // Add listener to amenities toggle . ontoggle
            // hide amenities on exit = true
        };
        this.onUpdate = function () {
        };
        this.onExit = function () {
            // Hide amenities if hide amenities on exit == true
            NKCampusManager.setVisible(false);
            NKHotspotManager.setVisible(false);
            NKGuiManager.$backButton.unbind('click', _this.onBackButton);
            VeuxView.onPanoLoadedEvent.removeListener(_this.onHomePanoLoaded);
            NKCampusManager.onCampusLinkEvent.removeListener(_this.onClickedTour);
            NKHotspotManager.onClicked.removeListener(_this.onClickedLink);
        };
        this.onClickedLink = function (linkedPano, isTour) {
            if (isTour === void 0) { isTour = false; }
            console.log("State Home: Clicked link to:" + linkedPano);
            var stateTour = NKStateMachine.getState(NKStateMachine.STATE_TOUR);
            stateTour.isTour = isTour;
            VeuxView.setPanorama(VeuxData.getPanoByTitle(linkedPano));
            NKStateMachine.changeState(NKStateMachine.STATE_TOUR);
        };
        this.onClickedTour = function (linkedPano) {
            _this.onClickedLink(linkedPano, true);
        };
        this.onHomePanoLoaded = function () {
            // When panorama is not visible, reset the view!
            SceneManager.setFOV(1.35);
            SceneManager.resetCamera();
            SceneManager.setXAngle(20);
            NKCampusManager.setVisible(true, true);
        };
        this.onBackButton = function (e) {
            NKStateMachine.changeState(NKStateMachine.STATE_WELCOME);
        };
    }
    return NKStateHome;
}());
var NKStateMachine;
(function (NKStateMachine) {
    NKStateMachine.STATE_WELCOME = "welcome";
    NKStateMachine.STATE_HOME = "home";
    NKStateMachine.STATE_TOUR = "tour";
    var allStates = {};
    NKStateMachine.init = function () {
        allStates[NKStateMachine.STATE_WELCOME] = new NKStateWelcome();
        allStates[NKStateMachine.STATE_HOME] = new NKStateHome();
        allStates[NKStateMachine.STATE_TOUR] = new NKStateTour();
    };
    NKStateMachine.changeState = function (stateName) {
        // console.log("Change state to: " + stateName);
        if (allStates[stateName] != undefined && stateName != NKStateMachine.currentStateName) {
            if (NKStateMachine.currentState)
                NKStateMachine.currentState.onExit();
            NKStateMachine.currentState = allStates[stateName];
            NKStateMachine.currentStateName = stateName;
            NKStateMachine.currentState.onEnter();
        }
    };
    NKStateMachine.getState = function (stateName) {
        return allStates[stateName];
    };
})(NKStateMachine || (NKStateMachine = {}));
var NKStateTour = (function () {
    function NKStateTour() {
        var _this = this;
        this.mssgSoon = "Full interactive tour for $<br>Campus is coming soon.";
        this.mssgTour = "You are at the first of # panos<br>for the $ Campus.<br> Click on hotspots like these<br><img style='width:23px; height:23px; margin:10px' src='assets/gui/hotspot.png'/><br>to navigate through the site.";
        this.onEnter = function () {
            NKUI.SetButtonText(NKGuiManager.$backButton, "BACK");
            NKUI.SetButtonIcon(NKGuiManager.$backButton, "btn-home.png");
            NKGuiManager.$mapButton.fadeIn();
            NKGuiManager.$backButton.click(_this.onBackButton);
            NKGuiManager.$messageButton.click(_this.onPanoMessageCloseButton);
            NKGuiManager.setVisible(false);
            NKHotspotManager.onClicked.addListener(_this.onHotspot);
            VeuxView.onPanoChangeStart.addListener(_this.onPanoramaStartLoading);
            VeuxView.onPanoChangeFinish.addListener(_this.onPanoramaFinishLoading);
            VeuxView.onPanoLoadedEvent.addListener(_this.onPanoramaSwitching);
            NKMapView.setEnabled(true);
            // console.log("ENTER STATE TOUR. Is tour?" + this.isTour);
            // Enable foot menu (home/plan)
            // Add home button listener
            // Add plan button listener
            // Add on plan visibility change > OnPlanClosed
            // Add on foot menu visibility change > OnFootMenuVisible
            // Add back button (?)
        };
        this.onUpdate = function () {
        };
        this.onExit = function () {
            NKGuiManager.$backButton.unbind('click', _this.onBackButton);
            NKGuiManager.$messageButton.unbind('click', _this.onPanoMessageCloseButton);
            NKGuiManager.$message.fadeOut();
            NKHotspotManager.onClicked.removeListener(_this.onHotspot);
            VeuxView.onPanoChangeStart.removeListener(_this.onPanoramaStartLoading);
            VeuxView.onPanoChangeFinish.removeListener(_this.onPanoramaFinishLoading);
            VeuxView.onPanoLoadedEvent.removeListener(_this.onPanoramaSwitching);
            NKMapView.setEnabled(false);
        };
        this.onHotspot = function (linkedPano) {
            var pano = VeuxData.getPanoByTitle(linkedPano);
            if (pano != undefined) {
                VeuxView.setPanorama(pano);
                NKGuiManager.$message.fadeOut();
            }
            else {
                // Tour go home?
                NKStateMachine.changeState(NKStateMachine.STATE_HOME);
            }
        };
        this.onPanoramaStartLoading = function () {
            NKGuiManager.setVisible(false);
            NKHotspotManager.hide();
        };
        this.onPanoramaFinishLoading = function () {
            NKGuiManager.setVisible(true);
            NKHotspotManager.show();
        };
        this.onPanoramaSwitching = function () {
            SceneManager.setFOV(SceneManager.FOV_NORMAL);
            // console.log("Is tour?" + this.isTour);
            var folder = VeuxData.getPanoByTitle(VeuxView.currentPanoTitle).folder;
            var folderCnt = VeuxData.getFolderCount(folder);
            var mssg = "";
            // folder = folder.toUpperCase();
            // // console.log("Folder " + folder + " has " + folderCnt + " panoramas.");
            if (folderCnt < 2) {
                mssg = _this.mssgSoon.replace("$", folder);
                // Show the coming soon message
                NKGuiManager.$messageText.html(mssg);
                NKGuiManager.$message.fadeIn();
            }
            else if (_this.isTour) {
                // Show
                mssg = _this.mssgTour.replace("$", folder);
                mssg = mssg.replace("#", folderCnt.toString());
                _this.isTour = false;
                // console.log("TOUR FADE THE SHIT IN!");
                NKGuiManager.$messageText.html(mssg);
                NKGuiManager.$message.fadeIn();
            }
            // Messages: o
            SceneManager.resetCamera(BABYLON.Axis.X);
        };
        this.onBackButton = function (e) {
            NKStateMachine.changeState(NKStateMachine.STATE_HOME);
        };
        this.onPanoMessageCloseButton = function (e) {
            NKGuiManager.$message.fadeOut();
        };
    }
    return NKStateTour;
}());
var NKStateWelcome = (function () {
    function NKStateWelcome() {
        var _this = this;
        this.isFirstTime = true;
        this.isExpanded = false;
        //width:80%; max-width: 1280px; height: 70%; 
        this.originalW = "80%";
        this.originalH = "70%";
        this.originalMaxW = "1280px";
        this.onEnter = function () {
            NKHotspotManager.setVisible(false);
            if (VeuxView.currentPanoTitle == MOApp.homePanorama.title) {
                _this.showGui();
            }
            else {
                VeuxView.onPanoLoadedEvent.addListener(_this.onHomePanoLoaded);
                VeuxView.setPanorama(MOApp.homePanorama);
                SceneManager.setXAngle(20);
            }
            // if (this.isExpanded)
            // 	this.contract()
        };
        this.onUpdate = function () {
        };
        this.onExit = function () {
            // this.expand();
            // SceneManager.setGyroActive(true);
            VeuxView.onPanoLoadedEvent.removeListener(_this.onHomePanoLoaded);
            NKGuiManager.$welcome.fadeOut();
            NKGuiManager.$enterButton.unbind('mousedown');
            NKGuiManager.$backButton.fadeIn();
        };
        this.onButton = function (e) {
            NKStateMachine.changeState(NKStateMachine.STATE_HOME);
        };
        this.showGui = function () {
            NKGuiManager.$welcome.fadeIn();
            NKGuiManager.$enterButton.bind('mousedown', _this.onButton);
            NKGuiManager.$backButton.fadeOut();
            NKGuiManager.$gyroButton.fadeOut();
            NKGuiManager.$mapButton.hide();
        };
        this.onHomePanoLoaded = function () {
            if (_this.isFirstTime) {
                _this.isFirstTime = false;
                $("#pano-welcome-container, #pano-ui-overlay ").show();
            }
            _this.showGui();
            SceneManager.setFOV(SceneManager.FOV_WIDE);
        };
    }
    NKStateWelcome.prototype.expand = function () {
        this.isExpanded = true;
        NKGuiManager.$panoContainer.css({
            width: "100%", height: "100vh", "max-width": "5000px", margin: "0px"
        });
        // if (Device.isAndroid && screenfull.enabled){ screenfull.request(); }
        var top = NKGuiManager.$panoContainer.offset().top; // + this.$container.height() - $(window).height();
        $("html, body").animate({ scrollTop: top });
    };
    NKStateWelcome.prototype.contract = function () {
        this.isExpanded = false;
        NKGuiManager.$panoContainer.css({
            width: this.originalW, height: this.originalH,
            "max-width": this.originalMaxW, margin: "0 auto 0"
        });
        // if (Device.isAndroid && screenfull.enabled){ screenfull.exit(); }
        $("html, body").animate({ scrollTop: NKGuiManager.$panoContainer.offset().top - .25 * $(window).height() });
    };
    return NKStateWelcome;
}());
var NKMapView;
(function (NKMapView) {
    var $viewpoint;
    var isEnabled = false;
    var isVisible = false;
    var yaw = 0;
    var yawOffset = 0;
    NKMapView.init = function (divId) {
        NKMapView.$container = $("#" + divId);
        $viewpoint = $("#pano-map-view");
        NKGuiManager.mapToggle.onToggleEvent.addListener(onToggle);
        NKMapView.$container.on('mousedown', onPanoClick);
        VeuxView.onPanoLoadedEvent.addListener(onPanoChangeLoaded);
        // VeuxView.onPanoChangeFinish.addListener(onPanoChangeFinish);
        SceneManager.onRender.addListener(onUpdate);
    };
    NKMapView.setEnabled = function (onoff) {
        isEnabled = onoff;
        if (!isEnabled)
            NKMapView.setVisible(false);
    };
    NKMapView.setVisible = function (onoff, redrawToogle) {
        if (redrawToogle === void 0) { redrawToogle = true; }
        if (onoff == isVisible)
            return;
        isVisible = onoff;
        NKGuiManager.mapToggle.setValue(onoff);
        positionViewpoint();
        if (onoff) {
            NKMapView.$container.fadeIn();
        }
        else {
            NKMapView.$container.fadeOut();
        }
    };
    var rotString;
    var onUpdate = function () {
        // // console.log("On update. Visible?",)
        if (isEnabled && isVisible) {
            yaw = yawOffset + Utils.Rad2Deg * SceneManager.getCameraYaw();
            rotString = "rotate(" + yaw.toString() + "deg)";
            $viewpoint.css({
                transform: rotString,
                "-webkit-transform": rotString,
                "-moz-transform": rotString,
                "-ms-transform": rotString
            });
        }
    };
    var pos = [0, 0];
    var positionViewpoint = function () {
        // let pos:number[] = [.54, .30];
        // console.log("Pano for " + VeuxView.currentPanoTitle + " is " + VeuxData.getPanoByTitle(VeuxView.currentPanoTitle));
        pos[0] = VeuxData.getPanoByTitle(VeuxView.currentPanoTitle).map[0] * NKMapView.$container.width();
        pos[1] = VeuxData.getPanoByTitle(VeuxView.currentPanoTitle).map[1] * NKMapView.$container.height();
        pos[0] -= .1 * $viewpoint.width();
        pos[1] -= .5 * $viewpoint.height();
        $viewpoint.css({
            top: pos[1].toString() + "px",
            left: pos[0].toString() + "px"
        });
    };
    var onToggle = function (onoff) {
        NKMapView.setVisible(onoff, false);
    };
    var onPanoClick = function (e) {
        NKMapView.setVisible(false);
    };
    var onPanoChangeLoaded = function () {
        if (isEnabled)
            positionViewpoint();
    };
    // let onPanoChangeFinish = () => {
    // 	if (isVisible && isEnabled) {
    // 		// $container.fadeIn();
    // 	}
    // }
})(NKMapView || (NKMapView = {}));
var NKCampusLink = (function () {
    function NKCampusLink(logoImagePath, campusTitle, 
        /** Small text below title*/
        campusDesc, linkedPano, color, ath, atv, hotspotFrom, hotspotTo) {
        var _this = this;
        this.campusTitle = campusTitle;
        this.linkedPano = linkedPano;
        this.hotspotFrom = hotspotFrom;
        this.hotspotTo = hotspotTo;
        this.setViewsCallback = function (callback) {
            _this.toggleViewsCallback = callback;
        };
        this.setTourCallback = function (callback) {
            _this.pickTourCallback = callback;
        };
        this.setViewsToggle = function (onoff) {
            _this.toggleViewsButton.setState(onoff);
        };
        this.onViewsToggle = function (onoff) {
            _this.toggleViewsCallback(_this, onoff);
        };
        this.onTourPick = function (e) {
            _this.pickTourCallback(_this);
        };
        this.$div = $('<div class="pano-campus"></div>');
        this.$logo = $('<img class="pano-campus-logo" src="' + MOApp.Paths.gui + '/' + logoImagePath + '"/>');
        var $title = $('<div class="pano-panel pano-bg-silver pano-text-left"></div>');
        var $tour = $('<a class="pano-button pano-panel"></a>');
        var $views = $('<a class="pano-button pano-panel"></a>');
        $tour.css("background-color", color);
        $views.css("background-color", NKCampusLink.viewsColor);
        this.$viewsCaption = $('<span>SHOW VIEWS</span>');
        var $tourCaption = $('<span>TAKE A TOUR</span>');
        var $tourIcon = $('<img src="' + MOApp.Paths.gui + '/btn-tour.png" />');
        this.$viewsIcon = $('<img src="' + MOApp.Paths.gui + '/btn-show-views.png" />');
        $title.append('<h3>' + campusTitle + '</h3><br>' + campusDesc);
        var linkBg = '<span class="pano-button-bg"></span>';
        $tour.append(linkBg, $tourCaption, $tourIcon);
        $views.append(linkBg, this.$viewsCaption, this.$viewsIcon);
        // Add all to DOM.
        this.$div.append(this.$logo, $title, $tour, $views);
        // Calculus
        ath = 90.0 - ath;
        this.position3D = BABYLON.Vector3.Zero();
        Utils.SetCoordinatesFromRadial(ath, atv, 5.0, this.position3D);
        // SceneManager.createDebugBox(this.position3D);
        // Set toggle + tour listeners.
        this.toggleViewsButton = new NKUI.Toggle($views, this.$viewsCaption, this.$viewsIcon, "HIDE VIEWS", MOApp.Paths.gui + "/btn-hide-views.png", false);
        this.toggleViewsButton.onChangeEvent.addListener(this.onViewsToggle);
        $tour.on('mousedown', this.onTourPick);
    }
    NKCampusLink.viewsColor = "#A0A8AF";
    return NKCampusLink;
}());
var NKCampusManager;
(function (NKCampusManager) {
    function ________public________() { }
    ;
    NKCampusManager.init = function (containerId) {
        NKCampusManager.onCampusLinkEvent = new NKLiteEvent();
        $container = $('#' + containerId);
        links[0] = new NKCampusLink("campus-think.png", "Think", "324,100 SQF", "Millenia Ave", "#F37167", -40, -20, 0, 5);
        links[1] = new NKCampusLink("campus-discover.png", "Discover", "400.000 SQF<br>Expandable to 700.000 SQF", "Discover", "#FFCE71", 10, -5, 6, 6);
        links[2] = new NKCampusLink("campus-invent.png", "Invent", "700.000 SQF", "Invent", "#82CA9C", 60, -20, 7, 7);
        for (var i = 0; i < links.length; i++) {
            $container.append(links[i].$div);
            links[i].setViewsCallback(onViewsToggle);
            links[i].setTourCallback(onLinkPicked);
        }
        // Set events
        SceneManager.onRender.addListener(onUpdate);
        //TODO: Temporarily enabled links.
        isEnabled = true;
        isVisible = true;
    };
    NKCampusManager.setVisible = function (onoff, animated) {
        if (animated === void 0) { animated = true; }
        if (onoff != isVisible) {
            isEnabled = true;
            isVisible = onoff;
            NKUI.ShowHide($container, isVisible, animated);
            if (isVisible) {
                for (var i = 0; i < links.length; i++) {
                    links[i].setViewsToggle(false);
                }
            }
        }
    };
    function ________private________() { }
    ;
    var $container;
    var links = new Array();
    var isEnabled;
    var isVisible;
    var campusPos;
    var onUpdate = function () {
        if (isEnabled && isVisible) {
            for (var i = 0; i < links.length; i++) {
                campusPos = SceneManager.getScreenCoordinate(links[i].position3D);
                campusPos.x -= .5 * links[i].$div.width();
                campusPos.y -= links[i].$div.height();
                links[i].$div.css({
                    "top": Math.ceil(campusPos.y) + "px",
                    "left": Math.ceil(campusPos.x) + "px",
                });
            }
        }
    };
    var onViewsToggle = function (link, onoff) {
        // // console.log("Views for " + link.linkedPano + " changed to visible? " + onoff);
        NKHotspotManager.setVisible(onoff, true, link.hotspotFrom, link.hotspotTo);
    };
    var onLinkPicked = function (link) {
        if (isEnabled) {
            isEnabled = false;
            // // console.log("Link picked, for panorama: " + link.linkedPano);
            NKCampusManager.onCampusLinkEvent.invoke(link.linkedPano);
        }
    };
})(NKCampusManager || (NKCampusManager = {}));
/** Not sure this is worth doing. */
var NKGuiManager;
(function (NKGuiManager) {
    NKGuiManager.$panoContainer = $("#pano-container");
    NKGuiManager.$welcome = $("#pano-welcome-container");
    NKGuiManager.$guiOverlay = $("#pano-ui-overlay");
    NKGuiManager.$welcomeDescription = $("#pano-welcome-description");
    NKGuiManager.$backButton = $("#pano-back-button");
    NKGuiManager.$enterButton = $("#pano-enter-button");
    NKGuiManager.$gyroButton = $("#pano-gyro-button");
    NKGuiManager.$mapButton = $("#pano-map-button");
    NKGuiManager.$message = $("#pano-message");
    NKGuiManager.$messageText = NKGuiManager.$message.find("p").first();
    NKGuiManager.$messageButton = $("#pano-message-button");
    NKGuiManager.$fsButton = $("#pano-fullscreen-button");
    // Tailor the welcome help message.
    var deviceName = "phone";
    if (NKDevice.isIOS) {
        deviceName = NKDevice.isiPad ? "iPad" : "iPhone";
    }
    var mssgDesktop = "Click and drag "; //"Click and drag to look around and explore";
    var mssgMobile = "Tap and swipe "; //"Spin your " + deviceName + " or swipe<br>to look around and explore";
    var mssgExploreWhat = "to look around and explore views of Millenia Office.";
    NKGuiManager.init = function () {
        NKGuiManager.$welcomeDescription.html((NKDevice.isMobile ? mssgMobile : mssgDesktop) + mssgExploreWhat);
        NKGuiManager.gyroToggle = new ToggleButton(NKGuiManager.$gyroButton, NKDevice.hasGyro, "AUTO : OFF", "", "AUTO SPIN");
        NKGuiManager.fsToogle = new ToggleButton(NKGuiManager.$fsButton, false, "", "btn-exit-fullscreen.png", "", "btn-fullscreen.png");
        console.log("Set initial gyro state to:", NKDevice.hasGyro);
        NKGuiManager.gyroToggle.onToggleEvent.addListener(onGyroToggle);
        NKGuiManager.mapToggle = new ToggleButton(NKGuiManager.$mapButton, false, "MAP", "", "MAP");
        NKDevice.onGyroFoundEvent.addListener(onGyroFound);
    };
    NKGuiManager.setVisible = function (onoff) {
        if (onoff) {
            NKGuiManager.$guiOverlay.fadeIn();
        }
        else {
            NKGuiManager.$guiOverlay.fadeOut();
        }
    };
    var onGyroFound = function () {
        NKDevice.onGyroFoundEvent.removeListener(onGyroFound);
        if (NKStateMachine.currentStateName != NKStateMachine.STATE_WELCOME) {
            // console.log("Set gyro state to:", NKDevice.hasGyro)
            NKGuiManager.gyroToggle.setValue(false);
            NKGuiManager.$gyroButton.fadeIn();
        }
    };
    // Probably could find a better place for this code.
    var onGyroToggle = function (onoff) {
        console.log("Gyro toggle?" + onoff);
        if (!NKDevice.hasGyro) {
            return;
        }
        SceneManager.setGyroActive(onoff);
    };
})(NKGuiManager || (NKGuiManager = {}));
var NKHotspotManager;
(function (NKHotspotManager) {
    var maxHotspots = 15;
    var iconHalfSize = 16;
    var $container;
    var $hotspots;
    var $captions;
    var coordinates;
    var linkedPanos;
    var divWidths;
    var ________public = function () { };
    NKHotspotManager.init = function (containerId) {
        NKHotspotManager.onClicked = new NKLiteEvent();
        VeuxView.onPanoChangeFinish.addListener(onPanoLoaded);
        $container = $("#" + containerId);
        SceneManager.onRender.addListener(onUpdate);
        createHotspots();
    };
    NKHotspotManager.setVisible = function (onoff, animated, from, to) {
        if (animated === void 0) { animated = true; }
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = -1; }
        if (to < 0)
            to = maxHotspots - 1;
        for (var i = from; i <= to; i++) {
            // // console.log("i:" + i + " h[i]: " + $hotspots[i]);
            NKUI.ShowHide($hotspots[i], onoff && linkedPanos[i] != "", animated);
        }
    };
    NKHotspotManager.show = function () {
        NKHotspotManager.setVisible(true);
    };
    NKHotspotManager.hide = function () {
        NKHotspotManager.setVisible(false);
    };
    var ________listeners = function () { };
    var onPanoLoaded = function () {
        setData(VeuxData.getPanoByTitle(VeuxView.currentPanoTitle));
    };
    var hotspotPos;
    var onUpdate = function () {
        for (var i = 0; i < maxHotspots; i++) {
            if ($hotspots[i].is(":visible")) {
                hotspotPos = SceneManager.getScreenCoordinate(coordinates[i]);
                $hotspots[i].css({
                    "top": Math.ceil(hotspotPos.y - iconHalfSize) + "px",
                    "left": Math.ceil(hotspotPos.x - .5 * divWidths[i]) + "px",
                    "display": "block"
                });
            }
        }
    };
    var onHotspot = function (e) {
        e.preventDefault();
        var clickedPano = linkedPanos[$(e.currentTarget).data("index")];
        if (clickedPano != "") {
            NKHotspotManager.onClicked.invoke(clickedPano);
        }
    };
    var ________private = function () { };
    var createHotspots = function () {
        // console.log("Create hotspots!");
        $hotspots = new Array();
        $captions = new Array();
        coordinates = new Array();
        linkedPanos = new Array();
        divWidths = new Array();
        for (var i = 0; i < maxHotspots; i++) {
            $hotspots[i] = $('<div class="pano-hotspot pano-interactive"><img src="assets/gui/hotspot.png"/></div>');
            $captions[i] = $('<span class="pano-bg-black"> </span>');
            $hotspots[i].append($captions[i]);
            $container.append($hotspots[i]);
            $hotspots[i].on('dragstart', function (event) { event.preventDefault(); });
            $hotspots[i].on('mousedown', onHotspot);
            $hotspots[i].data("index", i);
            coordinates[i] = BABYLON.Vector3.Zero();
            linkedPanos[i] = "";
            $hotspots[i].hide();
        }
    };
    var distance = 5.0;
    var setData = function (pano) {
        var cnt = pano.hotspots.length;
        var hotspotData;
        var proj;
        var viewRot = VeuxView.panoRotation;
        var s = "Hotspots for " + pano.title + " view rot: " + viewRot;
        for (var i = 0; i < maxHotspots; i++) {
            if (i < cnt) {
                hotspotData = pano.hotspots[i];
                var hAngle = 90.0 - hotspotData[1] + viewRot;
                Utils.SetCoordinatesFromRadial(hAngle, hotspotData[2], distance, coordinates[i]);
                //SceneManager.createDebugBox(coordinates[i]);
                $captions[i].html(hotspotData[0]);
                linkedPanos[i] = hotspotData[0];
                divWidths[i] = $hotspots[i].width();
            }
            else {
                // Disable this!
                linkedPanos[i] = "";
            }
        }
    };
})(NKHotspotManager || (NKHotspotManager = {}));
/*


Every time when pano loads, the hotspots should be redistributed.
Hotspot manager should never either show or hide itself automatically!

Auto-refresh.




*/
var NKUI;
(function (NKUI) {
    var Toggle = (function () {
        function Toggle($div, 
            /** JQuery object containing the text label. */
            $label, 
            /** JQuery object pointing to the img icon. */
            $img, otherText, otherImgSrc, defaultState) {
            var _this = this;
            this.$label = $label;
            this.$img = $img;
            this.otherText = otherText;
            this.otherImgSrc = otherImgSrc;
            /** Force the change of state and reflects it on gui, without invoking onChangeEvent. */
            this.setState = function (onoff) {
                if (onoff != _this.state) {
                    _this.state = onoff;
                    _this.updateGui();
                }
            };
            this.updateGui = function () {
                _this.$img.attr('src', _this.state == _this.otherShownWhen ? _this.otherImgSrc : _this.startingImgSrc);
                _this.$label.html(_this.state == _this.otherShownWhen ? _this.otherText : _this.startingText);
            };
            this.onClickHandler = function (e) {
                _this.state = !_this.state;
                _this.updateGui();
                _this.onChangeEvent.invoke(_this.state);
            };
            this.onChangeEvent = new NKLiteEvent();
            this.startingText = $label.html();
            this.startingImgSrc = $img.attr('src');
            this.state = defaultState;
            this.otherShownWhen = !this.state;
            $div.on('mousedown', this.onClickHandler);
        }
        return Toggle;
    }());
    NKUI.Toggle = Toggle;
    /** Shows and hide provided div, faded or not. */
    NKUI.ShowHide = function ($div, onoff, isAnimated) {
        if (isAnimated === void 0) { isAnimated = true; }
        if (isAnimated) {
            if (onoff) {
                $div.fadeIn();
            }
            else {
                $div.fadeOut();
            }
        }
        else {
            $div.toggle(onoff);
        }
    };
    NKUI.SetButtonText = function ($buttonDiv, text) {
        $buttonDiv.find("span").last().html(text);
    };
    NKUI.SetButtonIcon = function ($buttonDiv, imgPath) {
        $buttonDiv.find("img").eq(0).attr("src", MOApp.Paths.gui + imgPath);
    };
})(NKUI || (NKUI = {}));
var ProgressBar;
(function (ProgressBar) {
    var $container, $bar;
    var isEnabled = true;
    ProgressBar.init = function () {
        $container = $("#progress-bar-container");
        $bar = $("#progress-bar");
        VeuxView.onPanoChangeStart.addListener(onPanoStart);
        VeuxView.onPanoLoadedEvent.addListener(onPanoEnd);
        VeuxView.onPanoLoadingProgress.addListener(onPanoLoading);
    };
    ProgressBar.setEnabled = function (onoff) {
        isEnabled = onoff;
    };
    var onPanoStart = function () {
        if (!isEnabled)
            return;
        $bar.css("width", "0%");
        $container.fadeIn();
    };
    var onPanoEnd = function () {
        if (!isEnabled)
            return;
        $container.fadeOut();
    };
    var css = "";
    // Note: this is no longer used.
    var onPanoLoading = function (progress) {
        if (!isEnabled)
            return;
        css = (progress * 100.0) + "%";
        $bar.css("width", css);
    };
})(ProgressBar || (ProgressBar = {}));
var ToggleButton = (function () {
    function ToggleButton($buttonDiv, initState, labelOn, iconOn, labelOff, iconOff) {
        if (labelOn === void 0) { labelOn = ""; }
        if (iconOn === void 0) { iconOn = ""; }
        if (labelOff === void 0) { labelOff = ""; }
        if (iconOff === void 0) { iconOff = ""; }
        var _this = this;
        this.$buttonDiv = $buttonDiv;
        this.labelOn = labelOn;
        this.iconOn = iconOn;
        this.labelOff = labelOff;
        this.iconOff = iconOff;
        this.redraw = function () {
            if (_this.toggleLabel) {
                _this.$label.html(_this.state ? _this.labelOn : _this.labelOff);
            }
            if (_this.toggleIcon) {
                // console.log("TOGGLE!", this.state ? this.iconOn : this.iconOff);
                // this.$icon.html( this.state ? this.iconOn : this.iconOff );
                _this.$icon.attr("src", MOApp.Paths.gui + (_this.state ? _this.iconOn : _this.iconOff));
            }
        };
        this.onToggle = function (e) {
            _this.state = !_this.state;
            _this.redraw();
            _this.onToggleEvent.invoke(_this.state);
        };
        this.setValue = function (onoff, invoke) {
            if (invoke === void 0) { invoke = false; }
            if (onoff != _this.state) {
                console.log("BUTTON NAMED:" + _this.$buttonDiv.attr("id") + " Changed state to: " + onoff);
                _this.state = onoff;
                _this.redraw();
                if (invoke)
                    _this.onToggleEvent.invoke(_this.state);
            }
        };
        this.onToggleEvent = new NKLiteEvent();
        this.$label = $buttonDiv.find("span").last();
        this.$icon = $buttonDiv.find("img");
        this.toggleIcon = this.$icon && this.iconOff != "" && this.iconOn != "";
        this.toggleLabel = this.$label && this.labelOff != "" && this.labelOn != "";
        this.state = initState;
        this.$buttonDiv.click(this.onToggle);
        console.log("BUTTON NAMED:" + $buttonDiv.attr("id") + " STATE: " + this.state + "labeloff:" + this.labelOff);
        this.redraw();
    }
    return ToggleButton;
}());
//# sourceMappingURL=mil-pano.js.map