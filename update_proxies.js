const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const net = require('net');

const PROXY_DIR = path.join(__dirname, 'proxy');

const SOURCES = {
    socks5: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=socks5&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
        'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/officialputuid/Socks5-Proxy-List/master/socks5.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks5.txt',
        'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks5.txt',
        'https://raw.githubusercontent.com/Thordata/awesome-free-proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/databay-labs/free-proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/socks5.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
        'https://raw.githubusercontent.com/B4atman/Proxy-List/main/socks5.txt',
        'https://raw.githubusercontent.com/MuRongPignut/free-proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt',
        'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt',
        'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/socks5.txt',
        'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/Zaeem20/Free-Proxy-List/master/socks5.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
        'https://raw.githubusercontent.com/elliotwutingfeng/go-fast-proxy/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/saisuiu/Lion-Proxy/main/socks5.txt',
        'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.txt'
    ],
    socks4: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=socks4&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt',
        'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt',
        'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/socks4.txt',
        'https://raw.githubusercontent.com/Zaeem20/Free-Proxy-List/master/socks4.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks4.txt',
        'https://raw.githubusercontent.com/elliotwutingfeng/go-fast-proxy/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks4.txt',
        'https://raw.githubusercontent.com/saisuiu/Lion-Proxy/main/socks4.txt',
        'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks4.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks4/data.txt'
    ],
    http: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=http&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
        'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
        'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/http.txt',
        'https://raw.githubusercontent.com/Zaeem20/Free-Proxy-List/master/http.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
        'https://raw.githubusercontent.com/elliotwutingfeng/go-fast-proxy/main/proxies/http.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
        'https://raw.githubusercontent.com/saisuiu/Lion-Proxy/main/http.txt',
        'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt'
    ]
};

function fetchText(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve(data));
        }).on('error', (err) => {
            console.error(`Failed to fetch from ${url}:`, err.message);
            resolve('');
        });
    });
}

function checkSocks5(host, port, timeout = 3000) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        let state = 0;
        let resolved = false;

        const cleanup = (result) => {
            if (resolved) return;
            resolved = true;
            socket.destroy();
            resolve(result);
        };

        socket.setTimeout(timeout);
        
        socket.connect(port, host, () => {
            state = 1;
            socket.write(Buffer.from([0x05, 0x01, 0x00]));
        });

        socket.on('data', (data) => {
            if (state === 1) {
                if (data.length >= 2 && data[0] === 0x05 && data[1] === 0x00) {
                    state = 2;
                    socket.write(Buffer.from([0x05, 0x01, 0x00, 0x01, 1, 1, 1, 1, 0, 80]));
                } else {
                    cleanup(false);
                }
            } else if (state === 2) {
                if (data.length >= 2 && data[0] === 0x05 && data[1] === 0x00) {
                    cleanup(true);
                } else {
                    cleanup(false);
                }
            }
        });

        socket.on('timeout', () => cleanup(false));
        socket.on('error', () => cleanup(false));
        socket.on('close', () => cleanup(false));
    });
}

function checkSocks4(host, port, timeout = 3000) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        let resolved = false;

        const cleanup = (result) => {
            if (resolved) return;
            resolved = true;
            socket.destroy();
            resolve(result);
        };

        socket.setTimeout(timeout);
        
        socket.connect(port, host, () => {
            // SOCKS4 connect request header (CONNECT to 1.1.1.1:80)
            socket.write(Buffer.from([0x04, 0x01, 0x00, 0x50, 0x01, 0x01, 0x01, 0x01, 0x00]));
        });

        socket.on('data', (data) => {
            // SOCKS4 server reply format: [0x00, status, ...] where status 0x5a (90) means success
            if (data.length >= 2 && data[0] === 0x00 && data[1] === 0x5a) {
                cleanup(true);
            } else {
                cleanup(false);
            }
        });

        socket.on('timeout', () => cleanup(false));
        socket.on('error', () => cleanup(false));
        socket.on('close', () => cleanup(false));
    });
}

function checkHttp(host, port, timeout = 3000) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        let resolved = false;

        const cleanup = (result) => {
            if (resolved) return;
            resolved = true;
            socket.destroy();
            resolve(result);
        };

        socket.setTimeout(timeout);
        
        socket.connect(port, host, () => {
            socket.write("CONNECT 1.1.1.1:80 HTTP/1.1\r\nHost: 1.1.1.1:80\r\nConnection: close\r\n\r\n");
        });

        socket.on('data', (data) => {
            const response = data.toString('utf8');
            if (response.includes('200 Connection Established') || response.includes('200 OK') || response.startsWith('HTTP/1.1 200') || response.startsWith('HTTP/1.0 200')) {
                cleanup(true);
            } else {
                cleanup(false);
            }
        });

        socket.on('timeout', () => cleanup(false));
        socket.on('error', () => cleanup(false));
        socket.on('close', () => cleanup(false));
    });
}

