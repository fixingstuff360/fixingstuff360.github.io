// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// FAQ dropdown functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqDropdowns = document.querySelectorAll('.faq-dropdown');

    faqDropdowns.forEach(btn => {
        btn.addEventListener('click', function () {
            const content = this.nextElementSibling;

            // Toggle the current FAQ dropdown
            content.classList.toggle('open');

            // Update arrow rotation
            const arrow = window.getComputedStyle(this).getPropertyValue('content');
            if (content.classList.contains('open')) {
                this.querySelector('::after').style.transform = 'rotate(180deg)';
            } else {
                this.querySelector('::after').style.transform = 'rotate(0deg)';
            }

            // Close other FAQ dropdowns
            faqDropdowns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    const otherContent = otherBtn.nextElementSibling;
                    otherContent.classList.remove('open');
                    otherBtn.querySelector('::after').style.transform = 'rotate(0deg)';
                }
            });
        });
    });
});

// Gallery modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');
    const prevImageButton = document.getElementById('prevImage');
    const nextImageButton = document.getElementById('nextImage');

    let currentImageIndex = -1;
    let images = [];

    // Load gallery images
    function loadGalleryImages() {
        images = [
            'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
            'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg',
            'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg',
            'image16.jpg', 'image17.jpg', 'image18.jpg', 'image19.jpg', 'image20.jpg',
            'image21.jpg', 'image22.jpg', 'image23.jpg'
        ];

        const shuffledImages = images.sort(() => 0.5 - Math.random());

        shuffledImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `Gallery/${image}`;
            imgElement.alt = 'Gallery Image';
            imgElement.addEventListener('click', () => {
                openModal(imgElement.src, imgElement.alt, shuffledImages.indexOf(image));
            });
            galleryGrid.appendChild(imgElement);
        });
    }

    // Open modal
    function openModal(src, alt, index) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        modalImg.src = src;
        captionText.innerHTML = alt;
        currentImageIndex = index;
        updateNavigationButtons();
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        const modalContainer = modalImg.parentElement;

        prevImageButton.style.display = 'block';
        nextImageButton.style.display = 'block';
    }

    // Previous image with circular navigation
    prevImageButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = images.length - 1; // Wrap to the end
        }
        modalImg.src = `Gallery/${images[currentImageIndex]}`;
        captionText.innerHTML = `Gallery Image ${currentImageIndex + 1}`;
    });

    // Next image with circular navigation
    nextImageButton.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; // Wrap to the start
        }
        modalImg.src = `Gallery/${images[currentImageIndex]}`;
        captionText.innerHTML = `Gallery Image ${currentImageIndex + 1}`;
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    // Initialize gallery
    loadGalleryImages();
});
