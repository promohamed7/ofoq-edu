import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all <img> tags
    img_pattern = re.compile(r'<img\s+[^>]+>')
    
    def replace_img(match):
        img_tag = match.group(0)
        
        # Skip if already lazy loaded
        if 'loading="lazy"' in img_tag:
            return img_tag
            
        # Target only /media/ images or specific large static images
        is_target = False
        if '/media/' in img_tag:
            is_target = True
        elif 'metrics-section' in img_tag or 'contact-header-section' in img_tag or 'opening-position' in img_tag:
            is_target = True
            
        if is_target:
            # Add loading="lazy" and fetchpriority="low" before the closing bracket
            # We want to insert it right before the closing '>'
            if img_tag.endswith('/>'):
                return img_tag[:-2] + ' loading="lazy" fetchpriority="low" />'
            else:
                return img_tag[:-1] + ' loading="lazy" fetchpriority="low">'
        return img_tag

    new_content = img_pattern.sub(replace_img, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        # print(f"Updated")

for root, dirs, files in os.walk('d:\\Work\\ofoq-edu.com'):
    if '.git' in root or '.testsprite' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Lazy loading script completed.")
