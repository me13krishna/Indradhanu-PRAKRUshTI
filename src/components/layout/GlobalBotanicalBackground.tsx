import React from 'react';

interface GlobalBotanicalBackgroundProps {
  variant?: 'app' | 'landing';
}

export const GlobalBotanicalBackground: React.FC<GlobalBotanicalBackgroundProps> = ({
  variant = 'app',
}) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {variant === 'app' ? (
        <>
          {/* Light Theme: Serene Sage & Ethereal Leaf Wash */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 dark:opacity-0 transition-opacity duration-700"
            style={{
              backgroundImage: "url('/site-botanical-bg.jpg')",
              backgroundAttachment: 'fixed',
            }}
          />

          {/* Dark Theme: Subtle Luminous Veins with Screen Blend */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-12 mix-blend-screen transition-opacity duration-700 filter brightness-90 contrast-125"
            style={{
              backgroundImage: "url('/site-botanical-bg.jpg')",
              backgroundAttachment: 'fixed',
            }}
          />
        </>
      ) : (
        /* Landing Page: Ethereal Nocturnal Canopy */
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-screen transition-opacity duration-700 filter brightness-90 contrast-125"
          style={{
            backgroundImage: "url('/site-botanical-bg.jpg')",
            backgroundAttachment: 'fixed',
          }}
        />
      )}
    </div>
  );
};

