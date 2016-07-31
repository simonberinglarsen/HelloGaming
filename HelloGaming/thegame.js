var game = new Phaser.Game(320, 192, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });


function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(3, 3);

    game.load.tilemap('map', 'assets/tilemaps/csv/simon.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'assets/tilemaps/tiles/simon.png');
    game.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
    


}

var map;
var layer;
var cursors;
var player;
var jumpTimer = 0;
var jumpButton;
var facing = 'left';

var speed = 100;
var jumpSpeed = 250;
var bounce = 0.2;
var onLadder = false;
var onLadderTop = false;
var inWater = false;
var inDoor = false;
var text;
var powerup1 = false;
var powerup2 = false;
var powerup3 = false;
var powerup4 = false;


function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map', 16, 16);
    
    //  Now add in the tileset
    map.addTilesetImage('tiles');

    //  Create our layer
    layer = map.createLayer(0);
    
    //  Resize the world
    layer.resizeWorld();
    
    //  This isn't totally accurate, but it'll do for now
    map.setCollisionBetween(0, 0);
    map.setCollisionBetween(7, 7);
    map.setCollisionBetween(10, 10);
    map.setTileIndexCallback(4, ladderCallback, this);
    map.setTileIndexCallback(3, ladder2Callback, this);
    map.setTileIndexCallback(2, waterCallback, this);
    map.setTileIndexCallback(28, waterCallback, this);
    map.setTileIndexCallback(34, doorCallback, this);
    map.setTileIndexCallback(56, powerup1Callback, this);
    map.setTileIndexCallback(57, powerup2Callback, this);
    map.setTileIndexCallback(58, powerup3Callback, this);
    map.setTileIndexCallback(59, powerup4Callback, this);

    //  Un-comment this on to see the collision tiles
    //layer.debug = true;
  
    //  Player
    player = game.add.sprite(2, 48, 'player', 1);
    player.animations.add('left', [5,6], 8, true);
    player.animations.add('right', [0,1], 8, true);
    player.animations.add('swimleft', [13,14], 8, true);
    player.animations.add('swimright', [11,12], 8, true);
    player.animations.add('up', [7,8,9], 8, true);
    player.animations.add('down', [2,3,4], 8, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;

    player.body.bounce.y = bounce;
    player.body.collideWorldBounds = true;
    player.body.setSize(10, 14, 2, 1);

    //game.camera.follow(player);

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(0,0, "", {
        font: "12px Consolas",
        fill: "#000",
        align: "left"
    });
    text.anchor.setTo(0, 0);


}


function powerup1Callback()
{
    powerup1 = true;
}
function powerup2Callback()
{
    powerup2 = true;
}
function powerup3Callback()
{
    powerup3 = true;
}
function powerup4Callback()
{
    powerup4 = true;
}

function doorCallback()
{
    inDoor = true;
}
function ladderCallback()
{
    onLadder = true;
}

function ladder2Callback()
{
    onLadderTop = true;
    onLadder = true;
}

function waterCallback()
{
    inWater = true;
}

function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.gravity.y = 1000;
    player.body.bounce.y = bounce;
   
    if(powerup1)
    {
         
    }
	if(powerup2)
    {
         
    }
	if(powerup3)
    {
         
    }
    if(powerup4)
    {
         
    }
    if(inDoor)
    {
         
    }
    if(onLadder){
        player.body.velocity.y = 0;
        game.physics.arcade.gravity.y = 0;
    }
    if(inWater) {
        game.physics.arcade.gravity.y = 100;
        player.body.bounce.y = 0;
    }
    text.setText(
        "d="+(0+inDoor)
        +",lt="+(0+onLadderTop)
        +",l="+(0+onLadder)
        +",w="+(0+inWater)
        +",p1="+(0+powerup1)
        +",p2="+(0+powerup2)
        +",p3="+(0+powerup3)
        +",p4="+(0+powerup4)
        );
    

    player.body.velocity.x = 0;
    var isIdle = true;

    if ((cursors.up.isDown || jumpButton.isDown) && onLadder)
    {
        player.body.velocity.y = -speed;
        isIdle = false;
        if (facing != 'up')
        {
            player.animations.play('up');
            facing = 'up';
        }
    }
    else if (cursors.down.isDown && onLadder)
    {
        player.body.velocity.y = speed;
        isIdle = false;
        if (facing != 'down')
        {
            player.animations.play('down');
            facing = 'down';
        }
    }
    if (cursors.left.isDown)
    {
        if(onLadderTop)
            player.body.velocity.y = -speed/2;
        player.body.velocity.x = -speed;
        isIdle = false;
        if (facing != 'left' && !inWater)
        {
            player.animations.play('left');
            facing = 'left';
        }
        if (facing != 'swimleft' && inWater)
        {
            player.animations.play('swimleft');
            facing = 'swimleft';
        }
    }
    else if (cursors.right.isDown)
    {
        if(onLadderTop)
            player.body.velocity.y = -speed/2;
        player.body.velocity.x = speed;
        isIdle = false;
        if (facing != 'right' && !inWater)
        {
            player.animations.play('right');
            facing = 'right';
        }
        if (facing != 'swimright' && inWater)
        {
            player.animations.play('swimright');
            facing = 'swimright';
        }
    }
    
    if (isIdle && facing != 'idle')
    {
        player.animations.stop();

        if (facing == 'left')
            player.frame = 7;
        else if (facing == 'left')
            player.frame = 1;
        else if (facing == 'left')
            player.frame = 1;
        else if (facing == 'left')
            player.frame = 1;
            player.frame = 2;

        facing = 'idle';
    }
    
    if(game.time.now > jumpTimer && jumpButton.isDown)
    {
        
        if(inWater)
        {
            player.body.velocity.y = -50;
            jumpTimer = game.time.now + 250;
        }
        else if (player.body.onFloor())
        {
            player.body.velocity.y = -jumpSpeed;
            jumpTimer = game.time.now + 1;
        }
    }
    // reset all
    onLadder = false;
    onLadderTop = false;
    inWater = false;
    inDoor = false;
    powerup1 = false;
	powerup2 = false;
	powerup3 = false;
    powerup4 = false;
}

function render() {
    game.debug.text('Click to disable body1', 32, 32);



}
