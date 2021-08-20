(()=>{"use strict";function e(...e){e.forEach((e=>e.style.display="inherit"))}function t(...e){e.forEach((e=>e.style.display="none"))}function r(e,t){const r=function(e,t){return{VerticalBottomToTop:()=>{const r=[];let o=t+0,n=3;for(;--o>-1&&r.length<n;)r.push([e,o]);for(r.reverse(),r.push([e,t]),o=t+0,n=r.length+3;++o<8&&r.length<n;)r.push([e,o]);return r},HorizontalLeftToRight:()=>{const r=[];let o=e+0,n=3;for(;--o>-1&&r.length<n;)r.push([o,t]);for(r.reverse(),r.push([e,t]),o=e+0,n=r.length+3;++o<8&&r.length<n;)r.push([o,t]);return r},DiagonalBottomLeftToTopRight:()=>{const r=[];let o=e+0,n=t+0,a=3;for(;--o>-1&&--n>-1&&r.length<a;)r.push([o,n]);for(r.reverse(),r.push([e,t]),o=e+0,n=t+0,a=r.length+3;++o<8&&++n<8&&r.length<a;)r.push([o,n]);return r},DiagonalTopLeftToBottomRight:()=>{const r=[];let o=e+0,n=t+0,a=3;for(;--o>-1&&++n<8&&r.length<a;)r.push([o,n]);for(r.reverse(),r.push([e,t]),o=e+0,n=t+0,a=r.length+3;++o<8&&--n>-1&&r.length<a;)r.push([o,n]);return r}}}(e,t);return[r.DiagonalBottomLeftToTopRight(),r.DiagonalTopLeftToBottomRight(),r.HorizontalLeftToRight(),r.VerticalBottomToTop()].filter((e=>e.length>=4)).reduce(((e,t)=>(t.length>4?(e.push(t.slice(0,4)),e.push(t.reverse().slice(0,4).reverse())):e.push(t),e)),[])}function o(e,t=!1){return new Promise(((r,o)=>setTimeout((()=>t?o():r()),e)))}const n={player1:"player1",player2:"player2"},a={dropSpeed:300,defaultState:{currentPlayer:n.player1,aiPlayers:[n.player2],history:[]}};Object.freeze(n),Object.freeze(a),function(){const s=function(){const e=e=>Array.from(document.querySelectorAll(e)),t=t=>e(t)[0],r={board:t("#board"),blocker:t("#board .blocker"),gameOver:t("#game-over"),gameTie:t("#game-tie"),gameStart:t("#game-start"),resetBtns:e(".reset-btn"),startBtn:t("#start-btn"),buttons:e("#board button"),spacesWrapper:e("#board .spaces"),turnColor:e(".turn-color"),checkerTemplate:t("#template .checker")};return r.startBtn.onclick=c,r.resetBtns.forEach((e=>e.onclick=h)),r.buttons.forEach(((e,t)=>e.onclick=()=>f(t))),Object.freeze(r),r}(),l=Object.assign({},a.defaultState);function c(){t(s.gameStart),s.board.className="turn-"+l.currentPlayer}function h(){const e=Array.from(document.getElementsByClassName("checker"));e.forEach((e=>e.style.top=window.outerHeight+window.outerHeight/2+"px")),o(1e3).then((()=>e.forEach((e=>e.remove())))),u(a.defaultState),s.board.className="turn-"+l.currentPlayer,t(s.gameOver),t(s.gameTie)}function i(e,t){return(l.history.find((r=>r.x===e&&r.y===t))||{}).player}function u(e){return Object.assign(l,e)}function f(c){e(s.blocker);const h=m(c);if(!(h<0))return function(e,t){t=Math.abs(t-7)+1;const r=a.dropSpeed/4*t,n=s.checkerTemplate.cloneNode(!0);s.board.appendChild(n);const c=s.board.lastChild;return c.style.transform="rotate("+(h=1,i=360,h=Math.ceil(h),i=Math.floor(i),Math.floor(Math.random()*(i-h)+h)+"deg)"),c.classList.add(l.currentPlayer),setTimeout((()=>{c.style.transition=""}),r+100),c.style.transition=`top ${r}ms linear`,c.style.left=9*e+"vmin",c.style.display="",o(50).then((()=>(c.style.top=9*t+"vmin",o(r+300))));var h,i}(c,h).then((()=>(function(e,t,r){u({history:[...l.history,{x:e,y:t,player:r}]})}(c,h,l.currentPlayer),t(s.blocker),function(e,t){return r(e,t).some((e=>e.every((e=>i(...e)===l.currentPlayer))))}(c,h)?o(250).then((()=>e(s.gameOver))):64===l.history.length?o(250).then((()=>e(s.gameTie))):(function(){const e=l.currentPlayer===n.player1?n.player2:n.player1;u({currentPlayer:e});const t=e[0].toUpperCase()+e.substr(1);s.board.className="turn-"+e,s.turnColor.forEach((e=>e.innerText=t)),Promise.resolve()}(),l.aiPlayers.includes(l.currentPlayer)?function(){const e=l.history[l.history.length-1],t=(e,t)=>e.map((e=>({matches:e.filter((e=>i(...e)===t)).length,moves:e.filter((e=>m(e[0])===e[1]))}))).filter((e=>e.moves.length>0)).sort(((e,t)=>e.matches===t.matches?e.moves>t.moves?-1:e.moves<t.moves?1:0:e.matches>t.matches?-1:e.matches<t.matches?1:0)),o=l.history.length?r(e.x,e.y):[];let n=null;t(o,l.currentPlayer);const a=t(o,e.player);if(a.length&&a.some((t=>{let o=t.moves[0];if(7===o[1])return n=o[0],!0;const a=[o[0],o[1]+1];return r(a[0],a[1]).map((t=>({matches:t.filter((t=>i(...t)===e.player)).length}))).sort(((e,t)=>e.matches>t.matches?-1:e.matches<t.matches?1:0)).every((e=>e.matches<3))?(n=o[0],!0):void 0})),!n)for(s=0,c=7,s=Math.ceil(s),c=Math.floor(c),n=Math.floor(Math.random()*(c-s))+s;-1===m(n);)++n>7&&(n=0);var s,c;return f(n)}():Promise.resolve()))))}function m(e){for(let t=0;t<8;t++)if(!i(e,t))return t;return-1}}()})();
//# sourceMappingURL=app.js.map