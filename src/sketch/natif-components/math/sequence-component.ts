import ComponentConfiguration from "@/sketch/api/component-config";
import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";
import { NumberList } from "@/sketch/api/types";
/**
 * @author Dorian TERBAH
 * 
 * Data used by the SequenceComponent.
 * 
 * @since 1.0
 */
export type SequenceData = {
    begin: number;
    end: number;
    step: number;
}

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a number sequence 
 * between a start abnd an end with a given step.
 * 
 * @since 1.0
 */
export class SequenceComponent extends SketchComponent<NumberList>
{
    private data: SequenceData;

    constructor()
    {
        super();
        this.data = {
            begin: 0,
            end: 0,
            step: 0
        }
    }

    execute(): NumberList {
        throw new Error("Method not implemented.");
    }

    copy(): SketchComponent<NumberList> {
        const component: SequenceComponent = new SequenceComponent();
        component.data.begin = this.data.begin;
        component.data.end = this.data.end;
        component.data.step = this.data.step;

        return component;
    }

    onPayload(payload: never): void {
        if (typeof payload === "number")
        {
            this.data.begin = payload as number;
        }
    }

    updateData(data: SequenceData): void {
        this.data = data;
    }
}

export const configuration: ComponentConfiguration = {
    libraryName: 'Common/Number sequence component',
    componentName: 'Number sequence component',
    returnedType: NumberList,
    acceptedTypes: [Number]
}