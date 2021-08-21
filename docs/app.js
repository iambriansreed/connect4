(()=>{"use strict";function e(...e){e.forEach((e=>e.style.display="inherit"))}function t(...e){e.forEach((e=>e.style.display="none"))}function r(e,t){const r=function(e,t){return{VerticalBottomToTop:()=>{const r=[];let n=t+0,o=3;for(;--n>-1&&r.length<o;)r.push([e,n]);for(r.reverse(),r.push([e,t]),n=t+0,o=r.length+3;++n<8&&r.length<o;)r.push([e,n]);return r},HorizontalLeftToRight:()=>{const r=[];let n=e+0,o=3;for(;--n>-1&&r.length<o;)r.push([n,t]);for(r.reverse(),r.push([e,t]),n=e+0,o=r.length+3;++n<8&&r.length<o;)r.push([n,t]);return r},DiagonalBottomLeftToTopRight:()=>{const r=[];let n=e+0,o=t+0,a=3;for(;--n>-1&&--o>-1&&r.length<a;)r.push([n,o]);for(r.reverse(),r.push([e,t]),n=e+0,o=t+0,a=r.length+3;++n<8&&++o<8&&r.length<a;)r.push([n,o]);return r},DiagonalTopLeftToBottomRight:()=>{const r=[];let n=e+0,o=t+0,a=3;for(;--n>-1&&++o<8&&r.length<a;)r.push([n,o]);for(r.reverse(),r.push([e,t]),n=e+0,o=t+0,a=r.length+3;++n<8&&--o>-1&&r.length<a;)r.push([n,o]);return r}}}(e,t);return[r.DiagonalBottomLeftToTopRight(),r.DiagonalTopLeftToBottomRight(),r.HorizontalLeftToRight(),r.VerticalBottomToTop()].filter((e=>e.length>=4)).reduce(((e,t)=>(t.length>4?(e.push(t.slice(0,4)),e.push(t.reverse().slice(0,4).reverse())):e.push(t),e)),[])}function n(e,t=!1){return r=this,n=void 0,a=function*(){return new Promise(((r,n)=>setTimeout((()=>t?n():r()),e)))},new((o=void 0)||(o=Promise))((function(e,t){function s(e){try{l(a.next(e))}catch(e){t(e)}}function c(e){try{l(a.throw(e))}catch(e){t(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(s,c)}l((a=a.apply(r,n||[])).next())}));var r,n,o,a}const o={player1:"player1",player2:"player2"},a={dropSpeed:400,defaultState:{currentPlayer:o.player1,aiPlayers:[o.player2],history:[],checkers:[],active:!1}};Object.freeze(o),Object.freeze(a),function(){const s=function(){const e=e=>Array.from(document.querySelectorAll(e)),t=t=>e(t)[0],r={board:t("#board"),blocker:t("#board .blocker"),gameOver:t("#game-over"),gameTie:t("#game-tie"),gameStart:t("#game-start"),resetBtns:e(".reset-btn"),startBtn:t("#start-btn"),buttons:e("#board button"),spacesWrapper:e("#board .spaces"),turnColor:e(".turn-color"),checkerTemplate:t("#template .checker"),checkers:[]};return r.startBtn.onclick=i,r.resetBtns.forEach((e=>e.onclick=h)),r.buttons.forEach(((e,t)=>e.onclick=()=>p(t))),Object.freeze(r),r}(),c=Object.assign({},a.defaultState);function l(e){c.active=e,[...s.resetBtns,...s.buttons].forEach((t=>{t.disabled=e}))}function i(){t(s.gameStart),s.board.className="turn-"+c.currentPlayer}function h(){if(c.active)return;const e=2*a.dropSpeed;c.checkers.forEach((t=>{t.style.transition=`top ${e}ms linear`,t.style.top=window.outerHeight+window.outerHeight/2+"px"})),n(e).then((()=>c.checkers.forEach((e=>e.remove())))),f(a.defaultState),s.board.className="turn-"+c.currentPlayer,t(s.gameOver),t(s.gameTie)}function u(e,t){return(c.history.find((r=>r.x===e&&r.y===t))||{}).player}function f(e){return Object.assign(c,e)}function p(i){e(s.blocker);const h=m(i);if(!(h<0))return function(e,t){return r=this,o=void 0,h=function*(){l(!0),t=Math.abs(t-7)+1;const r=a.dropSpeed/8*t,o=s.checkerTemplate.cloneNode(!0);s.board.appendChild(o);const i=s.board.lastChild;var h,u;return c.checkers.push(i),i.style.transform="rotate("+(h=1,u=360,h=Math.ceil(h),u=Math.floor(u),Math.floor(Math.random()*(u-h)+h)+"deg)"),i.classList.add(c.currentPlayer),setTimeout((()=>{i.style.transition=""}),r+100),i.style.transition=`top ${r}ms linear`,i.style.left=9*e+"vmin",i.style.display="",n(50).then((()=>(i.style.top=9*t+"vmin",n(r+300).then((()=>(l(!1),!0))))))},new((i=void 0)||(i=Promise))((function(e,t){function n(e){try{s(h.next(e))}catch(e){t(e)}}function a(e){try{s(h.throw(e))}catch(e){t(e)}}function s(t){var r;t.done?e(t.value):(r=t.value,r instanceof i?r:new i((function(e){e(r)}))).then(n,a)}s((h=h.apply(r,o||[])).next())}));var r,o,i,h}(i,h).then((()=>(function(e,t,r){f({history:[...c.history,{x:e,y:t,player:r}]})}(i,h,c.currentPlayer),t(s.blocker),function(e,t){return r(e,t).some((e=>e.every((e=>u(...e)===c.currentPlayer))))}(i,h)?n(250).then((()=>{e(s.gameOver)})):64===c.history.length?n(250).then((()=>{e(s.gameTie)})):(function(){const e=c.currentPlayer===o.player1?o.player2:o.player1;f({currentPlayer:e});const t=e[0].toUpperCase()+e.substr(1);s.board.className="turn-"+e,s.turnColor.forEach((e=>e.innerText=t)),Promise.resolve()}(),c.aiPlayers.includes(c.currentPlayer)?function(){const e=c.history[c.history.length-1],t=(e,t)=>e.map((e=>({matches:e.filter((e=>u(...e)===t)).length,moves:e.filter((e=>m(e[0])===e[1]))}))).filter((e=>e.moves.length>0)).sort(((e,t)=>e.matches===t.matches?e.moves>t.moves?-1:e.moves<t.moves?1:0:e.matches>t.matches?-1:e.matches<t.matches?1:0)),n=c.history.length?r(e.x,e.y):[];let o=null;t(n,c.currentPlayer);const a=t(n,e.player);if(a.length&&a.some((t=>{let n=t.moves[0];if(7===n[1])return o=n[0],!0;const a=[n[0],n[1]+1];return r(a[0],a[1]).map((t=>({matches:t.filter((t=>u(...t)===e.player)).length}))).sort(((e,t)=>e.matches>t.matches?-1:e.matches<t.matches?1:0)).every((e=>e.matches<3))?(o=n[0],!0):void 0})),!o)for(s=0,l=7,s=Math.ceil(s),l=Math.floor(l),o=Math.floor(Math.random()*(l-s))+s;-1===m(o);)++o>7&&(o=0);var s,l;return p(o)}():Promise.resolve()))))}function m(e){for(let t=0;t<8;t++)if(!u(e,t))return t;return-1}}()})();
//# sourceMappingURL=app.js.map