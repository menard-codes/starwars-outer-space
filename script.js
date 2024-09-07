
function formatPlanet(planetName, planetImgSrc) {
    const planetContainer = document.querySelector(`.${planetName}`);

    // Create the image element
    const planetImg = document.createElement('img');
    planetImg.alt = `Planet ${planetName} in 8-bit`;
    planetImg.src = planetImgSrc;

    // Create a new div to wrap the existing content
    const contentDiv = document.createElement('div');

    // Move all existing children of planetContainer into the new contentDiv
    while (planetContainer.firstChild) {
        contentDiv.appendChild(planetContainer.firstChild);
    }

    // Clear the planetContainer
    planetContainer.innerHTML = '';

    // Append the new image and content div to planetContainer
    planetContainer.appendChild(planetImg);
    planetContainer.appendChild(contentDiv);
}

function insertAsteroidBelt() {
    const mars = document.querySelector('.mars');
    const jupiter = document.querySelector('.jupiter');

    const asteroidBelt = document.createElement('div');
    asteroidBelt.classList.add('asteroid-belt');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const asteroidCount = 200;
    const asteroids = [];
    const speedFactor = 0.2;
    const asteroidImage = new Image();
    asteroidImage.src = '/assets/images/Asteroid.png';

    const resizeCanvas = () => {
        canvas.width = asteroidBelt.clientWidth;
        canvas.height = asteroidBelt.clientHeight;
    }

    const createAsteroids = () => {
        asteroids.length = []
        for (let i=0; i<asteroidCount; i++) {
            const depth = Math.random();
            asteroids.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * speedFactor * (1 + depth),
                dy: (Math.random() - 0.5) * speedFactor * (1 + depth),
                size: Math.random() * 20 + 5 + (depth * 25),
                depth: depth,
            });
        }
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        asteroids.forEach(asteroid => {
            // ctx.globalAlpha = 0.2 + asteroid.depth * 0.8;
            ctx.drawImage(asteroidImage, asteroid.x, asteroid.y, asteroid.size, asteroid.size);
            ctx.globalAlpha = 1;
            
            // Bounce off screen edges
            if (asteroid.x + asteroid.size > canvas.width || asteroid.x < 0) {
                asteroid.dx = -asteroid.dx;
            }
            if (asteroid.y + asteroid.size > canvas.height || asteroid.y < 0) {
                asteroid.dy = -asteroid.dy;
            }
            
            asteroid.x += asteroid.dx;
            asteroid.y += asteroid.dy;
        });
        
        requestAnimationFrame(animate);
    }

    const init = () => {
        resizeCanvas();
        createAsteroids();
        animate();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createAsteroids();
    });
    asteroidImage.onload = init;
    asteroidBelt.appendChild(canvas);

    mars.parentNode.insertBefore(asteroidBelt, jupiter);
}

function setFavicon(url) {
    // Remove any existing favicon
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
        existingFavicon.parentNode.removeChild(existingFavicon);
    }

    // Create new favicon link element
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = url;

    // Append the new favicon to the document head
    document.head.appendChild(link);
}
  
// Usage
setFavicon('/assets/images/storm-trooper.png');

const planets = [
    {
        planetName: 'mercury',
        imgSrc: '/assets/images/planets/mercury.png'
    },
    {
        planetName: 'venus',
        imgSrc: '/assets/images/planets/venus.png'
    },
    {
        planetName: 'earth',
        imgSrc: '/assets/images/planets/earth.png'
    },
    {
        planetName: 'mars',
        imgSrc: '/assets/images/planets/mars.png'
    },
    {
        planetName: 'jupiter',
        imgSrc: '/assets/images/planets/jupiter.png'
    },
    {
        planetName: 'saturn',
        imgSrc: '/assets/images/planets/saturn.png'
    },
    {
        planetName: 'uranus',
        imgSrc: '/assets/images/planets/uranus.png'
    },
    {
        planetName: 'neptune',
        imgSrc: '/assets/images/planets/neptune.png'
    }
]

// format the planets to insert the images and re-layout the elements
planets.forEach(({ planetName, imgSrc }) => formatPlanet(planetName, imgSrc));

insertAsteroidBelt();
