# Revolution Street

## Development and Deployment

Dependencies:

### sqitch

MacOS: 

```sh
brew tap sqitchers/sqitch
brew install sqitch --with-postgres-support
```

Ubuntu:

```sh
apt-get install sqitch libdbd-pg-perl postgresql-client
# then
SQITCH_USERNAME=USERNAME_HERE SQITCH_PASSWORD=XXXX sqitch deploy
```

### Nginx

```sh
apt-get install nginx
```

Basic config is something like this:

```sh
events {
}

http {
	server {
		error_page 500 502 503 504 /500.html;
		location = /500.html {
			root /usr/share/nginx/html;
			internal;
		}
		listen 80;

		server_tokens off;


		# location / {
		# 	return 301 https://$host$request_uri;
		# }

		location / {
			proxy_set_header    Host                $http_host;
			proxy_set_header    X-Real-IP           $remote_addr;
			proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8000/;
		}


		include /etc/nginx/mime.types;
	}

	server {
		error_page 500 502 503 504 /500.html;
		location = /500.html {
			root /usr/share/nginx/html;
			internal;
		}
		server_tokens off;

		include /etc/nginx/mime.types;

		location / {
			proxy_set_header    Host                $http_host;
			proxy_set_header    X-Real-IP           $remote_addr;
			proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8000/;
		}


	}
}
```

### Postgres

MacOS:

Postgres.app or brew

Ubuntu:

```sh
sudo apt install postgresql postgresql-contrib
```

### Node.js

MacOS: Download from website

Ubuntu:

```sh
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Setup

```sh
npm install
cd sqitch
sqitch deploy
npm run build
pm2 start src/index.js
```

## SSL

Let's Encrypt is good.

```sh
sudo apt install certbot python3-certbot-nginx
```

Enable 443

```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'

# then
sudo ufw status
sudo ufw enable
sudo ufw reload

Status: active

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
80/tcp (v6)                ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

## Get a Cert

```sh
sudo certbot --nginx -d revolutionstreet.xyz -d www.revolutionstreet.xyz
```

## Start the app

DB_USER=XXXX DB_PASSWORD=XXX node src/index.js

## Adding a Migration

```sh
sqitch add 2020_08_23_add_image_to_scores
```
