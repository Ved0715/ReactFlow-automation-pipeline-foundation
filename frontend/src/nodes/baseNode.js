import { useState } from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import NodeMentionsInput from '../components/NodeMentionsInput';


export const BaseNode = ({ id, data, config}) => {
    const { updateNodeName, updateNodeField, onConnect } = useStore((state) => ({
        updateNodeName: state.updateNodeName,
        updateNodeField: state.updateNodeField,
        onConnect: state.onConnect
    }), shallow);

    const [isHovered, setIsHovered] = useState(false);
    const [nameError, setNameError] = useState('');
    const [fieldValues, setFieldValues] = useState(() => {
        const initialState = {};
        if (config.fields) {
            config.fields.forEach(field => {
                if(field.type === 'static') return;

                const defaultValue = typeof field.defaultValue === 'function' ? field.defaultValue(id, data) : field.defaultValue;
                initialState[field.name] = data?.[field.name] ?? defaultValue;
            })
        }
        return initialState;
    })

    // const textareaRef = useRef(null); // Removed as NodeMentionsInput handles its own resizing

    // console.log(textareaRef.current)

    // const autoResize = (textarea) => { // Removed as NodeMentionsInput handles its own resizing
    //     textarea.style.height = 'auto';  
    //     textarea.style.height = textarea.scrollHeight + 'px';  
    // };

    const handleFieldChange = (fieldName, value) => {
        if (fieldName === 'name') {
            const success = updateNodeName(id, value);
            if (success) {
                setFieldValues(prev => ({ ...prev, [fieldName]: value }));
                setNameError(''); // Clear error on success
            } else {
                setNameError('Name must be unique');
            }
        } else {
            updateNodeField(id, fieldName, value);
            setFieldValues(prev => ({ ...prev, [fieldName]: value }));
        }
    }

    

    const renderField = (field, index) => {
        if(field.showIf && !field.showIf(fieldValues)) return null;

        switch(field.type) {
            case 'text':
                const isNameField = field.name === 'name';
                const hasError = isNameField && nameError;
                
                return (
                    <div key={index} style={{marginBottom: '6px'}}>
                        <input 
                            type="text"
                            value={fieldValues[field.name] || ''}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            style={{
                                width: '100%',
                                padding: '6px 8px',
                                border: hasError ? '2px solid #ef4444' : '1px solid #fff',
                                backgroundColor: hasError ? '#fee2e2' : "#dfe0f5",
                                borderRadius:'4px',
                                outline: 'none',
                                color: isHovered ? '#6563e3' : "#324154",
                                boxSizing: 'border-box',
                            }}
                        />
                        {hasError && (
                            <div style={{
                                color: '#ef4444',
                                fontSize: '12px',
                                marginTop: '4px',
                                paddingLeft: '2px'
                            }}>
                                {nameError}
                            </div>
                        )}
                    </div>

                )
            case 'textArea':
                let targetHandle = 'input';
                if (field.name === 'System Prompt') targetHandle = 'system';
                if (field.name === 'User Prompt') targetHandle = 'prompt';

                return (
                    <label key={index} style={{display: 'block', marginBottom: '2px', height:'auto'}}>
                        <div className="field-label-container">
                            <div className="field-label">
                                {field.label}
                            </div>
                            <span className="field-type-badge">
                                Text
                            </span>
                        </div>
                        <NodeMentionsInput
                            value={fieldValues[field.name] || ''}
                            onChange={(value) => handleFieldChange(field.name, value)}
                            onConnect={onConnect}
                            sourceId={id}
                            targetHandle={targetHandle}
                            placeholder={field.placeholder}
                        />
                    </label>
                )
            case 'select':
                return (
                    <label key={index} style={{display: 'block', marginBottom: '8px', marginTop:'2px'}}>
                        <div className="field-label-container">
                            <div className="field-label">
                                {field.label}
                            </div>
                            <span className="field-type-badge">
                                Dropdown
                            </span>
                        </div>
                        <select 
                            value={fieldValues[field.name] || ''}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            style={{
                                width: '100%',
                                padding:'4px 2px',
                                border: '1px solid #adacb0',
                                backgroundColor: "#fff",
                                borderRadius:'4px',
                                outline: 'none',
                                color: "#000",
                                boxSizing: 'border-box',
                                cursor: 'pointer'
                            }}
                        >
                            {field.options?.map((option, index) => (
                                <option key={index} value={option.value} style={{
                                    cursor: 'pointer'
                                }}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                )
            case 'static':
                return (
                    <label key={index}  style={{display: 'block', border:'1px solid #4238ca', padding:'6px 8px', borderRadius:'4px', backgroundColor:'#eef2ff', marginBottom: '6px'}}>
                        <span style={{
                            color:'#4238ca',
                            fontSize:'12px'
                        }}>{field.content}</span>
                    </label>
                )
            default:
                return null;
        }
    };

    const renderHandles = () => {
        return config.handles.map((handle, index) => (
            <Handle
                key={index}
                type={handle.type}
                position={handle.position}
                id={handle.id}
            />
        ))
    }








    const IconComponent = config.icon;

    // useEffect removed as autoResize is handled by NodeMentionsInput

    return (
        <div 
            style={{border: isHovered ? '2px solid #a5b4fc' : '2px solid #cdcffc' , borderRadius:'8px', width:275, backgroundColor:'#fff'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            
        >
            <div style={{ 
            border: isHovered ? '1px solid #6360de' : '1px solid #5d7f9e',
            height:'auto',
            borderRadius:'4px',
            padding: '8px 6px',
            transition: 'all 0.1s ease',
            backgroundColor:'#ffffff'
            }}>
            <div style={{width: '100%',
                border: '1px solid #abb9fc',
                borderRadius:'4px',
                padding: '6px 4px',
                marginBottom: '5px',
                boxSizing: 'border-box',
                backgroundColor: '#eef2ff',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {IconComponent && (
                        <span style={{ 
                            color: isHovered ? '#6563e3' : '#334155', 
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.1s ease'
                        }}>
                            <IconComponent />
                        </span>
                    )}
                    <span style={{
                        color: isHovered ? '#6563e3' : '#334155', 
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'all 0.1s ease'
                    }}>
                        {config.title}
                    </span>
                </div>
                <div style={{
                    fontSize: '12px',
                    fontStyle: 'italic'
                }}>
                    {config.description}
                </div>
            </div>
            <div style={{margin:'2px'}}>
                {config.fields?.map((field, index) => renderField(field, index))}
            </div>
            {renderHandles()}
        </div>

        </div>
    )
}