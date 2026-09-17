import { db } from "../lib/db/index.js";
import {
  impactStats,
  programs,
  stories,
  supporters,
  workGallery,
} from "../lib/db/schema.js";

const storyBodies = {
  "a-table-for-every-family": `In the communities where food insecurity begins to tighten its grip, the first signs are often quiet: a household trying to stretch one meal into another, a parent postponing a purchase, a child waiting to see what will be available by evening. In Edo and Ekiti, Upliftment Against Hunger Initiative NG (UAHIN) has worked with that reality in mind, meeting families where they are and responding with practical support that is rooted in local trust.

The work is not built on a single moment of relief alone. It is built on steady, repeated presence. In these communities, the most effective intervention is rarely dramatic; it is often a careful sequence of listening, identifying need, and reaching the right people with the right kind of support. UAHIN’s work in the region reflects that principle. Whether through food support, household outreach, or the coordination of local partners and volunteers, the goal is to reduce immediate pressure while preserving dignity.

One of the most important aspects of this work is that it connects relief to community leadership. People already know their neighborhoods, their families, and the hidden strain behind everyday routines. That understanding matters. It means a response can be more precise and more humane. Instead of a top-down model, the process is shaped by local knowledge: who needs support, who is carrying more than they should, and where a small intervention can make a meaningful difference.

That is why UAHIN’s approach has remained grounded in communal engagement. The work has involved more than distribution alone. It has included a meaningful effort to keep people informed, build trust, and create a sense that support is not a one-time act but a consistent commitment to households that are carrying too much on their own. In a context where hunger often arrives gradually and painfully, the value of consistency cannot be overstated.

Across Edo and Ekiti, such interventions matter because they do not only address immediate need. They also signal a different kind of social response: one shaped by dignity, local cooperation, and the understanding that families deserve practical care without shame or exclusion. For many households, receiving help in a respectful, organized way can change not only what is on the table but also how they see the future.

The broader significance of this work lies in its quiet persistence. UAHIN’s response in these states is a reminder that hunger is not an abstract statistic; it is felt in the daily decisions families make about food, transport, school costs, and health. By responding in a way that is local, careful, and community-led, the organization contributes not only to immediate relief but also to the long-term restoration of confidence and stability.

In the end, the story is not simply about food being delivered. It is about households finding steadier ground, communities recognizing one another’s needs, and local action making a real difference in the lives of families who should not have to face hunger alone.`,
  "food-relief-in-osun": `In Osun State, the ordinary rhythm of daily life can change quickly when households are under pressure from rising food costs and a wider climate of uncertainty. The need is not always visible in a dramatic way, but it has a real effect on how people plan their weeks, where they cut back, and what they can realistically provide for their families. In such moments, practical assistance becomes more than a convenience; it becomes a form of stability.

UAHIN’s work in Osun has centered on that reality. The organization’s response in the state has been shaped by a clear understanding that communities need support that is immediate, dignified and grounded in trust. In communities where families are navigating financial strain, a consistent response can restore some sense of control. It can help households make it through the week, protect the dignity of parents and caregivers, and make space for other essential needs to be considered.

The support delivered through UAHIN’s Osun interventions has been important not only because it addresses hunger, but because it demonstrates a community-oriented model of care. Rather than treating people as passive recipients, the process begins with understanding what households are facing and ensuring the response is built around their lived realities. That is how support becomes meaningful. It is not simply a package delivered at a point in time; it is a form of solidarity that respects the complexity of daily life.

This is particularly important in places where a family’s burden is carried across several fronts at once. A child needs school items, a caregiver is managing essentials, and a household is trying to stretch resources carefully. In that environment, even a modest response can make a tangible difference in easing pressure and creating room for people to think beyond survival. UAHIN’s role in this context has therefore been more than logistical. It has been relational, practical, and deeply human.

The broader significance of the work in Osun lies in what it says about local humanitarian response. Communities do not need to be approached as problems to solve. They need to be met as partners in a response that recognizes their knowledge, their resilience, and their capacity to recover when support is delivered with care. The effort to bring food and practical assistance to households in need is rooted in that belief.

When a community sees its own needs recognized and addressed with respect, the effect is not limited to a single transfer of goods. It strengthens the sense that collective support can still matter. It reminds families that they are not alone in their struggle. And it shows the wider importance of intervention that is careful, local, and grounded in the dignity of the people being served.

That is why the work in Osun has such lasting value. It speaks to the reality that humanitarian action is strongest when it is responsive, humble, and deeply connected to the lived experience of the people it seeks to help.`,
  "community-food-support-in-ekiti": `Ekiti presents a different picture of hunger and resilience, but one that is no less urgent. In many households, the challenge is not only the availability of food, but the daily pressure of trying to meet essential needs with limited resources. Even when the need is not spoken about loudly, it can shape how families move through the week, how children are cared for, and how communities organize themselves around mutual support.

UAHIN’s work in Ekiti has been rooted in this reality. The organization’s intervention in the state has been shaped by the understanding that sustainable support must meet people with both practical assistance and respect. In communities under stress, the most effective response is rarely abstract. It is a visible act of care that helps households regain some breathing room and reaffirms the idea that local solidarity still matters.

The support delivered in Ekiti, including the food assistance work connected to the Hon. Minister Dele Alake, reflects a broader commitment to practical humanitarian response. The importance of such support lies not only in the items provided, but in the way they are offered: in a manner that recognizes community needs, respects local conditions, and refuses to reduce people to a statistic. That human-centered approach is central to the work.

In many communities, food assistance is the entry point into a larger conversation about resilience and recovery. It is a way of showing up in the moment while also making clear that hardship is not being ignored. For families caught between daily expenses and limited income, support can create space for them to focus on other priorities without the constant pressure of uncertainty about the next meal.

The significance of this kind of intervention goes beyond immediate consumption. It helps stabilize households and gives communities a stronger sense that their challenges are being seen by people who are willing to act with urgency and compassion. That matters in a context where hunger can often make people feel isolated or overlooked. UAHIN’s work in Ekiti pushes back against that feeling by centering the person and the community in the response.

There is also a deeper lesson in this process. Food support, when carried out thoughtfully, is not only a relief measure; it is a form of solidarity that affirms people’s dignity. It says that a family’s difficulty is a civic concern and that the response must be rooted in empathy and practical action. In a state where communities are often asked to be resilient without adequate support, interventions such as this matter because they create a stronger foundation for care and recovery.

By standing with communities in this way, UAHIN contributes to a broader humanitarian ethic: one where the vulnerable are not treated as burdens, but as people with the same dignity and worth as anyone else. That is the deeper significance of the work carried out in Ekiti. It is not simply about food. It is about recognition, relief, and the restoration of confidence in a future that can be better than the present hardship.`,
};

