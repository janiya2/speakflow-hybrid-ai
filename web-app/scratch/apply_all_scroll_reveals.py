import re

with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Section 5: exchange
# Header
s5_h_old = '''          {/* Top Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">'''
s5_h_new = '''          {/* Top Banner Header */}
          <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto space-y-3">'''
s5_h_end_old = '''            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Learn a language, explore new cultures, and master authentic fluency through 24/7 AI conversation.
            </p>
          </div>'''
s5_h_end_new = '''            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Learn a language, explore new cultures, and master authentic fluency through 24/7 AI conversation.
            </p>
          </div>
          </ScrollReveal>'''
c = c.replace(s5_h_old, s5_h_new, 1)
c = c.replace(s5_h_end_old, s5_h_end_new, 1)

# Left col
s5_left_old = '''            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">'''
s5_left_new = '''            {/* Left Column: Content */}
            <ScrollReveal className="lg:col-span-6 space-y-6" delay={100} distance={30}>
            <div className="space-y-6">'''
c = c.replace(s5_left_old, s5_left_new, 1)

s5_left_end_old = '''                  <span>Try Language Exchange</span>
                  <span>→</span>
                </button>
              </div>
            </div>'''
s5_left_end_new = '''                  <span>Try Language Exchange</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s5_left_end_old, s5_left_end_new, 1)

# Right col
s5_right_old = '''            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <div className="lg:col-span-6 flex justify-center">'''
s5_right_new = '''            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <ScrollReveal className="lg:col-span-6 flex justify-center" delay={200} distance={35}>
            <div className="w-full flex justify-center">'''
c = c.replace(s5_right_old, s5_right_new, 1)

s5_right_end_old = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(56,189,248,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>'''
s5_right_end_new = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(56,189,248,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s5_right_end_old, s5_right_end_new, 1)

# 2. Section 6: practice-modes
s6_left_old = '''            {/* Left Column: Image (Phone Mockup with Floating Modes - Floating 3D) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">'''
s6_left_new = '''            {/* Left Column: Image (Phone Mockup with Floating Modes - Floating 3D) */}
            <ScrollReveal className="lg:col-span-6 flex justify-center order-2 lg:order-1" delay={100} distance={35}>
            <div className="w-full flex justify-center">'''
c = c.replace(s6_left_old, s6_left_new, 1)

s6_left_end_old = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>'''
s6_left_end_new = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s6_left_end_old, s6_left_end_new, 1)

s6_right_old = '''            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">'''
s6_right_new = '''            {/* Right Column: Content */}
            <ScrollReveal className="lg:col-span-6 space-y-6 order-1 lg:order-2" delay={200} distance={30}>
            <div className="space-y-6">'''
c = c.replace(s6_right_old, s6_right_new, 1)

s6_right_end_old = '''                  <span>Start Multi-Modal Practice</span>
                  <span>→</span>
                </button>
              </div>
            </div>'''
s6_right_end_new = '''                  <span>Start Multi-Modal Practice</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s6_right_end_old, s6_right_end_new, 1)

# 3. Section 7: moments
s7_left_old = '''            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">'''
# Note: s7_left is the 2nd occurrence of this string in file
# We will use replace with count or regex
parts = c.split(s7_left_old)
if len(parts) >= 3:
    # parts[0] is before s5, parts[1] is between s5 and s7, parts[2] is after s7
    c = parts[0] + s7_left_old + parts[1] + '''            {/* Left Column: Content */}
            <ScrollReveal className="lg:col-span-6 space-y-6" delay={100} distance={30}>
            <div className="space-y-6">''' + parts[2]

s7_left_end_old = '''                  <span>Explore Community Moments</span>
                  <span>→</span>
                </button>
              </div>
            </div>'''
s7_left_end_new = '''                  <span>Explore Community Moments</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s7_left_end_old, s7_left_end_new, 1)

s7_right_old = '''            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <div className="lg:col-span-6 flex justify-center">'''
parts_r = c.split(s7_right_old)
if len(parts_r) >= 3:
    c = parts_r[0] + s7_right_old + parts_r[1] + '''            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <ScrollReveal className="lg:col-span-6 flex justify-center" delay={200} distance={35}>
            <div className="w-full flex justify-center">''' + parts_r[2]

s7_right_end_old = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(16,185,129,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>'''
s7_right_end_new = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(16,185,129,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s7_right_end_old, s7_right_end_new, 1)

# 4. Section 8: voicerooms
s8_left_old = '''            {/* Left Column: Image (Voicerooms Stage - Floating 3D Phone) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">'''
s8_left_new = '''            {/* Left Column: Image (Voicerooms Stage - Floating 3D Phone) */}
            <ScrollReveal className="lg:col-span-6 flex justify-center order-2 lg:order-1" delay={100} distance={35}>
            <div className="w-full flex justify-center">'''
c = c.replace(s8_left_old, s8_left_new, 1)

s8_left_end_old = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>'''
s8_left_end_new = '''                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s8_left_end_old, s8_left_end_new, 1)

s8_right_old = '''            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">'''
# Notice s8 is the 2nd occurrence of this
parts_s8r = c.split(s8_right_old)
if len(parts_s8r) >= 3:
    c = parts_s8r[0] + s8_right_old + parts_s8r[1] + '''            {/* Right Column: Content */}
            <ScrollReveal className="lg:col-span-6 space-y-6 order-1 lg:order-2" delay={200} distance={30}>
            <div className="space-y-6">''' + parts_s8r[2]

