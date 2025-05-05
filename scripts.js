
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
    header?.classList.toggle('sticky', window.scrollY > 50);
});


document.addEventListener('DOMContentLoaded', function () {
    const faqDropdowns = document.querySelectorAll('.faq-dropdown');

    faqDropdowns.forEach(btn => {
        btn.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content?.classList.toggle('open');
            
            
            faqDropdowns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.nextElementSibling?.classList.remove('open');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const consoleItems = document.querySelectorAll('.console-item');
    const consoleData = [];
    const consoleModal = document.getElementById('consoleModal');
    const consoleModalImg = document.getElementById('consoleModalImg');
    const consoleInfo = document.getElementById('consoleInfo');
    const closeConsoleBtn = document.getElementById('closeConsoleModal');
    const prevConsoleBtn = document.getElementById('prevConsole');
    const nextConsoleBtn = document.getElementById('nextConsole');

    if (!consoleModal || !consoleModalImg || !consoleInfo) return;

    let currentConsoleIndex = 0;

    consoleItems.forEach((item, index) => {
        const img = item.querySelector('img')?.src;
        const alt = item.querySelector('img')?.alt || '';
        const descElem = item.querySelector('.console-description');
        const fullDesc = descElem?.innerHTML || '';
        
        consoleData.push({ img, alt, fullDesc });

        if (fullDesc.length > 40 && descElem) {
            descElem.innerHTML = fullDesc.slice(0, 40) + '...';
        }

        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openConsoleModal(index));
    });

    function openConsoleModal(index) {
        currentConsoleIndex = index;
        updateConsoleModal();
        consoleModal.style.display = 'block';
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', handleConsoleKeys);
    }

    function updateConsoleModal() {
        const data = consoleData[currentConsoleIndex];
        if (consoleModalImg) consoleModalImg.src = data.img;
        if (consoleModalImg) consoleModalImg.alt = data.alt;
        if (consoleInfo) consoleInfo.innerHTML = data.fullDesc;
    }

    function handleConsoleKeys(e) {
        if (e.key === 'ArrowLeft') {
            currentConsoleIndex = (currentConsoleIndex - 1 + consoleData.length) % consoleData.length;
            updateConsoleModal();
        } else if (e.key === 'ArrowRight') {
            currentConsoleIndex = (currentConsoleIndex + 1) % consoleData.length;
            updateConsoleModal();
        } else if (e.key === 'Escape') {
            closeConsoleModal();
        }
    }


    prevConsoleBtn?.addEventListener('click', () => {
        currentConsoleIndex = (currentConsoleIndex - 1 + consoleData.length) % consoleData.length;
        updateConsoleModal();
    });

    nextConsoleBtn?.addEventListener('click', () => {
        currentConsoleIndex = (currentConsoleIndex + 1) % consoleData.length;
        updateConsoleModal();
    });

    closeConsoleBtn?.addEventListener('click', () => {
        consoleModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    consoleModal?.addEventListener('click', (e) => {
        if (e.target === consoleModal) {
            consoleModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');
    const prevImageButton = document.getElementById('prevImage');
    const nextImageButton = document.getElementById('nextImage');

    if (!galleryGrid || !imageModal || !modalImg) return;

    let currentImageIndex = -1;
    let images = [];

    function loadGalleryImages() {
        images = Array.from({length: 24}, (_, i) => `image${i+1}.jpg`);
        
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `Gallery/${image}`;
            imgElement.alt = 'Gallery Image';
            imgElement.addEventListener('click', () => {
                openModal(imgElement.src, imgElement.alt, images.indexOf(image));
            });
            galleryGrid.appendChild(imgElement);
        });
    }

    function openModal(src, alt, index) {
        currentImageIndex = index;
        if (modalImg) modalImg.src = src;
        if (captionText) captionText.innerHTML = alt;
        imageModal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    prevImageButton?.addEventListener('click', () => {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        if (modalImg) modalImg.src = `Gallery/${images[currentImageIndex]}`;
    });

    nextImageButton?.addEventListener('click', () => {
        currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        if (modalImg) modalImg.src = `Gallery/${images[currentImageIndex]}`;
    });

    closeModal?.addEventListener('click', () => {
        imageModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    loadGalleryImages();
});
