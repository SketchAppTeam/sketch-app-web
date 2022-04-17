import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from "@/sketch/api/types";

/**
 * @author Dorian Terbah
 *
 * @version 1.0
 *
 * Manage the main sketch board of the application.
 */
export default class SketchBoardManager
{
    private selectedComponent?: Class<SketchComponent<unknown>>;

    constructor()
    {
        this.selectedComponent = undefined;
    }

    public setSelectedComponent(componentClass: Class<SketchComponent<unknown>>)
    {
        this.selectedComponent = componentClass;
    }

    public getAndRemoveComponentClass(): Class<SketchComponent<unknown>> | undefined
    {
        const componentClass: Class<SketchComponent<unknown>> | undefined = this.selectedComponent;
        this.selectedComponent = undefined;
        return componentClass;
    }
}