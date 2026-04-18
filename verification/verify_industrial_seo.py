from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Go to the new landing page
        url = "file://" + os.path.abspath("industrial-seo-waluj-midc.html")
        print(f"Navigating to {url}")
        page.goto(url)

        # Take a screenshot
        page.screenshot(path="verification/industrial_seo_desktop.png")
        print("Desktop screenshot saved.")

        # Mobile view
        page.set_viewport_size({"width": 390, "height": 844})
        page.screenshot(path="verification/industrial_seo_mobile.png")
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
