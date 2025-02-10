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
    name: '老腊肉',
    title: '创建者',
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
    title: 'UI、后端服务、运维',
    links: [
      { icon: 'github', link: 'https://github.com/leon-o' }
    ]
  },
  {
    avatar: 'https://github.com/komorebi64.png',
    name: 'Croteco',
    title: '后端服务、运维',
    links: [
      { icon: 'github', link: 'https://github.com/komorebi64' }
    ]
  },
  {
    avatar: 'https://github.com/fr1g.png',
    name: '法棍',
    title: '前端、MC 服务器运维',
    links: [
      { icon: 'github', link: 'https://github.com/fr1g' }
    ]
  }
];

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      我们的团队
    </template>
    <template #lead>
        Corona Studio（日冕工作室）是以 Minecraft 游戏第三方服务为业务核心的、由专业人士和爱好者组成的团队, 前身是 CMFL 启动器开发组, 
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
