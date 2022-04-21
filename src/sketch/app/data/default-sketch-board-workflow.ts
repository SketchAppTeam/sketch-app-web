import sketchComponent from "@/sketch/api/sketch-component";
import { SketchBoardWorkflow } from "./sketch-board-workflow";

export default class DefaultSketchBoardWorkflow implements SketchBoardWorkflow {
    insert(component: sketchComponent<unknown>): void {
        throw new Error("Method not implemented.");
    }
    createLinkBetween(from: sketchComponent<unknown>, to: sketchComponent<unknown>): boolean {
        throw new Error("Method not implemented.");
    }
    deleteSketchComponent(component: sketchComponent<unknown>): void {
        throw new Error("Method not implemented.");
    }
    deleteLink(from: sketchComponent<unknown>, to: sketchComponent<unknown>): void {
        throw new Error("Method not implemented.");
    }
    execute(component: sketchComponent<unknown>): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    
}