/* ── Scroll-Linked Phone Feed + Dissolution ─ */
(function() {
    var showcase = document.querySelector('.showcase');
    var feeds = document.querySelectorAll('.phone__feed');
    var phonesContainer = document.querySelector('.showcase__phones');
    var totalContainer = document.querySelector('.showcase__total');
    if (!showcase || feeds.length === 0) return;

    var ticking = false;
    var dissolved = false;

    function updateFeeds() {
        var rect = showcase.getBoundingClientRect();
        var sectionHeight = rect.height - window.innerHeight;
        var scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

        feeds.forEach(function(feed) {
            var speed = parseFloat(feed.dataset.speed) || 1;
            var videoCount = feed.children.length;
            var maxScroll = (videoCount - 1) * 100;
            var translate = Math.min(scrollProgress * maxScroll * speed, maxScroll);
            feed.style.transform = 'translateY(-' + translate + '%)';
        });

        if (phonesContainer && totalContainer) {
            if (scrollProgress > 0.55 && !dissolved) {
                dissolved = true;
                phonesContainer.classList.add('dissolve');
                totalContainer.classList.add('takeover');
            } else if (scrollProgress <= 0.55 && dissolved) {
                dissolved = false;
                phonesContainer.classList.remove('dissolve');
                totalContainer.classList.remove('takeover');
            }

            if (scrollProgress > 0.92) {
                var fadeProgress = (scrollProgress - 0.92) / 0.08;
                totalContainer.style.opacity = Math.max(0.15, 1 - fadeProgress);
            } else {
                totalContainer.style.opacity = '';
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateFeeds);
            ticking = true;
        }
    }, { passive: true });

    updateFeeds();
})();

/* ── CLIP / SEED / GROW Word Animations ──── */
(function() {
    var clipWord = document.querySelector('.csg__word--clip');
    var seedWord = document.querySelector('.csg__word--seed');
    var growWord = document.querySelector('.csg__word--grow');
    if (!clipWord || !seedWord || !growWord) return;

    /* ── CLIP — slash cuts through, letters split apart ── */
    var clipLetters = 'CLIP.'.split('');
    clipWord.textContent = '';
    clipLetters.forEach(function(ch, i) {
        var span = document.createElement('span');
        span.className = 'csg__clip-letter';
        span.textContent = ch;
        span.dataset.index = i;
        clipWord.appendChild(span);
    });

    function animateClip() {
        if (clipWord.classList.contains('animating')) return;
        clipWord.classList.add('animating');

        var letters = clipWord.querySelectorAll('.csg__clip-letter');

        var slash = document.createElement('span');
        slash.className = 'csg__clip-slash';
        clipWord.appendChild(slash);

        var line = document.createElement('span');
        line.className = 'csg__clip-line';
        clipWord.appendChild(line);

        requestAnimationFrame(function() {
            slash.classList.add('animate');
            line.classList.add('animate');
        });

        setTimeout(function() {
            letters[0].style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letters[0].style.transform = 'translate(-2px, -3px) rotate(-0.5deg)';
            letters[1].style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letters[1].style.transform = 'translate(-1px, -2px) rotate(-0.3deg)';
            letters[2].style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letters[2].style.transform = 'translate(6px, 12px) rotate(3deg)';
            letters[2].style.opacity = '0.85';
            letters[3].style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letters[3].style.transform = 'translate(10px, 16px) rotate(2.5deg)';
            letters[3].style.opacity = '0.85';
            letters[4].style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letters[4].style.transform = 'translate(12px, 20px) rotate(2deg)';
            letters[4].style.opacity = '0.7';
        }, 250);

        /* Green sparks */
        setTimeout(function() {
            for (var i = 0; i < 12; i++) {
                var spark = document.createElement('span');
                spark.className = 'csg__clip-spark';
                spark.style.left = (35 + Math.random() * 20) + '%';
                spark.style.top = (35 + Math.random() * 30) + '%';
                spark.style.setProperty('--dx', ((Math.random() - 0.5) * 120) + 'px');
                spark.style.setProperty('--dy', ((Math.random() - 0.5) * 80) + 'px');
                clipWord.appendChild(spark);
                (function(s) {
                    setTimeout(function() {
                        if (s.parentNode) s.parentNode.removeChild(s);
                    }, 900);
                })(spark);
            }
        }, 220);

        setTimeout(function() {
            letters.forEach(function(l) {
                l.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
                l.style.transform = '';
                l.style.opacity = '';
            });
        }, 750);

        setTimeout(function() {
            [slash, line].forEach(function(el) {
                if (el.parentNode) el.parentNode.removeChild(el);
            });
            letters.forEach(function(l) {
                l.style.transition = '';
                l.style.transform = '';
                l.style.opacity = '';
            });
            clipWord.classList.remove('animating');
        }, 1400);
    }

    /* ── SEED — bury + sprout ── */
    function animateSeed() {
        if (seedWord.classList.contains('animating')) return;
        seedWord.classList.add('animating');
        seedWord.classList.add('active');

        for (var i = 0; i < 14; i++) {
            (function(idx) {
                var dot = document.createElement('span');
                dot.className = 'csg__seed-particle';
                dot.style.left = (Math.random() * 100) + '%';
                dot.style.animationDelay = (Math.random() * 0.3) + 's';
                dot.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
                seedWord.appendChild(dot);
                setTimeout(function() {
                    if (dot.parentNode) dot.parentNode.removeChild(dot);
                }, 1200);
            })(i);
        }

        setTimeout(function() {
            seedWord.classList.remove('active');
        }, 900);

        setTimeout(function() {
            seedWord.classList.remove('animating');
        }, 1500);
    }

    /* ── GROW — green hearts + scale up ── */
    function animateGrow() {
        if (growWord.classList.contains('animating')) return;
        growWord.classList.add('animating');
        growWord.classList.add('active');

        for (var i = 0; i < 12; i++) {
            (function(idx) {
                setTimeout(function() {
                    var heart = document.createElement('span');
                    heart.className = 'csg__grow-heart';
                    var size = 14 + Math.floor(Math.random() * 16);
                    var colors = ['rgba(15,255,82,0.8)', 'rgba(61,255,117,0.7)', 'rgba(15,255,82,0.6)', 'rgba(200,255,200,0.5)'];
                    var color = colors[Math.floor(Math.random() * colors.length)];
                    heart.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + color + '"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
                    heart.style.left = (5 + Math.random() * 90) + '%';
                    heart.style.animationDuration = (1.5 + Math.random() * 1) + 's';
                    growWord.appendChild(heart);
                    setTimeout(function() {
                        if (heart.parentNode) heart.parentNode.removeChild(heart);
                    }, 3000);
                }, idx * 100);
            })(i);
        }

        setTimeout(function() {
            growWord.classList.remove('active');
        }, 2200);

        setTimeout(function() {
            growWord.classList.remove('animating');
        }, 3500);
    }

    clipWord.addEventListener('mouseenter', animateClip);
    seedWord.addEventListener('mouseenter', animateSeed);
    growWord.addEventListener('mouseenter', animateGrow);

    var csgSection = document.querySelector('.csg');
    if (csgSection) {
        var csgObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    setTimeout(animateClip, 300);
                    setTimeout(animateSeed, 1600);
                    setTimeout(animateGrow, 2800);
                    csgObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        csgObserver.observe(csgSection);
    }
})();

