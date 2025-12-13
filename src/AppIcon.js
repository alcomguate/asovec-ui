import React from "react";

const AppIcon = ({ iconSrc, appName, size = 100, onClick }) => {
    return (
        <div className="d-flex flex-column align-items-center" 
            onClick={onClick} // Agregar la función onClick aquí
            style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clicable
        >
            {/* Imagen del ícono */}
            <img
                src={iconSrc}
                alt={`${appName} Icon`}
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            />
        </div>
    );
};

export default AppIcon;
