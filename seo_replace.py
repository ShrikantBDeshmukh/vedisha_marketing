import os

def replace_in_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Replaced successfully in {filepath}")
    else:
        print(f"Target string not found in {filepath}")

services_file = r"d:\vedisha marketing projects\vedisha_marketing\services.html"

# Replace meta tags
old_meta = """  <title>Digital Marketing Services in Chhatrapati Sambhajinagar | Vedisha</title>
  <meta name="description" content="Explore comprehensive digital marketing services in Chhatrapati Sambhajinagar by Vedisha Marketing. We offer SEO, Paid Ads, Content, and Brand Strategy."s services in Chhatrapati Sambhajinagar (formerly Aurangabad): brand strategy, performance marketing, SEO, and PR—powered by AI, refined by humans.">"""

new_meta = """  <title>Best Digital Marketing Services in Chhatrapati Sambhajinagar | SEO & Ads</title>
  <meta name="description" content="Discover the best digital marketing services in Chhatrapati Sambhajinagar. Vedisha Marketing offers top-tier SEO, Google Ads, and Brand Strategy for the Marathwada region.">"""

replace_in_file(services_file, old_meta, new_meta)

# Replace Hero H1
old_hero = """    <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Direct Answers for <span class="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">Growth.</span></h1>
    <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We provide diagnostic-led marketing services in Chhatrapati Sambhajinagar (formerly Aurangabad). No generic advice—only prescriptions that work.</p>"""

new_hero = """    <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Best Digital Marketing Services in <span class="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">CSN.</span></h1>
    <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We provide diagnostic-led marketing services across Chhatrapati Sambhajinagar and the entire Marathwada region. No generic advice—only proven local growth strategies.</p>"""

replace_in_file(services_file, old_hero, new_hero)

# Replace Narrative
old_narrative = """    <div class="mb-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Growth in Marathwada</h2>
      <p class="text-slate-600 max-w-2xl mx-auto font-medium">From Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we help local brands dominate search results.</p>
    </div>"""

new_narrative = """    <div class="mb-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">Driving Digital Growth in Marathwada</h2>
      <p class="text-slate-600 max-w-2xl mx-auto font-medium">From the Waluj Industrial Hub to the residential centers of Garkheda and CIDCO, we are the best digital marketing agency helping local brands dominate Google search results.</p>
    </div>"""

replace_in_file(services_file, old_narrative, new_narrative)
