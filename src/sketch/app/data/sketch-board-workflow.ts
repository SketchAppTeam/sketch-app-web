import SketchComponent from "@/sketch/api/sketch-component";

/**
 * @author Dorian TERBAH
 * 
 * Interface that represents a workflow of sketch components.
 * 
 * @since 1.0
 */
export interface SketchBoardWorkflow {

    /**
     * Insert a component in the workflow.
     * @param component The component to insert.
     */
    insert(component: SketchComponent<unknown>): void;
    
    /**
     * Create a link between two sketch components.
     * @param from The source of the link.
     * @param to The destination of the link.
     * @return <code>true</code> if the link is successfully created, else false.
     */
    createLinkBetween(from: SketchComponent<unknown>, to: SketchComponent<unknown>): boolean;
    
    /**
     * Delete a sketch component of the workflow.
     * @param component The component to remove.
     */
    deleteSketchComponent(component: SketchComponent<unknown>): void;

     /**
     * Delete the link between two components.
     * @param from The source component.
     * @param to The destination component.
     */
    deleteLink(from: SketchComponent<unknown>, to: SketchComponent<unknown>): void;
    
    /**
     * Execute a component.
     * @param component The component to execute.
     * @throws SketchBoardWorkflowExecutionError If the execution of the component has failed.
     */
    execute(component: SketchComponent<unknown>): void;

    /**
     * Clear the workflow.
     */
    clear(): void;
}

/**
     * @author Dorian TERBAH
     *
     * Exception thrown when there was a problem during the execution of a component.
     *
     * @since 1.0
     */
export class SketchBoardWorkflowExecutionError extends Error
{
    /**
     * Create a new SketchBoardWorkflowExecutionException.
     * @param message The message of the exception.
     */
    constructor(message: string)
    {
        super(message);
    }
}