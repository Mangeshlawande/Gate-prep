export const triggerConfetti = async () => {
  if (typeof window === 'undefined') return;
  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default;
    
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#6366f1', '#f59e0b', '#ec4899']
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
};
