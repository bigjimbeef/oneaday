//_IS_DEBUG = 1;

var thePhysicsWorld = null;

$(document).ready(function() {
	// Create the physics world.
	thePhysicsWorld = new physicsWorld();

	utils.physics.createPhysicsBox($('#player'));

	utils.physics.createPhysicsBox($('#floor'), true);
});