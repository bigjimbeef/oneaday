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
};

//-----------------------------------------------------------------------------
// Physics.
//

var physicsWorld = function() {
	var that = {};

// public:

	this.update = function() {
		if ( _IS_DEBUG ) {
			console.log("DEBUG: Updating physicsWorld...");
		}

		var ePhysicsBodies = $('[data-' + that.DATA_ATTR + ']');

		$(ePhysicsBodies).each(function() {
			var eElement = $(this);
			var body = eElement.data(that.DATA_ATTR);

			console.log(body);
		});
	}

	this.getDataAttr = function() {
		return that.DATA_ATTR;
	}

// private:
	that.DATA_ATTR = "physics-body";

	// Default time step of 60Hz (1Hz in DEBUG)
	that.iTimeStep = _IS_DEBUG ? 1.0 : 1.0 / 60.0;

	that.vGravity = new vec2(0, -9.8);

	that.iPhysicsStep = setInterval(this.update, that.iTimeStep);

	return this;
};

var physicsBody = function() {
	var that = {};

// public:

	this.getVelocity = function() {
		return that.vVelocity;
	}
	this.addVelocity = function(vInput) {
		that.vVelocity.addAssign(vInput);
	}

	this.solve = function() {
		console.error("Error: should not be solving physics on base body type!");
	}

// private:

	that.vVelocity = new vec2(0, 0);

	return this;
};


var physicsCircle = function(inRadius) {
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

var physicsBox = function(inWidth, inHeight) {
	var that = physicsBody();

// public:
	this.solve = function() {
		// TODO: use rectangular collision.
	}

	this.getWidth = function() {
		return that.iWidth;
	}
	this.getHeight = function() {
		return that.iHeight;
	}

// private:
	that.iWidth = inWidth;
	that.iHeight = inHeight;
}