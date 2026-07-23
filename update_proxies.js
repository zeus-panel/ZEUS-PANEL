const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const net = require('net');
const { URL } = require('url');

const PROXY_DIR = path.join(__dirname, 'proxy');

const SOURCES = {
    socks5: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=socks5&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
        'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/all.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks5.txt',
        'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks5.txt',
        'https://raw.githubusercontent.com/Thordata/awesome-free-proxy-list/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/socks5.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt',
        'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/socks5.txt',
        'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt',
        'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt',
        'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/socks5.txt',
        'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
        'https://openproxylist.xyz/socks5.txt'
    ],
    socks4: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=socks4&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks4.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/all.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks4.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks4.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks4/data.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt',
        'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/socks4.txt',
        'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks4.txt',
        'https://raw.githubusercontent.com/Thordata/awesome-free-proxy-list/main/proxies/socks4.txt',
        'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/socks4.txt',
        'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt',
        'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/socks4.txt',
        'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
        'https://openproxylist.xyz/socks4.txt'
    ],
    http: [
        'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=http&proxy_format=ipport&format=text',
        'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
        'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/all.txt',
        'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
        'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
        'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
        'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
        'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
        'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
        'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/all/data.txt',
        'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
        'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
        'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Http.txt',
        'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Https.txt',
        'https://raw.githubusercontent.com/Thordata/awesome-free-proxy-list/main/proxies/http.txt',
        'https://raw.githubusercontent.com/proxygenerator1/ProxyGenerator/main/MostStable/http.txt',
        'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
        'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
        'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
        'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
        'https://openproxylist.xyz/http.txt'
    ]
};

function fetchText(targetUrl, redirectsLeft = 3) {
    return new Promise((resolve) => {
        try {
            const parsed = new URL(targetUrl);
            const client = parsed.protocol === 'https:' ? https : http;
            const req = client.get(targetUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                timeout: 8000
            }, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsLeft > 0) {
                    let redirectUrl = res.headers.location;
                    if (!redirectUrl.startsWith('http')) {
                        redirectUrl = new URL(redirectUrl, targetUrl).href;
                    }
                    return fetchText(redirectUrl, redirectsLeft - 1).then(resolve);
                }
                if (res.statusCode !== 200) {
                    return resolve('');
                }
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => resolve(data));
            });
            req.on('error', () => resolve(''));
            req.on('timeout', () => { req.destroy(); resolve(''); });
        } catch (e) {
            resolve('');
        }
    });
}

function isValidIpPort(str) {
    const parts = str.split(':');
    if (parts.length !== 2) return false;
    const ip = parts[0];
    const port = parseInt(parts[1], 10);
    if (isNaN(port) || port <= 0 || port > 65535) return false;
    const octets = ip.split('.');
    if (octets.length !== 4) return false;
    return octets.every(o => {
        const n = parseInt(o, 10);
        return !isNaN(n) && n >= 0 && n <= 255 && o === n.toString();
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
            socket.write(Buffer.from([0x04, 0x01, 0x00, 0x50, 0x01, 0x01, 0x01, 0x01, 0x00]));
        });

        socket.on('data', (data) => {
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
    console.log('Fetching SOCKS5, SOCKS4, and HTTP proxy lists in parallel from verified sources...');
    const allProxies = { socks5: new Set(), socks4: new Set(), http: new Set() };
    
    for (const protocol of ['socks5', 'socks4', 'http']) {
        const fetchPromises = SOURCES[protocol].map(url => fetchText(url));
        const fetchedTexts = await Promise.all(fetchPromises);
        
        fetchedTexts.forEach(text => {
            if (!text) return;
            const matches = text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+\b/g);
            if (matches) {
                matches.forEach(p => {
                    if (isValidIpPort(p)) {
                        allProxies[protocol].add(p);
                    }
                });
            }
        });
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

    const shuffledTasks = tasks.sort(() => 0.5 - Math.random());
    console.log(`Testing ${shuffledTasks.length} candidates concurrently (concurrency limit: 100)...`);
    
    const testResults = await limitConcurrency(shuffledTasks, 100);
    const workingProxies = testResults.filter(r => r.ok);
    console.log(`Found ${workingProxies.length} working proxies.`);
    
    if (workingProxies.length === 0) {
        console.log('No working proxies found. Exiting.');
        return;
    }
    
    console.log('Performing geolocation lookup on working proxies...');
    const workingIps = workingProxies.map(r => r.host);
    const geoData = [];
    
    for (let i = 0; i < workingIps.length; i += 100) {
        const batch = workingIps.slice(i, i + 100);
        const res = await batchGeoLookup(batch);
        geoData.push(...res);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    const geoMap = new Map();
    geoData.forEach(item => {
        if (item && item.query && item.countryCode) {
            geoMap.set(item.query, item.countryCode.toUpperCase());
        }
    });
    
    const countryGroups = { ALL: [] };
    workingProxies.forEach(item => {
        const country = geoMap.get(item.host);
        
        if (country) {
            if (!countryGroups[country]) {
                countryGroups[country] = [];
            }
            countryGroups[country].push(item.proxy);
        }
        
        countryGroups.ALL.push(item.proxy);
    });
    
    console.log('Updating files in proxy directory...');
    if (!fs.existsSync(PROXY_DIR)) {
        fs.mkdirSync(PROXY_DIR);
    }
    
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