/* ── Reveal Animations ───────────────────── */
var revealSelectors = [
    { sel: '.hero__sub', delay: 1 },
    { sel: '.hero__desc', delay: 2 },
    { sel: '.hero__inner .btn', delay: 3 },
    { sel: '.csg__word', stagger: true },
    { sel: '.showcase__eyebrow', delay: 0 },
    { sel: '.showcase__headline', delay: 1 },
    { sel: '.showcase__phone', stagger: true },
    { sel: '.showcase__total', delay: 0 },
    { sel: '.creative__headline', delay: 0 },
    { sel: '.creative__item', stagger: true },
    { sel: '.process__headline', delay: 0 },
    { sel: '.process__sub', delay: 1 },
    { sel: '.process__stop', stagger: true },
    { sel: '.about-banner__text', delay: 0 },
    { sel: '.contact__headline', delay: 0 },
    { sel: '.contact__form', delay: 1 },
];

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    revealSelectors.forEach(function(item) {
        var els = document.querySelectorAll(item.sel);
        els.forEach(function(el, i) {
            el.classList.add('reveal');
            if (item.stagger) {
                el.classList.add('delay-' + Math.min(i + 1, 4));
            } else if (item.delay) {
                el.classList.add('delay-' + item.delay);
            }
        });
    });
}

/* ── Scroll Reveal Observer ──────────────── */
var reveals = document.querySelectorAll('.reveal');

if (reveals.length > 0) {
    var revealObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach(function(el) { revealObserver.observe(el); });
}

/* ── Mobile Nav Toggle ───────────────────── */
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

/* ── Nav Auto-Hide on Scroll Down ─────────── */
(function() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var lastScrollY = window.scrollY;
    var ticking = false;

    function updateNav() {
        var currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            nav.classList.add('nav--hidden');
            var navLinks = document.getElementById('nav-links');
            var hamburger = document.getElementById('hamburger');
            if (navLinks) navLinks.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
        } else {
            nav.classList.remove('nav--hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
})();

/* ── Smooth Scroll ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ── Process Dots — Glow when centered on screen ── */
(function() {
    var stops = document.querySelectorAll('.process__stop');
    if (stops.length === 0) return;

    var ticking = false;

    function updateActiveStop() {
        var viewportCenter = window.innerHeight / 2;
        var closestStop = null;
        var closestDist = Infinity;

        stops.forEach(function(stop) {
            var rect = stop.getBoundingClientRect();
            var stopCenter = rect.top + rect.height / 2;
            var dist = Math.abs(stopCenter - viewportCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closestStop = stop;
            }
        });

        stops.forEach(function(stop) {
            if (stop === closestStop && closestDist < window.innerHeight * 0.4) {
                stop.classList.add('process__stop--active');
            } else {
                stop.classList.remove('process__stop--active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateActiveStop);
            ticking = true;
        }
    }, { passive: true });

    updateActiveStop();
})();

/* ── About Banner — glow on scroll ── */
(function() {
    var banner = document.querySelector('.about-banner');
    if (!banner) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                banner.classList.add('about-banner--active');
            } else {
                banner.classList.remove('about-banner--active');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(banner);
})();

/* ── Virality — Recording light pulse when visible ── */
(function() {
    var showcase = document.querySelector('.showcase');
    if (!showcase) return;

    var viralityWord = showcase.querySelector('.heart-word');
    if (!viralityWord) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                viralityWord.classList.add('heart-word--recording');
            } else {
                viralityWord.classList.remove('heart-word--recording');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(showcase);
})();

/* ── Infrastructure — green glow when showcase visible ── */
(function() {
    var showcase = document.querySelector('.showcase');
    if (!showcase) return;

    var infraWord = showcase.querySelector('.infra-word');
    if (!infraWord) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                infraWord.classList.add('infra-word--recording');
            } else {
                infraWord.classList.remove('infra-word--recording');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(showcase);
})();
