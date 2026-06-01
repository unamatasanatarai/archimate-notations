import os
import sys
import json
import re

def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]', '', text)
    text = re.sub(r'\-\-+', '-', text)
    return text

current_dir = os.path.dirname(os.path.abspath(__file__)) if '__file__' in locals() else os.getcwd()
data_path = os.path.join(current_dir, 'data.json')

if not os.path.exists(data_path):
    print(f"Error: data.json file not found at {data_path}", file=sys.stderr)
    sys.exit(1)

with open(data_path, 'r', encoding='utf-8') as f:
    items = json.load(f)

generated_html = ''

for item in items:
    slug = slugify(item.get('name', ''))
    layer_class = re.sub(r'[^a-z0-9]', '-', item.get('layer', '').lower())
    escaped_name = item.get('name', '').replace('"', '&quot;')
    
    generated_html += f'      <article class="card" data-name="{escaped_name}" data-layer="{item.get("layer", "")}" id="{slug}" role="listitem" tabindex="0">\n'
    generated_html += f'        <div class="card-header">\n'
    generated_html += f'          <span class="layer-badge badge-{layer_class}">{item.get("layer", "")}</span>\n'
    generated_html += f'        </div>\n'
    generated_html += f'        <div class="card-visual" aria-hidden="true">\n'
    generated_html += f'          {item.get("svg", "")}\n'
    generated_html += f'        </div>\n'
    generated_html += f'        <div class="card-body">\n'
    generated_html += f'          <h3 class="card-title">{item.get("name", "")}</h3>\n'
    generated_html += f'          <p class="card-description">{item.get("description", "")}</p>\n'
    generated_html += f'        </div>\n'
    generated_html += f'      </article>\n\n'

print("=== STATIC CARDS GENERATION GENERATED COMPLIANT OUTPUT ===")
print(f"Generated {len(items)} cards successfully.")

output_path = os.path.join(current_dir, 'cards-output.html.txt')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(generated_html)

print("Saved generated cards code block to 'cards-output.html.txt'")