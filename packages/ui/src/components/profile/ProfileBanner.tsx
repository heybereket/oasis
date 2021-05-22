import React from 'react';

type ProfileBannerProps = {
  bannerUrl: string | null | undefined;
};

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ bannerUrl }) => {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #0C111B 100%), url(${
          bannerUrl ?? '/static/default-banner.png'
        }) no-repeat center`,
        backgroundSize: 'cover',
      }}
      className="flex-grow h-52 md:h-60"
    />
  );
};
