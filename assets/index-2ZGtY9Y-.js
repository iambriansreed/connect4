(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();async function E(e,n,t,o){return new Promise(r=>{const c=Object.keys(n).map(f=>`${f} ${Math.round(t)}ms ${o}`).join(",");e.style.transition=c,setTimeout(()=>{Object.assign(e.style,n)},1),setTimeout(()=>{e.style.transition="",r()},t+50)})}const H=e=>e?[...e.parentElement.children].reduce((n,t,o)=>t===e?o:n,-1):-1,b=e=>Array.from(document.querySelectorAll(e)),d=e=>b(e)[0],W=e=>{const n=document.createElement("temp");return n.innerHTML=d("template#"+e).innerHTML.trim(),n.firstChild};function S(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e))+e}function x(...e){e.forEach(n=>n.style.display="inherit")}function w(...e){e.forEach(n=>n.style.display="none")}function D(e,n){return{VerticalBottomToTop:()=>{const t=[];let o=n+0,r=3;for(;--o>-1&&t.length<r;)t.push([e,o]);for(t.reverse(),t.push([e,n]),o=n+0,r=t.length+3;++o<8&&t.length<r;)t.push([e,o]);return t},HorizontalLeftToRight:()=>{const t=[];let o=e+0,r=3;for(;--o>-1&&t.length<r;)t.push([o,n]);for(t.reverse(),t.push([e,n]),o=e+0,r=t.length+3;++o<8&&t.length<r;)t.push([o,n]);return t},DiagonalBottomLeftToTopRight:()=>{const t=[];let o=e+0,r=n+0,c=3;for(;--o>-1&&--r>-1&&t.length<c;)t.push([o,r]);for(t.reverse(),t.push([e,n]),o=e+0,r=n+0,c=t.length+3;++o<8&&++r<8&&t.length<c;)t.push([o,r]);return t},DiagonalTopLeftToBottomRight:()=>{const t=[];let o=e+0,r=n+0,c=3;for(;--o>-1&&++r<8&&t.length<c;)t.push([o,r]);for(t.reverse(),t.push([e,n]),o=e+0,r=n+0,c=t.length+3;++o<8&&--r>-1&&t.length<c;)t.push([o,r]);return t}}}function C(e,n){const t=D(e,n);return[t.DiagonalBottomLeftToTopRight(),t.DiagonalTopLeftToBottomRight(),t.HorizontalLeftToRight(),t.VerticalBottomToTop()].filter(o=>o.length>=4).reduce((o,r)=>(r.length>4?(o.push(r.slice(0,4)),o.push(r.reverse().slice(0,4).reverse())):o.push(r),o),[])}const R=6,j=7,A={player1:"Red Wins!",player2:"Yellow Wins!"},P={defaultState:{currentPlayer:"player1",aiPlayers:["player2"],history:[],dropping:0},defaultColumns:""};Object.freeze(P);function F(){const e={...P.defaultState};globalThis.state=()=>e;const n=W("checker"),t=s=>{const a=n.cloneNode(!0);return a.classList.add(s),a},o=()=>{e.dropping||w(i.gameStart)},r=async()=>{if(e.dropping)return;i.columns.style.top="0px";const s=Math.round(window.outerHeight+window.outerHeight/2);E(i.columns,{transform:"translateY("+s+"px)"},s/2.5,"cubic-bezier(0.33333, 0, 0.66667, 0.33333)").then(()=>{i.columns.style.transform="",i.columns.style.transition="",i.columns.style.top="0px",[...i.columns.children].forEach(a=>a.innerHTML="")}),f(P.defaultState),w(i.gameOver),w(i.gameTie)},c=(s,a)=>e.history.find(l=>l.x===s&&l.y===a),f=s=>Object.assign(e,s),B=(s,a)=>C(s,a).some(p=>p.every(v=>{var g;return((g=c(...v))==null?void 0:g.player)===e.currentPlayer})),Y=()=>e.history.length===64,z=s=>{i.nextChecker.style.left=s*i.size.clientWidth+"px"},L=async s=>{if(e.dropping)return;const a=M(s);if(a<0)return Promise.resolve();f({dropping:e.dropping+1});const l=t(e.currentPlayer);try{i.column[s].appendChild(l)}catch(m){throw console.log(s,e.currentPlayer),m}const p=l.offsetTop+l.getBoundingClientRect().height,v=i.nextChecker.offsetTop;i.nextChecker.style.opacity="0",l.style.top=v+"px",l.style.position="fixed";const h=(Math.abs(a-R)+1)*75;if(await E(l,{transform:"translateY("+(p-v)+"px)"},h,"cubic-bezier(0.33333, 0, 0.66667, 0.33333)"),l.style.transform="",l.style.position="relative",l.style.top="",i.nextChecker.style.opacity="1",f({history:[...e.history,{x:s,y:a,player:e.currentPlayer}]}),B(s,a)){i.winMessage.innerText=A[e.currentPlayer],x(i.gameOver),f({dropping:e.dropping-1});return}if(Y()){x(i.gameTie),f({dropping:e.dropping-1});return}const u=e.currentPlayer==="player1"?"player2":"player1";f({dropping:e.dropping-1,currentPlayer:u}),e.aiPlayers.includes(u)&&await N()},M=s=>{var l;if(!i.column[s])return-1;const a=(l=i.column[s])==null?void 0:l.children.length;return a<R?a:-1},N=async()=>{const s=e.history[e.history.length-1],a=(g,h)=>g.map(u=>({matches:u.filter(m=>{var y;return((y=c(...m))==null?void 0:y.player)===h}).length,moves:u.filter(m=>M(m[0])===m[1])})).filter(u=>u.moves.length>0).sort((u,m)=>u.matches===m.matches?u.moves>m.moves?-1:u.moves<m.moves?1:0:u.matches>m.matches?-1:u.matches<m.matches?1:0),l=e.history.length?C(s.x,s.y):[];let p=null;const v=a(l,s.player);if(v.length&&v.some(g=>{let h=g.moves[0];if(h[1]===j)return p=h[0],!0;const u=[h[0],h[1]+1];if(C(u[0],u[1]).map(y=>({matches:y.filter(T=>{var k;return((k=c(...T))==null?void 0:k.player)===s.player}).length})).sort((y,T)=>y.matches>T.matches?-1:y.matches<T.matches?1:0).every(y=>y.matches<3))return p=h[0],!0}),p===null){let g=[];for(let h=0;h<7;h++)console.log(h),M(h)!==-1&&g.push(h);return console.log({availableColumns:g}),g[S(0,g.length)]}return L(p)},i={board:d("#board"),columns:d("#board .columns"),size:d("#size"),gameOver:d("#game-over"),gameTie:d("#game-tie"),gameStart:d("#game-start"),resetButtons:b(".reset-btn"),startButton:d("#start-btn"),buttons:b("#board button"),spacesWrapper:b("#board .spaces"),winMessage:d(".win-message"),checkers:d(".checkers"),next:d(".next .track"),nextChecker:t("player1"),column:[]};i.gameStart.style.display="flex",i.next.appendChild(i.nextChecker),i.column=[...i.columns.children];const O=(s,a)=>{const l=s.target;if(!l.classList.contains("column"))return;const p=H(l);if(p===-1||p>=i.column.length){console.error("column not found ",{event:s,element:l,index:p});return}a(p)};i.board.onmouseover=s=>O(s,z),i.board.onclick=s=>O(s,L),i.startButton.onclick=o,i.resetButtons.forEach(s=>s.onclick=r),globalThis.app=()=>i}for(let e=0;e<1e6;e++){const n=S(0,7);n===7&&console.log(n)}addEventListener("load",F);
