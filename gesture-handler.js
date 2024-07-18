/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
    schema: {
        enabled: { default: true },
        rotationFactor: { default: 5 },
        minScale: { default: 0.01 },
        maxScale: { default: 20 },
    },

    init: function () {
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.isVisible = true;
        this.initialScale = this.el.object3D.scale.clone();
        this.scaleFactor = 1;

        // this.el.sceneEl.addEventListener("markerFound", (e) => {
        //   this.isVisible = true;
        // });

        // this.el.sceneEl.addEventListener("markerLost", (e) => {
        //   this.isVisible = false;
        // });
    },

    update: function () {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
            this.el.sceneEl.addEventListener("threefingermove", this.handleMove);
        } else {
            this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
            this.el.sceneEl.removeEventListener("threefingermove", this.handleMove);
        }
    },

    remove: function () {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        this.el.sceneEl.removeEventListener("threefingermove", this.handleMove);
    },

    handleRotation: function (event) {
        // console.log('11111111',)
        if (this.isVisible) {
            this.el.object3D.rotation.y +=
                event.detail.positionChange.x * this.data.rotationFactor;
            const rota =  Math.abs(this.el.object3D.rotation.y) % 6
            if (4.5>rota > 1.5) {
                this.el.object3D.rotation.z +=
                    event.detail.positionChange.y * this.data.rotationFactor;
            } else {
                this.el.object3D.rotation.x +=
                    event.detail.positionChange.y * this.data.rotationFactor;
            }
            this.data.rotation += event.detail.positionChange.y * this.data.rotationFactor;
        }
    },

    handleScale: function (event) {
        console.log('22222222')
        if (this.isVisible) {
            this.scaleFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread;

            this.scaleFactor = Math.min(
                Math.max(this.scaleFactor, this.data.minScale),
                this.data.maxScale
            );

            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
    },
    handleMove: function (event) {
        console.log('event', event, event.detail.positionChange.x, event.detail.positionChange.y);
        this.el.object3D.position.x += event.detail.positionChange.x;
        this.el.object3D.position.y -= event.detail.positionChange.y;
    }
});
