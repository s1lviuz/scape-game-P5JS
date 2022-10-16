

function setup() {
  createCanvas(600, 600);
  smooth();
  player = new Entidade();
}

function draw() {
  background(255);

  player.update();
  player.checkEdges();
  player.display();
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

class Entidade {
  
  constructor() {
    this.location = createVector(150,400);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.topspeed = 2;
    this.dim = 20;
    this.hdim = this.dim / 2;
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

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.dim, this.dim);
  }
}