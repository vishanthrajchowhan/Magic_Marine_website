const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN'
};

function getCacheControl(extname) {
    if (extname === '.html') return 'no-cache';
    if (extname === '.css' || extname === '.js') return 'public, max-age=3600';
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp'].includes(extname)) {
        return 'public, max-age=86400';
    }
    return 'no-cache';
}

const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filePath = path.normalize(path.join(__dirname, pathname));

    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, {
            'Content-Type': 'text/plain',
            ...securityHeaders
        });
        res.end('Forbidden', 'utf-8');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    const cacheControl = getCacheControl(extname);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                const notFoundPath = path.join(__dirname, '404.html');
                fs.readFile(notFoundPath, (notFoundError, notFoundContent) => {
                    if (notFoundError) {
                        res.writeHead(404, {
                            'Content-Type': 'text/html',
                            ...securityHeaders,
                            'Cache-Control': 'no-cache'
                        });
                        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                        return;
                    }

                    res.writeHead(404, {
                        'Content-Type': 'text/html',
                        ...securityHeaders,
                        'Cache-Control': 'no-cache'
                    });
                    res.end(notFoundContent, 'utf-8');
                });
            } else {
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                    ...securityHeaders,
                    'Cache-Control': 'no-cache'
                });
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                ...securityHeaders,
                'Cache-Control': cacheControl
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});
