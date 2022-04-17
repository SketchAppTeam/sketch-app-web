import { Class } from "./types";

type ComponentConfiguration = {
    componentName: string;
    libraryName: string;
    acceptedTypes?: Array<Class<unknown>>;
    returnedType?: Class<unknown>;
};

export default ComponentConfiguration;