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
					return null;
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
					return null;
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