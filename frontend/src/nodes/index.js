import { createNodeFromConfig } from './nodeFactory';
import { nodeConfig } from './nodeConfig';

export const InputNode = createNodeFromConfig(nodeConfig.customInput)
export const OutputNode = createNodeFromConfig(nodeConfig.customOutput)
export const LLMNode = createNodeFromConfig(nodeConfig.llm)
export const TextNode = createNodeFromConfig(nodeConfig.text)
export const FilterNode = createNodeFromConfig(nodeConfig.filter)
export const TransformNode = createNodeFromConfig(nodeConfig.transform)
export const ConditionNode = createNodeFromConfig(nodeConfig.condition)
export const AggregateNode = createNodeFromConfig(nodeConfig.aggregate)
export const ApiNode = createNodeFromConfig(nodeConfig.api)
export const TestNode = createNodeFromConfig(nodeConfig.test)
