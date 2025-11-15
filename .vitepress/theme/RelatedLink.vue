<script setup lang="ts">
import { defineProps } from 'vue';
import { RelatedLinkObject } from '../friendLinks';

const props = defineProps<
{
  link: RelatedLinkObject,
  isSponsor?: boolean,
}
>();
</script>
<template>
    <a :class="`bitter exlink ${isSponsor ? 'card-like' : ''}`" 
    target="_blank" 
    :href="props.link!.link" 
    :title="props.link!.desc">
    <span :style="`font-weight: ${isSponsor ? 'bold' : 'normal'}; font-size: ${isSponsor ? 'x-large' : 'medium'};`">{{ props.link!.title }}</span>
    <p class="smaller" v-if="isSponsor">{{ link.desc }}</p>
</a>
</template>