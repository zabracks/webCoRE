import * as React from "react";

interface LogoProps {
    maxWidth?: React.CSSProperties["maxWidth"];
}

export class WebcoreLogo extends React.Component<LogoProps> {
    public render() {
        const wrapperStyle: React.CSSProperties = {
            maxWidth: this.props.maxWidth || 400,
        };

        return (
            <div style={wrapperStyle} >
                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 175.3 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 175.3 32" >
                    <g>
                        <path fill="#15BFFF" d="M132,17.2h-1.4c-0.2-0.5-0.4-1-0.6-1.4l1-1c0.4-0.4,0.4-1.1,0-1.6l-1.9-1.9c-0.4-0.4-1.1-0.4-1.6,0l-1,1   c-0.4-0.2-0.9-0.4-1.4-0.6v-1.4c0-0.6-0.5-1.1-1.1-1.1h-2.6c-0.6,0-1.1,0.5-1.1,1.1v1.4c-0.5,0.2-1,0.4-1.4,0.6l-1-1   c-0.4-0.4-1.1-0.4-1.6,0l-1.9,1.9c-0.4,0.4-0.4,1.1,0,1.6l1,1c-0.2,0.4-0.4,0.9-0.6,1.4h-1.4c-0.6,0-1.1,0.5-1.1,1.1V21   c0,0.6,0.5,1.1,1.1,1.1h1.4c0.2,0.5,0.4,1,0.6,1.4l-1,1c-0.4,0.4-0.4,1.1,0,1.6l1.9,1.9c0.4,0.4,1.1,0.4,1.6,0l1-1   c0.4,0.2,0.9,0.4,1.4,0.6v1.4c0,0.6,0.5,1.1,1.1,1.1h2.6c0.6,0,1.1-0.5,1.1-1.1v-1.4c0.5-0.2,1-0.4,1.4-0.6l1,1   c0.4,0.4,1.1,0.4,1.6,0L131,26c0.4-0.4,0.4-1.1,0-1.6l-1-1c0.2-0.4,0.4-0.9,0.6-1.4h1.4c0.6,0,1.1-0.5,1.1-1.1v-2.6   C133.1,17.7,132.6,17.2,132,17.2z M127.4,19.7c0,2.5-2.1,4.6-4.6,4.6c-2.5,0-4.6-2.1-4.6-4.6c0-2.5,2.1-4.6,4.6-4.6   C125.3,15,127.4,17.1,127.4,19.7z" />
                    </g>
                    <path fill="#333333" d="M1.7,9.9h2.6l6,14.3l6.3-14.3h0.5l6.3,14.3l6.2-14.3h2.6l-8.6,19.7h-0.5l-6.3-14.1l-6.3,14.1h-0.5L1.7,9.9z" />
                    <path fill="#333333" d="M51.9,23l2.1,1.1c-0.7,1.4-1.5,2.5-2.4,3.3c-0.9,0.8-2,1.5-3.1,1.9c-3.8,1.5-8.7,0.7-11.5-2.5  c-3.4-3.9-3.6-9.7-0.4-13.8c4-5.1,11.9-4.9,15.9,0.1c1.4,1.8,2.2,4.1,2.2,6.7H36.9c0,2.3,0.8,4.2,2.2,5.6c2.1,2.2,5.3,2.7,8.2,1.7  c0.9-0.4,1.8-0.8,2.4-1.4C50.4,25.3,51.1,24.3,51.9,23z M51.9,17.7c-0.3-1.4-0.8-2.4-1.5-3.2c-0.6-0.8-1.5-1.5-2.6-2  c-2.7-1.3-6.1-0.9-8.4,1.1c-1,0.9-1.8,2.3-2.3,4.1H51.9z" />
                    <path fill="#333333" d="M59.5,29.6V2.2h2.5v11c1.1-1.3,2.3-2.3,3.6-2.9c5.2-2.5,11.5,0.1,13.6,5.3c2.1,5,0,10.9-4.8,13.4  c-2.7,1.4-6.2,1.5-8.9,0c-1.3-0.7-2.5-1.7-3.5-3.1v3.6H59.5z M69.7,27.6c2.8,0,5.4-1.5,6.8-4c1.4-2.5,1.4-5.5,0-8  c-2.9-5.1-10.6-5.4-13.5-0.1C60,20.8,63.6,27.6,69.7,27.6z" />
                    <path fill="#15BFFF" d="M109.4,7.6l-3.6,3.4c-3.3-3.4-8.5-5.2-12.8-2.6c-4.2,2.5-5.6,8.3-3.2,12.6c0.8,1.4,1.9,2.5,3.3,3.2  c2.1,1.2,4.7,1.5,7,0.9c2.3-0.5,4.1-2,5.8-3.6l3.4,3.6c-3.3,3.2-6.9,5.1-11.6,5.1c-3.9,0-7.7-1.3-10.4-4.2c-5.8-6-4.8-16.6,2.1-21.3  c4.3-2.9,10-3.4,14.7-1.2C106.2,4.6,108,5.9,109.4,7.6z" />
                    <path fill="#15BFFF" d="M145.7,17.7c2.4,0,5.2-0.8,6.8-2.6c2-2.3,1.7-6.4,0.2-8.8c-0.8-1.2-1.8-2.1-3-2.6c-1.2-0.5-3.3-0.8-6.3-0.8  h-11.6v5h12.7c1.4,0,3.1-0.1,4,1.2c0.7,1,0.7,2.9-0.5,3.6c-0.6,0.4-1.7,0.7-3.3,0.7h-4.2v5l9.1,11.3h5.5L145.7,17.7z" />
                    <path fill="#15BFFF" d="M159.2,2.9h14.6v5h-9.5v5.7h6.4v4.9h-6.4v6.1h9.5v5h-14.6V2.9z" />
                </svg>
            </div >
        );
    }
}