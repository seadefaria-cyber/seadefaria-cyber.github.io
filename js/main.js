/* ── Phone Feeds — static, show first video only ─ */
(function() {
    var feeds = document.querySelectorAll('.phone__feed');
    feeds.forEach(function(feed) {
        feed.style.transform = 'translateY(0)';
    });
})();

/* ── CLIP / SEED / AMPLIFY Word Animations ── */
(function() {
    var clipWord = document.querySelector('.csg__word--clip');
    var seedWord = document.querySelector('.csg__word--seed');
    var growWord = document.querySelector('.csg__word--grow');
    if (!clipWord || !seedWord || !growWord) return;

    /* ── SEED — slash cuts through, letters split apart ── */
    var clipLetters = 'SEED.'.split('');
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

    /* ── AMPLIFY — green particles + scale up ── */
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
    { sel: '.deliverables__headline', delay: 0 },
    { sel: '.deliverables__item', stagger: true },
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

/* ── Counter Animation — numbers count up on scroll ── */
(function() {
    var statNums = document.querySelectorAll('.hero__stat-num');
    if (statNums.length === 0) return;

    var animated = false;

    function parseNum(str) {
        return parseFloat(str.replace(/[^0-9.]/g, ''));
    }

    function formatNum(n, template) {
        if (template.indexOf('M') > -1) return n.toFixed(0) + 'M+';
        if (n >= 1000) {
            return Math.floor(n).toLocaleString();
        }
        return Math.floor(n).toString();
    }

    function animateCounters() {
        if (animated) return;
        animated = true;

        statNums.forEach(function(el) {
            var text = el.textContent;
            var target = parseNum(text);
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

/* ── Typewriter Effect — section tags type out on scroll ── */
(function() {
    var tags = document.querySelectorAll('.section-tag');
    if (tags.length === 0) return;

    tags.forEach(function(tag) {
        var fullText = tag.textContent;
        tag.textContent = '';
        tag.dataset.fullText = fullText;
        tag.dataset.typed = 'false';
    });

    var typeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && entry.target.dataset.typed === 'false') {
                entry.target.dataset.typed = 'true';
                var text = entry.target.dataset.fullText;
                var i = 0;
                function typeChar() {
                    if (i <= text.length) {
                        entry.target.textContent = text.substring(0, i) + (i < text.length ? '_' : '');
                        i++;
                        setTimeout(typeChar, 40 + Math.random() * 30);
                    }
                }
                typeChar();
                typeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    tags.forEach(function(tag) { typeObserver.observe(tag); });
})();

/* ── Floating Seed Particles — organic dots drifting upward ── */
(function() {
    var particleSections = document.querySelectorAll('.process, .creative, .hero');
    if (particleSections.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    particleSections.forEach(function(section) {
        var spawned = false;

        var particleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !spawned) {
                    spawned = true;
                    spawnSeeds(section);
                }
            });
        }, { threshold: 0.1 });

        particleObserver.observe(section);
    });

    function spawnSeeds(section) {
        section.style.position = section.style.position || 'relative';
        section.style.overflow = 'hidden';

        for (var i = 0; i < 8; i++) {
            (function(idx) {
                setTimeout(function() {
                    var el = document.createElement('span');
                    el.className = 'seed-particle';
                    var size = 3 + Math.random() * 5;
                    el.style.width = size + 'px';
                    el.style.height = size + 'px';
                    el.style.left = (5 + Math.random() * 90) + '%';
                    el.style.animationDuration = (4 + Math.random() * 6) + 's';
                    el.style.animationDelay = (idx * 0.8) + 's';
                    el.style.setProperty('--drift', ((Math.random() - 0.5) * 60) + 'px');
                    section.appendChild(el);
                    setTimeout(function() {
                        if (el.parentNode) el.parentNode.removeChild(el);
                    }, 12000);
                }, idx * 700);
            })(i);
        }
    }
})();

/* ── Step Tag Typing — process step tags type on scroll ── */
(function() {
    var stepTags = document.querySelectorAll('.process__step-tag');
    if (stepTags.length === 0) return;

    stepTags.forEach(function(tag) {
        var fullText = tag.textContent;
        tag.textContent = '';
        tag.dataset.fullText = fullText;
        tag.dataset.typed = 'false';
    });

    var stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && entry.target.dataset.typed === 'false') {
                entry.target.dataset.typed = 'true';
                var text = entry.target.dataset.fullText;
                var i = 0;
                function typeChar() {
                    if (i <= text.length) {
                        entry.target.textContent = text.substring(0, i) + (i < text.length ? '_' : '');
                        i++;
                        setTimeout(typeChar, 60);
                    }
                }
                setTimeout(typeChar, 200);
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stepTags.forEach(function(tag) { stepObserver.observe(tag); });
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
