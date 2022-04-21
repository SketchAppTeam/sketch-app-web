<template>
    <div class="overflow-auto" style="max-height: 20%;">
        <b-button
            :class="visible ? null : 'collapsed'"
            :aria-expanded="visible ? 'true' : 'false'"
            aria-controls="collapse-4"
            @click="visible = !visible"
            style="position: absolute; z-index:1"
        >
            <span v-if="visible">
                <fa icon="angle-up" />
            </span>
            <span v-else>
                <fa icon="angle-down" />
            </span>
        </b-button>
        <b-collapse id="collapse-4" v-model="visible" class="mt-2">
            <b-card v-for="(message, index) in messages" :key="index">
                <fa v-if="message.type == 'error'" icon="circle-exclamation" style="color: red; "/>
                <fa v-if="message.type == 'warning'" icon="triangle-exclamation" style="color: orange;" />
                {{ message.message }}
            </b-card>
        </b-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import store from '@/store';

export default defineComponent({
    setup() {
        let visible = ref<boolean>(false);

        return {
            visible
        };
    },
    computed: {
        messages() {
            return store.state.messages
        }
    }
})
</script>
