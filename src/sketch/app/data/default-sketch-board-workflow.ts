import { ArrayStack, Stack } from "@/sketch/api/data-structure";
import SketchComponent from "@/sketch/api/sketch-component";
import sketchComponent from "@/sketch/api/sketch-component";
import SketchExecutionException from "@/sketch/api/sketch-execute-error";
import { SketchBoardWorkflow, SketchBoardWorkflowExecutionError } from "./sketch-board-workflow";

/**
 * @author Dorian TERBAH
 *
 * @version 1.0
 *
 * This class has to manage a workflow of sketch component.
 */
export default class DefaultSketchBoardWorkflow implements SketchBoardWorkflow {
    /**
     * Root nodes of this workflow.
     */
    private roots: Array<SketchWorkflowNode>;

    /**
     * Default constructor
     */
    constructor()
    {
        this.roots = [];
    }

    insert(component: sketchComponent<unknown>): void {
        this.roots.push(new SketchWorkflowNode(component));
    }

    createLinkBetween(from: sketchComponent<unknown>, to: sketchComponent<unknown>): boolean {
        let fromNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(from);
        let toNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(to);

        if (fromNode == undefined && toNode == undefined)
        {
            fromNode = new SketchWorkflowNode(from);
            toNode = fromNode.insertChild(to);
            this.roots.push(fromNode);
        }
        else if (fromNode != undefined && toNode == undefined)
        {
            toNode = fromNode.insertChild(to);
        }
        else if (fromNode == undefined)
        {
            if (toNode)
            {
                const parent: SketchWorkflowNode | undefined = toNode.getParent();
                if (parent != undefined)
                {
                    return false;
                }
            }

            const index: number = this.roots.indexOf(toNode as SketchWorkflowNode);
            this.roots.splice(index, 1);
            fromNode = new SketchWorkflowNode(from);
            fromNode.getChildren().push(toNode as SketchWorkflowNode);
            toNode?.setParent(fromNode);
            this.roots.push(fromNode);
        }
        else
        {
            if (toNode?.getParent() != undefined)
            {
                return false;
            }

            if (this.__existsLinkBetweenNodes(fromNode, toNode as SketchWorkflowNode) || this.__existsLinkBetweenNodes(toNode as SketchWorkflowNode, fromNode))
            {
                // the two nodes are existing
                return false;
            }
            
            const index: number = this.roots.indexOf(toNode as SketchWorkflowNode);
            this.roots.splice(index, 1);
            fromNode.getChildren().push(toNode as SketchWorkflowNode);
            toNode?.setParent(fromNode);
        }

        return true

    }
    deleteSketchComponent(component: sketchComponent<unknown>): void {
        const node: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(component);
        if (node != undefined)
        {
            const parent: SketchWorkflowNode | undefined = node.getParent();
            if (parent != undefined)
            {
                const index: number = parent.getChildren().indexOf(node);
                parent.getChildren().splice(index, 1);
            }
            else
            {
                const index: number = this.roots.indexOf(node);
                this.roots.splice(index, 1);
                for (const child of node.getChildren())
                {
                    child.setParent(undefined);
                    this.roots.push(child);
                }
            }
        }
    }

    deleteLink(from: sketchComponent<unknown>, to: sketchComponent<unknown>): void {
        const fromNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(from);
        const toNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(to);

        if (fromNode != undefined && toNode != undefined)
        {
            const index: number = fromNode.getChildren().indexOf(toNode);
            fromNode.getChildren().splice(index, 1);
            toNode.setParent(undefined);
            this.roots.push(toNode);
        }
    }

