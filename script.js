/**
 * BrainWave Official Portal Client Controller
 * Focus: High-performance, lightweight interactions, live biosignal animation,
 * and accessible navigation paradigms.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. REAL-TIME 4-CHANNEL EEG SIMULATOR (Subtle, Authentic Biological Rhythm)
    const canvas = document.getElementById('eeg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Channel baseline offsets & styles
        const channels = [
            { label: 'Ch 1 (F3)', color: '#8C6D3F', baseFreq: 0.04, amp: 14, phase: 0 },
            { label: 'Ch 2 (C3)', color: '#5E4524', baseFreq: 0.07, amp: 18, phase: 1.2 },
            { label: 'Ch 3 (T3)', color: '#4ade80', baseFreq: 0.05, amp: 12, phase: 2.5 },
            { label: 'Ch 4 (Pz)', color: '#1E2023', baseFreq: 0.09, amp: 16, phase: 4.1 }
        ];

        let t = 0;

        function renderEEG() {
            // Resize canvas to display dimensions without stretching
            const width = canvas.parentElement.clientWidth;
            const height = canvas.parentElement.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            // Draw dark background & clinical scale grid
            ctx.fillStyle = '#EDE3CF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = 'rgba(70, 50, 25, 0.04)';
            ctx.lineWidth = 1;

            // Subtle vertical timing ticks (every 50px)
            for (let x = 0; x < canvas.width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            const channelHeight = canvas.height / channels.length;

            channels.forEach((ch, idx) => {
                const centerY = (idx + 0.5) * channelHeight;

                // Subtle baseline
                ctx.strokeStyle = 'rgba(70, 50, 25, 0.08)';
                ctx.beginPath();
                ctx.moveTo(0, centerY);
                ctx.lineTo(canvas.width, centerY);
                ctx.stroke();

                // Channel Label
                ctx.fillStyle = '#000000';
                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.fillText(ch.label, 8, centerY - 8);

                // Waveform calculation (Alpha + Beta synthetic composite rhythm)
                ctx.strokeStyle = ch.color;
                ctx.lineWidth = 1.25;
                ctx.beginPath();

                for (let x = 0; x < canvas.width; x += 2) {
                    // Composite of alpha (8-12Hz) rhythm and subtle stochastic noise
                    const alpha = Math.sin((x * ch.baseFreq) + t + ch.phase) * ch.amp;
                    const beta = Math.sin((x * ch.baseFreq * 2.3) + t * 1.5) * (ch.amp * 0.35);
                    const noise = (Math.random() - 0.5) * 2;
                    const y = centerY + alpha + beta + noise;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            });

            t += 0.04;
            animationFrameId = requestAnimationFrame(renderEEG);
        }

        // Only animate if reduced-motion is not preferred
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            renderEEG();
        } else {
            // Static single draw
            t = 1.2;
            renderEEG();
            cancelAnimationFrame(animationFrameId);
        }
    }


    // 3. INTERACTIVE TECHNOLOGY STACK TABS
    const techData = [
        {
            stage: "STAGE 01 // FRONT-END CAPTURE",
            title: "High-Density Scalp Acquisition",
            desc: "Active differential electroencephalography system positioned across the international 10–20 standard montage. Dedicated emphasis is directed to bilateral temporal and motor regions to capture covert motor-articulatory intention prior to neuromuscular attenuation.",
            meta: [
                { name: "Sampling Rate", val: "1000 Hz / Channel" },
                { name: "Quantization", val: "24-bit Low Noise ADC" },
                { name: "Noise Floor", val: "< 0.8 µV RMS" }
            ],
            code: `# High-density EEG acquisition stage\npipeline = BrainWaveCapturePipeline(\n    channels=64,\n    sample_rate=1000,\n    notch_filter=(50.0, 60.0),\n    active_shielding=True\n)\nstream = pipeline.init_differential_stream()`
        },
        {
            stage: "STAGE 02 // PREPROCESSING",
            title: "Spatial Decomposition & Artifact Rejection",
            desc: "Dynamic identification and extraction of ocular saccades, blink artifacts, and jaw clenches through blind-source separation and spatial spatial Laplacian filtering without sacrificing underlying cortical frequencies.",
            meta: [
                { name: "Bandpass", val: "0.5 Hz – 45.0 Hz" },
                { name: "Latency Overhead", val: "< 14 ms" },
                { name: "Artifact Method", val: "FastICA + Spatial Filter" }
            ],
            code: `# Real-time spatial artifact suppression\nartifact_filter = SpatialDecompositionFilter(\n    eog_channels=['Fp1', 'Fp2'],\n    rejection_mode='blind_source_separation'\n)\nclean_eeg = artifact_filter.process(stream)`
        },
        {
            stage: "STAGE 03 // NEURAL ENCODER",
            title: "Conformer Spatiotemporal Backbone",
            desc: "Unified convolutional and self-attention blocks extracting local temporal patterns alongside cross-electrode spatial co-activations to preserve sequence context in covert articulation windows.",
            meta: [
                { name: "Backbone", val: "Conformer-128" },
                { name: "Context Window", val: "400 ms sliding" },
                { name: "Attention Heads", val: "8 multi-head" }
            ],
            code: `# Spatiotemporal neural representation\nencoder = ConformerNeuralEncoder(\n    d_model=128,\n    nhead=8,\n    num_layers=6,\n    kernel_size=31\n)\nembeddings = encoder(clean_eeg.to_tensor())`
        },
        {
            stage: "STAGE 04 // DECODING LAYER",
            title: "Probabilistic Phoneme Estimation",
            desc: "Continuous projection of representation embeddings into probability distributions over discrete phonemes and articulatory primitives, handling acoustic-temporal ambiguity directly.",
            meta: [
                { name: "Output Target", val: "42 English Phonemes" },
                { name: "Loss Function", val: "Connectionist Temp Loss" },
                { name: "Logit Rate", val: "25 Hz" }
            ],
            code: `# Phoneme token likelihood estimation\ndecoder = CTCPhonemeDecoder(classes=42)\nlogits = decoder(embeddings)\nprobabilities = softmax(logits, dim=-1)`
        },
        {
            stage: "STAGE 05 // LANGUAGE RESTRAINT",
            title: "Constrained Intent Synthesis",
            desc: "N-gram and transformer-based language prior decoding preventing stochastic hallucination and assembling phonemic logits into deterministic text outputs or device commands.",
            meta: [
                { name: "Prior Model", val: "Constrained WFST" },
                { name: "Latency", val: "< 240 ms Total" },
                { name: "Assurance", val: "Confidence Thresholding" }
            ],
            code: `# Constrained language model beam search\ninterface = SynthesizedIntentOutput(\n    beam_width=16,\n    min_confidence=0.82\n)\ntext_stream = interface.decode_beam(probabilities)`
        }
    ];

    const tabButtons = document.querySelectorAll('.tab-btn');
    const panelBadge = document.getElementById('panel-badge');
    const panelTitle = document.getElementById('panel-title');
    const panelDesc = document.getElementById('panel-desc');
    const panelMeta = document.getElementById('panel-meta');
    const terminalCode = document.getElementById('terminal-code');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-stage'), 10);
            
            // Toggle active tab buttons
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Render selected dataset
            const data = techData[index];
            if (data && panelTitle) {
                panelBadge.textContent = data.stage;
                panelTitle.textContent = data.title;
                panelDesc.textContent = data.desc;
                terminalCode.textContent = data.code;

                panelMeta.innerHTML = data.meta.map(m => `
                    <div class="meta-box">
                        <span class="meta-name">${m.name}</span>
                        <span class="meta-val">${m.val}</span>
                    </div>
                `).join('');
            }
        });
    });


    // 4. MOBILE NAVIGATION TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('primary-navigation');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    // 5. MODAL DIALOG CONTROLLER (Accessible & Universal)
    const modal = document.getElementById('universal-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalEyebrow = document.getElementById('modal-eyebrow');
    const modalFeedback = document.getElementById('modal-feedback');
    const modalForm = document.getElementById('modal-request-form');

    function openModal(title, eyebrow) {
        if (!modal) return;
        if (title) modalTitle.textContent = title;
        if (eyebrow) modalEyebrow.textContent = eyebrow;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        const emailInput = document.getElementById('modal-input-email');
        if (emailInput) emailInput.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (modalFeedback) modalFeedback.textContent = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Wire up triggers
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const topic = trigger.getAttribute('data-topic') || 'Research Protocol';
            openModal(`Request Protocol: ${topic}`, 'METHODOLOGY ARCHIVE');
        });
    });

    const navContactBtn = document.getElementById('nav-contact-btn');
    if (navContactBtn) {
        navContactBtn.addEventListener('click', () => {
            openModal('Initiate Research Inquiry', 'BRAINWAVE R&D DESK');
        });
    }

    const hardwareInquiryBtn = document.getElementById('open-hardware-inquiry-btn');
    if (hardwareInquiryBtn) {
        hardwareInquiryBtn.addEventListener('click', () => {
            openModal('Research Hardware Montage Specification', 'HARDWARE ALLOCATION');
        });
    }

    const privacyLink = document.getElementById('privacy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Data Privacy & Research Integrity Statement', 'ETHICAL GOVERNANCE');
        });
    }

    const termsLink = document.getElementById('terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Terms of Research Access', 'REGULATORY GOVERNANCE');
        });
    }

    // Modal Form Submission Handling
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('modal-input-email').value;
            if (modalFeedback) {
                modalFeedback.className = 'form-feedback success';
                modalFeedback.textContent = `[CONFIRMED] Evaluation notes queued for ${email}.`;
                modalForm.reset();
                setTimeout(() => closeModal(), 2200);
            }
        });
    }


    // 6. COLLABORATION INLINE FORM SUBMISSION
    const collabForm = document.getElementById('collab-form');
    const formFeedback = document.getElementById('form-feedback');

    if (collabForm) {
        collabForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('collab-name').value;
            const email = document.getElementById('collab-email').value;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = `Transmitted. Thank you ${name}, our research liaisons will review your proposal at ${email}.`;
                collabForm.reset();
            }
        });
    }

});


// Neurological Challenges Showcase Carousel Controls
(function() {
    const slider = document.querySelector('.showcase-slider-wrapper');
    const prevBtn = document.getElementById('showcase-prev');
    const nextBtn = document.getElementById('showcase-next');
    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = () => slider.clientWidth * 0.65;
    nextBtn.addEventListener('click', () => slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
})();


// Critical Font Verification (Prevents Silent Substitution)
(function verifyRequiredFonts() {
  const criticalFonts = [
    { family: 'Sigurd Variable', sample: '1rem "Sigurd Variable"' },
    { family: 'Rules Variable', sample: '1rem "Rules Variable"' }
  ];

  if (!('fonts' in document)) return;

  Promise.all(criticalFonts.map(f => document.fonts.load(f.sample)))
    .then(results => {
      criticalFonts.forEach((f, idx) => {
        if (!document.fonts.check(f.sample) || results[idx].length === 0) {
          triggerFontError(f.family);
        }
      });
    })
    .catch(() => triggerFontError('Required Variable Fonts'));

  function triggerFontError(name) {
    console.error(`[Typography] Critical font "${name}" failed to load. Check that files exist in /fonts.`);
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      const banner = document.createElement('div');
      banner.style.cssText = 'position:fixed;bottom:12px;right:12px;background:#e11d48;color:#fff;padding:10px 16px;font-family:monospace;font-size:12px;z-index:999999;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.4);';
      banner.innerText = `[Typography Alert] Missing font: "${name}". Place the font files into the 'fonts/' folder.`;
      document.body.appendChild(banner);
    }
  }
})();

// Mega Menu Dynamic Hover Script (Hardware, Software, Corpus & Models)
(function() {
    function initMegaMenu() {
        const catItems = document.querySelectorAll('.nav-dropdown-wrapper .mega-category-item');
        const viewHardware = document.getElementById('view-hardware');
        const viewSoftware = document.getElementById('view-software');
        const viewDataset = document.getElementById('view-dataset');

        if (!catItems.length) return;

        catItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                catItems.forEach(c => c.classList.remove('active'));
                item.classList.add('active');

                const target = item.getAttribute('data-target');
                if (viewHardware) viewHardware.classList.remove('active');
                if (viewSoftware) viewSoftware.classList.remove('active');
                if (viewDataset) viewDataset.classList.remove('active');

                if (target === 'panel-software' && viewSoftware) {
                    viewSoftware.classList.add('active');
                } else if (target === 'panel-dataset' && viewDataset) {
                    viewDataset.classList.add('active');
                } else if (viewHardware) {
                    viewHardware.classList.add('active');
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMegaMenu);
    } else {
        initMegaMenu();
    }
})();

// ==========================================================================
// UNIVERSAL SMART NAVBAR AUTO-HIDE (Scroll Down: Hide | Scroll Up: Show)
// ==========================================================================
(function() {
    function initSmartNavbar() {
        const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let ticking = false;
        const scrollThreshold = 10; // Minimum scroll delta before toggling

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                    const diff = currentScrollY - lastScrollY;

                    // If mobile drawer or mega-panel is open, do not hide navbar
                    const isDropdownActive = document.querySelector('.mega-dropdown-menu:hover') || 
                                             document.querySelector('.mega-dropdown-menu.active');
                    const isMobileActive = document.querySelector('.nav-links.active');

                    if (isDropdownActive || isMobileActive) {
                        lastScrollY = currentScrollY;
                        ticking = false;
                        return;
                    }

                    // Top of the page: always show
                    if (currentScrollY <= 20) {
                        navbar.classList.remove('navbar--hidden');
                        navbar.classList.remove('navbar--scrolled');
                    } else if (diff > scrollThreshold && currentScrollY > 80) {
                        // Scrolling DOWN -> Hide Navbar
                        navbar.classList.add('navbar--hidden');
                        navbar.classList.add('navbar--scrolled');
                    } else if (diff < -scrollThreshold) {
                        // Scrolling UP -> Reveal Navbar
                        navbar.classList.remove('navbar--hidden');
                        navbar.classList.add('navbar--scrolled');
                    }

                    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmartNavbar);
    } else {
        initSmartNavbar();
    }
})();

// ==========================================================================
// UNIVERSAL CONTACT MODAL HANDLER (Opens directly on any page)
// ==========================================================================
(function() {
    function initContactTriggers() {
        const modal = document.getElementById('universal-modal');
        const closeBtn = document.getElementById('modal-close-btn');
        if (!modal) return;

        function openModal(e) {
            if (e) e.preventDefault();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // stop page scrolling while modal is open
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        // Attach listener to any contact CTA button in navbar or footer
        const triggers = document.querySelectorAll('#nav-contact-btn, a[href="#contact"], .footer-contact-trigger, a[href="index.html#collaboration"]');
        triggers.forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactTriggers);
    } else {
        initContactTriggers();
    }
})();

// ==========================================================================
// ROBUST UNIVERSAL CONTACT MODAL (Active on all pages)
// ==========================================================================
(function() {
    function setupModalListeners() {
        const modal = document.getElementById('universal-modal');
        if (!modal) return;

        function showModal(e) {
            if (e) e.preventDefault();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            const firstInput = modal.querySelector('input');
            if (firstInput) setTimeout(() => firstInput.focus(), 50);
        }

        function hideModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        // Global click listener for any button or link targeting contact
        document.addEventListener('click', function(e) {
            const trigger = e.target.closest('#nav-contact-btn, a[href="#contact"], .nav-cta, .footer-contact-trigger, a[href*="collaboration"]');
            if (trigger) {
                showModal(e);
                return;
            }

            // Close button click
            if (e.target.closest('#modal-close-btn')) {
                e.preventDefault();
                hideModal();
                return;
            }

            // Backdrop click
            if (e.target === modal) {
                hideModal();
            }
        });

        // Escape key close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupModalListeners);
    } else {
        setupModalListeners();
    }
})();
