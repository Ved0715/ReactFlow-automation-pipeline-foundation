import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { nodeConfig } from '../nodes/nodeConfig';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const NodeMentionsInput = ({ value, onChange, onConnect, sourceId, targetHandle, placeholder }) => {
  const { nodes } = useStore((state) => ({
    nodes: state.nodes,
  }), shallow);

  const suggestions = nodes
    .filter(node => node.id !== sourceId)
    .map(node => ({
      id: node.id,
      display: node.data?.name || node.id,
      type: node.type,
    }));

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    onChange(newValue);
  };

  const handleAdd = (id, display) => {
    if (onConnect && sourceId) {
      const sourceNode = nodes.find(n => n.id === id);
      if (!sourceNode) return;

      const sourceNodeConfig = nodeConfig[sourceNode.type];
      if (!sourceNodeConfig) return;

      const sourceHandle = sourceNodeConfig.handles.find(h => h.type === 'source')?.id;
      const finalTargetHandle = targetHandle || 'input';

      if (sourceHandle) {
        onConnect({
          source: id,
          sourceHandle: sourceHandle,
          target: sourceId,
          targetHandle: finalTargetHandle
        });
      }
    }
  };

  // Custom renderer for dropdown items
  const renderSuggestion = (suggestion, search, highlightedDisplay, index, focused) => {
    const config = nodeConfig[suggestion.type];
    const Icon = config?.icon;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: focused ? '#f3f4f6' : 'white',
        cursor: 'pointer',
        borderLeft: focused ? '3px solid #6366f1' : '3px solid transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={16} color="#4b5563" />}
          <span style={{ 
            color: '#1f2937',
            fontWeight: 500,
            fontSize: '14px'
          }}>
            {suggestion.display}
          </span>
        </div>
        <span style={{
          fontSize: '11px',
          color: '#6b7280',
          backgroundColor: '#f3f4f6',
          padding: '2px 6px',
          borderRadius: '4px',
          textTransform: 'capitalize'
        }}>
          {config?.title || suggestion.type}
        </span>
      </div>
    );
  };

  const defaultStyle = {
    control: {
      backgroundColor: '#fff',
      fontSize: 14,
      fontWeight: 'normal',
      minHeight: 80,
      borderRadius: 4,
      border: '1px solid #e5e7eb',
    },
    
    '&multiLine': {
      control: {
        fontFamily: 'inherit',
        minHeight: 80,
      },
      highlighter: {
        padding: 9,
        border: '1px solid transparent',
      },
      input: {
        padding: 9,
        border: '1px solid transparent',
        outline: 'none',
      },
    },

    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        fontSize: 14,
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 1000,
        overflow: 'hidden',
        marginTop: '4px',
      },
      item: {
        padding: 0,
        borderBottom: '1px solid #f3f4f6',
        '&focused': {
          backgroundColor: '#f3f4f6',
        },
      },
    },
  };

  const mentionStyle = {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: 4,
    padding: '2px 4px',
    fontWeight: 500,
    zIndex: 1,
    position: 'relative',
    display: 'inline-block',
  };

  return (
    <MentionsInput
      value={value}
      onChange={handleChange}
      style={defaultStyle}
      placeholder={placeholder || "Type {{ to see available nodes..."}
      className="node-mentions-input"
    >
      <Mention
        trigger="{{"
        data={suggestions}
        onAdd={handleAdd}
        style={mentionStyle}
        markup="{{__id__}}"
        displayTransform={(id, display) => `{{${display}}}`}
        renderSuggestion={renderSuggestion}
      />
    </MentionsInput>
  );
};

export default NodeMentionsInput;
