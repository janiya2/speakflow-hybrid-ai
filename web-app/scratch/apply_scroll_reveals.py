import re

with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add import
if 'import ScrollReveal from "./ScrollReveal";' not in content:
    content = content.replace(
        'import Link from "next/link";',
        'import Link from "next/link";\nimport ScrollReveal from "./ScrollReveal";'
    )

# 2. Section: search-the-world
search_header_target = '''          {/* Section Header */}
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">'''
search_header_replace = '''          {/* Section Header */}
          <ScrollReveal delay={0}>
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">'''

search_header_end = '''              Search for language partners and native AI tutors by native language, city, and real-world fluency goals.
            </p>
          </div>'''
search_header_end_replace = '''              Search for language partners and native AI tutors by native language, city, and real-world fluency goals.
            </p>
          </div>
          </ScrollReveal>'''

if search_header_target in content:
    content = content.replace(search_header_target, search_header_replace, 1)
    content = content.replace(search_header_end, search_header_end_replace, 1)

# Wrap search-the-world marquee rows
search_marquee_target = '''          {/* Bidirectional Scrolling Coaches Rows */}
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''
search_marquee_replace = '''          {/* Bidirectional Scrolling Coaches Rows */}
          <ScrollReveal delay={180} distance={40}>
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''

# Find the end of this div (before Section 4)
search_marquee_end = '''            {/* ROW 2: Scrolling Right (animate-marquee-reverse) */}'''
# We can wrap the whole bidirectional scroller

# 3. Section: Panoramic Scenarios
scenario_header_target = '''        <div className="w-full px-2 sm:px-4 lg:px-8 space-y-4 sm:space-y-6">
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">'''
scenario_header_replace = '''        <div className="w-full px-2 sm:px-4 lg:px-8 space-y-4 sm:space-y-6">
          <ScrollReveal delay={0}>
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">'''

scenario_header_end = '''              {config?.scenariosSubtitle || "Practice English in scenarios that matter — job interviews, travel, daily life, dining, and more."}
            </p>
          </div>'''
scenario_header_end_replace = '''              {config?.scenariosSubtitle || "Practice English in scenarios that matter — job interviews, travel, daily life, dining, and more."}
            </p>
          </div>
          </ScrollReveal>'''

if scenario_header_target in content:
    content = content.replace(scenario_header_target, scenario_header_replace, 1)
    content = content.replace(scenario_header_end, scenario_header_end_replace, 1)

# Wrap scenario strip & interactive console
scenario_strip_target = '''          {/* Full-Width 4K Panoramic "Cave Style" Curved Strip */}
          <div className="relative w-full max-w-[1920px] mx-auto mt-4 sm:mt-6 px-0 sm:px-2 md:px-4">'''
scenario_strip_replace = '''          {/* Full-Width 4K Panoramic "Cave Style" Curved Strip */}
          <ScrollReveal delay={150} distance={30}>
          <div className="relative w-full max-w-[1920px] mx-auto mt-4 sm:mt-6 px-0 sm:px-2 md:px-4">'''

scenario_strip_end = '''              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.005]"
              priority
            />
          </div>'''
scenario_strip_end_replace = '''              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.005]"
              priority
            />
          </div>
          </ScrollReveal>'''

if scenario_strip_target in content:
    content = content.replace(scenario_strip_target, scenario_strip_replace, 1)
    content = content.replace(scenario_strip_end, scenario_strip_end_replace, 1)

scenario_dock_target = '''          {/* Interactive Roleplay Console Dock (Dynamic Island Style - Perfectly Fitted, No Scrollbars!) */}
          <div className="relative z-20 -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24 max-w-5xl mx-auto px-3 sm:px-6">'''
scenario_dock_replace = '''          {/* Interactive Roleplay Console Dock (Dynamic Island Style - Perfectly Fitted, No Scrollbars!) */}
          <ScrollReveal delay={250} distance={30}>
          <div className="relative z-20 -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24 max-w-5xl mx-auto px-3 sm:px-6">'''

# Let's save and test so far
with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Batch 1 applied successfully!")
