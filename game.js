var config = {
    type: Phaser.AUTO,
    width: 2200,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
};
var player;
var stars;
var game = new Phaser.Game(config);
var platforms;
var cursors;
var score = 0;
var scoreText;

function preload ()
{
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('witch', 'assets/B_witch_run2.png',{ frameWidth: 32, frameHeight: 48 }
        );
    
}

function create ()
{
    this.add.image(200,10, 'sky').setScale(1000);
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.create(200, 900, 'ground');
    platforms.create(600, 900, 'ground');
    platforms.create(1000, 900, 'ground');
    platforms.create(1400, 900, 'ground');
    platforms.create(1800, 900, 'ground');
    platforms.create(2200, 900, 'ground');
    platforms.create(2600, 900, 'ground');
    platforms.create(1300, 500, 'ground');
    platforms.create(1600, 320, 'ground');
    platforms.create(2000, 200, 'ground');

    


    player = this.physics.add.sprite(100, 400, 'witch').setScale(2);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'witch', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Встановлення меж фізичного світу
  this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Слідкування камери за гравцем
  this.cameras.main.startFollow(player);
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
// Константа, щоб визначити ширину фону
const WORLD_WIDTH = 5000; // Змінено ширину світу для відображення додаткової платформи
