//-----------------------------------------------------------------------------
// Vectors
//
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
		vOutput = new vector();
		
		vOutput.setX(this.getX() - vInput.getX());
		vOutput.setY(this.getY() - vInput.getY());
		vOutput.setZ(this.getZ() - vInput.getZ());
		vOutput.setW(this.getW() - vInput.getW());

		return vOutput;
	}

	this.add = function(vInput, vOutput) {
		vOutput = new vector();
		
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
};

var vec4 = function(inX, inY, inZ) {
	var that = vector(inX, inY, inZ);

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
};

//-----------------------------------------------------------------------------
// Physics.
//

var physicsWorld = function() {
	var that = {};

// public:

	this.update = function() {
		if ( utils.isDebug() ) {
			console.log("DEBUG: Updating physicsWorld...");
		}

		var ePhysicsBodies = $('[' + that.DATA_ATTR + ']');

		$(ePhysicsBodies).each(function() {
			var eElement = $(this);
			var body = eElement.data(that.DATA_ATTR);

			// Apply gravity.
			body.addTargetVelocity(that.vGravity);

			// Solve collisions.
			var bCollided = body.solve(that.iPhysicsStep);
			if ( bCollided ) {
				var vZero = new vec2(0, 0);

				body.setTargetVelocity(vZero);
				body.setCurrentVelocity(vZero);
			}

			// Integrate position.
			body.update(that.iPhysicsStep);

			// Get the new position for updating render.
			var vNewPos = body.getPosition();

			$(eElement).offset({
				left: vNewPos.getX(),
				top: vNewPos.getY()
			});
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

// private:
	that.DATA_ATTR = "physics-body";

	// Default time step of 60Hz (1Hz in DEBUG)
	that.iTimeStep = utils.isDebug() ? 1.0 : 1.0 / 60.0;
	that.iTimeStep *= 1000;

	// +ve is down in a browser.
	that.vGravity = new vec2(0, 0.098);

	that.iPhysicsStep = setInterval(this.update, that.iTimeStep);

	that.aBodies = [];

	return this;
};

var physicsBody = function(inX, inY, bStatic) {
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

	this.update = function(iDeltaTime) {
		if ( !that.bIsStatic ) {
			that.vCurrentVel.lerpTowards(that.vTargetVel, iDeltaTime);

			that.vPosition.addAssign(that.vCurrentVel);
		}
	}
	this.solve = function() {
		console.error("Error: should not be solving physics on base body type!");
	}

// private:
	that.vPosition = new vec2(inX, inY);
	that.vCurrentVel = new vec2(0, 0);
	that.vTargetVel = new vec2(0, 0);
	that.bIsStatic = bStatic;

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


// private:
	that.iRadius = inRadius;
}
*/

var physicsBox = function(inX, inY, inStatic, inWidth, inHeight) {
	var that = physicsBody(inX, inY, inStatic);

// public:
	this.solve = function(iDeltaTime) {
		if ( !this.getIsStatic() ) {

			// TEST
			var eFloor = $('#floor');
			var floorBody = eFloor.data("physics-body");

			var bCollided = utils.collision.rectangular(this, floorBody);

			return bCollided;
		}
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

	this.update = that.update;

// private:

	this.iWidth = inWidth;
	this.iHeight = inHeight;
}
