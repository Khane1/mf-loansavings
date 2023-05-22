export function handle({ event, resolve }) {
    return resolve(event, {
        ssr: true
    });
}

// src/hooks.js

export function handleCors(request, { headers }) {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (request.method === 'OPTIONS') {
      return {
        status: 200,
        headers,
      };
    }
  
    return {
      headers,
    };
  }
 
  // src/routes/api/[...segments].js
  
  
  export async function get({ params }) {
    // handle GET request
  }
  
  export async function post({ params, body }) {
    // handle POST request
  }
  
  
  
  
  