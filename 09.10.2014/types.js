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

	return this;
}

var vec2 = function(inX, inY) {
	var that = vector(inX, inY);

	this.getX = that.getX;
	this.getY = that.getY;
	this.getZ = function() { return 0; };
	this.getW = function() { return 0; };

	this.setX = that.setX;
	this.setY = that.setY;
	this.setZ = function() {};
	this.setW = function() {};

	this.minus = that.minus;
	this.add = that.add;
}

var vec3 = function(inX, inY, inZ) {
	var that = vector(inX, inY, inZ);

	this.getX = that.getX;
	this.getY = that.getY;
	this.getZ = that.getZ;
	this.getW = function() { return 0; };

	this.setX = that.setX;
	this.setY = that.setY;
	this.setZ = that.setZ;
	this.setW = function() {};

	this.minus = that.minus;
	this.add = that.add;
}

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
}
