
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classToAdd);
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll(selector);
  elements.forEach(el => observer.observe(el));
  
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
};
