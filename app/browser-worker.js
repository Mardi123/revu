/* Browser-local compiled engine. Imported source is never sent over HTTP. */
importScripts('./wasm_exec.js');
let initialized;
function initialize(){
 if(!initialized)initialized=(async()=>{
  const go=new Go();
  const response=await fetch('./revu-engine.wasm');
  if(!response.ok)throw Error('Unable to download the review engine. Refresh and try again.');
  const wasm=await WebAssembly.instantiate(await response.arrayBuffer(),go.importObject);
  go.run(wasm.instance);
  if(typeof self.revuEngine!=='function')throw Error('Review engine did not start.');
 })();return initialized;
}
let queue=Promise.resolve();
self.onmessage=({data})=>{
 queue=queue.then(async()=>{try{await initialize();const result=JSON.parse(self.revuEngine(JSON.stringify(data)));self.postMessage({id:data.id,...result});}catch(error){self.postMessage({id:data.id,error:String(error.message||error)});}});
};
