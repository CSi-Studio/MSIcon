"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[681],{983:function(K,v,t){t.r(v),t.d(v,{default:function(){return D}});var b=t(5574),f=t.n(b),y=t(59117),F=t(52645),N=t(48689),u=t(79964),A=t(40411),I=t(85265),m=t(67294),s={main:"main___nE_fr",bg:"bg___fRjmJ",head:"head___b7ePZ",ms:"ms___l4XFp",ul:"ul___nu5uz",down:"down___vo9lb",contact:"contact___RdIwk",box:"box___YcKSu",container:"container___ck4JA",info:"info___XvMIU",footer:"footer___luJ5s"},g=t(75517),n=t(14244),e=t(85893),O=function(){(0,m.useEffect)(function(){var a=function(){return new Promise(function(i,r){if(window.AMap)i(window.AMap);else{var l=document.createElement("script");l.src="https://webapi.amap.com/maps?v=2.0&key=40335db62d1bb586ba8505e0c06ccac1",l.async=!0,l.onerror=r,l.onload=function(){i(window.AMap)},document.head.appendChild(l)}})};a().then(function(o){new o.Map("container",{viewMode:"2D",zoom:17,center:[116.868382,36.683262]})}).catch(function(o){console.error("\u52A0\u8F7D\u5730\u56FE\u5931\u8D25",o)})},[]);var Z=(0,m.useState)(!1),p=f()(Z,2),U=p[0],S=p[1],L=(0,m.useState)([]),M=f()(L,2),h=M[0],x=M[1],z=function(){x([]),localStorage.removeItem("num")},C=localStorage.getItem("num"),j=C?JSON.parse(C):[],E=function(o){var i=h.filter(function(r){return r!==o});x(i),localStorage.setItem("num",JSON.stringify(i))},P=function(o){var i=g.Z.find(function(d){return d.id===o});if(!i){console.error("Icon not found");return}var r=i.path,l=i.name;fetch(r).then(function(d){return d.text()}).then(function(d){var T=new DOMParser,X=T.parseFromString(d,"image/svg+xml"),B=new XMLSerializer,G=B.serializeToString(X),H=new Blob([G],{type:"image/svg+xml"}),w=URL.createObjectURL(H),c=document.createElement("a");c.href=w,c.download="".concat(l,".svg"),document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(w)})},R=function(){h.forEach(function(o){P(o)}),localStorage.removeItem("num")},k=function(){S(!1)},J=function(){S(!0),x(j)};return(0,e.jsxs)("div",{className:s.main,children:[(0,e.jsxs)("div",{className:s.bg,children:[(0,e.jsxs)("div",{className:s.head,children:[(0,e.jsx)("div",{className:s.ms,children:"MS-ICON"}),(0,e.jsxs)("ul",{className:s.ul,children:[(0,e.jsx)("li",{children:(0,e.jsx)(u.Z,{to:"/",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(n.FormattedMessage,{id:"HomePage"})})}),(0,e.jsx)("li",{children:(0,e.jsx)(u.Z,{to:"/IconLibrary",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(n.FormattedMessage,{id:"OfficialIconLibrary"})})}),(0,e.jsx)("li",{style:{fontWeight:"700"},children:(0,e.jsx)(u.Z,{to:"/About",style:{textDecoration:"none",color:"#000000"},children:(0,e.jsx)(n.FormattedMessage,{id:"About Us"})})}),(0,e.jsx)("li",{onClick:J,children:(0,e.jsx)(A.Z,{count:j&&j.length||0,children:(0,e.jsx)(y.Z,{style:{fontSize:"24px"}})})}),(0,e.jsx)("li",{children:(0,e.jsx)(n.SelectLang,{style:{marginTop:"-8px"}})})]})]}),(0,e.jsx)("div",{className:s.contact,children:(0,e.jsx)(n.FormattedMessage,{id:"Contact Us"})})]}),(0,e.jsxs)("div",{className:s.box,children:[(0,e.jsx)("div",{id:"container",className:s.container}),(0,e.jsxs)("div",{className:s.info,children:[(0,e.jsx)("p",{children:(0,e.jsx)(n.FormattedMessage,{id:"Address"})}),(0,e.jsx)("p",{children:(0,e.jsx)(n.FormattedMessage,{id:"Postal Code"})}),(0,e.jsx)("p",{children:(0,e.jsx)(n.FormattedMessage,{id:"Phone"})}),(0,e.jsx)("p",{children:(0,e.jsx)(n.FormattedMessage,{id:"Email"})})]})]}),(0,e.jsxs)(I.Z,{title:(0,e.jsxs)("div",{onClick:z,style:{cursor:"pointer"},children:[" ",(0,e.jsx)(F.Z,{}),(0,e.jsx)(n.FormattedMessage,{id:"empty cart"})]}),placement:"right",onClose:k,open:U,children:[h.length?(0,e.jsx)("div",{className:s.shop,children:h.map(function(a){var o=g.Z.find(function(r){return r.id===a});if(o){var i=o.component;return(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(i,{viewBox:"0 0 24 24",style:{width:"70px",height:"70px"}},o.id),(0,e.jsx)("div",{className:s.shopDelete,onClick:function(){return E(a)},children:(0,e.jsx)(N.Z,{style:{fontSize:"50px",color:"white"}})})]})}return null})}):(0,e.jsx)("p",{children:(0,e.jsx)(n.FormattedMessage,{id:"Quickly"})}),(0,e.jsx)("div",{className:s.down,onClick:function(){return R()},children:(0,e.jsx)(n.FormattedMessage,{id:"download"})})]}),(0,e.jsx)("div",{className:s.footer,children:(0,e.jsxs)("div",{children:[(0,e.jsxs)("ul",{children:[(0,e.jsx)("li",{children:"MS-ICON"}),(0,e.jsx)("li",{children:"MS-ICON"}),(0,e.jsx)("li",{children:(0,e.jsx)(n.FormattedMessage,{id:"Friendship link"})}),(0,e.jsx)("li",{children:(0,e.jsx)(n.FormattedMessage,{id:"About Us"})})]}),(0,e.jsxs)("ul",{children:[(0,e.jsx)("li",{children:(0,e.jsx)(n.FormattedMessage,{id:"MS-ICON"})}),(0,e.jsx)("li",{children:(0,e.jsx)(n.FormattedMessage,{id:"Usage Guide"})}),(0,e.jsx)("li",{children:(0,e.jsx)("a",{href:"https://www.iconfont.cn/",children:"icon-font"})}),(0,e.jsx)("li",{children:(0,e.jsx)("a",{href:"https://github.com/CSi-Studio/MSIcon",children:(0,e.jsx)("img",{src:"./github _github 1.png",alt:""})})})]})]})})]})},D=O}}]);