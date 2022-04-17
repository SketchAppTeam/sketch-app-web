<template>
    <div>
        <b-modal
            v-model="$props.isOpen"
            @hidden="closePopup"
        >
            <b-container fluid>
                <b-row>
                    <b-form-input type="number" v-model="value"></b-form-input>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script lang="ts">

import { NumberInputComponent } from '@/sketch/natif-components/number-input-component';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'NumberInputComponent',
    props: {
        isOpen: {
            required: true,
            type: Boolean
        },
        component: {
            required: true,
            type: Object as PropType<NumberInputComponent>
        }
    },

    setup()
    {
        let value = 0;

        return { value };
    },

    methods: {
        closePopup()
        {
            this.component.setValue(this.value);
            this.$emit('on-close');
        }
    }
});

</script>
