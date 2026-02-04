# 友情链接…
<script setup>
import RelatedLink from './../../.vitepress/theme/RelatedLink.vue';
import {FriendLinks, Sponsors} from './../../.vitepress/friendLinks.ts';
</script>
## 友链！

此处展示的友情链接仅限同类的知识共享型站点。与此同时，还包含了一些参考较多的文档站（可能是单向友链）

如果你认为你的站点是与我们并肩的好伙伴，欢迎与我们交换友链！查看[我们的联系方式](/zhCN/guide/contact)

<div class="exlinks" style="margin-top: .8rem;">
    <RelatedLink v-for="link in FriendLinks" :key="link.name" :link="link" />
</div>
 

*标注 `*` 的是单向，标注 `^` 的是因为各种特殊情况导致的暂时单向。*

## 赞助商

这里列举大力赞助我们的好心人，他们有自己的生意。

<div class="exlinks two-one" style="margin-top: .8rem;">
    <RelatedLink v-for="link in Sponsors" :key="link.name" :link="link" :isSponsor="true" />
</div>

## 如何在这里展示？

首先当然是[联系我们！](/zhCN/guide/contact.html)

然后，说明来意：

1)  想要和 CSKB/官网 交换友链？让我们确认一下！只要我们互相是志同道合的，那么我们就可以交换友链。
2)  希望长期向我们提供赞助？太好了！感谢您的物质支持，只要是我们受得起的长期赞助，我们当然乐意照单全收（被打）

然后请等待在下一次网站更新，只有在确认通过后的下一次网站更新才会将我们珍贵的「合作者信息」登上相应的页面。
