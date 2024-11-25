export const dashboardVariants = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  header: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  statsCard: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },

  progressBar: {
    initial: { width: 0 },
    animate: (value: number) => ({
      width: `${value}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  },

  table: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },

  tableRow: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 },
  },

  skeleton: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  },
};
