var gameState = function() {
	var that = {};

	that.iMinSpeed = 5;
	that.iLettersDestroyed = 0;
	that.iSpawnChance = 0.45;

	setInterval(function() {
		that.iMinSpeed -= 0.05;
		that.iSpawnChance = max(0, that.iSpawnChance - 0.01);
	}, 1000);

	this.getMinSpeed = function() {
		return that.iMinSpeed;
	};

	this.destroyedLetter = function() {
		that.iLettersDestroyed++;
	};

	this.getNumLettersDestroyed = function() {
		return that.iLettersDestroyed;
	}

	this.reset = function() {
		that.iMinSpeed = 5;
		that.iLettersDestroyed = 0;
		that.iSpawnChance = 0.45;
	};

	this.getSpawnChance = function() {
		return that.iSpawnChance;
	};

	return this;
};
var theGameState = new gameState();

function getAvailablePosition() {
	var iBuffer = 100;
	var iMaxW = $(document).width() - iBuffer;
	var iMaxH = $(document).height() - iBuffer;

	var iRandomX = Math.max(iBuffer, Math.random() * iMaxW);
	var iRandomY = Math.max(iBuffer, Math.random() * iMaxH);

	var pos = new vec2(iRandomX, iRandomY);

	return pos;
};

function gameOver() {
	var iDestroyed = theGameState.getNumLettersDestroyed();

	$('.letter').each(function() {
		$(this).click();
		$(this).remove();
	});

	alert("You destroyed " + iDestroyed + " letters. Great jorb.");

	theGameState.reset();
}

var aLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var letter = function() {
	var iLifetime = 0;

	// Get a free position.
	var vPosition = getAvailablePosition();

	var sRandomLetter = aLetters[parseInt(Math.random() * aLetters.length)];
	var eElement = $('<div class="letter">' + sRandomLetter + '</div>');

	var iMin = theGameState.getMinSpeed();
	var iMax = iMin * 3;

	var iDuration = iMin + (Math.random() * (iMax - iMin));
	// Faster ones get bigger to prompt action
	var iProportion = 1.0 - ((iDuration - iMin) / (iMax - iMin));

	var DEFAULT_SCALE = 3.0;
	var MAX_EXTRA_SCALE = 3.0;
	var iScale = DEFAULT_SCALE + ( iProportion * MAX_EXTRA_SCALE );

	eElement.css({
		left: vPosition.getX() + "px",
		top: vPosition.getY() + "px"
	});

	// Add to the DOM.
	$('#container').append(eElement);

	var iTimeout = setTimeout(function() {
		gameOver();
	}, iDuration * 1000);

	// Ensure we're added to the DOM!
	setTimeout(function() {
		$(eElement).css({
			"-webkit-transition": "all " + iDuration + "s linear",
			"-webkit-transform": "scale(" + iScale + "," + iScale + ")",
			"background-color": "red",
			"-moz-transition": "all " + iDuration + "s linear",
			"-moz-transform": "scale(" + iScale + "," + iScale + ")",
		});

		$(eElement).click(function() {
			clearTimeout(iTimeout);
		});

	}, 100);
};

function spawnLetter() {
	var eNewLetter = new letter();
}

$(document).ready(function() {
	// Begin spawning keys.
	setInterval(function() {
		if ( Math.random() > theGameState.getSpawnChance() ) {
			spawnLetter();
		}
	}, 300);

	// Destroy the keys.
	$(document).keydown(function(e) {
		var sKey = String.fromCharCode(e.keyCode);

		$('#container div.letter').each(function() {
			if ( $(this).html().toLowerCase() == sKey.toLowerCase() ) {
				$(this).click();

				$(this).remove();

				theGameState.destroyedLetter();
			}
		});
	});
});