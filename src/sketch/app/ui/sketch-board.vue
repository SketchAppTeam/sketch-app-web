import { defineComponent } from "vue";

<template>
    <div id="sketch-board" @mousemove="updateBoardPosition" @click="onBoardClick($event)" @keydown="onKeyDown($event)" tabindex="0" ref="sketch-board">
        <SketchComponentUI
            v-for="[componentWrapper, configuration] in componentsMap"
            :key="componentWrapper.component.getID()"
            :component="componentWrapper.component"
            :configuration="configuration"
            :componentX="componentWrapper.x"
            :componentY="componentWrapper.y"
            @on-select-component="setSelectedComponent"
            @on-select-slot="selectSlot"
        />
    </div>
</template>

<script lang="ts">

import SketchComponent from "@/sketch/api/sketch-component";
import { Class, Nullable } from "@/sketch/api/types";
import SketchBoardManager from "../core/sketch-board-manager";
import SketchComponentUI from "@/sketch/app/ui/sketch-component-ui.vue";
import { getConfigurationOf } from "@/sketch/api/config-manager";

import { defineComponent, reactive } from "vue";
import ComponentConfiguration from "@/sketch/api/component-config";
import { ComponentSlot } from "./type";
import { ArrayStack, Stack } from "@/sketch/api/data-structure";

import { SketchBoardWorkflow } from '@/sketch/app/data/sketch-board-workflow';
import DefaultSketchBoardWorkflow from '@/sketch/app/data/default-sketch-board-workflow';

const DELETE_KEY = "Delete";
const COPY_KEY = "c";
const PASTE_KEY = "v";

type ComponentWrapper = {
    component: SketchComponent<unknown>;
    x: number;
    y: number;
};

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
        const componentsMap = reactive(new Map<ComponentWrapper, ComponentConfiguration>());
        let selectedComponent: Nullable<SketchComponent<unknown>>;
        
        let componentCopy: Nullable<SketchComponent<unknown>>;
        let copy = false;

        let currentBoardPosition: { x: number, y: number } = { x: 0, y: 0 };

        const slotStack: Stack<ComponentSlot> = new ArrayStack();
        const workflow: SketchBoardWorkflow = new DefaultSketchBoardWorkflow();

        return { componentsMap,
                 selectedComponent, 
                 copy, 
                 currentBoardPosition,
                 componentCopy,
                 slotStack,
                 workflow
        };
    },
    methods: {
        // listeners
        onBoardClick(event: MouseEvent)
        {
            const x: number = event.x;
            const y: number = event.y;

            const selectedComponentClass: Class<SketchComponent<unknown>> | undefined = this.$props.boardManager.getAndRemoveComponentClass();
            if (selectedComponentClass)
            {
                const associatedConfiguration = getConfigurationOf(selectedComponentClass);
                if (associatedConfiguration)
                {
                    const component: SketchComponent<unknown> = new selectedComponentClass();
                    const wrapper: ComponentWrapper = {
                        component: component,
                        x: x,
                        y: y
                    };

                    this.componentsMap.set(wrapper, associatedConfiguration);
                    this.workflow.insert(component);
                }            
            }
            else if (event.target == this.$refs['sketch-board'])
            {
                // remove selected component
                this.selectedComponent = null;
            }
        },
        updateBoardPosition(event: MouseEvent)
        {   
            this.currentBoardPosition.x = event.x;
            this.currentBoardPosition.y = event.y;
        },
        onKeyDown(event: KeyboardEvent)
        {
            const key: string = event.key;

            if (key == DELETE_KEY)
            {
                // delete selected component
                this.componentsMap.forEach((_, wrapper) => {
                    if (wrapper.component == this.selectedComponent)
                    {
                        this.componentsMap.delete(wrapper);
                    }
                });
            }
            else if ((key == COPY_KEY) && event.ctrlKey)
            {
                if (this.selectedComponent)
                {
                    this.componentCopy = this.selectedComponent;
                }
            }
            else if ((key == PASTE_KEY) && event.ctrlKey)
            {
                if (this.componentCopy)
                {
                    const newComponent: SketchComponent<unknown> = this.componentCopy.copy();
                    const wrapper: ComponentWrapper = {
                        component: newComponent,
                        x: this.currentBoardPosition.x,
                        y: this.currentBoardPosition.y
                    };

                    const config = getConfigurationOf(newComponent.constructor as Class<SketchComponent<unknown>>);
                    if (config)
                    {
                        this.componentsMap.set(wrapper, config);
                    }
                }
            }
        },
        selectSlot(slot: ComponentSlot)
        {  
            if (this.slotStack.contains(slot))
            {
                this.slotStack.clear();
                slot.isSelected = false;
            }
            else
            {
                this.slotStack.push(slot);
                slot.isSelected = true;
            }
            
            if (this.slotStack.size() == 2)
            {
                const inputSlot: ComponentSlot = this.slotStack.pop() as ComponentSlot;
                const outputSlot: ComponentSlot = this.slotStack.pop() as ComponentSlot;
                this.__createLinkBetween(outputSlot, inputSlot);
            }
        },
        __createLinkBetween(source: ComponentSlot, destination: ComponentSlot) {
            // source : SequenceCompoennt
            // destination : 
            const sourceConfiguration: ComponentConfiguration | undefined = getConfigurationOf(source.targetComponent.constructor as Class<SketchComponent<unknown>>);
            const destinationConfiguration: ComponentConfiguration | undefined = getConfigurationOf(destination.targetComponent.constructor as Class<SketchComponent<unknown>>);
            
            if (sourceConfiguration != undefined && destinationConfiguration != undefined)
            {
                // check the types of slots
                if (source.type === 'input' || destination.type === 'output' || source.targetUI == destination.targetUI)
                {
                    console.error("The creation of link has failed");
                }
                else
                {
                    if (destinationConfiguration.acceptedTypes && sourceConfiguration.returnedType)
                    {
                        if (destinationConfiguration.acceptedTypes.includes(sourceConfiguration.returnedType))
                        {
                            // creation of the link between the two components
                            if (!this.workflow.createLinkBetween(source.targetComponent, destination.targetComponent))
                            {
                                console.error("Error during the creation of link.");
                            }
                            else
                            {
                                // create the arrow
                                console.log("Link created");
                            }
                        }
                        else
                        {
                            console.error("Cannot create a link between the two components.");
                        }
                    }
                    else
                    {
                            console.error("Cannot create a link between the two components.");
                    }
                }

                source.isSelected = false;
                destination.isSelected = false;
            }
        },

        setSelectedComponent(component: SketchComponent<unknown>)
        {
            this.selectedComponent = component;
        }
    }
})

</script>

<style>
    #sketch-board
    {
        width: calc(100%/4*3);
        height: 100%;
        background-color: gray;
    }

    #sketch-board:hover
    {
        cursor: pointer;
    }

</style>
