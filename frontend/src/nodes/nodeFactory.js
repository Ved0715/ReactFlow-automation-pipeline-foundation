import { BaseNode } from './baseNode';

export const createNodeFromConfig = (config) => {
  return ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
  };
};