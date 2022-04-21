<template>
    <div ref="ui">
        <Vue3DraggableResizable class="component-ui text-center noselect border-0"
            :initW="position.width"
            :initH="position.height"
            v-model:x="position.x"
            v-model:y="position.y"
            v-model:w="position.width"
            v-model:h="position.height"
            :active="true"
            :draggable="true"
            :resizable="true"
            @contextmenu.prevent="openConfigurePopup"
            @click="selectComponent"
        >
            <div class="table border-0">            
                <div 
                    v-if="configuration.acceptedTypes" 
                    class="row-fluid" 
                    @click="selectSlot(inputSlot)">
                    <div 
                        class="slot"
                        :class="{ 'selected-slot': inputSlot.isSelected, 'unselected-slot': !inputSlot.isSelected}"
                    >
                        <pre></pre>
                    </div>
                </div>
                <div class="row-fluid">
                    <span class="align-text-bottom noselect">{{ configuration.componentName }}</span>
                    <br/>
                    <fa icon="play" @click="askForExecution" class="green-on-hover"/>
                </div>

                <div v-if="configuration.returnedType" class="row-fluid" @click="selectSlot(outputSlot)">
                    <div
                        class="slot"
                        :class="{ 'selected-slot': outputSlot.isSelected, 'unselected-slot': !outputSlot.isSelected}"
                    >
                        <pre></pre>
                    </div>
                </div>

            </div>
            
        </Vue3DraggableResizable>
        <component
            :is="popup"
            :isOpen="show"
            :component="$props.component"
            @on-close="closeConfigurePopup"
        >
        </component>
    </div>
</template>

<script lang="ts">

import ComponentConfiguration from '@/sketch/api/component-config';
import { getPopupByComponent } from '@/sketch/api/popup-manager';
import SketchComponent from '@/sketch/api/sketch-component';
import { Class } from '@/sketch/api/types';
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { ComponentSlot } from './type';

type ComponentUIConfig = {
    x: number;
    y: number;
    height: number;
    width: number
};

export default defineComponent({
    name: 'SketchComponentUI',
    components: {
        Vue3DraggableResizable
    },
    setup (props)
    {
        const position = ref<ComponentUIConfig>({
            x: props.componentX,
            y: props.componentY,
            height: 120,
            width: 120
        });

        let show = ref<boolean>(false);
        let showContextMenu = ref<boolean>(true);
        const popup = getPopupByComponent(props.component.constructor as Class<SketchComponent<unknown>>);

        // slots 
        const inputSlot = ref({
            targetComponent: props.component,
            isSelected: false,
            type: 'input',
            targetUI: null
        });

        const outputSlot = ref({
            targetComponent: props.component,
            isSelected: false,
            type: 'output',
            targetUI: null
        });

        let ui = ref(null);

        onMounted(() => {
            inputSlot.value.targetUI = ui.value; 
            outputSlot.value.targetUI = ui.value;
        });

        return { position, show, popup, showContextMenu, inputSlot, outputSlot, ui };
    },  
    props: {
        component: {
            required: true,
            type: Object as PropType<SketchComponent<unknown>>
        },
        configuration: {
            required: true,
            type: Object as  PropType<ComponentConfiguration>
        },
        componentX: {
            required: true,
            type: Number
        },
        componentY: {
            required: true,
            type: Number
        }
    },
    methods: {
        openConfigurePopup()
        {
            this.show = true;
        },
        closeConfigurePopup()
        {
            this.show = false;
        },
        askForExecution()
        {
            console.log("execute");
        },
        selectComponent()
        {
            this.$emit('on-select-component', this.component);
        },
        selectSlot(slot: ComponentSlot)
        {
            this.$emit('on-select-slot', slot);
        },
    }
});

</script>

<style scoped>
    .component-item
    {
        height: 100%;
    }

/* https://stackoverflow.com/questions/22196587/how-to-vertically-center-a-container-in-bootstrap */
.table{
    height:100%;
    display:table;
    width: 100%;
    padding: 0;
}

.row-fluid {height: 100%; display:table-cell; vertical-align: middle;}

.centering {
    float: none;
    margin: 0 auto;
}

.unselected-slot
{
    background-color: black;
}

.slot:hover, .selected-slot
{
    background-color: red;
}
</style>