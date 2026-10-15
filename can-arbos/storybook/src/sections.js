// The single list of the stories: which built page each group reads and which sections it shows. Sections that repeat
// on many pages (the closing band, the questions, the walk map) get one story, on the first page that has them.
// src/stories/*.stories.js are written from this list by scripts/write-stories.mjs.

export const viewports = [
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900 },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024 },
  { id: 'mobile', name: 'Mobile', width: 375, height: 812 },
];

// page key: the file in astro/dist
export const pages = {
  home: 'index.html',
  homeEs: 'es.html',
  rooms: 'explore-rooms.html',
  room: 'room-terrace-suite.html',
  experiences: 'explore-experiences.html',
  experience: 'experience-courtyards-walk.html',
  aljub: 'aljub.html',
  rooftop: 'rooftop-spa.html',
  celebrations: 'celebrations.html',
  journal: 'journal.html',
  guide: 'journal-things-to-do-palma-old-town.html',
  offer: 'offer-members-rate.html',
  members: 'members.html',
  legal: 'legal.html',
  notFound: '404.html',
};

// the story group of each page, as the sidebar shows it
export const titles = {
  home: 'Home', homeEs: 'Home (Spanish)', rooms: 'Rooms', room: 'Room', experiences: 'Experiences', experience: 'Experience',
  aljub: 'Aljub', rooftop: 'Rooftop and Spa', celebrations: 'Celebrations', journal: 'Journal', guide: 'Journal guide',
  offer: 'Offer', members: 'Members', legal: 'Legal', notFound: '404',
};