const seedPrograms = [
  {
    title: "Edo Community Empowerment Initiative",
    location: "Edo State",
    stat: "Project executed",
    image: "/edo.jpg",
    description:
      "Community empowerment project executed in Edo State by Upliftment Against Hunger Initiative NG (UAHIN), with the support of His Excellency, Godwin Obaseki, former Executive Governor of Edo State.",
    sortOrder: 1,
    active: true,
  },
  {
    title: "Osun Community Empowerment Response",
    location: "Osun State",
    stat: "Project executed",
    image: "/osungboyega.jpg",
    description:
      "Community empowerment response project executed in Osun State by Upliftment Against Hunger Initiative NG (UAHIN), with the support of Gboyega Oyetola, former Executive Governor of Osun State.",
    sortOrder: 2,
    active: true,
  },
  {
    title: "Osun Household Support Initiative",
    location: "Osun State",
    stat: "Project executed",
    image: "/osunrauf.jpg",
    description:
      "Household support and community response project executed in Osun State by Upliftment Against Hunger Initiative NG (UAHIN), with the support of Ogbeni Rauf Aregbesola, former Executive Governor of Osun State.",
    sortOrder: 3,
    active: true,
  },
  {
    title: "Ekiti Community Empowerment Support",
    location: "Ekiti State",
    stat: "Project executed",
    image: "/ekitifayemi.jpg",
    description:
      "Community empowerment support project executed in Ekiti State by Upliftment Against Hunger Initiative NG (UAHIN), through the support of Dr. Kayode Fayemi, former Executive Governor of Ekiti State.",
    sortOrder: 4,
    active: true,
  },
  {
    title: "Ekiti Household Food Assistance",
    location: "Ekiti State",
    stat: "Project executed across the state",
    image: "/ekitialake.jpg",
    description:
      "Food support project executed in Ekiti State by Upliftment Against Hunger Initiative NG (UAHIN), through the support of Hon. Minister Dele Alake, across the state.",
    sortOrder: 5,
    active: true,
  },
];

