
class Attractor {
  constructor(){

    this.position = createVector(width/2,height/2);
    this.mass = 100;
    this.G = 1;
  }

  update(){
    this.position = createVector( mouseX, mouseY );
  }

  attract( particle ) {
    // Calculate direction of force
    var positionCopy = this.position.copy();
    var force = positionCopy.sub(particle.position); 
    // Distance between objects
    var distance = force.mag();          
    // Limiting the distance to eliminate "extreme" results for very close or very far objects                    
    distance = constrain(distance,5.0,25.0);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();                                  
    // Calculate gravitional force magnitude
    var strength = (this.G * this.mass * particle.mass) / (distance * distance);      
    // Get force vector --> magnitude * direction
    force.mult(strength); 

    return force;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    stroke('red');
    strokeWeight(4);
    stroke(0);
    // ellipse( this.position.x ,this.position.y ,20, 20);
  }


}