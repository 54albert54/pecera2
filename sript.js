document.addEventListener('DOMContentLoaded', function () {

  const canvas = document.getElementById('canvas1', { willReadFrequently: true });
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;



  class Game {
    constructor(ctx, width, height,) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 500;
      this.enemyTimer = 0;
      this.enemytypes = ["enemy1M", "enemy2M", "enemy3M", "enemy4M", "enemy5M", "enemy6M"];
    }
    update(deltaTime) {
      this.enemies = this.enemies.filter(object => !object.markedForDelection)
      if (this.enemyTimer > this.enemyInterval) {
        this.addNewEnemy();
        this.enemyTimer = 0;
      }
      else { this.enemyTimer += deltaTime }
      this.enemies.forEach(object => object.update(deltaTime))
    }
    draw() {
      this.enemies.forEach(object => object.draw(this.ctx))

    }
    addNewEnemy() {

      const randomEnemy = this.enemytypes[Math.floor(Math.random() * this.enemytypes.length)]
      if (randomEnemy == "enemy5M") this.enemies.push(new Metroid4X(this));
      if (randomEnemy == "enemy5M") this.enemies.push(new Metroid4(this));
      if (randomEnemy == "enemy4M") this.enemies.push(new Metroid2(this));
      if (randomEnemy == "enemy3M") this.enemies.push(new Metroid3(this));
      if (randomEnemy == "enemy2M") this.enemies.push(new Metroid2(this));
      if (randomEnemy == "enemy1M") this.enemies.push(new Metroid(this));
      if (randomEnemy == "enemy6M") this.enemies.push(new Metroid3X(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.frameX = 0
      this.maxFrame = 5;
      this.frameInterval = 100;
      this.frameTimer = 0;
      this.markedForDelection = false;
    }
    update(deltaTime) {
      if (this.y < 0 - this.height) this.markedForDelection = true;
      if (this.y > canvas.height) this.markedForDelection = true;
      if (this.x < 0 - this.width) this.markedForDelection = true;
      if (this.x > canvas.width) this.markedForDelection = true;
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime
      }
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spritheight, this.x, this.y, this.width, this.height)
    }
  }
  class Metroid extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 293;
      this.spritheight = 155;

      this.width = this.spriteWidth / 2;
      this.height = this.spritheight / 2;
      this.x = canvas.width;
      this.y = Math.random() * this.game.height * 0.8;
      this.image = metroid;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
      this.dereccion = 1;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5; sigo tratando de guardar todos los cambios dios como trabajo es hacer este commit
      this.x -= this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0; esgto es solo a ver si puedo hacer el commit
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Metroid2 extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 293;
      this.spritheight = 155;

      this.width = this.spriteWidth / 2;
      this.height = this.spritheight / 2;
      this.x = 0;
      this.y = Math.random() * this.game.height * 0.8;
      this.image = metroid;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
      this.dereccion = 1;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5;
      this.x += this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0;
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Metroid3 extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 293;
      this.spritheight = 155;

      this.width = this.spriteWidth / 2;
      this.height = this.spritheight / 2;
      this.x = Math.random() * this.game.height * 0.8;
      this.y = 0;
      this.image = metroid;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
      this.dereccion = 1;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.x += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5;
      this.y += this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0;
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Metroid3X extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 218;
      this.spritheight = 177;

      this.width = this.spriteWidth / 4;
      this.height = this.spritheight / 4;
      this.x = Math.random() * this.game.height * 0.8;
      this.y = 0;
      this.image = xRojo;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
      this.dereccion = 1;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.x += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5;
      this.y += this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0;
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Metroid4 extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 293;
      this.spritheight = 155;

      this.width = this.spriteWidth / 2;
      this.height = this.spritheight / 2;
      this.x = Math.random() * this.game.height * 0.8;
      this.y = canvas.height;
      this.image = metroid;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
      this.dereccion = 1;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.x += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5;
      this.y -= this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0;
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Metroid4X extends Enemy {
    constructor(game) {
      super(game)
      this.spriteWidth = 215;
      this.spritheight = 188;

      this.width = this.spriteWidth / 3;
      this.height = this.spritheight / 3;
      this.x = Math.random() * this.game.height * 0.8;
      this.y = canvas.height;
      this.image = xAmarilo;
      this.vx = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;

    }
    update(deltaTime) {
      super.update(deltaTime);
      this.x += Math.sin(this.angle) * this.curve;

      //this.x +=Math.random() * (this.medio+this.lado)-2.5;
      //this.y +=Math.random() * 5-2.5;
      this.y -= this.vx * deltaTime;
      //if (this.x < 0 - this.width)this.x=canvas.width;
      //if (this.x > canvas.width)this.x=0;
      if (this.x + this.width < 0) {
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
      }
    }
    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = 0.8;
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Varios {
    constructor(x, y, image, frame) {
      this.position = {
        x: x,
        y: y
      }
      this.frameX = 0
      this.frameY = frame

      this.width = 120
      this.height = 200
      this.image = new Image()
      this.image.src = image
      this.imageWidth = 60
      this.imageHeight = 76

      this.maxFrame = 7;
      this.frameInterval = 300;
      this.frameTimer = 0;
    }
    draw() {
      ctx.drawImage(this.image, this.frameX * this.imageWidth, this.frameY * this.imageHeight, this.imageWidth, this.imageHeight, this.position.x, this.position.y, this.width, this.height)
    }
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
        this.frameTimer = 0;
      }
      this.frameTimer += deltaTime
      this.collition()

    }
    collition() {

      for (let i = 0; i < game.enemies.length; i++) {
        let enemigos = game.enemies[i]

        if (this.position.x < enemigos.x + enemigos.width &&
          this.position.x + this.width > enemigos.x &&
          this.position.y < enemigos.y + enemigos.height &&
          this.position.y + this.height > enemigos.y) {
          Math.random() > 0.5 ? this.frameY = 2 : this.frameY = 3;
          this.frameInterval = 150
        }
        if (this.frameY != 0) {
          setTimeout(() => {
            this.frameY = 0;
            this.frameInterval = 300
          }, 3000);
        }
      }
    }
  }
  const halgas = []

  for (let i = 0; i < 15; i++) {
    let a = i * 30
    halgas.push(new Varios(-20 + a, 633, "halgas.png", 0))
  }

  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    [...halgas].forEach(object => object.draw());
    [...halgas].forEach(object => object.update(deltaTime));
    // esto es un comentario 11 sddddd  albert


    requestAnimationFrame(animate)


  }
  animate(0);




});