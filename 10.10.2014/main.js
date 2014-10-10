//_IS_DEBUG = 1;

var thePhysicsWorld = new physicsWorld();

$(document).ready(function() {
	utils.physics.createPhysicsBox($('#player'));

	utils.physics.createPhysicsBox($('#floor'), true);
});