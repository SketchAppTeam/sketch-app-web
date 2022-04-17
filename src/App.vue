<template>
    <div class="d-flex justify-content-start" id="main">
        <SketchComponentTreeView :board-manager="boardManager" />
        <SketchBoard :board-manager="boardManager" />
    </div>
</template>

<script lang="ts">

import SketchComponentTreeView from '@/sketch/app/ui/sketch-component-tree-view.vue';
import { defineComponent } from '@vue/runtime-core';
import SketchBoardManager from './sketch/app/core/sketch-board-manager';
import SketchBoard from '@/sketch/app/ui/sketch-board.vue';

export default defineComponent({
    name: 'App',
    components: {
        SketchComponentTreeView,
        SketchBoard
    },
    setup()
    {
        const boardManager: SketchBoardManager = new SketchBoardManager();

        return { boardManager };
    }
});
</script>

<style>

html, #main
{
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>
