
export const smoothScroll = (targetId: string, offset = 0) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Helper to animate elements when they are in view
export const observeElementsInView = (selector: string, classToAdd: string) => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    // If IntersectionObserver is not supported, immediately show all elements
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(classToAdd);
    });
    return () => {};
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classToAdd);
        // Once the animation is triggered, we can stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px 0px' // Increase this to trigger animations earlier
  });

  const elements = document.querySelectorAll(selector);
  elements.forEach(el => observer.observe(el));
  
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
};

// Utility to add fade-in animations based on scroll position
export const handleScrollAnimations = () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  animateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
    
    if (isVisible) {
      element.classList.add('animate-in');
    }
  });
};

// Preload animation elements so they're already loaded when scrolling
export const preloadAnimatedElements = () => {
  // Add a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      // Check if element is already in the viewport on page load
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isInViewport) {
        el.classList.add('animate-in');
      }
    });
  }, 100);
};
