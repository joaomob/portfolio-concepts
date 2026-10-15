// One story per section of room-terrace-suite.html, in the order of the page (src/sections.js; written by scripts/write-stories.mjs).
import { section, note } from './page.js';

export default { title: "Room" };

export const Hero = { name: "Hero", render: section('room', 'hero'), parameters: note('room', 'hero') };

export const About = { name: "About the room", render: section('room', 'about'), parameters: note('room', 'about') };

export const Gallery = { name: "Gallery", render: section('room', 'gallery'), parameters: note('room', 'gallery') };

export const Others = { name: "Other rooms", render: section('room', 'others'), parameters: note('room', 'others') };
