//-----------------------------------------------------------------------------
// Vectors
//
getVectorOfSameClass = function(vInput) {
	if ( vInput instanceof vec2 ) {
		return new vec2(vInput.getX(), vInput.getY());
	}
	else if ( vInput instanceof vec3 ) {
		return new vec3(vInput.getX(), vInput.getY(), vInput.getZ());
	}
	else if ( vInput instanceof vec4 ) {
		return new vec4(vInput.getX(), vInput.getY(), vInput.getZ(), vInput.getW());
	}
	else {
		return new vector(vInput.getX(), vInput.getY(), vInput.getZ(), vInput.getW());
	}
}

var vector = function(inX, inY, inZ, inW) {
	var that = {};

	that.mX = inX || 0;
	that.mY = inY || 0;
	that.mZ = inZ || 0;
	that.mW = inW || 0;

	// Getters
	this.getX = function() {
		return that.mX;
	}
	this.getY = function() {
		return that.mY;
	}
	this.getZ = function() {
		return that.mZ;
	}
	this.getW = function() {
		return that.mW;
	}

	// Setters
	this.setX = function(iVal) {
		that.mX = iVal;
	}
	this.setY = function(iVal) {
		that.mY = iVal;
	}
	this.setZ = function(iVal) {
		that.mZ = iVal;
	}
	this.setW = function(iVal) {
		that.mW = iVal;
	}

	this.normalise = function(vOutput) {
		vOutput = getVectorOfSameClass(this);

		var length = utils.vector.length(this);

		vOutput.setX(that.mX / length);
		vOutput.setY(that.mY / length);
		vOutput.setZ(that.mZ / length);
		vOutput.setW(that.mW / length);

		return vOutput;
	}

	this.normaliseSelf = function() {
		var length = utils.vector.length(this);

		that.mX = that.mX / length;
		that.mY = that.mY / length;
		that.mZ = that.mZ / length;
		that.mW = that.mW / length;
	}

	// x = A + t * (B - A)
	this.lerpTowards = function(vTarget, iAmount) {
		var x = this.getX() + ( iAmount * ( vTarget.getX() - this.getX() ) ); 
		var y = this.getY() + ( iAmount * ( vTarget.getY() - this.getY() ) );
		var z = this.getZ() + ( iAmount * ( vTarget.getZ() - this.getZ() ) );
		var w = this.getW() + ( iAmount * ( vTarget.getW() - this.getW() ) );

		this.setX(x);
		this.setY(y);
		this.setZ(z);
		this.setW(w);
	}

	this.minus = function(vInput, vOutput) {
		vOutput = getVectorOfSameClass(this);
		
		vOutput.setX(this.getX() - vInput.getX());
		vOutput.setY(this.getY() - vInput.getY());
		vOutput.setZ(this.getZ() - vInput.getZ());
		vOutput.setW(this.getW() - vInput.getW());

		return vOutput;
	}

	this.add = function(vInput, vOutput) {
		vOutput = getVectorOfSameClass(this);
		
		vOutput.setX(this.getX() + vInput.getX());
		vOutput.setY(this.getY() + vInput.getY());
		vOutput.setZ(this.getZ() + vInput.getZ());
		vOutput.setW(this.getW() + vInput.getW());

		return vOutput;
	}

	this.minusAssign = function(vInput) {
		this.setX(this.getX() - vInput.getX());
		this.setY(this.getY() - vInput.getY());
		this.setZ(this.getZ() - vInput.getZ());
		this.setW(this.getW() - vInput.getW());
	}

	this.addAssign = function(vInput) {
		this.setX(this.getX() + vInput.getX());
		this.setY(this.getY() + vInput.getY());
		this.setZ(this.getZ() + vInput.getZ());
		this.setW(this.getW() + vInput.getW());
	}

	this.getPerp = function(vOutput) {
		console.log("yep");
	}

	return this;
};

