// nodeConfig.js
import { Position } from 'reactflow';
import { FiUpload, FiDownload, FiCpu, FiFileText, FiFilter, FiRefreshCw, FiGitBranch, FiLayers, FiCloud } from 'react-icons/fi';

export const nodeConfig = {
  customInput: {
    type: 'input',
    title: 'Input',
    description: 'Provides input data to the pipeline',
    icon: FiUpload,
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `value`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'inputType',
        label: 'Type:',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ],
        defaultValue: 'Text'
      }
    ]
  },

  customOutput: {
    type: 'output',
    title: 'Output',
    description: 'Receives output from the pipeline',
    icon: FiDownload,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `value`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'outputType',
        label: 'Type:',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' }
        ],
        defaultValue: 'Text'
      }
    ]
  },

  llm: {
    type: 'llm',
    title: 'LLM',
    description: 'Large Language Model processing',
    icon: FiCpu,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `system`,
        style: { top: `${100/3}%` }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `prompt`,
        style: { top: `${200/3}%` }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `response`
      }
      
    ],
    fields: [
    {
        type: 'text',
        name: 'name',
        label: 'LLM Name:',
        defaultValue: (id) => id
      },
      {
        type: 'static',
        content: 'This is a LLM Node'
      },
      {
        type: 'textArea',
        name: 'System Prompt',
        label: 'System (Instruction):',
        placeholder: 'Enter system instructions...'
      },
      {
        type: 'textArea',
        name: 'User Prompt',
        label: 'Prompt:',
        placeholder: 'Enter user prompt...'
      },
      {
        type: 'select',
        name: 'Model Name',
        label: 'Model:',
        options: [
          { value: 'gpt-5.1', label: 'gpt-5.1' },
          { value: 'o3-mini', label: 'o3-mini' },
          { value: 'o3', label: 'o3' },
          { value: 'gpt-5.1-codex', label: 'gpt-5.1-codex' },
          { value: 'gpt-5.1-codex-mini', label: 'gpt-5.1-codex-mini' },
        ],
        defaultValue: 'Text'
      }
    ]
  },

  text: {
    type: 'text',
    title: 'Text',
    description: 'Text content or template',
    icon: FiFileText,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: 'input'
      },
      {
        type: 'source',
        position: Position.Right,
        id: 'output'
      }
    ],
    fields: [
        {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
        {
        type: 'textArea',
        name: 'text',
        label: 'Text:',
        placeholder: 'Enter text or {{variable}}...'
      }
    ]
  },

  filter: {
  type: 'filter',
  title: 'Filter',
  description: 'Filters data based on conditions',
  icon: FiFilter,
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output'
    }
  ],
  fields: [
    {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
    {
      type: 'select',
      name: 'condition',
      label: 'Condition:',
      options: [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'startsWith', label: 'Starts With' }
      ],
      defaultValue: 'contains'
    },
    {
      type: 'text',
      name: 'value',
      label: 'Value:',
      defaultValue: ''
    }
   ]
  },
  
  transform: {
    type: 'transform',
    title: 'Transform',
    description: 'Transform and modify data',
    icon: FiRefreshCw,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `output`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'operation',
        label: 'Operation:',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'replace', label: 'Replace' },
          { value: 'split', label: 'Split' }
        ],
        defaultValue: 'uppercase'
      },
      {
        type: 'textArea',
        name: 'code',
        label: 'Transform Logic:',
        defaultValue: '// Custom transformation\nreturn value;'
      }
    ]
  },
  
  condition: {
    type: 'condition',
    title: 'Condition',
    description: 'Conditional branching logic',
    icon: FiGitBranch,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `true`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `false`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'operator',
        label: 'Operator:',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'notEquals', label: 'Not Equals' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'contains', label: 'Contains' }
        ],
        defaultValue: 'equals'
      },
      {
        type: 'text',
        name: 'value',
        label: 'Compare Value:',
        defaultValue: ''
      }
    ]
  },
  
  aggregate: {
    type: 'aggregate',
    title: 'Aggregate',
    description: 'Aggregate and combine data',
    icon: FiLayers,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `output`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'function',
        label: 'Function:',
        options: [
          { value: 'count', label: 'Count' },
          { value: 'sum', label: 'Sum' },
          { value: 'average', label: 'Average' },
          { value: 'min', label: 'Minimum' },
          { value: 'max', label: 'Maximum' },
          { value: 'concat', label: 'Concatenate' }
        ],
        defaultValue: 'count'
      },
      {
        type: 'text',
        name: 'field',
        label: 'Field:',
        defaultValue: 'value'
      }
    ]
  },
  
  api: {
    type: 'api',
    title: 'API Call',
    description: 'Make API or webhook calls',
    icon: FiCloud,
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `response`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'method',
        label: 'Method:',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ],
        defaultValue: 'GET'
      },
      {
        type: 'text',
        name: 'url',
        label: 'URL:',
        defaultValue: 'https://api.example.com',
        placeholder: 'https://api.example.com'
      },
      {
        type: 'textArea',
        name: 'headers',
        label: 'Headers (JSON):',
        defaultValue: '{\n  "Content-Type": "application/json"\n}',
        placeholder: '{"Content-Type": "application/json"}'
      }
    ]
  },

  test: {
    type: 'test',
    title: 'Test',
    description: 'Test Node',
    icon: FiUpload,
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `value`
      }
    ],
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Name:',
        defaultValue: (id) => id
      },
      {
        type: 'select',
        name: 'inputType',
        label: 'Type:',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ],
        defaultValue: 'Text'
      }
    ]
  },
};