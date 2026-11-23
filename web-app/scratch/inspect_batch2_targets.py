with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's inspect each section's header and columns
def check(pattern, label):
    found = pattern in content
    print(f"[{label}] Found: {found}")
    return found

# 1. Section 5 (Exchange)
s5_text = '''            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">'''
s5_img = '''            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <div className="lg:col-span-6 flex justify-center">'''
check(s5_text, "s5_text")
check(s5_img, "s5_img")

# 2. Section 6 (Practice Modes)
s6_img = '''            {/* Left Column: Image (Phone Mockup with Floating Modes - Floating 3D) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">'''
s6_text = '''            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">'''
check(s6_img, "s6_img")
check(s6_text, "s6_text")

# 3. Section 7 (Moments)
s7_text = '''            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">'''
s7_img = '''            {/* Right Column: Image (Floating 3D Feed Mockup) */}
            <div className="lg:col-span-6 flex justify-center">'''
check(s7_img, "s7_img")

# 4. Section 8 (Voicerooms)
s8_img = '''            {/* Left Column: Image (Voicerooms Phone Mockup Floating 3D) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">'''
s8_text = '''            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">'''
check(s8_img, "s8_img")
check(s8_text, "s8_text")

# 5. Section 11 (Reviews)
s11_head = '''          {/* Section Header */}
          <div className="space-y-4 max-w-4xl mx-auto text-center px-4">'''
s11_pills = '''          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-4xl mx-auto">'''
s11_streams = '''          {/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS (Smooth, readable, low speed) */}
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''
check(s11_head, "s11_head")
check(s11_pills, "s11_pills")
check(s11_streams, "s11_streams")
