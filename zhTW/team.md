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
    name: '老臘肉',
    title: '建立者',
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
    title: 'UI、後端服務、運維',
    links: [
      { icon: 'github', link: 'https://github.com/leon-o' }
    ]
  },
  {
    avatar: 'https://github.com/komorebi64.png',
    name: 'Croteco',
    title: '後端服務、運維',
    links: [
      { icon: 'github', link: 'https://github.com/komorebi64' }
    ]
  },
  {
    avatar: 'https://github.com/fr1g.png',
    name: '法棍',
    title: '前端、MC 伺服器運維',
    links: [
      { icon: 'github', link: 'https://github.com/fr1g' }
    ]
  }
];

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我們的團隊
    </template>
    <template #lead>
        Corona Studio（日冕工作室）是以 Minecraft 遊戲第三方服務為業務核心的、由專業人士和愛好者組成的團隊, 前身是 CMFL 啟動器開發組, 
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
