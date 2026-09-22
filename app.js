// Busca o release mais recente e aponta o botão direto para o APK.
// Se a API falhar ou estourar o limite de requisições, o link do HTML já
// aponta para /releases/latest, então o download continua funcionando.

const REPO = 'valb-mig/copyguru';

function formatSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

async function loadLatestRelease() {
  const button = document.getElementById('download');
  const meta = document.getElementById('meta');
  if (!button || !meta) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return;

    const release = await response.json();
    const apk = (release.assets || []).find((asset) => asset.name.endsWith('.apk'));
    if (!apk) return;

    button.href = apk.browser_download_url;
    button.setAttribute('download', apk.name);

    const parts = [
      release.tag_name,
      formatSize(apk.size),
      'Android 8.0+',
    ];
    meta.textContent = parts.join(' · ');
    meta.title = `Publicado em ${formatDate(release.published_at)}`;
  } catch {
    // silencioso de propósito: o fallback do HTML resolve
  }
}

loadLatestRelease();
