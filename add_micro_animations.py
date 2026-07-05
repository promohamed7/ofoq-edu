import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # 1. Course Cards
    target1 = 'class="w-full flex flex-col justify-start items-start gap-[24px] p-[24px] bg-white rounded-[12px] border border-[1px] border-gray-100 shadow-sm"'
    replacement1 = 'class="w-full flex flex-col justify-start items-start gap-[24px] p-[24px] bg-white rounded-[12px] border border-[1px] border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"'
    new_content = new_content.replace(target1, replacement1)
    
    # 2. Blog Grid Cards (Article)
    target2 = 'class="w-full flex flex-col gap-[32px]" itemscope'
    replacement2 = 'class="w-full flex flex-col gap-[32px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group rounded-[12px]" itemscope'
    new_content = new_content.replace(target2, replacement2)
    
    # 3. Big Blog Card (ar/blog/index.html)
    target3 = 'class="flex flex-col w-full gap-[32px]"'
    replacement3 = 'class="flex flex-col w-full gap-[32px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group rounded-[12px]"'
    new_content = new_content.replace(target3, replacement3)
    
    # 4. Horizontal Blog Cards (ar/blog/index.html)
    target4 = 'class="w-full flex flex-col justify-start items-start gap-[32px] lg:flex-row lg:gap-[24px]"'
    replacement4 = 'class="w-full flex flex-col justify-start items-start gap-[32px] lg:flex-row lg:gap-[24px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group rounded-[12px]"'
    new_content = new_content.replace(target4, replacement4)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

for root, dirs, files in os.walk('d:\\Work\\ofoq-edu.com'):
    if '.git' in root or '.testsprite' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Micro animations added.")
