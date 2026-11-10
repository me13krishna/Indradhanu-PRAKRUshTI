import React from 'react';

interface GlobalBotanicalBackgroundProps {
  variant?: 'app' | 'landing';
}

export const GlobalBotanicalBackground: React.FC<GlobalBotanicalBackgroundProps> = ({
  variant = 'app',
}) => {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob a" />
      <div className="aurora-blob b" />
      <div className="aurora-blob c" />
      <div
        className={`absolute inset-0 bg-cover bg-center mix-blend-screen ${
          variant === 'app' ? 'opacity-[0.07] dark:opacity-[0.09]' : 'opacity-10'
        }`}
        style={{ backgroundImage: "url('/site-botanical-bg.jpg')", backgroundAttachment: 'fixed' }}
      />
      {variant === 'app' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/70 dark:to-charcoal/80" />
      )}
    </div>
  );
};
