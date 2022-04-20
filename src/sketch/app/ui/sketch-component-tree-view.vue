<template>
    <aside id="tree-view">
        <h6 class="text-center">List of available components</h6>
        <b-form-input placeholder="Filter components" v-model="filter"></b-form-input>
        <ul class="mt-3">
            <li v-for="[componentClass, configuration] in filteredConfigurations"
                :key="componentClass.toString()"
                @click="onComponentSelected(componentClass)"
                class="border-bottom"
            >
                {{ configuration.libraryName }}
            </li>
        </ul>

    </aside>
</template>

<script lang="ts">

import ComponentConfiguration from "@/sketch/api/component-config";
import { getConfigurations } from "@/sketch/api/config-manager";
import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from "@/sketch/api/types";
import { defineComponent, ref } from "vue";
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
            let filter = ref<string>("");

            return { filter };
        },
        methods: {
            onComponentSelected(componentClass: Class<SketchComponent<unknown>>)
            {
                this.$props.boardManager.setSelectedComponent(componentClass);
            },
        },
        computed: {
            filteredConfigurations() {
                const lowerCaseFilter: string = this.filter.toLowerCase();
                const configurations: Map<Class<SketchComponent<unknown>>, ComponentConfiguration> = getConfigurations();
                const result: Map<Class<SketchComponent<unknown>>, ComponentConfiguration> = new Map();
                configurations.forEach((config: ComponentConfiguration, componentClass: Class<SketchComponent<unknown>>) => {
                    if (config.libraryName.toLowerCase().includes(lowerCaseFilter))
                    {
                        result.set(componentClass, config);
                    }
                });

                return result;
            }
        }
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

    #tree-view
    {
        height: 100%;
        margin: 0;
        padding: 0;
        width: calc(100%/4);
        overflow-y: scroll;
    }
</style>