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
    title: 'Создатель',
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
    title: 'UI, бэкенд-сервисы, эксплуатация и обслуживание',
    links: [
      { icon: 'github', link: 'https://github.com/leon-o' }
    ]
  },
  {
    avatar: 'https://github.com/komorebi64.png',
    name: 'Croteco',
    title: 'Бэкенд-сервисы, эксплуатация и обслуживание',
    links: [
      { icon: 'github', link: 'https://github.com/komorebi64' }
    ]
  },
  {
    avatar: 'https://github.com/fr1g.png',
    name: '法棍',
    title: 'Фронтенд, эксплуатация и обслуживание Minecraft серверов',
    links: [
      { icon: 'github', link: 'https://github.com/fr1g' }
    ]
  }
];

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Наша команда
    </template>
    <template #lead>
        Corona Studio (日冕工作室) — это команда профессионалов и энтузиастов, основной деятельностью которой являются сторонние сервисы для игры Minecraft. Ранее известна как команда разработчиков CMFL Launcher.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