async function limitConcurrency(tasks, limit) {
    const results = [];
    const executing = new Set();
    for (const task of tasks) {
        const p = Promise.resolve().then(() => task());
        results.push(p);
        executing.add(p);
        const clean = () => executing.delete(p);
        p.then(clean, clean);
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    return Promise.all(results);
}

function batchGeoLookup(ips) {
    return new Promise((resolve) => {
        if (ips.length === 0) return resolve([]);
        
        const postData = JSON.stringify(ips);
        const req = http.request({
            hostname: 'ip-api.com',
            path: '/batch?fields=query,countryCode',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve([]);
                }
            });
        });
        
        req.on('error', () => resolve([]));
        req.write(postData);
        req.end();
    });
}

async function main() {
    console.log('Fetching SOCKS5, SOCKS4, and HTTP proxy lists from sources...');
    const allProxies = { socks5: new Set(), socks4: new Set(), http: new Set() };
    
    for (const protocol of ['socks5', 'socks4', 'http']) {
        for (const url of SOURCES[protocol]) {
            const text = await fetchText(url);
            const matches = text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+\b/g);
            if (matches) {
                matches.forEach(p => allProxies[protocol].add(p));
            }
        }
    }
    
    console.log(`Fetched unique raw proxies: ${allProxies.socks5.size} SOCKS5, ${allProxies.socks4.size} SOCKS4, ${allProxies.http.size} HTTP.`);
    
    const tasks = [];
    
    const socks5Candidates = Array.from(allProxies.socks5).sort(() => 0.5 - Math.random());
    socks5Candidates.forEach(proxy => {
        tasks.push(async () => {
            const [host, portStr] = proxy.split(':');
            const port = parseInt(portStr);
            const ok = await checkSocks5(host, port, 3000);
            return { proxy: `socks5://${proxy}`, host, ok };
        });
    });

    const socks4Candidates = Array.from(allProxies.socks4).sort(() => 0.5 - Math.random());
    socks4Candidates.forEach(proxy => {
        tasks.push(async () => {
            const [host, portStr] = proxy.split(':');
            const port = parseInt(portStr);
            const ok = await checkSocks4(host, port, 3000);
            return { proxy: `socks4://${proxy}`, host, ok };
        });
    });

    const httpCandidates = Array.from(allProxies.http).sort(() => 0.5 - Math.random());
    httpCandidates.forEach(proxy => {
        tasks.push(async () => {
            const [host, portStr] = proxy.split(':');
            const port = parseInt(portStr);
            const ok = await checkHttp(host, port, 3000);
            return { proxy: `http://${proxy}`, host, ok };
        });
    });

    // Shuffle all candidates to mix protocols and hosts
    const shuffledTasks = tasks.sort(() => 0.5 - Math.random());
    console.log(`Testing ${shuffledTasks.length} random candidates concurrently (limit: 150)...`);
    
    const testResults = await limitConcurrency(shuffledTasks, 150);
    const workingProxies = testResults.filter(r => r.ok);
    console.log(`Found ${workingProxies.length} working proxies.`);
    
    if (workingProxies.length === 0) {
        console.log('No working proxies found. Exiting.');
        return;
    }
    
    console.log('Performing geolocation lookup on working proxies...');
    const workingIps = workingProxies.map(r => r.host);
    const geoData = [];
    
    // ip-api.com batch accepts max 100 queries per request
    for (let i = 0; i < workingIps.length; i += 100) {
        const batch = workingIps.slice(i, i + 100);
        const res = await batchGeoLookup(batch);
        geoData.push(...res);
        // Wait 1.5 seconds to avoid exceeding ip-api.com rate limits (max 15 batch requests per minute)
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    const geoMap = new Map();
    geoData.forEach(item => {
        if (item && item.query && item.countryCode) {
            geoMap.set(item.query, item.countryCode.toUpperCase());
        }
    });
    
    // Group proxies by country, and always keep a global list for ALL
    const countryGroups = { ALL: [] };
    workingProxies.forEach(item => {
        const country = geoMap.get(item.host);
        
        // Add to country-specific group if country resolved
        if (country) {
            if (!countryGroups[country]) {
                countryGroups[country] = [];
            }
            countryGroups[country].push(item.proxy);
        }
        
        // Always add to the global ALL list
        countryGroups.ALL.push(item.proxy);
    });
    
    console.log('Updating files in proxy directory...');
    if (!fs.existsSync(PROXY_DIR)) {
        fs.mkdirSync(PROXY_DIR);
    }
    
    // Write new working proxies to country files
    for (const [country, proxies] of Object.entries(countryGroups)) {
        if (proxies.length === 0) continue;
        const filename = `${country}.txt`;
        const filepath = path.join(PROXY_DIR, filename);
        fs.writeFileSync(filepath, proxies.join('\n') + '\n', 'utf8');
        console.log(`Updated ${filename} with ${proxies.length} proxies.`);
    }
    
    console.log('Proxy update complete!');
}

main().catch(err => {
    console.error('Error during execution:', err);
});
