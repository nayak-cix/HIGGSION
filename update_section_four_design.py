import re
import sys

FILE_PATH = "research.html"

with open(FILE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Locate Section 4 by heading or id
sec4_pattern = r'(<section\b[^>]*>(?:(?!</section>)[\s\S])*?Biomarkers,\s*Cognition\s*&\s*High-Bandwidth\s*Systems[\s\S]*?</section>)'
sec4_match = re.search(sec4_pattern, content, re.IGNORECASE)

if not sec4_match:
    print("ERROR: Could not locate Section 4 ('Biomarkers, Cognition & High-Bandwidth Systems') in research.html")
    sys.exit(1)

# Replacement markup using the exact same structure as Section 2 (vectors-tab-showcase, editorial-col-narrative left, editorial-col-preview right)
new_section_four = """        <!-- ============================================================
             SECTION 4: BIOMARKERS, COGNITION & HIGH-BANDWIDTH SYSTEMS
             ============================================================ -->
        <section class="section vectors-tab-showcase" id="vectors-part-3">
            <div class="container">

                <div class="section-intro" style="margin-bottom: 28px;">
                    <span class="section-num">03 // COGNITIVE DYNAMICS &amp; SYSTEMS</span>
                    <h2 class="section-heading">Biomarkers, Cognition &amp; High-Bandwidth Systems</h2>
                    <p class="section-summary">
                        Investigating exploratory electrophysiological candidate markers, covert cognitive state monitoring, and scalable neural interface architectures.
                    </p>
                </div>

                <!-- 6 Glassmorphic Capsule Tabs matching Section 2 -->
                <div class="capsule-tabs-container">
                    <button class="capsule-tab-btn-bio active" data-tab="bio-biomarkers">Neurological Biomarkers</button>
                    <button class="capsule-tab-btn-bio" data-tab="bio-brainstate">Brain-State Monitoring</button>
                    <button class="capsule-tab-btn-bio" data-tab="bio-bandwidth">High-Bandwidth Communication</button>
                    <button class="capsule-tab-btn-bio" data-tab="bio-cognitive">Cognitive-State Assessment</button>
                    <button class="capsule-tab-btn-bio" data-tab="bio-platform">Interface Platform</button>
                    <button class="capsule-tab-btn-bio" data-tab="bio-neuromorphic">Neuromorphic Architectures</button>
                </div>

                <!-- Tab 1: Neurological Biomarker Research -->
                <div class="tab-editorial-view active" id="tab-bio-biomarkers">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Electrophysiological alterations often precede macro-structural neurological changes, yet establishing non-invasive electrophysiological candidate markers remains impeded by broad scalp volume conduction, environmental noise, and marked inter-individual spectral heterogeneity.
                        </p>
                        <p class="narrative-body">
                            BrainWave investigates multi-channel resting-state and event-locked electrophysiological telemetry to identify candidate spectral and microstate anomalies. Signal processing workflows apply causal bandpass filtering, automated eye-blink artifact rejection, and spatial covariance modeling to characterize transient shifts in background rhythms, such as localized slowing or alterations in dominant oscillatory peaks.
                        </p>
                        <p class="narrative-body">
                            Investigating these candidate features aims to support longitudinal exploratory research into neurodegenerative and neurodevelopmental trajectories. These candidate patterns represent exploratory electrophysiological features rather than validated clinical diagnostics, as scalp EEG alone cannot definitively diagnose specific neurological pathologies or substitute for formal neurological evaluations. Clinical utility requires prospective multi-center cohorts, blinded validation against structural MRI and molecular assays, and rigorous assessment of sensitivity and specificity thresholds.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="Neurological Biomarker Telemetry" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>Spectral Covariance Tracking</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Microstate Transition Rates</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Exploratory Baseline Anomaly Models</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab 2: Brain-State Monitoring -->
                <div class="tab-editorial-view" id="tab-bio-brainstate">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Continuous tracking of global cortical vigilance and mental fatigue is constrained by signal non-stationarity, gradual electrode contact drying, and the continuous superposition of ambient and physiological artifacts onto ongoing rhythms.
                        </p>
                        <p class="narrative-body">
                            The proposed processing pipeline explores temporal tracking of broad oscillatory power distributions—specifically parameterized spectral dynamics across delta, theta, alpha, and beta bands—alongside channel-to-channel phase synchrony metrics computed over sliding observational windows.
                        </p>
                        <p class="narrative-body">
                            This capability is intended for exploratory tracking of vigilance fluctuations, workload transitions, and attention shifts in controlled human-factors and neuroergonomic experiments. Changes in macroscopic EEG rhythms reflect general arousal states rather than definitive, singular cognitive or emotional experiences. Validating reliability requires multi-hour recording protocols with concurrent physiological benchmarks, systematic quantification of baseline drift across sessions, and validation that state transitions are not mimicked by facial electromyographic contamination.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="Brain-State Dynamics Monitoring" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>Sliding-Window Spectral Parameterization</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Phase Synchrony Metric Trajectories</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>EMG-Contamination Exclusion Gates</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab 3: High-Bandwidth Neural Communication -->
                <div class="tab-editorial-view" id="tab-bio-bandwidth">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Non-invasive brain-computer communication channels are fundamentally information-constrained by the low spatial resolution and low signal-to-noise ratio of scalp-recorded electrophysiology, limiting sustainable information transfer rates (ITR).
                        </p>
                        <p class="narrative-body">
                            BrainWave investigates high-density temporal feature extraction, multi-class event-related potential (ERP) paradigms, and probabilistic language priors to maximize reliable symbol selection rates. The computational stage explores joint optimization of spatial filters and confidence-calibrated decoding algorithms to distinguish intentional neural responses from baseline neural fluctuations.
                        </p>
                        <p class="narrative-body">
                            This research seeks to expand communication throughput for individuals with profound motor and vocal impairments, such as late-stage amyotrophic lateral sclerosis. The pipeline evaluates structured selection among predefined discrete communicative tokens rather than unconstrained thought reconstruction or continuous speech generation. Demonstrating meaningful performance requires reporting true information transfer rates in bits per minute, accounting for selection errors, timeout delays, and cognitive fatigue during extended operational sessions.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="High-Bandwidth Neural Communication" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>Predefined Discrete Token Sets</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Penalized ITR Quantification (Bits/Min)</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Confidence-Calibrated Priors</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab 4: Cognitive-State Assessment -->
                <div class="tab-editorial-view" id="tab-bio-cognitive">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Objective evaluation of covert cognitive processes—such as task engagement, working memory load, and perceptual processing—is limited by the difficulty of isolating task-relevant neural signatures from ongoing background cortical dynamics.
                        </p>
                        <p class="narrative-body">
                            BrainWave evaluates event-related potentials (including P300 and N400 complexes) and task-related spectral perturbations time-locked to cognitive stimulus delivery. Spatial decomposition algorithms and surface Laplacian transforms are explored to isolate focal fronto-parietal activations from generalized background oscillations.
                        </p>
                        <p class="narrative-body">
                            Potential applications include assessing cognitive processing speed and attentional engagement in educational, clinical research, and assistive software contexts. Changes in evoked amplitudes or latencies provide indirect indices of neural processing and must not be equated with definitive measurements of consciousness, comprehension, or inner thought content. Rigorous evaluation necessitates controlled cognitive challenge paradigms, test-retest reliability across repeated sessions, and explicit accounting for circadian and pharmacological confounds.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="Cognitive-State Assessment Dynamics" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>P300 / N400 Evoked Complex Latencies</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Fronto-Parietal Spatial Derivations</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Circadian &amp; Habituation Controls</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab 5: General-Purpose Neural Interface Platform -->
                <div class="tab-editorial-view" id="tab-bio-platform">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Translating disparate laboratory neural-decoding algorithms to real-world applications is hindered by rigid software architectures, inconsistent data standards, and proprietary hardware lock-in across the neurotechnology landscape.
                        </p>
                        <p class="narrative-body">
                            BrainWave investigates a modular, open-architecture middleware platform that standardizes data ingestion from varied EEG front-ends, provides synchronized event-marker streaming via Lab Streaming Layer (LSL), and enforces BIDS-compliant dataset serialization.
                        </p>
                        <p class="narrative-body">
                            This framework aims to enable researchers and assistive technology developers to integrate and benchmark diverse decoding pipelines without redesigning core hardware-interfacing logic. The platform is an engineering and research middleware layer rather than an autonomous medical-grade operating framework. Validating cross-platform utility requires measuring end-to-end telemetry latency, assessing driver stability under continuous multi-channel streaming, and verifying compatibility across independent third-party analysis toolboxes.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="Open Interface Middleware Platform" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>LSL Event-Stream Synchronization</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>BIDS-Compatible Data Governance</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>End-to-End Ingestion Latency Bounds</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab 6: Adaptive Neuromorphic Architectures -->
                <div class="tab-editorial-view" id="tab-bio-neuromorphic">
                    <div class="editorial-col-narrative">
                        <p class="narrative-lead">
                            Deploying continuous multi-channel electrophysiological decoders on compact wearable hardware is constrained by the thermal and power demands of conventional synchronous digital computing architectures.
                        </p>
                        <p class="narrative-body">
                            The research framework explores event-based encoding strategies and sparse neural representations as a conceptual direction for ultra-low-power edge computing. This explores mapping threshold-crossing electrophysiological features or discrete spectral transients into event-driven representations for energy-efficient inference.
                        </p>
                        <p class="narrative-body">
                            This investigative trajectory envisions wearable, battery-powered neural decoders capable of local inference without constant high-bandwidth wireless transmission. Neuromorphic processing represents an exploratory conceptual research path rather than an active commercial hardware implementation in BrainWave, and continuous macroscopic scalp potentials are not inherently equivalent to biological neural spikes. Future validation requires benchmarking computational power dissipation, latency profiles, and decoding accuracy on dedicated neuromorphic hardware emulators against optimized embedded microcontrollers.
                        </p>
                    </div>
                    <div class="editorial-col-preview">
                        <div class="preview-specimen-frame">
                            <img src="assets/brain0.jpg" alt="Neuromorphic Edge Decoding Systems" class="preview-stage-img">
                        </div>
                        <div class="preview-meta-panel">
                            <span class="preview-meta-title">INVESTIGATIVE TARGETS</span>
                            <ul class="preview-links-list">
                                <li><span>Sparse Event-Driven Encoding</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Edge Power Dissipation Thresholds</span><span class="ext-arrow">&#8599;</span></li>
                                <li><span>Hardware Emulator Benchmarking</span><span class="ext-arrow">&#8599;</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>"""

# Replace Section 4 exclusively
updated_content = content[:sec4_match.start()] + new_section_four + content[sec4_match.end():]

# Update the Unified Tab Controller script to handle Section 4 tabs (.capsule-tab-btn-bio)
js_pattern = r'(// Controller for Section 2 \(Diagnostics\)[\s\S]*?if \(el\) el\.classList\.add\(\'active\'\);\s*\}\);\s*\}\);)'

sec4_js = """// Controller for Section 2 (Diagnostics)
                const dButtons = document.querySelectorAll('.capsule-tab-btn-diag');
                const dViews = document.querySelectorAll('#vectors-part-2 .tab-editorial-view');

                dButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = this.getAttribute('data-tab');
                        dButtons.forEach(b => b.classList.remove('active'));
                        dViews.forEach(v => v.classList.remove('active'));

                        this.classList.add('active');
                        const el = document.getElementById(target) || document.getElementById('tab-' + target);
                        if (el) el.classList.add('active');
                    });
                });

                // Controller for Section 4 (Biomarkers & High-Bandwidth Systems)
                const bButtons = document.querySelectorAll('.capsule-tab-btn-bio');
                const bViews = document.querySelectorAll('#vectors-part-3 .tab-editorial-view');

                bButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = this.getAttribute('data-tab');
                        bButtons.forEach(b => b.classList.remove('active'));
                        bViews.forEach(v => v.classList.remove('active'));

                        this.classList.add('active');
                        const el = document.getElementById(target) || document.getElementById('tab-' + target);
                        if (el) el.classList.add('active');
                    });
                });"""

if re.search(r'// Controller for Section 2 \(Diagnostics\)', updated_content):
    updated_content = re.sub(js_pattern, sec4_js, updated_content, count=1)

with open(FILE_PATH, "w", encoding="utf-8") as f:
    f.write(updated_content)

print("SUCCESS: Section 4 design converted to Section 2 format in research.html!")
