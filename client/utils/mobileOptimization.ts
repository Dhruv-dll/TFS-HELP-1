// Mobile optimization utility to disable animations and improve scroll performance

let cachedIsMobile: boolean | null = null;

export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  // Use cached result if available
  if (cachedIsMobile !== null) return cachedIsMobile;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;

  const isSmallScreen = window.innerWidth < 768;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  cachedIsMobile = isTouchDevice || isSmallScreen || isMobileUA;
  return cachedIsMobile;
};

export const applyMobileOptimizations = () => {
  if (typeof window === "undefined") return;

  const mobile = isMobileDevice();

  if (mobile) {
    // Add mobile-specific classes
    document.body.classList.add("mobile-static");
    document.body.classList.add("mobile-no-entrance-animations");

    // Optimize images on mobile
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
    });

    // Disable complex animations
    const style = document.createElement("style");
    style.id = "mobile-optimizations";
    style.textContent = `
      @media (max-width: 768px) {
        * {
          animation-duration: 0.1s !important;
          animation-delay: 0s !important;
          transition-duration: 0.15s !important;
        }

        [data-framer-motion] {
          transform: none !important;
          opacity: 1 !important;
        }

        .motion-reduce,
        .animate-float,
        .animate-pulse,
        .animate-bounce,
        .animate-spin {
          animation: none !important;
          transform: none !important;
        }

        /* Disable will-change on mobile for better performance */
        .will-change-transform {
          will-change: auto !important;
        }

        /* Reduce backface-visibility cost */
        * {
          backface-visibility: visible !important;
        }
      }
    `;

    // Remove existing style if it exists
    const existing = document.getElementById("mobile-optimizations");
    if (existing) existing.remove();

    document.head.appendChild(style);
  } else {
    // Remove mobile classes on desktop
    document.body.classList.remove("mobile-static");
    document.body.classList.remove("mobile-no-entrance-animations");

    // Remove mobile optimization styles
    const existing = document.getElementById("mobile-optimizations");
    if (existing) existing.remove();
  }
};

export const optimizeMobileAnimations = () => {
  if (typeof window === "undefined") return () => {};

  const handleResize = () => {
    // Reset cache on resize
    cachedIsMobile = null;
    applyMobileOptimizations();
  };

  // Apply optimizations immediately
  applyMobileOptimizations();

  // Debounce resize events for better performance
  let resizeTimeout: NodeJS.Timeout;
  const debouncedHandleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  };

  // Listen for resize events
  window.addEventListener("resize", debouncedHandleResize);

  // Enable passive scroll listener for better performance
  const handleScroll = () => {
    // Scroll optimizations can be added here if needed
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Cleanup
  return () => {
    window.removeEventListener("resize", debouncedHandleResize);
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(resizeTimeout);
  };
};
