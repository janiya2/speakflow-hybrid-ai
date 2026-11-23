with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

target = '''        {/* World Map Dotted Matrix Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
          <div className="relative w-full max-w-[1500px] h-[550px] opacity-35 dark:opacity-20 transition-opacity">
            <Image
              src="/images/landing/world_map_dotted.webp"
              alt="Global Language Network World Map"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        {/* Edge Gradient Fade Masks */}
        <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-10 ${
          isLight ? "bg-gradient-to-r from-white to-transparent" : "bg-gradient-to-r from-[#070A14] to-transparent"
        }`} />
        <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-10 ${
          isLight ? "bg-gradient-to-l from-white to-transparent" : "bg-gradient-to-l from-[#070A14] to-transparent"
        }`} />

        <ScrollReveal className="w-full space-y-8 sm:space-y-12" distance={32}>'''

replacement = '''        {/* World Map Dotted Matrix Background (Vibrant, Crisp & Clearly Visible) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div className="relative w-full max-w-[1850px] h-full min-h-[580px] opacity-100 dark:opacity-40 transition-opacity">
            <Image
              src="/images/landing/world_map_dotted.webp"
              alt="Global Language Network World Map"
              fill
              className="object-contain object-center scale-105 sm:scale-110 drop-shadow-[0_4px_16px_rgba(99,102,241,0.12)] dark:drop-shadow-none"
              priority
            />
          </div>
        </div>

        {/* Edge Gradient Fade Masks */}
        <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${
          isLight ? "bg-gradient-to-r from-white via-white/80 to-transparent" : "bg-gradient-to-r from-[#070A14] via-[#070A14]/80 to-transparent"
        }`} />
        <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${
          isLight ? "bg-gradient-to-l from-white via-white/80 to-transparent" : "bg-gradient-to-l from-[#070A14] via-[#070A14]/80 to-transparent"
        }`} />

        <ScrollReveal className="relative z-10 w-full space-y-8 sm:space-y-12" distance={32}>'''

if target in c:
    c = c.replace(target, replacement, 1)
    with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
        f.write(c)
    print("SUCCESS: Updated World Map visibility and stacking context!")
else:
    print("ERROR: Target not found!")
