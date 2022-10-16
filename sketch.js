const enemysList = [];
const enemys = 5;

function setup() {
  createCanvas(600, 600);
  smooth();

  player = new Player();
  for(let i=0; i < enemys; i++) {
    enemysList.push(new Enemy());
  }
}

function draw() {
  background(255);

  stroke(0);
  fill(255,255,255,0);
  rect(0, 0, 599, 450);

  const entityList = [player, ...enemysList];
  entityList.forEach((entity, index) => {
    if (index != 0) {
      entity.checkTarget(player);
    }

    entity.update();
    entity.checkCollision();
    entity.display();
  })
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (player.acceleration.y === 0.1) {
      return
    } else {
      player.acceleration.y = -0.1;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (player.acceleration.y === -0.1) {
      return
    } else {
      player.acceleration.y = 0.1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (player.acceleration.x === -0.1) {
      return
    } else {
      player.acceleration.x = 0.1;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (player.acceleration.x === 0.1) {
      return
    } else {
      player.acceleration.x = -0.1;
    }
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    if (player.acceleration.y === 0.25) {
      return
    } else {
      player.acceleration.y = 0;
      player.velocity.y = 0;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (player.acceleration.y === -0.25) {
      return
    } else {
      player.acceleration.y = 0;
      player.velocity.y = 0;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (player.acceleration.x === -0.25) {
      return
    } else {
      player.acceleration.x = 0;
      player.velocity.x = 0;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (player.acceleration.x === 0.25) {
      return
    } else {
      player.acceleration.x = 0;
      player.velocity.x = 0;
    }
  }
}

class Entity {
  
  constructor() {
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.topspeed = 2;
    this.dim = 20;
    this.hdim = this.dim / 2;
    this.collide = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
  }
  
  checkCollision() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}

class Player extends Entity {

  constructor() {
    super();
    this.location = createVector(300,550);
    this.fillColor = 'blue';
  }

  display() {
    noStroke();
    fill(this.fillColor);
    ellipse(this.location.x, this.location.y, this.dim, this.dim);
  }
}

class Enemy extends Entity {
  
  constructor() {
    super();
    this.fillColor = 'red';
    this.visionRange = 75;
    this.hvisionRange = this.visionRange/2;
    this.bodySpace = this.visionRange+5;
    this.location = createVector(random(this.bodySpace, width - this.bodySpace),random(this.bodySpace, (height - 150) - this.bodySpace));
    this.pursuit = false;
  }

  update() {
    super.update();
    if (!this.collide) {
      if (this.pursuit) {
        return
      } else {
        this.acceleration = createVector(random(-0.2,0.2),random(-0.2,0.2))
      }
    } 
  }

  checkTarget(target) {
    let targetDistance = target.location.dist(this.location);

    if (targetDistance - target.hdim <= this.hvisionRange) {
      this.pursuit = true;

      let direction = p5.Vector.sub(target.location, this.location);
      direction.normalize();
      direction.mult(0.1);
      
      this.acceleration = direction;
    } else {
      this.pursuit = false;
    }
  }

  checkCollision() {
    if (this.location.x + this.hvisionRange >= width - this.velocity.x || this.location.x - this.hvisionRange <= 0) {
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
      this.collide = true;
      return
    } 
    if (this.location.y + this.hvisionRange >= (height - 150) - this.velocity.y || this.location.y - this.hvisionRange <= 0) {
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
      this.collide = true;
      return
    }
    this.collide = false;
  }

  display() {
    stroke(0);
    fill(255,255,255,0);
    ellipse(this.location.x, this.location.y, this.visionRange, this.visionRange);
    noStroke();
    fill(this.fillColor);
    ellipse(this.location.x, this.location.y, this.dim, this.dim);
  }
}