/**
 * Public media for American Dream (East Rutherford, NJ).
 * Images: Wikimedia Commons (CC BY-SA) via Special:FilePath.
 * Video: Vimeo / YouTube embeds for sales-deck storytelling.
 */

export function wikiImage(filename, width = 1920) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

export const MEDIA = {
  // Property & campus
  hero_mall_night: wikiImage('AmericanDreamExterior.jpg', 1920),
  logo: wikiImage('American Dream Meadowlands logo.jpg', 800),
  drone_aerial: wikiImage('American Dream Mall, Drone Aerial at NJ-3 (May 2026).jpg', 1920),
  meadowlands_aerial: wikiImage('Meadowlands Sports Complex aerial 1 2018.jpg', 1920),
  reach_aerial: wikiImage('American Dream Mall, Drone Aerial at NJ-3 (May 2026).jpg', 1600),

  // Interior retail
  atrium: wikiImage('American_Dream_Meadowlands_shopping_mall_from_first_floor.jpeg', 1600),
  mall_interior_1: wikiImage('American Dream Meadowlands Mall 001.jpg', 1600),
  mall_interior_2: wikiImage('American Dream Meadowlands Mall 004.jpg', 1600),
  mall_interior_3: wikiImage('American Dream Meadowlands Mall 010.jpg', 1600),
  mall_interior_4: wikiImage('American Dream Meadowlands Mall 011.jpg', 1600),
  retail_corridor: wikiImage('American Dream Meadowlands Mall 005.jpg', 1600),
  flagship_storefront: wikiImage('American Dream Meadowlands Mall 012.jpg', 1600),
  popup_kiosk: wikiImage("IT'SUGAR store in American Dream.jpg", 1400),

  // Dining & lifestyle
  dining: wikiImage('Oreo Cafe American Dream Mall (52713257780).jpg', 1600),
  dining_hall: wikiImage('American Dream Meadowlands Mall 008.jpg', 1600),
  food_experience: wikiImage('Mr. Beast Burger - American Dream Mall East Rutherford New Jersey (52713319333).jpg', 1600),

  // Luxury wing
  luxury_avenue: wikiImage('American Dream Meadowlands Mall 009.jpg', 1600),
  saks_anchor_entrance: wikiImage('American Dream Meadowlands Mall 013.jpg', 1600),

  // Attractions
  nick_universe: wikiImage('Nickelodeon_Universe_amusement_park_at_American_Dream_Meadowlands_shopping_mall_from_entrance.jpeg', 1600),
  nick_entrance: wikiImage('Nickelodeon_Universe_amusement_park_at_American_Dream_Meadowlands_shopping_mall_from_entrance.jpeg', 1600),
  nick_ride: wikiImage('Nickelodeon_Universe_Sandy_Cheeks.jpg', 1600),
  big_snow: wikiImage('Indoor_ski_slope_at_American_Dream_in_Meadowlands.jpg', 1600),
  big_snow_exterior: wikiImage('Big_Snow_American_Dream_exterior.jpg', 1600),
  ski_exterior: wikiImage('Indoor_ski_slope_at_American_Dream_in_Meadowlands.jpg', 1400),
  waterpark: '/waterpark.png',
  waterpark_2: '/waterpark.png',
  waterpark_3: '/waterpark.png',
  obs_wheel: 'https://i.ytimg.com/vi/HBFy_9YP3xk/maxresdefault.jpg',
  family_fun: wikiImage('Ninja Kidz (American Dream Mall).jpg', 1600),

  // Events & venues
  events_rink: wikiImage('The Rink in the American Dream Meadowlands during ice hockey practicing.jpg', 1600),
  launch_event: wikiImage('Pumpkin Carver at American Dream Mall (48973800343).jpg', 1600),
  sponsorship_display: wikiImage('American Dream Meadowlands Mall 002.jpg', 1800),
  transit_station: wikiImage('American Dream Meadowlands Mall 006.jpg', 1400),
  parking_gateway: wikiImage('American Dream Parking (50412675688).jpg', 1600),
};

/** Cinematic background reels only (YouTube autoplay — active public video loops) */
export const VIDEOS = {
  /** Opening — full-bleed hero */
  heroReel: { type: 'youtube', id: 'sSFrYMbPfwM' },
  /** Story beat — destination scale */
  storyReel: { type: 'youtube', id: 'ystFxXMRmkQ' },
  /** Entertainment universe */
  entertainmentReel: { type: 'youtube', id: 'B7pDaSlP3zA' },
  /** Events & energy */
  eventsReel: { type: 'youtube', id: '3S-R2HO8JDs' },
};

/** Verified / documented Avenue & anchor brands (public reporting, 2021–2025) */
export const LUXURY_TENANTS = [
  'Saks Fifth Avenue',
  'Hermès',
  'Saint Laurent',
  'Dolce & Gabbana',
  'Tiffany & Co.',
  'Moncler',
  'Mulberry',
  'Gentle Monster',
];

