from pathlib import Path
root=Path(__file__).resolve().parent
(root/"index.html").write_text((root/"src/index.template.html").read_text(encoding="utf-8"),encoding="utf-8")
print("Built index.html from src/index.template.html")
