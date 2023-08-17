import React, { ChangeEvent } from 'react';
import './header.css';
interface ResumeBoardHeadProps {
    parentWidth: string;
}

const ResumeBoardHead: React.FC<ResumeBoardHeadProps> = ({ parentWidth }) => {
    return (
        <div className="component-header" style={{ width: parentWidth }}>
            <div className="page-label">
                <h5>Accueil</h5>
            </div>
        </div>
    );
};

export default ResumeBoardHead;
