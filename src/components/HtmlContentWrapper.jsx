// components/HtmlContentWrapper.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function HtmlContentWrapper({
  basePath = '/Juan/',
  htmlFile = 'HTML/index.html',
  cssFile = 'CSS/styles.css',
  jsFile = 'JS/script.js',
}) {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const scriptExecutedRef = useRef(false);

  // Rutas completas a los archivos estáticos
  const fullHtmlPath = `${basePath}${htmlFile}`;
  const fullCssPath = `${basePath}${cssFile}`;
  const fullJsPath = `${basePath}${jsFile}`;

  // Función para ejecutar el JavaScript puro
  const executeScript = useCallback((jsCode) => {
    if (!containerRef.current || scriptExecutedRef.current) return;

    try {
      // Crear un nuevo elemento script
      const newScript = document.createElement('script');
      newScript.textContent = jsCode;

      // Añadir el script al DOM para su ejecución
      containerRef.current.appendChild(newScript);
      scriptExecutedRef.current = true;
      console.log('JavaScript puro ejecutado.');
    } catch (e) {
      console.error('Error al ejecutar el JavaScript puro:', e);
    }
  }, []);

  // Efecto para cargar los archivos
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      scriptExecutedRef.current = false; // Resetear el estado de ejecución del script

      try {
        // 1. Cargar archivos en paralelo
        const [htmlResponse, cssResponse, jsResponse] = await Promise.all([
          fetch(fullHtmlPath),
          fetch(fullCssPath),
          fetch(fullJsPath),
        ]);

        // 2. Verificar si las respuestas son OK
        if (!htmlResponse.ok) throw new Error(`Error al cargar HTML: ${htmlResponse.statusText} (${fullHtmlPath})`);
        if (!cssResponse.ok) throw new Error(`Error al cargar CSS: ${cssResponse.statusText} (${fullCssPath})`);
        if (!jsResponse.ok) throw new Error(`Error al cargar JS: ${jsResponse.statusText} (${fullJsPath})`);

        // 3. Obtener el texto de las respuestas
        const [htmlText, cssText, jsText] = await Promise.all([
          htmlResponse.text(),
          cssResponse.text(),
          jsResponse.text(),
        ]);

        // 4. Combinar el contenido
        // Inyectamos el CSS en un tag <style> para que se aplique al HTML.
        const combinedContent = `
          <style id="pure-css-styles">
            ${cssText}
          </style>
          ${htmlText}
        `;

        setContent({ combinedContent, jsText });
      } catch (e) {
        setError(e.message);
        console.error('Error al cargar el contenido:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [fullHtmlPath, fullCssPath, fullJsPath]); // Dependencias: recargar si las rutas cambian

  // Efecto para renderizar el HTML y ejecutar el JS
  useEffect(() => {
    if (content && containerRef.current) {
      // 1. Limpiar el contenedor
      containerRef.current.innerHTML = '';

      // 2. Renderizar el HTML combinado (incluyendo el <style> tag)
      // Usamos innerHTML para inyectar el contenido
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content.combinedContent;

      // Mover los nodos hijos al contenedor real
      Array.from(tempDiv.children).forEach((child) => {
        containerRef.current.appendChild(child);
      });

      // 3. Ejecutar el JavaScript
      executeScript(content.jsText);
    }
  }, [content, executeScript]);

  if (isLoading) {
    return <div className='p-4 text-center text-gray-500'>Cargando contenido de {basePath}...</div>;
  }

  if (error) {
    return (
      <div className='p-4 text-center text-red-600 border border-red-300 bg-red-50'>
        Error al cargar el contenido: {error}
      </div>
    );
  }

  // El contenedor donde se inyectará el HTML
  return (
    <div
      ref={containerRef}
      className='pure-content-wrapper'
    />
  );
}
