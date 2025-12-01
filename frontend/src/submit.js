import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. Please check if the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    backgroundColor: '#6563e3',
                    color: '#ffffff',
                    padding: '12px 32px',
                    border: '2px solid #6366f2',
                    borderRadius:'6px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize:'16px',
                    opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#6f62f2')}
                onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#6366f2')}
            >
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>

            {result && (
                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600}}>Nodes</span>
                        <span style={{fontSize: '24px', fontWeight: 700, color: '#4f46e5'}}>{result.num_nodes}</span>
                    </div>
                    
                    <div style={{width: '1px', height: '40px', backgroundColor: '#e5e7eb'}}></div>

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600}}>Edges</span>
                        <span style={{fontSize: '24px', fontWeight: 700, color: '#4f46e5'}}>{result.num_edges}</span>
                    </div>

                    <div style={{width: '1px', height: '40px', backgroundColor: '#e5e7eb'}}></div>

                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600}}>Is DAG?</span>
                        <span style={{
                            fontSize: '16px', 
                            fontWeight: 600, 
                            color: result.is_dag ? '#059669' : '#dc2626',
                            backgroundColor: result.is_dag ? '#d1fae5' : '#fee2e2',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            marginTop: '4px'
                        }}>
                            {result.is_dag ? 'Yes' : 'No'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
