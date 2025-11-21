import React, { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock,
  Users,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { useConclaveSessionsData } from "../hooks/useConclaveSessionsData";
import { isMobileDevice } from "../utils/mobileOptimization";

// Lazy image component for speaker photos
const LazyImage = React.memo(
  ({ src, alt, className }: { src: string; alt: string; className: string }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (error) return null;

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0.5,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    );
  }
);

LazyImage.displayName = "LazyImage";

export default function OptimizedFlagshipConclaveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { sessions, loading } = useConclaveSessionsData();
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const isMobile = useMemo(() => isMobileDevice(), []);

  // Auto-expand first session on load
  React.useEffect(() => {
    if (sessions.length > 0 && !expandedSession) {
      setExpandedSession(sessions[0].id);
    }
  }, [sessions, expandedSession]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (containerRef.current) {
      inViewRef(containerRef.current);
    }
  }, [inViewRef]);

  if (loading || sessions.length === 0) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-finance-navy to-finance-navy-light overflow-hidden">
        <div className="container mx-auto text-center py-20">
          <p className="text-foreground/60">Loading sessions...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-finance-navy to-finance-navy-light overflow-hidden"
    >
      {/* Animated background elements - disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-finance-teal/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-finance-mint/5 rounded-full blur-3xl animate-float" />
        </div>
      )}

      <div className="container mx-auto relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            FLAGSHIP <span className="text-finance-teal">CONCLAVE</span>
          </h2>
          {!isMobile && (
            <div className="w-32 h-1 bg-gradient-to-r from-finance-teal to-finance-mint mx-auto mb-6" />
          )}
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto px-2">
            Exclusive sessions featuring industry experts, thought leaders, and
            innovators shaping the future of finance
          </p>
        </motion.div>

        {/* Sessions Grid - Optimized for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.2 : 0.4,
                delay: isMobile ? 0 : Math.min(index * 0.1, 0.2),
              }}
              className="group"
            >
              <motion.div
                className="relative h-full bg-gradient-to-br from-finance-navy/80 to-finance-navy-light/50 backdrop-blur-xl border border-finance-teal/30 rounded-xl sm:rounded-2xl overflow-hidden hover:border-finance-teal/60 transition-all duration-300"
                whileHover={!isMobile ? { y: -5, boxShadow: "0 20px 40px rgba(32, 178, 170, 0.2)" } : {}}
              >
                {/* Session Header */}
                <div className="p-4 sm:p-6 border-b border-finance-teal/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-finance-teal mb-2 line-clamp-2">
                        {session.name}
                      </h3>
                      {session.description && (
                        <p className="text-foreground/70 text-xs sm:text-sm mb-3 line-clamp-2">
                          {session.description}
                        </p>
                      )}

                      {/* Session Timing */}
                      {(session.startTime || session.endTime) && (
                        <div className="flex items-center gap-2 text-finance-mint text-xs sm:text-sm">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>
                            {session.startTime || "—"}{" "}
                            {session.endTime && `to ${session.endTime}`}
                          </span>
                        </div>
                      )}

                      {/* Speaker Count */}
                      <div className="flex items-center gap-2 text-finance-electric text-xs sm:text-sm mt-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>
                          {session.speakers.length} Speaker
                          {session.speakers.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speakers List - Always visible */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isMobile || expandedSession === session.id ? "auto" : 0,
                    opacity: isMobile || expandedSession === session.id ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                    opacity: { duration: 0.15 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                    {session.speakers.length > 0 ? (
                      session.speakers.map((speaker) => (
                        <motion.div
                          key={speaker.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="bg-finance-navy/50 rounded-lg p-3 sm:p-4 border border-finance-teal/20 hover:border-finance-teal/40 transition-colors"
                        >
                          <div className="flex gap-3 sm:gap-4">
                            {speaker.photo && (
                              <LazyImage
                                src={speaker.photo}
                                alt={speaker.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-finance-teal mb-1 text-sm sm:text-base line-clamp-2">
                                {speaker.name}
                              </div>
                              {speaker.bio && (
                                <p className="text-xs text-foreground/70 mb-2 line-clamp-2">
                                  {speaker.bio}
                                </p>
                              )}
                              {(speaker.startTime || speaker.endTime) && (
                                <div className="flex items-center gap-2 text-finance-mint text-xs mb-2">
                                  <Clock className="w-3 h-3 flex-shrink-0" />
                                  <span>
                                    {speaker.startTime || "—"}{" "}
                                    {speaker.endTime &&
                                      `to ${speaker.endTime}`}
                                  </span>
                                </div>
                              )}
                              {speaker.linkedinId && (
                                <a
                                  href={
                                    speaker.linkedinId.startsWith("http")
                                      ? speaker.linkedinId
                                      : `https://linkedin.com/in/${speaker.linkedinId}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-finance-electric text-xs hover:text-finance-teal transition-colors"
                                >
                                  LinkedIn
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-foreground/60 text-sm">
                        No speakers added yet for this session
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Toggle button for desktop only */}
                {!isMobile && session.speakers.length > 0 && (
                  <motion.button
                    onClick={() =>
                      setExpandedSession(
                        expandedSession === session.id ? null : session.id
                      )
                    }
                    className="w-full px-4 sm:px-6 py-3 border-t border-finance-teal/20 flex items-center justify-center gap-2 text-finance-teal hover:bg-finance-teal/10 transition-colors text-sm sm:text-base"
                  >
                    {expandedSession === session.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Speakers
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        View Speakers ({session.speakers.length})
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats - Optimized for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
        >
          <div className="bg-gradient-to-br from-finance-teal/10 to-finance-mint/10 rounded-lg p-4 sm:p-6 border border-finance-teal/30 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-finance-teal mb-2">
              {sessions.length}
            </div>
            <div className="text-xs sm:text-base text-foreground/70">
              Total Sessions
            </div>
          </div>
          <div className="bg-gradient-to-br from-finance-mint/10 to-finance-teal/10 rounded-lg p-4 sm:p-6 border border-finance-mint/30 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-finance-mint mb-2">
              {sessions.reduce((acc, s) => acc + s.speakers.length, 0)}
            </div>
            <div className="text-xs sm:text-base text-foreground/70">
              Expert Speakers
            </div>
          </div>
          <div className="bg-gradient-to-br from-finance-electric/10 to-finance-teal/10 rounded-lg p-4 sm:p-6 border border-finance-electric/30 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-finance-electric mb-2">
              {
                new Set(
                  sessions.flatMap((s) =>
                    s.speakers.map((sp) => sp.id)
                  )
                ).size
              }
            </div>
            <div className="text-xs sm:text-base text-foreground/70">
              Unique Experts
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
