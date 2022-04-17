import SketchComponent from "./sketch-component";
import { Class } from "./types";

import { NumberInputComponent } from "../natif-components/number-input-component";
import NumberInputComponentVue from "@/sketch/natif-components/ui/number-input-component-popup.vue";

const popups: Map<Class<SketchComponent<unknown>>, object> = new Map();

popups.set(NumberInputComponent, NumberInputComponentVue);

export function getPopupByComponent(componentClass: Class<SketchComponent<unknown>>)
{
    return popups.get(componentClass);
}