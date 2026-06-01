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
    name = item.get('name', '')
    layer = item.get('layer', '')
    description = item.get('description', '')
    meta_taxonomy = item.get('meta-taxonomy', '')
    svg_content = item.get('svg', '')
    
    slug = slugify(name)
    
    # Layer class resolution matching app.js logic mapping
    canonical = layer.lower()
    if 'strategy' in canonical:
        layer_class = 'badge-strategy'
    elif 'business' in canonical:
        layer_class = 'badge-business'
    elif 'application' in canonical:
        layer_class = 'badge-application'
    elif 'technology' in canonical:
        layer_class = 'badge-technology'
    elif 'physical' in canonical:
        layer_class = 'badge-physical'
    elif 'motivation' in canonical:
        layer_class = 'badge-motivation'
    elif 'implementation' in canonical:
        layer_class = 'badge-implementation'
    elif 'composite' in canonical:
        layer_class = 'badge-composite'
    else:
        layer_class = 'badge-relationship'
        
    escaped_name = name.replace('"', '&quot;')
    
    # Handle meta-taxonomy parsing
    meta_taxonomy_html = ''
    if meta_taxonomy:
        tags = [t.strip() for t in meta_taxonomy.split('/') if t.strip()]
        if tags:
            tag_spans = ''.join(f'<span class="taxonomy-tag">{tag}</span>' for tag in tags)
            meta_taxonomy_html = f'        <div class="card-meta-taxonomy">\n          {tag_spans}\n        </div>\n'

    generated_html += f'      <article class="card" data-name="{escaped_name}" data-layer="{layer}" id="{slug}" role="listitem" tabindex="0">\n'
    generated_html += f'        <div class="card-header">\n'
    generated_html += f'          <span class="layer-badge {layer_class}">{layer}</span>\n'
    generated_html += f'          <button class="card-permalink" data-hash="#{slug}" aria-label="Copy permalink to {escaped_name}" title="Copy permalink to clipboard">🔗</button>\n'
    generated_html += f'        </div>\n'
    generated_html += f'        <div class="card-visual" aria-hidden="true">\n'
    generated_html += f'          {svg_content}\n'
    generated_html += f'        </div>\n'
    generated_html += f'        <div class="card-body">\n'
    generated_html += f'          <h3 class="card-title">{name}</h3>\n'
    generated_html += f'          <p class="card-description">{description}</p>\n'
    generated_html += f'        </div>\n'
    generated_html += f'{meta_taxonomy_html}'
    generated_html += f'      </article>\n\n'

print("=== STATIC CARDS GENERATION GENERATED COMPLIANT OUTPUT ===")
print(f"Generated {len(items)} cards successfully.")

output_path = os.path.join(current_dir, 'cards-output.html.txt')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(generated_html)

print("Saved generated cards code block to 'cards-output.html.txt'")