var vec2 = function(inX, inY) {
	var that = vector(inX, inY);

	this.getX = that.getX;
	this.getY = that.getY;
	this.getZ = function() { return 0; }
	this.getW = function() { return 0; }

	this.setX = that.setX;
	this.setY = that.setY;
	this.setZ = function() {}
	this.setW = function() {}

	this.minus = that.minus;
	this.add = that.add;
	this.minusAssign = that.minusAssign;
	this.addAssign = that.addAssign;
	this.lerpTowards = that.lerpTowards;
	this.normalise = that.normalise;
	this.normaliseSelf = that.normaliseSelf;
	
	this.getPerp = function(vOutput) {
		vOutput = new vec2(-this.getY(), this.getX());
		return vOutput;
	}
};

var vec3 = function(inX, inY, inZ) {
	var that = vector(inX, inY, inZ);

	this.getX = that.getX;
	this.getY = that.getY;
	this.getZ = that.getZ;
	this.getW = function() { return 0; }

	this.setX = that.setX;
	this.setY = that.setY;
	this.setZ = that.setZ;
	this.setW = function() {}

	this.minus = that.minus;
	this.add = that.add;
	this.minusAssign = that.minusAssign;
	this.addAssign = that.addAssign;
	this.lerpTowards = that.lerpTowards;
	this.normalise = that.normalise;
	this.normaliseSelf = that.normaliseSelf;
};

var vec4 = function(inX, inY, inZ, inW) {
	var that = vector(inX, inY, inZ, inW);

	this.getX = that.getX;
	this.getY = that.getY;
	this.getZ = that.getZ;
	this.getW = that.getW;

	this.setX = that.setX;
	this.setY = that.setY;
	this.setZ = that.setZ;
	this.setW = that.setW;

	this.minus = that.minus;
	this.add = that.add;
	this.minusAssign = that.minusAssign;
	this.addAssign = that.addAssign;
	this.lerpTowards = that.lerpTowards;
	this.normalise = that.normalise;
	this.normaliseSelf = that.normaliseSelf;
};

//-----------------------------------------------------------------------------
// Physics.
//

var physicsWorld = function() {
	var that = {};

// public:

	this.update = function() {
		if ( that.bPaused ) {
			return;
		}

		var ePhysicsBodies = $('[' + that.DATA_ATTR + ']');

		$(ePhysicsBodies).each(function() {
			var eElement = $(this);
			var body = eElement.data(that.DATA_ATTR);

			// Apply gravity.
			body.addTargetVelocity(that.vGravity);

			// Solve collisions.
			var overlap = body.solve(that.iPhysicsStep);
			if ( overlap != null ) {
				var vZero = new vec2(0, 0);

				body.setTargetVelocity(vZero);
				body.setCurrentVelocity(vZero);
			}

			// Integrate position.
			body.update(that.iPhysicsStep, overlap);

			// Get the new position for updating render.
			var vNewPos = body.getPosition();

			$(eElement).offset({
				left: vNewPos.getX(),
				top: vNewPos.getY()
			});

			body.debugDraw();
		});
	}

	this.getDataAttr = function() {
		return that.DATA_ATTR;
	}

	this.addBody = function(body) {
		that.aBodies.push(body);
	}
	this.getBodies = function() {
		return that.aBodies;
	}
	this.getDebugDraw = function() {
		return that.bDebugDrawPhysics;
	}

	this.togglePause = function() {
		that.bPaused = !that.bPaused;
	}
	this.toggleDebugDraw = function() {
		that.bDebugDrawPhysics = !that.bDebugDrawPhysics;
	}

// private:
	that.DATA_ATTR = "physics-body";

	// Default time step of 60Hz (1Hz in DEBUG)
	that.iTimeStep = utils.isDebug() ? 1.0 : 1.0 / 60.0;
	that.iTimeStep *= 1000;

	// +ve is down in a browser.
	that.vGravity = new vec2(0, 0.98);

	that.iPhysicsStep = setInterval(this.update, that.iTimeStep);

	that.aBodies = [];

	that.bPaused = false;
	that.bDebugDrawPhysics = false;

	return this;
};

