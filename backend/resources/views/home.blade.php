<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puente Joven - Backend API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        .status {
            background: #10b981;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
        }
        .info {
            margin-top: 30px;
            text-align: left;
            background: #f7fafc;
            padding: 20px;
            border-radius: 10px;
        }
        .info h2 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        .info ul {
            list-style: none;
            padding: 0;
        }
        .info li {
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
            color: #4a5568;
        }
        .info li:last-child {
            border-bottom: none;
        }
        .info code {
            background: #edf2f7;
            padding: 2px 8px;
            border-radius: 4px;
            color: #667eea;
            font-family: 'Courier New', monospace;
        }
        .link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }
        .link:hover {
            color: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌉 Puente Joven</h1>
        <div class="status">✅ Backend API funcionando correctamente</div>
        
        <div class="info">
            <h2>📡 Información de la API</h2>
            <ul>
                <li><strong>URL Base:</strong> <code>{{ url('/') }}</code></li>
                <li><strong>API Endpoint:</strong> <code>{{ url('/api') }}</code></li>
                <li><strong>Frontend:</strong> <a href="http://localhost:3000" class="link" target="_blank">http://localhost:3000</a></li>
                <li><strong>Laravel Version:</strong> {{ app()->version() }}</li>
                <li><strong>Environment:</strong> {{ app()->environment() }}</li>
            </ul>
        </div>

        <a href="http://localhost:3000" class="link" target="_blank">→ Ir al Frontend</a>
    </div>
</body>
</html>
