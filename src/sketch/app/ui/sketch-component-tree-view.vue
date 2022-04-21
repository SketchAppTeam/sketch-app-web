<template>
    <aside id="tree-view">
        <h6 class="text-center">List of available components</h6>
        <b-form-input placeholder="Filter components" v-model="filter" class="unselected-item"></b-form-input>
        <ul class="mt-3">
            <li v-for="[componentClass, configuration] in filteredConfigurations"
                :key="componentClass.toString()"
                @click="onComponentSelected($event, componentClass)"
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
import { throwStatement } from "@babel/types";
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
            let selectedElement = ref<HTMLElement>();

            return { filter, selectedElement };
        },
        methods: {
            onComponentSelected(event: MouseEvent, componentClass: Class<SketchComponent<unknown>>)
            {
                this.$props.boardManager.setSelectedComponent(componentClass);
                if (this.selectedElement)
                {
                    this.selectedElement.classList.remove('selected-item');
                    this.selectedElement.classList.add('unselected-item');
                }

                this.selectedElement = event.target as HTMLElement;
                this.selectedElement.classList.add('selected-item');
                this.selectedElement.classList.remove('unselected-item');
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
        padding-left: 10px;
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

    .selected-item {
        background-color: rgb(45, 120, 233);
        color: white;
    }
    .unselected-item {
        color: black;
    }
</style>