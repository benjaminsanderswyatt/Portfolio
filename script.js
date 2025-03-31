const typed = new Typed('.multiple-text',{
    strings:['Person ','Thing '],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});










const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


const colors = [
    { color: '#9BB7FF', weight: 10 },
    { color: '#A1CAF1', weight: 8 },
    { color: '#FFF4E5', weight: 6 },
    { color: '#FF7F24', weight: 3 },
    { color: '#FF4500', weight: 2 }
];

function weightedRandomColor() {
    const totalWeight = colors.reduce((sum, { weight }) => sum + weight, 0);
    const rand = Math.random() * totalWeight;

    let cumulative = 0;
    for (const { color, weight } of colors) {
        cumulative += weight;
        if (rand < cumulative) return color;
    }
}


let mouseDown = false
addEventListener('mousedown', () => {
  mouseDown = true
})

addEventListener('mouseup', () => {
  mouseDown = false
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    c.shadowBlur = 15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 1200; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 2000

    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = 1.5 * Math.random()

    const color = weightedRandomColor();
    particles.push(new Particle(x, y, radius, color))
  }
}


let rotationSpeed = 0.001; // Base speed
const baseSpeed = 0.001; // For resetting when mouse is released
const capSpeed = 0.006; // Maximum rotational speed
const growthFactor = 1.003; // Exponential growth per frame





// Animation Loop
let radians = 0
let alpha = 1
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = `rgba(10, 10, 10, ${alpha})`
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)
    c.rotate(radians)

    particles.forEach((particle) => {
        particle.update()
    })

    c.restore()




    // Update rotational speed
    if (mouseDown) {
        rotationSpeed = Math.min(rotationSpeed * growthFactor, capSpeed);
    } else {
        rotationSpeed = baseSpeed;
    }
    
    radians += rotationSpeed;



    if (mouseDown) {

        if (alpha >= 0.03){
            alpha -= 0.005
        } 
        
    } else if (!mouseDown && alpha < 1) {
        alpha += 0.0008
    }

}

init()
animate()
