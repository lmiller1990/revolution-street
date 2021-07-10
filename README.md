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