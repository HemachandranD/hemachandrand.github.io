import{q as t,u as e,F as o,x as h}from"./index-ZtDiQ8qg.js";/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],d=t("activity",l);/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],c=t("bot",p);/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]],y=t("workflow",x),m={agents:c,observability:d,mlops:y};function u({detailed:r=!1}){return e.jsx("div",{className:"expertise-grid",children:o.map((s,i)=>{const n=m[s.icon]??c;return e.jsxs(h.article,{className:"glass glass-card expertise-card",initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{duration:.5,delay:i*.08,ease:[.23,1,.32,1]},children:[e.jsxs("div",{className:"expertise-top",children:[e.jsx("span",{className:"expertise-icon","aria-hidden":"true",children:e.jsx(n,{className:"w-5 h-5"})}),e.jsxs("span",{className:"expertise-num",children:["0",i+1]})]}),e.jsx("h3",{className:"expertise-title",children:s.category}),e.jsx("p",{className:"expertise-summary",children:s.summary}),r&&e.jsx("div",{className:"expertise-tools",children:s.items.map(a=>e.jsx("span",{className:"chip chip-sm",children:a},a))})]},s.category)})})}export{u as E};
