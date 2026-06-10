import os
import re

nav_desktop_template = '''<nav class=\"sidebar-nav\">
<div class=\"nav-section-title\">Main</div>
<a class=\"nav-item {d}\" href=\"index.html\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 22V12h6v10\"/></svg>Dashboard</a>
<a class=\"nav-item {p}\" href=\"programs.html\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 21h8m-4-4v4\"/></svg>Programs</a>
<a class=\"nav-item {c}\" href=\"clients.html\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\" fill=\"none\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 3.13a4 4 0 010 7.75\"/></svg>Clients</a>
<a class=\"nav-item {t}\" href=\"tasks.html\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\"/></svg>Tasks</a>
<div class=\"nav-section-title\">Manage</div>
<a class=\"nav-item {s}\" href=\"settings.html\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\"/><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"none\"/></svg>Settings</a>
</nav>'''

nav_mobile_template = '''<nav class=\"mobile-nav\">
<button class=\"mobile-nav-item {d}\" onclick=\"location.href='index.html'\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z\"/></svg>Dashboard</button>
<button class=\"mobile-nav-item {p}\" onclick=\"location.href='programs.html'\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" fill=\"none\"/><path stroke-linecap=\"round\" d=\"M8 21h8m-4-4v4\"/></svg>Programs</button>
<button class=\"mobile-nav-item {c}\" onclick=\"location.href='clients.html'\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\" fill=\"none\"/></svg>Clients</button>
<button class=\"mobile-nav-item {t}\" onclick=\"location.href='tasks.html'\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\"/></svg>Tasks</button>
<button class=\"mobile-nav-item {s}\" onclick=\"location.href='settings.html'\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\"/><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"none\"/></svg>Settings</button>
</nav>'''

files = ['index.html', 'clients.html', 'programs.html', 'tasks.html']

for f in files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    d = 'active' if f == 'index.html' else ''
    p = 'active' if f == 'programs.html' else ''
    c = 'active' if f == 'clients.html' else ''
    t = 'active' if f == 'tasks.html' else ''
    s = 'active' if f == 'settings.html' else ''
    
    desktop_str = nav_desktop_template.format(d=d, p=p, c=c, t=t, s=s)
    mobile_str = nav_mobile_template.format(d=d, p=p, c=c, t=t, s=s)
    
    content = re.sub(r'<nav class=\"sidebar-nav\">[\s\S]*?</nav>', desktop_str, content)
    content = re.sub(r'<nav class=\"mobile-nav\">[\s\S]*?</nav>', mobile_str, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("done")
