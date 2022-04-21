import SketchComponent from "@/sketch/api/sketch-component"

export type ComponentSlot = {
    targetComponent: SketchComponent<unknown>;
    isSelected: boolean;
    type: 'output' | 'input';
    targetUI: unknown;
}