with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Section 5: exchange
# Replace top header:
s5_head = '''          {/* Top Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">'''
s5_head_rep = '''          {/* Top Banner Header */}
          <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto space-y-3">'''
s5_head_end = '''            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Learn a language, explore new cultures, and master authentic fluency through 24/7 AI conversation.
            </p>
          </div>'''
s5_head_end_rep = '''            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Learn a language, explore new cultures, and master authentic fluency through 24/7 AI conversation.
            </p>
          </div>
          </ScrollReveal>'''

if s5_head in content:
    content = content.replace(s5_head, s5_head_rep, 1)
    content = content.replace(s5_head_end, s5_head_end_rep, 1)

# Wrap Left column of exchange
s5_col1 = '''            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">'''
s5_col1_rep = '''            {/* Left Column: Content */}
            <ScrollReveal className="lg:col-span-6 space-y-6" delay={120} direction="up" distance={30}>
            <div className="space-y-6">'''

s5_col2 = '''            {/* Right Column: Dynamic Realistic Mockup */}
            <div className="lg:col-span-6 flex justify-center">'''
s5_col2_rep = '''            {/* Right Column: Dynamic Realistic Mockup */}
            <ScrollReveal className="lg:col-span-6 flex justify-center" delay={220} direction="up" distance={35}>
            <div className="w-full flex justify-center">'''

# Let's check if s5_col1 and s5_col2 exist
print("s5_col1 exists:", s5_col1 in content)
print("s5_col2 exists:", s5_col2 in content)
