var utils = {

	collision: {
		circular: function(eOne, eTwo) {
			var offsetOne = $(eOne).offset();
			var widthOne = $(eOne).outerWidth();
			var heightOne = $(eOne).outerHeight();

			var offsetTwo = $(eTwo).offset();
			var widthTwo = $(eTwo).outerWidth();
			var heightTwo = $(eTwo).outerHeight();

			var vOne = new vec2(offsetOne.left + (widthOne / 2), offsetOne.top + (heightOne / 2));
			var vTwo = new vec2(offsetTwo.left + (widthTwo / 2), offsetTwo.top + (heightTwo / 2));

			var maxDistance = Math.pow((( widthOne / 2 ) + ( widthTwo / 2 )), 2);

			return utils.vector.squareDistance(vOne, vTwo) < maxDistance;
		},
		rectangular: function(eOne, eTwo) {

		}
	},

	vector: {
		squareLength: function(vInput) {
			return Math.pow(vInput.getX(), 2) + Math.pow(vInput.getY(), 2) + Math.pow(vInput.getZ(), 2) + Math.pow(vInput.getW(), 2);
		},

		length: function(vInput) {
			return Math.sqrt(this.squareLength(vInput));
		},

		squareDistance: function(vFrom, vTo) {
			var vToTarget = vTo.minus(vFrom, vToTarget);
			return this.squareLength(vToTarget);
		},

		distance: function(vFrom, vTo) {
			return Math.sqrt(this.squareDistance(vFrom, vTo));
		}
	}
};