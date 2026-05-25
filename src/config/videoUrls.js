/**
 * Video URLs hosted on Cloudinary CDN
 * Get your Cloud Name from: https://cloudinary.com/console/settings/general
 * 
 * Setup instructions: See CLOUDINARY_SETUP.md
 * Environment variable: VITE_CLOUDINARY_CLOUD_NAME (set in .env file)
 */

// Cloudinary Cloud Name from environment variables
// In development: reads from .env file
// In production: typically injected by CI/CD pipeline
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dje7pewib';

if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.warn('⚠️  VITE_CLOUDINARY_CLOUD_NAME not set. Using default fallback. Set it in .env for production.');
}

/**
 * Generates optimized Cloudinary video URL with transformations
 */
function cloudinaryVideoUrl(publicId) {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;
  // q_auto = auto quality, f_auto = auto format (best for device)
  const transformations = 'q_auto,f_auto';
  return `${baseUrl}/${transformations}/${publicId}.mp4`;
}

/**
 * Video URLs for the project
 * Direct video file URLs with Cloudinary version IDs
 */
export const VIDEO_URLS = {
  // Montage frame videos
  montage1: cloudinaryVideoUrl('3371345-uhd_3840_2160_30fps_vyvkei'),
  montage2: cloudinaryVideoUrl('3720053-uhd_3840_2160_30fps_owylsu'),
  
  // Main intro video
  mainIntro: cloudinaryVideoUrl('14863538_3840_2160_30fps_ysl5uw'),
};

export default VIDEO_URLS;
