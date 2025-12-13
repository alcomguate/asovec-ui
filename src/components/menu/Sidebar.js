import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppIcon from "../../AppIcon";

const Sidebar = () => {

    return (
        <div className="d-flex">
            {/* Contenedor del menú lateral */}
            <div
                className="bg-light border"
                style={{
                    width: "250px",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflowY: "auto",
                }}
            >
                <AppIcon
                    iconSrc="https://via.placeholder.com/150" // URL o ruta local del ícono
                    appName="ASOVEC"
                    size={150} // Tamaño del ícono en píxeles
                />
                <h4 className="p-3 text-center">Menú</h4>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <a href="#home" className="text-decoration-none text-dark">
                            Inicio
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="/inmueble" className="text-decoration-none text-dark">
                            Inmuebles
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="#about" className="text-decoration-none text-dark">
                            Acerca de
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="#contact" className="text-decoration-none text-dark">
                            Contacto
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Sidebar;