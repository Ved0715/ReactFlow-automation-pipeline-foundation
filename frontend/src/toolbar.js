// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfig } from './nodes/nodeConfig';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px'}}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' , backgroundColor:'#f9fafb', padding:'10px 22px', border:'1px solid #dcdde0', borderRadius:'8px'}}>
                <DraggableNode type='customInput' label='Input' icon={nodeConfig.customInput.icon} />
                <DraggableNode type='llm' label='LLM' icon={nodeConfig.llm.icon} />
                <DraggableNode type='customOutput' label='Output' icon={nodeConfig.customOutput.icon} />
                <DraggableNode type='text' label='Text' icon={nodeConfig.text.icon} />
                <DraggableNode type='filter' label='Filter' icon={nodeConfig.filter.icon} />
                <DraggableNode type='transform' label='Transform' icon={nodeConfig.transform.icon} />
                <DraggableNode type='condition' label='Condition' icon={nodeConfig.condition.icon} />
                <DraggableNode type='aggregate' label='Aggregate' icon={nodeConfig.aggregate.icon} />
                <DraggableNode type='api' label='API' icon={nodeConfig.api.icon} />
                <DraggableNode type='test' label='Test' icon={nodeConfig.test.icon} />
            </div>
        </div>
    );
};
