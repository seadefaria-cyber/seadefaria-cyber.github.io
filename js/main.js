/* ── Phone Feeds — static, show first video only ─ */
(function() {
    var feeds = document.querySelectorAll('.phone__feed');
    feeds.forEach(function(feed) {
        feed.style.transform = 'translateY(0)';
    });
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

/* ── 3D Tilt on Phone Cards ── */
(function() {
    var phones = document.querySelectorAll('.showcase__phone .phone');
    if (phones.length === 0) return;
    if (window.matchMedia('(max-width: 809px)').matches) return;

    phones.forEach(function(phone) {
        phone.addEventListener('mousemove', function(e) {
            var rect = phone.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            var rotateY = (x - 0.5) * 20;
            var rotateX = (0.5 - y) * 15;
            phone.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        });

        phone.addEventListener('mouseleave', function() {
            phone.style.transform = '';
        });
    });
})();
