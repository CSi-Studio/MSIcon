"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[681],{983:function(ae,N,a){a.r(N),a.d(N,{default:function(){return B}});var R=a(5574),S=a.n(R),z=a(59117),E=a(52645),k=a(48689),w=a(79964),P=a(40411),T=a(85265),J=a(45626),x=a(67294),r={main:"main___nE_fr",bg:"bg___fRjmJ",head:"head___b7ePZ",ms:"ms___l4XFp",ul:"ul___nu5uz",contact:"contact___RdIwk",box:"box___YcKSu",container:"container___ck4JA",info:"info___XvMIU",footer:"footer___luJ5s",shop:"shop___uxsQ4",shopDelete:"shopDelete___fT4OW",down:"down___vo9lb",down1:"down1___SOxOy"},b=a(75601),t=a(14244),e=a(85893),X=function(){(0,x.useEffect)(function(){var s=function(){return new Promise(function(o,l){if(window.AMap)o(window.AMap);else{var d=document.createElement("script");d.src="https://webapi.amap.com/maps?v=2.0&key=40335db62d1bb586ba8505e0c06ccac1",d.async=!0,d.onerror=l,d.onload=function(){o(window.AMap)},document.head.appendChild(d)}})};s().then(function(n){new n.Map("container",{viewMode:"2D",zoom:17,center:[116.868382,36.683262]})}).catch(function(n){console.error("\u52A0\u8F7D\u5730\u56FE\u5931\u8D25",n)})},[]);var W=(0,x.useState)(!1),O=S()(W,2),Q=O[0],A=O[1],G=(0,x.useState)([]),L=S()(G,2),v=L[0],C=L[1],H=function(){C([]),localStorage.removeItem("num")},U=localStorage.getItem("num"),g=U?JSON.parse(U):[],K=function(n){var o=v.filter(function(l){return l!==n});C(o),localStorage.setItem("num",JSON.stringify(o))},Y=(0,x.useState)(200),Z=S()(Y,2),u=Z[0],V=Z[1],$=function(n){var o=b.Z.find(function(i){return i.id===n});if(!o){console.error("Icon not found");return}var l=o.path,d=o.name;fetch(l).then(function(i){return i.text()}).then(function(i){var y=new DOMParser,f=y.parseFromString(i,"image/svg+xml"),j=f.querySelector("svg");j.setAttribute("width","".concat(u,"px")),j.setAttribute("height","".concat(u,"px"));var F=new XMLSerializer,D=F.serializeToString(f),p=new Blob([D],{type:"image/svg+xml"}),c=URL.createObjectURL(p),h=document.createElement("a");h.href=c,h.download="".concat(d,".svg"),document.body.appendChild(h),h.click(),document.body.removeChild(h),URL.revokeObjectURL(c)})},_=function(n){var o=b.Z.find(function(i){return i.id===n});if(!o){console.error("Icon not found");return}var l=o.path,d=o.name;fetch(l).then(function(i){return i.text()}).then(function(i){var y=new DOMParser,f=y.parseFromString(i,"image/svg+xml"),j=new XMLSerializer,F=j.serializeToString(f),D=new Blob([F],{type:"image/svg+xml"}),p=URL.createObjectURL(D),c=document.createElement("canvas"),h=c.getContext("2d");c.width=u,c.height=u;var I=new Image;I.src=p,I.onload=function(){h.drawImage(I,0,0,c.width,c.height);var oe=c.toDataURL("image/png"),m=document.createElement("a");m.href=oe,m.download="".concat(d,".png"),document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(p)}})},q=function(){v.forEach(function(n){$(n)}),localStorage.removeItem("num"),M()},ee=function(){g.forEach(function(n){_(n)}),localStorage.removeItem("num"),M()},ne=function(n){var o=n.target.value;console.log(o),V(o)},M=function(){A(!1)},te=function(){A(!0),C(g)};return(0,e.jsxs)("div",{className:r.main,children:[(0,e.jsxs)("div",{className:r.bg,children:[(0,e.jsxs)("div",{className:r.head,children:[(0,e.jsx)("div",{className:r.ms,children:"MS-ICON"}),(0,e.jsxs)("ul",{className:r.ul,children:[(0,e.jsx)("li",{children:(0,e.jsx)(w.Z,{to:"/",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(t.FormattedMessage,{id:"HomePage"})})}),(0,e.jsx)("li",{children:(0,e.jsx)(w.Z,{to:"/IconLibrary",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(t.FormattedMessage,{id:"OfficialIconLibrary"})})}),(0,e.jsx)("li",{style:{fontWeight:"700"},children:(0,e.jsx)(w.Z,{to:"/About",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(t.FormattedMessage,{id:"About Us"})})}),(0,e.jsx)("li",{onClick:te,children:(0,e.jsx)(P.Z,{count:g&&g.length||0,children:(0,e.jsx)(z.Z,{style:{fontSize:"24px"}})})}),(0,e.jsx)("li",{children:(0,e.jsx)(t.SelectLang,{style:{marginTop:"-8px"}})})]})]}),(0,e.jsx)("div",{className:r.contact,children:(0,e.jsx)(t.FormattedMessage,{id:"Contact Us"})})]}),(0,e.jsxs)("div",{className:r.box,children:[(0,e.jsx)("div",{id:"container",className:r.container}),(0,e.jsxs)("div",{className:r.info,children:[(0,e.jsx)("p",{children:(0,e.jsx)(t.FormattedMessage,{id:"Address"})}),(0,e.jsx)("p",{children:(0,e.jsx)(t.FormattedMessage,{id:"Postal Code"})}),(0,e.jsx)("p",{children:(0,e.jsx)(t.FormattedMessage,{id:"Phone"})}),(0,e.jsx)("p",{children:(0,e.jsx)(t.FormattedMessage,{id:"Email"})})]})]}),(0,e.jsxs)(T.Z,{title:(0,e.jsxs)("div",{onClick:H,style:{cursor:"pointer"},children:[" ",(0,e.jsx)(E.Z,{}),(0,e.jsx)(t.FormattedMessage,{id:"empty cart"})]}),placement:"right",onClose:M,open:Q,children:[v.length?(0,e.jsx)("div",{className:r.shop,children:v.map(function(s){var n=b.Z.find(function(l){return l.id===s});if(n){var o=n.component;return(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(o,{viewBox:"0 0 24 24",style:{width:"70px",height:"70px"}},n.id),(0,e.jsx)("div",{className:r.shopDelete,onClick:function(){return K(s)},children:(0,e.jsx)(k.Z,{style:{fontSize:"50px",color:"white"}})})]})}return null})}):(0,e.jsx)("p",{children:(0,e.jsx)(t.FormattedMessage,{id:"Quickly"})}),(0,e.jsx)("div",{style:{position:"absolute",bottom:"320px",left:"40px"},children:(0,e.jsx)(t.FormattedMessage,{id:"Choose"})}),(0,e.jsxs)("div",{style:{fontSize:"16px",position:"absolute",bottom:"280px",left:"40px"},children:[" ",(0,e.jsx)(J.Z,{placeholder:"200",style:{width:"50px",height:"26px",marginLeft:"5px"},onChange:ne}),(0,e.jsx)("span",{style:{marginLeft:"5px",marginRight:"5px"},children:"x"}),u]}),(0,e.jsxs)("div",{className:r.down,onClick:function(){return ee()},children:[(0,e.jsx)(t.FormattedMessage,{id:"download"})," png"]}),(0,e.jsxs)("div",{className:r.down1,onClick:function(){return q()},children:[(0,e.jsx)(t.FormattedMessage,{id:"download"})," svg"]})]}),(0,e.jsx)("div",{className:r.footer,children:(0,e.jsxs)("div",{children:[(0,e.jsxs)("ul",{children:[(0,e.jsx)("li",{children:"MS-ICON"}),(0,e.jsx)("li",{children:"MS-ICON"}),(0,e.jsx)("li",{children:(0,e.jsx)(t.FormattedMessage,{id:"Friendship link"})}),(0,e.jsx)("li",{children:(0,e.jsx)(t.FormattedMessage,{id:"About Us"})})]}),(0,e.jsxs)("ul",{children:[(0,e.jsx)("li",{children:(0,e.jsx)(t.FormattedMessage,{id:"MS-ICON"})}),(0,e.jsx)("li",{children:(0,e.jsx)(t.FormattedMessage,{id:"Usage Guide"})}),(0,e.jsx)("li",{children:(0,e.jsx)("a",{href:"https://www.iconfont.cn/",children:"icon-font"})}),(0,e.jsx)("li",{children:(0,e.jsx)("a",{href:"https://github.com/CSi-Studio/MSIcon",children:(0,e.jsx)("img",{src:"./github _github 1.png",alt:""})})})]})]})})]})},B=X}}]);
