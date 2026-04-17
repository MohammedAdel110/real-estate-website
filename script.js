document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar & Mobile Menu
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // 2. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 3. Category Horizontal Scroll
    const catContainer = document.getElementById('categories-scroll');
    const btnNext = document.getElementById('cat-next');
    const btnPrev = document.getElementById('cat-prev');

    if (btnNext && btnPrev && catContainer) {
        btnNext.addEventListener('click', () => {
            catContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
        
        btnPrev.addEventListener('click', () => {
            catContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    // 4. Featured Listings Dynamic Generaton with Skeletons
    const propertiesGrid = document.getElementById('properties-container');
    
    // Create Skeleton Cards
    function renderSkeletons() {
        propertiesGrid.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            propertiesGrid.innerHTML += `
                <div class="property-card skeleton-card">
                    <div class="skeleton skeleton-img"></div>
                    <div class="property-details">
                        <div class="skeleton skeleton-text price"></div>
                        <div class="skeleton skeleton-text title"></div>
                        <div class="skeleton skeleton-text addr"></div>
                        <div class="skeleton skeleton-text"></div>
                    </div>
                </div>
            `;
        }
    }

    const propertiesData = [
        {
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
            price: "$2,450,000",
            title: "Modern Glass Villa",
            address: "Zamalek, Cairo",
            beds: 4,
            baths: 3,
            sqft: "3,500",
            badge: "Featured"
        },
        {
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            price: "$1,850,000",
            title: "Luxury Penthouse",
            address: "Maadi, Cairo",
            beds: 3,
            baths: 2,
            sqft: "2,200",
            badge: "New"
        },
        {
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            price: "$3,200,000",
            title: "Classic Estate",
            address: "New Cairo, Cairo",
            beds: 5,
            baths: 4,
            sqft: "5,100",
            badge: "Hot"
        },
        {
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            price: "$950,000",
            title: "Contemporary Townhouse",
            address: "Sheikh Zayed, Giza",
            beds: 3,
            baths: 2,
            sqft: "1,850",
            badge: ""
        },
        {
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
            price: "$4,100,000",
            title: "Waterfront Mansion",
            address: "North Coast, Egypt",
            beds: 6,
            baths: 5,
            sqft: "6,500",
            badge: "Premium"
        },
        {
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            price: "$1,150,000",
            title: "Urban Loft",
            address: "Heliopolis, Cairo",
            beds: 2,
            baths: 2,
            sqft: "1,400",
            badge: ""
        }
    ];

    function renderProperties() {
        propertiesGrid.innerHTML = '';
        propertiesData.forEach(prop => {
            const badgeHtml = prop.badge ? `<span class="property-badge">${prop.badge}</span>` : '';
            propertiesGrid.innerHTML += `
                <div class="property-card">
                    ${badgeHtml}
                    <button class="bookmark-btn" aria-label="Save property"><i class="fa-regular fa-bookmark"></i></button>
                    <div class="property-img-wrapper">
                        <img src="${prop.image}" alt="${prop.title}" loading="lazy">
                    </div>
                    <div class="property-details">
                        <div class="property-price">${prop.price}</div>
                        <h3 class="property-title">${prop.title}</h3>
                        <div class="property-address"><i class="fa-solid fa-location-dot"></i> ${prop.address}</div>
                        <div class="property-features">
                            <span class="feature"><i class="fa-solid fa-bed text-gold"></i> ${prop.beds} Beds</span>
                            <span class="feature"><i class="fa-solid fa-bath text-gold"></i> ${prop.baths} Baths</span>
                            <span class="feature"><i class="fa-solid fa-ruler-combined text-gold"></i> ${prop.sqft} sqft</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add Bookmark Interactions
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent scroll if inside link
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                if (this.classList.contains('active')) {
                    icon.classList.replace('fa-regular', 'fa-solid');
                } else {
                    icon.classList.replace('fa-solid', 'fa-regular');
                }
            });
        });
    }

    // Simulate Network Request for Skeletons
    if(propertiesGrid) {
        renderSkeletons();
        setTimeout(() => {
            renderProperties();
        }, 1500);
    }
});
