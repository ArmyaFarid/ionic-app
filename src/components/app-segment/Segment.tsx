import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface SegmentProps {
    selectSegment: string;
    segments: { title: string; value: string }[];
    onSelectSegment: (segment: string) => void;
}

const Segment: React.FC<SegmentProps> = ({ selectSegment, segments, onSelectSegment }) => {
    return (
        <IonSegment value={selectSegment} scrollable>
            {segments.map((segment) => (
                <IonSegmentButton key={segment.value} value={segment.value} onClick={() => onSelectSegment(segment.value)}>
                    <IonLabel>{segment.title}</IonLabel>
                </IonSegmentButton>
            ))}
        </IonSegment>
    );
};

export default Segment;
