# Cloudinary Video Hosting Setup Guide

## Why Cloudinary?
- **25GB/month free bandwidth** (perfect for your video project)
- **Automatic video optimization** - adaptive bitrate streaming
- **CDN delivery** - global content delivery network
- **No complex setup** - just upload and get URLs

---

## Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **Sign Up** (free tier available)
3. Complete the registration
4. Go to **Dashboard** → Find your **Cloud Name** (looks like: `dhxxxxxx`)

---

## Step 2: Upload Your Videos

1. In Dashboard, go to **Media Library**
2. Click **Upload** button
3. Upload these 3 files from your `/public` folder:
   - `3371345-uhd_3840_2160_30fps.mp4`
   - `3720053-uhd_3840_2160_30fps.mp4`
   - `14863538_3840_2160_30fps.mp4`

4. For each video, click to select it and copy the **URL** from the right panel

---

## Step 3: Update Configuration

1. Open `src/config/videoUrls.js`
2. Replace `'your-cloud-name'` with your actual Cloudinary Cloud Name:

```javascript
const CLOUD_NAME = 'dh1234abc'; // Your actual cloud name here
```

3. Update the video public IDs if Cloudinary changed the filenames:

```javascript
export const VIDEO_URLS = {
  montage1: cloudinaryVideoUrl('3371345-uhd_3840_2160_30fps'),
  montage2: cloudinaryVideoUrl('3720053-uhd_3840_2160_30fps'),
  mainIntro: cloudinaryVideoUrl('14863538_3840_2160_30fps'),
};
```

---

## Step 4: Optional - Delete Local Videos

Once confirmed everything works in production:

1. Delete video files from `/public`:
   - `/public/3371345-uhd_3840_2160_30fps.mp4`
   - `/public/3720053-uhd_3840_2160_30fps.mp4`
   - `/public/14863538_3840_2160_30fps.mp4`

2. This reduces your GitHub repo size by ~200MB+ 🎉

---

## Step 5: Testing

1. Run your project locally:
   ```bash
   npm run dev
   ```

2. Check the **Network tab** in browser DevTools:
   - Videos should load from `res.cloudinary.com` domain
   - Should see optimized file sizes

3. Verify videos play correctly

---

## Benefits You Get

✅ **Smaller Git repo** - No large video files to commit
✅ **Faster CDN delivery** - Videos served from edge locations worldwide
✅ **Auto optimization** - Cloudinary compresses videos automatically
✅ **Better bandwidth** - Videos only served when viewed
✅ **Version control friendly** - URLs stored in config file

---

## Troubleshooting

**Videos not loading?**
- Check Cloud Name is correct in `videoUrls.js`
- Check Cloudinary URLs are accessible directly in browser
- Check browser console for CORS issues

**Want different video URL?**
- Just update the public ID in `src/config/videoUrls.js`
- No code changes needed

**Need to update video?**
- Upload new version to Cloudinary with same filename
- It automatically replaces the old one

---

## Advanced: Custom Transformations

Edit `videoUrls.js` to add more optimizations:

```javascript
// Lower quality for slower connections
function cloudinaryVideoUrl(publicId, options = {}) {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;
  // q_80 = 80% quality, f_auto = best format
  const transformations = 'q_80,f_auto';
  return `${baseUrl}/${transformations}/${publicId}`;
}
```

---

## Cloudinary Pricing

**Free Tier (always free):**
- 25GB bandwidth/month
- Unlimited storage
- Basic transformations
- Perfect for this project!

**When you grow:**
- Pay only for what you use
- $1 per additional GB
- Still very affordable

---

## Next Steps

1. ✅ Sign up for Cloudinary
2. ✅ Upload your 3 videos
3. ✅ Update `src/config/videoUrls.js` with your Cloud Name
4. ✅ Test locally
5. ✅ Delete local video files from `/public`
6. ✅ Commit and push to GitHub

Your repo is now **~200MB smaller** and videos are **CDN-optimized globally!** 🚀
