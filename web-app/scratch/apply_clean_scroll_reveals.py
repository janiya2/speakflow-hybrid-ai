with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Add import
if 'import ScrollReveal from "./ScrollReveal";' not in c:
    c = c.replace(
        'import Link from "next/link";',
        'import Link from "next/link";\nimport ScrollReveal from "./ScrollReveal";'
    )

# 2. Section 3.5: search-the-world
s_stw_old = '<div className="w-full space-y-8 sm:space-y-12">'
s_stw_new = '<ScrollReveal className="w-full space-y-8 sm:space-y-12" distance={32}>'

# Find the search-the-world section block
pos_stw = c.find('id="search-the-world"')
pos_stw_div = c.find(s_stw_old, pos_stw)
pos_stw_sec_end = c.find('</section>', pos_stw)
# Find the last </div> before </section>
pos_stw_last_div = c.rfind('</div>', pos_stw, pos_stw_sec_end)

if pos_stw != -1 and pos_stw_div != -1 and pos_stw_last_div != -1:
    c = c[:pos_stw_div] + s_stw_new + c[pos_stw_div + len(s_stw_old):pos_stw_last_div] + '</ScrollReveal>' + c[pos_stw_last_div + 6:]
    print("Section 3.5 (search-the-world) wrapped successfully!")

# 3. Section 4: Panoramic Scenarios
pos_sc = c.find('{/* 4. Panoramic Scenarios Section')
s_sc_old = '<div className="w-full px-2 sm:px-4 lg:px-8 space-y-4 sm:space-y-6">'
s_sc_new = '<ScrollReveal className="w-full px-2 sm:px-4 lg:px-8 space-y-4 sm:space-y-6" distance={32}>'
pos_sc_div = c.find(s_sc_old, pos_sc)
pos_sc_sec_end = c.find('</section>', pos_sc)
pos_sc_last_div = c.rfind('</div>', pos_sc, pos_sc_sec_end)

if pos_sc != -1 and pos_sc_div != -1 and pos_sc_last_div != -1:
    c = c[:pos_sc_div] + s_sc_new + c[pos_sc_div + len(s_sc_old):pos_sc_last_div] + '</ScrollReveal>' + c[pos_sc_last_div + 6:]
    print("Section 4 (Panoramic Scenarios) wrapped successfully!")

# 4. Section 5: exchange
pos_ex = c.find('id="exchange"')
s_ex_old = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">'
s_ex_new = '<ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14" distance={32}>'
pos_ex_div = c.find(s_ex_old, pos_ex)
pos_ex_sec_end = c.find('</section>', pos_ex)
pos_ex_last_div = c.rfind('</div>', pos_ex, pos_ex_sec_end)

if pos_ex != -1 and pos_ex_div != -1 and pos_ex_last_div != -1:
    c = c[:pos_ex_div] + s_ex_new + c[pos_ex_div + len(s_ex_old):pos_ex_last_div] + '</ScrollReveal>' + c[pos_ex_last_div + 6:]
    print("Section 5 (exchange) wrapped successfully!")

# 5. Section 6: practice-modes
pos_pm = c.find('id="practice-modes"')
s_pm_old = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
s_pm_new = '<ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>'
pos_pm_div = c.find(s_pm_old, pos_pm)
pos_pm_sec_end = c.find('</section>', pos_pm)
pos_pm_last_div = c.rfind('</div>', pos_pm, pos_pm_sec_end)

if pos_pm != -1 and pos_pm_div != -1 and pos_pm_last_div != -1:
    c = c[:pos_pm_div] + s_pm_new + c[pos_pm_div + len(s_pm_old):pos_pm_last_div] + '</ScrollReveal>' + c[pos_pm_last_div + 6:]
    print("Section 6 (practice-modes) wrapped successfully!")

# 6. Section 7: moments
pos_mo = c.find('id="moments"')
s_mo_old = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
s_mo_new = '<ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>'
pos_mo_div = c.find(s_mo_old, pos_mo)
pos_mo_sec_end = c.find('</section>', pos_mo)
pos_mo_last_div = c.rfind('</div>', pos_mo, pos_mo_sec_end)

if pos_mo != -1 and pos_mo_div != -1 and pos_mo_last_div != -1:
    c = c[:pos_mo_div] + s_mo_new + c[pos_mo_div + len(s_mo_old):pos_mo_last_div] + '</ScrollReveal>' + c[pos_mo_last_div + 6:]
    print("Section 7 (moments) wrapped successfully!")

# 7. Section 8: voicerooms
pos_vr = c.find('id="voicerooms"')
s_vr_old = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
s_vr_new = '<ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>'
pos_vr_div = c.find(s_vr_old, pos_vr)
pos_vr_sec_end = c.find('</section>', pos_vr)
pos_vr_last_div = c.rfind('</div>', pos_vr, pos_vr_sec_end)

if pos_vr != -1 and pos_vr_div != -1 and pos_vr_last_div != -1:
    c = c[:pos_vr_div] + s_vr_new + c[pos_vr_div + len(s_vr_old):pos_vr_last_div] + '</ScrollReveal>' + c[pos_vr_last_div + 6:]
    print("Section 8 (voicerooms) wrapped successfully!")

# 8. Section 11: reviews
pos_rev = c.find('id="reviews"')
s_rev_old = '<div className="w-full space-y-10 sm:space-y-12">'
s_rev_new = '<ScrollReveal className="w-full space-y-10 sm:space-y-12" distance={32}>'
pos_rev_div = c.find(s_rev_old, pos_rev)
# Notice modal is inside reviews section, let's find the closing tag of this div
# The closing tag of this div is right before `{/* Selected Review Full Story Modal */}`
pos_modal = c.find('{/* Selected Review Full Story Modal */}', pos_rev)
pos_rev_last_div = c.rfind('</div>', pos_rev, pos_modal)

if pos_rev != -1 and pos_rev_div != -1 and pos_rev_last_div != -1:
    c = c[:pos_rev_div] + s_rev_new + c[pos_rev_div + len(s_rev_old):pos_rev_last_div] + '</ScrollReveal>' + c[pos_rev_last_div + 6:]
    print("Section 11 (reviews) wrapped successfully!")

with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Saved cleanly!")
