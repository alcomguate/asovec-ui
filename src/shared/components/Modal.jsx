import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalComponent = ({ show, onClose, children, title = "Modal Title", size = "" }) => {
    if (!show) return null; // No mostrar el modal si `show` es false

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className={`modal-dialog ${size ? `modal-${size}` : ''}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
