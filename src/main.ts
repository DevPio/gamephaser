import Phaser from "phaser";

class Game extends Phaser.Scene {
  plataforms!: Phaser.Physics.Arcade.StaticGroup;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  autronaut!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor() {
    super();
  }

  preload() {
    this.load.image("ground", "src/assets/UI/GaugeSections.png");

    this.load.spritesheet("dude", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.spritesheet(
      "autronaut",
      "src/assets/Astronaut/Astronaut_Run.png",
      {
        frameWidth: 24,
        frameHeight: 24,
      }
    );
    this.load.spritesheet(
      "autronautStop",
      "src/assets/Astronaut/Astronaut_Idle.png",
      {
        frameWidth: 24,
        frameHeight: 24,
      }
    );

    this.load.spritesheet("jump", "src/assets/Astronaut/Astronaut_Jump.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create() {
    this.plataforms = this.physics.add.staticGroup();

    this.plataforms.create(100, 568, "ground").setScale(3).refreshBody();
    this.plataforms.create(300, 568, "ground").setScale(3).refreshBody();
    this.plataforms.create(500, 568, "ground").setScale(3).refreshBody();
    this.plataforms.create(700, 568, "ground").setScale(3).refreshBody();

    this.plataforms.create(600, 400, "ground").setScale(3);
    this.plataforms.create(50, 250, "ground").setScale(3);
    this.plataforms.create(750, 220, "ground").setScale(3);

    this.autronaut = this.physics.add
      .sprite(200, 450, "autronautStop")
      .setScale(2);
    this.autronaut.setBounce(0.2);
    this.autronaut.setCollideWorldBounds(true);

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNames("autronaut"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames("jump"),
      frameRate: 10,
    });

    this.anims.create({
      key: "stop",
      frames: [{ key: "autronautStop", frame: 0 }],
    });

    this.physics.add.collider(this.autronaut, this.plataforms);

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update() {
    if (this.cursors?.up.isDown && this.autronaut.body.onFloor()) {
      this.autronaut.setGravity(0);
      this.autronaut.setAccelerationY(-330);

      this.autronaut.anims.play("jump", true);
    }
    if (this.cursors?.left.isDown) {
      this.autronaut.setFlipX(true);
      this.autronaut.setVelocityX(-160);
      this.autronaut.anims.play("right", true);
    } else if (this.cursors?.right.isDown) {
      this.autronaut.setFlipX(false);
      this.autronaut.setVelocityX(160);
      this.autronaut.anims.play("right", true);
    } else {
      this.autronaut.setVelocityX(0);
      this.autronaut.setGravity(100);

      this.autronaut.anims.play("stop", true);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: Game,
};

new Phaser.Game(config);
