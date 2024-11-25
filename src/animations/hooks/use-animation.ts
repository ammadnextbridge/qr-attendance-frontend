import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export function useAnimateOnMount() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  return controls;
}

export function useAnimateOnScroll(threshold = 0.2) {
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("animate");
          }
        });
      },
      { threshold }
    );

    return () => observer.disconnect();
  }, [controls, threshold]);

  return controls;
}