const seedSupporters = [
  {
    name: "Engr. Kayode Ojo",
    description:
      "Chairman of Upliftment Against Hunger Initiative NG (UAHIN), supporting community-led empowerment and hunger response work.",
    role: "Chairman",
    image: "/chairman.jpg",
    active: true,
    sortOrder: 1,
  },
  {
    name: "Hon. Ademola Adedire",
    description:
      "Chief Executive Officer of Upliftment Against Hunger Initiative NG (UAHIN), leading strategies for community resilience, support, and response.",
    role: "Chief Executive Officer (CEO)",
    image: "/ceo.jpg",
    active: true,
    sortOrder: 2,
  },
  {
    name: "Prof. Patrick Olugbenga Tedela",
    description:
      "A senior academic and board member supporting UAHIN’s humanitarian engagement across communities and institutions.",
    role: "Board Member",
    image: "/vice.jpg",
    active: true,
    sortOrder: 3,
  },
  {
    name: "Prof. W. O. Adebayo",
    description:
      "A geographer and member of the Board of Upliftment Against Hunger Initiative NG (UAHIN).",
    role: "Board Member",
    image: "/member.jpg",
    active: true,
    sortOrder: 4,
  },
  {
    name: "Prof. S. A. Jegede",
    description:
      "An Anglican priest, board member, and former Dean of the Faculty of Education at Ekiti State University, Ado-Ekiti.",
    role: "Board Member",
    image: "/priest.jpg",
    active: true,
    sortOrder: 5,
  },
  {
    name: "Dr. Mrs. Ajayi",
    description:
      "Former Registrar of the Federal University Oye-Ekiti and Chairperson of Upliftment Against Hunger Initiative NG (UAHIN).",
    role: "Chairperson",
    image: "/chairperson.jpg",
    active: true,
    sortOrder: 6,
  },
  {
    name: "Mrs. Mopelola Adedire",
    description:
      "Deputy Chief Executive Officer of Upliftment Against Hunger Initiative NG (UAHIN), supporting relief delivery and community-focused programming.",
    role: "Deputy Chief Executive Officer (DCEO)",
    image: "/deputy.jpg",
    active: true,
    sortOrder: 7,
  },
];

const seedImpactStats = [
  { value: "3", label: "states reached", sortOrder: 1, active: true },
  { value: "6", label: "community food support projects", sortOrder: 2, active: true },
  { value: "Community-led", label: "hunger response", sortOrder: 3, active: true },
];

const seedStories = [
  {
    slug: "a-table-for-every-family",
    category: "Impact",
    title: "A path to steadier days: UAHIN support across Edo and Ekiti",
    excerpt:
      "Families in Edo and Ekiti are receiving practical support and steady local care during difficult times.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85",
    author: "Mariam Yusuf",
    date: "18 Aug 2026",
    body: storyBodies["a-table-for-every-family"],
    content: storyBodies["a-table-for-every-family"],
    featured: true,
  },
  {
    slug: "food-relief-in-osun",
    category: "Stories",
    title: "Support reaches households in Osun communities",
    excerpt:
      "Local volunteers are helping families navigate hardship with practical assistance and consistency.",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85",
    author: "Amina Bello",
    date: "06 Aug 2026",
    body: storyBodies["food-relief-in-osun"],
    content: storyBodies["food-relief-in-osun"],
    featured: false,
  },
  {
    slug: "community-food-support-in-ekiti",
    category: "Field notes",
    title: "Community support keeps families moving in Ekiti",
    excerpt:
      "From outreach to household support, UAHIN is helping communities respond with dignity and practical care.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85",
    author: "Field team",
    date: "22 Jul 2026",
    body: storyBodies["community-food-support-in-ekiti"],
    content: storyBodies["community-food-support-in-ekiti"],
    featured: false,
  },
];

const seedGallery = [
  {
    title: "Community care in Edo",
    description: "A moment of neighborhood support and practical outreach in Edo State, where local teams work alongside communities to respond with care.",
    image: "/edo.jpg",
    location: "Edo State",
    sortOrder: 1,
    active: true,
  },
  {
    title: "Support reaching households",
    description: "Outreach in Osun reflects the steady, human work of identifying families in need and responding with dignity and consistency.",
    image: "/osungboyega.jpg",
    location: "Osun State",
    sortOrder: 2,
    active: true,
  },
  {
    title: "Community-led response",
    description: "UAHIN’s work is shaped by local leadership, volunteers, and trusted relationships that help support reach the right places.",
    image: "/chairman.jpg",
    location: "Ekiti State",
    sortOrder: 3,
    active: true,
  },
  {
    title: "Household support in action",
    description: "Families are supported through practical assistance, coordination, and a focus on community resilience over time.",
    image: "/osunrauf.jpg",
    location: "Osun State",
    sortOrder: 4,
    active: true,
  },
  {
    title: "Relief with dignity",
    description: "A care-first approach that keeps support personal, respectful, and grounded in the realities of each community.",
    image: "/ekitifayemi.jpg",
    location: "Ekiti State",
    sortOrder: 5,
    active: true,
  },
  {
    title: "A network of care",
    description: "Across states and communities, UAHIN remains committed to practical support, local partnership, and lasting impact.",
    image: "/deputy.jpg",
    location: "Multi-state outreach",
    sortOrder: 6,
    active: true,
  },
];

async function seed() {
  await db.delete(impactStats);
  await db.delete(programs);
  await db.delete(supporters);
  await db.delete(stories);
  await db.delete(workGallery);

  await db.insert(impactStats).values(seedImpactStats).onConflictDoNothing();
  await db.insert(programs).values(seedPrograms).onConflictDoNothing();
  await db.insert(supporters).values(seedSupporters).onConflictDoNothing();
  await db.insert(stories).values(seedStories).onConflictDoNothing();
  await db.insert(workGallery).values(seedGallery).onConflictDoNothing();

  console.log("Database seed complete.");
}

seed().catch((error) => {
  console.error("Database seed failed:", error);
  process.exit(1);
});