    execute(component: sketchComponent<unknown>): void {
        const node: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(component);
        if (node == undefined)
        {
            throw new SketchBoardWorkflowExecutionError("Component not found.");
        }

        const nodes: Stack<SketchWorkflowNode> =  new ArrayStack();
        let parent: SketchWorkflowNode | undefined = node.getParent();

        nodes.push(node);

        while (parent != undefined)
        {
            nodes.push(parent);
            parent = parent.getParent();
        }

        // execute the nodes
        while (!nodes.isEmpty())
        {
            const currentNode: SketchWorkflowNode = nodes.pop() as SketchWorkflowNode;
            let payload: unknown;
            const currentComponent: SketchComponent<unknown> = currentNode.getComponent();

            try
            {
                payload = currentComponent.execute();
            }
            catch (error)
            {
                const exception: SketchExecutionException = error as SketchExecutionException;
                throw new SketchBoardWorkflowExecutionError(exception.message);
            }

            console.log(payload);

            // spread the payload to the children
            for (const child of currentNode.getChildren())
            {
                child.getComponent().onPayload(payload);
            }
        }
    }

    clear(): void {
        this.roots = [];
    }

    private findNodeAssociatedTo(component: SketchComponent<unknown>) : SketchWorkflowNode | undefined {
        for (const root of this.roots) {
            const node: SketchWorkflowNode | undefined = root.findAssociatedNodeTo(component);
            if (node)
            {
                return node;
            }
        }

        return undefined;
    }

    private __existsLinkBetweenComponents(from: SketchComponent<unknown>, to: SketchComponent<unknown>): boolean {
        const fromNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(from);
        const toNode: SketchWorkflowNode | undefined = this.findNodeAssociatedTo(to);
        if (toNode == undefined || fromNode == undefined)
        {
            return false;
        }

        return this.__existsLinkBetweenNodes(fromNode, toNode);
    }

    private __existsLinkBetweenNodes(from: SketchWorkflowNode, to: SketchWorkflowNode): boolean {
        const children: Array<SketchWorkflowNode> = from.getChildren();
        for (const child of children)
        {
            if (child == to)
            {
                return true;
            }

            const result: boolean = this.__existsLinkBetweenNodes(child, to);
            if (result)
            {
                return true;
            }
        }

        return false;
    }
}

class SketchWorkflowNode {
    
    /**
     * The children of this node.
     */
    private children: Array<SketchWorkflowNode>

    /**
     * The associated sketch component of this node.
     */
    private component: SketchComponent<unknown>

    /**
     * Parent of this node.
     */
    private parent: SketchWorkflowNode | undefined;

    /**
     * Create a new node that stored a sketch component. The node has also its node parent.
     * @param component The sketch component stored by this node.
     * @param parent The parent of this node.
     */
    constructor(component: SketchComponent<unknown>, parent?: SketchWorkflowNode)
    {
        this.children = [];
        this.component = component;
        this.parent = parent ?? undefined;
    }

    /**
     * Set the parent of his node.
     * @param parent The new parent.
     */
    setParent(parent: SketchWorkflowNode | undefined)
    {
        this.parent = parent;
    }

    /**
     * @returns The parent of this node.
     */
    getParent(): SketchWorkflowNode | undefined {
        return this.parent;
    }

    /**
     * @returns The associated sketch componen of this node.
     */
    getComponent(): SketchComponent<unknown> {
        return this.component;
    }

    /**
     * @returns The children associated to this node.
     */
    getChildren(): Array<SketchWorkflowNode> {
        return this.children;
    }

    /**
     * Insert a enw child inside the current node.
     * @param component The associated component to the new child.
     * @returns The created child.
     */
    insertChild(component: SketchComponent<unknown>) {
        const node: SketchWorkflowNode = new SketchWorkflowNode(component);
        this.children.push(node);
        return node;
    }

     /**
       * Find a node that stored the component.
       * @param component The component to search.
       * @return <code>null</code> if none node contains the component, else the corresponding node.
       */
    findAssociatedNodeTo(component: SketchComponent<unknown>): SketchWorkflowNode | undefined {
        if (this.component == component)
        {
            return this;
        }
        else
        {
            if (this.children.length == 0) 
            {
                return undefined;
            }

            for (const child of this.children)
            {
                const result: SketchWorkflowNode | undefined = child.findAssociatedNodeTo(component);
                if (result)
                {
                    return result;
                }
            }
        }

        return undefined;
    }
}