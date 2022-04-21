<template>
    <div>
        <b-modal
            v-model="$props.isOpen"
            @hidden="closePopup"
            title="Sequence component configuration"
        >
            <b-container fluid>
                <b-row>
                    <b-form-group
                        label="Sequence start :"
                    >
                        <b-form-input type="number" v-model="data.begin"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Sequence end :"
                    >
                        <b-form-input type="number" v-model="data.end"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Sequence step :"
                    >
                        <b-form-input type="number" v-model="data.step"></b-form-input>
                    </b-form-group>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script lang="ts">

import { SequenceComponent, SequenceData } from '../../math/sequence-component';
import { defineComponent, PropType, Ref, ref } from 'vue'

export default defineComponent({
    name: 'NumberInputComponent',
    props: {
        isOpen: {
            required: true,
            type: Boolean
        },
        component: {
            required: true,
            type: Object as PropType<SequenceComponent>
        }
    },

    setup()
    {
        let data: Ref<SequenceData> = ref({
            begin: 0,
            end: 0,
            step: 0
        });

        return { data };
    },

    methods: {
        closePopup()
        {
            this.$props.component.updateData(this.data);
            this.$emit('on-close');
        }
    }
});

</script>
