
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const faqDropdowns = document.querySelectorAll('.faq-dropdown');

    faqDropdowns.forEach(btn => {
        btn.addEventListener('click', function () {
            const content = this.nextElementSibling;

            
            content.classList.toggle('open'); 

            
            const arrow = this.querySelector('::after'); 
            if (content.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)'; 
            } else {
                arrow.style.transform = 'rotate(0deg)'; 
            }

            
            faqDropdowns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    const otherContent = otherBtn.nextElementSibling;
                    otherContent.classList.remove('open'); 
                   
                    const otherArrow = otherBtn.querySelector('::after'); 
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            });
        });
    });
});


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

    
    function loadGalleryImages() {
        images = [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg',
            'image4.jpg',
            'image5.jpg',
            'image6.jpg',
            'image7.jpg',
            'image8.jpg',
            'image9.jpg',
            'image10.jpg',
            'image11.jpg',
            'image12.jpg',
            'image13.jpg',
            'image14.jpg',
            'image15.jpg',
            'image16.jpg',
            'image17.jpg',
            'image18.jpg',
            'image19.jpg',
            'image20.jpg',
            'image21.jpg',
            'image22.jpg',
            'image23.jpg',
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

   
    function openModal(src, alt, index) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); 
        modalImg.src = src;
        captionText.innerHTML = alt;
        currentImageIndex = index;
        updateNavigationButtons();
    }

    
    function updateNavigationButtons() {
        prevImageButton.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextImageButton.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';

        
        if (!prevImageButton.style.display) {
            modalImg.style.marginLeft = '0';
        }
        if (!nextImageButton.style.display) {
            modalImg.style.marginRight = '0';
        }
    }

    
    prevImageButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImg.src = `Gallery/${images[currentImageIndex]}`;
            captionText.innerHTML = `Gallery Image ${currentImageIndex + 1}`;
            updateNavigationButtons();
        }
    });

    
    nextImageButton.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            modalImg.src = `Gallery/${images[currentImageIndex]}`;
            captionText.innerHTML = `Gallery Image ${currentImageIndex + 1}`;
            updateNavigationButtons();
        }
    });

    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); 
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); 
        }
    });

    loadGalleryImages(); 
});
