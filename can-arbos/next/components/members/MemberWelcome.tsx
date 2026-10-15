// The members page for a visitor who is not signed in: what the free club gives and the two buttons. The site script
// removes it once a member signs in.
import Button from '@/components/ui/Button';
import { img } from '@/lib/paths';

export default function MemberWelcome() {
  const PERKS = [
    'Book Aljub 60 days ahead',
    'Keep the rooms and experiences you like',
    "The members' rate on every stay",
    "Tell the kitchen once what you can't eat",
  ];
  return (
    <>
<section className="member_out_wrap u-theme-light u-background-2" aria-labelledby="page-title" data-member-out="">
  <div className="member_out_contain u-container">
    <div className="member_out_layout">
      <div className="member_out_content">
        <p className="eyebrow_text">Members</p>
        <h1 className="member_out_title u-text-style-h1" id="page-title">The Can Arbós club</h1>
        <p className="member_out_text u-text-style-large">A free account for guests and diners.</p>
        <div className="u-button-wrapper"><Button label="Create an account" modal="signup-modal" /><Button label="Sign in" variant="secondary" modal="signin-modal" /></div>
      </div>
      <img {...img('dining/wine-courtyard.webp', 700)} className="member_out_image is-arch" alt="A glass of red wine and a bottle on a stone table in the courtyard at dusk" width="700" height="869" fetchPriority="high" />
      <ul className="member_out_list">
        {PERKS.map((perk) => <li className="member_out_item">{perk}</li>)}
      </ul>
    </div>
  </div>
</section>
    </>
  );
}
