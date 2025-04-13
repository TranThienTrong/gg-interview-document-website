"use strict";(self.webpackChunkgg_interview_document=self.webpackChunkgg_interview_document||[]).push([[7643],{7643:(t,e,a)=>{a.d(e,{diagram:()=>z});var r=a(7354),n=a(5395),i=a(6627),s=a(2107),o=a(8731),l={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},c={axes:[],curves:[],options:l},d=structuredClone(c),g=s.UI.radar,u=(0,s.K2)((()=>(0,n.$t)({...g,...(0,s.zj)().radar})),"getConfig"),h=(0,s.K2)((()=>d.axes),"getAxes"),p=(0,s.K2)((()=>d.curves),"getCurves"),x=(0,s.K2)((()=>d.options),"getOptions"),m=(0,s.K2)((t=>{d.axes=t.map((t=>({name:t.name,label:t.label??t.name})))}),"setAxes"),$=(0,s.K2)((t=>{d.curves=t.map((t=>({name:t.name,label:t.label??t.name,entries:f(t.entries)})))}),"setCurves"),f=(0,s.K2)((t=>{if(null==t[0].axis)return t.map((t=>t.value));const e=h();if(0===e.length)throw new Error("Axes must be populated before curves for reference entries");return e.map((e=>{const a=t.find((t=>t.axis?.$refText===e.name));if(void 0===a)throw new Error("Missing entry for axis "+e.label);return a.value}))}),"computeCurveEntries"),v={getAxes:h,getCurves:p,getOptions:x,setAxes:m,setCurves:$,setOptions:(0,s.K2)((t=>{const e=t.reduce(((t,e)=>(t[e.name]=e,t)),{});d.options={showLegend:e.showLegend?.value??l.showLegend,ticks:e.ticks?.value??l.ticks,max:e.max?.value??l.max,min:e.min?.value??l.min,graticule:e.graticule?.value??l.graticule}}),"setOptions"),getConfig:u,clear:(0,s.K2)((()=>{(0,s.IU)(),d=structuredClone(c)}),"clear"),setAccTitle:s.SV,getAccTitle:s.iN,setDiagramTitle:s.ke,getDiagramTitle:s.ab,getAccDescription:s.m7,setAccDescription:s.EI},y=(0,s.K2)((t=>{(0,r.S)(t,v);const{axes:e,curves:a,options:n}=t;v.setAxes(e),v.setCurves(a),v.setOptions(n)}),"populate"),w={parse:(0,s.K2)((async t=>{const e=await(0,o.qg)("radar",t);s.Rm.debug(e),y(e)}),"parse")},b=(0,s.K2)(((t,e,a,r)=>{const n=r.db,s=n.getAxes(),o=n.getCurves(),l=n.getOptions(),c=n.getConfig(),d=n.getDiagramTitle(),g=(0,i.D)(e),u=C(g,c),h=l.max??Math.max(...o.map((t=>Math.max(...t.entries)))),p=l.min,x=Math.min(c.width,c.height)/2;M(u,s,x,l.ticks,l.graticule),K(u,s,x,c),L(u,s,o,p,h,l.graticule,c),A(u,o,l.showLegend,c),u.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)}),"draw"),C=(0,s.K2)(((t,e)=>{const a=e.width+e.marginLeft+e.marginRight,r=e.height+e.marginTop+e.marginBottom,n=e.marginLeft+e.width/2,i=e.marginTop+e.height/2;return t.attr("viewbox",`0 0 ${a} ${r}`).attr("width",a).attr("height",r),t.append("g").attr("transform",`translate(${n}, ${i})`)}),"drawFrame"),M=(0,s.K2)(((t,e,a,r,n)=>{if("circle"===n)for(let i=0;i<r;i++){const e=a*(i+1)/r;t.append("circle").attr("r",e).attr("class","radarGraticule")}else if("polygon"===n){const n=e.length;for(let i=0;i<r;i++){const s=a*(i+1)/r,o=e.map(((t,e)=>{const a=2*e*Math.PI/n-Math.PI/2;return`${s*Math.cos(a)},${s*Math.sin(a)}`})).join(" ");t.append("polygon").attr("points",o).attr("class","radarGraticule")}}}),"drawGraticule"),K=(0,s.K2)(((t,e,a,r)=>{const n=e.length;for(let i=0;i<n;i++){const s=e[i].label,o=2*i*Math.PI/n-Math.PI/2;t.append("line").attr("x1",0).attr("y1",0).attr("x2",a*r.axisScaleFactor*Math.cos(o)).attr("y2",a*r.axisScaleFactor*Math.sin(o)).attr("class","radarAxisLine"),t.append("text").text(s).attr("x",a*r.axisLabelFactor*Math.cos(o)).attr("y",a*r.axisLabelFactor*Math.sin(o)).attr("class","radarAxisLabel")}}),"drawAxes");function L(t,e,a,r,n,i,s){const o=e.length,l=Math.min(s.width,s.height)/2;a.forEach(((e,a)=>{if(e.entries.length!==o)return;const c=e.entries.map(((t,e)=>{const a=2*Math.PI*e/o-Math.PI/2,i=k(t,r,n,l);return{x:i*Math.cos(a),y:i*Math.sin(a)}}));"circle"===i?t.append("path").attr("d",T(c,s.curveTension)).attr("class",`radarCurve-${a}`):"polygon"===i&&t.append("polygon").attr("points",c.map((t=>`${t.x},${t.y}`)).join(" ")).attr("class",`radarCurve-${a}`)}))}function k(t,e,a,r){return r*(Math.min(Math.max(t,e),a)-e)/(a-e)}function T(t,e){const a=t.length;let r=`M${t[0].x},${t[0].y}`;for(let n=0;n<a;n++){const i=t[(n-1+a)%a],s=t[n],o=t[(n+1)%a],l=t[(n+2)%a],c={x:s.x+(o.x-i.x)*e,y:s.y+(o.y-i.y)*e},d={x:o.x-(l.x-s.x)*e,y:o.y-(l.y-s.y)*e};r+=` C${c.x},${c.y} ${d.x},${d.y} ${o.x},${o.y}`}return`${r} Z`}function A(t,e,a,r){if(!a)return;const n=3*(r.width/2+r.marginRight)/4,i=3*-(r.height/2+r.marginTop)/4;e.forEach(((e,a)=>{const r=t.append("g").attr("transform",`translate(${n}, ${i+20*a})`);r.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${a}`),r.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(e.label)}))}(0,s.K2)(L,"drawCurves"),(0,s.K2)(k,"relativeRadius"),(0,s.K2)(T,"closedRoundCurve"),(0,s.K2)(A,"drawLegend");var O={draw:b},S=(0,s.K2)(((t,e)=>{let a="";for(let r=0;r<t.THEME_COLOR_LIMIT;r++){const n=t[`cScale${r}`];a+=`\n\t\t.radarCurve-${r} {\n\t\t\tcolor: ${n};\n\t\t\tfill: ${n};\n\t\t\tfill-opacity: ${e.curveOpacity};\n\t\t\tstroke: ${n};\n\t\t\tstroke-width: ${e.curveStrokeWidth};\n\t\t}\n\t\t.radarLegendBox-${r} {\n\t\t\tfill: ${n};\n\t\t\tfill-opacity: ${e.curveOpacity};\n\t\t\tstroke: ${n};\n\t\t}\n\t\t`}return a}),"genIndexStyles"),I=(0,s.K2)((t=>{const e=(0,s.P$)(),a=(0,s.zj)(),r=(0,n.$t)(e,a.themeVariables);return{themeVariables:r,radarOptions:(0,n.$t)(r.radar,t)}}),"buildRadarStyleOptions"),z={parser:w,db:v,renderer:O,styles:(0,s.K2)((({radar:t}={})=>{const{themeVariables:e,radarOptions:a}=I(t);return`\n\t.radarTitle {\n\t\tfont-size: ${e.fontSize};\n\t\tcolor: ${e.titleColor};\n\t\tdominant-baseline: hanging;\n\t\ttext-anchor: middle;\n\t}\n\t.radarAxisLine {\n\t\tstroke: ${a.axisColor};\n\t\tstroke-width: ${a.axisStrokeWidth};\n\t}\n\t.radarAxisLabel {\n\t\tdominant-baseline: middle;\n\t\ttext-anchor: middle;\n\t\tfont-size: ${a.axisLabelFontSize}px;\n\t\tcolor: ${a.axisColor};\n\t}\n\t.radarGraticule {\n\t\tfill: ${a.graticuleColor};\n\t\tfill-opacity: ${a.graticuleOpacity};\n\t\tstroke: ${a.graticuleColor};\n\t\tstroke-width: ${a.graticuleStrokeWidth};\n\t}\n\t.radarLegendText {\n\t\ttext-anchor: start;\n\t\tfont-size: ${a.legendFontSize}px;\n\t\tdominant-baseline: hanging;\n\t}\n\t${S(e,a)}\n\t`}),"styles")}}}]);