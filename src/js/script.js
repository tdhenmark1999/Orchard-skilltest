// JSON data
var jsonData = [
    {
        "imageSrc": "../assets/component-02/Image-01.jpg",
        "title": "Summer Lunch Menu By Mark Best",
        "description": "AEG ambassador Mark Best's summer eats are guaranteed to help you make the most of the warmer weather and entertaining at home.",
        "link": "#"
    },
    {
        "imageSrc": "../assets/component-02/Image-02.jpg",
        "title": "A Traditional Christmas Eve, Mark Best Style",
        "description": "One of Australia's best chefs and AEG ambassador, Mark Best, shares his favourite Christmas Eve menu which is sure to impress your guests.",
        "link": "#"
    },
    {
        "imageSrc": "../assets/component-02/Image-03.jpg",
        "title": "Taking Taste Further",
        "description": "This exclusive cookbook gives you all the know-how you need. We’ve designed it to make sure you get the most out of our products – and the best out of your food.",
        "link": "#"
    }
];

// Function to create items from JSON data
function createItems(data, containerSelector) {
    var container = document.querySelector(containerSelector);

    data.forEach(function (itemData) {
        var item = createItemElement(itemData);
        container.appendChild(item);
    });
}

// Function to create an item element
function createItemElement(data) {
    var div = document.createElement('div');
    div.classList.add('item');
    div.classList.add('image__popup');

    div.innerHTML = `
        <img src="${data.imageSrc}" />
        <p>${data.title}</p>
        <p>${data.description}</p>
        <div>
        <a href="${data.link}">Read More</a>
        </div>
    `;
    return div;
}

function initializeCarousel(containerSelector) {
    var container = $(containerSelector);

    function createCarousel() {
        container.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: false,
            variableWidth: true,
            autoplay: true,

            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    // Function to destroy the carousel
    function destroyCarousel() {
        if (container.hasClass('slick-initialized')) {
            container.slick('unslick');
        }
    }

    // Function to check the viewport width and decide whether to create or destroy the carousel
    function checkViewportWidth() {
        if (window.innerWidth <= 1200) {
            createCarousel();
        } else {
            destroyCarousel();
        }
    }

    // Initialize the carousel based on initial viewport width
    checkViewportWidth();

    // Listen for window resize events to adjust the carousel
    $(window).on('resize', checkViewportWidth);
}

// Initialize the items and carousels
createItems(jsonData, '.section_2__list');
initializeCarousel('.section_2__list');
initializeCarousel('.carousel__one');


// Get all images
var images = document.querySelectorAll('.image__popup img');

// Get the modal and modal image elements
var modal = document.getElementById('imageModal');
var modalImage = document.getElementById('modalImage');

// Add a click event listener to each image
images.forEach(function (image) {
    image.addEventListener('click', function () {
        modal.style.display = 'block'; // Show the modal
        modalImage.src = this.src; // Set the source of the modal image
    });
});

// Add a click event listener to close the modal
modal.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none'; // Hide the modal
});