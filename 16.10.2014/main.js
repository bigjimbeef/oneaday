//_IS_DEBUG = 1;

var thePhysicsWorld = null;

$(document).ready(function() {
	// Create the physics world.
	thePhysicsWorld = new physicsWorld();

	thePhysicsWorld.toggleDebugDraw();

	utils.physics.createPhysicsBox($('#player'));

	utils.physics.createPhysicsBox($('#floor'), true);
});