import os
import glob
import re

app_dir = "/Users/adminbaike/vneshtat/app"
files = glob.glob(os.path.join(app_dir, "**/page.tsx"), recursive=True)

# Pattern to find the acc-top div and everything inside it, ending with </div> matching acc-top
# Actually it's easier to just use regex that replaces the block.
# Since the block is usually exactly this:
acc_top_regex = re.compile(r'<div className="acc-top">.*?<div className="acc-top-right">.*?</div>\s*</div>', re.DOTALL)

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    if 'Header' not in content and 'className="acc-top"' in content:
        # Add import if missing
        import_stmt = 'import Header from "../Header";\n'
        if f == os.path.join(app_dir, "page.tsx"):
            import_stmt = 'import Header from "./Header";\n'
        else:
            # How deep is it?
            rel_path = os.path.relpath(f, app_dir)
            depth = len(rel_path.split(os.sep)) - 1
            if depth == 1:
                import_stmt = 'import Header from "../Header";\n'
            elif depth == 2:
                import_stmt = 'import Header from "../../Header";\n'

        # find where to put the import
        if 'import' in content:
            content = re.sub(r'(import .*?\n)', r'\1' + import_stmt, content, count=1)
        else:
            content = import_stmt + content
        
        # Replace the acc-top block with <Header />
        # Check if setMessenger is used in the file
        if 'setMessenger(true)' in content:
            if 'setDrawer("personal")' in content:
                # for account page
                replacement = '<Header onMessengerClick={() => setMessenger(true)} onManageAccountClick={() => setDrawer("personal")} />'
            else:
                replacement = '<Header onMessengerClick={() => setMessenger(true)} />'
        else:
            replacement = '<Header />'
            
        content = acc_top_regex.sub(replacement, content)
        
        # for account/page.tsx, we also need to remove the inline menu state and JSX
        if 'account/page.tsx' in f:
            content = re.sub(r'\s*const \[menu, setMenu\] = useState\(false\);', '', content)
            # remove the menu JSX block
            content = re.sub(r'\{/\* ---------------- account dropdown ---------------- \*/\}.*?\{/\* ---------------- drawers ---------------- \*/\}', '{/* ---------------- drawers ---------------- */}', content, flags=re.DOTALL)

        with open(f, 'w') as file:
            file.write(content)
            
print("Done")
