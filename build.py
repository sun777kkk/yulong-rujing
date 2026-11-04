"""Build a portable page from the editable HTML, CSS and JavaScript sources."""
from pathlib import Path
from urllib.parse import quote
import re

ROOT = Path(__file__).resolve().parent


def build():
    page = (ROOT / 'src/index.template.html').read_text(encoding='utf-8-sig')
    for filename in ('styles.css', 'refinement.css'):
        css = (ROOT / filename).read_text(encoding='utf-8-sig')
        css = re.sub(r'^@charset\s+"[^"]+";\s*', '', css)
        page = page.replace(
            f'<link rel="stylesheet" href="{filename}">',
            f'<style data-source="{filename}">\n{css}\n</style>',
        )
    scripts = []
    for filename in ('art.js', 'app.js'):
        page = page.replace(f'  <script src="{filename}" defer></script>\n', '')
        script = (ROOT / filename).read_text(encoding='utf-8-sig')
        # Inline scripts run at the end of body, after the interactive DOM exists.
        # Escape HTML's raw-text terminator without changing JavaScript strings.
        script = re.sub(r'</script', r'<\\/script', script, flags=re.IGNORECASE)
        scripts.append(f'<script data-source="{filename}">\n{script}\n</script>')
    favicon = (ROOT / 'assets/favicon.svg').read_text(encoding='utf-8-sig')
    page = page.replace('href="assets/favicon.svg"',
                        'href="data:image/svg+xml,' + quote(favicon, safe='') + '"')
    page = page.replace('</body>', '\n'.join(scripts) + '\n</body>')
    page = page.replace('<head>', '<head>\n  <!-- Portable build. Edit src/index.template.html and run build.py. -->', 1)
    (ROOT / 'index.html').write_text(page, encoding='utf-8')
    print(f'Built {ROOT / "index.html"} ({len(page.encode("utf-8")):,} bytes)')


if __name__ == '__main__':
    build()
