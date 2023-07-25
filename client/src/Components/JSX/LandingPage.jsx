import React from "react";
import { Link } from 'react-router-dom';
import '../CSS/LandingPage.module.css';

export default function LandingPage() {
  return (
    <div>
      <h1>¡Cualquiera puede cocinar! ¿Estás listo para demostrarlo?</h1>
      <Link to='/home/'>
        <button>Ingresa aquí 😃</button>
      </Link>
    </div>
  )
}