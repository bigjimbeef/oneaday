var iDefaultMax = 5;
var iMax = iDefaultMax;
var iKeptAway = 0;
var iSpawnInterval;

function gameOver() {
	alert("You kept alive for " + iKeptAway + " seconds.");

	$('.enemy').remove();

	iMax = iDefaultMax;
	iKeptAway = 0;
}

function stopSpawning() {
	clearInterval(iSpawnInterval);
}

function bindEvents() {
	var ePlayer = $('#player');

	$('html').mousemove(function(e) {
		var xPos = e.clientX;
		var yPos = e.clientY;

		$(ePlayer).offset({
			top: yPos,
			left: xPos
		});
	});
}

function testCollision(eOne, eTwo) {
	var oneX = $(eOne).offset().left;
	var oneY = $(eOne).offset().top;
	var oneW = $(eOne).outerWidth();
	var oneH = $(eOne).outerHeight();
	var oneCenterX = oneX + ( oneW / 2.0 );
	var oneCenterY = oneY + ( oneH / 2.0 );

	var twoX = $(eTwo).offset().left;
	var twoY = $(eTwo).offset().top;
	var twoW = $(eTwo).outerWidth();
	var twoH = $(eTwo).outerHeight();
	var twoCentreX = twoX + ( twoW / 2.0 );
	var twoCentreY = twoY + ( twoH / 2.0 );

	var centreXDiff = twoCentreX - oneCenterX;
	var centreYDiff = twoCentreY - oneCenterY;

	var largestW = oneW > twoW ? oneW : twoW;
	var largestH = oneH > twoH ? oneH : twoH;

	if ( Math.abs(centreXDiff) < largestW ) {
		if ( Math.abs(centreYDiff) < largestH ) {
			return true;
		}
	}

	return false;
}

function spawnEnemy() {
	var iRefreshRate = 16;

	var eEnemy = $('<div class="enemy">E</div>');

	$('#enemies').append(eEnemy);

	var thisEnemy = $(eEnemy);

	var randomX = Math.random() * iMax;
	var randomY = Math.random() * iMax;

	$(thisEnemy).data("dirX", randomX);
	$(thisEnemy).data("dirY", randomY);

	setInterval(function() {
		if ( testCollision($(thisEnemy), $('#player')) ) {
			gameOver();
		}
	}, iRefreshRate);

	setInterval(function() {
		var xPos = $(thisEnemy).offset().left;
		var yPos = $(thisEnemy).offset().top;
		var xDir = $(thisEnemy).data("dirX");
		var yDir = $(thisEnemy).data("dirY");

		xPos = xPos + xDir;
		yPos = yPos + yDir;

		var targetX = $(document).width() - $(thisEnemy).outerWidth() - 5;
		if ( xPos >= targetX || xPos < 0 ) {
			xDir *= -1;
			$(thisEnemy).data("dirX", xDir);
		}

		var targetY = $(document).height() - $(thisEnemy).outerHeight() - 5;
		if ( yPos >= targetY || yPos < 0 ) {
			yDir *= -1;
			$(thisEnemy).data("dirY", yDir);
		}
		
		$(thisEnemy).css({
			left: xPos,
			top: yPos
		});

	}, iRefreshRate);
}

$(document).ready(function() {
	bindEvents();

	setInterval(function() {
		iMax++;
	}, 10000);

	iSpawnInterval = setInterval(function() {
		if ( Math.random() > 0.5 ) {
			spawnEnemy();
		}
	}, 1000);

	setInterval(function() {
		iKeptAway++;
	}, 1000);
});