// The calendar files of the thank you pages (the "save to calendar" button), written next to their page as in the
// original prototype: /concepts/litora-eb5/webinar-visto-eb5/litora-eb5-webinar.ics.
import type { APIRoute, GetStaticPaths } from 'astro';
import { calendarFiles } from '../lib/content';

export const getStaticPaths = (() =>
  calendarFiles().map(({ path, body }) => ({ params: { file: path.replace(/\.ics$/, '') }, props: { body } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(props.body as string, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
