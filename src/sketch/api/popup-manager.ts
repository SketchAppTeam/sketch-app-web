import SketchComponent from "./sketch-component";
import { Class } from "./types";

// Number component
import { NumberInputComponent } from "../natif-components/number-input-component";
import NumberInputComponentVue from "@/sketch/natif-components/ui/number-input-component-popup.vue";

// Sequence component
import { SequenceComponent } from "../natif-components/math/sequence-component";
import SequenceComponentVue from '@/sketch/natif-components/ui/math/sequence-component-popup.vue';

const popups: Map<Class<SketchComponent<unknown>>, object> = new Map();

popups.set(NumberInputComponent, NumberInputComponentVue);
popups.set(SequenceComponent, SequenceComponentVue);

export function getPopupByComponent(componentClass: Class<SketchComponent<unknown>>)
{
    return popups.get(componentClass);
}