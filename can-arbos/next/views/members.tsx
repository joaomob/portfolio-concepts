// Members: the free club for a visitor, and "My stay" for a member who signed in (both in the page, the script keeps one).
import type { PageMeta } from '@/lib/meta';
import BaseLayout from '@/components/layout/BaseLayout';
import MemberWelcome from '@/components/members/MemberWelcome';
import MemberStay from '@/components/members/MemberStay';

export const meta: PageMeta = { title: "Members · Can Arbós, Palma", description: "The free Can Arbós club for guests and diners: book Aljub 60 days ahead, keep what you like and get the members' rate.", slug: "members" };

export default function MembersView() {
  return (
    <BaseLayout {...meta}>
  <MemberWelcome />
  <MemberStay />
</BaseLayout>
  );
}
