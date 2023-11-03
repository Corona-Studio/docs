---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://www.github.com/laolarou726.png',
    name: 'laolarou726',
    title: 'Founder',
    links: [
      { icon: 'github', link: 'https://github.com/laolarou726' }
    ]
  },
  {
    avatar: 'https://github.com/CodingEric.png',
    name: 'CodingEric',
    title: 'UI / UX',
    links: [
      { icon: 'github', link: 'https://github.com/CodingEric' }
    ]
  },
  {
    avatar: 'https://github.com/leon-o.png',
    name: 'Leon',
    title: 'UI, Back-end, Operator and Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/leon-o' }
    ]
  },
  {
    avatar: 'https://github.com/komorebi64.png',
    name: 'Croteco',
    title: 'Back-end, Operator and Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/komorebi64' }
    ]
  },
  {
    avatar: 'https://github.com/fr1g.png',
    name: 'Feiron Iguista',
    title: 'Front-end, Minecraft Server Operator and Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/fr1g' }
    ]
  }
];

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
        Corona Studio is a team of professionals and enthusiasts with Minecraft third-party game services as its core business. Was formerly the CMFL development team.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
