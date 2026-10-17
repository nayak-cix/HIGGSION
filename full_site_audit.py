import sys
import glob
import subprocess

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("[INIT] Installing required read-only test dependencies (playwright)...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
    from playwright.sync_api import sync_playwright

DEVICE_VIEWPORTS = {
    "Mobile Compact (iPhone SE)": {"width": 375, "height": 667},
    "Mobile Standard (iPhone / Pixel)": {"width": 393, "height": 852},
    "Mobile Large (Plus / Max)": {"width": 430, "height": 932},
    "Tablet Portrait (iPad Mini/Air)": {"width": 768, "height": 1024},
    "Tablet Landscape (iPad Pro)": {"width": 1024, "height": 768},
    "Small Laptop / Netbook": {"width": 1280, "height": 800},
    "Standard Desktop / Laptop": {"width": 1440, "height": 900},
    "Large Display (FHD Monitor)": {"width": 1920, "height": 1080}
}

BASE_URL = "http://0.0.0.0:8000"

# Automatically discover all HTML pages in the project root
all_html_files = sorted(glob.glob("*.html"))
if not all_html_files:
    all_html_files = ["index.html", "research.html", "product.html"]

def run_full_audit():
    print("=" * 86)
    print("HIGGSION BRAINWAVE — FULL WEBSITE RESPONSIVE AUDIT (ALL PAGES & VIEWPORTS)")
    print("=" * 86)
    print(f"Discovered Pages for Audit: {', '.join(all_html_files)}\n")

    summary_stats = {"pass": 0, "fail": 0, "total": 0}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for page_name in all_html_files:
            target_url = f"{BASE_URL}/{page_name}"
            print(f"\nAUDITING PAGE: {page_name.upper()}  [{target_url}]")
            print("-" * 86)

            for device_label, size in DEVICE_VIEWPORTS.items():
                context = browser.new_context(viewport=size)
                page = context.new_page()
                summary_stats["total"] += 1

                try:
                    res = page.goto(target_url, wait_until="networkidle", timeout=8000)
                    if not res or res.status >= 400:
                        print(f"  [ERR ] {size['width']}px | {device_label:<32} -> HTTP {res.status if res else 'NO_RESPONSE'}")
                        summary_stats["fail"] += 1
                        context.close()
                        continue
                except Exception as ex:
                    print(f"  [ERR ] {size['width']}px | {device_label:<32} -> Connection issue ({ex})")
                    summary_stats["fail"] += 1
                    context.close()
                    continue

                # DOM measurement for width & overflow violations
                data = page.evaluate("""() => {
                    const docWidth = document.documentElement.scrollWidth;
                    const winWidth = window.innerWidth;
                    const isOverflowing = docWidth > winWidth;
                    
                    let leakedElements = [];
                    document.querySelectorAll('*').forEach(node => {
                        const box = node.getBoundingClientRect();
                        if (box.right > winWidth + 1) {
                            const tag = node.tagName.toLowerCase();
                            const idStr = node.id ? '#' + node.id : '';
                            const classStr = node.className && typeof node.className === 'string'
                                ? '.' + node.className.trim().split(/\\s+/).slice(0, 2).join('.')
                                : '';
                            leakedElements.push({
                                tag: `${tag}${idStr}${classStr}`,
                                right: Math.round(box.right),
                                width: Math.round(box.width)
                            });
                        }
                    });

                    return {
                        viewportWidth: winWidth,
                        scrollWidth: docWidth,
                        leakDelta: docWidth - winWidth,
                        hasOverflow: isOverflowing,
                        leakCount: leakedElements.length,
                        sampleLeaks: leakedElements.slice(0, 2)
                    };
                }""")

                if not data["hasOverflow"]:
                    print(f"  [PASS] {size['width']}px | {device_label:<32} | Overflow: 0px")
                    summary_stats["pass"] += 1
                else:
                    print(f"  [FAIL] {size['width']}px | {device_label:<32} | Leaked: +{data['leakDelta']}px ({data['leakCount']} nodes)")
                    for leak in data["sampleLeaks"]:
                        print(f"         └── Offending Node: <{leak['tag']}> boundary at {leak['right']}px (width: {leak['width']}px)")
                    summary_stats["fail"] += 1

                context.close()

        browser.close()

    print("\n" + "=" * 86)
    print(f"AUDIT SUMMARY: {summary_stats['pass']} Passed | {summary_stats['fail']} Failed | Total Tests: {summary_stats['total']}")
    print("STATUS: Read-only inspection completed. Zero files modified.")
    print("=" * 86)

if __name__ == "__main__":
    run_full_audit()