s8_right_end_old = '''                  <span>Join Live Voicerooms</span>
                  <span>→</span>
                </button>
              </div>
            </div>'''
s8_right_end_new = '''                  <span>Join Live Voicerooms</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            </ScrollReveal>'''
c = c.replace(s8_right_end_old, s8_right_end_new, 1)

# 5. Section 11: reviews
s11_h_old = '''          {/* Section Header */}
          <div className="space-y-4 max-w-4xl mx-auto text-center px-4">'''
s11_h_new = '''          {/* Section Header */}
          <ScrollReveal delay={0}>
          <div className="space-y-4 max-w-4xl mx-auto text-center px-4">'''
c = c.replace(s11_h_old, s11_h_new, 1)

s11_h_end_old = '''                    fluency score
                  </div>
                </div>

                <svg viewBox="0 0 36 78" fill="currentColor" className="w-8 sm:w-10 h-16 sm:h-20 text-blue-500 shrink-0 -scale-x-100" aria-hidden="true">
                  <path d="M 10 4 C 26 22 28 48 8 72" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="11" cy="7" rx="3.5" ry="7.5" transform="rotate(-35 11 7)" />
                  <ellipse cx="17" cy="9" rx="3.5" ry="7.5" transform="rotate(20 17 9)" />
                  <ellipse cx="17" cy="18" rx="3.5" ry="7.5" transform="rotate(-20 17 18)" />
                  <ellipse cx="24" cy="21" rx="3.5" ry="7.5" transform="rotate(35 24 21)" />
                  <ellipse cx="21" cy="30" rx="3.5" ry="7.5" transform="rotate(-5 21 30)" />
                  <ellipse cx="28" cy="33" rx="3.5" ry="7.5" transform="rotate(45 28 33)" />
                  <ellipse cx="21" cy="42" rx="3.5" ry="7.5" transform="rotate(10 21 42)" />
                  <ellipse cx="27" cy="46" rx="3.5" ry="7.5" transform="rotate(60 27 46)" />
                  <ellipse cx="17" cy="54" rx="3.5" ry="7.5" transform="rotate(25 17 54)" />
                  <ellipse cx="22" cy="59" rx="3.5" ry="7.5" transform="rotate(75 22 59)" />
                  <ellipse cx="10" cy="64" rx="3.5" ry="7.5" transform="rotate(40 10 64)" />
                  <ellipse cx="14" cy="69" rx="3.5" ry="7.5" transform="rotate(85 14 69)" />
                </svg>
              </div>
            </div>
          </div>'''

s11_h_end_new = s11_h_end_old + "\n          </ScrollReveal>"
c = c.replace(s11_h_end_old, s11_h_end_new, 1)

# Reviews pills
s11_pills_old = '''          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-4xl mx-auto">'''
s11_pills_new = '''          {/* Interactive Category Filter Pills */}
          <ScrollReveal delay={120}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-4xl mx-auto">'''
c = c.replace(s11_pills_old, s11_pills_new, 1)

s11_pills_end_old = '''            ))}
          </div>'''
# Need to match the one right before the marquee streams
# We can find `/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS`
split_streams = c.split('{/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS')
if len(split_streams) >= 2:
    left = split_streams[0]
    # replace the last `</div>` before the comment
    idx_div = left.rfind('</div>')
    if idx_div != -1:
        left = left[:idx_div] + '</div>\n          </ScrollReveal>' + left[idx_div+6:]
    c = left + '{/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS' + split_streams[1]

# Reviews marquee streams
s11_streams_old = '''          {/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS (Smooth, readable, low speed) */}
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''
s11_streams_new = '''          {/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS (Smooth, readable, low speed) */}
          <ScrollReveal delay={200} distance={40}>
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''
c = c.replace(s11_streams_old, s11_streams_new, 1)

# Find bottom live counter
s11_counter_old = '''          {/* Bottom Live Community Counter Bar */}
          <div className="pt-2 max-w-xl mx-auto px-4">'''
split_counter = c.split('{/* Bottom Live Community Counter Bar */}')
if len(split_counter) >= 2:
    left_c = split_counter[0]
    idx_div = left_c.rfind('</div>')
    if idx_div != -1:
        left_c = left_c[:idx_div] + '</div>\n          </ScrollReveal>' + left_c[idx_div+6:]
    c = left_c + '{/* Bottom Live Community Counter Bar */}' + split_counter[1]

s11_counter_new = '''          {/* Bottom Live Community Counter Bar */}
          <ScrollReveal delay={280}>
          <div className="pt-2 max-w-xl mx-auto px-4">'''
c = c.replace(s11_counter_old, s11_counter_new, 1)

# Close counter ScrollReveal right before closing section reviews
s11_counter_end_old = '''                <strong className="text-emerald-500">1,420+ learners</strong> speaking right now across Tokyo, Paris, Colombo & New York
              </span>
            </div>
          </div>
        </div>'''
s11_counter_end_new = '''                <strong className="text-emerald-500">1,420+ learners</strong> speaking right now across Tokyo, Paris, Colombo & New York
              </span>
            </div>
          </div>
          </ScrollReveal>
        </div>'''
c = c.replace(s11_counter_end_old, s11_counter_end_new, 1)

with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("SUCCESS: All sections wrapped with ScrollReveal!")