// show: the section is hidden on the page until a script or a sign in shows it (data-visible="false", a closed dialog)
export const sections = {
  home: [
    { id: 'nav', name: 'Menu', selector: 'body .nav_wrap', text: 'The fixed menu: logo, the pages, the language link and the booking button; a drawer below 992 px.' },
    { id: 'hero', name: 'Hero', selector: 'main > .hero_home_wrap', text: 'The courtyard photo across the screen with the title and the stay form (dates, guests, check availability).' },
    { id: 'house', name: 'The house', selector: 'main > .house_home_wrap', text: 'The 1600s house beside the arch photo.' },
    { id: 'rooms', name: 'Rooms carousel', selector: 'main > .rooms_home_wrap', text: 'The kinds of room in a carousel, each with its facts.' },
    { id: 'dining', name: 'Dining', selector: 'main > .dining_home_wrap', text: 'Aljub, the restaurant, on the night theme.' },
    { id: 'rooftop', name: 'Rooftop', selector: 'main > .roof_home_wrap', text: 'The rooftop pool and bar.' },
    { id: 'where', name: 'Where we are', selector: 'main > .where_home_wrap', text: 'The arrival note beside the paper map of the old town, with the walks to nine places.' },
    { id: 'experiences', name: 'Experiences', selector: 'main > .exp_home_wrap', text: 'The experiences the concierge arranges, as a list with photos.' },
    { id: 'celebrations', name: 'Celebrations band', selector: 'main > .fest_home_wrap', text: 'Weddings and private dinners over the courtyard dinner photo, on the brand green.' },
    { id: 'faq', name: 'Questions', selector: 'main > .faq_home_wrap', text: 'The questions before booking: the first one open, one open at a time.' },
    { id: 'close', name: 'Closing band', selector: 'main > .close_home_wrap', text: 'The last call to book, at the end of every page.' },
    { id: 'footer', name: 'Footer', selector: 'body .footer_wrap', text: 'Address, contact, the newsletter field and the legal links.' },
    { id: 'dialog', name: 'Booking dialog', selector: 'body #room-modal', show: true, text: 'The room request dialog the booking buttons open.' },
  ],
  homeEs: [
    { id: 'hero', name: 'Hero', selector: 'main > .hero_home_wrap', text: 'The Spanish Home: the same hero with the translated copy.' },
    { id: 'where', name: 'Where we are', selector: 'main > .where_home_wrap', text: 'The paper map with its labels in Spanish.' },
  ],
  rooms: [
    { id: 'hero', name: 'Hero', selector: 'main > .page_hero_wrap', text: 'The opening of an inner page: night theme, text on the left, the photo in an arch.' },
    { id: 'list', name: 'Room list', selector: 'main > .room_list_wrap', text: 'Every room with the filters.' },
    { id: 'every', name: 'In every room', selector: 'main > .every_room_wrap', text: 'What every room has.' },
  ],
  room: [
    { id: 'hero', name: 'Hero', selector: 'main > .page_hero_wrap', text: 'The room hero with the facts line, the booking and save buttons and the cancellation note.' },
    { id: 'about', name: 'About the room', selector: 'main > .room_page_wrap', text: 'The room text and its facts.' },
    { id: 'gallery', name: 'Gallery', selector: 'main > .room_shot_wrap', text: 'The numbered photos of the room with captions.' },
    { id: 'others', name: 'Other rooms', selector: 'main > .other_room_wrap', text: 'The other rooms as cards.' },
  ],
  experiences: [
    { id: 'intro', name: 'Intro', selector: 'main > .page_intro_wrap', text: 'The plain opening of a hub page.' },
    { id: 'hub', name: 'Experience list', selector: 'main > .exp_hub_wrap', text: 'Every experience with the filter by type.' },
  ],
  experience: [
    { id: 'hero', name: 'Hero', selector: 'main > .page_hero_wrap', text: 'The long title hero with type, duration and price.' },
    { id: 'about', name: 'About the experience', selector: 'main > .room_page_wrap', text: 'What happens, and what to know.' },
    { id: 'walk', name: 'Walk map', selector: 'main > .where_home_wrap', text: 'The paper map with only the walk from the door to this place.' },
    { id: 'more', name: 'More experiences', selector: 'main > .other_room_wrap', text: 'The other experiences as cards.' },
  ],
  aljub: [
    { id: 'hero', name: 'Hero', selector: 'main > .dining_page_wrap', text: 'The restaurant opening.' },
    { id: 'menu', name: 'Menu', selector: 'main > .menu_page_wrap', text: 'Every dish with price and allergens, the diet filter and the tasting menu.' },
    { id: 'chef', name: 'Chef', selector: 'main > .chef_page_wrap', text: 'The chef and the kitchen.' },
    { id: 'hours', name: 'Hours', selector: 'main > .hours_page_wrap', text: 'Opening days and hours.' },
  ],
  rooftop: [
    { id: 'hero', name: 'Hero', selector: 'main > .roof_page_wrap', text: 'The rooftop opening.' },
    { id: 'pool', name: 'Pool day', selector: 'main > .pool_page_wrap', text: 'The plunge pool.' },
    { id: 'bar', name: 'Bar', selector: 'main > .bar_page_wrap', text: 'The rooftop bar on the night theme.' },
    { id: 'spa', name: 'Spa', selector: 'main > .spa_page_wrap', text: 'The spa treatments.' },
  ],
  celebrations: [
    { id: 'hero', name: 'Hero', selector: 'main > .fest_page_wrap', text: 'The celebrations opening, on the brand green.' },
    { id: 'spaces', name: 'Spaces', selector: 'main > .space_page_wrap', text: 'The spaces for an event, with guest counts.' },
    { id: 'care', name: 'How we help', selector: 'main > .care_page_wrap', text: 'What the team takes care of.' },
    { id: 'form', name: 'Event form', selector: 'main > .event_form_wrap', text: 'The request form for an event.' },
  ],
  journal: [
    { id: 'list', name: 'Guide list', selector: 'main > .journal_list_wrap', text: 'The guides in alternating rows.' },
  ],
  guide: [
    { id: 'hero', name: 'Hero', selector: 'main > .page_hero_wrap', text: 'The guide hero with the author line.' },
    { id: 'body', name: 'Guide text', selector: 'main > .journal_page_wrap', text: 'The guide text with its photo and the link to the related experience.' },
    { id: 'map', name: 'Guide map', selector: 'main > .where_home_wrap', text: 'The places of the guide beside the paper map.' },
    { id: 'more', name: 'More guides', selector: 'main > .offer_list_wrap', text: 'The other guides as cards.' },
  ],
  offer: [
    { id: 'details', name: 'Offer details', selector: 'main > .offer_page_wrap', text: 'What is included and good to know; on the members offer, behind the sign in panel.' },
    { id: 'others', name: 'Other offers', selector: 'main > .offer_list_wrap', text: 'The other offers as cards.' },
  ],
  members: [
    { id: 'welcome', name: 'Welcome', selector: 'main > .member_out_wrap', text: 'The free club for a visitor: the perks and the two buttons.' },
    { id: 'stay', name: 'My stay', selector: 'main > .member_in_wrap', show: true, text: 'What a member sees after signing in: tables, requests, saved items, the rate and the preferences.' },
  ],
  legal: [
    { id: 'text', name: 'Legal text', selector: 'main > .legal_page_wrap', text: 'The legal notice, small and plain.' },
  ],
  notFound: [
    { id: 'page', name: 'Not found', selector: 'main > .lost_page_wrap', text: 'The empty arch, the line and the way back home.' },
  ],
};
