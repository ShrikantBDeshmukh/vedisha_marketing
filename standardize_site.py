import os
import re

# Standardized Information
NEW_ADDRESS_SCHEMA = "1st Floor, Malkhare Classic, Shop No. 6, Near Jawahar Nagar Road, Garkheda Area"
NEW_LOCALITY = "Chhatrapati Sambhajinagar"
NEW_LAT = "19.865421"
NEW_LON = "75.337324"
NEW_IFRAME_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.41708892419!2d75.34430867522502!3d19.865354181507727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba37afb1b7c5b%3A0x4fc6c967c53e8117!2sVedisha%20Marketing!5e0!3m2!1sen!2sin!4v1714845598686!5m2!1sen!2sin"

# Growth Narrative Snippet
GROWTH_NARRATIVE = """
  <!-- The Marathwada Growth Narrative -->
  <section class="max-w-5xl mx-auto px-4 py-16 border-t border-slate-100">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>
      <p class="text-slate-600 max-w-2xl mx-auto">From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h4 class="font-bold text-slate-900 mb-2">Local Trust</h4>
        <p class="text-sm text-slate-500">Deep understanding of Aurangabad's consumer behavior and regional search intent.</p>
      </div>
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h4 class="font-bold text-slate-900 mb-2">Verified Presence</h4>
        <p class="text-sm text-slate-500">Verified GMB Profile with a direct review loop for maximum local authority.</p>
      </div>
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h4 class="font-bold text-slate-900 mb-2">MIDC Expertise</h4>
        <p class="text-sm text-slate-500">Specialized lead generation for industrial units in Waluj and Shendra.</p>
      </div>
    </div>
  </section>
"""

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Schema Address
    content = re.sub(r'"streetAddress":\s*"[^"]*"', f'"streetAddress": "{NEW_ADDRESS_SCHEMA}"', content)
    content = re.sub(r'"addressLocality":\s*"[^"]*"', f'"addressLocality": "{NEW_LOCALITY}"', content)
    
    # 2. Update Geo Coordinates
    content = re.sub(r'"latitude":\s*"[^"]*"', f'"latitude": "{NEW_LAT}"', content)
    content = re.sub(r'"longitude":\s*"[^"]*"', f'"longitude": "{NEW_LON}"', content)

    # 3. Update Map Iframes
    content = re.sub(r'src="https://maps\.google\.com/maps\?q=[^"]+"', f'src="{NEW_IFRAME_SRC}"', content)
    # Also catch other variations if any
    content = re.sub(r'src="https://www\.google\.com/maps/embed\?pb=[^"]+"', f'src="{NEW_IFRAME_SRC}"', content)

    # 4. Inject Growth Narrative if not present and if it's a main page (not privacy/terms)
    if "The Marathwada Growth Narrative" not in content and "index.html" not in filepath and "privacy" not in filepath and "terms" not in filepath:
        # Try to inject before main end or footer
        if "</main>" in content:
            content = content.replace("</main>", GROWTH_NARRATIVE + "\n</main>")
        elif "<!-- Global Footer -->" in content:
            content = content.replace("<!-- Global Footer -->", GROWTH_NARRATIVE + "\n<!-- Global Footer -->")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all HTML files in root
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        print(f"Updating {filename}...")
        update_html_file(filename)

print("Batch update complete.")
