// Simple utility to track performance metrics
// Track route transition time
export const trackRouteTransition = (from: string, to: string, duration: number): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Route transition from ${from} to ${to} took ${duration}ms`);
  }
  // In a real app, you might send this to your analytics service
  // analyticsService.trackMetric('routeTransition', duration, { from, to })
};
// Track component render time
export const trackRenderTime = (componentName: string, duration: number): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${componentName} render took ${duration}ms`);
  }
};
// Performance observer to track long tasks
export const setupLongTaskObserver = (): (() => void) => {
  if (typeof PerformanceObserver !== 'undefined') {
    const observer = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
        }
      });
    });
    observer.observe({
      entryTypes: ['longtask']
    });
    return () => observer.disconnect();
  }
  return () => {};
};