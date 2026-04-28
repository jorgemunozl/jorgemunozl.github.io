import React from 'react';

type ProjectHeroMediaProps = {
  variant: 'card' | 'detail';
  src: string;
  poster?: string;
  label: string;
};

const ProjectHeroMedia = ({ variant, src, poster, label }: ProjectHeroMediaProps) => {
  const isCard = variant === 'card';

  const containerClassName =
    variant === 'card'
      ? 'relative h-44 overflow-hidden'
      : 'overflow-hidden rounded-3xl border border-slate-600 bg-white/60 shadow-2xl shadow-emerald-500/10 backdrop-blur-sm dark:border-white/15 dark:bg-white/10 dark:shadow-purple-500/10';

  const videoClassName =
    variant === 'card'
      ? 'pointer-events-none h-full w-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105'
      : 'h-72 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02] md:h-96';

  return (
    <div className={containerClassName}>
      <video
        className={videoClassName}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        playsInline
        loop
        autoPlay
        controls={!isCard}
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>

      {isCard && <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />}
    </div>
  );
};

export default ProjectHeroMedia;
