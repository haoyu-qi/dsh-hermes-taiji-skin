import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)))
const args=process.argv.slice(2),portIndex=args.indexOf('--port'),hostIndex=args.indexOf('--host')
const port=portIndex>=0?Number(args[portIndex+1]):4173,host=hostIndex>=0?args[hostIndex+1]:'127.0.0.1'
async function bundle(){return (await build({entryPoints:[path.join(root,'preview/entry.jsx')],bundle:true,write:false,format:'esm',plugins:[{name:'skin',setup(b){b.onResolve({filter:/\.\/plugin\.js$/},()=>({path:'skin',namespace:'skin'}));b.onLoad({filter:/.*/,namespace:'skin'},()=>({contents:fs.readFileSync(path.join(root,'client.js'),'utf8'),loader:'js'}))}}]})).outputFiles[0].text}
const types={'.html':'text/html','.css':'text/css','.png':'image/png','.webp':'image/webp','.js':'text/javascript'}
http.createServer(async(req,res)=>{
  if(req.url==='/bundle.js'){try{res.setHeader('Content-Type','text/javascript');res.end(await bundle())}catch(e){res.writeHead(500);res.end(String(e))}return}
  let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(url==='/')url='/preview/index.html'
  const file=path.resolve(root,'.'+url)
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404);res.end()}
}).listen(port,host,()=>console.log(`Qiankun V2 preview: http://${host}:${port}`))