/** Digideck-style chapter cards (non-linear entry points) */
export const CHAPTERS = [
  {
    id: 'hero',
    label: 'Opening',
    title: 'American Dream',
    subtitle: 'Cinematic intro · scale & ambition',
    slideIndex: 0,
    image: MEDIA.drone_aerial,
    video: VIDEOS.heroReel,
  },
  {
    id: 'scale',
    label: 'Why Here',
    title: 'Scale & Reach',
    subtitle: 'NYC catchment · transit · demographics',
    slideIndex: 2,
    image: MEDIA.meadowlands_aerial,
  },
  {
    id: 'retail',
    label: 'Retail',
    title: 'Leasing & Brands',
    subtitle: 'Flagship · pop-up · anchor roster',
    slideIndex: 5,
    image: MEDIA.retail_corridor,
  },
  {
    id: 'dining',
    label: 'Dining',
    title: 'Culinary Destination',
    subtitle: 'Chef concepts · food hall · lifestyle',
    slideIndex: 8,
    image: MEDIA.dining,
  },
  {
    id: 'luxury',
    label: 'Luxury',
    title: 'The Avenue',
    subtitle: 'Saks anchor · designer corridor',
    slideIndex: 9,
    image: MEDIA.luxury_avenue,
  },
  {
    id: 'entertainment',
    label: 'Attractions',
    title: 'Entertainment Universe',
    subtitle: 'Nickelodeon · Big SNOW · Water Park',
    slideIndex: 11,
    image: MEDIA.nick_universe,
    video: VIDEOS.entertainmentReel,
  },
  {
    id: 'events',
    label: 'Events',
    title: 'Global Platform',
    subtitle: 'Activations · sponsorship · case studies',
    slideIndex: 14,
    image: MEDIA.events_rink,
  },
  {
    id: 'suite',
    label: 'Interactive',
    title: 'B2B Suite',
    subtitle: 'Leasing · sponsorship · venue RFP tools',
    slideIndex: 17,
    image: MEDIA.mall_interior_3,
  },
  {
    id: 'venues',
    label: 'Venues',
    title: 'Book the Property',
    subtitle: 'Rink · water park · theme park specs',
    slideIndex: 18,
    image: MEDIA.events_rink,
  },
  {
    id: 'contact',
    label: 'Connect',
    title: 'Start the Conversation',
    subtitle: 'Leasing & partnership inquiry',
    slideIndex: 19,
    image: MEDIA.hero_mall_night,
  },
];

export const GALLERIES = {
  destination: [
    { src: MEDIA.drone_aerial, caption: 'American Dream — Meadowlands campus aerial' },
    { src: MEDIA.hero_mall_night, caption: 'Route 3 gateway · exterior' },
    { src: MEDIA.atrium, caption: 'Grand atrium & retail boulevard' },
    { src: MEDIA.meadowlands_aerial, caption: 'MetLife Stadium & sports complex adjacency' },
    { src: MEDIA.obs_wheel, caption: 'Dream Wheel — 300 ft observation' },
    { src: MEDIA.parking_gateway, caption: 'Visitor arrival & parking infrastructure' },
  ],
  attractions: [
    { src: MEDIA.nick_universe, caption: 'Nickelodeon Universe — 13-acre indoor park' },
    { src: MEDIA.nick_entrance, caption: 'Theme park entrance · year-round operations' },
    { src: MEDIA.nick_ride, caption: 'Family rides & character experiences' },
    { src: MEDIA.big_snow, caption: 'Big SNOW — year-round indoor skiing' },
    { src: MEDIA.big_snow_exterior, caption: 'Big SNOW exterior · ski slope campus' },
    { src: MEDIA.waterpark, caption: 'DreamWorks Water Park' },
    { src: MEDIA.waterpark_2, caption: 'Indoor water park — tropical climate' },
    { src: MEDIA.events_rink, caption: 'The Rink — NHL regulation ice' },
    { src: MEDIA.family_fun, caption: 'Family entertainment & activations' },
  ],
  retailLuxury: [
    { src: MEDIA.retail_corridor, caption: 'Premium retail corridors' },
    { src: MEDIA.mall_interior_2, caption: 'Climate-controlled shopping environment' },
    { src: MEDIA.flagship_storefront, caption: 'High-traffic retail nodes' },
    { src: MEDIA.luxury_avenue, caption: 'The Avenue — luxury wing' },
    { src: MEDIA.saks_anchor_entrance, caption: 'Saks Fifth Avenue anchor' },
    { src: MEDIA.dining, caption: 'Signature dining — Oreo Café & concepts' },
    { src: MEDIA.dining_hall, caption: 'Food hall & lifestyle destinations' },
  ],
  events: [
    { src: MEDIA.events_rink, caption: 'The Rink — concerts, sports & galas' },
    { src: MEDIA.launch_event, caption: 'Seasonal activations & fan events' },
    { src: MEDIA.nick_entrance, caption: 'Full-park buyouts & brand takeovers' },
    { src: MEDIA.waterpark_3, caption: 'After-hours water park buyouts' },
    { src: MEDIA.sponsorship_display, caption: 'Atrium · display & sponsorship surfaces' },
    { src: MEDIA.mall_interior_4, caption: 'Convention-ready interior volumes' },
  ],
  dining: [
    { src: MEDIA.dining, caption: 'Oreo Café — iconic experiential F&B' },
    { src: MEDIA.food_experience, caption: 'Chef-driven & celebrity concepts' },
    { src: MEDIA.dining_hall, caption: 'Multi-concept dining destinations' },
    { src: MEDIA.mall_interior_1, caption: 'Lifestyle dining within the mall' },
  ],
};
