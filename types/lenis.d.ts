export {};

declare global {
  interface Window {
    __sydrekLenis?: {
      stop: () => void;
      start: () => void;
      scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
    };
  }
}
