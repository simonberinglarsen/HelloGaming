var game = new Phaser.Game(320, 200, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {


    game.load.tilemap('map', 'assets/tilemaps/csv/simon.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'assets/tilemaps/tiles/simon.png');

}

var map;
var layer;
var cursors;

function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map', 16, 16);

    //  Now add in the tileset
    map.addTilesetImage('tiles');
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();

    game.add.text(2,2 , 'Liv  01', { font: '12px Arial Black', fill: '#000000' }).fixedToCamera = true;
    game.add.text(100,2 , 'Score  00100', { font: '12px Arial Black', fill: '#000000' }).fixedToCamera = true;
    game.add.text(250,2 , 'Level 01', { font: '12px Arial Black', fill: '#000000' }).fixedToCamera = true;
    

}

function update() {

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

}

function render() {

}
       