export const fetchWithTimeout = async function(resource, options) {
  const { timeout = 8000 } = options;
  const controller = new window.AbortController();
  const id = setTimeout(() => {console.log("aborting");controller.abort()}, timeout); 

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id); 
  return response; 
}