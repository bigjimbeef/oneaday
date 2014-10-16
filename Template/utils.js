var utils = {

	isDebug: function() {
		return typeof(_IS_DEBUG) != "undefined";
	},

	collision: {

		getVertsForBox: function(body) {
			var left = body.getPosition().getX();
			var right = body.getPosition().getX() + body.getWidth();
			var top = body.getPosition().getY();
			var bottom = body.getPosition().getY() + body.getHeight();

			var aVerts = [];
			aVerts.push(new vec2(left, top));
			aVerts.push(new vec2(right, top));
			aVerts.push(new vec2(right, bottom));
			aVerts.push(new vec2(left, bottom));

			return aVerts;
		},

		getAxesForBox: function(body) {
			var aAxes = [];

			var aVerts = utils.collision.getVertsForBox(body);

			for ( var i = 0; i < aVerts.length; ++i ) {
				var v1 = aVerts[i];
				var v2 = aVerts[(i == aVerts.length - 1) ? 0 : i + 1];

				var vEdge = v2.minus(v1, vEdge);
				vEdge.normaliseSelf();

				var vPerp = vEdge.getPerp(vPerp);

				aAxes.push(vPerp);
			}

			return aAxes;
		},

		get2DProjection: function(aVerts, vAxis) {
			var min = utils.vector.dot(vAxis, aVerts[0]);
			var max = min;

			for ( var i = 1; i < aVerts.length; ++i ) {
				var p = utils.vector.dot(vAxis, aVerts[i]);

				if ( p < min ) {
					min = p;
				}
				else if ( p > max ) {
					max = p;
				}
			}

			return {
				min: min,
				max: max
			};
		},

		getAxesFromBodies: function(eOne, eTwo) {
			var aBodyOneAxes = [];
			var aBodyTwoAxes = [];

			var bOneIsCircle = eOne.getIsCircle();
			var bTwoIsCircle = eTwo.getIsCircle();

			if ( bOneIsCircle && bTwoIsCircle ) {
				// TODO:
			}
			else if ( bOneIsCircle ^ bTwoIsCircle ) {
				// TODO:
			}
			else {
				aBodyOneAxes = utils.collision.getAxesForBox(eOne);
				aBodyTwoAxes = utils.collision.getAxesForBox(eTwo);
			}

			return {
				one: aBodyOneAxes,
				two: aBodyTwoAxes
			}
		},

		hasOverlap: function(p1, p2) {
			if ( p1.max < p2.min || p2.max < p2.min ) {
				return false;
			}

			return true;
		},

		getOverlap: function(p1, p2) {
			if ( !utils.collision.hasOverlap(p1, p2) ) {
				console.error("Checking non-overlapping objects!");
				return 0;
			}

			var overlap = Math.min(p1.max, p2.max) - Math.max(p1.min, p2.min);

			return overlap;
		},

		getMTV: function(eOne, eTwo) {
			var axes = utils.collision.getAxesFromBodies(eOne, eTwo);

			var aBodyOneAxes = axes.one;
			var aBodyTwoAxes = axes.two;

			var smallestAxis = null;
			var minOverlap = Number.MAX_VALUE;

			var aBodyOneVerts = utils.collision.getVertsForBox(eOne);
			var aBodyTwoVerts = utils.collision.getVertsForBox(eTwo);

			// Shape 1 axes.
			for ( var i = 0; i < aBodyOneAxes.length; ++i ) {
				var vAxis = aBodyOneAxes[i];

				var p1 = utils.collision.get2DProjection(aBodyOneVerts, vAxis);
				var p2 = utils.collision.get2DProjection(aBodyTwoVerts, vAxis);

				if ( !utils.collision.hasOverlap(p1, p2) ) {
					return false;
				}
				else {
					var overlap = utils.collision.getOverlap(p1, p2);

					if ( overlap < minOverlap ) {
						minOverlap = overlap;
						smallestAxis = vAxis;
					}
				}
			}
			// Shape 2 axes.
			for ( var i = 0; i < aBodyTwoAxes.length; ++i ) {
				var vAxis = aBodyTwoAxes[i];

				var p1 = utils.collision.get2DProjection(aBodyOneVerts, vAxis);
				var p2 = utils.collision.get2DProjection(aBodyTwoVerts, vAxis);

				if ( !utils.collision.hasOverlap(p1, p2) ) {
					return false;
				}
				else {
					var overlap = utils.collision.getOverlap(p1, p2);

					if ( overlap < minOverlap ) {
						minOverlap = overlap;
						smallestAxis = vAxis;
					}
				}
			}

			return {
				overlap: minOverlap,
				axis: smallestAxis
			}
		},

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
			var leftOne = bodyOne.getPosition().getX();
			var rightOne = bodyOne.getPosition().getX() + bodyOne.getWidth();
			var topOne = bodyOne.getPosition().getY();
			var bottomOne = bodyOne.getPosition().getY() + bodyOne.getHeight();

			var leftTwo = bodyTwo.getPosition().getX();
			var rightTwo = bodyTwo.getPosition().getX() + bodyTwo.getWidth();
			var topTwo = bodyTwo.getPosition().getY();
			var bottomTwo = bodyTwo.getPosition().getY() + bodyTwo.getHeight();

			if ( rightOne < leftTwo ) {
				return null;
			}
			if ( leftOne > rightTwo ) {
				return null;
			}
			if ( bottomOne < topTwo ) {
				return null;
			}
			if ( topOne > bottomTwo ) {
				return null;
			}

			var xAxis = new vec2(1, 0);
			var yAxis = new vec2(0, 1);

			var oneDotX = utils.vector.dot(bodyOne.getPosition(), xAxis);
			var oneDotY = utils.vector.dot(bodyOne.getPosition(), yAxis);

			var twoDotX = utils.vector.dot(bodyTwo.getPosition(), xAxis);
			var twoDotY = utils.vector.dot(bodyTwo.getPosition(), yAxis);

			debugger

			/*
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
			*/

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

			var box = new physicsBox(eTarget, vPosition.getX(), vPosition.getY(), bStatic, iWidth, iHeight);

			thePhysicsWorld.addBody(box);

			$(eTarget).data(sAttr, box);
			$(eTarget).attr(sAttr, true);

			box.initDebug();
		},

		getPhysicsBody: function(eTarget) {
			if ( !thePhysicsWorld ) {
				console.error("No physics world initialised!");
			}
			var sAttr = thePhysicsWorld.getDataAttr();

			if ( $(eTarget).data(sAttr) ) {
				return $(eTarget).data(sAttr);
			}
		}
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
		},

		dot: function(vFrom, vTo) {
			return ( vFrom.getX() * vTo.getX() ) + ( vFrom.getY() * vTo.getY() ) + ( vFrom.getZ() * vTo.getZ() ) + ( vFrom.getW() * vTo.getW() );
		}
	}
};