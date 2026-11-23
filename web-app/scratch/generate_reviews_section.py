import json

# Read reviews data
with open("scratch/reviews_50.json", encoding="utf-8") as f:
    reviews = json.load(f)

# Format the reviews as TypeScript code
reviews_ts = json.dumps(reviews, indent=2, ensure_ascii=False)

# Create the full Reviews section TSX component code
reviews_section_code = f'''
      {/* 11. Loved by Learners Around the World - Testimonials & Social Proof (50 Global Reviews) */}
      <section id="reviews" className={{`py-16 sm:py-24 relative overflow-hidden text-center ${{
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }}`}}>
        {/* Edge Gradient Fade Masks */}
        <div className={{`pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${{
          isLight ? "bg-gradient-to-r from-white via-white/80 to-transparent" : "bg-gradient-to-r from-[#070A14] via-[#070A14]/80 to-transparent"
        }}`}} />
        <div className={{`pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${{
          isLight ? "bg-gradient-to-l from-white via-white/80 to-transparent" : "bg-gradient-to-l from-[#070A14] via-[#070A14]/80 to-transparent"
        }}`}} />

        <div className="w-full space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-4xl mx-auto text-center px-4">
            <div className={{`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${{
              isLight
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-blue-950/40 border-blue-800/40 text-blue-300"
            }}`}}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Wall of Love • 140+ Countries
            </div>

            <h2 className={{`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${{
              isLight ? "text-[#0F172A]" : "text-white"
            }}`}}>
              Loved by learners <span className={{isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}}>around the world</span>
            </h2>

            <p className={{`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium ${{
              isLight ? "text-slate-600" : "text-slate-300"
            }}`}}>
              Over 100,000 real people practice daily with SpeakFlow AI to conquer speaking anxiety, ace overseas interviews, and master authentic fluency.
            </p>

            {/* Social Proof Badges with Laurel Wreaths (Reference Image Style) */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {/* Laurel Wreath 1: Ratings */}
              <div className="flex items-center gap-2 sm:gap-3 group">
                {/* Left Branch */}
                <svg viewBox="0 0 36 78" fill="currentColor" className="w-8 sm:w-10 h-16 sm:h-20 text-blue-500 shrink-0" aria-hidden="true">
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

                <div className="text-center px-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-amber-400 text-2xl sm:text-3xl">★</span>
                    <span className={{`text-3xl sm:text-4xl font-black tracking-tight ${{
                      isLight ? "text-slate-900" : "text-white"
                    }}`}}>
                      4.9
                    </span>
                  </div>
                  <div className={{`text-xs sm:text-sm font-semibold mt-0.5 ${{
                    isLight ? "text-slate-500" : "text-slate-400"
                  }}`}}>
                    2k+ ratings
                  </div>
                </div>

                {/* Right Branch (flipped) */}
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

              {/* Laurel Wreath 2: Active Learners */}
              <div className="flex items-center gap-2 sm:gap-3 group">
                {/* Left Branch */}
                <svg viewBox="0 0 36 78" fill="currentColor" className="w-8 sm:w-10 h-16 sm:h-20 text-blue-500 shrink-0" aria-hidden="true">
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

                <div className="text-center px-1">
                  <div className={{`text-3xl sm:text-4xl font-black tracking-tight ${{
                    isLight ? "text-slate-900" : "text-white"
                  }}`}}>
                    100K
                  </div>
                  <div className={{`text-xs sm:text-sm font-semibold mt-0.5 ${{
                    isLight ? "text-slate-500" : "text-slate-400"
                  }}`}}>
                    learners
                  </div>
                </div>

                {/* Right Branch (flipped) */}
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

              {/* Laurel Wreath 3: Fluency Goal Rate (Optional on larger displays) */}
              <div className="hidden md:flex items-center gap-2 sm:gap-3 group">
                <svg viewBox="0 0 36 78" fill="currentColor" className="w-8 sm:w-10 h-16 sm:h-20 text-blue-500 shrink-0" aria-hidden="true">
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

                <div className="text-center px-1">
                  <div className={{`text-3xl sm:text-4xl font-black tracking-tight ${{
                    isLight ? "text-slate-900" : "text-white"
                  }}`}}>
                    98.7%
                  </div>
                  <div className={{`text-xs sm:text-sm font-semibold mt-0.5 ${{
                    isLight ? "text-slate-500" : "text-slate-400"
                  }}`}}>
                    fluency score
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
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-4xl mx-auto">
            {[
              {{ label: "All 50 Reviews", value: "All" }},
              {{ label: "English 🇺🇸", value: "English" }},
              {{ label: "Spanish 🇪🇸", value: "Spanish" }},
              {{ label: "Japanese 🇯🇵", value: "Japanese" }},
              {{ label: "French 🇫🇷", value: "French" }},
              {{ label: "German 🇩🇪", value: "German" }},
              {{ label: "Korean 🇰🇷", value: "Korean" }},
              {{ label: "Italian 🇮🇹", value: "Italian" }},
              {{ label: "Mandarin 🇨🇳", value: "Mandarin" }},
            ].map((cat) => (
              <button
                key={{cat.value}}
                onClick={{() => setSelectedReviewFilter(cat.value)}}
                className={{`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${{
                  selectedReviewFilter === cat.value
                    ? isLight
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                    : isLight
                    ? "bg-white/80 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white"
                    : "bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/20 hover:bg-slate-900"
                }}`}}
              >
                {{cat.label}}
              </button>
            ))}
          </div>

          {/* 50 REVIEWS DUAL BIDIRECTIONAL MARQUEE STREAMS (Smooth, readable, low speed) */}
          <div className="space-y-4 sm:space-y-6 overflow-hidden">
            {/* STREAM 1: Gliding Left (animate-marquee-slow) */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee-slow flex items-center gap-4 sm:gap-6 py-2">
                {{[...ALL_REVIEWS_50.slice(0, 25), ...ALL_REVIEWS_50.slice(0, 25)].map((item, idx) => {{
                  const isMatching = selectedReviewFilter === "All" || item.category === selectedReviewFilter;
                  return (
                    <div
                      key={{`s1-${{item.id}}-${{idx}}`}}
                      onClick={{() => setActiveReviewModal(item)}}
                      className={{`group relative w-[310px] sm:w-[350px] p-4 sm:p-5 rounded-2xl border transition-all duration-300 shrink-0 text-left cursor-pointer hover:-translate-y-1 ${{
                        isMatching
                          ? isLight
                            ? "bg-white/95 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400"
                            : "bg-slate-900/90 border-white/10 shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/50"
                          : isLight
                          ? "bg-white/40 border-slate-100 opacity-40 hover:opacity-100"
                          : "bg-slate-900/40 border-white/5 opacity-40 hover:opacity-100"
                      }}`}}
                    >
                      {/* Top Bar: Avatar, User Details, Learned Badge, Quote Symbol */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0">
                            <Image src={{item.avatar}} alt={{item.name}} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className={{`text-sm font-bold truncate ${{isLight ? "text-slate-900" : "text-white"}}`}}>
                              {{item.name}}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span>Learned</span>
                                <span className="w-3.5 h-2.5 relative overflow-hidden rounded-xs shrink-0 inline-block align-middle">
                                  <Image src={{item.targetFlag}} alt={{item.learned}} fill className="object-cover" />
                                </span>
                                <span className={{`font-bold ${{isLight ? "text-slate-800" : "text-slate-200"}}`}}>
                                  {{item.learned}}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className={{`text-2xl font-serif select-none transition-colors ${{
                          isLight ? "text-slate-300 group-hover:text-blue-500" : "text-slate-700 group-hover:text-blue-400"
                        }}`}}>
                          &rdquo;
                        </span>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {{[...Array(5)].map((_, i) => (
                          <span key={{i}} className="text-amber-400 text-xs">★</span>
                        ))}}
                        <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                      </div>

                      {/* Review Title */}
                      <h4 className={{`text-sm font-bold tracking-tight mb-1.5 truncate ${{
                        isLight ? "text-slate-900" : "text-white"
                      }}`}}>
                        {{item.title}}
                      </h4>

                      {/* Review Quote Text */}
                      <p className={{`text-xs leading-relaxed line-clamp-3 font-normal ${{
                        isLight ? "text-slate-600" : "text-slate-300"
                      }}`}}>
                        {{item.content}}
                      </p>

                      {/* Footer Stamp */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified Learner
                        </span>
                        <span className={{`font-medium ${{isLight ? "text-slate-400" : "text-slate-400"}}`}}>
                          {{item.role}}
                        </span>
                      </div>
                    </div>
                  );
                }})}}
              </div>
            </div>

            {/* STREAM 2: Gliding Right (animate-marquee-reverse-slow) */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee-reverse-slow flex items-center gap-4 sm:gap-6 py-2">
                {{[...ALL_REVIEWS_50.slice(25, 50), ...ALL_REVIEWS_50.slice(25, 50)].map((item, idx) => {{
                  const isMatching = selectedReviewFilter === "All" || item.category === selectedReviewFilter;
                  return (
                    <div
                      key={{`s2-${{item.id}}-${{idx}}`}}
                      onClick={{() => setActiveReviewModal(item)}}
                      className={{`group relative w-[310px] sm:w-[350px] p-4 sm:p-5 rounded-2xl border transition-all duration-300 shrink-0 text-left cursor-pointer hover:-translate-y-1 ${{
                        isMatching
                          ? isLight
                            ? "bg-white/95 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400"
                            : "bg-slate-900/90 border-white/10 shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/50"
                          : isLight
                          ? "bg-white/40 border-slate-100 opacity-40 hover:opacity-100"
                          : "bg-slate-900/40 border-white/5 opacity-40 hover:opacity-100"
                      }}`}}
                    >
                      {/* Top Bar: Avatar, User Details, Learned Badge, Quote Symbol */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0">
                            <Image src={{item.avatar}} alt={{item.name}} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className={{`text-sm font-bold truncate ${{isLight ? "text-slate-900" : "text-white"}}`}}>
                              {{item.name}}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span>Learned</span>
                                <span className="w-3.5 h-2.5 relative overflow-hidden rounded-xs shrink-0 inline-block align-middle">
                                  <Image src={{item.targetFlag}} alt={{item.learned}} fill className="object-cover" />
                                </span>
                                <span className={{`font-bold ${{isLight ? "text-slate-800" : "text-slate-200"}}`}}>
                                  {{item.learned}}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className={{`text-2xl font-serif select-none transition-colors ${{
                          isLight ? "text-slate-300 group-hover:text-blue-500" : "text-slate-700 group-hover:text-blue-400"
                        }}`}}>
                          &rdquo;
                        </span>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {{[...Array(5)].map((_, i) => (
                          <span key={{i}} className="text-amber-400 text-xs">★</span>
                        ))}}
                        <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                      </div>

                      {/* Review Title */}
                      <h4 className={{`text-sm font-bold tracking-tight mb-1.5 truncate ${{
                        isLight ? "text-slate-900" : "text-white"
                      }}`}}>
                        {{item.title}}
                      </h4>

                      {/* Review Quote Text */}
                      <p className={{`text-xs leading-relaxed line-clamp-3 font-normal ${{
                        isLight ? "text-slate-600" : "text-slate-300"
                      }}`}}>
                        {{item.content}}
                      </p>

                      {/* Footer Stamp */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified Learner
                        </span>
                        <span className={{`font-medium ${{isLight ? "text-slate-400" : "text-slate-400"}}`}}>
                          {{item.role}}
                        </span>
                      </div>
                    </div>
                  );
                }})}}
              </div>
            </div>
          </div>

          {/* Bottom Live Community Counter Bar */}
          <div className="pt-2 max-w-xl mx-auto px-4">
            <div className={{`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold ${{
              isLight
                ? "bg-slate-100/90 border-slate-200 text-slate-700"
                : "bg-slate-900/80 border-slate-800 text-slate-300"
            }}`}}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                <strong className="text-emerald-500">1,420+ learners</strong> speaking right now across Tokyo, Paris, Colombo & New York
              </span>
            </div>
          </div>
        </div>

        {/* Selected Review Full Story Modal */}
        {{activeReviewModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={{() => setActiveReviewModal(null)}}
          >
            <div
              className={{`relative w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl text-left transition-all ${{
                isLight ? "bg-white border-slate-200 text-slate-900" : "bg-[#0B1120] border-slate-800 text-white"
              }}`}}
              onClick={{(e) => e.stopPropagation()}}
            >
              <button
                onClick={{() => setActiveReviewModal(null)}}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-md shrink-0">
                  <Image src={{activeReviewModal.avatar}} alt={{activeReviewModal.name}} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{{activeReviewModal.name}}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>{{activeReviewModal.role}}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                      Learned {{activeReviewModal.learned}}
                      <span className="w-3.5 h-2.5 relative inline-block overflow-hidden rounded-xs ml-0.5">
                        <Image src={{activeReviewModal.targetFlag}} alt={{activeReviewModal.learned}} fill className="object-cover" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {{[...Array(5)].map((_, i) => (
                  <span key={{i}} className="text-base">★</span>
                ))}}
                <span className="text-xs font-bold text-slate-400 ml-1">5.0 Verified Review</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold tracking-tight mb-2">
                "{activeReviewModal.title}"
              </h4>

              <p className={{`text-sm leading-relaxed mb-6 ${{
                isLight ? "text-slate-600" : "text-slate-300"
              }}`}}>
                {activeReviewModal.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Verified Active Learner
                </span>
                <button
                  onClick={{() => {{
                    setActiveReviewModal(null);
                    onStartCall();
                  }}}}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Start Speaking Now →
                </button>
              </div>
            </div>
          </div>
        )}}
      </section>
'''

print("Code generated. Ready to inject into LandingPage.tsx")
