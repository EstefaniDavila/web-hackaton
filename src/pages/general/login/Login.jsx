import React, { useState, useContext } from 'react';
import UserContext from './../../../providers/UserContext';
import { Colors } from '@/lib/colors';

const Login = () => {
  const [credentials, setCredentials] = useState({ document_number: '', password: '' });
  const { loginUser } = useContext(UserContext);

  const [isHovered, setIsHovered] = useState(false);
  const [documentFocus, setDocumentFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: Colors.pearl
    }}>
      {/* Panel izquierdo - Logo y nombre CON COLOR AMARILLO */}
      <div style={{
        flex: 1,
        backgroundColor: Colors.secondary, // Color amarillo de la paleta
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        color: Colors.night // Texto oscuro para contraste con amarillo
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          {/* Logo */}
          <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: Colors.primary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            border: `4px solid ${Colors.night}`, // Borde oscuro
            boxShadow: '0 8px 25px rgba(0, 11, 41, 0.3)'
          }}>
            <img 
              src="/src/assets/logoyachay1.png" 
              alt="Logo Yachay Votu" 
              style={{ 
                width: '400px', 
                height: '400px',
                objectFit: 'contain'
              }} 
            />
          </div>

          {/* Nombre de la web */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '10px',
            color: Colors.night
          }}>
            Yachay Tech
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#5c4b1a', // Color más oscuro para mejor legibilidad en amarillo
            marginBottom: '40px',
            lineHeight: '1.5'
          }}>
            VOTA - DECIDE - TRASNFORMA
          </p>

          {/* Mensaje de bienvenida */}
          <div style={{
            padding: '20px',
            borderLeft: `4px solid ${Colors.primary}`, // Borde rojo
            backgroundColor: 'rgba(0, 11, 41, 0.1)', // Fondo semi-transparente oscuro
            borderRadius: '8px'
          }}>
            <p style={{
              fontSize: '25px',
              color: Colors.night,
              fontStyle: 'italic',
              margin: 0,
              fontWeight: '500'
            }}>
              "Voto Informado"
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario minimalista (COMO ESTABA) */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        backgroundColor: 'white'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0 20px'
        }}>
          {/* Header del formulario */}
          <div style={{
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: Colors.night,
              marginBottom: '8px'
            }}>
              Iniciar Sesión
            </h2>
            <p style={{
              fontSize: '14px',
              color: Colors.gray,
              margin: 0
            }}>
              Ingrese sus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: Colors.night,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Número de Documento
              </label>
              <input
                type="text"
                value={credentials.document_number}
                onChange={(e) => setCredentials({...credentials, document_number: e.target.value})}
                onFocus={() => setDocumentFocus(true)}
                onBlur={() => setDocumentFocus(false)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${documentFocus ? Colors.primary : Colors.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: 'black',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: documentFocus ? '#fffafa' : 'white'
                }}
                placeholder="Ej: 12345678"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                color: Colors.night,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${passwordFocus ? Colors.primary : Colors.lightGray}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: 'black',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: passwordFocus ? '#fffafa' : 'white'
                }}
                placeholder="Ingrese su contraseña"
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: isHovered ? '#b3001f' : Colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? '0 6px 20px rgba(215, 0, 38, 0.4)' : '0 4px 15px rgba(215, 0, 38, 0.3)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Ingresar al Sistema
            </button>
          </form>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: `1px solid ${Colors.lightGray}`
          }}>
            <p style={{
              color: Colors.gray,
              fontSize: '12px',
              margin: 0
            }}>
              Al continuar, acepta nuestros{' '}
              <a href="/terms" style={{
                color: Colors.primary,
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Términos
              </a>{' '}
              y{' '}
              <a href="/privacy" style={{
                color: Colors.primary,
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Políticas de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;