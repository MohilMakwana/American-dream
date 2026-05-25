const warmed = new Set();

function buildWarmupUrl(source) {
  if (!source?.id) return null;
  if (source.type === 'vimeo') {
    return `https://player.vimeo.com/video/${source.id}?autoplay=0&muted=1&background=1&controls=0&title=0&byline=0&portrait=0`;
  }
  if (source.type === 'youtube') {
    const id = source.id;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1`;
  }
  return null;
}

/** Preload Vimeo/YouTube embeds in a hidden iframe so active slides start faster. */
export function warmupVideo(source) {
  const url = buildWarmupUrl(source);
  if (!url || warmed.has(url)) return;
  warmed.add(url);

  const frame = document.createElement('iframe');
  frame.src = url;
  frame.setAttribute('aria-hidden', 'true');
  frame.setAttribute('tabindex', '-1');
  frame.style.cssText =
    'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;border:0';
  document.body.appendChild(frame);

  window.setTimeout(() => {
    frame.remove();
  }, 45000);
}

export function warmupVideos(sources = []) {
  sources.forEach(warmupVideo);
}
