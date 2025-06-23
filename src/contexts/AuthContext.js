import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitas, setVisitas] = useState(0);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/check-auth', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
        setVisitas(data.visitas || 0);
      } else {
        setUser(null);
        setVisitas(0);
      }
    } catch (error) {
      setUser(null);
      setVisitas(0);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
        setVisitas(data.visitas || 1);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
        setVisitas(data.visitas || 1);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
        setVisitas(data.visitas || visitas);
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:4000/api/usuarios/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {}
    finally {
      setUser(null);
      setVisitas(0);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      setLoading,
      visitas,
      setVisitas,
      checkAuthStatus,
      login,
      register,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};