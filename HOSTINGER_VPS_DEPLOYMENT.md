# Hostinger VPS Deployment Guide (Next.js + MongoDB)

This guide is for deploying this project on Hostinger VPS.

## 1. Recommended Plan

- Minimum: 50 GB NVMe VPS
- Better for growth: 100 GB NVMe VPS
- Suggested compute: at least 2 vCPU and 4 GB RAM

## 2. What You Need Before Deployment

- A Hostinger VPS (Ubuntu 22.04 LTS recommended)
- Domain name (or subdomain)
- MongoDB connection string (Atlas or self-hosted)
- SSH client on your local machine
- Git repository access for this project

## 3. Files/Folders That Matter in This Project

- `src/app` -> pages and API routes
- `src/app/api/*/route.js` -> backend endpoints
- `src/models/*` -> MongoDB schemas
- `src/lib/mongodb.js` -> DB connection logic
- `public/uploads` -> uploaded images (must be writable)

## 4. Server Setup (First Time)

SSH into VPS:

```bash
ssh root@YOUR_VPS_IP
```

Update server:

```bash
apt update && apt upgrade -y
```

Install Node.js 20 LTS + npm:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v
npm -v
```

Install PM2 and Nginx:

```bash
npm install -g pm2
apt install -y nginx
```

## 5. Deploy Project Code

Create app directory:

```bash
mkdir -p /var/www/accumax_website
cd /var/www/accumax_website
```

Clone repo:

```bash
git clone YOUR_REPO_URL .
```

Install dependencies:

```bash
npm ci
```

Create production env file:

```bash
nano .env.production
```

Add required environment variables (example):

```env
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
PORT=3000
```

Important:

- Use the exact env var names your `src/lib/mongodb.js` expects.
- If your app uses additional keys (email, analytics, etc.), add them too.

## 6. Build and Run Next.js

Build app:

```bash
npm run build
```

Start with PM2:

```bash
pm2 start npm --name accumax-website -- start
pm2 save
pm2 startup
```

Check logs:

```bash
pm2 logs accumax-website
```

## 7. Nginx Reverse Proxy Setup

Create Nginx config:

```bash
nano /etc/nginx/sites-available/accumax_website
```

Paste:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable config:

```bash
ln -s /etc/nginx/sites-available/accumax_website /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## 8. Point Domain to VPS

In your domain DNS panel:

- Add `A` record for `@` -> `YOUR_VPS_IP`
- Add `A` record for `www` -> `YOUR_VPS_IP`

Wait for DNS propagation.

## 9. Add Free SSL (HTTPS)

Install certbot:

```bash
apt install -y certbot python3-certbot-nginx
```

Generate and apply SSL:

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Test auto-renew:

```bash
certbot renew --dry-run
```

## 10. Uploads Folder and Permissions

Your APIs save images into `public/uploads`.

Ensure folder exists and is writable by app user:

```bash
mkdir -p /var/www/accumax_website/public/uploads
chown -R www-data:www-data /var/www/accumax_website/public/uploads
chmod -R 775 /var/www/accumax_website/public/uploads
```

Note:

- If you redeploy often, local uploads can be lost if you overwrite files.
- Long-term best practice: move uploads to cloud storage (S3/Cloudinary).

## 11. Update Deployment (Later)

When you push new code:

```bash
cd /var/www/accumax_website
git pull
npm ci
npm run build
pm2 restart accumax-website
```

## 12. Health Checklist

After deployment confirm:

- Homepage loads
- `/blogs` and `/products` pages load
- Admin pages load
- API routes respond:
  - `/api/blog`
  - `/api/blog-category`
  - `/api/product`
  - `/api/enquiry`
- Image upload works
- MongoDB connection works in production logs

## 13. Common Issues and Fixes

1. 502 Bad Gateway
- Cause: Next app not running.
- Fix: `pm2 status`, then `pm2 restart accumax-website`, check `pm2 logs`.

2. Build fails on VPS
- Cause: low RAM or wrong Node version.
- Fix: use Node 20 LTS and at least 4 GB RAM.

3. Image upload fails
- Cause: folder permission issue.
- Fix: re-run `chown/chmod` for `public/uploads`.

4. MongoDB connection fails
- Cause: wrong `MONGODB_URI` or Atlas IP access not allowed.
- Fix: verify env value and whitelist VPS IP in MongoDB Atlas.

## 14. Security Basics (Do This)

- Create non-root deploy user
- Disable root SSH login
- Use SSH key auth (disable password login)
- Enable firewall:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

- Keep system updated regularly

## 15. Optional Improvements

- Add CI/CD pipeline for auto-deploy
- Move uploads to S3/Cloudinary
- Add uptime monitoring
- Add daily DB backup

---

If you follow this file step-by-step, your project will run on Hostinger VPS with HTTPS and production process management.
