// Deterministic perspective town. Character cells are drawn only during travel.
const random = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
const buildings = []
for (let row = 0; row < 30; row++) for (const side of [-1, 1]) {
  const seed = row * 7 + side + 1
  buildings.push({ x: side * (8 + random(seed) * 1.5), z: 16 + row * 8, w: 4 + random(seed + 2) * 2.5, h: 8 + random(seed + 3) * 20, d: 6.5, seed })
}
// A real facade in the same perspective world, visited during selected work.
buildings.push({ x: -9, z: 84, w: 8, h: 42, d: 7, seed: 899, landmark: true, labels: ['NEUROFLARES', 'FREELANCE', 'CISCO', 'STUDIODROP'] })
buildings.push({ x: -9, z: 148, w: 8, h: 42, d: 7, seed: 900, landmark: true, labels: ['SONICBITS', 'DEMODAG', 'SOTTO'] })

export function drawTown(ctx, width, height, progress, quality, focus = 0, rise = 0, lookDown = 0) {
  if (!width || !height) return
  const cell = quality === 'lite' ? 13 : width < 700 ? 9 : 11
  const camera = progress * 172 + focus * 20, focal = Math.min(width * .87, height * 1.18), horizon = height * .45
  const eye = 2.4 + focus * (4 + rise * 26), sway = Math.sin(progress * Math.PI * 3) * .65 * (1 - focus) - focus * 4
  const cosine = Math.cos(lookDown), sine = Math.sin(lookDown)
  const project = (x,y,z) => {
    const depth=z-camera, vertical=y-eye, rotatedDepth=depth*cosine-vertical*sine
    return depth<1 || rotatedDepth<1 ? null : [width/2+(x-sway)*focal/rotatedDepth,horizon-(vertical*cosine+depth*sine)*focal/rotatedDepth,depth]
  }
  ctx.fillStyle='#061c2a';ctx.fillRect(0,0,width,height)
  const face = (corners,seed,sideFace=false) => {
    const points=corners.map(p=>project(...p))
    if(points.some(p=>!p))return
    const minX=Math.max(0,Math.min(...points.map(p=>p[0]))),maxX=Math.min(width,Math.max(...points.map(p=>p[0])))
    const minY=Math.max(0,Math.min(...points.map(p=>p[1]))),maxY=Math.min(height,Math.max(...points.map(p=>p[1])))
    if(minX>=maxX||minY>=maxY)return
    ctx.save();ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.clip()
    ctx.fillStyle=sideFace?'#0b2b3e':'#092536';ctx.fillRect(minX,minY,maxX-minX,maxY-minY)
    const distance=points.reduce((sum,p)=>sum+p[2],0)/4,fade=Math.max(.13,1-distance/120)
    ctx.font=`${cell-1}px monospace`;ctx.textBaseline='top'
    for(let y=Math.floor(minY/cell)*cell;y<maxY;y+=cell)for(let x=Math.floor(minX/cell)*cell;x<maxX;x+=cell){
      const screenRayY=(horizon-y)/focal,denominator=cosine+screenRayY*sine
      if (denominator <= .001) continue
      const rayX=(x-width/2)/focal/denominator,rayY=(screenRayY*cosine-sine)/denominator
      const depth=sideFace?(corners[0][0]-sway)/rayX:corners[0][2]-camera
      if(!Number.isFinite(depth)||depth<1)continue
      const worldY=eye+rayY*depth,along=sideFace?camera+depth:sway+rayX*depth
      const col=Math.floor(along*1.4),row=Math.floor(worldY*1.15)
      const lit=random(col*13+row*31+seed)>.56&&((along*1.4)%1+1)%1<.68&&((worldY*1.15)%1+1)%1<.8
      ctx.fillStyle=lit?`rgba(125,211,247,${fade*.9})`:`rgba(69,137,177,${fade*.3})`
      ctx.fillText(Math.abs(col+row)%2 === 0 ? '0' : '1',x,y)
    }
    ctx.restore()
  }
  const visible=buildings.filter(b=>b.z-camera>2&&b.z-camera<100 && (b.landmark || !(b.x < 0 && ((b.z >= 56 && b.z <= 92) || (b.z >= 120 && b.z <= 156))))).sort((a,b)=>b.z-a.z)
  for(const b of visible){
    const left=b.x-b.w/2,right=b.x+b.w/2,near=b.z,far=b.z+b.d,inner=b.x<0?right:left
    face([[inner,0,near],[inner,b.h,near],[inner,b.h,far],[inner,0,far]],b.seed,true)
    face([[left,0,near],[left,b.h,near],[right,b.h,near],[right,0,near]],b.seed)
    if (b.landmark) {
      for (let floor = 0; floor < b.labels.length; floor++) {
        const y = 6.4 + floor * 26 / (b.labels.length - 1)
        const a = project(left, y - 2, near - .05), c = project(right, y + 2, near - .05)
        if (!a || !c) continue
        const selected = Math.round(rise * (b.labels.length - 1)) === floor && focus > .5
        ctx.fillStyle = selected ? '#123f5bee' : '#061c2aee'
        ctx.fillRect(a[0], c[1], c[0] - a[0], a[1] - c[1])
        ctx.strokeStyle = selected ? '#94deff' : '#316184'
        ctx.strokeRect(a[0], c[1], c[0] - a[0], a[1] - c[1])
        const size = Math.min(24, Math.max(8, focal / a[2] * .4))
        ctx.font = `${size}px monospace`; ctx.fillStyle = selected ? '#b6ebff' : '#5c92af'
        ctx.fillText(`0${floor + 1} / ${b.labels[floor]}`, a[0] + 12, (a[1] + c[1]) / 2, Math.max(1, c[0] - a[0] - 24))
      }
    }
  }
  ctx.font=`${cell-1}px monospace`
  for(let z=Math.ceil((camera+3)/4)*4;z<camera+100;z+=4){
    for(let step=0;step<1.7;step+=.17){const p=project(0,.01,z+step);if(p&&p[1]>=0&&p[1]<height){ctx.fillStyle='#a5b3a775';ctx.fillText(':',p[0],p[1])}}
  }
  for(const side of [-1,1])for(let z=camera+2;z<camera+100;z+=.6){const p=project(side*5.3,0,z);if(p&&p[1]<height){ctx.fillStyle='#83999255';ctx.fillText('.',p[0],p[1])}}
  // Crosswalks reinforce forward motion without frame-by-frame animation.
  for(let crossing=23;crossing<270;crossing+=38){
    if(crossing-camera<2||crossing-camera>70)continue
    for(let stripe=-4;stripe<=4;stripe++){
      const a=project(stripe,0,crossing),b=project(stripe+.58,0,crossing+1.7)
      if(!a||!b)continue
      ctx.fillStyle='#bec3af80'
      for(let y=Math.max(0,b[1]);y<Math.min(height,a[1]);y+=cell)for(let x=Math.max(0,a[0]);x<Math.min(width,b[0]);x+=cell)ctx.fillText('=',x,y)
    }
  }
  // Ground tiles make the final downward view legible without loading a texture.
  if (lookDown > .05) {
    ctx.strokeStyle = '#37749a44'; ctx.lineWidth = 1
    for (let z = Math.floor(camera) + 2; z < camera + 30; z += 2) {
      const a = project(-5.3, 0, z), b = project(5.3, 0, z)
      if (!a || !b) continue
      ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()
    }
    for (let x = -5; x <= 5; x++) {
      const a = project(x, 0, camera + 1.1), b = project(x, 0, camera + 30)
      if (!a || !b) continue
      ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()
    }
  }
  for(const b of visible.filter(b=>b.seed%3===0)){
    const p=project(b.x,3.4,b.z-.1)
    if(!p||p[0]<0||p[0]>width)continue
    const size=Math.min(19,Math.max(6,focal/p[2]*.3))
    ctx.font=`${size}px monospace`;ctx.fillStyle=b.x<0?'#78cbee':'#c0e8ff';ctx.globalAlpha=Math.max(.2,1-p[2]/110)
    ctx.fillText(b.seed%2?'≡ WORKSHOP ≡':'::: OPEN :::',p[0]-size*3,p[1]);ctx.globalAlpha=1
  }
  const shade=ctx.createRadialGradient(width*.5,height*.48,width*.12,width*.5,height*.5,width*.8)
  shade.addColorStop(0,'#00000000');shade.addColorStop(1,'#080d1266');ctx.fillStyle=shade;ctx.fillRect(0,0,width,height)
}
