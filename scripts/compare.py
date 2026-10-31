from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
root=Path('output')
rows=[]
for state in ['main','fortune','boot']:
    a=Image.open(root/f'reference-{state}.png').convert('RGB')
    b=Image.open(root/f'v2-{state}.png').convert('RGB')
    row=Image.new('RGB',(1440,482),'#ece8e0')
    row.paste(ImageOps.contain(a,(720,450)),(0,32))
    row.paste(ImageOps.contain(b,(720,450)),(720,32))
    ImageDraw.Draw(row).text((16,8),f'REFERENCE / {state}',fill='#383344')
    ImageDraw.Draw(row).text((736,8),f'IMPLEMENTATION / {state}',fill='#383344')
    rows.append(row)
    print(state,a.size,b.size)
canvas=Image.new('RGB',(1440,1446),'white')
for i,row in enumerate(rows):canvas.paste(row,(0,i*482))
canvas.save(root/'comparison-v2.png')
a=Image.open(root/'reference-fortune.png').convert('RGB').crop((181,48,1266,1034))
b=Image.open(root/'v2-fortune.png').convert('RGB').crop((360,125,1080,775))
canvas=Image.new('RGB',(1440,680),'#ece8e0')
canvas.paste(ImageOps.contain(a,(720,650)),(0,25));canvas.paste(ImageOps.contain(b,(720,650)),(720,25))
canvas.save(root/'comparison-fortune-detail.png')
