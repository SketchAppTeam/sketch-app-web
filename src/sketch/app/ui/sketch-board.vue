import { defineComponent } from "vue";

<template>
    <div id="sketch-board" @click="onBoardClick()">
        <div>Hello</div>
        <SketchComponentUI
            v-for="[component, configuration] in componentsMap"
            :key="component.getID()"
            :component="component"
            :configuration="configuration"
        />
    </div>
</template>

<script lang="ts">

import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from "@/sketch/api/types";
import SketchBoardManager from "../core/sketch-board-manager";
import SketchComponentUI from "@/sketch/app/ui/sketch-component-ui.vue";
import { getConfigurationOf } from "@/sketch/api/config-manager";

import { defineComponent, reactive } from "vue";
import ComponentConfiguration from "@/sketch/api/component-config";

export default defineComponent({
    name: 'SketchBoard',
    components: {
        SketchComponentUI
    },
    props: {
        boardManager: {
            required: true,
            type: SketchBoardManager
        }
    },
    setup()
    {
        const componentsMap = reactive(new Map<SketchComponent<unknown>, ComponentConfiguration>());
        return { componentsMap };
    },
    methods: {
        onBoardClick()
        {
            const selectedComponentClass: Class<SketchComponent<unknown>> | undefined = this.$props.boardManager.getAndRemoveComponentClass();
            if (selectedComponentClass)
            {
                const associatedConfiguration = getConfigurationOf(selectedComponentClass);
                if (associatedConfiguration)
                {
                    const component: SketchComponent<unknown> = new selectedComponentClass();
                    this.componentsMap.set(component, associatedConfiguration);
                }            
            }
        }
    }
})

</script>

<style>
    #sketch-board
    {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #sketch-board:hover
    {
        cursor: pointer;
    }

</style>
