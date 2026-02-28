/* ── Scroll-linked Phone Feed + Fade Out ─ */
(function() {
    var showcase = document.querySelector('.showcase');
    var phones = document.querySelector('.showcase__phones');
    var feed = document.getElementById('scroll-feed');
    if (!showcase || !phones || !feed) return;

    var videos = feed.querySelectorAll('.phone__video');
    if (videos.length === 0) return;

    var ticking = false;

    function updateFeed() {
        var rect = showcase.getBoundingClientRect();
        var sectionHeight = showcase.offsetHeight;
        var scrolled = -rect.top;
        var progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

        /* Scroll the feed through all videos */
        var totalFeedHeight = videos[0].offsetWidth * (16/9) * (videos.length - 1);
        feed.style.transform = 'translateY(-' + (progress * totalFeedHeight) + 'px)';

        /* Fade out phone as you scroll past ~70% */
        var fadeStart = 0.65;
        var fadeEnd = 0.95;
        if (progress > fadeStart) {
            var fadeProgress = (progress - fadeStart) / (fadeEnd - fadeStart);
            fadeProgress = Math.max(0, Math.min(1, fadeProgress));
            phones.style.opacity = 1 - fadeProgress;
            phones.style.transform = 'scale(' + (1 - fadeProgress * 0.1) + ') translateY(' + (fadeProgress * -30) + 'px)';
        } else {
            phones.style.opacity = 1;
            phones.style.transform = '';
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateFeed);
            ticking = true;
        }
    }, { passive: true });

    updateFeed();
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
    { sel: '.process__headline', delay: 0 },
    { sel: '.process__sub', delay: 1 },
    { sel: '.process__stop', stagger: true },
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

/* ── Process Dots + Scroll-Progress Line ── */
(function() {
    var stops = document.querySelectorAll('.process__stop');
    var lineFill = document.querySelector('.process__line-fill');
    var processLine = document.querySelector('.process__line');
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

        /* Scroll-progress fill */
        if (lineFill && processLine) {
            var lineRect = processLine.getBoundingClientRect();
            var lineTop = lineRect.top;
            var lineHeight = lineRect.height;
            var scrollCenter = window.innerHeight * 0.5;
            var progress = (scrollCenter - lineTop) / lineHeight;
            progress = Math.max(0, Math.min(1, progress));
            lineFill.style.height = (progress * 100) + '%';
        }

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

/* ── Counter Animation — numbers count up on scroll ── */
(function() {
    var statNums = document.querySelectorAll('.hero__stat-num');
    if (statNums.length === 0) return;

    var animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;

        statNums.forEach(function(el) {
            var text = el.textContent;
            var target = parseFloat(text.replace(/[^0-9.]/g, ''));
            var suffix = text.replace(/[0-9,. ]/g, '');
            var start = 0;
            var duration = 1200;
            var startTime = null;

            function tick(ts) {
                if (!startTime) startTime = ts;
                var progress = Math.min((ts - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = start + (target - start) * eased;
                if (target >= 1000) {
                    el.textContent = Math.floor(current).toLocaleString() + suffix;
                } else {
                    el.textContent = Math.floor(current) + suffix;
                }
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.classList.add('counted');
                }
            }

            requestAnimationFrame(tick);
        });
    }

    var hero = document.querySelector('.hero');
    if (hero) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 1500);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(hero);
    }
})();

