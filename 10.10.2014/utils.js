var utils = {

	isDebug: function() {
		return typeof(_IS_DEBUG) != "undefined";
	},

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

		rectangular: function(bodyOne, bodyTwo) {
			var oneX = bodyOne.getPosition().getX();
			var oneY = bodyOne.getPosition().getY();
			var oneW = bodyOne.getWidth();
			var oneH = bodyOne.getHeight();
			var oneCenterX = oneX + ( oneW / 2.0 );
			var oneCenterY = oneY + ( oneH / 2.0 );

			var twoX = bodyTwo.getPosition().getX();
			var twoY = bodyTwo.getPosition().getY();
			var twoW = bodyTwo.getWidth();
			var twoH = bodyTwo.getHeight();
			var twoCentreX = twoX + ( twoW / 2.0 );
			var twoCentreY = twoY + ( twoH / 2.0 );

			var centreXDiff = twoCentreX - oneCenterX;
			var centreYDiff = twoCentreY - oneCenterY;

			var halfWidthSum = ( oneW / 2.0 ) + ( twoW / 2.0 );
			var halfHeightSum = ( oneH / 2.0 ) + ( twoH / 2.0 );

			// Detect intersection.
			if ( Math.abs(centreXDiff) < halfWidthSum ) {
				if ( Math.abs(centreYDiff) < halfHeightSum ) {
					var xSign = centreXDiff >= 0 ? 1 : -1;
					var xPen = xSign * (halfHeightSum - Math.abs(centreXDiff));

					var ySign = centreYDiff >= 0 ? 1 : -1;
					var yPen = ySign * (halfHeightSum - Math.abs(centreYDiff));

					return new vec2(xPen, yPen);
				}
			}

			return null;
		}

	},

	physics: {
		createPhysicsBox: function(eTarget, bStatic) {
			if ( !thePhysicsWorld ) {
				console.error("No physics world initialised!");
			}
			var sAttr = thePhysicsWorld.getDataAttr();
			
			var vPosition = utils.vector.offsetToVector(eTarget);
			var iWidth = $(eTarget).outerWidth();
			var iHeight = $(eTarget).outerHeight();

			var box = new physicsBox(vPosition.getX(), vPosition.getY(), bStatic, iWidth, iHeight);

			thePhysicsWorld.addBody(box);

			$(eTarget).data(sAttr, box);
			$(eTarget).attr(sAttr, true);
		},

		getPhysicsBody: function(eTarget) {
			if ( !thePhysicsWorld ) {
				console.error("No physics world initialised!");
			}
			var sAttr = thePhysicsWorld.getDataAttr();

			if ( $(eTarget).data(sAttr) ) {
				return $(eTarget).data(sAttr);
			}
		},
	},

	vector: {
		offsetToVector: function(eElement) {
			var oOffset = $(eElement).offset();

			return new vec2(oOffset.left, oOffset.top);
		},

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