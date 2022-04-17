<template>
    <div>
        <Vue3DraggableResizable class="component-ui text-center"
            :initW="position.width"
            :initH="position.height"
            v-model:x="position.x"
            v-model:y="position.y"
            v-model:w="position.width"
            v-model:h="position.height"
            :active="true"
            :draggable="true"
            :resizable="true"
            @contextmenu.prevent="openContextMenu"
        >
            <span class="align-text-bottom noselect">{{ configuration.componentName }}</span>
        </Vue3DraggableResizable>

        <!-- <b-modal v-model="show">Hello From Modal!</b-modal> -->
        <component
            :is="popup"
            :isOpen="show"
            :component="$props.component"
            @on-close="closeContextMenu"
        >
        </component>
    </div>
</template>

<script lang="ts">

import ComponentConfiguration from '@/sketch/api/component-config';
import { getPopupByComponent } from '@/sketch/api/popup-manager';
import SketchComponent from '@/sketch/api/sketch-component';
import { NumberInputComponent } from '@/sketch/natif-components/number-input-component';

import { defineComponent, PropType, ref } from 'vue';
import Vue3DraggableResizable from 'vue3-draggable-resizable';

export default defineComponent({
    name: 'SketchComponentUI',
    components: {
        Vue3DraggableResizable
    },
    setup ()
    {
        const position = {
            x: 100,
            y: 100,
            height: 100,
            width: 100
        };

        let show = ref<boolean>(false);
        const popup = getPopupByComponent(NumberInputComponent);


        return { position, show, popup };
    },  
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchComponent<unknown>>
        },
        configuration: {
            required: true,
            type: Object as  PropType<ComponentConfiguration>
        }
    },
    methods: {
        openContextMenu()
        {
            this.show = true;
        },
        closeContextMenu()
        {
            this.show = false;
        }
    }
});

</script>
