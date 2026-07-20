#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Error: This script must be run as root."
  exit 1
fi

while true; do
    echo -e "\n============================================"
    echo -e "\e[36m1. Install / Update SOCKS5 Proxy\e[0m"
    echo -e "\e[36m2. Uninstall & Remove Proxy\e[0m"
    echo -e "\e[36m3. Exit\e[0m"
    echo -e "============================================"
    read -p "Enter your choice (1, 2, or 3): " choice < /dev/tty

    if [ "$choice" == "2" ]; then
        echo -e "\e[33mUninstalling Dante SOCKS5 Proxy...\e[0m"
        systemctl stop danted 2>/dev/null || systemctl stop sockd 2>/dev/null
        systemctl disable danted 2>/dev/null || systemctl disable sockd 2>/dev/null

        if [ -f /etc/danted.conf ]; then
            PORT_TO_REMOVE=$(grep -m 1 "internal: 0.0.0.0 port =" /etc/danted.conf | awk '{print $4}')
            if [ -n "$PORT_TO_REMOVE" ]; then
                if command -v ufw >/dev/null 2>&1; then
                    ufw delete allow $PORT_TO_REMOVE/tcp 2>/dev/null
                elif command -v firewall-cmd >/dev/null 2>&1; then
                    firewall-cmd --zone=public --remove-port=$PORT_TO_REMOVE/tcp --permanent 2>/dev/null
                    firewall-cmd --reload 2>/dev/null
                fi
            fi
            rm -f /etc/danted.conf
        fi

        OS=""
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            OS=$ID
        fi

        if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
            apt-get remove --purge dante-server -y
        elif [[ "$OS" == "centos" || "$OS" == "rhel" || "$OS" == "rocky" || "$OS" == "almalinux" || "$OS" == "fedora" ]]; then
            yum remove dante-server -y
        fi

        echo -e "\e[32mUninstallation complete! Returning to menu...\e[0m"
        sleep 2
    elif [ "$choice" == "1" ]; then
        break
    elif [ "$choice" == "3" ]; then
        exit 0
    else
        echo -e "\e[31mInvalid choice, please try again.\e[0m"
    fi
done

OS=""
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
fi

if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
    apt-get update -y
    apt-get install dante-server ufw curl iproute2 -y
elif [[ "$OS" == "centos" || "$OS" == "rhel" || "$OS" == "rocky" || "$OS" == "almalinux" || "$OS" == "fedora" ]]; then
    yum install epel-release -y
    yum install dante-server firewalld curl iproute -y
else
    echo "Error: Unsupported OS."
    exit 1
fi

PORT=1080
while ss -tuln | grep -qE "(:$PORT\b)"; do
    PORT=$((PORT + 1000))
done

INTERFACE=$(ip route show default | awk '/default/ {print $5}')

cat <<EOF > /etc/danted.conf
logoutput: syslog
user.privileged: root
user.unprivileged: nobody
internal: 0.0.0.0 port = $PORT
internal: :: port = $PORT
external: $INTERFACE
clientmethod: none
socksmethod: username
client pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    log: error
}
client pass {
    from: ::/0 to: ::/0
    log: error
}
socks pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    log: error
}
socks pass {
    from: ::/0 to: ::/0
    log: error
}
socks pass {
    from: 0.0.0.0/0 to: ::/0
    log: error
}
socks pass {
    from: ::/0 to: 0.0.0.0/0
    log: error
}
EOF

PROXY_USER=$(tr -dc 'a-z' </dev/urandom | head -c 8)
PROXY_PASS=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 12)

useradd --shell /usr/sbin/nologin $PROXY_USER
echo "$PROXY_USER:$PROXY_PASS" | chpasswd

if command -v ufw >/dev/null 2>&1; then
    ufw allow $PORT/tcp
elif command -v firewall-cmd >/dev/null 2>&1; then
    firewall-cmd --zone=public --add-port=$PORT/tcp --permanent
    firewall-cmd --reload
fi

systemctl restart danted || systemctl restart sockd
systemctl enable danted || systemctl enable sockd

SERVER_IP=$(curl -s -4 https://api.ipify.org)
SERVER_IPV6=$(curl -s -6 https://api64.ipify.org)

echo "============================================"
echo "$PROXY_USER:$PROXY_PASS@$SERVER_IP:$PORT"
if [ -n "$SERVER_IPV6" ]; then
    echo "$PROXY_USER:$PROXY_PASS@[$SERVER_IPV6]:$PORT"
fi
echo "============================================"