var physicsBody = function(inElement, inX, inY, bStatic) {
	var that = {};

// public:

	// Accessors.
	this.getPosition = function() {
		return that.vPosition;
	}
	this.setPosition = function(vInput) {
		that.vPosition = vInput;
	}
	this.getCurrentVelocity = function() {
		return that.vCurrentVel;
	}
	this.setCurrentVelocity = function(vInput) {
		that.vCurrentVel = vInput;
	}
	this.addCurrentVelocity = function(vInput) {
		that.vCurrentVel.addAssign(vInput);
	}
	this.getTargetVelocity = function() {
		return that.vTargetVel;
	}
	this.setTargetVelocity = function(vInput) {
		that.vTargetVel = vInput;
	}
	this.addTargetVelocity = function(vInput) {
		that.vTargetVel.addAssign(vInput);
	}
	this.getIsStatic = function() {
		return that.bIsStatic;
	}
	this.getTargetElement = function() {
		return that.eTarget;
	}
	this.getIsCircle = function() {
		return false;
	}

	this.update = function(iDeltaTime, iOverlap) {
		if ( !that.bIsStatic ) {
			that.vCurrentVel.lerpTowards(that.vTargetVel, iDeltaTime);

			that.vPosition.addAssign(that.vCurrentVel);

			if ( iOverlap != null ) {
				//vPenetration.setX(0);

				var vTest = new vec2(0, -iOverlap);
				that.vPosition.addAssign(vTest);
			}
		}
	}
	this.solve = function() {
		console.error("Error: should not be solving physics on base body type!");
	}
	this.initDebug = function() {

	}
	this.debugDraw = function() {
		var fTarget = thePhysicsWorld.getDebugDraw() ? "show" : "hide";
		this.getTargetElement().find('.debugBounds')[fTarget]();
	}

// private:
	that.vPosition = new vec2(inX, inY);
	that.vCurrentVel = new vec2(0, 0);
	that.vTargetVel = new vec2(0, 0);
	that.bIsStatic = bStatic;
	that.eTarget = inElement;

	return this;
};

// TODO:
/*

var physicsCircle = function(inX, inY, inRadius) {
	var that = physicsBody();

// public:
	this.solve = function() {
		// TODO: use circular collision.
	}

	this.getRadius = function() {
		return that.iRadius;
	}

	this.getIsCircle = function() {
		return true;
	}

// private:
	that.iRadius = inRadius;
}
*/

var physicsBox = function(inElement, inX, inY, inStatic, inWidth, inHeight) {
	var that = physicsBody(inElement, inX, inY, inStatic);

// public:
	this.solve = function(iDeltaTime) {
		if ( !this.getIsStatic() ) {

			// TEST
			var eFloor = $('#floor');
			var floorBody = eFloor.data("physics-body");

			//var vPenetration = utils.collision.rectangular(this, floorBody);

			var output = utils.collision.getMTV(this, floorBody);

			return output.overlap;
		}
	}

	this.initDebug = function() {
		var eElement = this.getTargetElement();

		var iWidth = $(eElement).outerWidth();
		var iHeight = $(eElement).outerHeight();

		var eDebugDraw = $("<div class='debugBounds'></div>");

		$(eDebugDraw).css({
			width: iWidth + "px",
			height: iHeight + "px",
			display: "none"
		});

		$(eElement).append(eDebugDraw);
	}

	this.getWidth = function() {
		return this.iWidth;
	}
	this.getHeight = function() {
		return this.iHeight;
	}

	this.getPosition = that.getPosition;
	this.setPosition = that.setPosition;
	
	this.getCurrentVelocity = that.getCurrentVelocity;
	this.setCurrentVelocity = that.setCurrentVelocity;
	this.addCurrentVelocity = that.addCurrentVelocity; 
	
	this.getTargetVelocity = that.getTargetVelocity;
	this.setTargetVelocity = that.setTargetVelocity;
	this.addTargetVelocity = that.addTargetVelocity;

	this.getIsStatic = that.getIsStatic;
	this.getTargetElement = that.getTargetElement;
	this.getIsCircle = that.getIsCircle;

	this.update = that.update;
	this.debugDraw = that.debugDraw;

// private:

	this.iWidth = inWidth;
	this.iHeight = inHeight;
}
