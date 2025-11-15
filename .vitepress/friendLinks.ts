export class RelatedLinkObject {
    title: string;
    link: string;
    desc: string;

    constructor(title: string, link: string, desc: string) {
        this.title = title;
        this.link = link;
        this.desc = desc;
    }
}

export const FriendLinks: RelatedLinkObject[] = [
    new RelatedLinkObject('Microsoft Learn*', 'https://learn.microsoft.com/', '微软官方文档'),
    new RelatedLinkObject('Skript Hub*', 'https://skripthub.net/', '第三方Skript文档'),
    new RelatedLinkObject('NitWikit^?', 'https://nitwikit.8aka.org', '十分详尽的第三方 MC 开服教程'),
    new RelatedLinkObject('【续】维基档案馆', 'https://continue-project.netlify.app/', 'SnowCutie的插件文档汉化合集Continue Project'),
    new RelatedLinkObject('Natsurainko\'s blog', 'https://natsurainko.github.io/', '开发者Natsurainko的博客，积累了一些相关教程。'),
];

export const Sponsors: RelatedLinkObject[] = [
    new RelatedLinkObject('云联小白/集云社', 'https://idc.mcmc.run/', '专注游戏服务器租赁的服务商【云联小白】，其长期为CMFS提供免费服务器。联系QQ：395426'),
]