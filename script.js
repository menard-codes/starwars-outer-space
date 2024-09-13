
function formatCelestialBodies(celestialBodyName, celestialBodyImgSrc) {
    const container = document.querySelector(`.${celestialBodyName}`);

    // Create the image element
    const img = document.createElement('img');
    img.alt = `${celestialBodyName} in 8-bit`;
    img.src = celestialBodyImgSrc;

    // Create a new div to wrap the existing content
    const contentDiv = document.createElement('div');

    // Move all existing children of container into the new contentDiv
    while (container.firstChild) {
        contentDiv.appendChild(container.firstChild);
    }

    // Clear the container
    container.innerHTML = '';

    // Append the new image and content div to container
    container.appendChild(img);
    container.appendChild(contentDiv);
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
    asteroidImage.src = getImgSrc('/assets/images/Asteroid.png');

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

function insertBorderImages(containerName, imgSrc) {
    const container = document.querySelector(`.${containerName}`);

    const images = [];
    Array.from({length: 8}).forEach(_ => {
        const img = new Image();
        img.setAttribute('role', 'presentation');
        img.src = imgSrc;
        images.push(img);
    });

    const imgBorderContainer = document.createElement('div');
    imgBorderContainer.classList.add('img-border-container');
    images.forEach(img => imgBorderContainer.appendChild(img));

    container.insertAdjacentElement('afterend', imgBorderContainer);
}

// utils

function isLocalhost() {
    return window.location.hostname === "localhost" || 
           window.location.hostname === "127.0.0.1" ||
           window.location.hostname === "[::1]";
}

function getImgSrc(baseSrc) {
    return isLocalhost() ? baseSrc : '/starwars-outer-space/' + baseSrc;
}

insertBorderImages('planets', getImgSrc('/assets/images/fighter-1.png'));
insertBorderImages('moons', getImgSrc('/assets/images/storm-trooper.png'));

setFavicon(getImgSrc('/assets/images/storm-trooper.png'));

const celestialBodies = [
    {
        name: 'mercury',
        imgSrc: getImgSrc('/assets/images/planets/mercury.png')
    },
    {
        name: 'venus',
        imgSrc: getImgSrc('/assets/images/planets/venus.png')
    },
    {
        name: 'earth',
        imgSrc: getImgSrc('/assets/images/planets/earth.png')
    },
    {
        name: 'mars',
        imgSrc: getImgSrc('/assets/images/planets/mars.png')
    },
    {
        name: 'jupiter',
        imgSrc: getImgSrc('/assets/images/planets/jupiter.png')
    },
    {
        name: 'saturn',
        imgSrc: getImgSrc('/assets/images/planets/saturn.png')
    },
    {
        name: 'uranus',
        imgSrc: getImgSrc('/assets/images/planets/uranus.png')
    },
    {
        name: 'neptune',
        imgSrc: getImgSrc('/assets/images/planets/neptune.png')
    },
    {
        name: 'moon',
        imgSrc: getImgSrc('/assets/images/moons/moon.png')
    },
    {
        name: 'titan',
        imgSrc: getImgSrc('/assets/images/moons/titan.png')
    },
    {
        name: 'europa',
        imgSrc: getImgSrc('/assets/images/moons/europa.png')
    },
    {
        name: 'asteroid-belt',
        imgSrc: getImgSrc('/assets/images/other-objects/asteroid-belt.jpeg')
    },
    {
        name: 'comets',
        imgSrc: getImgSrc('/assets/images/other-objects/comet.jpeg')
    },
    {
        name: 'kuiper-belt',
        imgSrc: getImgSrc('/assets/images/other-objects/kuiper-belt.jpeg')
    }
]

// format the celestial bodies to insert the images and re-layout the elements
celestialBodies.forEach(({ name, imgSrc }) => formatCelestialBodies(name, imgSrc));

insertAsteroidBelt();

/* ################ */
/* Styling the word `Earth` in overview */
// Select the paragraph element
const paragraph = document.querySelector('.solar-system-overview p');

// Get the text content of the paragraph
const text = paragraph.textContent;

// Find the last word
const lastWord = text.trim().split(' ').pop();

// Create a new text node with the content up to the last word
const textWithoutLastWord = text.slice(0, -lastWord.length).trim();
const textNode = document.createTextNode(textWithoutLastWord + ' ');

// Create a span element for the last word
const span = document.createElement('span');
span.textContent = lastWord;
span.style.display = 'inline-block';
span.style.color = 'hsl(54, 100%, 56%)';
span.style.fontSize = '2rem';
span.style.fontFamily = 'Star Wars Outline';
span.style.marginLeft = '0.5em';
span.style.textDecoration = 'underline';
span.style.textUnderlineOffset = '0.2em';

// Clear the paragraph and append the new nodes
paragraph.innerHTML = '';
paragraph.appendChild(textNode);
paragraph.appendChild(span);
/* ################ */

/* ################ */
/* CSS URL */ 
// Replace font URLs and set font families
const fontStyles = `
  @font-face {
    font-family: 'Star Wars';
    font-style: normal;
    src: url('${getImgSrc('/assets/fonts/StarJediRounded-jW3R.woff')}') format('woff');
  }

  @font-face {
    font-family: 'Star Wars Outline';
    font-style: normal;
    src: url('${getImgSrc('/assets/fonts/Starjhol.woff')}') format('woff');
  }

  @font-face {
    font-family: 'ITC Serif Gothic';
    font-style: normal;
    src: url('${getImgSrc('/assets/fonts/ITC SerifGothic.woff')}') format('woff');
  }

  p, li {
    font-family: 'ITC Serif Gothic', sans-serif;
  }

  header h1 {
    font-family: 'Star Wars Outline', sans-serif;
  }

  section.solar-system-overview h2,
  section.planets h2,
  section.moons h2,
  section.solar-system-objects h2 {
    font-family: 'Star Wars', sans-serif;
  }

  .planet h3,
  .moon h3,
  .solar-system-objects h3 {
    font-family: 'Star Wars Outline', sans-serif;
  }
`;

const fontStyleElement = document.createElement('style');
fontStyleElement.textContent = fontStyles;
document.head.appendChild(fontStyleElement);

// Replace list style image
const listStyleStyles = `
  ul {
    list-style-image: url('${getImgSrc('/assets/images/fighter.png')}');
  }
`;
const listStyleElement = document.createElement('style');
listStyleElement.textContent = listStyleStyles;
document.head.appendChild(listStyleElement);

// Replace background images
document.querySelector('header').style.backgroundImage = `url('${getImgSrc('/assets/images/space-bg-1.png')}')`;
document.querySelector('section.solar-system-overview').style.backgroundImage = `url('${getImgSrc('/assets/images/space-8bit-bg.jpg')}')`;
document.querySelector('footer').style.backgroundImage = `url('${getImgSrc('/assets/images/space-8bit-bg.jpg')}')`;

// Replace pseudo-element background images
const pseudoElementStyles = `
  section.solar-system-overview::before {
    background-image: url('${getImgSrc('/assets/images/death-star.png')}');
  }
  section.solar-system-overview::after {
    background-image: url('${getImgSrc('/assets/images/star-destroyer.png')}');
  }
`;
const pseudoStyleElement = document.createElement('style');
pseudoStyleElement.textContent = pseudoElementStyles;
document.head.appendChild(pseudoStyleElement);

// Set cursor style
document.body.style.cursor = `url(${getImgSrc('/assets/images/cursor/light-saber-cursor.png')}), auto`;