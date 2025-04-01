
/**
 * Smoothly scrolls to a specific element by ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top in pixels (default: 0)
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Smoothly scrolls to the top of the page
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Sets up an intersection observer to trigger an action when an element becomes visible
 * @param elementId - The ID of the element to observe
 * @param callback - Function to call when the element becomes visible
 * @param threshold - Visibility threshold (0-1, default: 0.1)
 * @returns A cleanup function to disconnect the observer
 */
export const observeElement = (
  elementId: string, 
  callback: () => void,
  threshold: number = 0.1
): (() => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        callback();
        observer.disconnect();
      }
    },
    { threshold }
  );
  
  const element = document.getElementById(elementId);
  if (element) {
    observer.observe(element);
  }
  
  return () => observer.disconnect();
};
