const enemysList = [];
const enemys = 2;

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
  entityList.forEach((entity) => {
    entity.update();
    entity.checkEdges();
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
    if (player.acceleration.y === 0.1) {
      return
    } else {
      player.acceleration.y = 0;
      player.velocity.y = 0;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (player.acceleration.y === -0.1) {
      return
    } else {
      player.acceleration.y = 0;
      player.velocity.y = 0;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (player.acceleration.x === -0.1) {
      return
    } else {
      player.acceleration.x = 0;
      player.velocity.x = 0;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (player.acceleration.x === 0.1) {
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
  
  checkEdges() {
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
    this.location = createVector(random(this.bodySpace, width - this.bodySpace),random(this.bodySpace, 450 - this.bodySpace));
  }

  update() {
    super.update();
    if (!this.collide) {
      this.acceleration = createVector(random(-0.2,0.2),random(-0.2,0.2))
    } 
  }

  checkEdges() {
    if (this.location.x + this.hvisionRange > width - (this.topspeed + 1) || this.location.x - this.hvisionRange < (this.topspeed + 1)) {
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
      this.collide = true;
      return
    } 
    if (this.location.y + this.hvisionRange > 450 - (this.topspeed + 1) || this.location.y - this.hvisionRange < (this.topspeed + 1)) {
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