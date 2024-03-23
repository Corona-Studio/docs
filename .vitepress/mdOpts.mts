import { MarkdownOptions } from "vitepress";
import { getHighlighter } from 'shiki'
import { fs } from "original-fs";

const skript = JSON.parse(fs.readFileSync('./customLangs/skript.json', 'utf8'))

const highlighter = await getHighlighter({
  langs: [skript],
  themes: ['nord']
})

const html = highlighter.codeToHtml(code, {
  lang: 'my-lang',
  theme: 'nord'
})



// export default {
//     markdown: {

//     }
// }