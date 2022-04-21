import SketchComponent from "@/sketch/api/sketch-component"

export class ComponentSlot {
    targetComponent: SketchComponent<unknown>;

    isSelected: boolean;

    type: 'output' | 'input';

    targetUI: HTMLElement | undefined;

    slotUI: HTMLElement | undefined;

    constructor(targetComponent: SketchComponent<unknown>, isSelected: boolean, type: 'input' | 'output')
    {
        this.targetComponent = targetComponent;
        this.isSelected = isSelected;
        this.type = type;
    }
}