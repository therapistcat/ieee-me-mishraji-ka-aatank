# 🚀 Deployment Guide for Research Paper Explorer

This guide will help you deploy the Research Paper Explorer to Render (or any other hosting platform).

## 📋 Prerequisites

- GitHub account (to connect your repository)
- Render account (free tier available)
- Your code pushed to a GitHub repository

## 🔧 Render Deployment Settings

### Backend Service (Node.js API)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the following settings:**

```
Name: research-paper-explorer-backend
Environment: Node
Region: Choose closest to your users
Branch: main (or your main branch)
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

4. **Environment Variables:**
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-name.onrender.com
```

### Frontend Service (Static Site)

1. **Create a new Static Site on Render**
2. **Connect the same GitHub repository**
3. **Configure the following settings:**

```
Name: research-paper-explorer-frontend
Environment: Static Site
Region: Choose closest to your users
Branch: main (or your main branch)
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

4. **Environment Variables:**
```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

## 📝 Step-by-Step Deployment Process

### Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub
2. Ensure your `.env.example` files are in place (don't commit actual `.env` files!)

### Step 2: Deploy Backend First

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Use the backend settings above
5. Click "Create Web Service"
6. Wait for deployment (usually 2-5 minutes)
7. Copy the backend URL (something like `https://research-paper-explorer-backend-xyz.onrender.com`)

### Step 3: Deploy Frontend

1. Create another service: "New +" → "Static Site"
2. Connect the same GitHub repository
3. Use the frontend settings above
4. **Important**: Set `VITE_API_URL` to your backend URL from Step 2
5. Click "Create Static Site"
6. Wait for deployment

### Step 4: Update CORS Settings

1. Go back to your backend service on Render
2. Add environment variable: `FRONTEND_URL=https://your-frontend-url.onrender.com`
3. The backend will automatically redeploy

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend
2. **API Not Found**: Check that `VITE_API_URL` points to the correct backend URL
3. **Build Failures**: Check the build logs on Render dashboard

### Build Commands Reference:

**Backend:**
- Build Command: `npm install`
- Start Command: `npm start`
- Root Directory: `backend`

**Frontend:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Root Directory: `frontend`

## 🌐 Alternative Deployment Options

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod
```

### Railway (Backend)
1. Connect GitHub repository
2. Select backend folder
3. Set environment variables
4. Deploy automatically

### Netlify (Frontend)
1. Drag and drop `frontend/dist` folder
2. Or connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📱 Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.onrender.com
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## 🎉 Post-Deployment

1. Test all functionality:
   - Search works
   - Filters work
   - Paper details load
   - Pagination works

2. Monitor performance:
   - Check Render logs for errors
   - Monitor response times
   - Watch for rate limiting

3. Optional improvements:
   - Set up custom domain
   - Enable HTTPS (automatic on Render)
   - Set up monitoring/analytics

## 💡 Pro Tips

- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid tier for production use
- Use environment variables for all configuration
- Never commit API keys or secrets to GitHub

## 🆘 Need Help?

If you run into issues:
1. Check Render build logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

Happy deploying! 🚀
