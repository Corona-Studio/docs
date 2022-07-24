export default {
    title: 'CSKB',

    description: 'Corona Studio Knowledge Base',

    themeConfig: {
        sidebar: [
            {
                text: "Guide",
                items: [
                    {text: "Index", link: "/guide/"}
                ]
            },
            {
                text: "Introduction",
                items: [
                    {text: "Index", link: "/introduction/"}
                ]
            }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()} - Corona Studio`
        },
    }
}
