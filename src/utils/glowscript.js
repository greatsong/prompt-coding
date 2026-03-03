/**
 * VPython/GlowScript 코드를 iframe srcdoc용 HTML로 감싸는 유틸
 */
export function buildGlow(code) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://www.glowscript.org/css/ide.css">
<script src="https://www.glowscript.org/lib/glow/glow.min.js"><\/script>
<style>body{margin:0;background:#10101a;overflow:hidden}#g{width:100%;height:100vh}canvas{width:100%!important;height:100%!important}</style>
</head><body><div id="g"><script type="text/javascript">
async function m(){var vector=vec;let scene=canvas();scene.background=color.gray(0.1);scene.width=window.innerWidth;scene.height=window.innerHeight;
try{${code.replace(/\n/g, ";\n")}}catch(e){scene.caption="Error: "+e.message}}m();
<\/script></div></body></html>`;
}
