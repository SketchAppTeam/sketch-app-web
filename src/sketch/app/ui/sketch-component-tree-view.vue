<template>
    <aside>
        <h6>List of available components</h6>
        <ul>
            <li v-for="[componentClass, configuration] in configurations"
                :key="componentClass.toString()"
                @click="onComponentSelected(componentClass)"
            >
                {{ configuration.libraryName }}
            </li>
        </ul>
    </aside>
</template>

<script lang="ts">

import { getConfigurations } from "@/sketch/api/config-manager";
import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from "@/sketch/api/types";
import { defineComponent } from "vue";
import SketchBoardManager from "../core/sketch-board-manager";

    export default defineComponent({
        name: 'SketchComponentTreeView',
        props: {
            boardManager: {
                required: true,
                type: SketchBoardManager
            }
        },  
        setup()
        {
            const configurations = getConfigurations();
            return { configurations };
        },
        methods: {
            onComponentSelected(componentClass: Class<SketchComponent<unknown>>)
            {
                this.$props.boardManager.setSelectedComponent(componentClass);
            }
        },
    });

</script>

<style>
    ul li
    {
        list-style-type: none;
    }

    ul li:hover
    {
        cursor: pointer;
    }
</style>