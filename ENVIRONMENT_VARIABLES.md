# 🔧 Environment Variables Configuration

This document outlines all the environment variables needed for deploying the Research Paper Explorer application.

## 🌐 Deployment URLs

- **Frontend**: https://ieee-me-mishraji-ka-aatank.onrender.com
- **Backend**: https://ieee-me-mishraji-ka-aatank-backend.onrender.com

## 🖥️ Backend Environment Variables

Set these environment variables in your Render backend service:

### Required Variables

```bash
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://ieee-me-mishraji-ka-aatank.onrender.com
```

### Optional Variables

```bash
# OpenAlex API doesn't require an API key, but you can add your email for better rate limits
OPENALEX_EMAIL=your-email@example.com
```

### Backend Service Configuration on Render

1. **Service Type**: Web Service
2. **Environment**: Node
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Auto-Deploy**: Yes

## 🎨 Frontend Environment Variables

Set these environment variables in your Render frontend service:

### Required Variables

```bash
VITE_API_URL=https://ieee-me-mishraji-ka-aatank-backend.onrender.com/api
```

### Frontend Service Configuration on Render

1. **Service Type**: Static Site
2. **Root Directory**: `frontend`
3. **Build Command**: `npm install && npm run build`
4. **Publish Directory**: `dist`
5. **Auto-Deploy**: Yes

## 🚀 Deployment Steps

### Step 1: Deploy Backend First

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set Root Directory to `backend`
4. Set Build Command to `npm install`
5. Set Start Command to `npm start`
6. Add the backend environment variables listed above
7. Deploy and wait for completion
8. Copy the backend URL (should be: https://ieee-me-mishraji-ka-aatank-backend.onrender.com)

### Step 2: Deploy Frontend

1. Create a new Static Site on Render
2. Connect the same GitHub repository
3. Set Root Directory to `frontend`
4. Set Build Command to `npm install && npm run build`
5. Set Publish Directory to `dist`
6. Add the frontend environment variables with the backend URL from Step 1
7. Deploy and wait for completion

### Step 3: Update Backend CORS

1. Go back to your backend service
2. Update the `FRONTEND_URL` environment variable with your frontend URL
3. The service will automatically redeploy

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Make sure the URL doesn't have a trailing slash

2. **API Not Found**: 
   - Check that `VITE_API_URL` points to the correct backend URL
   - Ensure the URL includes `/api` at the end

3. **Build Failures**: 
   - Check build logs on Render dashboard
   - Ensure all dependencies are properly listed in package.json

### Environment Variable Checklist

**Backend:**
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `FRONTEND_URL=https://ieee-me-mishraji-ka-aatank.onrender.com`

**Frontend:**
- [ ] `VITE_API_URL=https://ieee-me-mishraji-ka-aatank-backend.onrender.com/api`

## 📝 Notes

- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Environment variables are case-sensitive
- Changes to environment variables trigger automatic redeployment
- Never commit actual `.env` files to version control

## 🆘 Support

If you encounter issues:
1. Check Render service logs
2. Verify all environment variables are set correctly
3. Test API endpoints directly using the backend URL
4. Check browser console for frontend errors
