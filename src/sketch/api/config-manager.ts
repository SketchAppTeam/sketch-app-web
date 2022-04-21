import ComponentConfiguration from "./component-config";
import SketchComponent from "./sketch-component";
import { Class } from "./types";

// import of the differents components / configurations

import { NumberInputComponent, configuration as numberInputConfiguration } from "../natif-components/number-input-component";
import { SequenceComponent, configuration as sequenceConfiguration } from "../natif-components/math/sequence-component";

const configurations: Map<Class<SketchComponent<unknown>>, ComponentConfiguration> = new Map<Class<SketchComponent<unknown>>, ComponentConfiguration>();

// register all components with their corresponding com

configurations.set(NumberInputComponent, numberInputConfiguration);
configurations.set(SequenceComponent, sequenceConfiguration);

export function getConfigurationOf(componentClass: Class<SketchComponent<unknown>>)
{
    return configurations.get(componentClass);
}

export function getConfigurations()
{
    return configurations;
}

export function acceptForComponent(componentClass: Class<SketchComponent<unknown>>, clazz: Class<unknown>) : boolean
{
    const config: ComponentConfiguration | null | undefined = getConfigurationOf(componentClass);
    if (config)
    {
        const acceptedTypes = config.acceptedTypes;
        return acceptedTypes?.includes(clazz) ?? false;
    }

    return false;
}