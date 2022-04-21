<template>
    <div class="line" :style="{
        'width': `${properties.width}px`,
        'left': `${properties.left}px`,
        'top': `${properties.top}px`  
    }"></div>
</template>

<script lang="ts">

type ArrowProperties = {
    width: number;
    left: number;
    top: number;
}

import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
    name: 'ArrowComponent',
    props: {
        from: {
            required: true,
            type: HTMLElement
        },
        to: {
            required: true,
            type: HTMLElement
        }
    },
    setup()
    {
        console.log("setup");
    },
    computed: {
        properties() : ArrowProperties {
            const width: number = this.$props.to.getBoundingClientRect().left - this.$props.from.getBoundingClientRect().right;
            const top: number = this.$props.from.getBoundingClientRect().top + (this.$props.from.getBoundingClientRect().height / 2);
            const left: number = this.$props.from.getBoundingClientRect().left;

            return {
                width,
                top,
                left
            };
        }
    }
});

</script>