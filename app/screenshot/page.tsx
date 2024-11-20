"use client";

import html2canvas from "html2canvas";
import React from "react";
import { Row, Col } from 'react-bootstrap';

export default function ImageCopyToClipboard() {
    const handleCaptureAndCopy = async () => {
        const content = document.getElementById('content-to-copy');

        if (!content) return;

        // Create a temporary element to render the content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content.innerHTML;
        tempElement.style.cssText = content.style.cssText;
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        document.body.appendChild(tempElement);

        // Wait for the element to render
        await new Promise(resolve => setTimeout(resolve, 100));

        // Capture the screenshot
        html2canvas(tempElement).then(canvas => {
            canvas.toBlob(blob => {
                if (blob) {
                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]);
                }
            });
            // Clean up the temporary element
            document.body.removeChild(tempElement);
        });
    };

    return (
        <div>
            <Row>
                <Col md="12">
                    <div id="content-to-copy" style={{width:"200px", color:"red", wordWrap: "break-word"}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil nobis
                        unde exercitationem distinctio! Deleniti quisquam nostrum minus
                        debitis possimus numquam! Veritatis velit cumque autem labore ipsa
                        maiores ab numquam dolore vitae, accusantium explicabo, nihil soluta
                        enim possimus rerum, earum voluptatum ratione. Autem aliquid
                        accusantium quam quis, obcaecati nostrum cupiditate. Quas?
                    </div>
                </Col>
            </Row>
            <button onClick={handleCaptureAndCopy}>Copy Screenshot</button>
        </div>
    );
}
