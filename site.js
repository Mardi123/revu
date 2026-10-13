document.querySelector('#copy').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#command').textContent);
    status.textContent = 'Copied. Replace the example path with your Git repository.';
  } catch {
    status.textContent = 'Select and copy the command above; clipboard access is unavailable.';
  }
});
