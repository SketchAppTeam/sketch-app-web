import ComponentConfiguration from '../api/component-config';
import SketchComponent from '../api/sketch-component';
import SketchWrapper from '../api/sketch-wrapper';

/**
 * @author Dorian TERBAH
 * 
 * This component is a basic one that will display a popup
 * to configure a number value.
 * 
 * @since 1.0
 */
export class NumberInputComponent extends SketchComponent<number>
{
    private dataWrapper: SketchWrapper<number>;

    constructor()
    {
        super();
        this.dataWrapper = new SketchWrapper();
    }

    public setValue(value: number): void
    {
        console.log(value);
        this.dataWrapper.setData(value);
    }

    public execute(): number
    {
        return 10;
    }

    public copy(): SketchComponent<number>
    {
        const component: NumberInputComponent = new NumberInputComponent();
        if (component.dataWrapper.isDataAvailable())
        {
            component.dataWrapper.setData(this.dataWrapper.getData() as number);
        }
        return component;    
    }

    public onPayload(payload: never): void {
        // do nothing
    }
}

export const configuration: ComponentConfiguration = {
    libraryName: 'Common/Input component',
    componentName: 'Number Input',
    returnedType: Number,
};
