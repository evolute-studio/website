export const BREAKPOINTS = { 
  desktop: 640, 
  wideDesktop: 1180 
} as const;

export const QUEST_WIDTH = { 
  collapsed: 200, 
  expanded: 360 
} as const;

export const LINKS = {
  discord: 'https://discord.gg/s7XXRGRwVw',
  x: 'https://x.com/evolute_studio',
  appStore: 'https://apps.apple.com/us/app/mage-duel/id6745639584',
  playStore: 'https://play.google.com/store/apps/details?id=com.evolute.mageduel',
  youtubeMageDuel: 'https://www.youtube.com/embed/_bH6qiK6EoI?si=facgX54p8KLvnLaM&autoplay=1',
  youtubeMiner: 'https://www.youtube.com/embed/dv8L6B0xv_g?si=Xnog1qS-eKsAy3tR&autoplay=1',
} as const;

export type Platform = 'ios' | 'android' | 'other';
export type XPKey = 'mage' | 'discord' | 'x' | 'video' | 'minerVideo';
export type EarnedXP = Record<XPKey, boolean>;
