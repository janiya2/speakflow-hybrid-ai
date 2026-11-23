with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

target = '''      {/* 3.5. Search the World - Dotted World Map & Bidirectional Coaches Scroller */}
      <section id="search-the-world" className={`py-16 sm:py-24 relative overflow-hidden text-center ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        {/* World Map Dotted Matrix Background (Vibrant, Crisp & Clearly Visible) */}
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

        <ScrollReveal className="relative z-10 w-full space-y-8 sm:space-y-12" distance={32}>
          {/* Section Header */}
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${
              isLight
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-blue-950/40 border-blue-800/40 text-blue-300"
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Global Speaking Network
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Search</span> the World
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              Search for language partners and native AI tutors by native language, city, and real-world fluency goals.
            </p>
          </div>

          {/* Bidirectional Scrolling Coaches Rows */}
          <div className="space-y-4 sm:space-y-6 overflow-hidden">'''

replacement = '''      {/* 3.5. Search the World - Dotted World Map & Bidirectional Coaches Scroller */}
      <section id="search-the-world" className={`pt-10 sm:pt-14 pb-16 sm:pb-24 relative overflow-hidden text-center min-h-[640px] sm:min-h-[720px] flex flex-col justify-between ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        {/* World Map Dotted Matrix Background (Vibrant, Crisp & Full Span) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div className="relative w-full max-w-[1920px] h-full min-h-[640px] sm:min-h-[720px] opacity-100 dark:opacity-40 transition-opacity">
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

        <ScrollReveal className="relative z-10 w-full" distance={32}>
          {/* Section Header (Shifted higher up) */}
          <div className="space-y-2 max-w-4xl mx-auto text-center px-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${
              isLight
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-blue-950/40 border-blue-800/40 text-blue-300"
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Global Speaking Network
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Search</span> the World
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              Search for language partners and native AI tutors by native language, city, and real-world fluency goals.
            </p>
          </div>

          {/* Bidirectional Scrolling Coaches Rows (Shifted lower down so center of map is wide open) */}
          <div className="mt-20 sm:mt-28 lg:mt-36 space-y-4 sm:space-y-6 overflow-hidden">'''

if target in c:
    c = c.replace(target, replacement, 1)
    with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
        f.write(c)
    print("SUCCESS: Adjusted Search the World vertical spacing!")
else:
    print("ERROR: target not found!")
