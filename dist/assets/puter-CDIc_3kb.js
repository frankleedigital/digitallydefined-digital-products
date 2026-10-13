var hc=Object.defineProperty;var zi=n=>{throw TypeError(n)};var fc=(n,e,t)=>e in n?hc(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var p=(n,e,t)=>fc(n,typeof e!="symbol"?e+"":e,t),fs=(n,e,t)=>e.has(n)||zi("Cannot "+t);var h=(n,e,t)=>(fs(n,e,"read from private field"),t?t.call(n):e.get(n)),E=(n,e,t)=>e.has(n)?zi("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),y=(n,e,t,r)=>(fs(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),_=(n,e,t)=>(fs(n,e,"access private method"),t);var Ze=(n,e,t,r)=>({set _(s){y(n,e,s,t)},get _(){return h(n,e,r)}});function ga(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}const pc="modulepreload",mc=function(n){return"/"+n},Hi={},Wi=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(u=>{if(u=mc(u),u in Hi)return;Hi[u]=!0;const l=u.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${c}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":pc,l||(d.as="script"),d.crossOrigin="",d.href=u,a&&d.setAttribute("nonce",a),document.head.appendChild(d),l)return new Promise((f,g)=>{d.addEventListener("load",f),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})};var he,ma;let gc=(ma=class{constructor(e=[]){E(this,he);y(this,he,[new Map(e)])}get size(){return h(this,he).reduce((e,t)=>e+t.size,0)}clear(){y(this,he,[new Map])}delete(e){return h(this,he).some(t=>t.delete(e))}get(e){for(const t of h(this,he))if(t.has(e))return t.get(e)}has(e){return h(this,he).some(t=>t.has(e))}set(e,t){let r=h(this,he)[0];for(const s of h(this,he))if(s.has(e)){r=s;break}return!r.has(e)&&r.size>=8388608&&(h(this,he).unshift(new Map),r=h(this,he)[0]),r.set(e,t),this}*[Symbol.iterator](){for(const e of h(this,he))yield*e}*keys(){for(const e of h(this,he))yield*e.keys()}*values(){for(const e of h(this,he))yield*e.values()}*entries(){for(const e of h(this,he))yield*e.entries()}forEach(e,t){for(const[r,s]of this)e.call(t,s,r,this)}},he=new WeakMap,ma);var bc=gc;const O=bc;function ba(n,e){const t=n.toLowerCase(),r=e.toLowerCase();if(r==="")return!1;if(r.indexOf("*")===-1&&r.indexOf("?")===-1&&r.indexOf("[")===-1&&r.indexOf("{")===-1)return t===r;let s=r;const i=s.match(/\{([^}]+)\}/);if(i)return i[1].split(",").map(c=>s.replace(i[0],c.trim())).some(c=>ba(n,c));let o="",a=0;for(;a<s.length;){const u=s[a];if(u==="*")o+=".*";else if(u==="?")o+=".";else if(u==="["){let l=a+1,c="[";for(;l<s.length&&s[l]!=="]";)c+=s[l],l++;l<s.length?(c+="]",o+=c,a=l):o+="\\["}else/[.+^${}()|\\]/.test(u)?o+="\\"+u:o+=u;a++}try{return new RegExp("^"+o+"$","i").test(n)}catch{return t===r}}const yc=20;class wc{constructor(e={}){typeof e=="string"&&(e={dbName:e}),this.store=new O,this.expireTimes=new O,this.db=null,this.dbName=e.dbName,this.dbVersion=e.dbVersion||1,this.isIndexedDBAvailable=!1,this.isInitialized=!1,this.initPromise=null,this.storeSet=(t,r)=>{this.store.set(t,r),this._initCleanupLoop(yc),this.isIndexedDBAvailable&&this.db&&this._persistToIndexedDB(t,r)},this._initIndexedDB()}_initIndexedDB(){typeof window<"u"&&window.indexedDB&&this.dbName?(this.isIndexedDBAvailable=!0,this.initPromise=this._setupIndexedDB()):this.isInitialized=!0}async _setupIndexedDB(){try{this.db=await this._openDatabase(),await this._loadFromIndexedDB(),this.isInitialized=!0}catch(e){console.warn("Failed to initialize IndexedDB:",e),this.isIndexedDBAvailable=!1,this.isInitialized=!0}}_openDatabase(){return new Promise((e,t)=>{const r=indexedDB.open(this.dbName,this.dbVersion);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=s=>{const i=s.target.result;i.objectStoreNames.contains("store")||i.createObjectStore("store",{keyPath:"key"}),i.objectStoreNames.contains("expireTimes")||i.createObjectStore("expireTimes",{keyPath:"key"})}})}async _loadFromIndexedDB(){if(this.db)try{const e=this.db.transaction(["store","expireTimes"],"readonly"),t=e.objectStore("store"),r=e.objectStore("expireTimes"),s=t.getAll(),i=r.getAll(),[o,a]=await Promise.all([new Promise((l,c)=>{s.onsuccess=()=>l(s.result),s.onerror=()=>c(s.error)}),new Promise((l,c)=>{i.onsuccess=()=>l(i.result),i.onerror=()=>c(i.error)})]);o.forEach(l=>{this.store.set(l.key,l.value)}),a.forEach(l=>{this.expireTimes.set(l.key,l.expireTime)});const u=Date.now();for(const[l,c]of this.expireTimes.entries())u>c&&(this.store.delete(l),this.expireTimes.delete(l),this._removeFromIndexedDB(l))}catch(e){console.warn("Failed to load data from IndexedDB:",e)}}async _persistToIndexedDB(e,t){if(this.db)try{this.db.transaction(["store"],"readwrite").objectStore("store").put({key:e,value:t})}catch(r){console.warn("Failed to persist to IndexedDB:",r)}}async _persistExpirationToIndexedDB(e,t){if(this.db)try{const s=this.db.transaction(["expireTimes"],"readwrite").objectStore("expireTimes");t!==void 0?s.put({key:e,expireTime:t}):s.delete(e)}catch(r){console.warn("Failed to persist expiration to IndexedDB:",r)}}async _removeFromIndexedDB(e){if(this.db)try{const t=this.db.transaction(["store","expireTimes"],"readwrite"),r=t.objectStore("store"),s=t.objectStore("expireTimes");r.delete(e),s.delete(e)}catch(t){console.warn("Failed to remove from IndexedDB:",t)}}async waitForInitialization(){this.isInitialized||this.initPromise&&await this.initPromise}set(e,t,r={}){const{NX:s=!1,XX:i=!1,GET:o=!1,EX:a=void 0,PX:u=void 0,EXAT:l=void 0,PXAT:c=void 0,KEEPTTL:d=!1}=r,f=s,g=i,m=o;let b=a?parseInt(a,10):void 0,v=u?parseInt(u,10):void 0,A=l?parseInt(l,10):void 0,k=c?parseInt(c,10):void 0;const T=d,M=this.store.has(e);if(g&&!M||f&&M)return;let x;if(m&&M&&(x=this.store.get(e)),this.storeSet(e,t),b!==void 0||v!==void 0||A!==void 0||k!==void 0||T){let w;b!==void 0?w=Date.now()+b*1e3:v!==void 0?w=Date.now()+v:A!==void 0?w=A*1e3:k!==void 0?w=k:T&&M&&(w=this.expireTimes.get(e)),w!==void 0&&(this.expireTimes.set(e,w),this.isIndexedDBAvailable&&this.db&&this._persistExpirationToIndexedDB(e,w))}else this.expireTimes.delete(e),this.isIndexedDBAvailable&&this.db&&this._persistExpirationToIndexedDB(e,void 0);return m?x:!0}get(e){if(!this._checkAndRemoveExpiredKey(e))return this.store.get(e)}del(...e){let t=0;for(const r of e)this._checkAndRemoveExpiredKey(r)||this.store.delete(r)&&(this.expireTimes.delete(r),this.isIndexedDBAvailable&&this.db&&this._removeFromIndexedDB(r),t++);return t}exists(...e){let t=0;for(const r of e)this._checkAndRemoveExpiredKey(r)||this.store.has(r)&&t++;return t}incr(e){return this.incrby(e,1)}incrby(e,t){let r=this.store.get(e);if(r===void 0)r=0;else if(!Number.isInteger(Number(r)))throw new Error("ERR value is not an integer");const s=Number(r)+t;return this.storeSet(e,s.toString()),s}decr(e){try{return this.decrby(e,1)}catch(t){throw t}}decrby(e,t){let r=this.store.get(e);if(r===void 0)r=0;else if(!Number.isInteger(Number(r)))throw new Error("ERR value is not an integer");const s=Number(r)-t;return this.storeSet(e,s.toString()),s}expire(e,t,r={}){if(!this.store.has(e))return 0;const{NX:s=!1,XX:i=!1,GT:o=!1,LT:a=!1}=r,u=Date.now(),l=this.expireTimes.get(e);return s&&l!==void 0||i&&l===void 0||o&&(l===void 0||l<=u+t*1e3)||a&&(l===void 0||l>=u+t*1e3)?0:(this.expireTimes.set(e,u+t*1e3),1)}keys(e){const t=[];for(const[r,s]of this.store.entries())if(ba(r,e)){const i=this.expireTimes.get(r);(i===void 0||i>Date.now())&&t.push(r)}return t}mget(...e){return e.map(t=>this.get(t))}mset(...e){if(e.length%2!==0)throw new Error("MSET requires an even number of arguments");for(let t=0;t<e.length;t+=2)this.set(e[t],e[t+1]);return!0}renamenx(e,t){if(!this.store.has(e)||this.store.has(t))return 0;const r=this.store.get(e);if(this.store.delete(e),this.storeSet(t,r),this.expireTimes.has(e)){const s=this.expireTimes.get(e);this.expireTimes.delete(e),this.expireTimes.set(t,s)}return 1}randomkey(){const e=Array.from(this.store.keys());if(e.length===0)return;const t=Math.floor(Math.random()*e.length);return e[t]}expireat(e,t,r={}){if(typeof t!="number"||isNaN(t))throw new Error("ERR invalid expire time in SETEX");if(!this.store.has(e))return 0;const{NX:s=!1,XX:i=!1,GT:o=!1,LT:a=!1}=r,u=Date.now(),l=t*1e3-u;if(l<=0)return this.store.delete(e),this.expireTimes.delete(e),0;const c=this.pttl(e);return i&&c===-1||s&&c!==-1||o&&c!==-1&&l<=c||a&&c!==-1&&l>=c?0:this.pexpire(e,l)}pexpire(e,t,r={}){const{NX:s=!1,XX:i=!1,GT:o=!1,LT:a=!1}=r;if(s&&this.store.has(e)||i&&!this.store.has(e))return 0;if(o||a){const u=this.pttl(e);if(o&&u>=t||a&&u<=t)return 0}return this.expireTimes.set(e,Date.now()+t),1}pexpireat(e,t){const r=t-Date.now();return r<=0?(this.store.delete(e),this.expireTimes.delete(e),0):this.pexpire(e,r)}pttl(e){if(!this.store.has(e))return-2;if(!this.expireTimes.has(e))return-1;const t=this.expireTimes.get(e)-Date.now();return t>0?t:-2}ttl(e){if(!this.store.has(e))return-2;if(!this.expireTimes.has(e))return-1;const t=Math.floor((this.expireTimes.get(e)-Date.now())/1e3);return t>0?t:-2}persist(e){return!this.store.has(e)||!this.expireTimes.has(e)?0:(this.expireTimes.delete(e),this.isIndexedDBAvailable&&this.db&&this._persistExpirationToIndexedDB(e,void 0),1)}getrange(e,t,r){const s=this.get(e);return typeof s!="string"?"":s.slice(t,r+1)}getset(e,t){const r=this.get(e);return this.set(e,t),r}setex(e,t,r){if(this.store.has(e))return this.set(e,t),this.expire(e,r),!0}setrange(e,t,r){if(typeof t!="number"||t<0)throw new Error("Invalid offset value");if(typeof r!="string")throw new Error("Value must be a string");let s=this.get(e);(s===void 0||s===void 0)&&(s="");const i=s.slice(0,t),o=s.slice(t+r.length),a=i+r+o;return this.set(e,a),a.length}strlen(e){const t=this.get(e);return t===void 0?0:t.length}msetnx(...e){if(e.length%2!==0)throw new Error("MSETNX requires an even number of arguments");for(let t=0;t<e.length;t+=2)if(this.store.has(e[t]))return 0;for(let t=0;t<e.length;t+=2)this.set(e[t],e[t+1]);return 1}incrbyfloat(e,t){let r=this.store.get(e);if(r===void 0)r=0;else if(isNaN(parseFloat(r)))throw new Error("ERR value is not a valid float");const s=parseFloat(r)+t;return this.storeSet(e,s.toString()),s}append(e,t){const r=this.get(e),s=r===void 0?t:r+t;return this.set(e,s),s.length}getbit(e,t){const r=this.get(e);if(r===void 0||t>=r.length*8)return 0;const s=Math.floor(t/8),i=7-t%8;return r.charCodeAt(s)>>i&1}setbit(e,t,r){if(r!==0&&r!==1)throw new Error("ERR bit is not an integer or out of range");let s=this.get(e);s===void 0&&(s="");const i=Math.floor(t/8),o=7-t%8;for(;i>=s.length;)s+="\0";const a=s.charCodeAt(i),u=a>>o&1,l=a&~(1<<o)|r<<o,c=String.fromCharCode(l),d=s.slice(0,i),f=s.slice(i+1),g=d+c+f;return this.set(e,g),u}copy(e,t){const r=this.get(e);return r===void 0?0:(this.set(t,r),1)}rename(e,t){if(!this.store.has(e))throw new Error("ERR no such key");if(e===t)return!0;const r=this.store.get(e),s=this.expireTimes.get(e);return this.storeSet(t,r),this.store.delete(e),s!==void 0&&(this.expireTimes.set(t,s),this.expireTimes.delete(e)),!0}type(e){return this.store.has(e)?typeof this.store.get(e):"none"}sadd(e,...t){this.store.has(e)||this.storeSet(e,new Set);const r=this.store.get(e);if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");let s=0;for(const i of t)r.has(i)||(r.add(i),s++);return s}scard(e){const t=this.store.get(e);if(t===void 0)return 0;if(!(t instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return t.size}sdiff(e,...t){const r=this.store.get(e)||new Set;if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");const s=new Set(r);for(const i of t){const o=this.store.get(i)||new Set;if(!(o instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");for(const a of o)s.delete(a)}return Array.from(s)}sdiffstore(e,t,...r){const s=this.sdiff(t,...r),i=new Set(s);return this.storeSet(e,i),i.size}sinter(...e){if(e.length===0)return[];const t=e.map(s=>{const i=this.store.get(s);if(i===void 0)return new Set;if(!(i instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return i}),r=new Set(t[0]);for(let s=1;s<t.length;s++)for(const i of r)t[s].has(i)||r.delete(i);return Array.from(r)}sintercard(...e){return this.sinter(...e).length}sinterstore(e,...t){const r=this.sinter(...t),s=new Set(r);return this.storeSet(e,s),s.size}sismember(e,t){const r=this.store.get(e);if(r===void 0)return!1;if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return!!r.has(t)}smembers(e){const t=this.store.get(e);if(t===void 0)return[];if(!(t instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return Array.from(t)}smismember(e,...t){const r=this.store.get(e)||new Set;if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return t.map(s=>r.has(s)?1:0)}smove(e,t,r){const s=this.store.get(e);if(s===void 0||!s.has(r))return 0;if(!(s instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");const i=this.store.get(t)||new Set;if(!(i instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");return s.delete(r),i.add(r),this.storeSet(t,i),1}spop(e,t=1){const r=this.store.get(e);if(r===void 0)return[];if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");const s=[];for(const i of r){if(s.length>=t)break;s.push(i),r.delete(i)}return s}srandmember(e,t=1){const r=this.store.get(e);if(r===void 0)return[];if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");const s=Array.from(r),i=[];for(let o=0;o<t&&o<s.length;o++){const a=Math.floor(Math.random()*s.length);i.push(s[a]),s.splice(a,1)}return i}srem(e,...t){const r=this.store.get(e);if(r===void 0)return 0;if(!(r instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");let s=0;for(const i of t)r.delete(i)&&s++;return s}sscan(e,t,r={}){const{match:s="*",count:i=10}=r,o=this.store.get(e);if(o===void 0)return[0,[]];if(!(o instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");const a=new RegExp(s.replace("*",".*")),u=Array.from(o),l=[];let c=t;for(let d=t;d<u.length&&l.length<i;d++)a.test(u[d])&&l.push(u[d]),c=d+1;return[c>=u.length?0:c,l]}sunion(...e){const t=new Set;for(const r of e){const s=this.store.get(r)||new Set;if(!(s instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");for(const i of s)t.add(i)}return Array.from(t)}sunionstore(e,...t){const r=new Set;for(const s of t){const i=this.store.get(s)||new Set;if(!(i instanceof Set))throw new Error("ERR Operation against a key holding the wrong kind of value");for(const o of i)r.add(o)}return this.storeSet(e,r),r.size}lset(e,t,r){const s=this.store.get(e);if(s===void 0)throw new Error("ERR no such key");if(!Array.isArray(s))throw new Error("ERR Operation against a key holding the wrong kind of value");if(t<0||t>=s.length)throw new Error("ERR index out of range");return s[t]=r,!0}ltrim(e,t,r){const s=this.store.get(e);if(s===void 0)return!0;if(!Array.isArray(s))throw new Error("ERR Operation against a key holding the wrong kind of value");const i=s.length,o=t>=0?t:Math.max(i+t,0),a=r>=0?r:Math.max(i+r,-1),u=s.slice(o,a+1);return this.storeSet(e,u),!0}rpop(e){const t=this.store.get(e);return t===void 0||!Array.isArray(t)?null:t.pop()}rpoplpush(e,t){const r=this.rpop(e);return r===void 0?null:(this.lpush(t,r),r)}rpush(e,...t){let r=this.store.get(e);if(r===void 0)r=[],this.storeSet(e,r);else if(!Array.isArray(r))throw new Error("ERR Operation against a key holding the wrong kind of value");return r.push(...t),r.length}rpushx(e,t){const r=this.store.get(e);return r===void 0||!Array.isArray(r)?0:(r.push(t),r.length)}lpush(e,...t){let r=this.store.get(e);if(r===void 0)r=[],this.storeSet(e,r);else if(!Array.isArray(r))throw new Error("ERR Operation against a key holding the wrong kind of value");return r.unshift(...t),r.length}lpushx(e,...t){const r=this.store.get(e);return r===void 0||!Array.isArray(r)?0:(r.unshift(...t),r.length)}lrange(e,t,r){const s=this.store.get(e);if(s===void 0||!Array.isArray(s))return[];const i=s.length,o=t>=0?t:Math.max(i+t,0),a=r>=0?r:Math.max(i+r,-1);return s.slice(o,a+1)}lrem(e,t,r){const s=this.store.get(e);if(s===void 0||!Array.isArray(s))return 0;let i=0;if(t>0)for(let o=0;o<s.length&&i<t;o++)s[o]===r&&(s.splice(o,1),i++,o--);else if(t<0)for(let o=s.length-1;o>=0&&i<-t;o--)s[o]===r&&(s.splice(o,1),i++);else i=s.filter(o=>o===r).length,this.storeSet(e,s.filter(o=>o!==r));return i}lmove(e,t,r,s){const i=r==="LEFT"?"lpop":"rpop",o=s==="LEFT"?"lpush":"rpush",a=this[i](e);return a===void 0?null:(this[o](t,a),a)}lmpop(e,t,r){const s=r==="LEFT"?"lpop":"rpop",i=[];for(let o=0;o<e;o++){const a=this[s](t);if(a===void 0)break;i.push(a)}return i}lpop(e){const t=this.store.get(e);return t===void 0||!Array.isArray(t)?null:t.shift()}lpos(e,t,r={}){const{rank:s=0,start:i=0,stop:o=-1}=r,a=this.store.get(e);if(a===void 0||!Array.isArray(a))return;let u=0;const l=a.length,c=i>=0?i:Math.max(l+i,0),d=o>=0?o:Math.max(l+o,-1);for(let f=c;f<=d;f++)if(a[f]===t){if(u===s)return f;u++}}brpoplpush(e,t,r){const s=this.brpop(e,r);return s===void 0?null:(this.lpush(t,s),s)}lindex(e,t){const r=this.store.get(e);return r===void 0||!Array.isArray(r)?null:(t<0&&(t=r.length+t),r[t]!==void 0?r[t]:null)}linsert(e,t,r,s){const i=this.store.get(e);if(i===void 0)return 0;if(!Array.isArray(i))throw new Error("ERR Operation against a key holding the wrong kind of value");const o=i.indexOf(r);if(o===-1)return 0;if(t==="BEFORE")i.splice(o,0,s);else if(t==="AFTER")i.splice(o+1,0,s);else throw new Error("ERR syntax error");return i.length}llen(e){const t=this.store.get(e);return t===void 0?0:t.length}blmove(e,t,r,s,i){const o=r==="LEFT"?"blpop":"brpop",a=s==="LEFT"?"lpush":"rpush",u=this[o]([e],i);return u===void 0?null:(this[a](t,u[1]),u[1])}blmpop(e,t,...r){const s=[],i=t*1e3,o=r.length===1?"brpop":"brpoplpush",a=r.concat(i);for(let u=0;u<e;u++){const l=this[o](a);if(l===void 0)break;s.push(l)}return s}blpop(e,...t){return this.blmpop(1,e,...t)[0]}brpop(e,...t){const r=e*1e3,s=Date.now()+r;for(;Date.now()<s;)for(let i=0;i<t.length;i++){const o=t[i],a=this.store.get(o);if(a!==void 0&&Array.isArray(a)&&a.length>0){const u=a.pop();return a.length===0&&this.store.delete(o),[o,u]}}return null}expiretime(e){return this.expireTimes.get(e)}pexpiretime(e){const t=this.expireTimes.get(e);return t?t*1e3:null}zadd(e,t,r){return this._checkAndRemoveExpiredKey(e)?0:(this.store.has(e)||this.storeSet(e,new O),this.store.get(e).set(r,Number(t)),1)}zcard(e){return this._checkAndRemoveExpiredKey(e)||!this.store.has(e)?0:this.store.get(e).size}zcount(e,t,r){if(this._checkAndRemoveExpiredKey(e)||!this.store.has(e))return 0;const i=this.store.get(e);let o=0;for(const a of i.values())a>=t&&a<=r&&o++;return o}zdiff(...e){if(e.length===0)return new Set;const t=e.map(s=>this._checkAndRemoveExpiredKey(s)?new O:this.store.get(s)||new O),r=new Set(t[0].keys());for(let s=1;s<t.length;s++)for(const i of t[s].keys())r.delete(i);return r}zdiffstore(e,...t){const r=this.ZDIFF(...t),s=new O;for(const i of r){const o=t.map(a=>{const u=this.store.get(a);return u?u.get(i):void 0}).filter(a=>a!==void 0);o.length>0&&s.set(i,Math.min(...o))}return this.storeSet(e,s),s.size}bzmpop(e,...t){const r=[];for(const s of t){const i=this.store.get(s);if(i&&i.size>0){const o=Array.from(i.entries()).sort((a,u)=>a[1]-u[1]).slice(0,e).map(([a,u])=>(i.delete(a),[a,u]));r.push([s,...o]);break}}return r}bzpopmax(e,t){const r=this.store.get(e);if(!r||r.size===0)return[];const s=Array.from(r.entries()).sort((i,o)=>o[1]-i[1]).slice(0,t).map(([i,o])=>(r.delete(i),[i,o]));return[e,...s]}bzpopmin(e,t){const r=this.store.get(e);if(!r||r.size===0)return[];const s=Array.from(r.entries()).sort((i,o)=>i[1]-o[1]).slice(0,t).map(([i,o])=>(r.delete(i),[i,o]));return[e,...s]}zincrby(e,t,r){this.store.has(e)||this.storeSet(e,new O);const s=this.store.get(e),o=(s.get(r)||0)+Number(t);return s.set(r,o),o}zinter(...e){if(e.length===0)return new Set;const t=e.map(s=>this.store.get(s)||new O),r=new Set(t[0].keys());for(let s=1;s<t.length;s++){const i=new Set;for(const o of t[s].keys())r.has(o)&&i.add(o);r.clear();for(const o of i)r.add(o)}return r}zintercard(...e){return this.ZINTER(...e).size}zinterstore(e,...t){const r=this.ZINTER(...t),s=new O;for(const i of r){const o=t.map(a=>{const u=this.store.get(a);return u?u.get(i):void 0}).filter(a=>a!==void 0);o.length>0&&s.set(i,Math.max(...o))}return this.storeSet(e,s),s.size}zlexcount(e,t,r){const s=this.store.get(e)||new O,i=Array.from(s.keys()).sort();let o=0;for(const a of i)a>=t&&a<=r&&o++;return o}zmpop(e,...t){const r=[];for(const s of t){const i=this.store.get(s);if(i&&i.size>0){const o=Array.from(i.entries()).sort((a,u)=>a[1]-u[1]).slice(0,e).map(([a,u])=>(i.delete(a),[a,u]));r.push([s,...o]);break}}return r}zmscore(e,...t){const r=this.store.get(e)||new O;return t.map(s=>r.get(s))}zpopmax(e,t){const r=this.store.get(e);return!r||r.size===0?[]:Array.from(r.entries()).sort((i,o)=>o[1]-i[1]).slice(0,t).map(([i,o])=>(r.delete(i),[i,o]))}zpopmin(e,t){const r=this.store.get(e);return!r||r.size===0?[]:Array.from(r.entries()).sort((i,o)=>i[1]-o[1]).slice(0,t).map(([i,o])=>(r.delete(i),[i,o]))}zrandmember(e,t=1){const r=this.store.get(e);if(!r||r.size===0)return[];const s=Array.from(r.keys()),i=[];for(let o=0;o<t;o++){const a=Math.floor(Math.random()*s.length);i.push(s[a])}return i}zrange(e,t,r){const s=this.store.get(e)||new O,i=Array.from(s.entries()).sort((o,a)=>o[1]-a[1]);return t<0&&(t=i.length+t),r<0&&(r=i.length+r),i.slice(t,r+1).map(([o,a])=>[o,a])}zrangebylex(e,t,r,s={}){const i=this.store.get(e)||new O;let a=Array.from(i.keys()).sort().filter(u=>u>=t&&u<=r);if(s.limit){const{offset:u,count:l}=s.limit;a=a.slice(u,u+l)}return a}zrangebyscore(e,t,r,s={}){const i=this.store.get(e)||new O;let a=Array.from(i.entries()).sort((u,l)=>u[1]-l[1]).filter(([,u])=>u>=t&&u<=r);if(s.withscores?a=a.map(([u,l])=>[u,l]):a=a.map(([u])=>u),s.limit){const{offset:u,count:l}=s.limit;a=a.slice(u,u+l)}return a}zrangestore(e,t,r,s){const i=this.store.get(t)||new O,o=Array.from(i.entries()).sort((u,l)=>u[1]-l[1]);r<0&&(r=o.length+r),s<0&&(s=o.length+s);const a=new O(o.slice(r,s+1));return this.storeSet(e,a),a.size}zrank(e,t){const r=this.store.get(e);if(!r)return;const s=Array.from(r.entries()).sort((i,o)=>i[1]-o[1]);for(let i=0;i<s.length;i++)if(s[i][0]===t)return i}zrem(e,...t){const r=this.store.get(e);if(!r)return 0;let s=0;for(const i of t)r.delete(i)&&s++;return s}zremrangebylex(e,t,r){const s=this.store.get(e);if(!s)return 0;const i=Array.from(s.keys()).sort();let o=0;for(const a of i)a>=t&&a<=r&&(s.delete(a),o++);return o}zremrangebyrank(e,t,r){const s=this.store.get(e);if(!s)return 0;const i=Array.from(s.entries()).sort((a,u)=>a[1]-u[1]);t<0&&(t=i.length+t),r<0&&(r=i.length+r);let o=0;for(let a=t;a<=r;a++)s.delete(i[a][0])&&o++;return o}zremrangebyscore(e,t,r){const s=this.store.get(e);if(!s)return 0;const i=Array.from(s.entries()).sort((a,u)=>a[1]-u[1]);let o=0;for(const[a,u]of i)u>=t&&u<=r&&(s.delete(a),o++);return o}zrevrange(e,t,r){const s=this.store.get(e)||new O,i=Array.from(s.entries()).sort((o,a)=>a[1]-o[1]);return t<0&&(t=i.length+t),r<0&&(r=i.length+r),i.slice(t,r+1).map(([o,a])=>[o,a])}zrevrangebylex(e,t,r,s={}){const i=this.store.get(e)||new O;let a=Array.from(i.keys()).sort().reverse().filter(u=>u>=r&&u<=t);if(s.limit){const{offset:u,count:l}=s.limit;a=a.slice(u,u+l)}return a}zrevrangebyscore(e,t,r,s={}){const i=this.store.get(e)||new O;let a=Array.from(i.entries()).sort((u,l)=>l[1]-u[1]).filter(([,u])=>u>=r&&u<=t);if(s.withscores?a=a.map(([u,l])=>[u,l]):a=a.map(([u])=>u),s.limit){const{offset:u,count:l}=s.limit;a=a.slice(u,u+l)}return a}zrevrank(e,t){const r=this.store.get(e);if(!r)return;const s=Array.from(r.entries()).sort((i,o)=>o[1]-i[1]);for(let i=0;i<s.length;i++)if(s[i][0]===t)return i}zscan(e,t,r={}){const s=this.store.get(e)||new O,i=Array.from(s.entries()).sort((l,c)=>l[1]-c[1]),o=[];let a=r.count||10,u=t;for(;a>0&&u<i.length;)(!r.match||new RegExp(r.match.replace("*",".*")).test(i[u][0]))&&(o.push(i[u]),a--),u++;return[u>=i.length?0:u,o]}zscore(e,t){const r=this.store.get(e);if(r)return r.get(t)}zunion(e){const t=new O;for(const r of e){const s=this.store.get(r);if(s)for(const[i,o]of s.entries())t.set(i,(t.get(i)||0)+o)}return Array.from(t.entries()).sort((r,s)=>r[1]-s[1])}zunionstore(e,t){const r=this.zunion(t),s=new O(r);return this.storeSet(e,s),s.size}geoadd(e,t,r,s){if(typeof t!="number"||typeof r!="number")throw new Error("Invalid longitude or latitude value");const i=this.store.get(e)||new O;if(!i.get(s)){const a={longitude:t,latitude:r};return i.set(s,a),this.storeSet(e,i),1}return 0}geodist(e,t,r,s="m"){const i=this.store.get(e);if(!i)return;const o=i.get(t),a=i.get(r);if(!o||!a)return;const u=this._haversineDistance(o.latitude,o.longitude,a.latitude,a.longitude);return this._convertDistance(u,s)}geohash(e,...t){const r=this.store.get(e);return r?t.map(s=>{const i=r.get(s);return i?this._encodeGeohash(i.latitude,i.longitude):null}):[]}geopos(e,...t){const r=this.store.get(e);return r?t.map(s=>{const i=r.get(s);return i?[i.latitude,i.longitude]:null}):[]}georadius(e,t,r,s,i="m"){const o=this.store.get(e);if(!o)return[];const a=this._convertDistance(s,i,"m"),u=[];for(const[l,c]of o.entries())this._haversineDistance(r,t,c.latitude,c.longitude)<=a&&u.push(l);return u}georadius_ro(e,t,r,s){return this.georadius(e,t,r,s,!0)}georadiusbymember(e,t,r){const s=this.geopos(e,t);if(s)return this.georadius(s[0],s[1],r,e)}georadiusbymember_ro(e,t,r){const s=this.geopos(e,t);if(s)return this.georadius(s[0],s[1],r,e,!0)}geosearch(e,t,r,s){return this.georadius(t,r,s,e)}geosearchstore(e,t,r,s,i){const o=this.georadius(r,s,i,t);return this.set(e,o),o.length}scan(e,t="*",r=10){const s=this.keys(t),i=Math.min(e+r,s.length);return[i===s.length?0:i,s.slice(e,i)]}sort(e,t="ASC",r=!1){const s=this.store.get(e);return Array.isArray(s)?s.slice().sort((o,a)=>r?t==="ASC"?o.localeCompare(a):a.localeCompare(o):t==="ASC"?o-a:a-o):[]}touch(...e){return e.reduce((t,r)=>t+(this.exists(r)?1:0),0)}sort_ro(e,t="ASC",r=!1){return this.sort(e,t,r)}unlink(...e){let t=0;for(const r of e)this.del(r)&&t++;return t}hset(e,t,r){this.store.has(e)||this.storeSet(e,new O);const s=this.store.get(e),i=!s.has(t);return s.set(t,r),i?1:0}hdel(e,...t){const r=this.store.get(e);if(!r)return 0;let s=0;for(const i of t)r.delete(i)&&s++;return s}hget(e,t){const r=this.store.get(e);return r?r.get(t):void 0}hgetall(e){const t=this.store.get(e);if(!t)return{};const r={};for(const[s,i]of t)r[s]=i;return r}hincrby(e,t,r){const s=this.store.get(e)||new O,o=parseInt(s.get(t)||0,10)+r;return s.set(t,o.toString()),this.storeSet(e,s),o}hincrbyfloat(e,t,r){const s=this.store.get(e)||new O,o=parseFloat(s.get(t)||0)+r;return s.set(t,o.toString()),this.storeSet(e,s),o}hkeys(e){const t=this.store.get(e);return t?Array.from(t.keys()):[]}hlen(e){const t=this.store.get(e);return t?t.size:0}hmget(e,...t){const r=this.store.get(e)||new O;return t.map(s=>r.get(s))}hmset(e,...t){const r=this.store.get(e)||new O;for(let s=0;s<t.length;s+=2){const i=t[s],o=t[s+1];r.set(i,o)}return this.storeSet(e,r),!0}hsetnx(e,t,r){const s=this.store.get(e)||new O;return s.has(t)?0:(s.set(t,r),this.storeSet(e,s),1)}hstrlen(e,t){const r=this.store.get(e),s=r?r.get(t):null;return s?s.length:0}hvals(e){const t=this.store.get(e);return t?Array.from(t.values()):[]}hscan(e,t,r="*",s=10){const i=this.store.get(e)||new O,o=Array.from(i.keys()).filter(l=>l.includes(r)),a=Math.min(t+s,o.length);return[a===o.length?0:a,o.slice(t,a).map(l=>[l,i.get(l)])]}hexists(e,t){const r=this.store.get(e);return r&&r.has(t)?1:0}hrandfield(e,t=1){const r=this.store.get(e);if(!r)return[];const s=Array.from(r.keys()),i=[];for(let o=0;o<t;o++){const a=Math.floor(Math.random()*s.length);i.push(s[a])}return i}_checkAndRemoveExpiredKey(e){const t=this.expireTimes.get(e);return t&&Date.now()>t?(this.store.delete(e),this.expireTimes.delete(e),this.isIndexedDBAvailable&&this.db&&this._removeFromIndexedDB(e),!0):!1}_initCleanupLoop(e){this.store.size===1&&(this.cleanupLoop=setInterval(()=>{if(this.store.size===0&&this.cleanupLoop)clearInterval(this.cleanupLoop);else for(const t of this.expireTimes.keys())this._checkAndRemoveExpiredKey(t)},e),typeof this.cleanupLoop=="object"&&typeof this.cleanupLoop.unref=="function"&&this.cleanupLoop.unref())}_haversineDistance(e,t,r,s){const i=d=>d*Math.PI/180,a=i(r-e),u=i(s-t),l=Math.sin(a/2)*Math.sin(a/2)+Math.cos(i(e))*Math.cos(i(r))*Math.sin(u/2)*Math.sin(u/2);return 6371e3*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}_convertDistance(e,t,r){const s={m:1,km:.001,mi:621371e-9,ft:3.28084};if(!s[t]||!s[r])throw new Error("Invalid distance unit");return e*s[t]/s[r]}_encodeGeohash(e,t){const r="0123456789bcdefghjkmnpqrstuvwxyz";let s="",i=-90,o=90,a=-180,u=180,l=!0,c=0,d=0;for(;s.length<12;){if(l){const f=(a+u)/2;t>f?(d=(d<<1)+1,a=f):(d=d<<1,u=f)}else{const f=(i+o)/2;e>f?(d=(d<<1)+1,i=f):(d=d<<1,o=f)}l=!l,c<4?c++:(s+=r[d],c=0,d=0)}return s}flushall(){return this.store.clear(),this.expireTimes.clear(),this.isIndexedDBAvailable&&this.db&&this._clearIndexedDB(),!0}async _clearIndexedDB(){if(this.db)try{const e=this.db.transaction(["store","expireTimes"],"readwrite"),t=e.objectStore("store"),r=e.objectStore("expireTimes");t.clear(),r.clear()}catch(e){console.warn("Failed to clear IndexedDB:",e)}}}var vc=wc;const Gi=ga(vc);class xc{constructor(e={}){this.config={enabled:e.enabled??!1,...e}}updateConfig(e){this.config={...this.config,...e}}enable(){this.config.enabled=!0}disable(){this.config.enabled=!1}isEnabled(){return this.config.enabled}logRequest(e={}){if(!this.isEnabled())return;const{service:t="unknown",operation:r="unknown",params:s={},result:i=null,error:o=null}=e;let a="{}";if(s&&Object.keys(s).length>0)try{a=JSON.stringify(s)}catch{a="[Unable to serialize params]"}const u=`${t} - ${r} - \x1B[1m${a}\x1B[22m`;o?console.error(u,{error:o.message||o,result:i}):console.log(u,i)}getStats(){return{enabled:this.config.enabled,config:{...this.config}}}}const Vi=600,Xi=700,jn=()=>{if(navigator.userActivation)return navigator.userActivation.hasBeenActive&&navigator.userActivation.isActive;try{const n=window.open("","_blank","width=1,height=1,left=-1000,top=-1000");return n?(n.close(),!0):!1}catch{return!1}},fi=()=>!globalThis.location||globalThis.location.protocol==="file:"?!0:globalThis.origin==="null",Wr=(n,e="Puter")=>{const t=screen.width/2-Vi/2,r=screen.height/2-Xi/2;return window.open(n,e,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${Vi}, height=${Xi}, top=${r}, left=${t}`)};class ya extends(globalThis.HTMLElement||Object){constructor(e){super(),this.message=e||"Please confirm your email address to use this service.",this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
        dialog {
            background: transparent;
            border: none;
            box-shadow: none;
            outline: none;
            padding: 0;
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }

        .puter-dialog-content {
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            padding: 50px 30px 30px;
            background-color: #fff;
            box-shadow: 0 0 9px 1px rgb(0 0 0 / 21%);
            -webkit-font-smoothing: antialiased;
            color: #575762;
            position: relative;
            box-sizing: border-box;
            width: 400px;
            max-width: 90vw;
        }

        dialog, dialog * {
            font-family: "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        }

        .close-btn {
            position: absolute;
            right: 15px;
            top: 10px;
            font-size: 17px;
            color: #8a8a8a8c;
            cursor: pointer;
        }

        .close-btn:hover {
            color: #000;
        }

        .dialog-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto;
        }

        .dialog-icon svg {
            display: block;
            width: 70px;
            height: 70px;
            padding: 15px;
            border-radius: 8px;
            box-sizing: border-box;
            background-color: #088ef0;
            color: #fff;
        }

        h2 {
            text-align: center;
            font-size: 19px;
            font-weight: 500;
            color: #1f1f2a;
            margin: 18px 0 0;
        }

        .message {
            text-align: center;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.5;
            color: #575762;
            padding: 10px 10px 0;
            margin: 0;
        }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 24px;
        }

        .button {
            color: #666666;
            background: linear-gradient(#f6f6f6, #e1e1e1);
            font-size: 14px;
            text-align: center;
            height: 35px;
            line-height: 35px;
            padding: 0 30px;
            margin: 0;
            display: inline-block;
            appearance: none;
            cursor: pointer;
            border: 1px solid #b9b9b9;
            box-sizing: border-box;
            border-radius: 4px;
            outline: none;
            width: 220px;
            -webkit-font-smoothing: antialiased;
        }

        .button:focus-visible {
            border-color: rgb(118 118 118);
        }

        .button-primary {
            border-color: #088ef0;
            background: linear-gradient(#34a5f8, #088ef0);
            color: #fff;
            font-weight: 500;
            font-size: 15px;
            margin-bottom: 10px;
        }

        .button-primary:active {
            background: #2798eb;
            border-color: #2798eb;
            color: #bedef5;
        }

        .button-cancel {
            background: none;
        }

        @media (max-width: 480px) {
            .puter-dialog-content {
                padding: 50px 20px 25px;
            }
            .button {
                width: 100%;
            }
        }

        @media (prefers-color-scheme: dark) {
            .puter-dialog-content {
                border: 1px solid #2a2a2e;
                background-color: #1e1e22;
                color: #d6d6dc;
                box-shadow: 0 0 9px 1px rgb(0 0 0 / 60%);
            }

            h2 {
                color: #e4e4ea;
            }

            .message {
                color: #b9b9c2;
            }

            .close-btn {
                color: #8a8a90;
            }

            .close-btn:hover {
                color: #fff;
            }

            .button {
                color: #d6d6dc;
                background: linear-gradient(#3f3f45, #2e2e34);
                border-color: #4a4a50;
            }

            .button:focus-visible {
                border-color: #8a8a90;
            }

            .button-primary {
                border-color: #088ef0;
                background: linear-gradient(#34a5f8, #088ef0);
                color: #fff;
            }
        }
        </style>
        <dialog>
            <div class="puter-dialog-content">
                <span class="close-btn">&#x2715;</span>
                <div class="dialog-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2>Confirm Your Email</h2>
                <p class="message">${this.message}</p>
                <div class="buttons">
                    <button class="button button-primary" id="confirm-email-btn">Go to Puter.com</button>
                    <button class="button button-cancel" id="close-btn">Close</button>
                </div>
            </div>
        </dialog>
        `}connectedCallback(){const e=this.shadowRoot.querySelector("dialog");this.shadowRoot.querySelector(".close-btn").addEventListener("click",()=>{this.close()}),this.shadowRoot.querySelector("#close-btn").addEventListener("click",()=>{this.close()}),this.shadowRoot.querySelector("#confirm-email-btn").addEventListener("click",()=>{window.open("https://puter.com","_blank"),this.close()}),e.addEventListener("click",t=>{t.target===e&&this.close()})}open(){this.shadowRoot.querySelector("dialog").showModal()}close(){this.shadowRoot.querySelector("dialog").close(),this.remove()}}typeof globalThis.HTMLElement<"u"&&globalThis.customElements&&(customElements.get("email-confirmation-dialog")||customElements.define("email-confirmation-dialog",ya));function _c(n){if(typeof globalThis.document>"u"||document.querySelector("email-confirmation-dialog"))return;const e=new ya(n);document.body.appendChild(e),e.open()}const ps=n=>String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");class wa extends(globalThis.HTMLElement||Object){constructor(e,{title:t="Low Balance",method:r}={}){super(),this.message=e||"You have reached your usage limit for this account.",this.heading=t,this.method=r,this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
        dialog {
            background: transparent;
            border: none;
            box-shadow: none;
            outline: none;
            padding: 0;
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }

        .puter-dialog-content {
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            padding: 50px 30px 30px;
            background-color: #fff;
            box-shadow: 0 0 9px 1px rgb(0 0 0 / 21%);
            -webkit-font-smoothing: antialiased;
            color: #575762;
            position: relative;
            box-sizing: border-box;
            width: 400px;
            max-width: 90vw;
        }

        dialog, dialog * {
            font-family: "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        }

        .close-btn {
            position: absolute;
            right: 15px;
            top: 10px;
            font-size: 17px;
            color: #8a8a8a8c;
            cursor: pointer;
        }

        .close-btn:hover {
            color: #000;
        }

        .dialog-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto;
        }

        .dialog-icon svg {
            display: block;
            width: 70px;
            height: 70px;
            padding: 15px;
            border-radius: 8px;
            box-sizing: border-box;
            background-color: #f59e0b;
            color: #fff;
        }

        h2 {
            text-align: center;
            font-size: 19px;
            font-weight: 500;
            color: #1f1f2a;
            margin: 18px 0 0;
        }

        .message {
            text-align: center;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.5;
            color: #575762;
            padding: 10px 10px 0;
            margin: 0;
        }

        .method {
            text-align: center;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 12px;
            color: #8a8a90;
            margin: 12px 0 0;
            word-break: break-all;
        }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 24px;
        }

        .button {
            color: #666666;
            background: linear-gradient(#f6f6f6, #e1e1e1);
            font-size: 14px;
            text-align: center;
            height: 35px;
            line-height: 35px;
            padding: 0 30px;
            margin: 0;
            display: inline-block;
            appearance: none;
            cursor: pointer;
            border: 1px solid #b9b9b9;
            box-sizing: border-box;
            border-radius: 4px;
            outline: none;
            width: 220px;
            -webkit-font-smoothing: antialiased;
        }

        .button:focus-visible {
            border-color: rgb(118 118 118);
        }

        .button-primary {
            border-color: #088ef0;
            background: linear-gradient(#34a5f8, #088ef0);
            color: #fff;
            font-weight: 500;
            font-size: 15px;
            margin-bottom: 10px;
        }

        .button-primary:active {
            background: #2798eb;
            border-color: #2798eb;
            color: #bedef5;
        }

        .button-cancel {
            background: none;
        }

        @media (max-width: 480px) {
            .puter-dialog-content {
                padding: 50px 20px 25px;
            }
            .button {
                width: 100%;
            }
        }

        @media (prefers-color-scheme: dark) {
            .puter-dialog-content {
                border: 1px solid #2a2a2e;
                background-color: #1e1e22;
                color: #d6d6dc;
                box-shadow: 0 0 9px 1px rgb(0 0 0 / 60%);
            }

            h2 {
                color: #e4e4ea;
            }

            .message {
                color: #b9b9c2;
            }

            .method {
                color: #7c7c84;
            }

            .close-btn {
                color: #8a8a90;
            }

            .close-btn:hover {
                color: #fff;
            }

            .button {
                color: #d6d6dc;
                background: linear-gradient(#3f3f45, #2e2e34);
                border-color: #4a4a50;
            }

            .button:focus-visible {
                border-color: #8a8a90;
            }

            .button-primary {
                border-color: #088ef0;
                background: linear-gradient(#34a5f8, #088ef0);
                color: #fff;
            }
        }
        </style>
        <dialog>
            <div class="puter-dialog-content">
                <span class="close-btn">&#x2715;</span>
                <div class="dialog-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2>${ps(this.heading)}</h2>
                <p class="message">${ps(this.message)}<br>Please upgrade to continue.</p>
                ${this.method?`<p class="method">${ps(this.method)}</p>`:""}
                <div class="buttons">
                    <button class="button button-primary" id="upgrade-btn">Upgrade Now</button>
                    <button class="button button-cancel" id="close-btn">Close</button>
                </div>
            </div>
        </dialog>
        `}connectedCallback(){const e=this.shadowRoot.querySelector("dialog");this.shadowRoot.querySelector(".close-btn").addEventListener("click",()=>{this.close()}),this.shadowRoot.querySelector("#close-btn").addEventListener("click",()=>{this.close()}),this.shadowRoot.querySelector("#upgrade-btn").addEventListener("click",()=>{window.open("https://puter.com/dashboard/#home","_blank"),this.close()}),e.addEventListener("click",t=>{t.target===e&&this.close()})}open(){this.shadowRoot.querySelector("dialog").showModal()}close(){this.shadowRoot.querySelector("dialog").close(),this.remove()}}typeof globalThis.HTMLElement<"u"&&globalThis.customElements&&(customElements.get("usage-limit-dialog")||customElements.define("usage-limit-dialog",wa));function Ac(n,e={}){if(typeof globalThis.document>"u"){console.warn("[Puter]",n);return}if(document.querySelector("usage-limit-dialog"))return;const t=new wa(n,e);document.body.appendChild(t),t.open()}const kc={funds:"Low Balance",subscription:"Subscription Required",storage:"Out of Storage"},Ec="Your account does not have enough funding to complete this request.",Dc="Not enough storage space available.",Tc="This action requires a subscription.",Sc=n=>{var i;if(!n||typeof n!="object")return null;const e=n,t=typeof e.error=="object"&&e.error!==null?e.error:{},r=[e.code,t.code],s=[e.status,t.status];return r.includes("subscription_required")?"subscription":r.includes("storage_limit_reached")||r.includes("NOT_ENOUGH_SPACE")||s.includes(413)?"storage":r.includes("insufficient_funds")||s.includes(402)||((i=e.metadata)==null?void 0:i.usage_limited)===!0?"funds":null},Cc=n=>{const e=typeof n.error=="object"&&n.error!==null?n.error.message:n.error,t=[n.message,e].find(r=>typeof r=="string"&&r.trim()!=="");return typeof t=="string"?t.trim():void 0},Ic=n=>/[.!?]$/.test(n)?n:`${n}.`,Lc=(n,e,t)=>{if(n==="funds")return Ec;if(n==="storage")return Dc;if(t.subscriptionMessage)return t.subscriptionMessage;const r=Cc(e);return r?Ic(r):Tc},Er=(n,e={},t=globalThis.puter)=>{const r=Sc(n);if(!r)return;const s=Lc(r,n,e),{method:i}=e;(t==null?void 0:t.env)==="app"?t.ui.requestUpgrade({reason:r,method:i,message:s}):((t==null?void 0:t.env)==="web"||r==="storage")&&Ac(s,{title:kc[r],method:i})},Rc=()=>{let n,e;return{promise:new Promise((r,s)=>{n=r,e=s}),resolve:n,reject:e}};function Ji(n,e){return puter.dropStaleAuthToken({reason:n.reason,auth_id:n.auth_id,sentToken:e}),{action:"reject",error:{status:401,code:n.code,reason:n.reason,auth_id:n.auth_id,message:"Reauthentication required"}}}async function va(n,{interactive:e=!0,sentToken:t}={}){if((n==null?void 0:n.code)==="reauth_required"){if(!e)return Ji(n,t);try{return await puter.triggerReauth({reason:n.reason,auth_id:n.auth_id}),{action:"replay"}}catch(r){return{action:"reject",error:{status:401,code:"reauth_required",reason:n.reason,auth_id:n.auth_id,message:(r==null?void 0:r.message)||"Reauthentication required"}}}}if((n==null?void 0:n.code)==="token_auth_failed"&&puter.env==="web"){if(!e)return Ji(n,t);try{puter.resetAuthToken(),await puter.ui.authenticateWithPuter()}catch{return{action:"reject",error:{error:{code:"auth_canceled",message:"Authentication canceled"}}}}}return null}function pi(n){var d,f,g;const{url:e,method:t="GET",headers:r={},includePuterAuth:s=!1,authToken:i,withCredentials:o=!0,responseType:a=""}=n,u=new XMLHttpRequest;u.open(t,e,!0),u.withCredentials=o,u.responseType=a??"";const l=s?((d=globalThis.puter)==null?void 0:d.authToken)??i:i;l&&(n._sentAuthToken=l,u.setRequestHeader("Authorization",`Bearer ${l}`));for(const[m,b]of Object.entries(r))b!=null&&u.setRequestHeader(m,b);u._puterReq=n;const c=u.send.bind(u);return u.send=function(m){return n.body=m,c(m)},(g=(f=globalThis.puter)==null?void 0:f.apiCallLogger)!=null&&g.isEnabled()&&(u._puterRequestId=n.logId??{method:t,service:"xhr",operation:e,params:{url:e,method:t,responseType:a}}),u}const Pc=n=>(n||"").includes("application/x-ndjson");async function es(n){switch(n.responseType){case"blob":return await n.response.text();case"arraybuffer":return new TextDecoder().decode(n.response);case"json":return JSON.stringify(n.response);default:return n.responseText}}async function xa(n){if(n.responseType==="blob")return n.response;const e=n.getResponseHeader("content-type")||"application/octet-stream";return n.responseType==="arraybuffer"?new Blob([n.response],{type:e}):new Blob([await es(n)],{type:e})}async function Bc(n){return n.responseType==="arraybuffer"?n.response:await(await xa(n)).arrayBuffer()}async function mi(n){return n.responseType==="json"?n.response:JSON.parse(await es(n))}async function ts(n){if(n.responseType!=="blob")try{return JSON.parse(n.responseText)}catch{return n.responseText}const e=n.getResponseHeader("content-type");if(e.startsWith("application/json")){const t=await n.response.text();try{return JSON.parse(t)}catch{return t}}return e.startsWith("application/octet-stream")?n.response:{success:!0,result:n.response}}function Ki(n,e){const t=n.status;return{ok:t>=200&&t<300,status:t,statusText:n.statusText,url:n.responseURL||"",headers:{get:r=>n.getResponseHeader(r)},text:()=>es(n),json:()=>mi(n),blob:()=>xa(n),arrayBuffer:()=>Bc(n),stream:()=>{if(!e)throw new Error("stream() is only available for application/x-ndjson responses");return e}}}function ms(n,{result:e=null,error:t=null}={}){var r,s;!n||!((s=(r=globalThis.puter)==null?void 0:r.apiCallLogger)!=null&&s.isEnabled())||globalThis.puter.apiCallLogger.logRequest({...n,result:e,error:t})}async function Mc(n){const e=n.getResponseHeader("content-type")||"";if(n.responseType===""||n.responseType==="text"||e.includes("json"))try{return await mi(n)}catch{try{return await es(n)}catch{return null}}return`[${e||"binary"}]`}const qc=new Set([502,503,504]),Fc=429,Nc=[250,500,1e3,2e3,2e3,2e3,2e3,2e3],Uc=2e3,Oc=2e3,gi=()=>{var n,e;return((e=(n=globalThis.puter)==null?void 0:n.config)==null?void 0:e.autoRetry)??!0},$c=(n,e)=>new Promise((t,r)=>{if(e!=null&&e.aborted)return r(e.reason??new DOMException("Aborted","AbortError"));const s=setTimeout(t,n);e==null||e.addEventListener("abort",()=>{clearTimeout(s),r(e.reason??new DOMException("Aborted","AbortError"))},{once:!0})}),_a=n=>Nc[n-1],Yi=n=>{if(!(n.retrySafe&&gi()))return null;const e=_a(n.attempt);return e===void 0?null:{delayMs:e}},jc=n=>{if(!(n.retryGated&&gi()))return null;const e=_a(n.attempt);return e===void 0?null:{delayMs:e}},zc=1e3,Hc=3e4,Wc=8,Gc=n=>{var e;return[n==null?void 0:n.errorCode,(e=n==null?void 0:n.error)==null?void 0:e.errorCode].includes("credits_reserved")},Vc=n=>!(n.retryGated&&gi())||n.attempt>Wc?null:{delayMs:Math.min(Hc,zc*2**(n.attempt-1))};async function Xc(n){try{const e=await puter.ui.requestPermission({permission:n});return{granted:e===!0||(e==null?void 0:e.granted)===!0}}catch{return{granted:!1}}}const Jc=new Set(["email_confirmation_required","phone_verification_required","card_verification_required"]),Aa=n=>Jc.has(n);let yn=null;async function ka(n,e){var t;return((t=globalThis.puter)==null?void 0:t.env)!=="app"?{verified:!1}:(yn||(yn=(async()=>{try{return{verified:await puter.ui.requestVerificationGate(n,Array.isArray(e)?{factors:e}:{})===!0}}catch{return{verified:!1}}finally{yn=null}})()),yn)}function Kc(n){return new Promise((e,t)=>{const r=pi(n);let s=!1,i=!1,o=null;const a=[];let u="",l=0;const c=async function*(){for(;;){for(;a.length>0;){const g=a.shift();g.trim()!==""&&(yield JSON.parse(g))}if(i)break;const f=Rc();o=f.resolve,await f.promise}}();if(r.onreadystatechange=()=>{r.readyState===2&&Pc(r.getResponseHeader("Content-Type"))&&(s=!0,e({streamed:!0,xhr:r,lineStream:c})),r.readyState===4&&s&&(u.length>0&&(a.push(u),u=""),i=!0,o==null||o())},r.onprogress=()=>{if(!s)return;const f=r.responseText.slice(l);if(l=r.responseText.length,!f)return;u+=f;let g;for(;(g=u.indexOf(`
`))!==-1;)a.push(u.slice(0,g)),u=u.slice(g+1);o==null||o()},r.addEventListener("load",()=>{s||e({xhr:r,status:r.status})}),r.addEventListener("error",()=>e({networkError:!0,xhr:r})),r.addEventListener("abort",()=>{var f;return t(((f=n.signal)==null?void 0:f.reason)??new DOMException("Aborted","AbortError"))}),n.signal){if(n.signal.aborted)return t(n.signal.reason??new DOMException("Aborted","AbortError"));n.signal.addEventListener("abort",()=>r.abort(),{once:!0})}const d=typeof n.buildBody=="function"?n.buildBody():n.body;r.send(d??null)})}async function Yc(n,e){var o,a,u;if(n.streamed)return null;if(n.networkError)return Yi(e);const{xhr:t,status:r}=n;n.parsed===void 0&&(n.parsed=await mi(t).catch(()=>null));const s=n.parsed;if(r===401||(s==null?void 0:s.code)==="token_auth_failed"){if(!e.done.has("reauth")){const l=t==null?void 0:t._puterReq,c=await va(s,{interactive:(l==null?void 0:l.interactiveReauth)!==!1,sentToken:l==null?void 0:l._sentAuthToken});if((c==null?void 0:c.action)==="replay")return e.done.add("reauth"),{delayMs:0};(c==null?void 0:c.action)==="reject"&&(n.reauthError=c.error)}return null}if(e.permission&&(s==null?void 0:s.success)===!1&&((o=s==null?void 0:s.error)==null?void 0:o.code)==="permission_denied")return!e.done.has("permission")&&(await Xc(e.permission)).granted?(e.done.add("permission"),{delayMs:0}):null;const i=[s==null?void 0:s.code,(a=s==null?void 0:s.error)==null?void 0:a.code].find(l=>Aa(l));return r===403&&i?!e.done.has(i)&&(await ka(i,(s==null?void 0:s.factors)??((u=s==null?void 0:s.error)==null?void 0:u.factors))).verified?(e.done.add(i),{delayMs:0}):null:r===Fc?Gc(s)?Vc(e):jc(e):qc.has(r)?Yi(e):null}async function Ea(n,{retrySafe:e=!1,retryGated:t=!0,permission:r=null,shapeStream:s,shape:i}){const o={attempt:0,retrySafe:e,retryGated:t,permission:r,done:new Set};for(;;){o.attempt++;const a=await Kc(n);if(a.streamed)return s(a.lineStream,a.xhr);const u=await Yc(a,o);if(u){const l=Date.now();if(await $c(u.delayMs,n.signal),u.delayMs>=Uc&&Date.now()-l-u.delayMs>Oc)return i(a);continue}return i(a)}}const Tr=new Map;function rs(n,e,{windowMs:t=2e3}={}){const r=Tr.get(n);if(r){if(Date.now()-r.timestamp<t)return r.promise;Tr.delete(n)}const s=e();Tr.set(n,{promise:s,timestamp:Date.now()});const i=()=>{var o;((o=Tr.get(n))==null?void 0:o.promise)===s&&Tr.delete(n)};return s.then(i,i),s}function G(n,e={}){const{includePuterAuth:t=!1,authToken:r,method:s="GET",headers:i={},body:o=null,responseType:a="",withCredentials:u=!0,signal:l,logContext:c,retry:d,dedupe:f,interactiveReauth:g=!0}=e,m=c??{service:"fetchUrl",operation:`${s} ${n}`,params:{url:n,method:s}},b={url:n,method:s,headers:i,includePuterAuth:t,authToken:r,withCredentials:u,responseType:a,body:o,signal:l,logId:m,interactiveReauth:g},A=d===!1?!1:d===!0||(s==="GET"||s==="HEAD"),k=d!==!1,T=()=>{var x,w;return(w=(x=globalThis.puter)==null?void 0:x.apiCallLogger)==null?void 0:w.isEnabled()},M=()=>Ea(b,{retrySafe:A,retryGated:k,shapeStream:(x,w)=>(T()&&ms(m,{result:"[stream]"}),Ki(w,x)),shape:async x=>{if(x.networkError)throw T()&&ms(m,{error:{message:"Network error occurred"}}),new TypeError(`Network request to ${n} failed`);const{xhr:w}=x,C=Ki(w);if(T()){const Ie=await Mc(w);ms(m,w.status>=400?{error:Ie??{message:w.statusText,status:w.status}}:{result:Ie})}return C}});if(f){const x=o==null?"":typeof o=="string"?o:"[body]",w=typeof f=="string"?f:`${s}:${n}:${x}`;return rs(w,M)}return M()}const Da="text/plain;actually=json",Ta=n=>n.puter??globalThis.puter,Sa=(n,e)=>JSON.stringify({interface:n.iface,driver:n.driver,test_mode:n.testMode,method:n.method,args:n.args,auth_token:e.authToken}),Ur=(n,e)=>{var t,r;(r=(t=globalThis.puter)==null?void 0:t.apiCallLogger)!=null&&r.isEnabled()&&globalThis.puter.apiCallLogger.logRequest({service:"drivers",operation:`${n.iface}::${n.method}`,params:{interface:n.iface,driver:n.driver??n.iface,method:n.method,args:n.args},...e})};function Ca(n,e){(e==null?void 0:e.code)!=="email_must_be_confirmed"||n.env!=="web"||_c(e.message||"Email confirmation required. Go to Puter.com to confirm your email address.")}function Zc(n,e,t){const r=async function*(){for await(const s of n)Er(s,t,e),Ca(e,s==null?void 0:s.error),typeof s.text=="string"&&Object.defineProperty(s,"toString",{enumerable:!1,value:()=>s.text}),yield s}();return Object.defineProperty(r,"start",{enumerable:!1,value:async s=>{const i=new TextEncoder;for await(const o of r)s.enqueue(i.encode(o));s.close()}}),r}async function Qc(n,e={}){const{responseType:t="",readonly:r=!1,transform:s,onError:i,upgradePrompt:o}=e,a=Ta(n),u={...o,method:(o==null?void 0:o.method)??`${n.iface}::${n.method}`},l=d=>{throw typeof i=="function"&&i(d),d};if(!a.authToken&&a.env==="web")try{await a.ui.authenticateWithPuter()}catch{const f={code:"auth_canceled",message:"Authentication canceled"};throw Ur(n,{error:f}),{error:f}}const c={url:`${a.APIOrigin}/drivers/call`,method:"POST",headers:{"Content-Type":Da},withCredentials:!0,responseType:t,buildBody:()=>Sa(n,a)};return await Ea(c,{retrySafe:r,permission:`driver:${n.iface}:${n.method}`,shapeStream:d=>Zc(d,a,u),shape:async d=>{if(d.networkError)return Ur(n,{error:{message:"Network error occurred"}}),l(d.xhr);const{status:f}=d.xhr,g=await ts(d.xhr),m=f>=400||(g==null?void 0:g.success)===!1;if(Ur(n,{result:m?null:g,error:m?g:null}),Er(g&&typeof g=="object"?{...g,status:f}:{status:f},u,a),Ca(a,g==null?void 0:g.error),f===401||(g==null?void 0:g.code)==="token_auth_failed")return l({status:401,message:"Unauthorized"});if(f&&f!==200||g.success===!1)return l(g);const b=g.result!==void 0?g.result:g;return s?await s(b):b}})}async function Ia(n){const e=Ta(n);try{const t=await G(`${e.APIOrigin}/drivers/call`,{method:"POST",headers:{"Content-Type":Da},body:Sa(n,e)}),r=(t.headers.get("content-type")??"").split(";")[0].trim(),s=await(()=>{switch(r){case"application/x-ndjson":return t.stream();case"application/octet-stream":return t.blob();case"application/json":case"":return t.json();default:throw new Error(`unrecognized content type: ${r}`)}})();return Ur(n,{result:s}),s}catch(t){throw Ur(n,{error:{message:(t==null?void 0:t.message)??String(t),stack:t==null?void 0:t.stack}}),t}}const el=({boundOrigin:n,currentOrigin:e,defaultAPIOrigin:t})=>n?n===e:e===t,La=(n=globalThis)=>{try{const e=n==null?void 0:n.parent;return!!e&&e!==n}catch{return!0}},tl=(n,e)=>{let t;try{t=new URL(n)}catch{return null}const r=o=>{const a=o.split("=",1)[0].replace(/\+/g," ");try{return decodeURIComponent(a)===e}catch{return a===e}},s=t.search.slice(1).split("&");if(!s.some(r))return null;const i=s.filter(o=>o&&!r(o));return t.search=i.length?`?${i.join("&")}`:"",t.toString()},rl=n=>{if(!n)return!1;const e=n.t??n.type;return e==="gui"||e==="session"||e==="s"};function Qe(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}function Zi(n,e){for(var t="",r=0,s=-1,i=0,o,a=0;a<=n.length;++a){if(a<n.length)o=n.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(s===a-1||i===1))if(s!==a-1&&i===2){if(t.length<2||r!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){var u=t.lastIndexOf("/");if(u!==t.length-1){u===-1?(t="",r=0):(t=t.slice(0,u),r=t.length-1-t.lastIndexOf("/")),s=a,i=0;continue}}else if(t.length===2||t.length===1){t="",r=0,s=a,i=0;continue}}e&&(t.length>0?t+="/..":t="..",r=2)}else t.length>0?t+="/"+n.slice(s+1,a):t=n.slice(s+1,a),r=a-s-1;s=a,i=0}else o===46&&i!==-1?++i:i=-1}return t}function nl(n,e){var t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||"");return t?t===e.root?t+r:t+n+r:r}var ur={resolve:function(){for(var e="",t=!1,r,s=arguments.length-1;s>=-1&&!t;s--){var i;s>=0?i=arguments[s]:(r===void 0&&(r=process.cwd()),i=r),Qe(i),i.length!==0&&(e=i+"/"+e,t=i.charCodeAt(0)===47)}return e=Zi(e,!t),t?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(Qe(e),e.length===0)return".";var t=e.charCodeAt(0)===47,r=e.charCodeAt(e.length-1)===47;return e=Zi(e,!t),e.length===0&&!t&&(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return Qe(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,t=0;t<arguments.length;++t){var r=arguments[t];Qe(r),r.length>0&&(e===void 0?e=r:e+="/"+r)}return e===void 0?".":ur.normalize(e)},relative:function(e,t){if(Qe(e),Qe(t),e===t||(e=ur.resolve(e),t=ur.resolve(t),e===t))return"";for(var r=1;r<e.length&&e.charCodeAt(r)===47;++r);for(var s=e.length,i=s-r,o=1;o<t.length&&t.charCodeAt(o)===47;++o);for(var a=t.length,u=a-o,l=i<u?i:u,c=-1,d=0;d<=l;++d){if(d===l){if(u>l){if(t.charCodeAt(o+d)===47)return t.slice(o+d+1);if(d===0)return t.slice(o+d)}else i>l&&(e.charCodeAt(r+d)===47?c=d:d===0&&(c=0));break}var f=e.charCodeAt(r+d),g=t.charCodeAt(o+d);if(f!==g)break;f===47&&(c=d)}var m="";for(d=r+c+1;d<=s;++d)(d===s||e.charCodeAt(d)===47)&&(m.length===0?m+="..":m+="/..");return m.length>0?m+t.slice(o+c):(o+=c,t.charCodeAt(o)===47&&++o,t.slice(o))},_makeLong:function(e){return e},dirname:function(e){if(Qe(e),e.length===0)return".";for(var t=e.charCodeAt(0),r=t===47,s=-1,i=!0,o=e.length-1;o>=1;--o)if(t=e.charCodeAt(o),t===47){if(!i){s=o;break}}else i=!1;return s===-1?r?"/":".":r&&s===1?"//":e.slice(0,s)},basename:function(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Qe(e);var r=0,s=-1,i=!0,o;if(t!==void 0&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var a=t.length-1,u=-1;for(o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(l===47){if(!i){r=o+1;break}}else u===-1&&(i=!1,u=o+1),a>=0&&(l===t.charCodeAt(a)?--a===-1&&(s=o):(a=-1,s=u))}return r===s?s=u:s===-1&&(s=e.length),e.slice(r,s)}else{for(o=e.length-1;o>=0;--o)if(e.charCodeAt(o)===47){if(!i){r=o+1;break}}else s===-1&&(i=!1,s=o+1);return s===-1?"":e.slice(r,s)}},extname:function(e){Qe(e);for(var t=-1,r=0,s=-1,i=!0,o=0,a=e.length-1;a>=0;--a){var u=e.charCodeAt(a);if(u===47){if(!i){r=a+1;break}continue}s===-1&&(i=!1,s=a+1),u===46?t===-1?t=a:o!==1&&(o=1):t!==-1&&(o=-1)}return t===-1||s===-1||o===0||o===1&&t===s-1&&t===r+1?"":e.slice(t,s)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return nl("/",e)},parse:function(e){Qe(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;var r=e.charCodeAt(0),s=r===47,i;s?(t.root="/",i=1):i=0;for(var o=-1,a=0,u=-1,l=!0,c=e.length-1,d=0;c>=i;--c){if(r=e.charCodeAt(c),r===47){if(!l){a=c+1;break}continue}u===-1&&(l=!1,u=c+1),r===46?o===-1?o=c:d!==1&&(d=1):o!==-1&&(d=-1)}return o===-1||u===-1||d===0||d===1&&o===u-1&&o===a+1?u!==-1&&(a===0&&s?t.base=t.name=e.slice(1,u):t.base=t.name=e.slice(a,u)):(a===0&&s?(t.name=e.slice(1,o),t.base=e.slice(1,u)):(t.name=e.slice(a,o),t.base=e.slice(a,u)),t.ext=e.slice(o,u)),a>0?t.dir=e.slice(0,a-1):s&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};ur.posix=ur;var sl=ur;const j=ga(sl);var Me={},Ct={};Me.length=0;Me.getItem=function(n){return n in Ct?Ct[n]:null};Me.setItem=function(n,e){typeof e>"u"?Me.removeItem(n):(Ct.hasOwnProperty(n)||Me.length++,Ct[n]=`${e}`)};Me.removeItem=function(n){Ct.hasOwnProperty(n)&&(delete Ct[n],Me.length--)};Me.key=function(n){return Object.keys(Ct)[n]||null};Me.clear=function(){Ct={},Me.length=0};typeof exports=="object"&&(module.exports=Me);const gs=Symbol("readyState"),tr=Symbol("headers"),Br=Symbol("response headers"),wn=Symbol("AbortController"),bs=Symbol("method"),ys=Symbol("URL"),Us=Symbol("MIME"),rr=Symbol("dispatch"),vn=Symbol("errored"),ws=Symbol("timeout"),vs=Symbol("timedOut"),xs=Symbol("isResponseText");function Qi(...n){const e=n.reduce((r,s)=>r+s.length,0),t=new Uint8Array(e);return n.forEach((r,s,i)=>{const o=i.slice(0,s).reduce((a,u)=>a+u.length,0);t.set(r,o)}),t}async function eo(n){const e=this.responseType||"text",t=new TextDecoder,r=this[Us]||this[Br].get("content-type")||"text/plain";switch(e){case"text":this.response=t.decode(n);break;case"blob":this.response=new Blob([n],{type:r});break;case"arraybuffer":this.response=n.buffer;break;case"json":this.response=JSON.parse(t.decode(n));break}}const zn=class extends EventTarget{constructor(){super();p(this,"upload",{addEventListener(){}});this.readyState=this.constructor.UNSENT,this.response=null,this.responseType="",this.responseURL="",this.status=0,this.statusText="",this.timeout=0,this.withCredentials=!1,this[tr]=Object.create(null),this[tr].accept="*/*",this[Br]=Object.create(null),this[wn]=new AbortController,this[bs]="",this[ys]="",this[Us]="",this[vn]=!1,this[ws]=0,this[vs]=!1,this[xs]=!0}onreadystatechange(){}set readyState(t){this[gs]!==t&&(this[gs]=t,this.dispatchEvent(new Event("readystatechange")),this.onreadystatechange(new Event("readystatechange")))}get readyState(){return this[gs]}static get UNSENT(){return 0}static get OPENED(){return 1}static get HEADERS_RECEIVED(){return 2}static get LOADING(){return 3}static get DONE(){return 4}get responseText(){if(this[vn])return null;if(this.readyState<this.constructor.HEADERS_RECEIVED)return"";if(this[xs])return this.response;throw new DOMException("Response type not set to text","InvalidStateError")}get responseXML(){throw new Error("XML not supported")}[rr](t){const r=`on${t.type}`;typeof this[r]=="function"&&this.addEventListener(t.type,this[r].bind(this),{once:!0}),this.dispatchEvent(t)}abort(){this[wn].abort(),this.status=0,this.readyState=this.constructor.UNSENT}open(t,r){this.status=0,this[bs]=t,this[ys]=r,this.readyState=this.constructor.OPENED}setRequestHeader(t,r){t=String(t).toLowerCase(),typeof this[tr][t]>"u"?this[tr][t]=String(r):this[tr][t]+=`, ${r}`}overrideMimeType(t){this[Us]=String(t)}getAllResponseHeaders(){return this[vn]||this.readyState<this.constructor.HEADERS_RECEIVED?"":Array.from(this[Br].entries().map(([t,r])=>`${t}: ${r}`)).join(`\r
`)}getResponseHeader(t){const r=this[Br].get(String(t).toLowerCase());return typeof r=="string"?r:null}send(t=null){this.timeout>0&&(this[ws]=setTimeout(()=>{this[vs]=!0,this[wn].abort()},this.timeout));const r=this.responseType||"text";this[xs]=r==="text",this.setRequestHeader("user-agent","puter-js/1.0"),this.setRequestHeader("origin","https://puter.work"),this.setRequestHeader("referer","https://puter.work/"),fetch(this[ys],{method:this[bs]||"GET",signal:this[wn].signal,headers:this[tr],credentials:this.withCredentials?"include":"same-origin",body:t}).then(async s=>{this.responseURL=s.url,this.status=s.status,this.statusText=s.statusText,this[Br]=s.headers,this.readyState=this.constructor.HEADERS_RECEIVED;const i=s.body??[];if((s.headers.get("content-type")??"").includes("application/x-ndjson")||this.streamRequestBadForPerformance){let o=new Uint8Array;for await(const a of i)this.readyState=this.constructor.LOADING,o=Qi(o,a),eo.call(this,o),this[rr](new CustomEvent("progress"))}else{const o=[];for await(const a of i)o.push(a);eo.call(this,Qi(...o))}this.readyState=this.constructor.DONE,this[rr](new CustomEvent("load"))},s=>{let i="abort";s.name!=="AbortError"?(this[vn]=!0,i="error"):this[vs]&&(i="timeout"),this.readyState=this.constructor.DONE,this[rr](new CustomEvent(i))}).finally(()=>this[rr](new CustomEvent("loadend"))).finally(()=>{clearTimeout(this[ws]),this[rr](new CustomEvent("loadstart"))})}};typeof module=="object"&&module.exports?module.exports=zn:(globalThis||self).XMLHttpRequestShim=zn;function il(n){const t=new Uint8Array(n).reduce((r,s)=>r+String.fromCharCode(s),"");return typeof btoa=="function"?btoa(t):Buffer.from(t,"binary").toString("base64")}var Zn,Ra;class ol{constructor(){E(this,Zn);this.result=null,this.error=null,this.onload=null,this.onerror=null,this.onloadend=null}readAsDataURL(e){const t=this;(async function(){var r;try{let s;e&&typeof e.arrayBuffer=="function"?s=await e.arrayBuffer():e instanceof ArrayBuffer?s=e:ArrayBuffer.isView(e)?s=e.buffer:s=new Uint8Array(0).buffer;const i=il(s),o=e&&e.type||"application/octet-stream";t.result="data:"+o+";base64,"+i}catch(s){t.error=s}_(r=t,Zn,Ra).call(r)})()}}Zn=new WeakSet,Ra=function(){this.error?typeof this.onerror=="function"&&this.onerror(this.error):typeof this.onload=="function"&&this.onload({target:this}),typeof this.onloadend=="function"&&this.onloadend()};function Pa(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,n=>(n^crypto.getRandomValues(new Uint8Array(1))[0]&15>>n/4).toString(16))}function Zt(n,e,t,r="post",s="text/plain;actually=json",i=void 0){return pi({url:e+n,method:r,headers:{"Content-Type":s},includePuterAuth:!!t,withCredentials:!0,responseType:i??"",logId:{method:r,service:"xhr",operation:n.replace(/^\//,""),params:{endpoint:n,contentType:s,responseType:i}}})}function to(n,e,t,r,s){const i=n.target??n,o=i==null?void 0:i._puterReq;if(!o||o._replayed)return!1;const a={...o,_replayed:!0},u=pi(a);return Lt(u,e,t,r,s),u.send(o.body),!0}async function al(n,e,t,r,s){var o,a;const i=await ts(s);if(s.status===401){const u=s._puterReq,l=await va(i,{interactive:(u==null?void 0:u.interactiveReauth)!==!1,sentToken:u==null?void 0:u._sentAuthToken});if((l==null?void 0:l.action)==="replay"){if(to(s,n,e,t,r))return}else if((l==null?void 0:l.action)==="reject")return e&&typeof e=="function"&&e(l.error),r(l.error);return e&&typeof e=="function"&&e({status:401,message:"Unauthorized"}),r({status:401,message:"Unauthorized"})}else return s.status===403&&Aa(i==null?void 0:i.code)&&!((o=s._puterReq)!=null&&o._replayed)?(await ka(i.code,i.factors)).verified&&to(s,n,e,t,r)?void 0:(e&&typeof e=="function"&&e(i),r(i)):s.status!==200?(e&&typeof e=="function"&&e(i),r(i)):(i.success===!1&&((a=i.error)==null?void 0:a.code)==="permission_denied"&&await puter.ui.requestPermission({permission:"driver:puter-image-generation:generate"}),n&&typeof n=="function"&&n(i),t(i))}function ul(n,e,t){return n&&typeof n=="function"&&n(t),e(t)}function Lt(n,e,t,r,s){n.addEventListener("load",async function(i){var o,a;if((a=(o=globalThis.puter)==null?void 0:o.apiCallLogger)!=null&&a.isEnabled()&&this._puterRequestId){const u=await ts(this).catch(()=>null);globalThis.puter.apiCallLogger.logRequest({service:this._puterRequestId.service,operation:this._puterRequestId.operation,params:this._puterRequestId.params,result:this.status>=400?null:u,error:this.status>=400?{message:this.statusText,status:this.status}:null})}return al(e,t,r,s,this)}),n.addEventListener("error",function(i){var o,a;return(a=(o=globalThis.puter)==null?void 0:o.apiCallLogger)!=null&&a.isEnabled()&&this._puterRequestId&&globalThis.puter.apiCallLogger.logRequest({service:this._puterRequestId.service,operation:this._puterRequestId.operation,params:this._puterRequestId.params,error:{message:"Network error occurred",event:i.type}}),ul(t,s,this)})}function B(n){const{iface:e,method:t,argNames:r=[],driver:s,puter:i,testMode:o}=n,{readonly:a,responseType:u,preprocess:l,transform:c,upgradePrompt:d}=n;return async function(...f){let g={},m;return f.length===1&&typeof f[0]=="object"&&!Array.isArray(f[0])?(g={...f[0]},m=g.error,delete g.success,delete g.error):(r.forEach((b,v)=>{g[b]=f[v]}),m=f[r.length+1]),typeof l=="function"&&(g=l(g)),o===!0&&g.test_mode===void 0&&(g={...g,test_mode:!0}),await Qc({iface:e,driver:s,method:t,args:g,testMode:o,puter:i},{readonly:a,responseType:u,transform:c,onError:m,upgradePrompt:d})}}function Tt(n){return new Promise((e,t)=>{const r=new(globalThis.FileReader||ol);r.onload=function(s){e(s.target.result)},r.onerror=function(s){t(s)},r.readAsDataURL(n)})}const cl=["mp4","webm","mov","mpeg","avi","mkv","m4v","ogv"],ro=n=>{var t;if(typeof n!="string")return!1;if(n.startsWith("data:video/"))return!0;const e=(t=n.split("?")[0].split("#")[0].split(".").pop())==null?void 0:t.toLowerCase();return cl.includes(e)};class Ne{constructor(e){this.puter=e}get authToken(){return this.puter.authToken}get APIOrigin(){return this.puter.APIOrigin}get appID(){return this.puter.appID}}const Os=n=>typeof Blob>"u"?!1:n instanceof Blob||typeof File<"u"&&n instanceof File,Kt=n=>n!==null&&typeof n=="object"&&!Array.isArray(n)&&!Os(n),Ba=n=>n.some(e=>e===!0),cr=async n=>n instanceof Blob?await Tt(n):n,bi=n=>{const e=n.split(",")[1]||"",t=e.endsWith("==")?2:e.endsWith("=")?1:0;return Math.floor(e.length*3/4)-t},ll=["tools","response","reasoning","reasoning_effort","text","verbosity","provider","image_config","compaction","context_management"];async function dl(n,e,t,r){const{puter:s}=this,i=[e,t,r];let o={};if(typeof n=="string"&&e&&(typeof e=="string"||e instanceof File)){const l=e instanceof File?await Tt(e):e,c=ro(l)?{video_url:{url:l}}:{image_url:{url:l}};o={vision:!0,messages:[{content:[n,c]}]}}else if(typeof n=="string"&&Array.isArray(e)){const l=e.map(c=>ro(c)?{video_url:{url:c}}:{image_url:{url:c}});o={vision:!0,messages:[{content:[n,...l]}]}}else Array.isArray(n)?o={messages:n}:typeof n=="string"&&(o={messages:[{content:n}]});const a=Ba(i),u=i.find(Kt)??{};u.model!==void 0&&(o.model=u.model),u.temperature!==void 0&&(o.temperature=u.temperature),u.max_tokens!==void 0&&(o.max_tokens=u.max_tokens),u.stream!==void 0&&typeof u.stream=="boolean"&&(o.stream=u.stream);for(const l of ll)u[l]!==void 0&&(o[l]=u[l]);return u.normalize!==void 0?o.normalize=u.normalize:this.normalize!==void 0&&(o.normalize=this.normalize),u.driver&&(o.provider=o.provider||u.driver),await B({iface:"puter-chat-completion",driver:"ai-chat",method:"complete",argNames:["messages"],puter:s,testMode:a??!1,transform:async l=>(l.toString=()=>{var c;return(c=l.message)==null?void 0:c.content},l.valueOf=()=>{var c;return(c=l.message)==null?void 0:c.content},l)})(o)}const ee=(n,e=globalThis.puter)=>(e.env==="gui"&&!n||/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(n)||(n||(n="."),(!n||!n.startsWith("/")&&!n.startsWith("~"))&&(e.appID?n=j.join("~/AppData",e.appID,n):n=j.join("~/",n))),n),Ma=n=>{for(const e of["asset_url","url","href"]){const t=n[e];if(typeof t=="string"&&t)return t}return null},qa=async(n,e)=>{if(typeof n=="string")return n;if(n instanceof Blob)return await Tt(n);if(n instanceof ArrayBuffer)return await Tt(new Blob([n]));if(n&&typeof n=="object"&&typeof n.arrayBuffer=="function"){const t=await n.arrayBuffer();return await Tt(new Blob([t],{type:n.type||void 0}))}if(n&&typeof n=="object"){const t=Ma(n);if(t)return t}throw e},Fa=async n=>{const e=await qa(n,{code:"invalid_audio_response",message:"Unexpected audio response format"}),t=new(globalThis.Audio||Object);return t.src=e,t.toString=()=>e,t.valueOf=()=>e,t},hl=async n=>{const e=await qa(n,{code:"invalid_image_response",message:"Unexpected image response format"}),t=new(globalThis.Image||Object);return t.src=e,t.toString=()=>t.src,t.valueOf=()=>t.src,t},fl=async n=>{var s;let e=null,t=null;if(n instanceof Blob?(e=await Tt(n),t=n.type||"video/mp4"):typeof n=="string"?e=n:n&&typeof n=="object"&&(e=Ma(n),t=n.mime_type||n.content_type||null),!e)return n;const r=((s=globalThis.document)==null?void 0:s.createElement("video"))||{setAttribute:()=>{}};return r.src=e,r.controls=!0,r.preload="metadata",t&&r.setAttribute("data-mime-type",t),r.setAttribute("data-source",e),r.toString=()=>r.src,r.valueOf=()=>r.src,r};async function pl(n,e){const{puter:t}=this;let r={},s=!1;if(typeof n=="string"&&(r={prompt:n}),e===!0&&(s=!0),typeof n=="string"&&e&&typeof e=="object"&&(r={...e},r.prompt=n),n&&typeof n=="object"&&(r={...n}),typeof r.prompt!="string"||!r.prompt.trim())throw{message:"Prompt parameter is required",code:"prompt_required"};const o=(typeof r.driver=="string"?r.driver:void 0)||"ai-image";return r.puter_output_path&&(r.puter_output_path=ee(r.puter_output_path,t)),await B({iface:"puter-image-generation",driver:o,method:"generate",argNames:["prompt"],puter:t,responseType:"blob",testMode:s??!1,transform:hl})(r)}async function Na(n){const{puter:e}=this,t=i=>n?i.filter(o=>o.provider===n):i,r=async()=>{const i=await G(`${e.APIOrigin}/puterai/chat/models/details`,{includePuterAuth:!!e.authToken});if(!i.ok)return null;const o=await i.json();return t(Array.isArray(o==null?void 0:o.models)?o.models:[])},s=async()=>{const i=await e.drivers.call("puter-chat-completion","ai-chat","models");return t(Array.isArray(i==null?void 0:i.result)?i.result:[])};try{const i=await r();if(i!==null)return i}catch{}try{return await s()}catch{return[]}}async function ml(){const n=await Na.call(this),e=new Set;return(n??[]).forEach(t=>{t!=null&&t.provider&&e.add(t.provider)}),Array.from(e)}const gl=10*1024*1024,bl=36*1024*1024,yl="ai-ocr",wl=(n,e=!1)=>{if(!n)return"";if(e&&typeof n.document_annotation=="string")return n.document_annotation;if(Array.isArray(n.blocks)&&n.blocks.length){let t="";for(const r of n.blocks)typeof(r==null?void 0:r.text)=="string"&&(!r.type||r.type==="text/textract:LINE"||r.type.startsWith("text/"))&&(t+=`${r.text}
`);if(t.trim())return t}if(Array.isArray(n.pages)&&n.pages.length){const t=n.pages.map(r=>((r==null?void 0:r.markdown)||"").trim()).filter(Boolean).join(`

`);if(t.trim())return t}return typeof n.document_annotation=="string"?n.document_annotation:typeof n.text=="string"?n.text:""};async function vl(n,e,t){var l;const{puter:r}=this;if(n===void 0&&e===void 0&&t===void 0)throw{message:"Arguments are required",code:"arguments_required"};let s={};Kt(n)?s={...n}:s.source=n;let i=!1;for(const c of[e,t])typeof c=="boolean"?i=i||c:Kt(c)&&(s={...s,...c});if(typeof s.testMode=="boolean"&&(i=s.testMode),delete s.testMode,!s.source)throw{message:"Source is required",code:"source_required"};Os(s.source)?s.source=await Tt(s.source):(l=s.source)!=null&&l.source&&Os(s.source.source)&&(s.source=await Tt(s.source.source));const o=typeof s.model=="string"?s.model.trim().toLowerCase():"",a=typeof s.provider=="string"?s.provider.trim().toLowerCase():"",u=o.startsWith("mistral-ocr-")||!o&&["mistral","mistral-ocr"].includes(a)?bl:gl;if(typeof s.source=="string"&&s.source.startsWith("data:")&&bi(s.source)>u)throw{message:`Input size cannot be larger than ${u}`,code:"input_too_large"};return await B({iface:"puter-ocr",driver:yl,method:"recognize",argNames:["source"],puter:r,testMode:i??!1,transform:async c=>wl(c,s.documentAnnotationFormat!==void 0)})(s)}const xl=25*1024*1024,_l=(n={})=>{const e={...n};return e.voiceId&&!e.voice&&!e.voice_id&&(e.voice=e.voiceId),e.modelId&&!e.model&&!e.model_id&&(e.model=e.modelId),e.outputFormat&&!e.output_format&&(e.output_format=e.outputFormat),e.voiceSettings&&!e.voice_settings&&(e.voice_settings=e.voiceSettings),e.fileFormat&&!e.file_format&&(e.file_format=e.fileFormat),e.removeBackgroundNoise!==void 0&&e.remove_background_noise===void 0&&(e.remove_background_noise=e.removeBackgroundNoise),e.optimizeStreamingLatency!==void 0&&e.optimize_streaming_latency===void 0&&(e.optimize_streaming_latency=e.optimizeStreamingLatency),e.enableLogging!==void 0&&e.enable_logging===void 0&&(e.enable_logging=e.enableLogging),delete e.voiceId,delete e.modelId,delete e.outputFormat,delete e.voiceSettings,delete e.fileFormat,delete e.removeBackgroundNoise,delete e.optimizeStreamingLatency,delete e.enableLogging,e};async function Al(n,e,t){const{puter:r}=this;if(n===void 0&&e===void 0&&t===void 0)throw{message:"Arguments are required",code:"arguments_required"};let s={},i=!1;if(Kt(n)?s={...n}:s.audio=await cr(n),Kt(e)?s={...s,...e}:typeof e=="boolean"&&(i=e),typeof t=="boolean"&&(i=t),s.file&&(s.audio=await cr(s.file),delete s.file),s.audio instanceof Blob&&(s.audio=await cr(s.audio)),!s.audio)throw{message:"Audio input is required",code:"audio_required"};if(typeof s.audio=="string"&&s.audio.startsWith("data:")&&bi(s.audio)>xl)throw{message:"Input size cannot be larger than 25 MB",code:"input_too_large"};const o=_l({...s});return await B({iface:"puter-speech2speech",driver:"ai-speech2speech",method:"convert",argNames:["audio"],puter:r,responseType:"blob",testMode:i,transform:Fa})(o)}const kl=25*1024*1024,El="ai-speech2txt";async function Dl(n,e,t){const{puter:r}=this;if(n===void 0&&e===void 0&&t===void 0)throw{message:"Arguments are required",code:"arguments_required"};let s={},i=!1;if(Kt(n)?s={...n}:s.file=await cr(n),Kt(e)?s={...s,...e}:typeof e=="boolean"&&(i=e),typeof t=="boolean"&&(i=t),s.audio&&(s.file=await cr(s.audio),delete s.audio),s.file instanceof Blob&&(s.file=await cr(s.file)),!s.file)throw{message:"Audio input is required",code:"audio_required"};if(typeof s.file=="string"&&s.file.startsWith("data:")&&bi(s.file)>kl)throw{message:"Input size cannot be larger than 25 MB",code:"input_too_large"};const o=s.translate?"translate":"transcribe",a={...s};delete a.translate;const u=a.response_format;return await B({iface:"puter-speech2txt",driver:El,method:o,puter:r,testMode:i,transform:async l=>u==="text"&&l&&typeof l=="object"&&typeof l.text=="string"?l.text:l})(a)}const no=3e3,yi="ai-tts";async function Tl(n,e,t,r,s){const{puter:i}=this;let o={};if(typeof n=="string"&&(o={text:n}),e&&typeof e=="object"&&!Array.isArray(e))Object.assign(o,e);else if(e&&typeof e=="string")o.language=e,t&&typeof t=="string"&&(o.voice=t),r&&typeof r=="string"&&(o.engine=r);else if(e&&typeof e!="boolean")throw{message:'Second argument must be an options object or language string. Use: txt2speech("text", { voice: "name", engine: "type", language: "code" }) or txt2speech("text", "language", "voice", "engine")',code:"invalid_arguments"};if(!o.text)throw{message:"Text parameter is required",code:"text_required"};if(o.text.length>no)throw{message:`Input size cannot be larger than ${no}`,code:"input_too_large"};return await B({iface:"puter-tts",driver:yi,method:"synthesize",argNames:["source"],puter:i,responseType:"blob",testMode:Ba([e,t,r,s]),transform:Fa})(o)}async function Sl(n={}){const{puter:e}=this,t=typeof n=="string"?{provider:n}:{...n};return await B({iface:"puter-tts",driver:yi,method:"list_engines",argNames:["source"],puter:e,readonly:!0,responseType:"text"})(t)}async function Cl(n){const{puter:e}=this,t=typeof n=="string"?{engine:n}:{...n};return B({iface:"puter-tts",driver:yi,method:"list_voices",argNames:["source"],puter:e,readonly:!0,responseType:"text"})(t)}async function Il(n,e){const{puter:t}=this;let r={},s=!1;if(typeof n=="string"&&(r={prompt:n}),e===!0&&(s=!0),typeof n=="string"&&e&&typeof e=="object"&&(r={...e},r.prompt=n),n&&typeof n=="object"&&(r={...n}),typeof r.prompt!="string"||!r.prompt.trim())throw{message:"Prompt parameter is required",code:"prompt_required"};r.duration!==void 0&&r.seconds===void 0&&(r.seconds=r.duration),r.test_mode===!0&&(s=!0);const o=(typeof r.driver=="string"?r.driver:void 0)||"ai-video";return r.puter_output_path&&(r.puter_output_path=ee(r.puter_output_path,t)),await B({iface:"puter-video-generation",driver:o,method:"generate",argNames:["prompt"],puter:t,responseType:"blob",testMode:s??!1,transform:fl})(r)}class Ll extends Ne{constructor(t){super(t);p(this,"txt2speech");p(this,"normalize");p(this,"chat",dl);p(this,"img2txt",vl);p(this,"speech2txt",Dl);p(this,"speech2speech",Al);p(this,"txt2img",pl);p(this,"txt2vid",Il);p(this,"listModels",Na);p(this,"listModelProviders",ml);const r=this;for(const s of["chat","img2txt","speech2txt","speech2speech","txt2img","txt2vid","listModels","listModelProviders"])r[s]=r[s].bind(this);this.txt2speech=Object.assign(Tl.bind(this),{listEngines:Sl.bind(this),listVoices:Cl.bind(this)})}}const Rl=Ll;class D extends Error{constructor(e,t,r={}){super(e),Object.setPrototypeOf(this,new.target.prototype),Object.defineProperty(this,"name",{value:"PuterJSError",enumerable:!1,writable:!0,configurable:!0}),Object.defineProperty(this,"message",{value:e,enumerable:!0,writable:!0,configurable:!0}),t!==void 0&&(this.code=t),Object.assign(this,r)}static from(e){if(e instanceof D)return e;if(e!==null&&typeof e=="object"){const{message:t,code:r,...s}=e;return new D(typeof t=="string"?t:"Unknown error",typeof r=="string"?r:void 0,s)}return new D(typeof e=="string"?e:"Unknown error")}}const $s=n=>new D(n,"invalid_request",{success:!1,error:{code:"invalid_request",message:n}});async function Pl(n){const{puter:e}=this;if(typeof n!="string"||n.length===0)throw $s("Name is required");const t=await G(`${e.APIOrigin}/apps/nameAvailable?name=${encodeURIComponent(n)}`,{includePuterAuth:!0}),r=await t.json();if(!t.ok)throw r;return r}const ns=(n,e)=>(e.getUsers=async t=>(t=t??{},(await n.drivers.call("app-telemetry","app-telemetry","get_users",{app_uuid:e.uid,limit:t.limit,offset:t.offset})).result),e.users=async function*(t=100){let r=0;for(;;){const s=await e.getUsers({limit:t,offset:r});if(!s||s.length===0)return;for(const i of s)yield i;if(r+=s.length,s.length<t)return}},e),xn=(n,e)=>(e.forEach(t=>ns(n,t)),e),Ua=n=>({name:n.name,index_url:n.indexURL,title:n.title,description:n.description,icon:n.icon,maximize_on_start:n.maximizeOnStart,background:n.background,filetype_associations:n.filetypeAssociations,metadata:n.metadata,feedback_enabled:n.feedbackEnabled});async function Bl(n,e,t){const{puter:r}=this;let s;if(typeof n=="string"?s={object:{name:n,index_url:e,title:t??n}}:typeof n=="object"&&n!==null?s={object:{...Ua(n),title:n.title??n.name},options:{dedupe_name:n.dedupeName??!1}}:s={object:{}},!s.object.name)throw $s("Name is required");if(!s.object.index_url)throw $s("Index URL is required");const i=await B({iface:"puter-apps",driver:"es:app",method:"create",argNames:["object"],puter:r})(s);return ns(r,i)}async function Ml(n){const{puter:e}=this,t=typeof n=="string"?{id:{name:n}}:{};return await B({iface:"puter-apps",driver:"es:app",method:"delete",argNames:["uid"],puter:e})(t)}async function ql(n,e){const{puter:t}=this,r={};typeof n=="string"&&(typeof e=="object"&&e!==null&&(r.params=e),r.id={name:n}),typeof n=="object"&&n!==null&&(r.params=n);const s=await B({iface:"puter-apps",driver:"es:app",method:"read",argNames:["uid"],puter:t,readonly:!0})(r);return ns(t,s)}function Fl(...n){const{puter:e}=this,t=typeof n[0]=="object"&&n[0]!==null?n[0]:{success:n[0],error:n[1]};return new Promise((r,s)=>{const i=Zt("/get-dev-profile",e.APIOrigin,e.authToken,"get");Lt(i,t.success,t.error,r,s),i.send()})}async function*Je(n,e={}){let t={cursor:e.cursor??null,...e.includeTotal===!0?{includeTotal:!0}:{}};for(;;){const r=await n(t),s=Array.isArray(r)?{items:r}:r??{items:[]};if(yield s,!s.cursor)return;t={cursor:s.cursor}}}async function Qt(n){const e=[];for await(const t of Je(n))e.push(...t.items??[]);return e}function Nl(n){const{puter:e}=this,t=typeof n=="object"&&n!==null,r=t?n:{},{limit:s,offset:i,cursor:o,includeTotal:a,stream:u,...l}=r,c=Object.prototype.hasOwnProperty.call(r,"cursor"),d=B({iface:"puter-apps",driver:"es:app",method:"select",argNames:["uid"],puter:e,readonly:!0}),f={predicate:["user-can-edit"]};t&&(f.params=l),s!==void 0&&(f.limit=s);const g=m=>d({...f,...m});if(u===!0){if(i!==void 0)throw new D("`offset` cannot be combined with `stream`; pass `cursor` to resume from a position.","invalid_request");return async function*(){for await(const m of Je(g,{cursor:o,includeTotal:a===!0}))xn(e,m.items??[]),yield m}()}return s!==void 0||i!==void 0||c||a!==void 0?(async()=>{const m={...f};i!==void 0&&(m.offset=i),c&&(m.cursor=o??null),a!==void 0&&(m.includeTotal=a);const b=await d(m);return b&&!Array.isArray(b)&&Array.isArray(b.items)?(xn(e,b.items),b):xn(e,b)})():Qt(g).then(m=>xn(e,m))}async function Ul(n,e){const{puter:t}=this;let r={};typeof n=="string"&&(r={id:{name:n},object:Ua(e??{})});const s=await B({iface:"puter-apps",driver:"es:app",method:"update",argNames:["object"],puter:t})(r);return ns(t,s)}class Ol extends Ne{constructor(t){super(t);p(this,"list",Nl);p(this,"create",Bl);p(this,"update",Ul);p(this,"get",ql);p(this,"delete",Ml);p(this,"checkName",Pl);p(this,"getDeveloperProfile",Fl);const r=this;for(const s of["list","create","update","get","delete","checkName","getDeveloperProfile"])r[s]=r[s].bind(this)}}const $l=Ol;var Kr,It,js,zs;class Yt extends(globalThis.HTMLElement||Object){constructor(t,r,s={}){super();E(this,It);E(this,Kr);p(this,"cancelListener",()=>{if(this.close(),window.removeEventListener("message",this.messageListener),this.options.popupURL){typeof this.options.onCancel=="function"&&this.options.onCancel();return}puter.puterAuthState.authGranted=!1,puter.puterAuthState.isPromptOpen=!1,this.reject(new Error("User cancelled the authentication"));const t=puter.puterAuthState.resolvers;puter.puterAuthState.resolvers=[];for(const r of t)r.reject(new Error("User cancelled the authentication"))});this.reject=r,this.resolve=t,this.options=s,y(this,Kr,this.constructor.messageID++),this.attachShadow({mode:"open"});let i;if(i=`
        <style>
        dialog{
            background: transparent;
            border: none;
            box-shadow: none;
            outline: none;
        }
        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
        }
        .puter-dialog-content {
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            padding: 20px;
            background: white;
            box-shadow: 0 0 9px 1px rgb(0 0 0 / 21%);
            padding: 80px 20px;
            -webkit-font-smoothing: antialiased;
            color: #575762;
            position: relative;
            background-color: #fff;
        }
        
        dialog * {
            max-width: 500px;
            font-family: "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        }
        
        dialog p.about{
            text-align: center;
            font-size: 17px;
            padding: 10px 30px;
            font-weight: 400;
            -webkit-font-smoothing: antialiased;
            color: #1f1f2a;
            box-sizing: border-box;
            max-width: 400px;
        }
        
        dialog .buttons{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 20px;
            text-align: center;
            flex-direction: column;
        }
        
        .launch-auth-popup-footnote{
            font-size: 10px;
            color: #666;
            margin-top: 10px;
            /* footer at the bottom */
            position: absolute;
            left: 0;
            right: 0;
            bottom: 20px;
            text-align: center;
            margin: 0 auto; 
            max-width: 215px;
        }
        
        dialog .close-btn{
            position: absolute;
            right: 15px;
            top: 10px;
            font-size: 17px;
            color: #8a8a8a8c;
            cursor: pointer;
        }
        
        dialog .close-btn:hover{
            color: #000;
        }
        
        /* ------------------------------------
        Button
        ------------------------------------*/
        
        dialog .button {
            color: #666666;
            background-color: #eeeeee;
            border-color: #eeeeee;
            font-size: 14px;
            text-decoration: none;
            text-align: center;
            line-height: 40px;
            height: 35px;
            padding: 0 30px;
            margin: 0;
            display: inline-block;
            appearance: none;
            cursor: pointer;
            border: none;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-color: #b9b9b9;
            border-style: solid;
            border-width: 1px;
            line-height: 35px;
            background: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e1e1e1));
            background: linear-gradient(#f6f6f6, #e1e1e1);
            border-radius: 4px;
            outline: none;
            -webkit-font-smoothing: antialiased;
        }
        
        dialog .button:focus-visible {
            border-color: rgb(118 118 118);
        }
        
        dialog .button:active, dialog .button.active, dialog .button.is-active, dialog .button.has-open-contextmenu {
            text-decoration: none;
            background-color: #eeeeee;
            border-color: #cfcfcf;
            color: #a9a9a9;
            -webkit-transition-duration: 0s;
            transition-duration: 0s;
            -webkit-box-shadow: inset 0 1px 3px rgb(0 0 0 / 20%);
            box-shadow: inset 0px 2px 3px rgb(0 0 0 / 36%), 0px 1px 0px white;
        }
        
        dialog .button.disabled, dialog .button.is-disabled, dialog .button:disabled {
            top: 0 !important;
            background: #EEE !important;
            border: 1px solid #DDD !important;
            text-shadow: 0 1px 1px white !important;
            color: #CCC !important;
            cursor: default !important;
            appearance: none !important;
            pointer-events: none;
        }
        
        dialog .button-action.disabled, dialog .button-action.is-disabled, dialog .button-action:disabled {
            background: #55a975 !important;
            border: 1px solid #60ab7d !important;
            text-shadow: none !important;
            color: #CCC !important;
        }
        
        dialog .button-primary.disabled, dialog .button-primary.is-disabled, dialog .button-primary:disabled {
            background: #8fc2e7 !important;
            border: 1px solid #98adbd !important;
            text-shadow: none !important;
            color: #f5f5f5 !important;
        }
        
        dialog .button-block {
            width: 100%;
        }
        
        dialog .button-primary {
            border-color: #088ef0;
            background: -webkit-gradient(linear, left top, left bottom, from(#34a5f8), to(#088ef0));
            background: linear-gradient(#34a5f8, #088ef0);
            color: white;
        }
        
        dialog .button-danger {
            border-color: #f00808;
            background: -webkit-gradient(linear, left top, left bottom, from(#f83434), to(#f00808));
            background: linear-gradient(#f83434, #f00808);
            color: white;
        }
        
        dialog .button-primary:active, dialog .button-primary.active, dialog .button-primary.is-active, dialog .button-primary-flat:active, dialog .button-primary-flat.active, dialog .button-primary-flat.is-active {
            background-color: #2798eb;
            border-color: #2798eb;
            color: #bedef5;
        }
        
        dialog .button-action {
            border-color: #08bf4e;
            background: -webkit-gradient(linear, left top, left bottom, from(#29d55d), to(#1ccd60));
            background: linear-gradient(#29d55d, #1ccd60);
            color: white;
        }
        
        dialog .button-action:active, dialog .button-action.active, dialog .button-action.is-active, dialog .button-action-flat:active, dialog .button-action-flat.active, dialog .button-action-flat.is-active {
            background-color: #27eb41;
            border-color: #27eb41;
            color: #bef5ca;
        }
        
        dialog .button-giant {
            font-size: 28px;
            height: 70px;
            line-height: 70px;
            padding: 0 70px;
        }
        
        dialog .button-jumbo {
            font-size: 24px;
            height: 60px;
            line-height: 60px;
            padding: 0 60px;
        }
        
        dialog .button-large {
            font-size: 20px;
            height: 50px;
            line-height: 50px;
            padding: 0 50px;
        }
        
        dialog .button-normal {
            font-size: 16px;
            height: 40px;
            line-height: 38px;
            padding: 0 40px;
        }
        
        dialog .button-small {
            height: 30px;
            line-height: 29px;
            padding: 0 30px;
        }
        
        dialog .button-tiny {
            font-size: 9.6px;
            height: 24px;
            line-height: 24px;
            padding: 0 24px;
        }
        
        #launch-auth-popup{
            width: 220px; 
            font-weight: 500; 
            font-size: 15px;
            max-width: 250px;
        }
        dialog .button-auth{
            margin-bottom: 10px;
        }
        dialog .button-auth-cancel{
            background: none !important;
            width: 220px;
            max-width: 250px;
        }
        dialog a, dialog a:visited{
            color: rgb(0 0 0);
            text-decoration: none;
        }
        dialog a:hover{
            text-decoration: underline;
        }
        
        @media (max-width:480px)  {
            .puter-dialog-content{
                padding: 50px 20px;
            }
            dialog p.about{
                padding: 10px 0;
            }
            dialog .button-auth{
                width: 100% !important;
                margin:0 !important;
                margin-bottom: 10px !important;
            }

            dialog .buttons{
                margin-bottom: 20px;
            }
        }
        .error-container h1 {
            color: #e74c3c;
            font-size: 20px;
            text-align: center;
        }

        .puter-dialog-content a:focus{
            outline: none;
        }

        @media (prefers-color-scheme: dark) {
            .puter-dialog-content {
                border: 1px solid #2a2a2e;
                background: #1e1e22;
                background-color: #1e1e22;
                color: #d6d6dc;
                box-shadow: 0 0 9px 1px rgb(0 0 0 / 60%);
            }

            dialog p.about {
                color: #e4e4ea;
            }

            dialog .close-btn {
                color: #8a8a90;
            }

            dialog .close-btn:hover {
                color: #fff;
            }

            .launch-auth-popup-footnote {
                color: #9a9aa0;
            }

            dialog .button {
                color: #d6d6dc;
                background-color: #3a3a40;
                border-color: #4a4a50;
                background: linear-gradient(#3f3f45, #2e2e34);
                -webkit-box-shadow: inset 0px 1px 0px rgb(255 255 255 / 6%), 0 1px 2px rgb(0 0 0 / 40%);
                box-shadow: inset 0px 1px 0px rgb(255 255 255 / 6%), 0 1px 2px rgb(0 0 0 / 40%);
            }

            dialog .button:focus-visible {
                border-color: #8a8a90;
            }

            dialog .button:active, dialog .button.active, dialog .button.is-active, dialog .button.has-open-contextmenu {
                background-color: #2a2a30;
                border-color: #1f1f24;
                color: #8a8a90;
                -webkit-box-shadow: inset 0 1px 3px rgb(0 0 0 / 60%);
                box-shadow: inset 0px 2px 3px rgb(0 0 0 / 60%), 0px 1px 0px rgb(255 255 255 / 4%);
            }

            /* The dark-mode 'dialog .button' rule above has the same specificity
               as the light-mode 'dialog .button-primary' rule, so without this
               override source order wins and the primary button turns gray. */
            dialog .button-primary {
                border-color: #088ef0;
                background: linear-gradient(#34a5f8, #088ef0);
                color: white;
            }

            dialog .button-primary:active, dialog .button-primary.active, dialog .button-primary.is-active {
                background-color: #2798eb;
                border-color: #2798eb;
                color: #bedef5;
            }

            dialog .button.disabled, dialog .button.is-disabled, dialog .button:disabled {
                background: #2a2a30 !important;
                border: 1px solid #34343a !important;
                text-shadow: none !important;
                color: #5a5a60 !important;
            }

            dialog .button-primary.disabled, dialog .button-primary.is-disabled, dialog .button-primary:disabled {
                background: #1f4e74 !important;
                border: 1px solid #2a5a82 !important;
                color: #8aa4bd !important;
            }

            dialog .button-action.disabled, dialog .button-action.is-disabled, dialog .button-action:disabled {
                background: #1f5a3a !important;
                border: 1px solid #2a6a45 !important;
                color: #8abda0 !important;
            }

            dialog a, dialog a:visited {
                color: #6ea8ff;
            }

            .error-container h1 {
                color: #ff7466;
            }
        }
        </style>`,fi()){const o=!La();i+=`<dialog>
                    <div class="puter-dialog-content" style="padding: 20px 40px; font-size: 15px;">
                        <span class="close-btn">&#x2715</span>
                        <div class="error-container">
                            <h1>Puter.js Error: Unsupported Origin</h1>
                            <p>${o?`It looks like you've opened this file directly in your browser (using the <code style="font-family: monospace;">file:///</code> protocol), which gives the page no origin.`:'This page is in an iframe sandboxed without <code style="font-family: monospace;">allow-same-origin</code>, which gives it no origin.'} Puter.js signs a page in by its origin, so it cannot sign this one in.</p>
                            <p>To use Puter.js here:</p>
                            <ul>
                                ${o?"<li>Serve the page from a local development server (e.g., Python's built-in server or Node.js http-server)</li><li>Or upload the files to a web hosting service</li>":`<li>Add <code style="font-family: monospace;">allow-same-origin</code> to the iframe's <code style="font-family: monospace;">sandbox</code> attribute</li><li>Or load Puter.js from the parent page instead</li>`}
                            </ul>
                            <p class="help-text">If you're not familiar with these options, consider reaching out to your development team or IT support for assistance.</p>
                        </div>
                        <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; text-align: center; font-size:13px;">
                            <a href="https://docs.puter.com" target="_blank">Docs</a><span style="margin:10px; color: #CCC;">|</span>
                            <a href="https://github.com/heyPuter/puter/" target="_blank">Github</a><span style="margin:10px; color: #CCC;">|</span>
                            <a href="https://discord.com/invite/PQcx7Teh8u" target="_blank">Discord</a>
                        </p>
                    </div>
                </dialog>`}else i+=`<dialog>
                <div class="puter-dialog-content">
                    <span class="close-btn">&#x2715</span>
                    <a href="https://puter.com?utm_source=sdk-splash" target="_blank" style="border:none; outline:none; display: block; width: 70px; height: 70px; margin: 0 auto; border-radius: 4px;"><img style="display: block; width: 40px; height: 40px; margin: 0 auto; border-radius: 8px; background-color: #2210d7; padding: 15px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgY2xhc3M9ImxheWVyIj4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGcgaWQ9InN2Z18xIiBzdHJva2Utd2lkdGg9IjMiIHRyYW5zZm9ybT0icm90YXRlKDkwIDI0IDIzLjk5OTcpIj4KICAgPHBvbHlsaW5lIGZpbGw9Im5vbmUiIGlkPSJzdmdfMiIgcG9pbnRzPSIzOSAyNCAyNSAyNCAyNSAyOCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMyIvPgogICA8cG9seWxpbmUgZmlsbD0ibm9uZSIgaWQ9InN2Z18zIiBwb2ludHM9IjM1Ljg3OSAxMC4xMjEgMzIgMTQgMjUgMTQgMjUgMTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgPHBhdGggZD0ibTEzLDI2YTEwLjI5LDEwLjI5IDAgMCAxIC03LjIsLTMiIGZpbGw9Im5vbmUiIGlkPSJzdmdfNCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMyIvPgogICA8cGF0aCBkPSJtMTcsMzEuNmE1LjgzLDUuODMgMCAwIDEgLTQsLTUuNmE1LjczLDUuNzMgMCAwIDEgMiwtNC40IiBmaWxsPSJub25lIiBpZD0ic3ZnXzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgPHBhdGggZD0ibTM1Ljg4LDM3Ljg4bC0zLjg4LC0zLjg4bC03LDBsMCwyYTkuOSw5LjkgMCAwIDEgLTEwLDEwYTkuOSw5LjkgMCAwIDEgLTEwLC0xMGE5LjA2LDkuMDYgMCAwIDEgMC42LC0zLjJhNS42Myw1LjYzIDAgMCAxIC0yLjYsLTQuOGE1Ljg5LDUuODkgMCAwIDEgMi44LC01YTkuOTksOS45OSAwIDAgMSAtMi44LC03YTkuOSw5LjkgMCAwIDEgMTAsLTEwbDAuNCwwYTUuODMsNS44MyAwIDAgMSA1LjYsLTRhNS44OSw1Ljg5IDAgMCAxIDYsNiIgZmlsbD0ibm9uZSIgaWQ9InN2Z182IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgIDxjaXJjbGUgY3g9IjM4IiBjeT0iOCIgZGF0YS1jb2xvcj0iY29sb3ItMiIgZmlsbD0ibm9uZSIgaWQ9InN2Z183IiByPSIzIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgIDxjaXJjbGUgY3g9IjQyIiBjeT0iMjQiIGRhdGEtY29sb3I9ImNvbG9yLTIiIGZpbGw9Im5vbmUiIGlkPSJzdmdfOCIgcj0iMyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMyIvPgogICA8Y2lyY2xlIGN4PSIzOCIgY3k9IjQwIiBkYXRhLWNvbG9yPSJjb2xvci0yIiBmaWxsPSJub25lIiBpZD0ic3ZnXzkiIHI9IjMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg=="/></a>
                    <p class="about">This website uses Puter to bring you safe, secure, and private AI and Cloud features.</p>
                    <div class="buttons">
                        <button class="button button-primary button-auth" id="launch-auth-popup">Continue</button>
                        <button class="button button-auth button-auth-cancel" id="launch-auth-popup-cancel">Cancel</button>
                    </div>
                    <p class="launch-auth-popup-footnote">By clicking 'Continue' you agree to Puter's <a href="https://puter.com/terms" target="_blank">Terms of Service</a> and <a href="https://puter.com/privacy" target="_blank">Privacy Policy</a></p>
                </div>
            </dialog>`;this.shadowRoot.innerHTML=i,this.messageListener=async o=>{if(o.origin===puter.defaultGUIOrigin&&!(this.authPopup&&o.source!==this.authPopup)&&o.data.msg==="puter.token"){this.close(),puter.setAuthToken(o.data.token),puter.setAppID(o.data.app_uid),window.removeEventListener("message",this.messageListener),puter.puterAuthState.authGranted=!0,this.resolve(),puter.onAuth&&typeof puter.onAuth=="function"&&puter.getUser().then(u=>{puter.onAuth(u)}),puter.puterAuthState.isPromptOpen=!1;const a=puter.puterAuthState.resolvers;puter.puterAuthState.resolvers=[];for(const u of a)puter.puterAuthState.authGranted?u.resolve():u.reject()}}}connectedCallback(){var t,r,s,i;(t=this.shadowRoot.querySelector("#launch-auth-popup"))==null||t.addEventListener("click",()=>{const o=_(this,It,zs).call(this);this.authPopup=o,this.options.popupURL&&(typeof this.options.onLaunch=="function"&&this.options.onLaunch(o),this.close())}),this.options.popupURL||window.addEventListener("message",this.messageListener),(r=this.shadowRoot.querySelector("#launch-auth-popup-cancel"))==null||r.addEventListener("click",this.cancelListener),(s=this.shadowRoot.querySelector(".close-btn"))==null||s.addEventListener("click",this.cancelListener),(i=this.shadowRoot.querySelector("dialog"))==null||i.addEventListener("cancel",o=>{o.preventDefault(),this.cancelListener()})}openNotice(){try{this.shadowRoot.querySelector("dialog").showModal()}catch(t){console.error("Puter.js: could not show the notice dialog",t)}}open(){if(jn()){const t=_(this,It,zs).call(this);this.authPopup=t,this.options.popupURL&&typeof this.options.onLaunch=="function"&&this.options.onLaunch(t)}else this.shadowRoot.querySelector("dialog").showModal()}close(){this.shadowRoot.querySelector("dialog").close()}}Kr=new WeakMap,It=new WeakSet,js=function(){return this.options.popupURL?this.options.popupURL:`${puter.defaultGUIOrigin}/?embedded_in_popup=true&request_auth=true&msg_id=${h(this,Kr)}${window.crossOriginIsolated?"&cross_origin_isolated=true":""}`},zs=function(){return this.options.popupName?Wr(_(this,It,js).call(this),this.options.popupName):Wr(_(this,It,js).call(this))},p(Yt,"messageID",Math.floor(Number.MAX_SAFE_INTEGER/2));Yt.__proto__===globalThis.HTMLElement&&customElements.define("puter-dialog",Yt);var Qn;class jl extends Ne{constructor(){super(...arguments);E(this,Qn,1);p(this,"signIn",t=>(t=t||{},puter.env==="app"?Promise.reject({error:"not_available_in_app",msg:"signIn is not available to an app; the Puter session that launched it provides the token."}):fi()?Promise.reject({error:"unsupported_origin",msg:"This page has no origin Puter can sign in. Serve it over http://localhost or a real domain instead of opening it from a file, and give sandboxed iframes allow-same-origin."}):new Promise((r,s)=>{const i=crypto.randomUUID(),o=Ze(this,Qn)._++,a=`${puter.defaultGUIOrigin}/action/sign-in?embedded_in_popup=true&msg_id=${o}${window.crossOriginIsolated?`&cross_origin_isolated=true&signin_session=${i}`:""}${t.attempt_temp_user_creation?"&attempt_temp_user_creation=true":""}${t.request_auth?"&request_auth=true":""}`;let u=!1,l=null,c=null;const d=()=>{l&&(clearInterval(l),l=null),window.removeEventListener("message",f)};window.crossOriginIsolated&&(async()=>{for(;;){try{const m=await G(`${puter.defaultAPIOrigin}/login/wait`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session:i})});if(m.ok){const{auth_token:b}=await m.json();return u?void 0:(u=!0,d(),puter.setAuthToken(b),r({success:!0,token:b}),"")}}catch{}await new Promise(m=>setTimeout(m,1e3))}})();function f(m){var b,v;m.origin===puter.defaultGUIOrigin&&(c&&m.source!==c||((b=m.data)==null?void 0:b.msg)==="puter.token"&&((v=m.data)==null?void 0:v.msg_id)==o&&(u||(u=!0,d(),delete m.data.msg_id,delete m.data.msg,m.data.success?(puter.setAuthToken(m.data.token),r(m.data)):s(m.data))))}window.addEventListener("message",f);const g=m=>{if(!u){if(!m){u=!0,d(),s({error:"popup_blocked",msg:"The sign-in popup was blocked by the browser."});return}c=m,l=setInterval(()=>{m.closed&&(clearInterval(l),l=null,!u&&(u=!0,d(),s({error:"auth_window_closed",msg:"Authentication window was closed by the user without completing the process."})))},100)}};if(jn()){const m=Wr(a);window.crossOriginIsolated||g(m)}else{const m=new Yt(()=>{},()=>{},{popupURL:a,onLaunch:b=>g(b),onCancel:()=>{u||(u=!0,d(),s({error:"auth_window_closed",msg:"Authentication window was closed by the user without completing the process."}))}});document.body.appendChild(m),m.open()}})));p(this,"isSignedIn",()=>!!puter.authToken);p(this,"getUser",function(...t){if(!puter.authToken)throw{status:401,message:"Unauthorized"};let r;return typeof t[0]=="object"&&t[0]!==null?r=t[0]:r={success:t[0],error:t[1]},new Promise((s,i)=>{const o=Zt("/whoami",puter.APIOrigin,puter.authToken,"get");Lt(o,r.success,r.error,s,i),o.send()})});p(this,"signOut",()=>{puter.resetAuthToken()})}async getProfile(t){try{if(t===void 0){if(!this.authToken)return null}else if(typeof t!="string"||!/^[a-z0-9_-]{1,64}$/i.test(t))return null;const r=new URL(`${this.APIOrigin}/profile`);t!==void 0&&r.searchParams.set("username",t);const s=await G(r.toString(),{includePuterAuth:!0,interactiveReauth:!1,logContext:{service:"auth",operation:"get_profile",params:{username:t}}});if(!s.ok)return null;const i=await s.json();return!i||typeof i!="object"||Array.isArray(i)?null:i}catch{return null}}async updateProfile(t){if(!t||typeof t!="object"||Array.isArray(t))throw{message:"patch must be an object of profile fields",code:"profile_patch_invalid"};const r=await G(`${this.APIOrigin}/profile`,{method:"POST",includePuterAuth:!0,headers:{"Content-Type":"application/json"},body:JSON.stringify(t),logContext:{service:"auth",operation:"update_profile",params:{fields:Object.keys(t)}}}),s=await r.json();if(!r.ok)throw s;return s}async getProfilePicture(t){const r=await this.getProfile(t),s=r==null?void 0:r.picture;return typeof s=="string"&&/^data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/]+={0,2}$/i.test(s)?s:null}async whoami(){if(!this.authToken)throw{status:401,message:"Unauthorized"};return await(await G(`${this.APIOrigin}/whoami`,{includePuterAuth:!0,logContext:{service:"auth",operation:"whoami",params:{}}})).json()}async getMonthlyUsage(){return await(await G(`${this.APIOrigin}/metering/usage`,{includePuterAuth:!0,logContext:{service:"auth",operation:"usage",params:{}}})).json()}async getDetailedAppUsage(t){if(!t)throw new Error("appId is required");return await(await G(`${this.APIOrigin}/metering/usage/${t}`,{includePuterAuth:!0,logContext:{service:"auth",operation:"detailed_app_usage",params:{appId:t}}})).json()}async getGlobalUsage(){return await(await G(`${this.APIOrigin}/metering/globalUsage`,{includePuterAuth:!0,logContext:{service:"auth",operation:"global_usage",params:{}}})).json()}}Qn=new WeakMap;const zl=jl;class Hl{constructor(e,t){this.puter=e,this.parameters=t,this._init()}_init(){let t=new URL(location.href).searchParams.get("enabled_logs");t||(t=""),t=t.split(";");for(const r of t)r!==""&&this.puter.logger.on(r);globalThis.addEventListener("message",async r=>{r.source===globalThis.parent&&r.data.$&&r.data.$==="puterjs-debug"&&(console.log("Got a puter.js debug event!",r.data),r.data.cmd==="log.on"&&(console.log("Got instruction to turn logs on!"),this.puter.logger.on(r.data.category)))})}}class Wl{constructor(e,t){this.puter=e,this.iface_name=t}async call(e,t){return await Ia({puter:this.puter,iface:this.iface_name,method:e,args:t})}}class Gl{constructor(e){this.puter=e,this.drivers_={}}_init({puter:e}){e.call=this.call.bind(this)}async list(){return(await(await G(`${this.puter.APIOrigin}/lsmod`,{method:"POST",includePuterAuth:!0,logContext:{service:"drivers",operation:"list",params:{}}})).json()).interfaces}async get(e){var t;return(t=this.drivers_)[e]??(t[e]=new Wl(this.puter,e))}async call(...e){let t,r,s;return e.length>=4?[t,,r,s]=e:e.length===3?[t,r,s]=e:([t,s]=e,r=t),await(await this.get(t)).call(r,s)}}const Vl=Gl;function Xl(n=new Date){return n.toUTCString().replace("GMT","+0000")}function oe(n,e){if(!Rn(n))throw new Error("eml header key "+n+" is not valid ASCII");if(Array.isArray(e))return e.forEach(t=>{if(!Rn(t))throw new Error("eml header value "+t+" is not valid ASCII")}),`${n}: ${e.join(", ")}\r
`;if(!Rn(e))throw new Error("eml header value "+e+" is not valid ASCII");return`${n}: ${e}\r
`}function Jl({attachments:n=[],text:e,html:t}){const r=n.filter(i=>i.cid);if(n.filter(i=>!i.cid).length>0)return{isMultiPart:!0,mimeType:"multipart/mixed"};if(r.length>0)return{isMultiPart:!0,mimeType:"multipart/related"};if(e&&t)return{isMultiPart:!0,mimeType:"multipart/alternative"};if(e)return{isMultiPart:!1,mimeType:"text/plain; charset=UTF-8"};if(t)return{isMultiPart:!1,mimeType:"text/html; charset=UTF-8"};throw new Error("Email must have text, html, or an attachment")}async function Kl(n){const e=await n.arrayBuffer(),t=new Uint8Array(e);let r="";for(let s=0;s<t.byteLength;s++)r+=String.fromCharCode(t[s]);return btoa(r)}const Rn=n=>/^[\x20-\x7E]*$/.test(n);async function so({cid:n,content:e,contentType:t,filename:r,path:s,uid:i}){if(s&&e)throw new Error("Path and Content are mutually exclusive");if(!s&&!e&&!i)throw new Error("Attachment requires content, path, or uid");if(i)throw new Error("uid attachments are not supported yet");if(t&&!r)throw new Error("filename parameter required for contentType");let o=e,a;if(s){const l=await puter.fs.read(s);r||(r=s.split("/").pop()),o=await Kl(l),a=l.type}if(!r)throw new Error("Attachment's filename cannot be determined automatically. Please provide filename!");if(r=r.replaceAll("\\","\\\\"),r=r.replaceAll('"','\\"'),!Rn(r))throw new Error("filename must be ascii");if(t&&(a=t),!a)throw new Error("Attachment's mimetype cannot be determined automatically. Please provide contentType!");a+=';name="'+r+'"';let u="";return u+=oe("Content-Type",a),u+=oe("Content-Transfer-Encoding","base64"),n?(u+=oe("Content-ID",`<${n}>`),u+=oe("Content-Disposition",'inline;filename="'+r+'"')):u+=oe("Content-Disposition",'attachment;filename="'+r+'"'),u+=`\r
`,u+o}function Sr(n,e){return n.map(t=>`--${e}\r
${t}\r
`).join("")+`--${e}--\r
`}async function Yl({from:n,to:e,cc:t,bcc:r,subject:s,replyTo:i,attachments:o=[],text:a,html:u}){let l=`MIME-Version: 1.0\r
`;if(l+=oe("Date",Xl()),s&&(l+=oe("Subject",s)),e)l+=oe("To",e);else throw new Error("Cannot compose email without recipient!");if(t&&(l+=oe("cc",t)),r&&(l+=oe("bcc",r)),i&&(l+=oe("Reply-To",i)),n)l+=oe("From",n);else{const w=await puter.getUser();l+=oe("From",w.username+"@puter.email")}const{isMultiPart:c,mimeType:d}=Jl({attachments:o,text:a,html:u}),f=crypto.randomUUID();if(c?l+=oe("Content-Type",`${d}; boundary="${f}"`):l+=oe("Content-Type",`${d}`),l+=`\r
`,!c)return l+(a||u);const g=oe("Content-Type","text/plain; charset=UTF-8")+`\r
`+a,m=oe("Content-Type","text/html; charset=UTF-8")+`\r
`+u;if(o.length===0)return l+Sr([g,m],f);const b=o.filter(w=>w.cid),v=o.filter(w=>!w.cid),A=await Promise.all(b.map(so)),k=await Promise.all(v.map(so));let T=null;if(a&&u){const w=crypto.randomUUID();T=oe("Content-Type",`multipart/alternative; boundary="${w}"`)+`\r
`,T+=Sr([g,m],w)}else a?T=g:u&&(T=m);let M;if(b.length>0){const w=[T,...A].filter(Boolean);if(v.length===0)return l+Sr(w,f);const C=crypto.randomUUID();M=oe("Content-Type",`multipart/related; boundary="${C}"`)+`\r
`,M+=Sr(w,C)}else M=T;const x=[M,...k].filter(Boolean);return l+Sr(x,f)}const _r=new TextEncoder,io="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Mr=new Uint8Array(256);for(let n=0;n<io.length;n++)Mr[io.charCodeAt(n)]=n;function Oa(n){let e=n.length;for(;e>0&&n.charAt(e-1)==="=";)e--;e%4===1&&e--;const t=e%4,r=Math.floor(e/4)*3+(t?t-1:0),s=new ArrayBuffer(r),i=new Uint8Array(s);let o=0;for(let a=0;a<e;a+=4){let u=Mr[n.charCodeAt(a)],l=Mr[n.charCodeAt(a+1)],c=Mr[n.charCodeAt(a+2)],d=Mr[n.charCodeAt(a+3)];i[o++]=u<<2|l>>4,o<r&&(i[o++]=(l&15)<<4|c>>2),o<r&&(i[o++]=(c&3)<<6|d&63)}return s}const Zl=new Map([["iso88598i","iso-8859-8"],["iso88598e","iso-8859-8"],["shiftjis","shift_jis"],["windows31j","shift_jis"],["mskanji","shift_jis"],["eucjp","euc-jp"],["iso2022jp","iso-2022-jp"],["iso2022jp1","iso-2022-jp"],["iso2022jp2","iso-2022-jp"],["junet","iso-2022-jp"],["euckr","euc-kr"],["uhc","euc-kr"],["tis620","windows-874"]]),Ql=new Map([["932","shift_jis"],["936","gbk"],["949","euc-kr"],["950","big5"],["874","windows-874"],["51932","euc-jp"],["50220","iso-2022-jp"],["50221","iso-2022-jp"],["50222","iso-2022-jp"]]),ed=/^(?:cp|windows|ms|ibm)(\d+)$/;function td(n){return n.replace(/^(?:x-ms-|x-|cs)/,"").replace(/[\s._-]+/g,"")}const rd=new Set(["unicode-1-1-utf-8 unicode11utf8 unicode20utf8 utf-8 utf8 x-unicode20utf8","866 cp866 csibm866 ibm866","csisolatin2 iso-8859-2 iso-ir-101 iso8859-2 iso88592 iso_8859-2 iso_8859-2:1987 l2 latin2","csisolatin3 iso-8859-3 iso-ir-109 iso8859-3 iso88593 iso_8859-3 iso_8859-3:1988 l3 latin3","csisolatin4 iso-8859-4 iso-ir-110 iso8859-4 iso88594 iso_8859-4 iso_8859-4:1988 l4 latin4","csisolatincyrillic cyrillic iso-8859-5 iso-ir-144 iso8859-5 iso88595 iso_8859-5 iso_8859-5:1988","arabic asmo-708 csiso88596e csiso88596i csisolatinarabic ecma-114 iso-8859-6 iso-8859-6-e","iso-8859-6-i iso-ir-127 iso8859-6 iso88596 iso_8859-6 iso_8859-6:1987","csisolatingreek ecma-118 elot_928 greek greek8 iso-8859-7 iso-ir-126 iso8859-7 iso88597 iso_8859-7","iso_8859-7:1987 sun_eu_greek","csiso88598e csisolatinhebrew hebrew iso-8859-8 iso-8859-8-e iso-ir-138 iso8859-8 iso88598 iso_8859-8","iso_8859-8:1988 visual","csiso88598i iso-8859-8-i logical","csisolatin6 iso-8859-10 iso-ir-157 iso8859-10 iso885910 l6 latin6","iso-8859-13 iso8859-13 iso885913","iso-8859-14 iso8859-14 iso885914","csisolatin9 iso-8859-15 iso8859-15 iso885915 iso_8859-15 l9","iso-8859-16","cskoi8r koi koi8 koi8-r koi8_r","koi8-ru koi8-u","csmacintosh mac macintosh x-mac-roman","dos-874 iso-8859-11 iso8859-11 iso885911 tis-620 windows-874","cp1250 windows-1250 x-cp1250","cp1251 windows-1251 x-cp1251","ansi_x3.4-1968 ascii cp1252 cp819 csisolatin1 ibm819 iso-8859-1 iso-ir-100 iso8859-1 iso88591","iso_8859-1 iso_8859-1:1987 l1 latin1 us-ascii windows-1252 x-cp1252","cp1253 windows-1253 x-cp1253","cp1254 csisolatin5 iso-8859-9 iso-ir-148 iso8859-9 iso88599 iso_8859-9 iso_8859-9:1989 l5 latin5","windows-1254 x-cp1254","cp1255 windows-1255 x-cp1255","cp1256 windows-1256 x-cp1256","cp1257 windows-1257 x-cp1257","cp1258 windows-1258 x-cp1258","x-mac-cyrillic x-mac-ukrainian","chinese csgb2312 csiso58gb231280 gb2312 gb_2312 gb_2312-80 gbk iso-ir-58 x-gbk","gb18030","big5 big5-hkscs cn-big5 csbig5 x-x-big5","cseucpkdfmtjapanese euc-jp x-euc-jp","csiso2022jp iso-2022-jp","csshiftjis ms932 ms_kanji shift-jis shift_jis sjis windows-31j x-sjis","cseuckr csksc56011987 euc-kr iso-ir-149 korean ks_c_5601-1987 ks_c_5601-1989 ksc5601 ksc_5601","windows-949","csiso2022kr hz-gb-2312 iso-2022-cn iso-2022-cn-ext iso-2022-kr replacement","unicodefffe utf-16be","csunicode iso-10646-ucs-2 ucs-2 unicode unicodefeff utf-16 utf-16le","x-user-defined"].join(" ").split(" ")),_s=new Map;function As(n){if(!rd.has(n))return null;if(!_s.has(n)){let e=null;try{e=new TextDecoder(n)}catch{}_s.set(n,e)}return _s.get(n)}function wi(n){n=(n||"utf8").trim().toLowerCase();const e=As(n);if(e)return e;const t=td(n),r=t.match(ed),s=r&&Ql.get(r[1])||Zl.get(t)||t;return As(s)||As("windows-1252")}async function ss(n){if("arrayBuffer"in n)return await n.arrayBuffer();const e=new FileReader;return new Promise((t,r)=>{e.onload=function(s){t(s.target.result)},e.onerror=function(s){r(e.error)},e.readAsArrayBuffer(n)})}function Hn(n){return n>=48&&n<=57?n-48:n>=97&&n<=102?n-97+10:n>=65&&n<=70?n-65+10:-1}function ks(n,e,t){let r=n.indexOf("*");r>=0&&(n=n.substr(0,r)),e=e.toUpperCase();let s;if(e==="Q"){t=t.replace(/=\s+([0-9a-fA-F])/g,"=$1").replace(/[_\s]/g," ");let i=_r.encode(t),o=[];for(let u=0,l=i.length;u<l;u++){let c=i[u];if(u<=l-2&&c===61){let d=Hn(i[u+1]),f=Hn(i[u+2]);if(d>=0&&f>=0){o.push(d<<4|f),u+=2;continue}}o.push(c)}s=new ArrayBuffer(o.length);let a=new DataView(s);for(let u=0,l=o.length;u<l;u++)a.setUint8(u,o[u])}else e==="B"?s=Oa(t.replace(/[^a-zA-Z0-9\+\/=]+/g,"")):s=_r.encode(t);return wi(n).decode(s)}const $a="=\\?([^?\\s]+)\\?([QqBb])\\?([^?]*)\\?=",oo=new RegExp($a,"g"),nd=/^[ \t\r\n]+$/,sd=new RegExp(`^(?:${$a}\\s*)+$`);function id(n){return sd.test(n)}function od(n){const e=[];oo.lastIndex=0;let t=0,r;for(;r=oo.exec(n);)r.index>t&&e.push({text:n.substring(t,r.index)}),e.push({charset:r[1],encoding:r[2],encodedText:r[3]}),t=r.index+r[0].length;return t<n.length&&e.push({text:n.substring(t)}),e}function ad(n,e){const t=n.encoding.toUpperCase();return n.charset!==e.charset||t!==e.encoding.toUpperCase()?!1:t==="B"?n.encodedText.length%4===0&&!/=$/.test(n.encodedText):!0}function ao(n,e){let t="",r=null;for(let s=0;s<n.length;s++){const i=n[s];if(i.text!==void 0){const o=n[s+1];if(r&&o&&o.text===void 0&&nd.test(i.text))continue;r&&(t+=ks(r.charset,r.encoding,r.encodedText),r=null),t+=i.text;continue}if(r&&e&&ad(r,i)){r.encodedText+=i.encodedText;continue}r&&(t+=ks(r.charset,r.encoding,r.encodedText)),r={charset:i.charset,encoding:i.encoding,encodedText:i.encodedText}}return r&&(t+=ks(r.charset,r.encoding,r.encodedText)),t}function lr(n){const e=od((n||"").toString()),t=ao(e,!0);return t.indexOf("�")<0?t:ao(e,!1)}function uo(n,e){e=e||"utf-8";let t=[];for(let i=0;i<n.length;i++){let o=n.charAt(i);if(o==="%"&&/^[a-f0-9]{2}/i.test(n.substr(i+1,2))){let a=n.substr(i+1,2);i+=2,t.push(parseInt(a,16))}else if(o.charCodeAt(0)>126){o=_r.encode(o);for(let a=0;a<o.length;a++)t.push(o[a])}else t.push(o.charCodeAt(0))}const r=new ArrayBuffer(t.length),s=new DataView(r);for(let i=0,o=t.length;i<o;i++)s.setUint8(i,t[i]);return wi(e).decode(r)}function ud(n){let e=new Map;Object.keys(n.params).forEach(t=>{let r=t.match(/\*((\d+)\*?)?$/);if(!r)return;let s=t.substr(0,r.index).toLowerCase(),i=Number(r[2])||0,o;e.has(s)?o=e.get(s):(o={charset:!1,values:[]},e.set(s,o));let a=n.params[t],u=r[0].charAt(r[0].length-1)==="*";i===0&&u&&(r=a.match(/^([^']*)'[^']*'(.*)$/))&&(o.charset=r[1]||"utf-8",a=r[2]),o.values.push({nr:i,value:a,encoded:u}),delete n.params[t]}),e.forEach((t,r)=>{let s="",i="";for(let o of t.values.sort((a,u)=>a.nr-u.nr)){if(o.encoded){i+=o.value;continue}i&&(s+=uo(i,t.charset),i=""),s+=o.value}i&&(s+=uo(i,t.charset)),n.params[r]=s})}class cd{constructor(){this.chunks=[]}update(e){this.chunks.push(e),this.chunks.push(`
`)}finalize(){return ss(new Blob(this.chunks,{type:"application/octet-stream"}))}}class ld{constructor(e){e=e||{},this.decoder=e.decoder||new TextDecoder,this.maxChunkSize=100*1024,this.chunks=[],this.remainder=""}pushChunk(e){e.length&&this.chunks.push(Oa(e))}flushRemainder(){this.pushChunk(this.remainder),this.remainder=""}update(e){const r=this.decoder.decode(e).replace(/[^a-zA-Z0-9+/=]+/g,"").split(/=+/);for(let s=0;s<r.length;s++)this.remainder+=r[s],s<r.length-1&&this.flushRemainder();if(this.remainder.length>=this.maxChunkSize){const s=Math.floor(this.remainder.length/4)*4;this.pushChunk(this.remainder.substring(0,s)),this.remainder=this.remainder.substring(s)}}finalize(){return this.flushRemainder(),ss(new Blob(this.chunks,{type:"application/octet-stream"}))}}const co=61,dd=10;class hd{constructor(){this.maxChunkSize=100*1024,this.buffer=new Uint8Array(this.maxChunkSize),this.bufferPos=0,this.chunks=[]}writeByte(e){this.bufferPos>=this.buffer.length&&this.flushBuffer(),this.buffer[this.bufferPos++]=e}writeBytes(e,t,r){for(;t<r;){this.bufferPos>=this.buffer.length&&this.flushBuffer();const s=Math.min(r-t,this.buffer.length-this.bufferPos);this.buffer.set(e.subarray(t,t+s),this.bufferPos),this.bufferPos+=s,t+=s}}flushBuffer(){this.bufferPos&&(this.chunks.push(this.buffer.slice(0,this.bufferPos)),this.bufferPos=0)}update(e){let t=e.length;const r=t>0&&e[t-1]===co;r&&t--;let s=0;for(let i=0;i<t;i++){if(e[i]!==co||i+2>=t)continue;const o=Hn(e[i+1]),a=Hn(e[i+2]);o<0||a<0||(this.writeBytes(e,s,i),this.writeByte(o<<4|a),i+=2,s=i+1)}this.writeBytes(e,s,t),r||this.writeByte(dd)}finalize(){return this.flushBuffer(),ss(new Blob(this.chunks,{type:"application/octet-stream"}))}}const fd=new TextDecoder("utf-8",{ignoreBOM:!0}),lo=n=>n===32||n===9,Es=n=>{let e=0,t=n.length;for(;e<t&&lo(n.charCodeAt(e));)e++;for(;t>e&&lo(n.charCodeAt(t-1));)t--;return n.slice(e,t)},pd=new Set(["content-type","content-transfer-encoding","content-disposition","content-id","content-description"]);class ho{constructor(e){if(this.options=e||{},this.postalMime=this.options.postalMime,this.childNodes=[],this.finalizedChildCount=0,this.options.parentNode){if(this.parentNode=this.options.parentNode,this.depth=this.parentNode.depth+1,this.depth>this.options.maxNestingDepth)throw new Error(`Maximum MIME nesting depth of ${this.options.maxNestingDepth} levels exceeded`);this.options.parentNode.childNodes.push(this)}else this.depth=0;this.state="header",this.headerLines=[];const r=(this.options.parentMultipartType||null)==="digest"?"message/rfc822":"text/plain";this.contentType={value:r},this.contentTransferEncoding={value:"8bit"},this.contentDisposition={value:""},this.headers=[],this.contentDecoder=!1}setupContentDecoder(e){/base64/i.test(e)?this.contentDecoder=new ld:/quoted-printable/i.test(e)?this.contentDecoder=new hd:this.contentDecoder=new cd}async finalize(){if(this.state==="finished")return;this.state==="header"&&this.processHeaders();let e=this.postalMime.boundaries;for(let t=e.length-1;t>=0;t--)if(e[t].node===this){e.splice(t,1);break}await this.finalizeChildNodes(),this.content=this.contentDecoder?await this.contentDecoder.finalize():null,this.contentDecoder=!1,this.state="finished"}async finalizeChildNodes(){for(;this.finalizedChildCount<this.childNodes.length;)await this.childNodes[this.finalizedChildCount++].finalize()}stripComments(e){let t="",r=0,s=!1,i=!1,o=-1,a=!1,u=!1;const l=d=>{t+=d,u=d===" "||d==="	"},c=()=>!a||!t.length||u;for(let d=0;d<e.length;d++){const f=e.charAt(d);if(s){r===0&&l(f),s=!1;continue}if(f==="\\"){s=!0,r===0&&l(f);continue}if(f==='"'&&r===0){i=!i,l(f);continue}if(!i){if(f==="("&&c()){r===0&&(o=d),r++;continue}if(f===")"&&r>0){r--;continue}r===0&&(f==="="?a=!0:f===";"&&(a=!1))}r===0&&l(f)}return r===0||e.indexOf(";",o)<0?t:e}parseStructuredHeader(e){e=this.stripComments(e);let t={value:!1,params:{}},r=!1,s="",i="value",o="",a=!1,u=!1,l=!1,c;const d=v=>{s.length&&(s+=o),o="",s+=v},f=()=>{const v=s;return s="",o="",a=!1,v},g=(v,A)=>{Object.prototype.hasOwnProperty.call(t.params,v)||(t.params[v]=A)},m=()=>{const v=f();r===!1?t.value=v:g(r,v)},b=()=>{const v=f().trim();v&&g(v.toLowerCase(),"")};for(let v=0,A=e.length;v<A;v++)switch(c=e.charAt(v),i){case"key":if(c==="="){r=f().trim().toLowerCase(),i="value";break}if(c===";"){b();break}s+=c;break;case"value":if(l)d(c);else if(u&&c==="\\"){l=!0;continue}else u&&c===u?(u=!1,a=!0):!u&&c==='"'?(u=c,s.length&&(s+=o),o=""):!u&&c===";"?(m(),i="key"):!u&&(c===" "||c==="	")?o+=c:a||d(c);l=!1;break}return i==="value"?m():b(),t.value&&(t.value=t.value.toLowerCase()),ud(t),t}decodeFlowedText(e,t){const r=[];let s=0,i=0;const o=e.split(/\r?\n/);for(let a=0;a<o.length;a++){let u=o[a];if(u.charAt(0)===" "&&(u=u.slice(1)),a){const l=r.length?r[r.length-1]:"",c=i===3&&r.slice(s).join("")==="-- ";l.endsWith(" ")&&!c?t&&(l.length>1?r[r.length-1]=l.slice(0,-1):r.pop(),i--):(r.push(`
`),s=r.length,i=0)}u&&(r.push(u),i+=u.length)}return r.join("")}getTextContent(){if(!this.content)return"";let e=wi(this.contentType.parsed.params.charset).decode(this.content);return/^flowed$/i.test(this.contentType.parsed.params.format)&&(e=this.decodeFlowedText(e,/^yes$/i.test(this.contentType.parsed.params.delsp))),e}processHeaders(){let e=[];for(let r of this.headerLines)e.length&&/^[ \t]/.test(r)?e[e.length-1].push(r):e.push([r]);this.rawHeaderLines=[];let t=new Set;for(let r of e){let s=r.join(`
`),i=s.indexOf(":"),o=Es(i<0?s:s.substr(0,i));this.rawHeaderLines.push({key:o.toLowerCase(),line:s});let a=r.join("");i=a.indexOf(":");let u=Es(i<0?a:a.substr(0,i)),l=i<0?"":Es(a.substr(i+1).replace(/[\r\n]+/g," "));this.headers.push({key:u.toLowerCase(),originalKey:u,value:l});const c=u.toLowerCase();if(pd.has(c)&&!t.has(c))switch(t.add(c),c){case"content-type":this.contentType={value:l,parsed:{}};break;case"content-transfer-encoding":this.contentTransferEncoding={value:l,parsed:{}};break;case"content-disposition":this.contentDisposition={value:l,parsed:{}};break;case"content-id":this.contentId=l;break;case"content-description":this.contentDescription=l;break}}this.contentType.parsed=this.parseStructuredHeader(this.contentType.value),this.contentType.multipart=/^multipart\//i.test(this.contentType.parsed.value)?this.contentType.parsed.value.substr(this.contentType.parsed.value.indexOf("/")+1):!1,this.contentType.multipart&&this.contentType.parsed.params.boundary&&this.postalMime.boundaries.push({value:_r.encode(this.contentType.parsed.params.boundary),node:this}),this.contentDisposition.parsed=this.parseStructuredHeader(this.contentDisposition.value),this.contentTransferEncoding.encoding=(this.stripComments(this.contentTransferEncoding.value).toLowerCase().match(/[\w-]+/)||[""])[0],this.setupContentDecoder(this.contentTransferEncoding.encoding)}feed(e){switch(this.state){case"header":if(!e.length)return this.state="body",this.processHeaders();if(this.postalMime.headerSize+=e.length,this.postalMime.headerSize>this.options.maxHeadersSize)throw new Error(`Maximum header size of ${this.options.maxHeadersSize} bytes exceeded`);this.headerLines.push(fd.decode(e));break;case"body":this.contentDecoder.update(e)}}}const fo={"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":`
`,"&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"	","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"};function md(n){return n.replace(/&(#\d+|#x[a-f0-9]+|[a-z]+\d*);?/gi,(e,t)=>{if(typeof fo[e]=="string")return fo[e];if(t.charAt(0)!=="#"||e.charAt(e.length-1)!==";")return e;let r;t.charAt(1)==="x"?r=parseInt(t.substr(2),16):r=parseInt(t.substr(1),10);let s="";return r>=55296&&r<=57343||r>1114111?"�":(r>65535&&(r-=65536,s+=String.fromCharCode(r>>>10&1023|55296),r=56320|r&1023),s+=String.fromCharCode(r),s)})}function Jt(n){return n.trim().replace(/[<>"'?&]/g,e=>{let t=e.charCodeAt(0).toString(16);return t.length<2&&(t="0"+t),"&#x"+t.toUpperCase()+";"})}function gd(n){return"<div>"+Jt(n).replace(/\n/g,"<br />")+"</div>"}const ja=/[\n\r\u2028\u2029]/g;function bd(n){return Math.max(n.lastIndexOf(`
`),n.lastIndexOf("\r"),n.lastIndexOf("\u2028"),n.lastIndexOf("\u2029"))}function Ds(n,e){let t=1/0,r=null;return s=>((s<t||r&&s>r.index)&&(e.lastIndex=s,r=e.exec(n),t=s),r)}function Cr(n,e,t){const r=n.lastIndexOf(">")+1;return n.slice(0,r).replace(e,t)+n.slice(r)}function po(n,e,t,r){const s=[];let i=0,o=0;for(;;){e.lastIndex=o;const a=e.exec(n);if(!a)break;const u=a.index;t.lastIndex=u;const l=t.exec(n);if(!l){const c=n.indexOf(">",u);if(c<0)break;o=c+1;continue}s.push(n.slice(i,u),r(...l)),i=o=u+l[0].length}return s.push(n.slice(i)),s.join("")}function mo(n,e,t,r,s,i){const o=Ds(n,/>/g),a=Ds(n,r),u=Ds(n,ja),l=[];let c=0,d=0;for(;;){e.lastIndex=d;const f=e.exec(n);if(!f)break;const g=f.index;d=g+1;let m=g+f[0].length;if(t){const k=o(m);if(!k)break;m=k.index+1}const b=a(m);if(!b)break;const v=u(m);if(v&&v.index<b.index)continue;let A=b.index+b[0].length;if(s){const k=o(A);if(!k)break;A=k.index+1}l.push(n.slice(c,g),i),c=d=A}return l.push(n.slice(c)),l.join("")}function Ts(n,e){const t=n.search(ja),r=Math.min(t<0?n.length:t,n.lastIndexOf(">"));let s=-1;e.lastIndex=0;let i;for(;(i=e.exec(n))&&i.index<r;)s=i.index;return s<0?n:n.slice(n.indexOf(">",s)+1)}function go(n,e){const t=bd(n);e.lastIndex=t<0?0:n.lastIndexOf(">",t)+1;const r=e.exec(n);return r&&r.index<n.lastIndexOf(">")?n.slice(0,r.index):n}function yd(n){return n=n.replace(/\r?\n/g,""),n=mo(n,/<!--/g,!1,/-->/g,!1," "),n=Cr(n,/<br\b[^>]*>/gi,`
`),n=Cr(n,/<\/?(p|div|table|tr|td|th)\b[^>]*>/gi,`

`),n=mo(n,/<script\b/gi,!0,/<\/script\b/gi,!0," "),n=Ts(n,/<body\b/gi),n=Ts(n,/<\/head\b/gi),n=Ts(n,/<!doctype\b/gi),n=go(n,/<\/body\b/gi),n=go(n,/<\/html\b/gi),n=po(n,/<a\b/gi,/<a\b[^>]*href\s*=\s*["']?([^\s"']+)[^>]*>/iy,(e,t)=>` (${t}) `),n=Cr(n,/<\/?(span|em|i|strong|b|u|a)\b[^>]*>/gi,""),n=po(n,/<li\b/gi,/<li\b[^>]*>[\n\u0001\s]*/iy,()=>"* "),n=Cr(n,/<hr\b[^>]*>/g,`
-------------
`),n=Cr(n,/<[^>]*>/g," "),n=n.replace(/\u0001/g,`
`).replace(/[ \t]+/g," ").replace(/^\s+$/gm,"").replace(/\n\n+/g,`

`).replace(/^\n+/,`
`).replace(/\n+$/,`
`),n=md(n),n}function za(n){if(typeof Intl>"u")return n;const e=new Date(n);return isNaN(e.getTime())?n:new Intl.DateTimeFormat("default",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}).format(e)}function wd(n){return[].concat(n.name||[]).concat(n.name?`<${n.address}>`:n.address).join(" ")}function _n(n){let e=[],t=(r,s)=>{if(s&&e.push(", "),r.group){let i=`${r.name}:`,o=";";e.push(i),r.group.forEach(t),e.push(o)}else e.push(wd(r))};return n.forEach(t),e.join("")}function vd(n){return`<a href="mailto:${Jt(n.address)}" class="postal-email-address">${Jt(n.name||`<${n.address}>`)}</a>`}function An(n){let e=[],t=(r,s)=>{if(s&&e.push('<span class="postal-email-address-separator">, </span>'),r.group){let i=`<span class="postal-email-address-group">${Jt(r.name)}:</span>`,o='<span class="postal-email-address-group">;</span>';e.push(i),r.group.forEach(t),e.push(o)}else e.push(vd(r))};return n.forEach(t),e.join(" ")}function xd(n,e,t){n=(n||"").toString(),e=e||76;let r=0,s=n.length,i="",o,a;for(;r<s;){if(o=n.substr(r,e),o.length<e){i+=o;break}if(a=o.match(/^[^\n\r]*(\r?\n|\r)/)){o=a[0],i+=o,r+=o.length;continue}else(a=o.match(/(\s+)[^\s]*$/))&&a[0].length-(a[1]||"").length<o.length?o=o.substr(0,o.length-(a[0].length-(a[1]||"").length)):(a=n.substr(r+o.length).match(/^[^\s]+(\s*)/))&&(o=o+a[0].substr(0,a[0].length-0));i+=o,r+=o.length,r<s&&(i+=`\r
`)}return i}function bo(n){let e=[];n.from&&e.push({key:"From",val:_n([n.from])}),n.subject&&e.push({key:"Subject",val:n.subject}),n.date&&e.push({key:"Date",val:za(n.date)}),n.to&&n.to.length&&e.push({key:"To",val:_n(n.to)}),n.cc&&n.cc.length&&e.push({key:"Cc",val:_n(n.cc)}),n.bcc&&n.bcc.length&&e.push({key:"Bcc",val:_n(n.bcc)});let t=e.map(o=>o.key.length).reduce((o,a)=>a>o?a:o,0);e=e.flatMap(o=>{let a=t-o.key.length,u=`${o.key}: ${" ".repeat(a)}`,l=`${" ".repeat(o.key.length+1)} ${" ".repeat(a)}`;return xd(o.val,80).split(/\r?\n/).map(d=>d.trim()).map((d,f)=>`${f?l:u}${d}`)});let r=e.map(o=>o.length).reduce((o,a)=>a>o?a:o,0),s="-".repeat(r);return`
${s}
${e.join(`
`)}
${s}
`}function yo(n){let e=[];return n.from&&e.push(`<div class="postal-email-header-key">From</div><div class="postal-email-header-value">${An([n.from])}</div>`),n.subject&&e.push(`<div class="postal-email-header-key">Subject</div><div class="postal-email-header-value postal-email-header-subject">${Jt(n.subject)}</div>`),n.date&&e.push(`<div class="postal-email-header-key">Date</div><div class="postal-email-header-value postal-email-header-date" data-date="${Jt(n.date)}">${Jt(za(n.date))}</div>`),n.to&&n.to.length&&e.push(`<div class="postal-email-header-key">To</div><div class="postal-email-header-value">${An(n.to)}</div>`),n.cc&&n.cc.length&&e.push(`<div class="postal-email-header-key">Cc</div><div class="postal-email-header-value">${An(n.cc)}</div>`),n.bcc&&n.bcc.length&&e.push(`<div class="postal-email-header-key">Bcc</div><div class="postal-email-header-value">${An(n.bcc)}</div>`),`<div class="postal-email-header">${e.length?'<div class="postal-email-header-row">':""}${e.join(`</div>
<div class="postal-email-header-row">`)}${e.length?"</div>":""}</div>`}const wo=/\w/,vo=/[^\s]+/g;function _d(n){vo.lastIndex=0;let e;for(;e=vo.exec(n);){const t=e[0],r=t.indexOf("@");let s=0;for(;s<r&&!wo.test(t.charAt(s));)s++;if(s>=r)continue;let i=t.length;for(;i>r+1&&!wo.test(t.charAt(i-1));)i--;if(!(i<=r+1))return{index:e.index+s,length:i-s,value:t.substring(s,i)}}return null}function Ad(n){let e=-1,t=-1;for(let r=0;r<n.length;r++){const s=n.charAt(r);if(s==="<")e=r+1,t=-1;else if(s===">"){if(t>=0&&t<r-1)return!0;e=-1,t=-1}else s==="@"&&e>=0&&t<0&&r>e&&(t=r)}return!1}function kd(n,e){let t=!1,r="text",s,i=[],o={address:[],comment:[],group:[],text:[],textWasQuoted:[]},a,u,l=!1;for(a=0,u=n.length;a<u;a++){let c=n[a],d=a?n[a-1]:null;if(c.type==="operator")switch(c.value){case"<":r="address",l=!1;break;case"(":r="comment",l=!1;break;case":":r="group",t=!0,l=!1;break;case'"':l=!l,r="text";break;default:r="text",l=!1;break}else c.value&&(r==="address"&&(c.value=c.value.replace(/^[^<]*<\s*/,"")),d&&d.noBreak&&o[r].length?(o[r][o[r].length-1]+=c.value,r==="text"&&l&&(o.textWasQuoted[o.textWasQuoted.length-1]=!0)):(o[r].push(c.value),r==="text"&&o.textWasQuoted.push(l)))}if(!o.text.length&&o.comment.length&&(o.text=o.comment,o.comment=[]),t){o.text=o.text.join(" ");let c=[];o.group.length&&Or(o.group.join(","),{_depth:e+1}).forEach(f=>{if(f.group)for(const g of f.group)c.push(g);else c.push(f)}),i.push({name:lr(o.text||s&&s.name),group:c})}else{if(!o.address.length&&o.text.length){for(a=o.text.length-1;a>=0;a--)if(!o.textWasQuoted[a]&&o.text[a].match(/^[^@\s]+@[^@\s]+$/)){o.address=o.text.splice(a,1),o.textWasQuoted.splice(a,1);break}if(!o.address.length){for(a=o.text.length-1;a>=0;a--)if(!o.textWasQuoted[a]){const c=_d(o.text[a]);if(c){o.address=[c.value],o.text[a]=(o.text[a].substring(0,c.index).trimEnd()+" "+o.text[a].substring(c.index+c.length).trimStart()).trim();break}o.text[a]=o.text[a].trim()}}}if(!o.text.length&&o.comment.length&&(o.text=o.comment,o.comment=[]),o.address.length>1&&(o.text=o.text.concat(o.address.splice(1))),o.text=o.text.join(" "),o.address=o.address.join(" "),!o.address&&id(o.text.trim())){const c=lr(o.text);if(Ad(c)){const d=Or(c);if(d&&d.length)return d}return[{address:"",name:c}]}s={address:o.address||o.text||"",name:lr(o.text||o.address||"")},s.address===s.name&&((s.address||"").match(/@/)?s.name="":s.address=""),i.push(s)}return i}class Ed{constructor(e){this.str=(e||"").toString(),this.operatorCurrent="",this.operatorExpecting="",this.node=null,this.escaped=!1,this.list=[],this.operators={'"':'"',"(":")","<":">",",":"",":":";",";":""}}tokenize(){let e=[];for(let t=0,r=this.str.length;t<r;t++){let s=this.str.charAt(t),i=t<r-1?this.str.charAt(t+1):null;this.checkChar(s,i)}return this.list.forEach(t=>{t.value=(t.value||"").toString().trim(),t.value&&e.push(t)}),e}checkChar(e,t){if(!this.escaped){if(e===this.operatorExpecting){this.node={type:"operator",value:e},t&&![" ","	","\r",`
`,",",";"].includes(t)&&(this.node.noBreak=!0),this.list.push(this.node),this.node=null,this.operatorExpecting="",this.escaped=!1;return}else if(!this.operatorExpecting&&e in this.operators){this.node={type:"operator",value:e},this.list.push(this.node),this.node=null,this.operatorExpecting=this.operators[e],this.escaped=!1;return}else if(this.operatorExpecting==='"'&&e==="\\"){this.escaped=!0;return}}this.node||(this.node={type:"text",value:""},this.list.push(this.node)),e===`
`&&(e=" "),(e.charCodeAt(0)>=33||[" ","	"].includes(e))&&(this.node.value+=e),this.escaped=!1}}const Dd=50;function Or(n,e){e=e||{};let t=e._depth||0;if(t>Dd)return[];let s=new Ed(n).tokenize(),i=[],o=[];const a=[];s.forEach(u=>{u.type==="operator"&&(u.value===","||u.value===";")?(o.length&&i.push(o),o=[]):o.push(u)}),o.length&&i.push(o);for(const u of i)for(const l of kd(u,t))a.push(l);if(e.flatten){let u=[],l=c=>{c.forEach(d=>{if(d.group)return l(d.group);u.push(d)})};return l(a),u}return a}function Td(n){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Uint8Array(n),s=r.byteLength,i=s%3,o=s-i,a,u,l,c,d,f=0;f<o;f=f+3)d=r[f]<<16|r[f+1]<<8|r[f+2],a=(d&16515072)>>18,u=(d&258048)>>12,l=(d&4032)>>6,c=d&63,e+=t[a]+t[u]+t[l]+t[c];return i==1?(d=r[o],a=(d&252)>>2,u=(d&3)<<4,e+=t[a]+t[u]+"=="):i==2&&(d=r[o]<<8|r[o+1],a=(d&64512)>>10,u=(d&1008)>>4,l=(d&15)<<2,e+=t[a]+t[u]+t[l]+"="),e}const Sd=256,Cd=2*1024*1024,Id=10;function Ss(n){return n.replace(/-(.)/g,(e,t)=>t.toUpperCase())}function Cs(n,e,t){if(n==null)return e;if(typeof n!="number"||!Number.isInteger(n)||n<0)throw new TypeError(`${t} must be a non-negative integer`);return n}class Wn{static async parse(e,t){return new Wn(t).parse(e)}constructor(e,t=0){this.options=e||{},this.mimeOptions={maxNestingDepth:Cs(this.options.maxNestingDepth,Sd,"maxNestingDepth"),maxHeadersSize:Cs(this.options.maxHeadersSize,Cd,"maxHeadersSize")},this.maxRfc822NestingDepth=Cs(this.options.maxRfc822NestingDepth,Id,"maxRfc822NestingDepth"),this.rfc822NestingDepth=t,this.root=this.currentNode=new ho({postalMime:this,...this.mimeOptions}),this.boundaries=[],this.headerSize=0,this.textContent={},this.attachments=[],this.attachmentEncoding=(this.options.attachmentEncoding||"").toString().replace(/[-_\s]/g,"").trim().toLowerCase()||"arraybuffer",this.started=!1}async finalize(){await this.root.finalize()}async processLine(e,t){let r=this.boundaries;if(r.length&&e.length>2&&e[0]===45&&e[1]===45)for(let s=r.length-1;s>=0;s--){let i=r[s];if(e.length<i.value.length+2)continue;let o=!0;for(let c=0;c<i.value.length;c++)if(e[c+2]!==i.value[c]){o=!1;break}if(!o)continue;let a=i.value.length+2,u=!1;e.length>=i.value.length+4&&e[i.value.length+2]===45&&e[i.value.length+3]===45&&(u=!0,a=i.value.length+4);let l=!0;for(let c=a;c<e.length;c++)if(e[c]!==32&&e[c]!==9){l=!1;break}if(l)return u?(await i.node.finalize(),this.currentNode=i.node.parentNode||this.root):(await i.node.finalizeChildNodes(),this.currentNode=new ho({postalMime:this,parentNode:i.node,parentMultipartType:i.node.contentType.multipart,...this.mimeOptions})),t?this.finalize():void 0}if(this.currentNode.feed(e),t)return this.finalize()}readLine(){let e=this.readPos,t=this.readPos;for(;this.readPos<this.av.length;){const r=this.av[this.readPos++];if(r!==13&&r!==10&&(t=this.readPos),r===10)return{bytes:new Uint8Array(this.buf,e,t-e),done:this.readPos>=this.av.length}}return{bytes:new Uint8Array(this.buf,e,t-e),done:this.readPos>=this.av.length}}async processNodeTree(){let e={},t=new Set,r=this.textMap=new Map,s=this.forceRfc822Attachments(),i=async(o,a,u)=>{var l,c,d,f,g;if(a=a||!1,u=u||!1,o.contentType.multipart)o.contentType.multipart==="alternative"?a=o:o.contentType.multipart==="related"&&(u=o);else{const m=this.isInlineMessageRfc822(o)&&!s,b=m&&this.rfc822NestingDepth>=this.maxRfc822NestingDepth;if(m&&!b){const v=new Wn({...this.mimeOptions,maxRfc822NestingDepth:this.maxRfc822NestingDepth,attachmentEncoding:"arraybuffer"},this.rfc822NestingDepth+1);o.subMessage=await v.parse(o.content),r.has(o)||r.set(o,{});let A=r.get(o);(o.subMessage.text||!o.subMessage.html)&&(A.plain=A.plain||[],A.plain.push({type:"subMessage",value:o.subMessage}),t.add("plain")),o.subMessage.html&&(A.html=A.html||[],A.html.push({type:"subMessage",value:o.subMessage}),t.add("html")),v.textMap&&v.textMap.forEach((k,T)=>{r.set(T,k)});for(let k of o.subMessage.attachments||[])this.attachments.push(k)}else if(this.isInlineTextNode(o)){let v=o.contentType.parsed.value.substr(o.contentType.parsed.value.indexOf("/")+1),A=a||o;r.has(A)||r.set(A,{});let k=r.get(A);k[v]=k[v]||[],k[v].push({type:"text",value:o.getTextContent()}),t.add(v)}else if(o.content){const v=((d=(c=(l=o.contentDisposition)==null?void 0:l.parsed)==null?void 0:c.params)==null?void 0:d.filename)||o.contentType.parsed.params.name||null,A={filename:v?lr(v):null,mimeType:o.contentType.parsed.value,disposition:((g=(f=o.contentDisposition)==null?void 0:f.parsed)==null?void 0:g.value)||null};switch(u&&o.contentId&&!b&&(A.related=!0),b&&(A.rfc822DepthExceeded=!0),o.contentDescription&&(A.description=lr(o.contentDescription)),o.contentId&&(A.contentId=o.contentId),o.contentType.parsed.value){case"text/calendar":case"application/ics":{o.contentType.parsed.params.method&&(A.method=o.contentType.parsed.params.method.toString().toUpperCase().trim());const k=o.getTextContent().replace(/\r?\n/g,`
`);let T=k.length;for(;T>0&&k.charCodeAt(T-1)===10;)T--;A.content=_r.encode(k.slice(0,T)+`
`);break}default:A.content=o.content}this.attachments.push(A)}}for(let m of o.childNodes)await i(m,a,u)};await i(this.root,!1,!1),r.forEach(o=>{t.forEach(a=>{if(e[a]||(e[a]=[]),o[a])o[a].forEach(u=>{switch(u.type){case"text":e[a].push(u.value);break;case"subMessage":switch(a){case"html":e[a].push(yo(u.value));break;case"plain":e[a].push(bo(u.value));break}break}});else{let u;switch(a){case"html":u="plain";break;case"plain":u="html";break}(o[u]||[]).forEach(l=>{switch(l.type){case"text":switch(a){case"html":e[a].push(gd(l.value));break;case"plain":e[a].push(yd(l.value));break}break;case"subMessage":switch(a){case"html":e[a].push(yo(l.value));break;case"plain":e[a].push(bo(l.value));break}break}})}})}),Object.keys(e).forEach(o=>{e[o]=e[o].join(`
`)}),this.textContent=e}isInlineTextNode(e){var t,r,s;if(((r=(t=e.contentDisposition)==null?void 0:t.parsed)==null?void 0:r.value)==="attachment")return!1;switch((s=e.contentType.parsed)==null?void 0:s.value){case"text/html":case"text/plain":return!0;case"text/calendar":case"text/csv":default:return!1}}isInlineMessageRfc822(e){var r,s,i;return((r=e.contentType.parsed)==null?void 0:r.value)!=="message/rfc822"?!1:(((i=(s=e.contentDisposition)==null?void 0:s.parsed)==null?void 0:i.value)||(this.options.rfc822Attachments?"attachment":"inline"))==="inline"}forceRfc822Attachments(){if(this.options.forceRfc822Attachments)return!0;let e=!1,t=r=>{r.contentType.multipart||r.contentType.parsed&&["message/delivery-status","message/feedback-report"].includes(r.contentType.parsed.value)&&(e=!0);for(let s of r.childNodes)t(s)};return t(this.root),e}async resolveStream(e){let t=0,r=[];const s=e.getReader();for(;;){const{done:a,value:u}=await s.read();if(a)break;r.push(u),t+=u.length}const i=new Uint8Array(t);let o=0;for(let a of r)i.set(a,o),o+=a.length;return i}async parse(e){var s,i;if(this.started)throw new Error("Can not reuse parser, create a new PostalMime object");for(this.started=!0,e&&typeof e.getReader=="function"&&(e=await this.resolveStream(e)),e=e||new ArrayBuffer(0),typeof e=="string"&&(e=_r.encode(e)),(e instanceof Blob||Object.prototype.toString.call(e)==="[object Blob]")&&(e=await ss(e)),ArrayBuffer.isView(e)&&(e=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)),this.buf=e,this.av=new Uint8Array(e),this.readPos=0;this.readPos<this.av.length;){const o=this.readLine();await this.processLine(o.bytes,o.done)}await this.processNodeTree();const t={headers:this.root.headers.map(o=>({key:o.key,originalKey:o.originalKey,value:o.value}))};for(const o of["from","sender"]){const a=this.root.headers.find(u=>u.key===o);if(a&&a.value){const u=Or(a.value);u&&u.length&&(t[o]=u[0])}}for(const o of["delivered-to","return-path"]){const a=this.root.headers.find(u=>u.key===o);if(a&&a.value){const u=Or(a.value);if(u&&u.length&&u[0].address){const l=Ss(o);t[l]=u[0].address}}}for(const o of["to","cc","bcc","reply-to"]){const a=[];for(const u of this.root.headers)if(u.key===o&&u.value)for(const l of Or(u.value))a.push(l);if(a.length){const u=Ss(o);t[u]=a}}for(const o of["subject","message-id","in-reply-to","references"]){const a=this.root.headers.find(u=>u.key===o);if(a&&a.value){const u=Ss(o);t[u]=lr(a.value)}}let r=this.root.headers.find(o=>o.key==="date");if(r){let o=new Date(r.value);o.toString()==="Invalid Date"?o=r.value:o=o.toISOString(),t.date=o}switch((s=this.textContent)!=null&&s.html&&(t.html=this.textContent.html),(i=this.textContent)!=null&&i.plain&&(t.text=this.textContent.plain),t.attachments=this.attachments,t.headerLines=(this.root.rawHeaderLines||[]).slice(),this.attachmentEncoding){case"arraybuffer":break;case"base64":for(let a of t.attachments||[])a!=null&&a.content&&(a.content=Td(a.content),a.encoding="base64");break;case"utf8":let o=new TextDecoder("utf8");for(let a of t.attachments||[])a!=null&&a.content&&(a.content=o.decode(a.content),a.encoding="utf8");break;default:throw new Error("Unknown attachment encoding")}return t}}const Ha={inbox:"objects",sent:"sent"},Ld="inbox",Rd=50,Pd=1e3,Bd=/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i,Md=/^([0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})--(.*)$/i,qd=/^\d{4}-\d{2}-\d{2}$/,Fd=24*60*60*1e3,Wa=n=>{if(n===void 0)return Ld;if(typeof n=="string"&&Object.prototype.hasOwnProperty.call(Ha,n))return n;throw new D(`Unknown folder: ${String(n)}`,"invalid_request")},Nd=n=>{if(n===void 0)return Rd;if(typeof n!="number"||!Number.isFinite(n)||n<1)throw new D("`limit` must be a positive number","invalid_request");return Math.min(Math.floor(n),Pd)},Ga=n=>`~/.mail/${Ha[n]}`,Va=(n,e)=>`${Ga(n)}/${e}`,Ud=n=>typeof n=="string"&&Bd.test(n),Xa=n=>qd.test(n),Ja=n=>new Date(parseInt(n.slice(0,8)+n.slice(9,13),16)),Od=n=>n.toISOString().slice(0,10),$d=n=>{const e=Ja(n);return[0,1,-1].map(t=>Od(new Date(e.getTime()+t*Fd)))},jd=n=>{if(!n)return"";try{const e=n.replace(/-/g,"+").replace(/_/g,"/"),t=e+"=".repeat((4-e.length%4)%4),r=atob(t),s=new Uint8Array(r.length);for(let i=0;i<r.length;i++)s[i]=r.charCodeAt(i);return new TextDecoder("utf-8").decode(s)}catch{return""}},zd=n=>{const e=Md.exec(n);return e?{id:e[1].toLowerCase(),subject:jd(e[2])}:null},Ka=(n,e)=>{if(n.is_dir)return null;const t=zd(n.name);return t?{id:t.id,subject:t.subject,date:Ja(t.id).toISOString(),size:Number(n.size??0),folder:e,path:n.path,uid:n.uid}:null},xo=({folder:n,day:e,fsCursor:t})=>{const r={v:1,f:n,d:e,...t?{c:t}:{}};return btoa(JSON.stringify(r))},_o=(n,e)=>{if(n==null)return;let t;try{t=JSON.parse(atob(String(n)))}catch{throw new D("Invalid cursor","invalid_request")}if(!t||t.v!==1||typeof t.d!="string"||!Xa(t.d))throw new D("Invalid cursor","invalid_request");if(t.f!==e)throw new D("Cursor does not match the requested folder","invalid_request");return{folder:e,day:t.d,...typeof t.c=="string"?{fsCursor:t.c}:{}}},vi=n=>{const e=n==null?void 0:n.code;return e==="subject_does_not_exist"||e==="not_found"},Hd=1e3;async function Wd(n,e){const t=`${e}--`;for(const r of $d(e)){const s=i=>this.puter.fs.readdir({path:Va(n,r),limit:Hd,...i});try{for await(const i of Je(s)){const o=i.items.find(a=>a.name.toLowerCase().startsWith(t));if(o)return Ka(o,n)}}catch(i){if(!vi(i))throw i}}return null}const Gd=n=>{let e;return n.content instanceof ArrayBuffer?e=n.content:typeof n.content=="string"?e=new TextEncoder().encode(n.content).buffer:e=n.content.buffer.slice(n.content.byteOffset,n.content.byteOffset+n.content.byteLength),{filename:n.filename,mimeType:n.mimeType,disposition:n.disposition,...n.contentId!==void 0?{contentId:n.contentId}:{},...n.related!==void 0?{related:n.related}:{},size:e.byteLength,content:e}},Vd=(n,e)=>{const t=e.date?new Date(e.date):null;return{...n,subject:e.subject??n.subject,date:t&&!Number.isNaN(t.getTime())?t.toISOString():n.date,messageId:e.messageId??null,inReplyTo:e.inReplyTo??null,references:e.references??null,from:e.from??null,to:e.to??[],cc:e.cc??[],bcc:e.bcc??[],replyTo:e.replyTo??[],headers:e.headers,text:e.text??null,html:e.html??null,attachments:e.attachments.map(Gd)}};async function Xd(n){const e=typeof n=="string"?{id:n}:n;if(e===null||typeof e!="object")throw new D("`id` is required","invalid_request");if(!Ud(e.id))throw new D("`id` must be a message id from a listing","invalid_request");const t=e.id.toLowerCase(),r=Wa(e.folder),s=await Wd.call(this,r,t);if(!s)throw new D("No such message","not_found");const i=await this.puter.fs.read(s.path);if(e.raw===!0)return i;const o=await Wn.parse(i);return Vd(s,o)}const Jd=1e3;async function Kd(n){const e=r=>this.puter.fs.readdir({path:Ga(n),limit:Jd,sortBy:"name",sortOrder:"desc",...r}),t=[];try{for await(const r of Je(e))for(const s of r.items)s.is_dir&&Xa(s.name)&&t.push(s.name)}catch(r){if(!vi(r))throw r}return t.sort().reverse()}async function Ao(n,e,t){const r=await Kd.call(this,n),s=[];let i=t?r.findIndex(a=>a<=t.day):0;if(i===-1)return{items:s};let o=t&&r[i]===t.day?t.fsCursor:void 0;for(;i<r.length&&s.length<e;){const a=r[i];for(;s.length<e;){let u;try{u=await this.puter.fs.readdir({path:Va(n,a),sortBy:"name",sortOrder:"desc",limit:e-s.length,cursor:o??null})}catch(l){if(!vi(l))throw l;u={items:[]}}for(const l of u.items){const c=Ka(l,n);c&&s.push(c)}if(o=u.cursor,!o)break}if(o)return{items:s,cursor:xo({folder:n,day:a,fsCursor:o})};i+=1}return i<r.length?{items:s,cursor:xo({folder:n,day:r[i]})}:{items:s}}function Yd(n={}){if(n===null||typeof n!="object"||Array.isArray(n))throw new D("`options` must be an object","invalid_request");if(n.offset!==void 0)throw new D("`offset` is not supported; pass `cursor` to resume from a position.","invalid_request");if(n.includeTotal!==void 0)throw new D("`includeTotal` is not supported for mailboxes.","invalid_request");const e=Wa(n.folder),t=Nd(n.limit),r=_o(n.cursor,e);return n.stream===!0?Je(s=>Ao.call(this,e,t,_o(s.cursor,e)),{cursor:n.cursor??null}):Ao.call(this,e,t,r)}const Zd=n=>(n.body!==void 0&&n.text===void 0&&n.html===void 0&&(n.text=n.body),delete n.body,n);class Qd extends Ne{constructor(t){super(t);p(this,"list",Yd);p(this,"get",Xd);p(this,"sendTransactional",B({iface:"puter-transactional-email",method:"sendTransactional",argNames:["to","subject","body"],preprocess:Zd,upgradePrompt:{method:"puter.email.sendTransactional",subscriptionMessage:"Sending email from an app requires a subscription."}}));p(this,"send",async t=>{const r=await G(`${this.APIOrigin}/email/send`,{method:"POST",includePuterAuth:!0,body:new Blob([await Yl(t)],{type:"message/rfc822"})}),s=await r.json();return r.ok||Er(s&&typeof s=="object"?{...s,status:r.status}:{status:r.status},{method:"puter.email.send",subscriptionMessage:"Sending email to addresses outside Puter requires a subscription."}),s});const r=this;for(const s of["list","get"])r[s]=r[s].bind(this)}}const eh=Qd,ot=Object.create(null);ot.open="0";ot.close="1";ot.ping="2";ot.pong="3";ot.message="4";ot.upgrade="5";ot.noop="6";const Pn=Object.create(null);Object.keys(ot).forEach(n=>{Pn[ot[n]]=n});const Hs={type:"error",data:"parser error"},Ya=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Za=typeof ArrayBuffer=="function",Qa=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,xi=({type:n,data:e},t,r)=>Ya&&e instanceof Blob?t?r(e):ko(e,r):Za&&(e instanceof ArrayBuffer||Qa(e))?t?r(e):ko(new Blob([e]),r):r(ot[n]+(e||"")),ko=(n,e)=>{const t=new FileReader;return t.onload=function(){const r=t.result.split(",")[1];e("b"+(r||""))},t.readAsDataURL(n)};function Eo(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let Is;function th(n,e){if(Ya&&n.data instanceof Blob)return n.data.arrayBuffer().then(Eo).then(e);if(Za&&(n.data instanceof ArrayBuffer||Qa(n.data)))return e(Eo(n.data));xi(n,!1,t=>{Is||(Is=new TextEncoder),e(Is.encode(t))})}const Do="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",qr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<Do.length;n++)qr[Do.charCodeAt(n)]=n;const rh=n=>{let e=n.length*.75,t=n.length,r,s=0,i,o,a,u;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);const l=new ArrayBuffer(e),c=new Uint8Array(l);for(r=0;r<t;r+=4)i=qr[n.charCodeAt(r)],o=qr[n.charCodeAt(r+1)],a=qr[n.charCodeAt(r+2)],u=qr[n.charCodeAt(r+3)],c[s++]=i<<2|o>>4,c[s++]=(o&15)<<4|a>>2,c[s++]=(a&3)<<6|u&63;return l},nh=typeof ArrayBuffer=="function",_i=(n,e)=>{if(typeof n!="string")return{type:"message",data:eu(n,e)};const t=n.charAt(0);return t==="b"?{type:"message",data:sh(n.substring(1),e)}:Pn[t]?n.length>1?{type:Pn[t],data:n.substring(1)}:{type:Pn[t]}:Hs},sh=(n,e)=>{if(nh){const t=rh(n);return eu(t,e)}else return{base64:!0,data:n}},eu=(n,e)=>{switch(e){case"blob":return n instanceof Blob?n:new Blob([n]);case"arraybuffer":default:return n instanceof ArrayBuffer?n:n.buffer}},tu="",ih=(n,e)=>{const t=n.length,r=new Array(t);let s=0;n.forEach((i,o)=>{xi(i,!1,a=>{r[o]=a,++s===t&&e(r.join(tu))})})},oh=(n,e)=>{const t=n.split(tu),r=[];for(let s=0;s<t.length;s++){const i=_i(t[s],e);if(r.push(i),i.type==="error")break}return r};function ah(){return new TransformStream({transform(n,e){th(n,t=>{const r=t.length;let s;if(r<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,r);else if(r<65536){s=new Uint8Array(3);const i=new DataView(s.buffer);i.setUint8(0,126),i.setUint16(1,r)}else{s=new Uint8Array(9);const i=new DataView(s.buffer);i.setUint8(0,127),i.setBigUint64(1,BigInt(r))}n.data&&typeof n.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(t)})}})}let Ls;function kn(n){return n.reduce((e,t)=>e+t.length,0)}function En(n,e){if(n[0].length===e)return n.shift();const t=new Uint8Array(e);let r=0;for(let s=0;s<e;s++)t[s]=n[0][r++],r===n[0].length&&(n.shift(),r=0);return n.length&&r<n[0].length&&(n[0]=n[0].slice(r)),t}function uh(n,e){Ls||(Ls=new TextDecoder);const t=[];let r=0,s=-1,i=!1;return new TransformStream({transform(o,a){for(t.push(o);;){if(r===0){if(kn(t)<1)break;const u=En(t,1);i=(u[0]&128)===128,s=u[0]&127,s<126?r=3:s===126?r=1:r=2}else if(r===1){if(kn(t)<2)break;const u=En(t,2);s=new DataView(u.buffer,u.byteOffset,u.length).getUint16(0),r=3}else if(r===2){if(kn(t)<8)break;const u=En(t,8),l=new DataView(u.buffer,u.byteOffset,u.length),c=l.getUint32(0);if(c>Math.pow(2,21)-1){a.enqueue(Hs);break}s=c*Math.pow(2,32)+l.getUint32(4),r=3}else{if(kn(t)<s)break;const u=En(t,s);a.enqueue(_i(i?u:Ls.decode(u),e)),r=0}if(s===0||s>n){a.enqueue(Hs);break}}}})}const ru=4;function ne(n){if(n)return ch(n)}function ch(n){for(var e in ne.prototype)n[e]=ne.prototype[e];return n}ne.prototype.on=ne.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};ne.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};ne.prototype.off=ne.prototype.removeListener=ne.prototype.removeAllListeners=ne.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var r,s=0;s<t.length;s++)if(r=t[s],r===e||r.fn===e){t.splice(s,1);break}return t.length===0&&delete this._callbacks["$"+n],this};ne.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(t){t=t.slice(0);for(var r=0,s=t.length;r<s;++r)t[r].apply(this,e)}return this};ne.prototype.emitReserved=ne.prototype.emit;ne.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};ne.prototype.hasListeners=function(n){return!!this.listeners(n).length};const is=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),We=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),lh="arraybuffer";function nu(n,...e){return e.reduce((t,r)=>(n.hasOwnProperty(r)&&(t[r]=n[r]),t),{})}const dh=We.setTimeout,hh=We.clearTimeout;function os(n,e){e.useNativeTimers?(n.setTimeoutFn=dh.bind(We),n.clearTimeoutFn=hh.bind(We)):(n.setTimeoutFn=We.setTimeout.bind(We),n.clearTimeoutFn=We.clearTimeout.bind(We))}const fh=1.33;function ph(n){return typeof n=="string"?mh(n):Math.ceil((n.byteLength||n.size)*fh)}function mh(n){let e=0,t=0;for(let r=0,s=n.length;r<s;r++)e=n.charCodeAt(r),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(r++,t+=4);return t}function su(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function gh(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function bh(n){let e={},t=n.split("&");for(let r=0,s=t.length;r<s;r++){let i=t[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}class yh extends Error{constructor(e,t,r){super(e),this.description=t,this.context=r,this.type="TransportError"}}class Ai extends ne{constructor(e){super(),this.writable=!1,os(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,r){return super.emitReserved("error",new yh(e,t,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=_i(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=gh(e);return t.length?"?"+t:""}}class wh extends Ai{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let r=0;this._polling&&(r++,this.once("pollComplete",function(){--r||t()})),this.writable||(r++,this.once("drain",function(){--r||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};oh(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,ih(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=su()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let iu=!1;try{iu=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const vh=iu;function xh(){}class _h extends wh{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let r=location.port;r||(r=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||r!==e.port}}doWrite(e,t){const r=this.request({method:"POST",data:e});r.on("success",t),r.on("error",(s,i)=>{this.onError("xhr post error",s,i)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,r)=>{this.onError("xhr poll error",t,r)}),this.pollXhr=e}}let dr=class Bn extends ne{constructor(e,t,r){super(),this.createRequest=e,os(this,r),this._opts=r,this._method=r.method||"GET",this._uri=t,this._data=r.data!==void 0?r.data:null,this._create()}_create(){var e;const t=nu(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const r=this._xhr=this.createRequest(t);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&r.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var s;r.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(r.getResponseHeader("set-cookie"))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status=="number"?r.status:0)},0))},r.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=Bn.requestsCount++,Bn.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=xh,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete Bn.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}};dr.requestsCount=0;dr.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",To);else if(typeof addEventListener=="function"){const n="onpagehide"in We?"pagehide":"unload";addEventListener(n,To,!1)}}function To(){for(let n in dr.requests)dr.requests.hasOwnProperty(n)&&dr.requests[n].abort()}const Ah=function(){const n=ou({xdomain:!1});return n&&n.responseType!==null}();class kh extends _h{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=Ah&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new dr(ou,this.uri(),e)}}function ou(n){const e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||vh))return new XMLHttpRequest}catch{}if(!e)try{return new We[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const au=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Eh extends Ai{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,r=au?{}:nu(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,r)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const r=e[t],s=t===e.length-1;xi(r,this.supportsBinary,i=>{try{this.doWrite(r,i)}catch{}s&&is(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=su()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const Rs=We.WebSocket||We.MozWebSocket;class Dh extends Eh{createSocket(e,t,r){return au?new Rs(e,t,r):t?new Rs(e,t):new Rs(e)}doWrite(e,t){this.ws.send(t)}}class Th extends Ai{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=uh(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=e.readable.pipeThrough(t).getReader(),s=ah();s.readable.pipeTo(e.writable),this._writer=s.writable.getWriter();const i=()=>{r.read().then(({done:a,value:u})=>{a||(this.onPacket(u),i())}).catch(a=>{})};i();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const r=e[t],s=t===e.length-1;this._writer.write(r).then(()=>{s&&is(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const Sh={websocket:Dh,webtransport:Th,polling:kh},Ch=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Ih=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Ws(n){if(n.length>8e3)throw"URI too long";const e=n,t=n.indexOf("["),r=n.indexOf("]");t!=-1&&r!=-1&&(n=n.substring(0,t)+n.substring(t,r).replace(/:/g,";")+n.substring(r,n.length));let s=Ch.exec(n||""),i={},o=14;for(;o--;)i[Ih[o]]=s[o]||"";return t!=-1&&r!=-1&&(i.source=e,i.host=i.host.substring(1,i.host.length-1).replace(/;/g,":"),i.authority=i.authority.replace("[","").replace("]","").replace(/;/g,":"),i.ipv6uri=!0),i.pathNames=Lh(i,i.path),i.queryKey=Rh(i,i.query),i}function Lh(n,e){const t=/\/{2,9}/g,r=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&r.splice(0,1),e.slice(-1)=="/"&&r.splice(r.length-1,1),r}function Rh(n,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,s,i){s&&(t[s]=i)}),t}const Gs=typeof addEventListener=="function"&&typeof removeEventListener=="function",Mn=[];Gs&&addEventListener("offline",()=>{Mn.forEach(n=>n())},!1);let uu=class sr extends ne{constructor(e,t={}){var r,s;if(super(),this.binaryType=lh,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const i=Ws(e);t.hostname=i.host,t.secure=i.protocol==="https"||i.protocol==="wss",t.port=i.port,i.query&&(t.query=i.query)}else t.host&&(t.hostname=Ws(t.host).host);if(os(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),t.transportImplementations&&t.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");t.transportImplementations||!((r=t.transports)===null||r===void 0)&&r.length&&typeof t.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((s=t.transportImplementations)!==null&&s!==void 0?s:t.transports).forEach(i=>{const o=i.prototype.name;this.transports.push(o),this._transportsByName[o]=i})):(this.transports=t.transports?[...t.transports]:["polling","websocket","webtransport"],this._transportsByName=Sh),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=bh(this.opts.query)),Gs&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Mn.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=ru,t.transport=e,this.id&&(t.sid=this.id);const r=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](r)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&sr.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}_probe(e){let t=this.createTransport(e),r=!1;sr.priorWebsocketSuccess=!1;const s=()=>{r||(t.send([{type:"ping",data:"probe"}]),t.once("packet",d=>{if(!r)if(d.type==="pong"&&d.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;sr.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(c(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const f=new Error("probe error");f.transport=t.name,this.emitReserved("upgradeError",f)}}))};function i(){r||(r=!0,c(),t.close(),t=null)}const o=d=>{const f=new Error("probe error: "+d);f.transport=t.name,i(),this.emitReserved("upgradeError",f)};function a(){o("transport closed")}function u(){o("socket closed")}function l(d){t&&d.name!==t.name&&i()}const c=()=>{t.removeListener("open",s),t.removeListener("error",o),t.removeListener("close",a),this.off("close",u),this.off("upgrading",l)};t.once("open",s),t.once("error",o),t.once("close",a),this.once("close",u),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{r||t.open()},200):t.open()}onOpen(){if(this.readyState="open",sr.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._upgrades=this._filterUpgrades(e.upgrades),this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let r=0;r<this.writeBuffer.length;r++){const s=this.writeBuffer[r].data;if(s&&(t+=ph(s)),r>0&&t>this._maxPayload)return this.writeBuffer.slice(0,r);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,is(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,r){return this._sendPacket("message",e,t,r),this}send(e,t,r){return this._sendPacket("message",e,t,r),this}_sendPacket(e,t,r,s){if(typeof t=="function"&&(s=t,t=void 0),typeof r=="function"&&(s=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const i={type:e,data:t,options:r};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},r=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():e()}):this.upgrading?r():e()),this}_onError(e){if(sr.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Gs&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const r=Mn.indexOf(this._offlineEventListener);r!==-1&&Mn.splice(r,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(e){const t=[];for(let r=0;r<e.length;r++)~this.transports.indexOf(e[r])&&t.push(e[r]);return t}};uu.protocol=ru;function Ph(n,e="",t){let r=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),r=Ws(n)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const i=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+e,r.href=r.protocol+"://"+i+(t&&t.port===r.port?"":":"+r.port),r}const Bh=typeof ArrayBuffer=="function",Mh=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,cu=Object.prototype.toString,qh=typeof Blob=="function"||typeof Blob<"u"&&cu.call(Blob)==="[object BlobConstructor]",Fh=typeof File=="function"||typeof File<"u"&&cu.call(File)==="[object FileConstructor]";function ki(n){return Bh&&(n instanceof ArrayBuffer||Mh(n))||qh&&n instanceof Blob||Fh&&n instanceof File}function qn(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,r=n.length;t<r;t++)if(qn(n[t]))return!0;return!1}if(ki(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return qn(n.toJSON(),!0);for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&qn(n[t]))return!0;return!1}function Nh(n){const e=[],t=n.data,r=n;return r.data=Fn(t,e),r.attachments=e.length,{packet:r,buffers:e}}function Fn(n,e,t){if(!n)return n;if(ki(n)){const r={_placeholder:!0,num:e.length};return e.push(n),r}else if(Array.isArray(n)){const r=new Array(n.length);for(let s=0;s<n.length;s++)r[s]=Fn(n[s],e);return r}else if(typeof n=="object"&&!(n instanceof Date)){if(n.toJSON&&typeof n.toJSON=="function"&&!t)return Fn(n.toJSON(),e,!0);const r={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(r[s]=Fn(n[s],e));return r}return n}function Uh(n,e){return n.data=Vs(n.data,e),delete n.attachments,n}function Vs(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=Vs(n[t],e);else if(typeof n=="object")for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=Vs(n[t],e));return n}const Oh=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var F;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(F||(F={}));class $h{constructor(e){this.replacer=e}encode(e){return(e.type===F.EVENT||e.type===F.ACK)&&qn(e)?this.encodeAsBinary({type:e.type===F.EVENT?F.BINARY_EVENT:F.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===F.BINARY_EVENT||e.type===F.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=Nh(e),r=this.encodeAsString(t.packet),s=t.buffers;return s.unshift(r),s}}class Ei extends ne{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const r=t.type===F.BINARY_EVENT;r||t.type===F.BINARY_ACK?(t.type=r?F.EVENT:F.ACK,this.reconstructor=new jh(t)):super.emitReserved("decoded",t)}else if(ki(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const r={type:Number(e.charAt(0))};if(F[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===F.BINARY_EVENT||r.type===F.BINARY_ACK){const i=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(i,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const a=Number(o);if(!zh(a)||a<1)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");r.attachments=a}if(e.charAt(t+1)==="/"){const i=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););r.nsp=e.substring(i,t)}else r.nsp="/";const s=e.charAt(t+1);if(s!==""&&Number(s)==s){const i=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}r.id=Number(e.substring(i,t+1))}if(e.charAt(++t)){const i=this.tryParse(e.substr(t));if(Ei.isPayloadValid(r.type,i))r.data=i;else throw new Error("invalid payload")}return r}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case F.CONNECT:return So(t);case F.DISCONNECT:return t===void 0;case F.CONNECT_ERROR:return typeof t=="string"||So(t);case F.EVENT:case F.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&Oh.indexOf(t[0])===-1);case F.ACK:case F.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class jh{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Uh(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const zh=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function So(n){return Object.prototype.toString.call(n)==="[object Object]"}const Hh=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ei,Encoder:$h,get PacketType(){return F}},Symbol.toStringTag,{value:"Module"}));function Xe(n,e,t){return n.on(e,t),function(){n.off(e,t)}}const Wh=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class lu extends ne{constructor(e,t,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[Xe(e,"open",this.onopen.bind(this)),Xe(e,"packet",this.onpacket.bind(this)),Xe(e,"error",this.onerror.bind(this)),Xe(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var r,s,i;if(Wh.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const o={type:F.EVENT,data:t};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const c=this.ids++,d=t.pop();this._registerAckCallback(c,d),o.id=c}const a=(s=(r=this.io.engine)===null||r===void 0?void 0:r.transport)===null||s===void 0?void 0:s.writable,u=this.connected&&!(!((i=this.io.engine)===null||i===void 0)&&i._hasPingExpired());return this.flags.volatile&&!a||(u?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(e,t){var r;const s=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(s===void 0){this.acks[e]=t;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===e&&this.sendBuffer.splice(a,1);t.call(this,new Error("operation has timed out"))},s),o=(...a)=>{this.io.clearTimeoutFn(i),t.apply(this,a)};o.withError=!0,this.acks[e]=o}emitWithAck(e,...t){return new Promise((r,s)=>{const i=(o,a)=>o?s(o):r(a);i.withError=!0,t.push(i),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...i)=>(this._queue[0],s!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(s)):(this._queue.shift(),t&&t(null,...i)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:F.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(r=>String(r.id)===e)){const r=this.acks[e];delete this.acks[e],r.withError&&r.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case F.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case F.EVENT:case F.BINARY_EVENT:this.onevent(e);break;case F.ACK:case F.BINARY_ACK:this.onack(e);break;case F.DISCONNECT:this.ondisconnect();break;case F.CONNECT_ERROR:this.destroy();const r=new Error(e.data.message);r.data=e.data.data,this.emitReserved("connect_error",r);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const r of t)r.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let r=!1;return function(...s){r||(r=!0,t.packet({type:F.ACK,id:e,data:s}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:F.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let r=0;r<t.length;r++)if(e===t[r])return t.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let r=0;r<t.length;r++)if(e===t[r])return t.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const r of t)r.apply(this,e.data)}}}function Dr(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}Dr.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=Math.floor(e*10)&1?n+t:n-t}return Math.min(n,this.max)|0};Dr.prototype.reset=function(){this.attempts=0};Dr.prototype.setMin=function(n){this.ms=n};Dr.prototype.setMax=function(n){this.max=n};Dr.prototype.setJitter=function(n){this.jitter=n};class Xs extends ne{constructor(e,t){var r;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,os(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((r=t.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new Dr({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const s=t.parser||Hh;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new uu(this.uri,this.opts);const t=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const s=Xe(t,"open",function(){r.onopen(),e&&e()}),i=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),e?e(a):this.maybeReconnectOnOpen()},o=Xe(t,"error",i);if(this._timeout!==!1){const a=this._timeout,u=this.setTimeoutFn(()=>{s(),i(new Error("timeout")),t.close()},a);this.opts.autoUnref&&u.unref(),this.subs.push(()=>{this.clearTimeoutFn(u)})}return this.subs.push(s),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(Xe(e,"ping",this.onping.bind(this)),Xe(e,"data",this.ondata.bind(this)),Xe(e,"error",this.onerror.bind(this)),Xe(e,"close",this.onclose.bind(this)),Xe(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){is(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let r=this.nsps[e];return r?this._autoConnect&&!r.active&&r.connect():(r=new lu(this,e,t),this.nsps[e]=r),r}_destroy(e){const t=Object.keys(this.nsps);for(const r of t)if(this.nsps[r].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let r=0;r<t.length;r++)this.engine.write(t[r],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var r;this.cleanup(),(r=this.engine)===null||r===void 0||r.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},t);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Ir={};function $r(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};const t=Ph(n,e.path||"/socket.io"),r=t.source,s=t.id,i=t.path,o=Ir[s]&&i in Ir[s].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let u;return a?u=new Xs(r,e):(Ir[s]||(Ir[s]=new Xs(r,e)),u=Ir[s]),t.query&&!e.query&&(e.query=t.queryKey),u.socket(t.path,e)}Object.assign($r,{Manager:Xs,Socket:lu,io:$r,connect:$r});const Js=n=>{if(n.env!=="nodejs")return!1;const e=globalThis.WebSocket;if(typeof e!="function")return!1;const t=e.prototype??{};return typeof t.on=="function"&&typeof t.removeListener=="function"};class Gh{constructor(e,t,r,s={}){p(this,"subject");p(this,"subId",null);p(this,"anchor",null);p(this,"match",null);p(this,"op",null);p(this,"includeValue",!1);this.channel=e,this.subject=t,this.includeValue=s.includeValue===!0,this.handler=r,this.onError=s.onError,this.timeout=s.timeout,this.pending=!1,this.off=this.off.bind(this)}async off(){await this.channel.remove(this)}deliver(e,t){try{const r=this.handler(t===void 0?{event:e}:{event:e,ctx:Object.freeze(t)});r instanceof Promise&&r.catch(Co)}catch(r){Co(r)}}apply(e){this.subId=e.subId,this.anchor=e.anchor??null,this.match=e.match??null,this.op=e.op??null}}const Co=n=>{console.error("[puter.events] subscription handler failed",n)},Io=n=>({subject:n.subject,...n.includeValue?{includeValue:!0}:{}}),Lo="events.subscribe",Ro="events.unsubscribe",Vh="events.ack",Xh="events.delivery",Jh="events.ended",Kh=n=>({id:Pa(),subject:n.subject,op:"gap",reason:"reconnect",ts:Date.now()}),du=3e4,Yh=1e4,Zh=1e3,Qh=3e4,ef=6,tf=6e4,Nn=n=>new D(n,"events_connection_failed"),rf=n=>{const e=n&&typeof n=="object"?n.error:void 0;return new D(typeof(e==null?void 0:e.message)=="string"?e.message:"The events request failed",typeof(e==null?void 0:e.code)=="string"?e.code:"events_failed")},nf=n=>new D(typeof(n==null?void 0:n.message)=="string"?n.message:"The subscription was ended by the server",typeof(n==null?void 0:n.code)=="string"?n.code:"subscription_ended",typeof(n==null?void 0:n.reason)=="string"?{reason:n.reason}:{}),Po=n=>{const e=n==null?void 0:n.sub;if(!e||typeof e.subId!="string")throw new D("The events server sent an unexpected answer","events_failed");return e},sf=n=>{const e=n&&typeof n=="object"?n.data:void 0,t=n instanceof Error?n.message:"Could not connect to the events server";return typeof(e==null?void 0:e.code)=="string"?new D(t,e.code):Nn(t)},Bo=(n,e,t)=>{if(!n){console.warn(`[puter.events] ${t}`,e);return}try{n(e)}catch(r){console.error("[puter.events] onError handler failed",r)}};class of{constructor(e){this.module=e,this.socket=null,this.subscriptions=new Set,this.byId=new Map,this.durable=new Map,this.waiters=new Set,this.inflight=0,this.generation=0,this.retryTimer=null,this.reconnectTimer=null,this.reconnectAttempts=0,this.connectedAt=0}async subscribe(e,t,r){const s=new Gh(this,e,t,r);this.inflight++;try{const i=await this.request(Lo,Io(s),Dn(s));return s.apply(Po(i)),this.subscriptions.add(s),this.byId.set(s.subId,s),s}finally{this.inflight--,this.closeIfIdle()}}async remove(e){var s;if(!this.subscriptions.has(e))return;this.forget(e);const t=this.generation,r=e.subId;e.subId=null;try{r!==null&&((s=this.socket)!=null&&s.connected)&&await this.request(Ro,{subId:r},Dn(e))}catch(i){const o=D.from(i);this.generation===t&&o.code!=="subscription_does_not_exist"&&console.warn(`[puter.events] could not end the subscription to ${e.subject} on the server`,o)}finally{this.closeIfIdle()}}registerDurable(e,t,r,s){this.durable.set(e,{subId:e,handler:t,ctx:Object.freeze({...r??{}}),onError:typeof s=="function"?s:void 0}),this.connect()}deregisterDurable(e){this.durable.delete(e)&&this.closeIfIdle()}reset(){this.reconnectAttempts=0,this.connectedAt=0,this.close(),(this.subscriptions.size>0||this.durable.size>0)&&this.connect()}connect(){if(this.socket)return this.socket;this.reconnectTimer&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null);const e=$r(this.module.APIOrigin,{auth:{auth_token:this.module.authToken},autoUnref:Js(this.module.puter),transports:["websocket","polling"],withCredentials:!0});return e.on("connect",()=>{this.connectedAt=Date.now();for(const t of this.durable.values())t.lapseReported=!1;this.resubscribe()}),e.on("disconnect",()=>{if(e.active){this.orphan();return}this.reconnectLater()}),e.on("connect_error",t=>{if(e.active)return;const r=sf(t);if(this.reconnectAttempts>0&&r.code!=="reauth_required"){this.reconnectLater();return}this.fail(r)}),e.on(Xh,t=>this.route(t)),e.on(Jh,t=>this.ended(t)),this.socket=e,e}request(e,t,r){const s=this.connect();return new Promise((i,o)=>{var c;let a=!1;const u=d=>{a||(a=!0,clearTimeout(l),this.waiters.delete(u),o(d))},l=setTimeout(()=>u(Nn(`Timed out waiting for \`${e}\``)),r);(c=l==null?void 0:l.unref)==null||c.call(l),this.waiters.add(u),s.emit(e,t,d=>{if(!a){if(a=!0,clearTimeout(l),this.waiters.delete(u),!d||d.ok!==!0){o(rf(d));return}i(d)}})})}orphan(){this.generation++;for(const e of this.subscriptions)e.subId!==null&&this.byId.delete(e.subId),e.subId=null,e.pending=!1;this.rejectWaiters(Nn("The events connection dropped"))}reconnectLater(){var s,i;if(this.close(),this.subscriptions.size===0&&this.durable.size===0)return;const e=this.connectedAt>0&&Date.now()-this.connectedAt>=tf;if(this.connectedAt=0,e&&(this.reconnectAttempts=0),this.reconnectAttempts>=ef){this.fail(Nn("The events server kept closing the connection"));return}const t=Math.min(Qh,Zh*2**this.reconnectAttempts++),r=t/2+Math.random()*(t/2);this.reconnectTimer=setTimeout(()=>{this.reconnectTimer=null,(this.subscriptions.size>0||this.durable.size>0)&&this.connect()},r),Js(this.module.puter)&&((i=(s=this.reconnectTimer)==null?void 0:s.unref)==null||i.call(s))}resubscribe(){const e=this.generation;for(const t of[...this.subscriptions])t.subId!==null||t.pending||(t.pending=!0,this.request(Lo,Io(t),Dn(t)).then(r=>{t.pending=!1;const s=Po(r);if(!this.subscriptions.has(t)){this.dropOnServer(s.subId,Dn(t));return}t.apply(s),this.byId.set(t.subId,t),t.deliver(Kh(t))}).catch(r=>{if(t.pending=!1,!this.subscriptions.has(t)||this.generation!==e)return;const s=D.from(r);if(s.code==="too_many_requests"){this.retryResubscribe(e);return}this.lapse(t,s)}))}retryResubscribe(e){var t,r;this.retryTimer||(this.retryTimer=setTimeout(()=>{var s;this.retryTimer=null,!(this.generation!==e||!((s=this.socket)!=null&&s.connected))&&this.resubscribe()},Yh),(r=(t=this.retryTimer)==null?void 0:t.unref)==null||r.call(t))}route(e){if(!e||typeof e!="object"||!e.event)return;const t=e.subId,r=this.byId.get(t);if(r){r.deliver(e.event,e.ctx);return}const s=this.durable.get(t);s&&this.runDurable(s,e)}ended(e){const t=typeof(e==null?void 0:e.subId)=="string"?this.byId.get(e.subId):void 0;t&&this.lapse(t,nf(e))}runDurable(e,t){var u;if(t.skipHandler===!0&&!t.ackRequired)return;const r=t.event,{puter:s}=this.module,i={event:r,ctx:e.ctx,user:s,fetch:((u=s==null?void 0:s.net)==null?void 0:u.fetch)??globalThis.fetch};if(!t.ackRequired||typeof t.ackId!="string"){Mo(()=>e.handler(i));return}let o=!1;const a=()=>o?Promise.resolve():(o=!0,this.ack(e.subId,t.ackId,t.origin));Mo(()=>e.handler({...i,ack:a}),()=>a())}async ack(e,t,r){try{await this.request(Vh,{subId:e,id:t,...r?{origin:r}:{}},du)}catch(s){console.warn("[puter.events] could not acknowledge a delivery",s)}}fail(e){const t=[...this.subscriptions];this.reconnectAttempts=0,this.connectedAt=0,this.rejectWaiters(e),this.close();for(const r of t)this.lapse(r,e);for(const r of this.durable.values())r.lapseReported||(r.lapseReported=!0,Bo(r.onError,e,`stopped running the handler for ${r.subId} here`))}lapse(e,t){this.forget(e),e.subId=null,Bo(e.onError,t,`subscription to ${e.subject} lapsed`),this.closeIfIdle()}forget(e){this.subscriptions.delete(e),e.subId!==null&&this.byId.delete(e.subId)}rejectWaiters(e){for(const t of[...this.waiters])t(e);this.waiters.clear()}dropOnServer(e,t){var r;(r=this.socket)!=null&&r.connected&&this.request(Ro,{subId:e},t).catch(()=>{})}closeIfIdle(){this.subscriptions.size>0||this.inflight>0||this.durable.size>0||this.close()}close(){this.retryTimer&&clearTimeout(this.retryTimer),this.retryTimer=null,this.reconnectTimer&&clearTimeout(this.reconnectTimer),this.reconnectTimer=null;const e=this.socket;e&&(this.socket=null,this.orphan(),e.removeAllListeners(),e.disconnect())}}const Dn=n=>typeof n.timeout=="number"&&n.timeout>0?n.timeout:du,Mo=(n,e)=>{try{const t=n();if(t instanceof Promise){t.then(()=>e==null?void 0:e(),r=>console.error("[puter.events] subscription handler failed",r));return}e==null||e()}catch(t){console.error("[puter.events] subscription handler failed",t)}},hu=n=>!n.authToken&&n.env==="web",fu=async n=>{try{await n.ui.authenticateWithPuter()}catch{throw new D("Authentication canceled","auth_canceled")}},af=n=>new D(`The events request failed (HTTP ${n})`,"events_failed");async function pt(n,e,t,r){var l;hu(n)&&await fu(n);const s=new URLSearchParams;for(const[c,d]of Object.entries(r??{}))d!=null&&s.set(c,String(d));const i=s.toString(),o=await G(`${n.APIOrigin}${e}${i?`?${i}`:""}`,{method:t?"POST":"GET",includePuterAuth:!0,headers:{"Content-Type":"application/json"},...t?{body:JSON.stringify(t)}:{}}),u=((l=o.headers.get("content-type"))==null?void 0:l.includes("application/json"))?await o.json():null;if(o.status!==200){if(!u)throw af(o.status);const{message:c,error:d,code:f,...g}=u;throw new D(typeof c=="string"?c:typeof d=="string"?d:`The events request failed (HTTP ${o.status})`,typeof f=="string"?f:"events_failed",g)}return u??{}}const uf=/\s/,cf=/[A-Za-z_$\u00A0-\uFFFF]/,qo=/[A-Za-z0-9_$\u00A0-\uFFFF]/,Fo=/[0-9]/,lf=/^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:[0-9][0-9_]*)?\.?[0-9][0-9_]*(?:[eE][+-]?[0-9]+)?|[0-9][0-9_]*\.)n?/,df=[">>>=","...","===","!==","**=","<<=",">>=",">>>","&&=","||=","??=","=>","==","!=","<=",">=","&&","||","??","?.","++","--","+=","-=","*=","/=","%=","&=","|=","^=","**","<<",">>"],hf=new Set(["return","typeof","instanceof","in","of","new","delete","void","case","do","else","yield","await","throw"]),ff=new Set([")","]","++","--"]),pf=n=>{const e=[],t=[];let r=!1,s=0;const i=(c,d)=>e.push({type:c,value:d}),o=()=>e[e.length-1],a=()=>{const c=o();return c?c.type==="num"?!1:c.type==="name"?hf.has(c.value):!ff.has(c.value):!0},u=c=>{for(s++;s<n.length;){if(n[s]==="\\"){s+=2;continue}if(n[s]===c){s++;return}s++}},l=()=>{s++;let c=!1;for(;s<n.length;){const d=n[s];if(d==="\\"){s+=2;continue}if(d===`
`)return;if(d==="[")c=!0;else if(d==="]")c=!1;else if(d==="/"&&!c){for(s++;s<n.length&&qo.test(n[s]);)s++;return}s++}};for(;s<n.length;){const c=n[s];if(r){if(c==="\\"){s+=2;continue}if(c==="`"){r=!1,s++;continue}if(c==="$"&&n[s+1]==="{"){t.push("template"),r=!1,s+=2;continue}s++;continue}if(uf.test(c)){s++;continue}if(c==="/"&&n[s+1]==="/"){for(;s<n.length&&n[s]!==`
`;)s++;continue}if(c==="/"&&n[s+1]==="*"){const f=n.indexOf("*/",s+2);s=f===-1?n.length:f+2;continue}if(c==="/"&&a()){l();continue}if(c==='"'||c==="'"){u(c);continue}if(c==="`"){r=!0,s++;continue}if(c==="{"){t.push("brace"),i("punct","{"),s++;continue}if(c==="}"){if(t.pop()==="template"){r=!0,s++;continue}i("punct","}"),s++;continue}if(Fo.test(c)||c==="."&&Fo.test(n[s+1]??"")){const f=lf.exec(n.slice(s)),g=f?f[0]:c;i("num",g),s+=g.length;continue}if(cf.test(c)){let f=s+1;for(;f<n.length&&qo.test(n[f]);)f++;i("name",n.slice(s,f)),s=f;continue}const d=df.find(f=>n.startsWith(f,s));if(d){i("punct",d),s+=d.length;continue}i("punct",c),s++}return e},jr=new Set(["await","break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","import","in","instanceof","let","new","null","return","super","switch","this","throw","true","try","typeof","var","void","while","with","yield","async","as","from","get","set","of","static","accessor"]),mf=new Set(["var","let","const"]),gf=new Set(["globalThis","undefined","NaN","Infinity","arguments","Object","Array","String","Number","Boolean","Symbol","BigInt","Math","JSON","Date","RegExp","Function","Promise","Proxy","Reflect","Map","Set","WeakMap","WeakSet","WeakRef","FinalizationRegistry","Error","TypeError","RangeError","SyntaxError","ReferenceError","EvalError","URIError","AggregateError","Intl","ArrayBuffer","SharedArrayBuffer","DataView","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","parseInt","parseFloat","isNaN","isFinite","encodeURI","encodeURIComponent","decodeURI","decodeURIComponent","structuredClone","queueMicrotask","atob","btoa","console","fetch","Request","Response","Headers","FormData","Blob","File","URL","URLSearchParams","AbortController","AbortSignal","TextEncoder","TextDecoder","ReadableStream","WritableStream","TransformStream","CompressionStream","DecompressionStream","crypto","Crypto","SubtleCrypto","performance","WebSocket","Event","EventTarget","CustomEvent","MessageChannel","MessagePort","setTimeout","clearTimeout","setInterval","clearInterval"]),bf=new Set(["puter","me","my","myself"]),yf=n=>new D(bf.has(n)?`Handler refers to \`${n}\`, and a handler has no ambient SDK: it runs as whoever the delivery belongs to. Use the \`user\` binding.`:`Handler refers to \`${n}\`, which is not a parameter, a local, or a known global. A handler is serialized and run elsewhere, so it cannot close over anything — pass the value in \`context\` and read it from \`ctx\`.`,"events_handler_free_variable"),mt=n=>(n==null?void 0:n.type)==="name",ge=(n,e)=>(n==null?void 0:n.type)==="punct"&&n.value===e,Ar={"(":")","[":"]","{":"}"},kr=new Set([")","]","}"]),Gn=(n,e)=>{const t=[];for(let r=e;r<n.length;r++){const s=n[r];if(s.type==="punct"){if(Ar[s.value]){t.push(Ar[s.value]);continue}if(kr.has(s.value)){if(t.pop()!==s.value)return-1;if(t.length===0)return r}}}return-1},zr=(n,e,t,r)=>{let s=0,i=!1,o=-1;for(let a=e;a<t;a++){const u=n[a];if(u.type==="punct"){Ar[u.value]?s++:kr.has(u.value)?s--:u.value==="="&&!i?(i=!0,o=s):u.value===","&&i&&s===o&&(i=!1);continue}i||!mt(u)||jr.has(u.value)||ge(n[a-1],".")||r.add(u.value)}},wf=(n,e)=>{let t=0,r=e;for(;r<n.length;r++){const s=n[r];if(s.type==="punct"){if(Ar[s.value]){t++;continue}if(kr.has(s.value)){if(t===0)return r;t--;continue}if(t===0&&(s.value==="="||s.value===","||s.value===";"))return r;continue}if(mt(s)&&t===0&&(s.value==="of"||s.value==="in"))return r}return r},vf=(n,e,t)=>{let r=e;for(;;){const s=wf(n,r);if(zr(n,r,s,t),r=s,r>=n.length)return r;const i=n[r];if(mt(i)||kr.has(i.value)||i.value===";")return r;if(i.value===","){r++;continue}r++;const o=r;let a=0;for(;r<n.length;r++){const u=n[r];if(u.type==="punct"){if(Ar[u.value]){a++;continue}if(kr.has(u.value)){if(a===0)break;a--;continue}if(a===0&&(u.value===","||u.value===";"))break}}if(pu(n,o,r,t),r>=n.length||n[r].value!==",")return r;r++}},pu=(n,e,t,r)=>{for(let s=e;s<t;s++){const i=n[s];if(ge(i,"=>")){const o=n[s-1];if(ge(o,")")){let a=0;for(let u=s-1;u>=e;u--){const l=n[u];if(l.type==="punct"){if(kr.has(l.value))a++;else if(Ar[l.value]&&(a--,a===0)){zr(n,u+1,s-1,r);break}}}}else mt(o)&&!jr.has(o.value)&&r.add(o.value);continue}if(mt(i)){if(mf.has(i.value)){s=vf(n,s+1,r)-1;continue}if(i.value==="function"||i.value==="class"){const o=n[s+1],a=ge(o,"*")?s+2:s+1;mt(n[a])&&!jr.has(n[a].value)&&r.add(n[a].value);continue}if(i.value==="catch"&&ge(n[s+1],"(")){const o=Gn(n,s+1);o!==-1&&zr(n,s+2,o,r);continue}if(!jr.has(i.value)&&ge(n[s+1],"(")){const o=Gn(n,s+1);o!==-1&&ge(n[o+1],"{")&&(r.add(i.value),zr(n,s+2,o,r));continue}}}},xf=n=>{const e=new Set;pu(n,0,n.length,e);for(let t=0;t<n.length;t++){if(!mt(n[t])||n[t].value!=="function")continue;let r=t+1;for(;r<n.length&&!ge(n[r],"(")&&!ge(n[r],"{");)r++;if(!ge(n[r],"("))continue;const s=Gn(n,r);s!==-1&&zr(n,r+1,s,e)}return e},_f=n=>{const e=new Set,t=[];for(let r=0;r<n.length;r++){const s=n[r];if(!mt(s)||jr.has(s.value))continue;const i=n[r-1],o=n[r+1];if(!(ge(i,".")||ge(i,"?.")||ge(i,"#"))&&!(mt(i)&&(i.value==="break"||i.value==="continue"))&&!ge(o,":")){if(ge(o,"(")){const a=Gn(n,r+1);if(a!==-1&&ge(n[a+1],"{"))continue}e.has(s.value)||(e.add(s.value),t.push(s.value))}}return t},Af=n=>{const e=pf(n),t=xf(e),r=_f(e);for(const s of r)if(!(t.has(s)||gf.has(s)))throw yf(s);return{bound:t,references:r}},mu=4096,Vn=n=>new D(n,"events_handler_invalid"),kf=()=>new D(`Subscription context may not exceed ${mu} bytes`,"events_context_too_large"),Ef=()=>new D("This environment provides no `crypto.subtle`, so an inline handler cannot be hashed. Publish it with `puter.events.handlers.publish()` and subscribe with `handlerName` instead.","events_handler_hash_unavailable"),gu=new TextEncoder,Df=n=>gu.encode(n).length,Tf=async n=>{var r;const e=(r=globalThis.crypto)==null?void 0:r.subtle;if(!e)throw Ef();const t=await e.digest("SHA-256",gu.encode(n));return[...new Uint8Array(t)].map(s=>s.toString(16).padStart(2,"0")).join("")},Sf=/^(async\s+)?(\*\s*)?([A-Za-z_$][\w$]*|\[[^\]]*\])\s*\(/,Cf=/^(async\s+)?(function\b|class\b|\()/,If=n=>{const e=n.trim();if(Cf.test(e)||!Sf.test(e))return n;const t=/^async\s+/.test(e),r=e.replace(/^async\s+/,"");return/^(get|set)\s+[A-Za-z_$[]/.test(r)||r.startsWith("[")?n:`${t?"async ":""}function ${r}`},Lf=n=>{if(typeof n=="function")return If(Function.prototype.toString.call(n));if(typeof n=="string"){if(n.trim().length===0)throw Vn("A handler source string may not be empty");return n}if(n&&typeof n=="object"&&"file"in n)return null;throw Vn("A handler must be a function, a source string, or `{ file: <path> }`")},Rf=async(n,e)=>{const t=Lf(e);if(t!==null)return t;const r=e.file;if(typeof r!="string"||r.trim().length===0)throw Vn("`file` must be a non-empty path");const s=await n.fs.read(r),i=typeof s=="string"?s:await s.text();if(i.trim().length===0)throw Vn(`\`${r}\` is empty`);return i},bu=async(n,e)=>{const t=await Rf(n,e);return Af(t),{source:t,hash:await Tf(t)}},Pf=n=>{if(n==null)return;let e;try{e=JSON.stringify(n)}catch{throw new D("context must be JSON-serializable","events_context_invalid")}if(e===void 0)throw new D("context must be JSON-serializable","events_context_invalid");if(Df(e)>mu)throw kf();return e},Tn=(n,e)=>`${n??""}|${e}`,No=()=>new D("A handler name must be a non-empty string","events_handler_name_invalid");var Yr,Ks;class Bf{constructor(e){E(this,Yr);this.module=e,this.known=new Map;for(const t of["publish","publishAll","list","remove"])this[t]=this[t].bind(this)}async publish(e,t,r={}){const[s]=await _(this,Yr,Ks).call(this,[{name:e,handler:t,replace:r.replace}],r.appUid,"/events/handlers/publish");return s}async publishAll(e,t={}){if(!Array.isArray(e)||e.length===0)throw new D("`handlers` must be a non-empty array","invalid_request");return _(this,Yr,Ks).call(this,e,t.appUid,"/events/handlers/publishAll")}async list(e={}){const r=(await pt(this.module.puter,"/events/handlers/list",void 0,e.appUid?{appUid:e.appUid}:void 0)).handlers??[];for(const s of r)this.known.set(Tn(e.appUid,s.name),s.hash);return r}async remove(e,t={}){if(typeof e!="string"||e.trim().length===0)throw No();const r=await pt(this.module.puter,"/events/handlers/remove",{name:e,...t.appUid?{appUid:t.appUid}:{}});return this.known.delete(Tn(t.appUid,e)),r}forget(e){for(const t of[...this.known.keys()])(t.startsWith(`${e}|`)||t.startsWith("|"))&&this.known.delete(t)}}Yr=new WeakSet,Ks=async function(e,t,r){const s=[];for(const u of e){const l=u==null?void 0:u.name;if(typeof l!="string"||l.trim().length===0)throw No();const{source:c}=await bu(this.module.puter,u.handler),d=this.known.get(Tn(t,l));s.push({name:l,source:c,...u.replace===!0?{replace:!0}:{},...d&&u.replace!==!0?{ifHash:d}:{}})}const i={...t?{appUid:t}:{},...s.length===1&&r.endsWith("/publish")?s[0]:{handlers:s}},o=await pt(this.module.puter,r,i),a=Array.isArray(o.handlers)?o.handlers:[o];for(const u of a)this.known.set(Tn(t,u.name),u.hash);return a};const Mf=()=>new D("`appUid` must be a non-empty string","invalid_request");class qf{constructor(e){this.module=e;for(const t of["list","destroy"])this[t]=this[t].bind(this)}async list(e={}){const t=await pt(this.module.puter,"/events/workers",void 0,{...e.limit!==void 0?{limit:e.limit}:{},...e.cursor!==void 0?{cursor:e.cursor}:{}});return{items:Array.isArray(t.items)?t.items:[],...typeof t.cursor=="string"?{cursor:t.cursor}:{},deployable:t.deployable===!0}}async destroy(e){var r;if(typeof e!="string"||e.trim().length===0)throw Mf();const t=await pt(this.module.puter,"/events/workers/destroy",{appUid:e});return(r=this.module.handlers)==null||r.forget(e),t}}async function Ff(n){const e=n??{},t=e.subject;if(typeof t!="string"||t.trim().length===0)throw new D("`subject` is required","invalid_subject");if(e.limit!==void 0&&typeof e.limit!="number")throw new D("`limit` must be a number","invalid_request");if(e.after!==void 0&&typeof e.after!="string")throw new D("`after` must be a string","invalid_request");const r=await pt(this.puter,"/events/fetch",void 0,{subject:t,...e.after!==void 0?{after:e.after}:{},...e.limit!==void 0?{limit:e.limit}:{}});return{items:r.items??[],...typeof r.cursor=="string"?{cursor:r.cursor}:{}}}function Nf(...n){const{puter:e}=this,t=typeof n[0]=="object"&&n[0]!==null?n[0]:{},{limit:r,cursor:s,includeTotal:i,stream:o}=t,a=Object.prototype.hasOwnProperty.call(t,"cursor"),u=l=>pt(e,"/events/subscriptions",void 0,{...r!==void 0?{limit:r}:{},...l.cursor?{cursor:l.cursor}:{},...l.includeTotal?{includeTotal:!0}:{}});if(o===!0)return Je(u,{cursor:s,includeTotal:i===!0});if(a||i!==void 0){if(i!==void 0&&typeof i!="boolean")throw new D("`includeTotal` must be a boolean","invalid_request");return u({cursor:s??null,includeTotal:i===!0})}return Qt(u)}const yu=n=>{if(typeof n!="string"||n.trim().length===0)throw new D("Subject must be a non-empty string","invalid_subject")},Uf=n=>{if(typeof n!="function")throw new D("Handler must be a function","invalid_handler")};async function Of(n,e,t={}){return yu(n),Uf(e),hu(this.puter)&&await fu(this.puter),await this.channel.subscribe(n,e,t)}async function $f(n={}){const{puter:e}=this;yu(n==null?void 0:n.subject);const{handler:t,handlerName:r}=n;if(t!=null&&!r)throw new D("An inline `handler` needs a `handlerName` to publish it under","events_handler_name_required");if(n.delivery==="single"&&!r)throw new D("A `single` subscription needs a `handlerName`","events_handler_required");const s=t==null?null:await bu(e,t),i={subject:n.subject,...n.delivery?{delivery:n.delivery}:{},...n.targets?{targets:n.targets}:{},...r?{handlerName:r}:{},...s?{handlerHash:s.hash}:{},...n.expiresAt!==void 0&&n.expiresAt!==null?{expiresAt:n.expiresAt}:{},...n.includeValue?{includeValue:!0}:{}};Pf(n.context)!==void 0&&(i.context=n.context);const o=await pt(e,"/events/subscribe",i);return typeof t=="function"&&typeof(o==null?void 0:o.subId)=="string"&&this.channel.registerDurable(o.subId,t,n.context,n.onError),o.off=async()=>this.unsubscribe(o.subId),o}async function jf(n){if(typeof n!="string"||n.trim().length===0)throw new D("No such subscription","subscription_does_not_exist");this.channel.deregisterDurable(n),await pt(this.puter,"/events/unsubscribe",{subId:n})}class zf extends Ne{constructor(t){super(t);p(this,"onLocal",Of);p(this,"onPersistent",$f);p(this,"unsubscribe",jf);p(this,"list",Nf);p(this,"fetch",Ff);this.channel=new of(this),this.handlers=new Bf(this),this.workers=new qf(this);const r=this;for(const s of["onLocal","onPersistent","unsubscribe","list","fetch"])r[s]=r[s].bind(this);t.onAuthStateChanged(()=>this.channel.reset())}}const Hf=zf;class Le{constructor(e){p(this,"readURL");p(this,"writeURL");p(this,"metadataURL");p(this,"name");p(this,"uid");p(this,"id");p(this,"uuid");p(this,"path");p(this,"size");p(this,"accessed");p(this,"modified");p(this,"created");p(this,"isDir");p(this,"isDirectory");p(this,"write",async function(e){return puter.fs.write(this.path,e,{overwrite:!0,dedupeName:!1})});p(this,"watch",function(e){});p(this,"open",function(e){});p(this,"setAsWallpaper",function(e,t){});p(this,"rename",function(e){return puter.fs.rename(this.uid!==void 0?{uid:this.uid,newName:e}:{path:this.path,newName:e})});p(this,"move",function(e,t=!1,r){return puter.fs.move(this.path,e,{overwrite:t,newName:r})});p(this,"copy",function(e,t,r=!1){return puter.fs.copy(this.path,e,{dedupeName:t,overwrite:r})});p(this,"delete",function(){return puter.fs.delete(this.path)});p(this,"versions",async function(){});p(this,"trash",function(){});p(this,"mkdir",async function(e,t=!1){if(!this.isDirectory)throw new Error("mkdir() can only be called on a directory");return puter.fs.mkdir(j.join(this.path,e),{dedupeName:t})});p(this,"metadata",async function(){});p(this,"readdir",async function(){if(!this.isDirectory)throw new Error("readdir() can only be called on a directory");return puter.fs.readdir(this.path)});p(this,"read",async function(){return puter.fs.read(this.path)});this.readURL=e.readURL??e.read_url,this.writeURL=e.writeURL??e.write_url,this.metadataURL=e.metadataURL??e.metadata_url,this.name=e.name??e.fsentry_name,this.uid=e.uid??e.uuid??e.fsentry_uid??e.fsentry_id??e.fsentry_uuid??e.id,this.id=this.uid,this.uuid=this.uid,this.path=e.path??e.fsentry_path,this.size=e.size??e.fsentry_size,this.accessed=e.accessed??e.fsentry_accessed,this.modified=e.modified??e.fsentry_modified,this.created=e.created??e.fsentry_created,this.isDirectory=!!(e.isDirectory||e.isDir||e.is_dir||e.fsentry_is_dir),this.isDir=this.isDirectory;const t={};Object.defineProperty(this,"_internalProperties",{enumerable:!1,value:t});const r=(()=>{const s=this.writeURL??this.readURL;if(typeof s!="string"||s==="")return null;try{return new URL(s).searchParams}catch{return null}})();t.signature=e.signature??(r==null?void 0:r.get("signature"))??null,t.expires=e.expires??(r==null?void 0:r.get("expires"))??null,Object.defineProperty(t,"file_signature",{get:()=>({read_url:this.readURL,write_url:this.writeURL,metadata_url:this.metadataURL,fsentry_accessed:this.accessed,fsentry_modified:this.modified,fsentry_created:this.created,fsentry_is_dir:this.isDirectory,fsentry_size:this.size,fsentry_name:this.name,path:this.path,uid:this.uid})})}}const Wf="Authentication failed.",Uo=n=>typeof n=="object"&&n!==null&&!Array.isArray(n)&&!(typeof File<"u"&&n instanceof File)&&!(typeof Blob<"u"&&n instanceof Blob),pe=(n,...e)=>{for(const t of e)if(n[t]!==void 0)return n[t]},as=(n,e=[])=>{if(Uo(n[0]))return{...n[0]};const t={};e.forEach((s,i)=>{n[i]!==void 0&&(t[s]=n[i])});let r=n.slice(e.length);return r[0]===void 0&&(r=r.slice(1)),Uo(r[0])&&(Object.assign(t,r[0]),r=r.slice(1)),typeof r[0]=="function"&&(t.success=r[0]),typeof r[1]=="function"&&(t.error=r[1]),t},Gf=async()=>{if(!(puter.authToken||puter.env!=="web"))try{await puter.ui.authenticateWithPuter()}catch{throw Wf}};async function Di(n){const{endpoint:e,body:t,method:r="post",contentType:s,responseType:i,authHeader:o=!0,prepareXhr:a,transform:u,success:l,error:c,upgradePrompt:d}=n;return await Gf(),new Promise((f,g)=>{const m=Zt(e,this.APIOrigin,o?this.authToken:void 0,r,s,i);a==null||a(m),Lt(m,void 0,c,async v=>{try{const A=u?await u.call(this,v):v;typeof l=="function"&&l(A),f(A)}catch(A){typeof c=="function"&&c(A),g(A)}},v=>{Er(v,{method:`puter.fs (${e})`,...d}),g(v)}),m.send(t===void 0?void 0:JSON.stringify(t))})}const be=({positional:n=[],request:e})=>async function(...r){const s=as(r,n),i=await e.call(this,s);return await Di.call(this,{success:s.success,error:s.error,...i})},Vf=be({positional:["source","destination"],request(n){var e,t;return{endpoint:"/copy",body:{original_client_socket_id:(e=this.socket)==null?void 0:e.id,socket_id:(t=this.socket)==null?void 0:t.id,source:ee(n.source),destination:ee(n.destination),overwrite:n.overwrite,new_name:pe(n,"newName","new_name"),dedupe_name:pe(n,"dedupeName","dedupe_name")}}}}),Xf=be({positional:["paths"],request(n){return{endpoint:"/delete",body:{paths:(Array.isArray(n.paths)?n.paths:[n.paths]).map(t=>ee(t)),descendants_only:pe(n,"descendantsOnly","descendants_only")??!1,recursive:n.recursive??!0}}}}),wu=n=>(Array.isArray(n)?n:[n]).filter(t=>t!=null).map(t=>{if(typeof t=="string"){const s=t.trim();return s.includes("@")?{email:s}:{username:s}}const r=t;return r.anyone===!0?{anyone:!0}:{...r.email?{email:String(r.email)}:{},...r.username?{username:String(r.username)}:{},...r.team?{team:String(r.team)}:{},...r.teamHandle?{teamHandle:String(r.teamHandle)}:{}}}),vu=(n,e=ee)=>{if(n.uid!==void 0)return(Array.isArray(n.uid)?n.uid:[n.uid]).map(i=>({uid:String(i)}));const t=n.paths!==void 0?n.paths:n.path;return(Array.isArray(t)?t:[t]).filter(s=>s!=null).map(s=>({path:e(String(s))}))},dn=n=>({uid:n.uid,mode:n.mode,path:n.path,entryUid:n.uid_entry??n.entryUid,isDir:!!(n.is_dir??n.isDir),name:n.name??null,type:n.type??null,thumbnail:n.thumbnail??null,owner:n.owner??null,issuer:n.issuer??null,holder:n.holder??null,...n.holder_team||n.holderTeam?{holderTeam:n.holder_team??n.holderTeam}:{},inheritedFrom:n.inherited_from??null,issuedByApp:n.issued_by_app??null,...n.anyone===!0?{anyone:!0}:{},...n.status==="pending"||n.pending===!0?{pending:!0,recipientEmail:n.recipient_email??n.recipientEmail??n.recipient??null}:{},modified:n.modified??0,size:n.size??null,...n.is_new===void 0?{}:{isNew:!!n.is_new}}),xu=n=>{if(puter!=null&&puter._cache)for(const e of n){if(!e.path){puter._cache.flushall();return}puter._cache.del(`item:${e.path}`),puter._cache.del(`readdir:${j.dirname(e.path)}`)}},Jf=20*1024*1024,Kf=async function(...n){const e=as(n,["path"]);e.consistency||(e.consistency="strong");let t;if(e.path&&(t=`item:${e.path}`),e.consistency==="eventual"&&!e.returnSubdomains&&!e.returnPermissions&&!e.returnVersions&&!e.returnSize&&!e.returnShares){const s=await puter._cache.get(t);if(s)return s}const r="fs:stat:"+JSON.stringify({path:e.path,uid:e.uid,returnSubdomains:e.returnSubdomains||e.returnWorkers,returnPermissions:e.returnPermissions,returnVersions:e.returnVersions,returnSize:e.returnSize,returnShares:e.returnShares,consistency:e.consistency});return await rs(r,()=>{const s={};return e.uid!==void 0?s.uid=e.uid:e.path!==void 0&&(s.path=ee(e.path)),s.return_subdomains=e.returnSubdomains||e.returnWorkers,s.return_permissions=e.returnPermissions,s.return_versions=e.returnVersions,s.return_size=e.returnSize,s.return_shares=e.returnShares,s.auth_token=this.authToken,Di.call(this,{endpoint:"/stat",authHeader:!1,body:s,success:e.success,error:e.error,transform:i=>(Array.isArray(i==null?void 0:i.shares)&&(i.shares=i.shares.map(dn)),!e.returnShares&&JSON.stringify(i).length<=Jf&&puter._cache.set(t,i),i)})})},us=Kf,Yf=be({positional:["path","expiresIn"],async request(n){const{uid:e,is_dir:t}=await us.call(this,n.path);if(t)throw"Cannot create readUrl for directory";return{endpoint:"/auth/create-access-token",body:{expiresIn:n.expiresIn??"24h",permissions:[`fs:${e}:read`]},transform:({token:r})=>`${this.APIOrigin}/token-read?uid=${encodeURIComponent(e)}&token=${encodeURIComponent(r)}`}}}),Zf=/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i,Qf=async function(...n){const e=as(n,["item","appName"]),t=c=>{throw typeof e.error=="function"&&e.error(c),c},r=typeof e.item=="string"?e.item:void 0,s=e.uid!==void 0?String(e.uid):r!==void 0&&Zf.test(r)?r:void 0,i=s===void 0?e.path??r:void 0;if(s===void 0&&(typeof i!="string"||i===""))return t({message:"getShareLink() needs a path or a uid.",code:"field_missing"});const o=e.appName??this.puter.appName;if(typeof o!="string"||o==="")return t({message:"getShareLink() needs the name of the app to open the file with; pass `appName`.",code:"app_name_required"});let a;try{a=await us.call(this,s!==void 0?{uid:s}:{path:i})}catch(c){throw typeof e.error=="function"&&e.error(c),c}if(a.is_dir)return t({message:"getShareLink() needs a file; a directory cannot be opened with an app.",code:"not_a_file"});const l=`${String(this.puter.defaultGUIOrigin).replace(/\/+$/,"")}/app/${encodeURIComponent(o)}?file=${encodeURIComponent(a.uid)}`;return typeof e.success=="function"&&e.success(l),l},ep=Qf,tp=be({positional:["path"],request(n){const e=new URLSearchParams;return n.uid!==void 0?e.set("uid",String(n.uid)):e.set("path",ee(String(n.path))),{endpoint:`/share/shares?${e.toString()}`,method:"get",transform:t=>(t.items??[]).map(dn)}}}),rp=be({request(n){const e=new URLSearchParams;n.limit!==void 0&&e.set("limit",String(n.limit)),n.cursor!==void 0&&e.set("cursor",String(n.cursor)),pe(n,"includeTotal","include_total")&&e.set("includeTotal","true");const t=e.toString();return{endpoint:`/share/shared-with-me${t?`?${t}`:""}`,method:"get",transform:r=>({items:(r.items??[]).map(dn),...r.cursor===void 0?{}:{cursor:r.cursor},...r.total===void 0?{}:{total:r.total}})}}}),np=be({request(n){const e=new URLSearchParams;n.limit!==void 0&&e.set("limit",String(n.limit)),n.cursor!==void 0&&e.set("cursor",String(n.cursor)),n.appUid!==void 0&&e.set("appUid",String(n.appUid)),pe(n,"includeTotal","include_total")&&e.set("includeTotal","true");const t=e.toString();return{endpoint:`/share/shared-by-me${t?`?${t}`:""}`,method:"get",transform:r=>({items:(r.items??[]).map(dn),...r.cursor===void 0?{}:{cursor:r.cursor},...r.total===void 0?{}:{total:r.total}})}}}),sp=be({positional:["path"],request(n){var t;const e=ee(n.path);return{endpoint:"/mkdir",body:{parent:j.dirname(e),path:j.basename(e),overwrite:n.overwrite??!1,dedupe_name:pe(n,"dedupeName","rename")??!1,shortcut_to:n.shortcutTo,original_client_socket_id:(t=this.socket)==null?void 0:t.id,create_missing_parents:pe(n,"createMissingParents","recursive")??!1}}}}),ip=be({positional:["source","destination"],async request(n){const e=ee(n.source);let t=ee(n.destination),r=pe(n,"newName","new_name");if(!r){let s=!1;try{s=!!(await us.call(this,t)).is_dir}catch{}s||(r=j.basename(t),t=j.dirname(t))}return{endpoint:"/move",body:{source:e,destination:t,overwrite:n.overwrite,dedupe_name:pe(n,"dedupeName","dedupe_name"),new_name:r,create_missing_parents:pe(n,"createMissingParents","create_missing_parents"),new_metadata:pe(n,"newMetadata","new_metadata"),original_client_socket_id:pe(n,"excludeSocketID","original_client_socket_id")}}}}),op=be({positional:["path"],request(n){const e=new URLSearchParams({file:ee(n.path)});return n.offset&&e.set("offset",String(n.offset)),n.byte_count&&e.set("byte_count",String(n.byte_count)),{endpoint:`/read?${e.toString()}`,method:"get",contentType:"application/json;charset=UTF-8",responseType:"blob",prepareXhr(t){n.cache!==!0&&(t.setRequestHeader("Cache-Control","no-cache"),t.setRequestHeader("Pragma","no-cache"))}}}}),Oo=n=>{if(!n||typeof n!="object")return n;const e=typeof n.path=="string"?n.path:"",t=e?j.dirname(e):n.dirname,r=e.split("/"),s=r[2]==="AppData"?r[3]:void 0,i=Array.isArray(n.subdomains)?n.subdomains:[];return{id:n.uuid,uid:n.uid??n.uuid,uuid:n.uuid,parent_id:n.parentUid??null,parent_uid:n.parentUid??null,path:n.path,dirname:t,dirpath:t,name:n.name,is_dir:!!n.isDir,is_shortcut:n.isShortcut?1:0,shortcut_to:n.shortcutTo??null,is_symlink:n.isSymlink?1:0,symlink_path:n.symlinkPath??null,type:n.type??null,writable:!0,is_public:n.isPublic??null,is_shared:n.isShared??null,thumbnail:n.thumbnail??null,immutable:!!n.immutable,metadata:n.metadata??null,modified:n.modified,created:n.created??null,accessed:n.accessed??null,size:n.size??null,layout:n.layout??null,subdomains:i,workers:Array.isArray(n.workers)?n.workers:[],has_website:n.hasWebsite??i.length>0,suggested_apps:n.suggestedApps,associated_app:n.associatedApp??null,appdata_app:s}},ap=100*1024*1024,up=n=>Array.isArray(n)?n.map(Oo):n&&Array.isArray(n.items)?{...n,items:n.items.map(Oo)}:n,Ys=function(n,e){const t={no_thumbs:n.no_thumbs,no_assocs:n.no_assocs,no_subdomains:n.no_subdomains,auth_token:this.authToken};return n.limit!==void 0&&(t.limit=n.limit),n.offset!==void 0&&(t.offset=n.offset),n.sortBy!==void 0&&(t.sortBy=n.sortBy),n.sortOrder!==void 0&&(t.sortOrder=n.sortOrder),n.recursive!==void 0&&(t.recursive=n.recursive),n.depth!==void 0&&(t.depth=n.depth),e&&(t.cursor=e.cursor??null,e.includeTotal!==void 0&&(t.includeTotal=e.includeTotal)),n.uid?t.uid=n.uid:n.path&&(t.path=ee(n.path)),Di.call(this,{endpoint:"/fs/readdir",authHeader:!1,body:t,transform:r=>{const s=up(r),i=Array.isArray(s)?s:(s==null?void 0:s.items)??[];for(const o of i)puter._cache.set(`item:${o.path}`,o);return s}})},cp=async function(n){if(n.consistency||(n.consistency="strong"),!n.path&&!n.uid)throw{message:"Either path or uid must be provided.",code:"NO_PATH_OR_UID"};const e=Object.prototype.hasOwnProperty.call(n,"cursor")||n.includeTotal===!0,t=!e&&n.limit===void 0&&n.offset===void 0;let r;if(n.path&&t&&!n.recursive&&(r=`readdir:${n.path}`),n.consistency==="eventual"&&r){const o=await puter._cache.get(r);if(o)return o}const s="fs:readdir:"+JSON.stringify({path:n.path,uid:n.uid,no_thumbs:n.no_thumbs,no_assocs:n.no_assocs,no_subdomains:n.no_subdomains,consistency:n.consistency,limit:n.limit,offset:n.offset,cursor:e?n.cursor??null:void 0,includeTotal:n.includeTotal,sortBy:n.sortBy,sortOrder:n.sortOrder,recursive:n.recursive,depth:n.depth}),i=rs(s,async()=>{if(!t){const u=e?{cursor:n.cursor,includeTotal:n.includeTotal}:void 0;return await Ys.call(this,n,u)}const a=await Qt(u=>Ys.call(this,n,u));return r&&JSON.stringify(a).length<=ap&&puter._cache.set(r,a),a});return i.then(o=>{typeof n.success=="function"&&n.success(o)},o=>{typeof n.error=="function"&&n.error(o)}),await i},lp=function(...n){const e=as(n,["path"]);if(e.stream===!0){if(e.offset!==void 0)throw{message:"`offset` cannot be combined with `stream`; pass `cursor` to resume from a position.",code:"invalid_request"};if(!e.path&&!e.uid)throw{message:"Either path or uid must be provided.",code:"NO_PATH_OR_UID"};return Je(r=>Ys.call(this,e,r),{cursor:e.cursor,includeTotal:e.includeTotal===!0})}return cp.call(this,e)},dp=be({request(n){if(!Array.isArray(n.directory_ids)||n.directory_ids.length===0)throw new Error("directory_ids must be a non-empty array");return{endpoint:"/readdir-subdomains",authHeader:!1,body:{directory_ids:n.directory_ids,auth_token:this.authToken}}}}),hp=be({positional:["path","newName"],request(n){const e={original_client_socket_id:pe(n,"excludeSocketID","original_client_socket_id"),new_name:pe(n,"newName","new_name")};return n.uid!==void 0?e.uid=n.uid:n.path!==void 0&&(e.path=ee(n.path)),{endpoint:"/rename",body:e}}}),$o=/^[\w-]+\.[\w-]+\.[\w-]+$/,fp=n=>{const e=n.trim();if($o.test(e))return e;try{const t=new URL(e,"https://placeholder.invalid").searchParams.get("token");if(t&&$o.test(t))return t}catch{}},pp=be({positional:["tokenOrUuid"],request(n){const e=n.tokenOrUuid,t=typeof e=="string"?e:String(e??"");if(t.trim()==="")throw{message:"revokeReadURL() needs the URL that getReadURL() returned.",code:"field_missing"};const r=fp(t);if(r===void 0)throw{message:"revokeReadURL() needs the URL or token that getReadURL() returned.",code:"field_invalid"};return{endpoint:"/auth/revoke-own-access-token",body:{token:r},transform:()=>{}}}}),mp="Sharing with anyone who has the link requires a subscription.",gp=be({positional:["path","recipient","mode"],request(n){const e=wu(pe(n,"recipient","recipients")),t=vu(n,r=>ee(r));return{endpoint:"/share",body:{recipients:e,items:t,mode:n.mode??"read"},transform:r=>{const s=r.results??[],i=s.filter(o=>o.status==="success"||o.status==="pending");if(i.length===0&&s.length>0){const o=s[0],a={message:String(o.message??"Share failed"),code:String(o.code??"share_failed")};throw Er(a,{method:"puter.fs.share",subscriptionMessage:mp}),a}return xu(t),i.map(dn)}}}}),bp=be({positional:["appUid","items"],request(n){const e=Array.isArray(n.items)?n.items:[n.items],t=e.length===1;return{endpoint:"/sign",body:{app_uid:pe(n,"appUid","app_uid"),items:e},transform:r=>({token:r.token,items:t?{...r.signatures[0]}:r.signatures.map(s=>({...s}))})}}}),yp=be({request(){return{endpoint:"/df"}}}),wp=be({positional:["path","recipient"],request(n){const e=vu(n,t=>ee(t));return{endpoint:"/share/revoke",body:{recipients:wu(pe(n,"recipient","recipients")),items:e},transform:t=>{const r=Number(t.revoked??0);return r>0&&xu(e),{revoked:r}}}}}),Ti=2*1024*1024,vp=128,xp=32,_p=5e3,Zs="signedBatchWriteSupported",Lr=500,Ap=4,kp=8,Ep=8,Dp=new Set([404,405,501]),Tp=1024*1024,yt=(n,e)=>{const t=[];if(!Array.isArray(n)||n.length===0)return t;const r=Math.max(1,Number(e)||1);for(let s=0;s<n.length;s+=r)t.push(n.slice(s,s+r));return t},Sp=async(n,e)=>{const t=globalThis.DataTransfer||class{},r=globalThis.FileList||class{},s=globalThis.DataTransferItemList||class{};let i;if(n instanceof s||n instanceof t||n[0]instanceof t||e.parsedDataTransferItems)e.parsedDataTransferItems?i=n:i=await puter.ui.getEntriesFromDataTransferItems(n),i.sort((o,a)=>o.isDirectory&&!a.isDirectory?-1:!o.isDirectory&&a.isDirectory?1:o.isDirectory&&a.isDirectory?0:o.size-a.size);else if(n instanceof File||n[0]instanceof File||n instanceof r||n[0]instanceof r){Array.isArray(n)?i=n:i=n instanceof r?Array.from(n):[n],i.sort((o,a)=>o.size-a.size);for(let o=0;o<i.length;o++)i[o].filepath=i[o].name,i[o].fullPath=i[o].name}else if(n instanceof Blob){i=[new File([n],e.name,{type:"application/octet-stream"})];for(let a=0;a<i.length;a++)i[a].filepath=i[a].name,i[a].fullPath=i[a].name}else if(typeof n=="string"){i=[new File([n],"default.txt",{type:"text/plain"})];for(let a=0;a<i.length;a++)i[a].filepath=i[a].name,i[a].fullPath=i[a].name}else throw{code:"field_invalid",message:"upload() items parameter is an invalid type"};return i},Cp=(n,e,t)=>{let r=[],s={},i=[],o=0,a=0;for(let u=0;u<n.length;u++)if(n[u]){if(n[u].isDirectory){const l=n[u].finalPath?n[u].finalPath:n[u].fullPath,c=typeof l=="string"?l.replace(/^\/+/,""):"";r.push({path:j.join(e,c)})}else{let l=n[u].finalPath||n[u].filepath||n[u].fullPath||n[u].name;typeof l=="string"&&(l=l.replace(/^\/+/,""));let[c,d]=[l==null?void 0:l.slice(0,l==null?void 0:l.lastIndexOf("/")),l==null?void 0:l.slice((l==null?void 0:l.lastIndexOf("/"))+1)];if((typeof d=="string"?d.trim().toLowerCase():"")===".ds_store")continue;if(d!==""){const g=l||n[u].name;n[u].puter_full_path=j.join(e,g),i.push(n[u])}if(t.createFileParent&&l.includes("/")){let g;c.split("/").forEach(m=>{g=g?`${g}/${m}`:m;let b=j.join(e,g);s[b]||(s[b]=!0,r.push({path:b}))})}}n[u].size!==void 0&&(o+=n[u].size,a++)}return{dirs:r,files:i,totalSize:o,fileCount:a}},Xn=n=>{if(!n)return 0;const e=n.indexOf(","),t=e===-1?n:n.slice(e+1),r=t.endsWith("==")?2:t.endsWith("=")?1:0;return Math.floor(t.length*3/4)-r},Hr=n=>typeof n=="string"&&n.startsWith("data:"),jo=n=>{if(!Hr(n))return;const e=n.indexOf(","),t=e===-1?n.slice(5):n.slice(5,e),[r]=t.split(";");return(r?r.trim():"")||"application/octet-stream"},Ip=async n=>{const e=await fetch(n);if(!e.ok)throw new Error("Failed to read thumbnail data URL");return await e.blob()},Lp=n=>{if(!n)return!1;if(n.type&&n.type.startsWith("image/"))return!0;const e=(n.name||"").toLowerCase();return[".png",".jpg",".jpeg",".gif",".bmp",".webp",".tiff",".avif",".jfif"].some(t=>e.endsWith(t))},Qs=n=>{if(!(typeof n!="string"||n.length===0)&&!(Hr(n)&&Xn(n)>Ti))return n},Rp=(n,e,t)=>{const r=Math.max(n,e)||1,s=Math.min(1,t/r),i=Math.max(1,Math.round(n*s)),o=Math.max(1,Math.round(e*s));return{width:i,height:o}},Pp=n=>new Promise((e,t)=>{if(typeof document>"u"||typeof URL>"u"||typeof Image>"u")return e(null);const r=URL.createObjectURL(n),s=new Image;s.onload=()=>{URL.revokeObjectURL(r),e(s)},s.onerror=i=>{URL.revokeObjectURL(r),t(i)},s.src=r}),Bp=(n,e,t,r)=>{if(!n||typeof document>"u")return null;const{width:s,height:i}=Rp(n.naturalWidth||n.width,n.naturalHeight||n.height,e),o=document.createElement("canvas");o.width=s,o.height=i;const a=o.getContext("2d");if(!a)return null;a.drawImage(n,0,0,s,i);try{return o.toDataURL(t,r)}catch{return null}},zo=async n=>{try{if(typeof document>"u"||typeof File>"u"||!(n instanceof File)||!Lp(n))return;const e=await Pp(n);if(!e)return;let t=vp;const r=[{type:"image/webp",quality:.85},{type:"image/jpeg",quality:.8},{type:"image/png"}];for(;t>=xp;){for(const{type:s,quality:i}of r){const o=Bp(e,t,s,i);if(o&&Xn(o)<=Ti)return o}t=Math.floor(t/2)}}catch{return}},Mp=async(n,e,t)=>{const r=e.generateThumbnails||e.thumbnailGenerator;if(!n.length||!r)return[];const s=e.thumbnailGenerator||zo;return await Promise.all(n.map(async i=>{try{return t!=null&&t.aborted?void 0:await s(i,{defaultGenerator:zo,signal:t})}catch{return}}))},qp=async n=>{const e=await n.text();if(!e)return null;try{return JSON.parse(e)}catch{return e}},Fp=n=>({Authorization:`Bearer ${n}`,"Content-Type":"application/json"}),Np=(n,e,t)=>{var o;const r=e&&typeof e=="object"?e:null,s=(r==null?void 0:r.message)??(typeof(r==null?void 0:r.error)=="string"?r.error:(o=r==null?void 0:r.error)==null?void 0:o.message)??(typeof e=="string"&&e.length>0?e:null)??t??`Request failed with status ${n.status}`,i=new Error(s);return i.status=n.status,i.body=e,typeof(r==null?void 0:r.code)=="string"&&r.code.length>0?i.code=r.code:typeof(r==null?void 0:r.errorCode)=="string"&&r.errorCode.length>0&&(i.code=r.errorCode),i},Pt=async(n,e,t,r)=>{const s=await G(`${n}${t}`,{method:"POST",headers:Fp(e),body:JSON.stringify(r)}),i=await qp(s);if(!s.ok)throw Np(s,i,`Failed request to ${t}`);return i},Up=n=>{if(n&&typeof n=="object"){if(typeof n.message=="string"&&n.message.length>0)return n.message;if(typeof n.body=="string"&&n.body.length>0)return n.body;if(n.body&&typeof n.body=="object"){if(typeof n.body.message=="string"&&n.body.message.length>0)return n.body.message;if(n.body.error&&typeof n.body.error=="object"&&typeof n.body.error.message=="string"&&n.body.error.message.length>0)return n.body.error.message}}return String(n)},Ps=async({url:n,blob:e,contentType:t,timeoutMs:r=0,onProgress:s,onRequestCreated:i,onRequestCompleted:o})=>await new Promise((a,u)=>{const l=new XMLHttpRequest;l.open("PUT",n,!0),l.withCredentials=!1,l.timeout=r,t&&l.setRequestHeader("Content-Type",t),i&&i(l);let c=0;l.upload.addEventListener("progress",d=>{if(!s||!d.lengthComputable)return;const f=Math.max(0,d.loaded-c);c=d.loaded,f>0&&s(f)}),l.onload=()=>{if(o&&o(l),e.size>c&&s&&s(e.size-c),l.status>=200&&l.status<300){const f=l.getResponseHeader("etag")??l.getResponseHeader("ETag");a({etag:f});return}const d=new Error(`Signed upload failed with status ${l.status}`);d.status=l.status,u(d)},l.onerror=()=>{o&&o(l);const d=new Error("Network error during signed upload");d.status=l.status,u(d)},l.onabort=()=>{o&&o(l);const d=new Error("Signed upload aborted");d.aborted=!0,u(d)},l.ontimeout=()=>{o==null||o(l),u(new Error("Signed upload timed out"))},l.send(e)}),Ho=n=>{if(!n||typeof n!="object")return!1;if(n.signedBatchUnavailable===!0)return!0;if(n.partial===!0)return!1;const e=n.body&&typeof n.body=="object"?n.body:null;return typeof(e==null?void 0:e.code)=="string"&&e.code.length>0||typeof(e==null?void 0:e.errorCode)=="string"&&e.errorCode.length>0?!1:Dp.has(n.status)},Op=n=>{const e={};for(const t of["code","status"]){const r=new Set(n.map(s=>s[t]));r.size===1&&!r.has(void 0)&&(e[t]=[...r][0])}return e},$p=(n,e)=>{if(!e||typeof e!="object")return;if(e.type==="directory")return e.directoryPath;if(e.type!=="file"||!e.file)return;const t=e.file;return t.puter_full_path??j.join(n,t.filepath||t.name||"")};async function jp(n){const{options:e,dirPath:t,operationId:r,xhr:s,files:i,dirs:o,signedDirectories:a,thumbnails:u,totalSize:l,resolve:c,reject:d,error:f,flags:g}=n,m=e.overwrite??!1,b=!!(e.createMissingAncestors||e.createMissingParents||e.createFileParent||o.length>0);let v=l>0?l:1,A=0;const k=new Set,T=new Set;let M=!1;const x=()=>{let I=(A/v*100).toFixed(2);I=I>100?100:I,e.progress&&typeof e.progress=="function"&&e.progress(r,I)},w=I=>{I<=0||(A+=I,x())},C=async()=>{if(T.size===0)return;const I=Array.from(T);await Promise.all(I.map(async le=>{try{await Pt(this.APIOrigin,this.authToken,"/fs/abortWrite",{uploadId:le})}catch{}})),T.clear()},Ie=async()=>{if(!M){M=!0;for(const I of k)try{I.abort()}catch{}await C(),e.abort&&typeof e.abort=="function"&&e.abort(r)}};s.abort=()=>{Ie()};try{const I=[];for(let L=0;L<a.length;L++)I.push({type:"directory",directoryPath:a[L],itemUploadId:`dir_${L}`});for(let L=0;L<i.length;L++)I.push({type:"file",file:i[L],fileIndex:L,thumbnailData:Qs(u[L]??e.thumbnail??void 0),itemUploadId:String(L)});const le=I.reduce((L,H)=>H.type!=="file"||!Hr(H.thumbnailData)?L:L+Xn(H.thumbnailData),0),ae=l+le;v=ae>0?ae:1;const de=I.map(L=>{var re,we,ue,Ye;if(L.type==="directory")return{fileMetadata:{path:L.directoryPath,size:0,contentType:"application/x-puter-directory",overwrite:m,createMissingParents:b},directory:!0,guiMetadata:{operationId:r,itemUploadId:L.itemUploadId,socketId:(re=this.socket)==null?void 0:re.id,originalClientSocketId:(we=this.socket)==null?void 0:we.id}};const H=L.file;return{fileMetadata:{path:H.puter_full_path??j.join(t,H.filepath||H.name),size:H.size,contentType:H.type||"application/octet-stream",overwrite:m,dedupeName:m?!1:e.dedupeName??!0,createMissingParents:b,app_uid:e.appUID},...Hr(L.thumbnailData)?{thumbnailMetadata:{contentType:jo(L.thumbnailData),size:Xn(L.thumbnailData)}}:{},guiMetadata:{operationId:r,itemUploadId:L.itemUploadId,socketId:(ue=this.socket)==null?void 0:ue.id,originalClientSocketId:(Ye=this.socket)==null?void 0:Ye.id}}});e.start&&typeof e.start=="function"&&(e.start(),g.startCallbackFired=!0);const X=new Map,Ue=[],ye=[],pn=yt(de,Lr),qi=yt(I,Lr),Fi=yt(I.map((L,H)=>H),Lr);if(pn.length!==qi.length||pn.length!==Fi.length)throw new Error("Signed batch request chunk mapping is invalid");const oc=async L=>{var Ye,mn,gn,bn;const{requestIndex:H,requestItem:$,startResponse:te}=L,re=$.file,we=$.thumbnailData;let ue;if(Hr(we)){const Ae=te.thumbnailUploadUrl,ut=te.thumbnailUrl;if(Ae&&ut)try{const ve=await Ip(we);ve.size<=Ti&&(await Ps({url:Ae,blob:ve,contentType:ve.type||jo(we),timeoutMs:_p,onProgress:w,onRequestCreated:ct=>{k.add(ct)},onRequestCompleted:ct=>{k.delete(ct)}}),ue=ut)}catch(ve){if(M||ve!=null&&ve.aborted)throw ve}}else typeof we=="string"&&we.length>0&&(ue=we);if(te.uploadMode==="multipart"){const Ae=Number(te.multipartPartSize)||Math.max(re.size,1),ut=Number(te.multipartPartCount),ve=Math.max(1,Math.ceil(re.size/Ae)),ct=Number.isInteger(ut)&&ut>0?ut:ve,N=new Map,z=Array.isArray(te.multipartPartUrls)?te.multipartPartUrls:[];for(const P of z)P!=null&&P.partNumber&&(P!=null&&P.url)&&N.set(Number(P.partNumber),P.url);const Y=[];for(let P=1;P<=ct;P++)N.has(P)||Y.push(P);if(Y.length>0){const P=await Pt(this.APIOrigin,this.authToken,"/fs/signMultipartParts",{uploadId:te.sessionId,partNumbers:Y}),Ee=Array.isArray(P==null?void 0:P.multipartPartUrls)?P.multipartPartUrls:[];for(const J of Ee)J!=null&&J.partNumber&&(J!=null&&J.url)&&N.set(Number(J.partNumber),J.url)}const W=[],xe=[];for(let P=1;P<=ct;P++)xe.push(P);const ke=yt(xe,Ep);for(const P of ke){const Ee=await Promise.allSettled(P.map(async J=>{const Oi=N.get(J);if(!Oi)throw new Error(`Missing signed multipart URL for part ${J}`);const $i=(J-1)*Ae,lc=Math.min($i+Ae,re.size),dc=re.slice($i,lc),ji=await Ps({url:Oi,blob:dc,contentType:te.contentType||re.type||"application/octet-stream",onProgress:w,onRequestCreated:hs=>{k.add(hs)},onRequestCompleted:hs=>{k.delete(hs)}});if(!ji.etag)throw new Error(`Missing ETag for multipart part ${J}`);return{partNumber:J,etag:ji.etag}}));for(const J of Ee){if(J.status==="rejected")throw J.reason;W.push(J.value)}}return W.sort((P,Ee)=>P.partNumber-Ee.partNumber),{requestIndex:H,completionItem:{uploadId:te.sessionId,parts:W,...ue!==void 0?{thumbnailData:ue}:{},guiMetadata:{operationId:r,itemUploadId:$.itemUploadId,socketId:(Ye=this.socket)==null?void 0:Ye.id,originalClientSocketId:(mn=this.socket)==null?void 0:mn.id}}}}if(!te.url)throw new Error("Signed upload URL is missing");return await Ps({url:te.url,blob:re,contentType:te.contentType||re.type||"application/octet-stream",onProgress:w,onRequestCreated:Ae=>{k.add(Ae)},onRequestCompleted:Ae=>{k.delete(Ae)}}),{requestIndex:H,completionItem:{uploadId:te.sessionId,...ue!==void 0?{thumbnailData:ue}:{},guiMetadata:{operationId:r,itemUploadId:$.itemUploadId,socketId:(gn=this.socket)==null?void 0:gn.id,originalClientSocketId:(bn=this.socket)==null?void 0:bn.id}}}},ac=async L=>{var ct;if(M){const N=new Error("Signed upload aborted");throw N.aborted=!0,N}const H=pn[L],$=qi[L],te=Fi[L];if(!H||!$||!te)throw new Error("Missing signed batch request chunk");const re=await Pt(this.APIOrigin,this.authToken,"/fs/startBatchWrite",H);if(!Array.isArray(re)){const N=new Error("Signed batch start response is invalid");throw N.signedBatchUnavailable=!0,N}if(re.length!==H.length)throw new Error("Signed batch start response count mismatch");const we=[];for(let N=0;N<re.length;N++){const z=te[N],Y=$[N],W=re[N];if(z===void 0||!Y||!W)throw new Error("Missing batch signed upload metadata");if(Y.type==="directory"){X.set(z,W.fsEntry??W);continue}if(!W.sessionId)throw new Error("Signed batch response missing sessionId");T.add(W.sessionId),we.push({requestIndex:z,requestItem:Y,startResponse:W})}const ue=[],Ye=[],mn=yt(we,kp);for(const N of mn){if(M){const Y=new Error("Signed upload aborted");throw Y.aborted=!0,Y}const z=await Promise.allSettled(N.map(async Y=>await oc(Y)));for(let Y=0;Y<z.length;Y++){const W=z[Y];if((W==null?void 0:W.status)==="rejected"){const xe=N[Y];xe&&Ye.push({requestIndex:xe.requestIndex,uploadId:xe.startResponse.sessionId,error:W.reason});continue}ue.push(W.value)}}if(Ye.length>0){const N=Array.from(new Set(Ye.map(z=>z.uploadId)));await Promise.allSettled(N.map(async z=>{T.delete(z),await Pt(this.APIOrigin,this.authToken,"/fs/abortWrite",{uploadId:z})})),Ue.push(...Ye)}if(ue.length===0)return;ue.sort((N,z)=>N.requestIndex-z.requestIndex);const gn=ue.map(N=>N.completionItem),bn=ue.map(N=>N.requestIndex),Ae=yt(gn,Lr),ut=yt(bn,Lr);if(Ae.length!==ut.length)throw new Error("Signed batch completion request mapping is invalid");const ve=[];for(let N=0;N<Ae.length;N++){if(M){const W=new Error("Signed upload aborted");throw W.aborted=!0,W}const z=Ae[N],Y=ut[N];if(!z||!Y)throw new Error("Missing signed batch completion request chunk");try{const W=await Pt(this.APIOrigin,this.authToken,"/fs/completeBatchWrite",z);if(!Array.isArray(W))throw new Error("Signed batch completion response is invalid");if(W.length!==z.length)throw new Error("Signed batch completion response count mismatch");for(let xe=0;xe<W.length;xe++){const ke=W[xe],P=Y[xe],Ee=z[xe];if(P===void 0)throw new Error("Missing request index for completed signed batch response");Ee!=null&&Ee.uploadId&&T.delete(Ee.uploadId),X.set(P,(ke==null?void 0:ke.fsEntry)??ke)}}catch(W){const xe=await Promise.allSettled(z.map(async ke=>await Pt(this.APIOrigin,this.authToken,"/fs/completeWrite",ke)));for(let ke=0;ke<xe.length;ke++){const P=xe[ke],Ee=Y[ke],J=z[ke];if(!(Ee===void 0||!J)){if((P==null?void 0:P.status)==="fulfilled"){T.delete(J.uploadId),X.set(Ee,((ct=P.value)==null?void 0:ct.fsEntry)??P.value);continue}ve.push({requestIndex:Ee,uploadId:J.uploadId,error:(P==null?void 0:P.status)==="rejected"?P.reason:W})}}}}if(ve.length>0){const N=Array.from(new Set(ve.map(z=>z.uploadId)));await Promise.allSettled(N.map(async z=>{T.delete(z),await Pt(this.APIOrigin,this.authToken,"/fs/abortWrite",{uploadId:z})})),ye.push(...ve)}},uc=pn.map((L,H)=>H),cc=yt(uc,Ap);for(const L of cc){const H=await Promise.allSettled(L.map(async $=>{await ac($)}));for(const $ of H)if($.status==="rejected")throw $.reason}this[Zs]=!0;const Ni=[...Ue.map(L=>({...L,stage:"upload"})),...ye.map(L=>({...L,stage:"complete"}))];if(Ni.length>0){const L=new Error("One or more signed batch file operations failed"),H=Ni.map($=>{var we,ue;const te=I[$.requestIndex],re=$p(t,te);return{requestIndex:$.requestIndex,uploadId:$.uploadId,stage:$.stage,path:re,name:typeof re=="string"&&re.length>0?j.basename(re):void 0,message:Up($.error),code:typeof((we=$.error)==null?void 0:we.code)=="string"?$.error.code:void 0,status:typeof((ue=$.error)==null?void 0:ue.status)=="number"?$.error.status:void 0}});throw L.partial=!0,L.failedItems=H,Object.assign(L,Op(H)),L.failedPaths=H.map($=>$.path).filter($=>typeof $=="string"&&$.length>0),L.completedItemCount=X.size,L.totalItemCount=I.length,L}const Ui=[];for(let L=0;L<I.length;L++){if(!X.has(L))throw new Error(`Missing signed batch response item at index ${L}`);Ui.push(X.get(L))}w(Math.max(0,v-A));let er=Ui;return er=er.length===1?er[0]:er,e.success&&typeof e.success=="function"&&e.success(er),c(er),!0}catch(I){if(M||I!=null&&I.aborted)return d(I),!0;const le=Ho(I);Ho(I)&&(this[Zs]=!1);try{await C()}catch{}return le?(delete s.abort,!1):(f(I),!0)}}const Wo=n=>!n||typeof n!="object"?!1:n.error===!0?!0:typeof n.status=="number"&&n.status!==200,zp=(n,e)=>{const t=n.length,r=e.length,s=r>0&&r===t,i=e.map(a=>a==null?void 0:a.message).find(a=>typeof a=="string"&&a.length>0);let o;return r===0?o="Upload partially failed: the server reported a failed operation.":s?o=`Upload failed: ${i??"the server did not report a reason"}`:o=`Upload partially failed: ${r} of ${t} operations failed (${i??"the server did not report a reason"})`,{message:o,code:s?"batch_upload_failed":"batch_upload_partially_failed",status:218,results:n,failedItems:e,failedCount:r,totalCount:t}};function Hp(n){var M;const{options:e,dirPath:t,operationId:r,xhr:s,files:i,dirs:o,thumbnails:a,resolve:u,error:l,flags:c}=n;let d=n.totalSize*2,f=0,g=0;const m=new FormData;o.sort((x,w)=>w.path.length-x.path.length);let b=[];for(let x=0;x<o.length;x++){for(let w=0;w<i.length;w++)!i[w].puter_path_param&&j.join(t,i[w].filepath).startsWith(`${o[x].path}/`)&&(i[w].puter_path_param=`$dir_${x}/${j.basename(i[w].filepath)}`);for(let w=0;w<o.length;w++)!o[w].puter_path_param&&o[w].path.startsWith(`${o[x].path}/`)&&(o[w].puter_path_param=`$dir_${x}/${j.basename(o[w].path)}`)}for(let x=0;x<o.length;x++){let w=j.dirname(o[x].puter_path_param||o[x].path),C=o[x].puter_path_param||o[x].path;w!=="/"&&(C=C.replace(w,"")),b.push({op:"mkdir",parent:w,path:C,overwrite:e.overwrite??!1,dedupe_name:e.dedupeName??!0,create_missing_ancestors:e.createMissingAncestors??!0,as:`dir_${x}`})}b.reverse(),m.append("operation_id",r),this.socket&&(m.append("socket_id",this.socket.id),m.append("original_client_socket_id",this.socket.id));for(let x=0;x<b.length;x++)m.append("operation",JSON.stringify(b[x]));if(!e.shortcutTo)for(let x=0;x<i.length;x++){const w=Qs(a[x]??e.thumbnail??void 0),C={name:i[x].name,type:i[x].type,size:i[x].size};w&&(C.thumbnail=w),m.append("fileinfo",JSON.stringify({...C}))}for(let x=0;x<i.length;x++){const w=Qs(a[x]??e.thumbnail??void 0),C={op:e.shortcutTo?"shortcut":"write",dedupe_name:e.dedupeName??!0,overwrite:e.overwrite??!1,thumbnail:w,create_missing_ancestors:e.createMissingAncestors||e.createMissingParents,operation_id:r,path:i[x].puter_path_param&&j.dirname(i[x].puter_path_param??"")||i[x].filepath&&j.join(t,j.dirname(i[x].filepath))||"",name:j.basename(i[x].filepath),item_upload_id:x,shortcut_to:e.shortcutTo,shortcut_to_uid:e.shortcutTo,app_uid:e.appUID};w===void 0&&delete C.thumbnail,m.append("operation",JSON.stringify(C))}if(!e.shortcutTo)for(let x=0;x<i.length;x++)m.append("file",i[x]??"");const v=x=>{x.operation_id===r&&(g+=x.loaded_diff)};(M=this.socket)==null||M.on("upload.progress",v);let A=null;s.open("post",`${this.APIOrigin}/batch`,!0),s.withCredentials=!0,s.setRequestHeader("Authorization",`Bearer ${this.authToken}`),s.upload.addEventListener("progress",function(x){let w;A===null?(w=x.loaded,A=0):w=x.loaded-A,A+=w,f+=w;let C=((g+f)/d*100).toFixed(2);C=C>100?100:C,e.progress&&typeof e.progress=="function"&&e.progress(r,C)});let k=setInterval(function(){let x=((g+f)/d*100).toFixed(2);x=x>100?100:x,e.progress&&typeof e.progress=="function"&&e.progress(r,x)},100);const T=()=>{var x;clearInterval(k),(x=this.socket)==null||x.off("upload.progress",v)};s.onabort=()=>{T(),e.abort&&typeof e.abort=="function"&&e.abort(r)},s.onreadystatechange=async()=>{if(s.readyState!==4)return;const x=await ts(s),w=Array.isArray(x==null?void 0:x.results)?x.results:null;if(s.status>=400&&s.status<600)return T(),l(x);if(e.strict&&s.status===218){T();const I=(w==null?void 0:w.find(Wo))??(w==null?void 0:w[0]);return l(I)}const C=w?w.filter(Wo):[];if(s.status===218||C.length>0)return T(),l(zp(w??[],C));if(!w||w.length===0)return T(),l({message:"Upload failed: the server returned no results.",code:"batch_upload_no_results",status:s.status,results:[],failedItems:[],failedCount:0,totalCount:0});const Ie=w.length===1?w[0]:w;return e.success&&typeof e.success=="function"&&e.success(Ie),T(),u(Ie)},!c.startCallbackFired&&e.start&&typeof e.start=="function"&&(e.start(),c.startCallbackFired=!0),s.send(m)}const Wp=async function(n,e,t={}){return new Promise(async(r,s)=>{if(!puter.authToken&&puter.env==="web")try{await puter.ui.authenticateWithPuter()}catch(x){return s(x)}const i=new AbortController,o=x=>{if(!i.signal.aborted)return Er(x,{method:"puter.fs.upload"}),t.error&&typeof t.error=="function"&&t.error(x),s(x)};let a=new XMLHttpRequest;if(e==="/")return o("Can not upload to root directory.");e=ee(e);const u=Pa(),l={startCallbackFired:!1};if(a.abort=()=>{var x;if(!i.signal.aborted){i.abort();try{(x=t.abort)==null||x.call(t,u)}finally{s({code:"upload_aborted",message:"Upload aborted."})}}},t.init&&typeof t.init=="function"&&t.init(u,a),i.signal.aborted)return;let c;try{c=await Sp(n,t)}catch(x){return o(x)}if(i.signal.aborted)return;let d,f,g,m;try{if({dirs:d,files:f,totalSize:g}=Cp(c,e,t),d.length===0&&f.length===0)return o({code:"EMPTY_UPLOAD",message:"No files or directories to upload."});m=await Mp(f,t,i.signal)}catch(x){return o(x)}if(i.signal.aborted)return;let b;if(puter.env!=="web"&&g>=Tp)try{if(b=await this.space(),b.capacity-b.used<g)return o({code:"NOT_ENOUGH_SPACE",message:"Not enough storage space available."})}catch{}if(i.signal.aborted)return;delete a.abort;const v=d.map(x=>x.path),k=this[Zs]!==!1,T=!t.shortcutTo&&(f.length>0||v.length>0)&&k,M={options:t,dirPath:e,operationId:u,xhr:a,files:f,dirs:d,signedDirectories:v,thumbnails:m,totalSize:g,flags:l,resolve:r,reject:s,error:o};try{if(T&&await jp.call(this,M))return;Hp.call(this,M)}catch(x){return o(x)}})},Gp=Wp,Vp=async function(n,e,t={}){if(!n)throw{code:"NO_TARGET_PATH",message:"No target path provided."};n instanceof File&&e===void 0&&(e=n,n=n.name);const r=t.overwrite??!0,s={...t,overwrite:r,dedupeName:t.dedupeName??(r?!1:void 0),strict:!0};n=ee(n);const i=j.basename(n),o=j.dirname(n);if(typeof e=="string"?e=new File([e??""],i??"Untitled.txt",{type:"text/plain"}):e instanceof Blob?e=new File([e??""],i??"Untitled",{type:e.type}):(e instanceof ArrayBuffer||ArrayBuffer.isView(e))&&(e=new File([e],i??"Untitled",{type:"application/octet-stream"})),e||(e=new File([e??""],i)),!(e instanceof File))throw{code:"field_invalid",message:"write() data parameter is an invalid type"};return this.upload(e,o,s)},Xp=Vp,Sn="last_valid_ts";class Jp extends Ne{constructor(t){super(t);p(this,"space",yp);p(this,"mkdir",sp);p(this,"copy",Vf);p(this,"rename",hp);p(this,"upload",Gp);p(this,"read",op);p(this,"delete",Xf);p(this,"move",ip);p(this,"write",Xp);p(this,"sign",bp);p(this,"getReadURL",Yf);p(this,"revokeReadURL",pp);p(this,"readdir",lp);p(this,"readdirSubdomains",dp);p(this,"stat",us);p(this,"share",gp);p(this,"unshare",wp);p(this,"listShared",rp);p(this,"listSharedByMe",np);p(this,"getShares",tp);p(this,"getShareLink",ep);p(this,"FSItem",Le);this.cacheUpdateTimer=null,t.socketEnabled&&this.initializeSocket(),t.onAuthStateChanged(()=>this.onAuthStateChanged())}initializeSocket(){this.socket&&this.socket.disconnect(),this.socket=$r(this.APIOrigin,{auth:{auth_token:this.authToken},autoUnref:this.shouldUseSocketAutoUnref(),transports:["websocket","polling"],withCredentials:!0}),this.bindSocketEvents()}shouldUseSocketAutoUnref(){return Js(this.puter)}bindSocketEvents(){this.socket.on("item.renamed",t=>{puter._cache.flushall()}),this.socket.on("item.removed",t=>{puter._cache.flushall()}),this.socket.on("item.added",t=>{puter._cache.del(`readdir:${j.dirname(t.path)}`),puter._cache.del(`item:${j.dirname(t.path)}`)}),this.socket.on("item.updated",t=>{puter._cache.flushall()}),this.socket.on("item.moved",t=>{puter._cache.flushall()}),this.socket.on("connect",()=>{puter.debugMode&&console.log("FileSystem Socket: Connected",this.socket.id)}),this.socket.on("disconnect",()=>{puter.debugMode&&console.log("FileSystem Socket: Disconnected")}),this.socket.on("reconnect",t=>{puter.debugMode&&console.log("FileSystem Socket: Reconnected",this.socket.id)}),this.socket.on("reconnect_attempt",t=>{puter.debugMode&&console.log("FileSystem Socket: Reconnection Attemps",t)}),this.socket.on("reconnect_error",t=>{puter.debugMode&&console.log("FileSystem Socket: Reconnection Error",t)}),this.socket.on("reconnect_failed",()=>{puter.debugMode&&console.log("FileSystem Socket: Reconnection Failed")}),this.socket.on("error",t=>{puter.debugMode&&console.error("FileSystem Socket Error:",t)})}onAuthStateChanged(){this.puter.env==="gui"&&(this.checkCacheAndPurge(),this.startCacheUpdateTimer()),this.puter.socketEnabled&&this.initializeSocket()}invalidateCache(){localStorage.setItem(Sn,"0"),puter._cache.flushall()}async getCacheTimestamp(){return new Promise((t,r)=>{const s=Zt("/cache/last-change-timestamp",this.APIOrigin,this.authToken,"get","application/json");Lt(s,void 0,void 0,async i=>{try{const o=typeof i=="string"?JSON.parse(i):i;t(o.timestamp||Date.now())}catch{r(new Error("Failed to parse response"))}},r),s.send()})}async checkCacheAndPurge(){try{const t=await this.getCacheTimestamp(),r=parseInt(localStorage.getItem(Sn))||0;t-r>2e3&&(puter._cache.flushall(),localStorage.setItem(Sn,"0"))}catch(t){console.error("Error checking cache timestamp:",t)}}startCacheUpdateTimer(){this.puter.env==="gui"&&(this.stopCacheUpdateTimer(),this.cacheUpdateTimer=setInterval(()=>{localStorage.setItem(Sn,Date.now().toString())},1e3))}stopCacheUpdateTimer(){this.cacheUpdateTimer&&(clearInterval(this.cacheUpdateTimer),this.cacheUpdateTimer=null)}}const Kp=/^[a-z0-9]+\.puter\.(site|com)$/,cs=n=>typeof n=="string"&&Kp.test(n)?n.split(".")[0]:n;async function Yp(n,e){const{puter:t}=this;let r;if(typeof n=="string"){const s=cs(n);r=e!==void 0?{subdomain:s,root_dir:e&&ee(e)}:{subdomain:s}}else r=n;return await B({iface:"puter-subdomains",method:"create",argNames:["object"],puter:t})({object:r})}async function Zp(n){const{puter:e}=this,t=typeof n=="string"?{id:{subdomain:cs(n)}}:{};return await B({iface:"puter-subdomains",method:"delete",argNames:["uid"],puter:e})(t)}async function Qp(n){const{puter:e}=this,t=typeof n=="string"?{id:{subdomain:cs(n)}}:{};return await B({iface:"puter-subdomains",method:"read",argNames:["uid"],puter:e,readonly:!0})(t)}const Bs=n=>n.filter(e=>!e.subdomain.startsWith("workers.puter."));function em(...n){const{puter:e}=this,t=B({iface:"puter-subdomains",method:"select",puter:e,readonly:!0}),r=typeof n[0]=="object"&&n[0]!==null?n[0]:{},{limit:s,offset:i,cursor:o,includeTotal:a,stream:u,success:l,error:c,...d}=r,f=Object.prototype.hasOwnProperty.call(r,"cursor"),g={...d};s!==void 0&&(g.limit=s);const m=k=>t({...g,...k});if(u===!0){if(i!==void 0)throw new D("`offset` cannot be combined with `stream`; pass `cursor` to resume from a position.","invalid_request");return async function*(){for await(const k of Je(m,{cursor:o,includeTotal:a===!0}))yield{...k,items:Bs(k.items??[])}}()}if(s!==void 0||i!==void 0||f||a!==void 0)return(async()=>{const k=await t(r);return k&&!Array.isArray(k)&&Array.isArray(k.items)?k:Bs(k)})();const b=Qt(m).then(k=>Bs(k)),v=typeof n[0]=="function"?n[0]:l,A=typeof n[0]=="function"?n[1]:c;return(typeof v=="function"||typeof A=="function")&&b.then(k=>{typeof v=="function"&&v(k)},k=>{typeof A=="function"&&A(k)}),b}async function tm(n,e){const{puter:t}=this;let r={};if(typeof n=="string"){const s=e?ee(e):e??null;r={id:{subdomain:cs(n)},object:{root_dir:s}}}return await B({iface:"puter-subdomains",method:"update",argNames:["object"],puter:t})(r)}class rm extends Ne{constructor(t){super(t);p(this,"list",em);p(this,"create",Yp);p(this,"update",tm);p(this,"get",Qp);p(this,"delete",Zp);const r=this;for(const s of["list","create","update","get","delete"])r[s]=r[s].bind(this)}}const nm=rm,ce=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Si=n=>ce(n)&&Object.prototype.hasOwnProperty.call(n,"appUuid"),sm=n=>ce(n)&&Object.prototype.hasOwnProperty.call(n,"key"),ei=n=>{n[0]===void 0&&n.shift();const e=ce(n[0])?n.shift():void 0,t=typeof n[0]=="function"?n.shift():void 0,r=typeof n[0]=="function"?n.shift():void 0;return{optConfig:e,success:t,error:r}},Ci=n=>ce(n[0])?{optConfig:n[0],success:n[1],error:n[2]}:{success:n[0],error:n[1]},_u=(n,e,t)=>{if(ce(n)&&e===void 0&&t===void 0)return{...n};if(n===void 0&&e===void 0&&t===void 0)throw{message:"Arguments are required",code:"arguments_required"};return Si(e)&&t===void 0&&(t=e,e=void 0),{key:n,pathAndAmountMap:e==null?{"":1}:typeof e=="number"?{"":e}:e,optConfig:t}},ti=1024,ri=399*1024,at=n=>{if(n==null)throw{message:"Key cannot be undefined",code:"key_undefined"}},Ke=n=>{if(n.length>ti)throw{message:`Key size cannot be larger than ${ti}`,code:"key_too_large"}},Au=n=>{if(n&&n.length>ri)throw{message:`Value size cannot be larger than ${ri}`,code:"value_too_large"}};async function im(n,e,t){let r;if(ce(n)&&e===void 0&&t===void 0)r={...n};else{if(n===void 0&&e===void 0&&t===void 0)throw{message:"Arguments are required",code:"arguments_required"};let s=e;Si(s)&&t===void 0&&(t=s,s=void 0);const i=s&&typeof s=="object"&&!Array.isArray(s);r={key:n,pathAndValueMap:s===void 0?{"":1}:i?s:{"":s},optConfig:t}}return at(r.key),Ke(r.key),await B({iface:"puter-kvstore",method:"add",argNames:["key"],puter:this.puter})(r)}async function om(n,e,t){const r=_u(n,e,t);return at(r.key),Ke(r.key),await B({iface:"puter-kvstore",method:"decr",argNames:["key"],puter:this.puter})(r)}const Go=(n,e)=>B({iface:"puter-kvstore",method:"del",argNames:["key"],puter:n,preprocess:t=>(at(t.key),Ke(t.key),t)})(e);async function am(n,...e){const{puter:t}=this;if(ce(n)&&e.length===0)return await Go(t,n);const{optConfig:r,success:s,error:i}=Ci(e);return await Go(t,{key:n,optConfig:r,success:s,error:i})}async function um(n,e,t){return at(n),Ke(n),await B({iface:"puter-kvstore",method:"expire",argNames:["key","ttl"],puter:this.puter})({key:n,ttl:e,optConfig:t})}async function cm(n,e,t){return at(n),Ke(n),await B({iface:"puter-kvstore",method:"expireAt",argNames:["key","timestamp"],puter:this.puter})({key:n,timestamp:e,optConfig:t})}const Ms=(n,e)=>B({iface:"puter-kvstore",method:"flush",puter:n})(e);async function Vo(n,...e){const{puter:t}=this;if(ce(n)&&e.length===0){const o=n;return Object.prototype.hasOwnProperty.call(o,"optConfig")||Object.prototype.hasOwnProperty.call(o,"success")||Object.prototype.hasOwnProperty.call(o,"error")?await Ms(t,o):await Ms(t,{optConfig:o})}const{optConfig:r,success:s,error:i}=Ci([n,...e]);return await Ms(t,{optConfig:r,success:s,error:i})}const Xo=(n,e)=>B({iface:"puter-kvstore",method:"get",argNames:["key"],puter:n,readonly:!0,preprocess:t=>(at(t.key),Ke(t.key),t)})(e);async function lm(n,...e){const{puter:t}=this;if(ce(n)&&e.length===0)return await Xo(t,n);const r=n,{optConfig:s,success:i,error:o}=Ci(e);if(!s&&this.guiCache.serves(r)){const a=await this.guiCache.lookup(r);if(a.hit)return a.value}return await Xo(t,{key:r,optConfig:s,success:i,error:o})}async function dm(n,e,t){const r=_u(n,e,t);return at(r.key),Ke(r.key),await B({iface:"puter-kvstore",method:"incr",argNames:["key"],puter:this.puter})(r)}const Cn=["has_set_default_app_user_permissions","window_sidebar_width","sidebar_items","menubar_style","user_preferences.auto_arrange_desktop","user_preferences.show_hidden_files","user_preferences.language","user_preferences.clock_visible","toolbar_auto_hide_enabled","has_seen_welcome_window","desktop_item_positions","desktop_icons_hidden","taskbar_position","has_seen_toolbar_animation"],hm=4e3,Jo=()=>{let n=()=>{},e=()=>{};return{promise:new Promise((r,s)=>{n=r,e=s}),resolve:n,reject:e}};class fm{constructor(e){this.puter=e,this.batch=Jo(),this.init=Jo(),(async()=>{await this.init.promise,this.init=null;let t;try{t=await Ia({puter:e,iface:"puter-kvstore",method:"get",args:{key:Cn}})}catch{t=null}const r=()=>{setTimeout(()=>{this.batch=null},hm)};if(!Array.isArray(t==null?void 0:t.result)){this.batch.resolve(null),r();return}const s={};for(let i=0;i<Cn.length;i++)s[Cn[i]]=t.result[i];this.batch.resolve(s),r()})()}serves(e){return typeof e=="string"&&Cn.includes(e)&&this.batch!==null}async lookup(e){this.init&&this.init.resolve();const t=await this.batch.promise;return t===null?{hit:!1}:{hit:!0,value:t[e]??null}}}const Ko=1e3,Yo=new WeakMap,Zo=(n,e,t)=>{const r=Yo.get(n)??Yo.set(n,new Set).get(n);if(!r.has(e)){r.add(e);try{console.warn(`puter.kv.list: ${t}`)}catch{}}},pm=n=>{if(typeof n!="string")return;const e=n.trim();if(e!==""){if(e.endsWith("*")){const t=e.slice(0,-1);return t===""?void 0:t}return e}};function mm(n,e,t){const r={};let s,i=!1,o=!1,a,u=!1,l=!1;if(ce(n)&&e===void 0&&t===void 0){const m=n;if(m.reverse!==void 0){if(typeof m.reverse!="boolean")throw{message:"reverse must be a boolean",code:"invalid_request"};r.reverse=m.reverse}if(typeof m.pattern=="string"&&(s=m.pattern),i=!!m.returnValues,o=m.stream===!0,ce(m.optConfig))r.optConfig=m.optConfig;else if(Si(m))if(o){const b={...m};delete b.stream,r.optConfig=b}else r.optConfig=m;for(const b of["limit","cursor","offset","includeTotal","fetchUntilFull"])m[b]!==void 0&&(r[b]=m[b],l=!0);a=m.cursor,u=m.includeTotal===!0}else typeof n=="string"?s=n:n===!0&&(i=!0),e===!0?i=!0:ce(e)&&(r.optConfig=e),ce(t)&&(r.optConfig=t);i||(r.as="keys");const d=pm(s);d&&(r.pattern=d),u&&Zo(this,"includeTotal","`includeTotal` runs a metered count over every key matching the query, so its cost grows with the store. Request the total once — on the first page — and avoid it in hot paths; to know whether more pages exist, check for `cursor` instead.");const f=B({iface:"puter-kvstore",method:"list",puter:this.puter,readonly:!0});if(o){if(r.offset!==void 0)throw{message:"`offset` cannot be combined with `stream`; pass `cursor` to resume from a position.",code:"invalid_request"};const m={...r};return delete m.cursor,delete m.includeTotal,m.limit===void 0&&(m.limit=Ko,m.fetchUntilFull=!0),Je(v=>f({...m,...v}),{cursor:a,includeTotal:u})}return l?f(r):Qt(m=>(m.cursor!==null&&Zo(this,"unbound-scan","a full listing spanned multiple pages; unbounded scans are metered and get slower as the store grows. Prefer `stream: true`, `limit`/`cursor` pages, or a narrower `pattern`."),f({...r,limit:Ko,fetchUntilFull:!0,...m})))}async function gm(n,...e){if(e.length===0)throw{message:"At least one path is required",code:"arguments_required"};const t=[...e];let r;if(ce(t[t.length-1])&&(r=t.pop()),Array.isArray(t[0])&&t.length===1)throw{message:"Paths must be provided as separate arguments",code:"paths_invalid"};if(at(n),Ke(n),t.length===0)throw{message:"At least one path is required",code:"arguments_required"};if(t.some(s=>typeof s!="string"))throw{message:"All paths must be strings",code:"paths_invalid"};return await B({iface:"puter-kvstore",method:"remove",argNames:["key","paths"],puter:this.puter})({key:n,paths:t,optConfig:r})}const Qo=(n,e)=>B({iface:"puter-kvstore",method:"set",argNames:["key","value","expireAt"],puter:n,preprocess:t=>(at(t.key),Ke(t.key),Au(t.value),t)})(e),ea=(n,e)=>B({iface:"puter-kvstore",method:"batchPut",argNames:["items"],puter:n,preprocess:t=>{if(!Array.isArray(t.items)||t.items.length===0)throw{message:"Items are required",code:"items_required"};const r=t.items.map(s=>{if(!sm(s))throw{message:"Each item must include a key",code:"invalid_item"};const i=String(s.key);if(i.length===0)throw{message:"Key cannot be undefined",code:"key_undefined"};return Ke(i),Au(s.value),{key:i,value:s.value,...s.expireAt!==void 0?{expireAt:s.expireAt}:{}}});return{...t,items:r}}})(e);async function bm(n,e,...t){const{puter:r}=this;if(Array.isArray(n)){const u=[e,...t],{optConfig:l,success:c,error:d}=ei(u);return await ea(r,{items:n,optConfig:l,success:c,error:d})}if(ce(n)&&e===void 0&&t.length===0)return Array.isArray(n.items)?await ea(r,n):await Qo(r,n);let s;t[0]!==void 0&&!ce(t[0])&&typeof t[0]!="function"&&(s=t.shift());const{optConfig:i,success:o,error:a}=ei(t);return await Qo(r,{key:n,value:e,expireAt:s,optConfig:i,success:o,error:a})}const ta=(n,e)=>B({iface:"puter-kvstore",method:"update",argNames:["key","pathAndValueMap","ttl"],puter:n,preprocess:t=>{if(at(t.key),Ke(t.key),t.pathAndValueMap===void 0||t.pathAndValueMap===null||Array.isArray(t.pathAndValueMap)||typeof t.pathAndValueMap!="object")throw{message:"pathAndValueMap must be an object",code:"path_map_invalid"};if(Object.keys(t.pathAndValueMap).length===0)throw{message:"pathAndValueMap cannot be empty",code:"path_map_invalid"};if(t.ttl===""||t.ttl===!1)delete t.ttl;else if(t.ttl!==void 0&&t.ttl!==null){const r=typeof t.ttl=="number"||typeof t.ttl=="string"&&t.ttl.trim()!==""?Number(t.ttl):NaN;if(!Number.isFinite(r))throw{message:"ttl must be a number",code:"ttl_invalid"};t.ttl=r}return t}})(e);async function ym(n,e,...t){const{puter:r}=this;if(ce(n)&&e===void 0&&t.length===0)return await ta(r,n);let s;t[0]!==void 0&&!ce(t[0])&&typeof t[0]!="function"&&(s=t.shift());const{optConfig:i,success:o,error:a}=ei(t);return await ta(r,{key:n,pathAndValueMap:e,ttl:s,optConfig:i,success:o,error:a})}class wm extends Ne{constructor(t){super(t);p(this,"guiCache");p(this,"MAX_KEY_SIZE",ti);p(this,"MAX_VALUE_SIZE",ri);p(this,"set",bm);p(this,"get",lm);p(this,"del",am);p(this,"incr",dm);p(this,"decr",om);p(this,"add",im);p(this,"remove",gm);p(this,"update",ym);p(this,"expire",um);p(this,"expireAt",cm);p(this,"list",mm);p(this,"flush",Vo);p(this,"clear",Vo);this.guiCache=new fm(t);const r=this;for(const s of["set","get","del","incr","decr","add","remove","update","expire","expireAt","list","flush"])r[s]=r[s].bind(this);this.clear=this.flush}}const vm=wm;var vt,Ft;class Ii{constructor(e){E(this,vt);E(this,Ft);y(this,vt,e),y(this,Ft,(()=>{const t=new Map;for(let r of h(this,vt))t[r]=[];return t})())}emit(e,t){if(!h(this,vt).includes(e)){console.error(`Event name '${e}' not supported`);return}h(this,Ft)[e].forEach(r=>{r(t)})}on(e,t){if(!h(this,vt).includes(e)){console.error(`Event name '${e}' not supported`);return}return h(this,Ft)[e].push(t),this}off(e,t){if(!h(this,vt).includes(e)){console.error(`Event name '${e}' not supported`);return}const r=h(this,Ft)[e],s=r.indexOf(t);return s!==-1&&r.splice(s,1),this}}vt=new WeakMap,Ft=new WeakMap;const Jn=1,Gr=2,Kn=3,Vr=4,Xr=5,xm=1,_m=new TextDecoder,ra=new TextEncoder,Am={1:"Reason unspecified or unknown. Returning a more specific reason should be preferred.",3:"Unexpected stream closure due to a network error.",65:"Stream creation failed due to invalid information. This could be sent if the destination was a reserved address or the port is invalid.",66:"Stream creation failed due to an unreachable destination host. This could be sent if the destination is an domain which does not resolve to anything.",67:"Stream creation timed out due to the destination server not responding.",68:"Stream creation failed due to the destination server refusing the connection.",71:"TCP data transfer timed out.",72:"Stream destination address/domain is intentionally blocked by the proxy server.",73:"Connection throttled by the server."};function km(n){const e=new DataView(n.buffer,n.byteOffset),t=e.getUint8(0),r=e.getUint32(1,!0);switch(t){case Jn:const s=e.getUint8(5),i=e.getUint16(6,!0),o=_m.decode(n.subarray(8,n.length));return{packetType:t,streamID:r,streamType:s,port:i,hostname:o};case Gr:const a=n.subarray(5,n.length);return{packetType:t,streamID:r,payload:a};case Kn:const u=e.getUint32(5,!0);return{packetType:t,streamID:r,remainingBuffer:u};case Vr:const l=e.getUint8(5);return{packetType:t,streamID:r,reason:l};case Xr:const c={};c.version_major=e.getUint8(5),c.version_minor=e.getUint8(6);let d=7;for(;d<n.length;){const f=e.getUint8(d),g=e.getUint32(d+1,!0),m=n.subarray(d+5,d+5+g);c[f]=m,d+=5+g}return{packetType:t,streamID:r,infoObj:c}}}function In(n){let e=5;switch(n.packetType){case Jn:n.hostEncoded=ra.encode(n.hostname),e+=3+n.hostEncoded.length;break;case Gr:e+=n.payload.byteLength;break;case Kn:e+=4;break;case Vr:e+=1;break;case Xr:e+=2,n.password&&(e+=6),n.puterAuth&&(n.passwordEncoded=ra.encode(n.puterAuth),e+=8+n.passwordEncoded.length);break;default:throw new Error("Not supported")}let t=new Uint8Array(e);const r=new DataView(t.buffer);switch(r.setUint8(0,n.packetType),r.setUint32(1,n.streamID,!0),n.packetType){case Jn:r.setUint8(5,n.streamType),r.setUint16(6,n.port,!0),t.set(n.hostEncoded,8);break;case Gr:t.set(n.payload,5);break;case Kn:r.setUint32(5,n.remainingBuffer,!0);break;case Vr:r.setUint8(5,n.reason);break;case Xr:r.setUint8(5,2),r.setUint8(6,0),n.password&&(r.setUint8(7,2),r.setUint32(8,1,!0),r.setUint8(12,0)),n.puterAuth&&(r.setUint8(7,2),r.setUint32(8,5+n.passwordEncoded.length,!0),r.setUint8(12,0),r.setUint16(13,n.passwordEncoded.length,!0),t.set(n.passwordEncoded,15))}return t}class Em{constructor(e,t){p(this,"_ws");p(this,"_nextStreamID",1);p(this,"_bufferMax");p(this,"_ready",!1);p(this,"onReady");p(this,"onError");p(this,"streamMap",new Map);const r=()=>{this._ws=new WebSocket(e),this._ws.binaryType="arraybuffer",this._ws.onerror=()=>{this._fail(new Error(`Wisp relay connection failed: ${e}`))},this._ws.onclose=()=>{if(this._ready){setTimeout(r,1e3);return}this._fail(new Error("Wisp relay closed before the handshake completed"))},this._ws.onmessage=s=>{const i=km(new Uint8Array(s.data));switch(i.packetType){case Gr:this.streamMap.get(i.streamID).dataCallBack(i.payload.slice(0));break;case Kn:if(i.streamID===0){this._bufferMax=i.remainingBuffer,this._ready=!0,this.onReady&&this.onReady();return}this.streamMap.get(i.streamID).buffer=i.remainingBuffer,this._continue(i.streamID);break;case Vr:i.streamID!==0&&this.streamMap.get(i.streamID).closeCallBack(i.reason);break;case Xr:t&&this._ws.send(In({packetType:Xr,streamID:0,puterAuth:t}));break}}};r()}_fail(e){const t=this.onError;this.onError=void 0,t&&t(e)}_continue(e){const t=this.streamMap.get(e).queue;for(let r=0;r<t.length;r++)this.write(e,t.shift())}register(e,t,r){const s=this._nextStreamID++;return this.streamMap.set(s,{queue:[],streamID:s,buffer:this._bufferMax,dataCallBack:r.dataCallBack,closeCallBack:r.closeCallBack}),this._ws.send(In({packetType:Jn,streamType:xm,streamID:s,hostname:e,port:t})),s}write(e,t){const r=this.streamMap.get(e);r.buffer>0?(r.buffer--,this._ws.send(In({packetType:Gr,streamID:e,payload:t}))):r.queue.push(t)}close(e){this._ws.send(In({packetType:Vr,streamID:e,reason:2}))}}const Dm=new TextEncoder,Tm=!0;let et={server:"wss://puter.cafe/",handler:void 0};class ku extends Ii{constructor(t,r){super(["data","drain","open","error","close","tlsdata","tlsopen","tlsclose"]);p(this,"_events",new Map);p(this,"_streamID");(async()=>{if(!puter.authToken&&puter.env==="web"&&Tm)try{await puter.ui.authenticateWithPuter()}catch(i){throw i}if(!et.handler){const{token:i,server:o}=await(await G(`${puter.APIOrigin}/wisp/relay-token/create`,{method:"POST",includePuterAuth:!!puter.authToken,headers:{"Content-Type":"application/json"},body:JSON.stringify({})})).json();et.handler=new Em(o,i);try{await new Promise((a,u)=>{et.handler.onReady=a,et.handler.onError=u})}catch(a){throw et.handler=void 0,a}}const s={dataCallBack:i=>{this.emit("data",i)},closeCallBack:i=>{if(i!==2){this.emit("error",new Error(Am[i])),this.emit("close",!0);return}this.emit("close",!1)}};this._streamID=et.handler.register(t,r,s),setTimeout(()=>{this.emit("open",void 0)},0)})().catch(s=>{this.emit("error",s instanceof Error?s:new Error(String(s))),this.emit("close",!0)})}addListener(...t){this.on(...t)}write(t,r){if(t.buffer)et.handler.write(this._streamID,t),r&&r();else if(t.resize)et.handler.write(this._streamID,new Uint8Array(t)),r&&r();else if(typeof t=="string")et.handler.write(this._streamID,Dm.encode(t)),r&&r();else throw new Error("Invalid data type (not TypedArray, ArrayBuffer or String!!)")}close(){et.handler.close(this._streamID)}}let Ln;class Sm extends ku{constructor(...e){super(...e),super.on("open",async()=>{Ln||(globalThis.ReadableByteStreamController||await Wi(()=>import("https://unpkg.com/web-streams-polyfill@3.0.2/dist/polyfill.js"),[]),Ln=await Wi(()=>import("https://puter-net.b-cdn.net/rustls.js"),[]),await Ln.default("https://puter-net.b-cdn.net/rustls.wasm"));let t=!1;const r=new ReadableStream({start:l=>{super.on("data",c=>{l.enqueue(c.buffer)}),super.on("close",()=>{t||l.close()})},pull:l=>{},cancel:()=>{t=!0}}),s=new WritableStream({write:l=>{super.write(l)},abort:()=>{super.close()},close:()=>{super.close()}});let i,o;try{const l=await Ln.connect_tls(r,s,e[0]);i=l.read,o=l.write}catch(l){this.emit("error",new Error(`TLS Handshake failed: ${l}`));return}this.writer=o.getWriter();let a=i.getReader(),u=!1;this.emit("tlsopen",void 0);try{for(;!u;){const{done:l,value:c}=await a.read();u=l,u||this.emit("tlsdata",c)}this.emit("tlsclose",!1)}catch(l){this.emit("error",l),this.emit("tlsclose",!0)}})}on(e,t){return e==="data"||e==="open"||e==="close"?super.on(`tls${e}`,t):super.on(e,t)}write(e,t){if(e.buffer)this.writer.write(e.slice(0).buffer).then(t);else if(e.resize)this.writer.write(e).then(t);else if(typeof e=="string")this.writer.write(e).then(t);else throw new Error("Invalid data type (not TypedArray, ArrayBuffer or String!!)")}}function Cm(...n){const e=n.reduce((r,s)=>r+s.length,0),t=new Uint8Array(e);return n.forEach((r,s,i)=>{const o=i.slice(0,s).reduce((a,u)=>a+u.length,0);t.set(r,o)}),t}function Im(n){const e=n.split(`\r
`),t=e.shift().split(" "),r=Number(t[1]),s=t.slice(2).join(" ")||"",i=[];for(const o of e){const a=o.split(": "),u=a[0],l=a.slice(1).join(": ");i.push([u,l])}return{headers:new Headers(i),statusText:s,status:r}}function Lm(...n){return new Promise(async(e,t)=>{var s,i,o,a,u;let r;try{r=new Request(...n);const l=new URL(r.url);let c=new Headers(r.headers),d;if(l.protocol==="http:")d=new puter.net.Socket(l.hostname,l.port||80);else if(l.protocol==="https:")d=new puter.net.tls.TLSSocket(l.hostname,l.port||443);else{const I=`Failed to fetch. URL scheme "${l.protocol}" is not supported.`;(i=(s=globalThis.puter)==null?void 0:s.apiCallLogger)!=null&&i.isEnabled()&&globalThis.puter.apiCallLogger.logRequest({service:"network",operation:"pFetch",params:{url:r.url,method:r.method},error:{message:I}}),t(I);return}if(!c.get("user-agent")){const I=(o=globalThis.navigator)==null?void 0:o.userAgent;I&&c.set("user-agent",I)}let f=`${r.method} ${l.pathname}${l.search} HTTP/1.1\r
Host: ${l.host}\r
Connection: close\r
`;for(const[I,le]of c)f+=`${I}: ${le}\r
`;let g;if(r.body){if(g=new Uint8Array(await r.arrayBuffer()),!c.has("content-length"))c.set("content-length",g.length);else if(c.get("content-length")!==String(g.length))return t("Content-Length header does not match the body length. Please check your request.");f+=`Content-Length: ${g.length}\r
`}f+=`\r
`,d.on("open",async()=>{d.write(f),g&&d.write(g)});const m=new TextDecoder;let b="",v=-1;const A=[];let k=!1,T=-1,M=0,x=!1,w=-1,C=new Uint8Array(0);const Ie=new ReadableStream({start(I){function le(ae){const de=new Uint8Array(C.length+ae.length);for(de.set(C,0),de.set(ae,C.length),C=de;;)if(w>0)if(C.length>=w+2){const X=C.slice(0,w);I.enqueue(X),C=C.slice(w+2),w=0}else{I.enqueue(C),w-=C.length,C=new Uint8Array(0);break}else{let X=-1;for(let ye=0;ye+1<C.length;ye++)if(C[ye]===13&&C[ye+1]===10){X=ye;break}if(X<0)break;const Ue=m.decode(C.slice(0,X)).trim();if(w=parseInt(Ue,16),isNaN(w)&&I.error("Invalid chunk length from server"),C=C.slice(X+2),w===0){k=!0,I.close();return}}}d.on("data",ae=>{var de,X;if(v!==-1&&!x&&(I.enqueue(ae),M+=ae.length),v===-1&&(A.push(ae),b+=m.decode(ae,{stream:!0})),x&&le(ae),b.indexOf(`\r
\r
`)!==-1){v=b.indexOf(`\r
\r
`),b=b.slice(0,v);const Ue=Im(b);T=Number(Ue.headers.get("content-length")),x=Ue.headers.get("transfer-encoding")==="chunked",(X=(de=globalThis.puter)==null?void 0:de.apiCallLogger)!=null&&X.isEnabled()&&globalThis.puter.apiCallLogger.logRequest({service:"network",operation:"pFetch",params:{url:r.url,method:r.method},result:{status:Ue.status,statusText:Ue.statusText}}),e(new Response(Ie,Ue));const ye=Cm(...A).slice(v+4);x?le(ye):(M+=ye.length,I.enqueue(ye))}T!==-1&&M===T&&!x&&(k||(k=!0,I.close()))}),d.on("close",()=>{k||(k=!0,I.close())}),d.on("error",ae=>{var de,X;(X=(de=globalThis.puter)==null?void 0:de.apiCallLogger)!=null&&X.isEnabled()&&globalThis.puter.apiCallLogger.logRequest({service:"network",operation:"pFetch",params:{url:r.url,method:r.method},error:{message:`Socket errored with the following reason: ${ae}`}}),t(`Socket errored with the following reason: ${ae}`)})}})}catch(l){(u=(a=globalThis.puter)==null?void 0:a.apiCallLogger)!=null&&u.isEnabled()&&globalThis.puter.apiCallLogger.logRequest({service:"network",operation:"pFetch",params:{url:r==null?void 0:r.url,method:r==null?void 0:r.method},error:{message:(l==null?void 0:l.message)||String(l),stack:l==null?void 0:l.stack}}),t(l)}})}const Eu=n=>typeof n[0]=="object"&&n[0]!==null?n[0]:{success:n[0],error:n[1]},Rm=1e3;function Pm(...n){const{puter:e}=this,t=Eu(n);let r="";t!=null&&t.query&&(r=`?${new URLSearchParams(t.query).toString()}`);const s=`os:user:${e.APIOrigin}:${e.authToken}:${r}`;return rs(s,()=>new Promise((o,a)=>{const u=Zt(`/whoami${r}`,e.APIOrigin,e.authToken,"get");Lt(u,void 0,void 0,o,a),u.send()}),{windowMs:Rm}).then(o=>{var a;return(a=t.success)==null||a.call(t,o),o},o=>{var a;throw(a=t.error)==null||a.call(t,o),o})}function Bm(...n){const{puter:e}=this,t=Eu(n);return new Promise((r,s)=>{const i=Zt("/version",e.APIOrigin,e.authToken,"get");Lt(i,t.success,t.error,r,s),i.send()})}class Mm extends Ne{constructor(t){super(t);p(this,"user",Pm);p(this,"version",Bm);const r=this;for(const s of["user","version"])r[s]=r[s].bind(this)}}const qm=Mm,na=["Desktop","Documents","Pictures","Videos"],me=n=>new D(n,"invalid_argument"),Fm=n=>{if(n!=="read"&&n!=="write")throw me("access must be `read` or `write`");return n},Nm=n=>{if(typeof n!="string"||!na.includes(n))throw me(`folder name must be one of: ${na.join(", ")}`);return n},ls={read:["get","list"],write:["set","add","incr","decr","update"],delete:["del","remove","expire","expireAt"]},Du=["read","write","delete"],Um=Object.values(ls).flat(),Om=["flush"],$m=/^app-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,St=me,sa=(n,e)=>{if(n==null)return[];const t=Array.isArray(n)?n:[n];for(const r of t){if(typeof r!="string"||r==="")throw St(`${e} scopes must be non-empty strings`);if(e==="kv"&&Om.includes(r))throw St(`kv:${r} cannot be granted to another app`);if(!(e==="kv"?[...Um,...Object.keys(ls)]:Du).includes(r))throw St(`unknown ${e} scope: ${r}`)}return[...new Set(t)]},jm=n=>{const e=new Set(n),t=[];for(const[r,s]of Object.entries(ls)){if(e.has(r)){t.push(r);for(const i of s)e.delete(i);e.delete(r);continue}if(s.every(i=>e.has(i))){t.push(r);for(const i of s)e.delete(i)}}return[...t,...e]};function zm(n,e){const t=jm(sa(e.kv,"kv")),r=sa(e.fs,"fs");if(t.length===0&&r.length===0)throw St("at least one `kv` or `fs` scope is required");const s=Object.keys(ls).every(a=>t.includes(a)),i=Du.every(a=>r.includes(a));if(s&&i)return[`app-data:${n}`];const o=[];if(s)o.push(`app-data:${n}:kv`);else for(const a of t)o.push(`app-data:${n}:kv:${a}`);if(i)o.push(`app-data:${n}:fs`);else for(const a of r)o.push(`app-data:${n}:fs:${a}`);return o.sort()}const Hm=n=>{if(typeof n=="string")return{kv:n,fs:n};if(Array.isArray(n)){const e={kv:[],fs:[]};for(const t of n){if(typeof t!="string"||!t.includes(":"))throw St(`scope must look like "kv:get" or "fs:read": ${t}`);const[r,s]=t.split(":");if(r!=="kv"&&r!=="fs")throw St(`unknown store: ${r}`);e[r].push(s)}return e}if(n&&typeof n=="object")return n;throw St("scopes must be a string, an array, or an object")};async function Tu(n,e,t){var i;const r=typeof e=="object"&&e!==null?e.uid??e.name:e;if(typeof r!="string"||r==="")throw St("parameter appIdentifier must be a non-empty string");const s=$m.test(r)?r:(i=await n.apps.get(r))==null?void 0:i.uid;if(typeof s!="string"||s==="")throw new D(`app not found: ${r}`,"not_found");return s===n.appID?[]:zm(s,Hm(t))}async function Wm(n,e){const t=await Tu(this.puter,n,e);return t.length===0?!0:await this.puter.ui.requestPermission({permissions:t})}const Su=n=>`user:${n}:email:read`,Cu=(n,e)=>`apps-of-user:${n}:${e}`,Iu=(n,e)=>`subdomains-of-user:${n}:${e}`,Lu=(n,e)=>`fs:${n}:${e}`,Ru=(n,e)=>`app-root-dir:${n}:${e}`;async function gt(n,e,t){var r;try{const s=await G(n.APIOrigin+e,{method:t?"POST":"GET",includePuterAuth:!0,headers:{"Content-Type":"application/json"},...t?{body:JSON.stringify(t)}:{}});if((r=s.headers.get("content-type"))!=null&&r.includes("application/json")){const i=await s.json();return s.status!==200&&(i.error=!0),i}return{error:!0,message:await s.text(),code:"unknown_error"}}catch(s){return{error:!0,message:s.message,code:"internal_error"}}}const Pu="/auth/request-app-root-dir",ia=5e3,oa=100;function Un(n){const e=typeof n=="object"&&n!==null?n.uid:n;if(typeof e!="string")throw me("parameter app_uid must be a string");return e}async function Yn(n,e,t){return await gt(n,Pu,{app_uid:e,access:t})}async function Gm(n,e,t){const r=await gt(n,Pu,{app_uid:e,access:t,check:!0});if(!r.error)return!0;if(r.code==="forbidden")return!1;throw new D(r.message??"app root dir check failed",r.code??"unknown_error")}async function Bu(n,e,t){let r=await Yn(n,e,t),s=oa,i=0;for(;r.error&&i<ia;)await new Promise(o=>setTimeout(o,s)),i+=s,r=await Yn(n,e,t),s=Math.min(s*2,Math.max(oa,ia-i));return r.error?void 0:r}async function Mu(n,e,t){const r=Un(t),s=await Yn(n,r,e);if(!s.error)return s;if(await n.ui.requestPermission({permission:Ru(r,e)}))return await Bu(n,r,e)}function Vm(n){return Mu(this.puter,"read",n)}function Xm(n){return Mu(this.puter,"write",n)}function On(n,e){return`/${n}/${e}`}async function qu(n,e){try{return await n.fs.stat({path:e}),!0}catch{return!1}}async function bt(n,e,t){const r=await n.auth.whoami(),s=On(r.username,e);return t!=="write"&&await qu(n,s)||await n.ui.requestPermission({permission:Lu(s,t)})?s:void 0}function Jm(n,e){return bt(this.puter,n,e)}function Km(){return bt(this.puter,"Desktop","read")}function Ym(){return bt(this.puter,"Desktop","write")}function Zm(){return bt(this.puter,"Documents","read")}function Qm(){return bt(this.puter,"Documents","write")}function eg(){return bt(this.puter,"Pictures","read")}function tg(){return bt(this.puter,"Pictures","write")}function rg(){return bt(this.puter,"Videos","read")}function ng(){return bt(this.puter,"Videos","write")}async function sg(n,e){return await gt(this.puter,"/auth/grant-user-app",{app_uid:n,permission:e})}async function ig(n,e){return await gt(this.puter,"/auth/grant-dev-app",{app_uid:n,permission:e})}async function og(n,e){return await gt(this.puter,"/auth/grant-user-app",{origin:n,permission:e})}async function ag(n,e){return await gt(this.puter,"/auth/revoke-user-app",{app_uid:n,permission:e})}async function ug(n,e){return await gt(this.puter,"/auth/revoke-dev-app",{app_uid:n,permission:e})}async function cg(n,e){return await gt(this.puter,"/auth/revoke-user-app",{origin:n,permission:e})}async function Li(n,e,t){const r=e.length===1?{permission:e[0]}:{permissions:e};return await n.ui.requestPermission(t===void 0?r:{...r,create:t})}async function Fu(n,e){const t=await n.auth.whoami();return await Li(n,[Cu(t.uuid,e)])}async function Nu(n,e){const t=await n.auth.whoami();return await Li(n,[Iu(t.uuid,e)])}function lg(...n){return this.request(...n)}async function dg(){let n=await this.puter.auth.whoami();if(n.email!==void 0)return n.email;if(await this.puter.ui.requestPermission({permission:Su(n.uuid)}))return n=await this.puter.auth.whoami(),n.email}function hg(){return Fu(this.puter,"read")}function fg(){return Fu(this.puter,"write")}function pg(){return Nu(this.puter,"read")}function mg(){return Nu(this.puter,"write")}async function Uu(n,e){const t=await gt(n,"/auth/check-permissions",{permissions:e});if(t.error)throw new D(t.message??"permission check failed",t.code??"unknown_error");return t.permissions??{}}const Ou=n=>{let e;return{puter:n,whoami:()=>e??(e=n.auth.whoami()),reread:()=>e=n.auth.whoami()}},Bt=n=>Fm(n.access??"read"),qs=n=>Nm(n.name),gg=n=>{const{permission:e,permissions:t,create:r}=n;if(r!==void 0&&r!==!0&&r!==!1&&r!=="dir"&&r!=="file")throw me('`create` must be true, false, "dir", or "file"');if(t!==void 0){if(e!==void 0)throw me("pass `permission` or `permissions`, not both");if(!Array.isArray(t)||t.length===0)throw me("`permissions` must be a non-empty array");for(const s of t)if(typeof s!="string"||s==="")throw me("`permissions` entries must be non-empty strings");return[...new Set(t)]}if(typeof e!="string"||e==="")throw me("`permission` must be a non-empty string");return[e]},qt=Object.assign(Object.create(null),{email:{permissions:async({ctx:n})=>[Su((await n.whoami()).uuid)],check:async({ctx:n,permissions:e,holds:t})=>(await n.whoami()).email!==void 0?!0:t(e),resolve:async({ctx:n},e)=>{if(!e)return;const t=await n.whoami();return t.email!==void 0?t.email:(await n.reread()).email}},folder:{permissions:async({ctx:n,details:e})=>[Lu(On((await n.whoami()).username,qs(e)),Bt(e))],check:async({ctx:n,details:e,permissions:t,holds:r})=>{if(Bt(e)!=="write"){const s=On((await n.whoami()).username,qs(e));if(await qu(n.puter,s))return!0}return r(t)},resolve:async({ctx:n,details:e},t)=>{if(t)return On((await n.whoami()).username,qs(e))}},apps:{permissions:async({ctx:n,details:e})=>[Cu((await n.whoami()).uuid,Bt(e))],check:async({permissions:n,holds:e})=>e(n),resolve:async(n,e)=>e},subdomains:{permissions:async({ctx:n,details:e})=>[Iu((await n.whoami()).uuid,Bt(e))],check:async({permissions:n,holds:e})=>e(n),resolve:async(n,e)=>e},appData:{permissions:({ctx:n,details:e})=>Tu(n.puter,e.app,e.scopes),check:async({permissions:n,holds:e})=>n.length===0||e(n),resolve:async(n,e)=>e},appRootDir:{permissions:async({details:n})=>[Ru(Un(n.app),Bt(n))],pooled:!1,check:async({ctx:n,details:e,prompt:t,scratch:r})=>{const s=Un(e.app),i=Bt(e);if(!t)return await Gm(n.puter,s,i);const o=await Yn(n.puter,s,i);return o.error?!1:(r.entry=o,!0)},resolve:async({ctx:n,details:e,scratch:t},r)=>{if(r)return t.entry?t.entry:await Bu(n.puter,Un(e.app),Bt(e))}},permission:{permissions:async({details:n})=>gg(n),check:async({permissions:n,holds:e})=>e(n),resolve:async(n,e)=>e}}),$u=Object.keys(qt),bg=(n,e)=>{if(typeof n!="string"||n==="")throw me("resource must be a non-empty string");if(e!==void 0&&(typeof e!="object"||e===null||Array.isArray(e)))throw me("details must be an object");if(qt[n])return{resource:n,details:e??{}};if(e!==void 0)throw me(`unknown resource: ${n} (expected one of: ${$u.join(", ")})`);return{resource:"permission",details:{permission:n}}},yg=(n,e)=>{if(typeof n!="object"||n===null||Array.isArray(n))throw me(`requests[${e}] must be an object`);const{resource:t,...r}=n;if(typeof t!="string"||t==="")throw me(`requests[${e}].resource must be a non-empty string`);if(!qt[t])throw me(`requests[${e}]: unknown resource: ${t} (expected one of: ${$u.join(", ")})`);return{resource:t,details:r}};function wg(n,e){const t=[...new Set(e)];let r;return async s=>{if(s.length===0||t.length===0)return!1;const i=await(r??(r=Uu(n.puter,t)));return s.every(o=>i[o]===!0)}}async function ju(n,e,t){const r=await Promise.all(e.map(({resource:d,details:f})=>qt[d].permissions({ctx:n,details:f}))),s=[...new Set(e.filter(({resource:d})=>d==="permission").map(({details:d})=>d.create).filter(d=>d!==void 0))];if(s.length>1)throw me("conflicting `create` values in one request");const i=s[0],o=wg(n,e.flatMap(({resource:d},f)=>qt[d].pooled===!1?[]:r[f])),a=e.map(()=>({})),u=await Promise.all(e.map(async({resource:d,details:f},g)=>{try{return await qt[d].check({ctx:n,details:f,permissions:r[g],holds:o,prompt:t,scratch:a[g]})}catch(m){if(!t)throw m;return!1}}));if(!t)return u;const l=[...new Set(e.flatMap((d,f)=>u[f]?[]:r[f]))],c=l.length===0?!0:await Li(n.puter,l,i);return await Promise.all(e.map(({resource:d,details:f},g)=>qt[d].resolve({ctx:n,details:f,scratch:a[g]},u[g]||r[g].length>0&&c)))}const zu=(n,e)=>{if(!Array.isArray(n))return[bg(n,e)];if(e!==void 0)throw me("a batch takes no second argument");return n.map(yg)};async function vg(n,e){const t=zu(n,e),r=await ju(Ou(this.puter),t,!0);return Array.isArray(n)?r:r[0]}async function xg(n,e){const t=zu(n,e),r=await ju(Ou(this.puter),t,!1);return Array.isArray(n)?r:r[0]}const _g=["grantApp","grantAppAnyUser","grantOrigin","revokeApp","revokeAppAnyUser","revokeOrigin","request","check","requestEmail","requestAppData","requestPermission","requestFolder_","requestReadDesktop","requestWriteDesktop","requestReadDocuments","requestWriteDocuments","requestReadPictures","requestWritePictures","requestReadVideos","requestWriteVideos","requestReadApps","requestManageApps","requestReadSubdomains","requestManageSubdomains","requestReadAppRootDir","requestWriteAppRootDir"];class Ag extends Ne{constructor(t){super(t);p(this,"grantApp",sg);p(this,"grantAppAnyUser",ig);p(this,"grantOrigin",og);p(this,"revokeApp",ag);p(this,"revokeAppAnyUser",ug);p(this,"revokeOrigin",cg);p(this,"request",vg);p(this,"check",xg);p(this,"requestEmail",dg);p(this,"requestAppData",Wm);p(this,"requestPermission",lg);p(this,"requestFolder_",Jm);p(this,"requestReadDesktop",Km);p(this,"requestWriteDesktop",Ym);p(this,"requestReadDocuments",Zm);p(this,"requestWriteDocuments",Qm);p(this,"requestReadPictures",eg);p(this,"requestWritePictures",tg);p(this,"requestReadVideos",rg);p(this,"requestWriteVideos",ng);p(this,"requestReadApps",hg);p(this,"requestManageApps",fg);p(this,"requestReadSubdomains",pg);p(this,"requestManageSubdomains",mg);p(this,"requestReadAppRootDir",Vm);p(this,"requestWriteAppRootDir",Xm);const r=this;for(const s of _g)r[s]=r[s].bind(this)}}const kg=Ag,Eg={400:"bad_request",401:"unauthorized",403:"permission_denied",404:"not_found",409:"conflict",429:"too_many_requests"};async function qe(n,e,t,r={}){var f;const{body:s,query:i,operation:o}=r,a=new URLSearchParams;for(const[g,m]of Object.entries(i??{}))m!=null&&a.set(g,String(m));const u=a.toString();let l;try{l=await G(n.APIOrigin+t+(u?`?${u}`:""),{method:e,includePuterAuth:!0,headers:{"Content-Type":"application/json"},...s?{body:JSON.stringify(s)}:{},logContext:{service:"teams",operation:o??`${e} ${t}`,params:{}}})}catch(g){throw D.from(g)}const c=(f=l.headers.get("content-type"))==null?void 0:f.includes("application/json"),d=c?await l.json():await l.text();if(l.status<200||l.status>=300){const g=Eg[l.status]??"unknown_error";if(c&&d!==null&&typeof d=="object"){const m=D.from(d);throw m.code===void 0&&(m.code=g),m}throw new D(typeof d=="string"&&d?d:`Request failed with status ${l.status}`,g)}return d}function se(n,e){if(typeof n!="string"||n.trim()==="")throw new D(`\`${e}\` is required`,"invalid_request");return encodeURIComponent(n)}function ds(n){return{uid:n.uid,name:n.name??null,handle:n.handle??null,isOwner:n.is_owner===!0,directoryEnabled:n.directory_enabled===!0,require2fa:n.require_2fa===!0,createdAt:n.created_at}}function Dg(n){return{username:n.username,uuid:n.uuid}}function Tg(n){return{username:n.username,...typeof n.org_owned=="boolean"?{orgOwned:n.org_owned}:{},...typeof n.created_at=="string"?{createdAt:n.created_at}:{},...typeof n.uuid=="string"?{uuid:n.uuid}:{}}}function Hu(n){return{action:n.action,reason:n.reason??null,username:n.username??null,actorUsername:n.actor_username??null,createdAt:n.created_at}}function hn(n,e){if(n!==null&&typeof n=="object"&&Symbol.asyncIterator in n){const t=n;return async function*(){for await(const r of t)yield{...r,items:(r.items??[]).map(e)}}()}return Promise.resolve(n).then(t=>{if(Array.isArray(t))return t.map(e);const r=t;return{...r,items:((r==null?void 0:r.items)??[]).map(e)}})}async function Sg(n){if(typeof(n==null?void 0:n.name)!="string"||n.name.trim()==="")throw new D("`name` is required","invalid_request");const e={name:n.name};return n.handle!==void 0&&(e.handle=n.handle),ds(await qe(this.puter,"POST","/teams",{body:e,operation:"create"}))}async function Cg(n,e){const t=se(n,"uid");if(typeof(e==null?void 0:e.username)!="string"||e.username.trim()==="")throw new D("`username` is required","invalid_request");if((e==null?void 0:e.email)!==void 0&&e.email!==null&&typeof e.email!="string")throw new D("`email` must be a string","invalid_request");const r=typeof(e==null?void 0:e.email)=="string"?e.email.trim():"",s=await qe(this.puter,"POST",`/teams/${t}/members`,{body:{username:e.username,...r?{email:r}:{}},operation:"createMember"});return{username:s.username,temporaryPassword:s.temporary_password}}async function Ig(n){const e=se(n,"uid");await qe(this.puter,"DELETE",`/teams/${e}`,{operation:"delete"})}async function Lg(n,e){const t=se(n,"uid"),r=se(e,"username");await qe(this.puter,"DELETE",`/teams/${t}/members/${r}`,{operation:"deleteMemberAccount"})}async function Rg(n,e){const t=se(n,"uid"),r=se(e,"username");await qe(this.puter,"POST",`/teams/${t}/members/${r}/disable`,{operation:"disableMember"})}async function Pg(n,e){const t=se(n,"uid"),r=se(e,"username");await qe(this.puter,"POST",`/teams/${t}/members/${r}/enable`,{operation:"enableMember"})}async function Bg(n){const e=se(n,"uid");return ds(await qe(this.puter,"GET",`/teams/${e}`,{operation:"get"}))}function fn(n,e,t,r){const s=typeof t=="object"&&t!==null?t:{},{limit:i,offset:o,cursor:a,includeTotal:u,stream:l}=s,c=Object.prototype.hasOwnProperty.call(s,"cursor");if(o!==void 0)throw new D("`offset` is not supported here; pass `cursor` to resume from a position.","invalid_request");const d=g=>Array.isArray(g)?{items:g}:g??{items:[]},f=g=>qe(n,"GET",e,{query:{limit:i,...g},operation:r});return l===!0?Je(f,{cursor:a,includeTotal:u===!0}):c||u!==void 0?(async()=>d(await qe(n,"GET",e,{query:{limit:i,...c?{cursor:a}:{},...u!==void 0?{includeTotal:u}:{}},operation:r})))():i!==void 0?(async()=>d(await f({cursor:null})).items)():Qt(f)}function Mg(n){return hn(fn(this.puter,"/teams",n,"list"),ds)}function qg(n,e){const t=se(n,"uid");return hn(fn(this.puter,`/teams/${t}/audit`,e,"listAudit"),Hu)}function Fg(n,e){const t=se(n,"uid");return hn(fn(this.puter,`/teams/${t}/directory`,e,"listDirectory"),Dg)}function Ng(n,e){const t=se(n,"uid");return hn(fn(this.puter,`/teams/${t}/members`,e,"listMembers"),Tg)}function Ug(n,e){const t=se(n,"uid");return hn(fn(this.puter,`/teams/${t}/audit/me`,e,"listOwnAudit"),Hu)}async function Og(n,e){const t=se(n,"uid"),r=se(e,"username"),s=await qe(this.puter,"POST",`/teams/${t}/members/${r}/activation`,{operation:"resendActivation"});return{username:e,temporaryPassword:s.temporary_password}}async function $g(n,e){const t=se(n,"uid"),r=se(e,"username"),s=await qe(this.puter,"POST",`/teams/${t}/members/${r}/password-reset`,{operation:"resetPassword"});return{username:e,temporaryPassword:s.temporary_password}}async function jg(n,e){const t=se(n,"uid"),r=se(e,"username");await qe(this.puter,"POST",`/teams/${t}/members/${r}/2fa-reset`,{operation:"resetTwoFactor"})}async function zg(n,e){const t=se(n,"uid"),r={};return(e==null?void 0:e.name)!==void 0&&(r.name=e.name),(e==null?void 0:e.handle)!==void 0&&(r.handle=e.handle),(e==null?void 0:e.directoryEnabled)!==void 0&&(r.directory_enabled=e.directoryEnabled),(e==null?void 0:e.require2fa)!==void 0&&(r.require_2fa=e.require2fa),ds(await qe(this.puter,"PUT",`/teams/${t}`,{body:r,operation:"update"}))}const Hg=["create","list","get","update","delete","listMembers","createMember","resendActivation","disableMember","enableMember","resetPassword","resetTwoFactor","deleteMemberAccount","listAudit","listOwnAudit","listDirectory"];class Wg extends Ne{constructor(t){super(t);p(this,"create",Sg);p(this,"list",Mg);p(this,"get",Bg);p(this,"update",zg);p(this,"delete",Ig);p(this,"listMembers",Ng);p(this,"createMember",Cg);p(this,"resendActivation",Og);p(this,"disableMember",Rg);p(this,"enableMember",Pg);p(this,"resetPassword",$g);p(this,"resetTwoFactor",jg);p(this,"deleteMemberAccount",Lg);p(this,"listAudit",qg);p(this,"listOwnAudit",Ug);p(this,"listDirectory",Fg);const r=this;for(const s of Hg)r[s]=r[s].bind(this)}}const Gg=Wg,aa=()=>{let n,e;return{promise:new Promise((r,s)=>{n=r,e=s}),resolve:n,reject:e}},ua=Symbol("FILE_SAVE_CANCELLED"),ca=Symbol("FILE_OPEN_CANCELLED"),Fs=(n,e)=>{if(typeof DOMException=="function")return new DOMException(e,n);const t=new Error(e);return t.name=n,t},la=16,Vg=2e3;var Zr,Nt,hr;const Bi=class Bi extends Ii{constructor(t,{target:r,usesSDK:s,messageTarget:i,appInstanceID:o}){super(["message","close"]);E(this,Zr,"*");E(this,Nt);E(this,hr);p(this,"response");this.messageTarget=i,this.appInstanceID=o,this.targetAppInstanceID=r,y(this,Nt,!0),y(this,hr,s),this.log=t.logger.fields({category:"ipc"}),this.log.fields({cons_source:o,source:t.appInstanceID,target:r}).info(`AppConnection created to ${r}`,this),globalThis.document&&window.addEventListener("message",a=>{if(a.source===this.messageTarget&&a.data){if(a.data.msg==="messageToApp"){if(a.data.appInstanceID!==this.targetAppInstanceID)return;if(a.data.targetAppInstanceID!==this.appInstanceID){console.error(`AppConnection received message intended for wrong app! appInstanceID=${this.appInstanceID}, target=${a.data.targetAppInstanceID}`);return}this.emit("message",a.data.contents);return}if(a.data.msg==="appClosed"){if(a.data.appInstanceID!==this.targetAppInstanceID)return;y(this,Nt,!1),this.emit("close",{appInstanceID:this.targetAppInstanceID,statusCode:a.data.statusCode})}}})}static from(t,r,{messageTarget:s,appInstanceID:i}){const o=new Bi(r,{target:t.appInstanceID,usesSDK:t.usesSDK,messageTarget:s,appInstanceID:i});return o.response=t.response,o}get usesSDK(){return h(this,hr)}postMessage(t,r){const s=Array.isArray(r)?r:(r==null?void 0:r.transfer)??[];if(!Array.isArray(s))throw{message:"transfer must be an array of transferable objects",code:"invalid_transfer_list"};if(!h(this,Nt)){console.warn("Trying to post message on a closed AppConnection");return}if(!h(this,hr)){console.warn("Trying to post message to a non-SDK app");return}this.messageTarget.postMessage({msg:"messageToApp",appInstanceID:this.appInstanceID,targetAppInstanceID:this.targetAppInstanceID,targetAppOrigin:"*",contents:t,transfer:s},h(this,Zr),s)}close(){if(!h(this,Nt)){console.warn("Trying to close an app on a closed AppConnection");return}this.messageTarget.postMessage({msg:"closeApp",appInstanceID:this.appInstanceID,targetAppInstanceID:this.targetAppInstanceID},h(this,Zr))}};Zr=new WeakMap,Nt=new WeakMap,hr=new WeakMap;let ar=Bi;var dt,Qr,U,fr,Ut,en,Ot,pr,mr,xt,_t,gr,S,Wu,$n,Gu,K,ni,Ge,Fr,Vu,br,$t,si;class Xg extends Ii{constructor(t,{appInstanceID:r,parentInstanceID:s}){var a,u,l;const i=["localeChanged","themeChanged","connection"];super(i);E(this,S);E(this,dt,1);p(this,"itemWatchCallbackFunctions",[]);p(this,"appInstanceID");p(this,"parentInstanceID");E(this,Qr,null);E(this,U,[]);E(this,fr);E(this,Ut);E(this,en);E(this,Ot,null);E(this,pr);E(this,mr,new Map);E(this,xt,!1);E(this,_t,null);E(this,gr,new Set);p(this,"getEntriesFromDataTransferItems",async function(t,r={raw:!1}){const s=d=>{if(this.getEntriesFromDataTransferItems.didShowInfo||d.name!=="EncodingError")return;this.getEntriesFromDataTransferItems.didShowInfo=!0;const f=`${d.name} occurred within datatransfer-files-promise module
Error message: "${d.message}"
Try serving html over http if currently you are running it from the filesystem.`;console.warn(f)},i=(d,f="")=>new Promise((g,m)=>{d.file(b=>{r.raw||(b.filepath=f+b.name),g(b)},b=>{s(b),m(b)})}),o=(d,f)=>new Promise((g,m)=>{d.readEntries(async b=>{let v=[];for(let A of b){const k=await u(A,f);v=v.concat(k)}g(v)},b=>{s(b),m(b)})}),a=async(d,f)=>{const g=d.createReader(),m=`${f+d.name}/`;let b=[],v;do v=await o(g,m),b=b.concat(v);while(v.length>0);return b},u=async(d,f="")=>{if(d!==null){if(d.isFile)return[await i(d,f)];if(d.isDirectory){const g=await a(d,f);return g.push(d),g}}};let l=[],c=[];for(let d=0,f=t.length;d<f;d++)c.push(t[d].webkitGetAsEntry());for(let d of c){const f=await u(d);l=l.concat(f)}return l});p(this,"launchApp",async function(r,s,i){let o,a,u,l,c=r;if(typeof c=="object"&&c!==null){const f=c;c=f.name||f.app_name,a=f.file_paths,s=s||f.args,i=i||f.callback,o=f.pseudonym,u=f.items,l=f.background}if(u){Array.isArray(u)||(u=[]);for(let f=0;f<u.length;f++)u[f]instanceof Le&&(u[f]=u[f]._internalProperties.file_signature)}c&&c.includes("#(as)")&&([c,o]=c.split("#(as)")),c||(c=puter.appName);const d=await _(this,S,Fr).call(this,{method:"launchApp",callback:i,parameters:{app_name:c,file_paths:a,items:u,pseudonym:o,args:s,background:l}});return ar.from(d,this.puter,{messageTarget:this.messageTarget,appInstanceID:this.appInstanceID})});p(this,"connectToInstance",async function(r){const s=await _(this,S,Fr).call(this,{method:"connectToInstance",parameters:{app_name:r}});return ar.from(s,this.puter,{messageTarget:this.messageTarget,appInstanceID:this.appInstanceID})});E(this,br,null);E(this,$t,null);if(y(this,pr,i),this.puter=t,this.appInstanceID=r,this.parentInstanceID=s,this.appID=t.appID,this.env=t.env,this.util=t.util,this.env==="app")this.messageTarget=window.parent;else if(this.env==="gui")return;this.parentInstanceID&&y(this,Qr,new ar(this.puter,{target:this.parentInstanceID,usesSDK:!0,messageTarget:this.messageTarget,appInstanceID:this.appInstanceID})),(a=this.messageTarget)==null||a.postMessage({msg:"READY",appInstanceID:this.appInstanceID},"*"),globalThis.document&&window.addEventListener("focus",c=>{var d;(d=this.messageTarget)==null||d.postMessage({msg:"windowFocused",appInstanceID:this.appInstanceID},"*")});let o=null;globalThis.document&&window.addEventListener("message",async c=>{var d,f,g,m;if(_(this,S,Gu).call(this,c)&&c.data){if(c.data.error)throw c.data.error;if(c.data.msg&&c.data.msg==="focus")window.focus();else if(c.data.msg&&c.data.msg==="click"){const b=document.elementFromPoint(c.data.x,c.data.y);b!==null&&b.click()}else if(c.data.msg&&c.data.msg==="drag"){const b=document.elementFromPoint(c.data.x,c.data.y);if(b!==o){if(o){const v=new Event("dragleave",{bubbles:!0,cancelable:!0,clientX:c.data.x,clientY:c.data.y});o.dispatchEvent(v)}if(b){const v=new Event("dragenter",{bubbles:!0,cancelable:!0,clientX:c.data.x,clientY:c.data.y});b.dispatchEvent(v)}o=b}}else if(c.data.msg&&c.data.msg==="drop"){if(o){const b=new CustomEvent("drop",{bubbles:!0,cancelable:!0,detail:{clientX:c.data.x,clientY:c.data.y,items:c.data.items}});o.dispatchEvent(b),o=null}}else if(c.data.msg==="pictureInPictureClosed"){const b=h(this,Ot);y(this,Ot,null),b==null||b()}else if(c.data.msg==="windowWillClose")h(this,fr)===void 0?(d=this.messageTarget)==null||d.postMessage({msg:!0,appInstanceID:this.appInstanceID,original_msg_id:c.data.msg_id},"*"):((f=this.messageTarget)==null||f.postMessage({msg:!1,appInstanceID:this.appInstanceID,original_msg_id:c.data.msg_id},"*"),h(this,fr).call(this));else if(c.data.msg==="itemsOpened")if(h(this,Ut)===void 0)(g=this.messageTarget)==null||g.postMessage({msg:!0,appInstanceID:this.appInstanceID,original_msg_id:c.data.msg_id},"*");else{(m=this.messageTarget)==null||m.postMessage({msg:!1,appInstanceID:this.appInstanceID,original_msg_id:c.data.msg_id},"*");let b=[];if(c.data.items.length>0)for(let v=0;v<c.data.items.length;v++)b.push(new Le(c.data.items[v]));h(this,Ut).call(this,b)}else if(c.data.msg==="getAppDataSucceeded"){let b=new Le(c.data.item);c.data.original_msg_id&&h(this,U)[c.data.original_msg_id]&&h(this,U)[c.data.original_msg_id](b)}else if(c.data.msg==="instancesOpenSucceeded")c.data.original_msg_id&&h(this,U)[c.data.original_msg_id]&&h(this,U)[c.data.original_msg_id](c.data.instancesOpen);else if(c.data.msg==="readAppDataFileSucceeded"){let b=new Le(c.data.item);c.data.original_msg_id&&h(this,U)[c.data.original_msg_id]&&h(this,U)[c.data.original_msg_id](b)}else if(c.data.msg==="readAppDataFileFailed")c.data.original_msg_id&&h(this,U)[c.data.original_msg_id]&&h(this,U)[c.data.original_msg_id](null);else if(c.data.original_msg_id!==void 0&&h(this,U)[c.data.original_msg_id]){if(c.data.msg==="fileOpenPicked"){if(c.data.items.length===1)h(this,U)[c.data.original_msg_id](new Le(c.data.items[0]));else if(c.data.items.length>1){let b=[];for(let v=0;v<c.data.items.length;v++)b.push(new Le(c.data.items[v]));h(this,U)[c.data.original_msg_id](b)}}else if(c.data.msg==="directoryPicked"){if(c.data.items.length===1)h(this,U)[c.data.original_msg_id](new Le({uid:c.data.items[0].uid,name:c.data.items[0].fsentry_name,path:c.data.items[0].path,readURL:c.data.items[0].read_url,writeURL:c.data.items[0].write_url,metadataURL:c.data.items[0].metadata_url,isDirectory:!0,size:c.data.items[0].fsentry_size,accessed:c.data.items[0].fsentry_accessed,modified:c.data.items[0].fsentry_modified,created:c.data.items[0].fsentry_created}));else if(c.data.items.length>1){let b=[];for(let v=0;v<c.data.items.length;v++)b.push(new Le(c.data.items[v]));h(this,U)[c.data.original_msg_id](b)}}else c.data.msg==="colorPicked"?h(this,U)[c.data.original_msg_id](c.data.color):c.data.msg==="fontPicked"?h(this,U)[c.data.original_msg_id](c.data.font):c.data.msg==="alertResponded"?h(this,U)[c.data.original_msg_id](c.data.response):c.data.msg==="promptResponded"?h(this,U)[c.data.original_msg_id](c.data.response):c.data.msg==="notificationShown"?h(this,U)[c.data.original_msg_id](c.data.uid):c.data.msg==="languageReceived"?h(this,U)[c.data.original_msg_id](c.data.language):c.data.msg==="fileSaved"?h(this,U)[c.data.original_msg_id](new Le(c.data.saved_file)):c.data.msg==="fileSaveCancelled"?h(this,U)[c.data.original_msg_id](ua):c.data.msg==="fileOpenCancelled"?h(this,U)[c.data.original_msg_id](ca):h(this,U)[c.data.original_msg_id](c.data);delete h(this,U)[c.data.original_msg_id]}else if(c.data.msg==="itemChanged"&&c.data.data&&c.data.data.uid)this.itemWatchCallbackFunctions[c.data.data.uid]&&typeof this.itemWatchCallbackFunctions[c.data.data.uid]=="function"&&this.itemWatchCallbackFunctions[c.data.data.uid](c.data.data);else if(c.data.msg==="broadcast"){const{name:b,data:v}=c.data;if(!h(this,pr).includes(b))return;this.emit(b,v),h(this,mr).set(b,v)}else if(c.data.msg==="connection"){c.data.usesSDK=!0;const b=ar.from(c.data,this.puter,{messageTarget:this.messageTarget,appInstanceID:this.appInstanceID}),v=k=>{var T;(T=this.messageTarget)==null||T.postMessage({$:"connection-resp",connection:c.data.appInstanceID,accept:!0,value:k},"*")},A=k=>{var T;(T=this.messageTarget)==null||T.postMessage({$:"connection-resp",connection:c.data.appInstanceID,accept:!1,value:k},"*")};this.emit("connection",{conn:b,accept:v,reject:A})}}}),(u=globalThis.document)==null||u.addEventListener("mousemove",async c=>{var d;this.mouseX=c.clientX,this.mouseY=c.clientY,(d=this.messageTarget)==null||d.postMessage({msg:"mouseMoved",appInstanceID:this.appInstanceID,x:this.mouseX,y:this.mouseY},"*")}),(l=globalThis.document)==null||l.addEventListener("click",async c=>{var d;this.mouseX=c.clientX,this.mouseY=c.clientY,(d=this.messageTarget)==null||d.postMessage({msg:"mouseClicked",appInstanceID:this.appInstanceID,x:this.mouseX,y:this.mouseY},"*")})}get authToken(){return this.puter.authToken}onWindowClose(t){y(this,fr,t)}onItemsOpened(t){if(!h(this,Ut)){let r=new URLSearchParams(globalThis.location.search);if(r.has("puter.item.name")&&r.has("puter.item.uid")&&r.has("puter.item.read_url")){let s=r.get("puter.item.path");!s.startsWith("~/")&&!s.startsWith("/")&&(s=`~/${s}`),t([new Le({name:r.get("puter.item.name"),path:s,uid:r.get("puter.item.uid"),readURL:r.get("puter.item.read_url"),writeURL:r.get("puter.item.write_url"),metadataURL:r.get("puter.item.metadata_url"),size:r.get("puter.item.size"),accessed:r.get("puter.item.accessed"),modified:r.get("puter.item.modified"),created:r.get("puter.item.created")})])}}y(this,Ut,t)}wasLaunchedWithItems(){const t=new URLSearchParams(globalThis.location.search);return t.has("puter.item.name")&&t.has("puter.item.uid")&&t.has("puter.item.read_url")}onLaunchedWithItems(t){if(!h(this,en)){let r=new URLSearchParams(globalThis.location.search);if(r.has("puter.item.name")&&r.has("puter.item.uid")&&r.has("puter.item.read_url")){let s=r.get("puter.item.path");!s.startsWith("~/")&&!s.startsWith("/")&&(s=`~/${s}`),t([new Le({name:r.get("puter.item.name"),path:s,uid:r.get("puter.item.uid"),readURL:r.get("puter.item.read_url"),writeURL:r.get("puter.item.write_url"),metadataURL:r.get("puter.item.metadata_url"),size:r.get("puter.item.size"),accessed:r.get("puter.item.accessed"),modified:r.get("puter.item.modified"),created:r.get("puter.item.created")})])}}y(this,en,t)}requestEmailConfirmation(){return new Promise((t,r)=>{_(this,S,K).call(this,"requestEmailConfirmation",t,{})})}requestVerificationGate(t,r={}){return new Promise(s=>{_(this,S,K).call(this,"requestVerificationGate",s,{code:t,...r})}).then(s=>(s==null?void 0:s.response)===!0)}alert(t,r,s,i){return this.messageTarget?new Promise(o=>{_(this,S,K).call(this,"ALERT",o,{message:t,buttons:r,options:s})}):new Promise(o=>{const a=document.createElement("puter-alert");a.setAttribute("message",t||""),a.buttons=r,a.options=s,a.addEventListener("response",u=>o(u.detail)),document.body.appendChild(a),a.open()})}openDevPaymentsAccount(){return new Promise(t=>{_(this,S,K).call(this,"openDevPaymentsAccount",t,{})})}instancesOpen(t){return new Promise(r=>{_(this,S,K).call(this,"getInstancesOpen",r,{})})}socialShare(t,r,s,i){return new Promise(o=>{_(this,S,K).call(this,"socialShare",o,{url:t,message:r,options:s})})}prompt(t,r,s,i){return this.messageTarget?new Promise(o=>{_(this,S,K).call(this,"PROMPT",o,{message:t,placeholder:r,options:s})}):new Promise(o=>{const a=document.createElement("puter-prompt");t&&a.setAttribute("message",t),r&&a.setAttribute("placeholder",r),s!=null&&s.defaultValue&&a.setAttribute("default-value",s.defaultValue),a.options=s,a.addEventListener("response",u=>o(u.detail)),document.body.appendChild(a),a.open()})}notify(t){return this.messageTarget?new Promise(r=>{const s={...t??{}};s.roundIcon!==void 0&&s.round_icon===void 0&&(s.round_icon=s.roundIcon),_(this,S,K).call(this,"showNotification",r,{options:s})}):new Promise(r=>{const s=t??{},i=document.createElement("puter-notification");s.title&&i.setAttribute("title",s.title),s.text&&i.setAttribute("text",s.text),s.icon&&i.setAttribute("icon",s.icon),s.type&&i.setAttribute("type",s.type),(s.round_icon||s.roundIcon)&&i.setAttribute("round-icon",""),s.duration!==void 0&&i.setAttribute("duration",String(s.duration)),i.addEventListener("close",()=>r(s.uid||null)),document.body.appendChild(i),r(s.uid||null)})}showDirectoryPicker(t,r){return new Promise((s,i)=>{var l;if(!globalThis.open)return i("This API is not compatible in Web Workers.");const o=Ze(this,dt)._++;if(this.env==="app")(l=this.messageTarget)==null||l.postMessage({msg:"showDirectoryPicker",appInstanceID:this.appInstanceID,uuid:o,options:t,env:this.env},"*");else{let c=700,d=400,f="Puter: Open Directory";var a=screen.width/2-c/2,u=screen.height/2-d/2;_(this,S,$n).call(this,window.open(`${puter.defaultGUIOrigin}/action/show-directory-picker?embedded_in_popup=true&msg_id=${o}&appInstanceID=${this.appInstanceID}&env=${this.env}&options=${JSON.stringify(t)}`,f,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${c}, height=${d}, top=${u}, left=${a}`))}h(this,U)[o]=s})}showOpenFilePicker(t,r){const s=aa(),i=new Promise((o,a)=>{var d;if(!globalThis.open)return a("This API is not compatible in Web Workers.");const u=Ze(this,dt)._++;if(this.env==="app")(d=this.messageTarget)==null||d.postMessage({msg:"showOpenFilePicker",appInstanceID:this.appInstanceID,uuid:u,options:t??{},env:this.env},"*");else{let f=700,g=400,m="Puter: Open File";var l=screen.width/2-f/2,c=screen.height/2-g/2;_(this,S,$n).call(this,window.open(`${puter.defaultGUIOrigin}/action/show-open-file-picker?embedded_in_popup=true&msg_id=${u}&appInstanceID=${this.appInstanceID}&env=${this.env}&options=${JSON.stringify(t??{})}`,m,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${f}, height=${g}, top=${c}, left=${l}`))}h(this,U)[u]=f=>{if(f===ca){s.resolve(void 0);return}s.resolve(f),o(f)}});return i.undefinedOnCancel=s.promise,i}showFontPicker(t){return this.messageTarget?new Promise(r=>{_(this,S,K).call(this,"showFontPicker",r,{options:t??{}})}):new Promise(r=>{const s=typeof t=="string"?{defaultFont:t}:t??{},i=document.createElement("puter-font-picker"),o=s.defaultFont||s.default||"System UI";i.setAttribute("default-font",o),i.addEventListener("response",a=>r(a.detail)),document.body.appendChild(i),i.open()})}showColorPicker(t){return this.messageTarget?new Promise(r=>{_(this,S,K).call(this,"showColorPicker",r,{options:t??{}})}):new Promise(r=>{const s=typeof t=="string"?{defaultColor:t}:t??{},i=document.createElement("puter-color-picker"),o=s.defaultValue||s.defaultColor||s.default||"#3b82f6";i.setAttribute("default-color",o),i.addEventListener("response",a=>r(a.detail)),document.body.appendChild(i),i.open()})}async requestPictureInPicture({url:t,width:r,height:s,onClose:i}={}){var u,l,c;if(this.env!=="app")throw Fs("NotSupportedError","requestPictureInPicture() is only available to apps running on the Puter desktop.");let o;try{o=new URL(String(t),(u=globalThis.location)==null?void 0:u.href).href}catch{throw Fs("TypeError","`url` must be a URL.")}const a=await _(this,S,Fr).call(this,{method:"requestPictureInPicture",parameters:{url:o,width:r,height:s}});if(!(a!=null&&a.ok))throw Fs(((l=a==null?void 0:a.error)==null?void 0:l.name)??"NotAllowedError",((c=a==null?void 0:a.error)==null?void 0:c.message)??"Could not open a picture-in-picture window.");y(this,Ot,typeof i=="function"?i:null)}async exitPictureInPicture(){if(this.env!=="app")return!1;y(this,Ot,null);const t=await _(this,S,Fr).call(this,{method:"exitPictureInPicture",parameters:{}});return(t==null?void 0:t.wasOpen)===!0}requestUpgrade(t){const{reason:r,method:s,message:i}=t??{};return new Promise(o=>{_(this,S,K).call(this,"requestUpgrade",o,{reason:r,method:s,message:i})})}showSaveFilePicker(t,r,s){const i=aa(),o=new Promise((a,u)=>{var m;if(!globalThis.open)return u("This API is not compatible in Web Workers.");const l=Ze(this,dt)._++;!s&&Object.prototype.toString.call(t)==="[object URL]"&&(s="url");const c=s==="url"?t.toString():void 0,d=["move","copy"].includes(s)?t:void 0;if(this.env==="app")(m=this.messageTarget)==null||m.postMessage({msg:"showSaveFilePicker",appInstanceID:this.appInstanceID,content:c?void 0:t,save_type:s,url:c,source_path:d,suggestedName:r??"",env:this.env,uuid:l},"*");else{let b=new Blob([t],{type:"application/octet-stream"}),v=URL.createObjectURL(b),A=700,k=400,T="Puter: Save File";var f=screen.width/2-A/2,g=screen.height/2-k/2;const M=window.open(`${puter.defaultGUIOrigin}/action/show-save-file-picker?embedded_in_popup=true&msg_id=${l}&appInstanceID=${this.appInstanceID}&env=${this.env}&blobUrl=${encodeURIComponent(v)}`,T,`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${A}, height=${k}, top=${g}, left=${f}`),x=w=>{var C;((C=w.data)==null?void 0:C.msg)==="sendMeFileData"&&w.origin===puter.defaultGUIOrigin&&(!M||w.source!==M||(w.source.postMessage({msg:"showSaveFilePickerPopup",content:c?void 0:t,url:c?c.toString():void 0,suggestedName:r??"",env:this.env,uuid:l},puter.defaultGUIOrigin),window.removeEventListener("message",x)))};window.addEventListener("message",x),_(this,S,$n).call(this,M)}h(this,U)[l]=b=>{if(b===ua){i.resolve(void 0);return}i.resolve(b),a(b)}});return o.undefinedOnCancel=i.promise,o}setWindowTitle(t,r,s){return typeof r=="function"?r=void 0:typeof r=="object"&&r!==null&&(r=r.id),new Promise(i=>{_(this,S,K).call(this,"setWindowTitle",i,{new_title:t,window_id:r})})}setWindowWidth(t,r,s){return typeof r=="function"?r=void 0:typeof r=="object"&&r!==null&&(r=r.id),new Promise(i=>{_(this,S,K).call(this,"setWindowWidth",i,{width:t,window_id:r})})}setWindowHeight(t,r,s){return typeof r=="function"?r=void 0:typeof r=="object"&&r!==null&&(r=r.id),new Promise(i=>{_(this,S,K).call(this,"setWindowHeight",i,{height:t,window_id:r})})}setWindowSize(t,r,s,i){return typeof s=="function"?s=void 0:typeof s=="object"&&s!==null&&(s=s.id),new Promise(o=>{_(this,S,K).call(this,"setWindowSize",o,{width:t,height:r,window_id:s})})}setWindowPosition(t,r,s,i){return typeof s=="function"?s=void 0:typeof s=="object"&&s!==null&&(s=s.id),new Promise(o=>{_(this,S,K).call(this,"setWindowPosition",o,{x:t,y:r,window_id:s})})}setWindowY(t,r,s){return typeof r=="function"?r=void 0:typeof r=="object"&&r!==null&&(r=r.id),new Promise(i=>{_(this,S,K).call(this,"setWindowY",i,{y:t,window_id:r})})}setWindowX(t,r,s){return typeof r=="function"?r=void 0:typeof r=="object"&&r!==null&&(r=r.id),new Promise(i=>{_(this,S,K).call(this,"setWindowX",i,{x:t,window_id:r})})}showWindow(){_(this,S,Ge).call(this,"showWindow")}hideWindow(){_(this,S,Ge).call(this,"hideWindow")}toggleWindow(){_(this,S,Ge).call(this,"toggleWindow")}setMenubar(t){if(this.messageTarget){_(this,S,Ge).call(this,"setMenubar",t);return}document.querySelectorAll("puter-menubar").forEach(s=>s.remove());const r=document.createElement("puter-menubar");t.theme&&r.setAttribute("theme",t.theme),r.items=t.items||[],document.body.appendChild(r)}async requestPermission(t){const r=t==null?void 0:t.create;if(r!==void 0&&r!==!0&&r!==!1&&r!=="dir"&&r!=="file")throw new D('create must be true, false, "dir", or "file"',"invalid_argument");if((this.env==="app"||this.env==="web")&&await _(this,S,Vu).call(this,t))return!0;if(this.env==="app")return(await _(this,S,ni).call(this,"requestPermission",{options:t})).granted===!0;if(this.env!=="web"||!globalThis.open||!globalThis.document)return!1;const s=Array.isArray(t==null?void 0:t.permissions)?t.permissions:[t==null?void 0:t.permission];if(s.length===0||s.length>la||s.some(a=>typeof a!="string"||a===""))return!1;const i=1e3;let o;try{o=new URL(puter.defaultGUIOrigin).origin}catch{return!1}return new Promise(a=>{const u=`${Ze(this,dt)._++}-${Math.random().toString(36).slice(2,10)}`,l=s.map(w=>`permission=${encodeURIComponent(w)}`).join("&"),c=r===void 0?"":`&create=${encodeURIComponent(String(r))}`,d=`${o}/action/request-permission?embedded_in_popup=true&msg_id=${encodeURIComponent(u)}&${l}${c}`;let f=!1,g=null,m=null,b=null,v=!1;const A=()=>{g&&(clearInterval(g),g=null),window.removeEventListener("message",T),b==null||b.remove(),b=null},k=w=>{f||(f=!0,A(),a(w))},T=w=>{var C,Ie,I;if(w.origin===o&&!(m&&w.source!==m)&&((C=w.data)==null?void 0:C.original_msg_id)==u){if(((Ie=w.data)==null?void 0:Ie.msg)==="permissionPromptReady"){v=!0;return}((I=w.data)==null?void 0:I.msg)==="permissionGranted"&&k(w.data.granted===!0)}};window.addEventListener("message",T);const M=w=>{if(!f){if(!w){k(!1);return}if(m=w,window.crossOriginIsolated||w.closed){x();return}g=setInterval(()=>{if(!w.closed)return;clearInterval(g),g=null;const C=!v;setTimeout(()=>{if(!f){if(C){x();return}k(!1)}},i)},100)}},x=async()=>{if(!puter.authToken){k(!1);return}const I=Date.now();for(;!f&&Date.now()-I<3e5;){if(await new Promise(de=>setTimeout(de,2e3)),f)return;if(!puter.authToken)continue;const le=typeof AbortController<"u"?new AbortController:null,ae=setTimeout(()=>le==null?void 0:le.abort(),1e4);try{const de=await fetch(`${puter.APIOrigin}/auth/check-permissions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${puter.authToken}`},body:JSON.stringify({permissions:s}),...le?{signal:le.signal}:{}});if(!de.ok)continue;const X=await de.json();s.every(Ue=>{var ye;return((ye=X==null?void 0:X.permissions)==null?void 0:ye[Ue])===!0})&&k(!0)}catch{}finally{clearTimeout(ae)}}k(!1)};try{if(jn())M(Wr(d,`puter-permission-${u}`));else{const w=new Yt(()=>{},()=>{},{popupURL:d,popupName:`puter-permission-${u}`,onLaunch:C=>M(C),onCancel:()=>k(!1)});b=w,document.body.appendChild(w),w.open()}}catch{k(!1)}})}async showFeedbackDialog(){var s,i;if(this.env==="app"){if(!(((i=new URLSearchParams(((s=globalThis.location)==null?void 0:s.search)??"").get("puter.gui_features"))==null?void 0:i.split(","))??[]).includes("feedback-dialog"))return!1;const a=await _(this,S,ni).call(this,"showFeedbackDialog",{});return(a==null?void 0:a.sent)===!0}if(this.env!=="web"||!globalThis.open||!globalThis.document)return!1;let t;try{t=new URL(puter.defaultGUIOrigin).origin}catch{return!1}const r=1e3;return new Promise(o=>{const a=`${Ze(this,dt)._++}-${Math.random().toString(36).slice(2,10)}`,u=`${t}/action/send-feedback?embedded_in_popup=true&msg_id=${encodeURIComponent(a)}`;let l=!1,c=null,d=null,f=null;const g=()=>{c&&(clearInterval(c),c=null),window.removeEventListener("message",b),f==null||f.remove(),f=null},m=A=>{l||(l=!0,g(),o(A===!0))},b=A=>{var k,T;A.origin===t&&(d&&A.source!==d||((k=A.data)==null?void 0:k.original_msg_id)==a&&((T=A.data)==null?void 0:T.msg)==="feedbackDialogClosed"&&m(A.data.sent===!0))};window.addEventListener("message",b);const v=A=>{if(!l){if(!A){m(!1);return}if(d=A,window.crossOriginIsolated||A.closed){m(!1);return}c=setInterval(()=>{A.closed&&(clearInterval(c),c=null,setTimeout(()=>m(!1),r))},100)}};try{if(jn())v(Wr(u,`puter-feedback-${a}`));else{const A=new Yt(()=>{},()=>{},{popupURL:u,popupName:`puter-feedback-${a}`,onLaunch:k=>v(k),onCancel:()=>m(!1)});f=A,document.body.appendChild(A),A.open()}}catch{m(!1)}})}disableMenuItem(t){_(this,S,Ge).call(this,"disableMenuItem",{id:t})}enableMenuItem(t){_(this,S,Ge).call(this,"enableMenuItem",{id:t})}setMenuItemIcon(t,r){_(this,S,Ge).call(this,"setMenuItemIcon",{id:t,icon:r})}setMenuItemIconActive(t,r){_(this,S,Ge).call(this,"setMenuItemIconActive",{id:t,icon:r})}setMenuItemChecked(t,r){_(this,S,Ge).call(this,"setMenuItemChecked",{id:t,checked:r})}contextMenu(t){var o,a;if(this.messageTarget){_(this,S,Ge).call(this,"contextMenu",t);return}const r=document.createElement("puter-context-menu");t.theme&&r.setAttribute("theme",t.theme),r.items=t.items||[];const s=t.x??((o=globalThis.event)==null?void 0:o.clientX)??0,i=t.y??((a=globalThis.event)==null?void 0:a.clientY)??0;r.setAttribute("x",String(s)),r.setAttribute("y",String(i)),document.body.appendChild(r)}authenticateWithPuter(){if(this.env!=="web")return;if(this.authToken)return new Promise(r=>{r()});if(puter.puterAuthState.isPromptOpen)return new Promise((r,s)=>{puter.puterAuthState.resolvers.push({resolve:r,reject:s})});puter.puterAuthState.isPromptOpen=!0,puter.puterAuthState.authGranted=null;const t=r=>{puter.puterAuthState.authGranted=r,puter.puterAuthState.isPromptOpen=!1;const s=puter.puterAuthState.resolvers;puter.puterAuthState.resolvers=[];for(const i of s)r?i.resolve():i.reject()};return puter.auth.signIn({request_auth:!0}).then(()=>{t(!0),puter.onAuth&&typeof puter.onAuth=="function"&&puter.getUser().then(r=>{puter.onAuth(r)})},r=>{throw t(!1),r})}parentApp(){return h(this,Qr)}createWindow(t,r){return new Promise(s=>{_(this,S,K).call(this,"createWindow",i=>{s(i.window)},{options:t??{}})})}menubar(){document.querySelectorAll("style.puter-stylesheet").forEach(function(i){i.remove()});const t=document.createElement("style");t.classList.add("puter-stylesheet"),t.innerHTML=`
        .--puter-menubar {
            border-bottom: 1px solid #e9e9e9;
            background-color: #fbf9f9;
            padding-top: 3px;
            padding-bottom: 2px;
            display: inline-block;
            position: fixed;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            height: 31px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 13px;
            z-index: 9999;
        }
        
        .--puter-menubar, .--puter-menubar * {
            user-select: none;
            -webkit-user-select: none;
            cursor: default;
        }
        
        .--puter-menubar .dropdown-item-divider>hr {
            margin-top: 5px;
            margin-bottom: 5px;
            border-bottom: none;
            border-top: 1px solid #00000033;
        }
        
        .--puter-menubar>li {
            display: inline-block;
            padding: 10px 5px;
        }
        
        .--puter-menubar>li>ul {
            display: none;
            z-index: 999999999999;
            list-style: none;
            background-color: rgb(233, 233, 233);
            width: 200px;
            border: 1px solid #e4ebf3de;
            box-shadow: 0px 0px 5px #00000066;
            padding-left: 6px;
            padding-right: 6px;
            padding-top: 4px;
            padding-bottom: 4px;
            color: #333;
            border-radius: 4px;
            padding: 2px;
            min-width: 200px;
            margin-top: 5px;
            position: absolute;
        }
        
        .--puter-menubar .menubar-item {
            display: block;
            line-height: 24px;
            margin-top: -7px;
            text-align: center;
            border-radius: 3px;
            padding: 0 5px;
        }
        
        .--puter-menubar .menubar-item-open {
            background-color: rgb(216, 216, 216);
        }
        
        .--puter-menubar .dropdown-item {
            padding: 5px;
            padding: 5px 30px;
            list-style-type: none;
            user-select: none;
            font-size: 13px;
        }
        
        .--puter-menubar .dropdown-item-icon, .--puter-menubar .dropdown-item-icon-active {
            pointer-events: none;
            width: 18px;
            height: 18px;
            margin-left: -23px;
            margin-bottom: -4px;
            margin-right: 5px;
        }
        .--puter-menubar .dropdown-item-disabled .dropdown-item-icon{
            display: inline-block !important;
        }
        .--puter-menubar .dropdown-item-disabled .dropdown-item-icon-active{
            display: none !important;
        }
        .--puter-menubar .dropdown-item-icon-active {
            display:none;
        }
        .--puter-menubar .dropdown-item:hover .dropdown-item-icon{
            display: none;
        }
        .--puter-menubar .dropdown-item:hover .dropdown-item-icon-active{
            display: inline-block;
        }
        .--puter-menubar .dropdown-item-hide-icon .dropdown-item-icon, .--puter-menubar .dropdown-item-hide-icon .dropdown-item-icon-active{
            display: none !important;
        }
        .--puter-menubar .dropdown-item a {
            color: #333;
            text-decoration: none;
        }
        
        .--puter-menubar .dropdown-item:hover, .--puter-menubar .dropdown-item:hover a {
            background-color: rgb(59 134 226);
            color: white;
            border-radius: 4px;
        }
        
        .--puter-menubar .dropdown-item-disabled, .--puter-menubar .dropdown-item-disabled:hover {
            opacity: 0.5;
            background-color: transparent;
            color: initial;
            cursor: initial;
            pointer-events: none;
        }
        
        .--puter-menubar .menubar * {
            user-select: none;
        }                
        `,(document.head||document.getElementsByTagName("head")[0]).appendChild(t),document.addEventListener("click",function(i){if(i.target.classList.contains("dropdown-item-disabled"))return!1;i.target.classList.contains("menubar-item")||(document.querySelectorAll(".menubar-item.menubar-item-open").forEach(function(o){o.classList.remove("menubar-item-open")}),document.querySelectorAll(".dropdown").forEach(o=>o.style.display="none"))}),window.addEventListener("blur",function(i){document.querySelectorAll(".dropdown").forEach(function(o){o.style.display="none"}),document.querySelectorAll(".menubar-item.menubar-item-open").forEach(o=>o.classList.remove("menubar-item-open"))});const s=function(i){const o=[];if(!i.parentNode)return o;let a=i.parentNode.firstChild;for(;a;)a.nodeType===1&&a!==i&&o.push(a),a=a.nextSibling;return o};document.querySelectorAll(".menubar-item").forEach(i=>i.addEventListener("mousedown",function(o){document.querySelectorAll(".dropdown").forEach(function(a){a.style.display="none"}),document.querySelectorAll(".menubar-item.menubar-item-open").forEach(function(a){a!=o.target&&a.classList.remove("menubar-item-open")}),this.classList.contains("menubar-item-open")?document.querySelectorAll(".menubar-item.menubar-item-open").forEach(function(a){a.classList.remove("menubar-item-open")}):o.target.classList.contains("dropdown-item")||(this.classList.add("menubar-item-open"),s(this).forEach(function(a){a.style.display="block"}))})),document.querySelectorAll(".--puter-menubar .menubar-item").forEach(i=>i.addEventListener("mouseover",function(o){const a=document.querySelectorAll(".menubar-item.menubar-item-open");a.length>0&&a[0]!==o.target&&o.target.dispatchEvent(new Event("mousedown"))}))}on(t,r){super.on(t,r),h(this,pr).includes(t)&&h(this,mr).has(t)&&r(h(this,mr).get(t))}showSpinner(t){if(h(this,xt))return;if(!document.getElementById("puter-spinner-styles")){const o=document.createElement("style");o.id="puter-spinner-styles",o.textContent=`
                .puter-loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 10px;
                }
    
                .puter-loading-text {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%;
                }
    
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
    
                .puter-loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 120px; 
                    background: #ffffff; 
                    border-radius: 10px;
                    padding: 20px;
                    min-width: 120px;
                }
            `,document.head.appendChild(o)}const r=document.createElement("div");r.classList.add("puter-loading-overlay");const s={position:"fixed",top:"0",left:"0",width:"100%",height:"100%",backgroundColor:"rgba(255, 255, 255, 0.8)",zIndex:"2147483647",display:"flex",justifyContent:"center",alignItems:"center",pointerEvents:"all"};Object.assign(r.style,s);const i=document.createElement("div");i.classList.add("puter-loading-container"),i.innerHTML=`
            <div class="puter-loading-spinner"></div>
            <div class="puter-loading-text">${t??"Working..."}</div>
        `,r.appendChild(i),document.body.appendChild(r),y(this,xt,!0),y(this,br,Date.now()),y(this,_t,setTimeout(()=>{y(this,_t,null)},1e3))}hideSpinner(){if(!h(this,xt))return;h(this,_t)&&(clearTimeout(h(this,_t)),y(this,_t,null));const t=Date.now()-h(this,br),r=Math.max(0,1200-t);r>0?(h(this,$t)&&clearTimeout(h(this,$t)),y(this,$t,setTimeout(()=>{_(this,S,si).call(this)},r))):_(this,S,si).call(this)}isWorkingActive(){return h(this,xt)}getLanguage(){return this.env==="gui"?new Promise(t=>{t(window.locale)}):new Promise(t=>{_(this,S,K).call(this,"getLanguage",t,{})})}}dt=new WeakMap,Qr=new WeakMap,U=new WeakMap,fr=new WeakMap,Ut=new WeakMap,en=new WeakMap,Ot=new WeakMap,pr=new WeakMap,mr=new WeakMap,xt=new WeakMap,_t=new WeakMap,gr=new WeakMap,S=new WeakSet,Wu=function(){try{return new URL(puter.defaultGUIOrigin).origin}catch{return null}},$n=function(t){t&&h(this,gr).add(t)},Gu=function(t){if(this.messageTarget)return t.source===this.messageTarget;const r=_(this,S,Wu).call(this);return!r||t.origin!==r?!1:t.source?h(this,gr).has(t.source):h(this,gr).size>0},K=function(t,r,s={}){var o;const i=Ze(this,dt)._++;(o=this.messageTarget)==null||o.postMessage({msg:t,env:this.env,appInstanceID:this.appInstanceID,uuid:i,...s},"*"),h(this,U)[i]=(...a)=>{r(...a)}},ni=function(t,r={}){return new Promise(s=>{_(this,S,K).call(this,t,s,r)})},Ge=function(t,r){var i;const s=this.util.rpc.getDehydrator({target:this.messageTarget});(i=this.messageTarget)==null||i.postMessage({msg:t,env:this.env,appInstanceID:this.appInstanceID,value:s.dehydrate(r)},"*")},Fr=async function({callback:t,method:r,parameters:s}){var l;let i,o;await new Promise(c=>{i=new Promise(d=>{o=d,c()})});const a=this.util.rpc.registerCallback(o,this.messageTarget);(l=this.messageTarget)==null||l.postMessage({$:"puter-ipc",v:2,appInstanceID:this.appInstanceID,env:this.env,msg:r,parameters:s,uuid:a},"*");const u=await i;return t&&t(u),u},Vu=async function(t){if(!this.authToken)return!1;const r=Array.isArray(t==null?void 0:t.permissions)?t.permissions:[t==null?void 0:t.permission];if(r.length===0||r.length>la||r.some(i=>typeof i!="string"||i===""))return!1;let s;try{const i=await Promise.race([Uu(this.puter,[...new Set(r)]),new Promise(o=>{s=setTimeout(()=>o(null),Vg)})]);return i===null?!1:r.every(o=>i[o]===!0)}catch{return!1}finally{clearTimeout(s)}},br=new WeakMap,$t=new WeakMap,si=function(){var r;const t=document.querySelector(".puter-loading-overlay");t&&((r=t.parentNode)==null||r.removeChild(t)),y(this,xt,!1),y(this,br,null),y(this,$t,null)};const Jg=Xg,Jr="9a9c83a4-7897-43a0-93b9-53217b84fde6",Xu=(n,e,t)=>{Object.defineProperty(n,e,{value:t,writable:!0,enumerable:!0,configurable:!0})},Kg=()=>{const n=crypto.getRandomValues(new Uint8Array(16));return Array.from(n,e=>e.toString(16).padStart(2,"0")).join("")};class Yg{constructor(){this.callbacks=new Map}register_callback(e,t){const r=Kg();return this.callbacks.set(r,{callback:e,source:t}),r}attach_to_source(e){e.addEventListener("message",t=>{const{data:r}=t;if(!r||typeof r!="object"||r.$SCOPE!==Jr)return;const s=this.callbacks.get(r.id);!s||t.source!==s.source||s.callback(...Array.isArray(r.args)?r.args:[])})}}class Zg{constructor({callbackManager:e,source:t}){this.callbackManager=e,this.source=t}dehydrate(e){return this.dehydrate_value_(e)}dehydrate_value_(e){if(typeof e=="function"){const t=this.callbackManager.register_callback(e,this.source);return{$SCOPE:Jr,id:t}}else{if(Array.isArray(e))return e.map(this.dehydrate_value_.bind(this));if(typeof e=="object"&&e!==null){const t={};for(const r of Object.keys(e))Xu(t,r,this.dehydrate_value_(e[r]));return t}else return e}}}class Qg{constructor({target:e}){this.target=e}hydrate(e){return this.hydrate_value_(e)}hydrate_value_(e){if(e&&typeof e=="object"&&e.$SCOPE===Jr){const{id:t}=e;return(...r)=>{this.target.postMessage({$SCOPE:Jr,id:t,args:r},"*")}}else{if(Array.isArray(e))return e.map(this.hydrate_value_.bind(this));if(typeof e=="object"&&e!==null){const t={};for(const r of Object.keys(e))Xu(t,r,this.hydrate_value_(e[r]));return t}}return e}}class eb{constructor(){this.rpc=new tb}}class tb{constructor(){this.callbackManager=new Yg,this.callbackManager.attach_to_source(globalThis)}getDehydrator({target:e}={}){return new Zg({callbackManager:this.callbackManager,source:e})}getHydrator({target:e}){return new Qg({target:e})}registerCallback(e,t){return this.callbackManager.register_callback(e,t)}send(e,t,...r){e.postMessage({$SCOPE:Jr,id:t,args:r},"*")}}var rt,wt;class rb extends Ne{constructor(){super(...arguments);E(this,rt)}async create(t,r,s){await _(this,rt,wt).call(this);let i;if(typeof s=="object"||typeof s>"u"){const u=this.puter.whoami||await this.puter.getUser();if((s==null?void 0:s.sandbox)??!!u.is_user_token){let c;try{c=await this.puter.apps.get(`sandbox-${t}`)}catch{c=await this.puter.apps.create(`sandbox-${t}`,"https://worker-sandbox.puter.com/")}if(c.owner.uuid!==u.uuid)throw new Error(`Sandbox context is not owned by you! This worker's sandbox is currently owned by: ${c.owner.username}`);i=c.uid}}if(typeof s=="string"){const u=(await this.puter.apps.list()).find(l=>l.name===s);if(!u)throw{message:`No app named '${s}' in your account`,code:"app_not_found"};i=u.uid}t=t.toLocaleLowerCase();let o=await this.puter.kv.get("user-workers");o||(o={}),r=ee(r);const a=await B({iface:"workers",driver:"worker-service",method:"create",argNames:["authorization","filePath","workerName","appId"]})(this.puter.authToken,r,t,i);if(!a.success)throw new Error((a==null?void 0:a.errors)||"Driver failed to execute, do you have the necessary permissions?");return o[t]={filePath:r,url:a.url,deployTime:Date.now(),createTime:Date.now()},await this.puter.kv.set("user-workers",o),a}async exec(...t){await _(this,rt,wt).call(this);const r=new Request(...t);return!r.headers.get("puter-auth")&&!r.headers.get("x-puter-no-auth")&&r.headers.set("puter-auth",this.puter.authToken),r.headers.delete("x-puter-no-auth"),fetch(r)}list(t){const r=t&&typeof t=="object"?t:{},s=Object.prototype.hasOwnProperty.call(r,"cursor"),i=B({iface:"workers",driver:"worker-service",method:"getFilePaths"}),o={};r.limit!==void 0&&(o.limit=r.limit);const a=u=>i({...o,...u});if(r.stream===!0){if(r.offset!==void 0)throw{message:"`offset` cannot be combined with `stream`; pass `cursor` to resume from a position.",code:"invalid_request"};const u=this;return async function*(){var l;await _(l=u,rt,wt).call(l),yield*Je(a,{cursor:r.cursor,includeTotal:r.includeTotal===!0})}()}return r.limit!==void 0||r.offset!==void 0||s||r.includeTotal!==void 0?(async()=>{await _(this,rt,wt).call(this);const u={...o};return r.offset!==void 0&&(u.offset=r.offset),s&&(u.cursor=r.cursor??null),r.includeTotal!==void 0&&(u.includeTotal=r.includeTotal),await i(u)})():(async()=>(await _(this,rt,wt).call(this),await Qt(a)))()}async get(t){return await _(this,rt,wt).call(this),t=t.toLocaleLowerCase(),(await B({iface:"workers",driver:"worker-service",method:"getFilePaths",argNames:["workerName"]})(t))[0]}async delete(t){await _(this,rt,wt).call(this),t=t.toLocaleLowerCase();const r=await B({iface:"workers",driver:"worker-service",method:"destroy",argNames:["authorization","workerName"]})(this.puter.authToken,t);if(r.result){let s=await this.puter.kv.get("user-workers");return s||(s={}),delete s[t],await this.puter.kv.set("user-workers",s),!0}else throw new Error((r==null?void 0:r.errors)||"Driver failed to execute, do you have the necessary permissions?")}async getLoggingHandle(t){const r=await B({iface:"workers",driver:"worker-service",method:"getLoggingUrl"})(this.puter.authToken,t),s=new WebSocket(`${r}/${t}`);let i=!1;const o=new EventTarget;return o.onLog=a=>{},Object.defineProperty(o,"start",{enumerable:!1,value:async a=>{s.addEventListener("message",u=>{i&&a.enqueue(JSON.parse(u.data))}),s.addEventListener("close",()=>{try{a.close()}catch{}})}}),Object.defineProperty(o,"cancel",{enumerable:!1,value:async()=>{s.close()}}),o.close=()=>s.close(),new Promise((a,u)=>{s.addEventListener("message",c=>{const d=JSON.parse(c.data);if(!i){(d==null?void 0:d.type)==="ready"&&(i=!0,a(o));return}const f=new MessageEvent("log",{data:d});o.dispatchEvent(f),o.onLog(f)}),s.onopen=()=>{s.send(JSON.stringify({type:"auth",token:this.puter.authToken}))};const l=()=>{i||u("Failed to open logging connection")};s.onerror=l,s.onclose=l})}}rt=new WeakSet,wt=async function(){if(!this.puter.authToken&&this.puter.env==="web")try{await this.puter.ui.authenticateWithPuter()}catch{throw"Authentication failed."}};const nb=/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/,sb=/^[A-Z0-9]{0,4}-[0-9A-F]{6}$/;function Ju(n){return typeof n=="string"&&nb.test(n)&&!sb.test(n)}const ib='{"ping":1}',ob=3e4,ab=4001,ub=1e3,cb=3e4,lb=6,db=15e3;function Ku(n,e){if(!e)return n;const t=new URL(n);return t.searchParams.set("room",e),t.toString()}function Yu(n,e){const t=new Error(n);return e&&(t.code=e),t}class hb extends Event{constructor(t,r){super("connection");p(this,"conn");p(this,"user");this.conn=t,this.user=r}}class fb extends Event{constructor(t){super("reconnect");p(this,"inviteCode");this.inviteCode=t}}class pb extends Event{constructor(t){super("close");p(this,"reason");this.reason=t}}class mb extends Event{constructor(t){super("message");p(this,"data");this.data=t}}class gb extends Event{constructor(){super("open")}}class bb extends Event{constructor(t=void 0){super("close");p(this,"reason");this.reason=t}}class yb extends Event{constructor(t){super("error");p(this,"error");this.error=t}}var fe,jt,zt,Ve,yr,nt,Oe,tn,rn,Ht,V,ii,Zu,Nr,Qu,oi,ec,ai,tc;class wb extends EventTarget{constructor(t){super();E(this,V);E(this,fe,null);E(this,jt,null);E(this,zt);E(this,Ve,{});E(this,yr,!1);E(this,nt,!1);E(this,Oe,null);E(this,tn,0);E(this,rn,0);E(this,Ht,null);p(this,"connections",new Map);p(this,"inviteCode");y(this,zt,t)}async start(t={}){y(this,Ve,t);const r=await _(this,V,ii).call(this);return y(this,yr,!0),r}setGuestGrant(t){var r;y(this,Ve,{...h(this,Ve),guestGrant:t||void 0}),h(this,yr)&&((r=h(this,fe))==null?void 0:r.readyState)===1&&h(this,fe).send(JSON.stringify({server:{grant:{grant:t||null}}}))}close(){y(this,nt,!0),_(this,V,Nr).call(this),h(this,Oe)&&(clearTimeout(h(this,Oe)),y(this,Oe,null));for(const[t,r]of this.connections)r.close();if(h(this,fe)){h(this,fe).onclose=null;try{h(this,fe).close()}catch{}y(this,fe,null)}}}fe=new WeakMap,jt=new WeakMap,zt=new WeakMap,Ve=new WeakMap,yr=new WeakMap,nt=new WeakMap,Oe=new WeakMap,tn=new WeakMap,rn=new WeakMap,Ht=new WeakMap,V=new WeakSet,ii=async function(){const t=new WebSocket(Ku(h(this,zt).signallerUrl,h(this,Ve).name));y(this,fe,t),await new Promise((s,i)=>{t.onopen=s,t.onerror=()=>i(new Error("Could not reach the signaller")),t.onclose=()=>{i(new Error("Connection closed unexpectedly"))}}),t.onmessage=s=>{let i;try{i=JSON.parse(s.data)}catch{return}return _(this,V,tc).call(this,i)},t.onclose=s=>{h(this,fe)===t&&_(this,V,Qu).call(this,s)},t.onerror=null,t.send(JSON.stringify({server:{create:{authToken:h(this,zt).authToken,anonToken:h(this,Ve).anonToken,port:h(this,Ve).port,name:h(this,Ve).name,grant:h(this,Ve).guestGrant}}}));const r=await new Promise((s,i)=>{const o=setTimeout(()=>{y(this,jt,null),i(new Error("Server creation timed out"))},db);y(this,jt,a=>{clearTimeout(o),y(this,jt,null),a.success?s(a.invitecode??this.inviteCode):i(Yu(a.error,a.code))})}).catch(s=>{t.onclose=null;try{t.close()}catch{}throw h(this,fe)===t&&y(this,fe,null),s});return this.inviteCode=r,_(this,V,Zu).call(this,t),r},Zu=function(t){_(this,V,Nr).call(this),y(this,Ht,setInterval(()=>{if(t.readyState===1)try{t.send(ib)}catch{}},ob))},Nr=function(){h(this,Ht)&&(clearInterval(h(this,Ht)),y(this,Ht,null))},Qu=function(t){if(_(this,V,Nr).call(this),y(this,fe,null),!(h(this,nt)||!h(this,yr))){if((t==null?void 0:t.code)===ab){_(this,V,ai).call(this,"replaced");return}_(this,V,oi).call(this)}},oi=function(){if(h(this,nt)||h(this,Oe))return;const t=Ze(this,tn)._++,r=Math.min(cb,ub*2**t),s=r/2+Math.random()*(r/2);y(this,Oe,setTimeout(()=>{y(this,Oe,null),_(this,V,ec).call(this)},s))},ec=async function(){if(h(this,nt))return;let t;try{t=await _(this,V,ii).call(this)}catch(r){if(h(this,nt))return;if((r==null?void 0:r.code)==="name_in_use"&&++Ze(this,rn)._>=lb){_(this,V,ai).call(this,"name_in_use");return}_(this,V,oi).call(this);return}y(this,tn,0),y(this,rn,0),this.dispatchEvent(new fb(t))},ai=function(t){h(this,nt)||(y(this,nt,!0),_(this,V,Nr).call(this),h(this,Oe)&&(clearTimeout(h(this,Oe)),y(this,Oe,null)),this.dispatchEvent(new pb(t)))},tc=async function(t){var r,s;if(!(!t||!t.server)){if(t.server.create){(r=h(this,jt))==null||r.call(this,t.server.create);return}if(t.server.connect){let i=t.server.connect.id,o=new rc(h(this,zt));this.connections.set(i,o);const a=h(this,fe);o.peerconnection.onicecandidate=u=>{u.candidate&&(a==null?void 0:a.readyState)===1&&a.send(JSON.stringify({server:{candidate:{id:i,candidate:u.candidate}}}))},this.dispatchEvent(new hb(o,t.server.connect.user))}if(t.server.candidate){let i=t.server.candidate.id,o=this.connections.get(i);o&&await o.addIceCandidate(t.server.candidate.candidate)}if(t.server.offer){let i=t.server.offer.id,o=this.connections.get(i);if(!o)return;await o.setRemoteDescription(new RTCSessionDescription(t.server.offer.offer));const a=await o.createAnswer();((s=h(this,fe))==null?void 0:s.readyState)===1&&h(this,fe).send(JSON.stringify({server:{answer:{id:i,answer:a}}}))}}};var Z,ht,$e,wr,Se,ui,nc,Mt;class rc extends EventTarget{constructor(t){super();E(this,Se);E(this,Z);p(this,"peerconnection");p(this,"owner");p(this,"room");E(this,ht);E(this,$e);p(this,"connected",!1);p(this,"closed",!1);E(this,wr,[]);y(this,ht,t),this.peerconnection=new RTCPeerConnection({iceTransportPolicy:t.forceRelay?"relay":"all",iceServers:t.iceServers}),y(this,$e,this.peerconnection.createDataChannel("channel-1",{negotiated:!0,id:2})),h(this,$e).onmessage=r=>{this.dispatchEvent(new mb(r.data))},h(this,$e).onopen=()=>{this.connected=!0;for(const r of h(this,wr))this.send(r);y(this,wr,[]),this.dispatchEvent(new gb),_(this,Se,ui).call(this)},h(this,$e).onclose=()=>{_(this,Se,Mt).call(this,void 0,void 0)},h(this,$e).onerror=r=>{_(this,Se,Mt).call(this,void 0,r.error)}}async connect(t,r={}){const s=!r.port&&Ju(t)?t:void 0;y(this,Z,new WebSocket(Ku(h(this,ht).signallerUrl,s))),await new Promise((i,o)=>{h(this,Z).onopen=i,h(this,Z).onerror=o,h(this,Z).onclose=()=>{o(new Error("Connection closed unexpectedly"))}}),h(this,Z).onopen=null,h(this,Z).onerror=null,h(this,Z).onclose=()=>{_(this,Se,Mt).call(this,void 0,new Error("Connection closed unexpectedly before peer offer was sent"))},h(this,Z).send(JSON.stringify({client:{connect:{authToken:h(this,ht).authToken,anonToken:r.anonToken,invitecode:t,port:r.port}}})),this.peerconnection.onicecandidate=i=>{var o;((o=h(this,Z))==null?void 0:o.readyState)===1&&h(this,Z).send(JSON.stringify({client:{candidate:{candidate:i.candidate}}}))},h(this,Z).onmessage=async i=>{var a;let o;try{o=JSON.parse(i.data).client}catch{return}if(o){if(o.answer&&this.setRemoteDescription(o.answer.answer),o.candidate&&this.addIceCandidate(o.candidate.candidate),o.connect)if(o.connect.success){if(this.owner=o.connect.owner,this.room=o.connect.room,await _(this,Se,nc).call(this,o.connect.grant,r),this.closed)return;const u=await this.createOffer();if(((a=h(this,Z))==null?void 0:a.readyState)!==1)return;h(this,Z).send(JSON.stringify({client:{offer:{offer:u}}}))}else _(this,Se,Mt).call(this,void 0,Yu(o.connect.error,o.connect.code));o.disconnect&&!this.connected&&_(this,Se,Mt).call(this,o.disconnect.reason)}}}close(t){_(this,Se,Mt).call(this,t,void 0)}async createOffer(){const t=await this.peerconnection.createOffer();return await this.peerconnection.setLocalDescription(t),t}async createAnswer(){const t=await this.peerconnection.createAnswer();return await this.peerconnection.setLocalDescription(t),t}async setRemoteDescription(t){await this.peerconnection.setRemoteDescription(t)}async addIceCandidate(t){await this.peerconnection.addIceCandidate(t)}send(t){if(!this.connected){h(this,wr).push(t);return}h(this,$e).send(t)}}Z=new WeakMap,ht=new WeakMap,$e=new WeakMap,wr=new WeakMap,Se=new WeakSet,ui=function(){h(this,Z)&&(h(this,Z).onclose=null,h(this,Z).close(),y(this,Z,null))},nc=async function(t,r){if(!(!t||!r.anonToken||r.turnGrant||r.iceServers)&&typeof h(this,ht).iceServersFor=="function")try{const s=await h(this,ht).iceServersFor({turnGrant:t});if(this.closed||!s)return;this.peerconnection.setConfiguration({iceTransportPolicy:h(this,ht).forceRelay?"relay":"all",iceServers:s})}catch(s){console.warn("Unable to use the host’s relays. Some connections may fail.",s)}},Mt=function(t,r){this.closed||(this.closed=!0,this.connected=!1,h(this,Z)&&_(this,Se,ui).call(this),h(this,$e)&&(h(this,$e).onclose=null,h(this,$e).close()),this.peerconnection&&this.peerconnection.close(),r&&this.dispatchEvent(new yb(r)),this.dispatchEvent(new bb(t)))};var vr,At,nn,sn,on,xr,an,Fe,sc,ci,li,di;class vb extends Ne{constructor(){super(...arguments);E(this,Fe);E(this,vr);E(this,At);E(this,nn);E(this,sn);E(this,on);E(this,xr);E(this,an)}async createGuestGrant(){const t=await G(`${this.APIOrigin}/peer/turn-grant`,{method:"POST",includePuterAuth:!0,headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error("Failed to create a guest grant.");return await t.json()}async ensureTurnRelays(t={}){const r=t.turnGrant?`grant:${t.turnGrant}`:"session";if(r!==h(this,an)&&(y(this,an,r),y(this,At,void 0),y(this,xr,!1)),h(this,xr)||h(this,At)&&Date.now()-h(this,on)<h(this,sn)*1e3)return;const s=t.turnGrant?await G(`${this.APIOrigin}/peer/guest-turn`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({grant:t.turnGrant})}):await G(`${this.APIOrigin}/peer/generate-turn`,{method:"POST",includePuterAuth:!0,headers:{"Content-Type":"application/json"}});if(!s.ok){y(this,xr,!0);return}const{iceServers:i,ttl:o}=await s.json();y(this,At,i),y(this,sn,o),y(this,on,Date.now())}async serve(t){if((t==null?void 0:t.name)!==void 0&&!Ju(t.name))throw new TypeError("Room names are 3–64 lowercase letters, digits and hyphens, not starting or ending with a hyphen.");t!=null&&t.anonToken||await _(this,Fe,ci).call(this,"create a server");const r=await _(this,Fe,di).call(this,t),s=new wb(r);return await s.start(t),s}async connect(t,r){r!=null&&r.anonToken||await _(this,Fe,ci).call(this,"connect to a server");const s=await _(this,Fe,di).call(this,r),i=new rc(s);return await i.connect(t,r),i}}vr=new WeakMap,At=new WeakMap,nn=new WeakMap,sn=new WeakMap,on=new WeakMap,xr=new WeakMap,an=new WeakMap,Fe=new WeakSet,sc=async function(){if(h(this,vr))return;const t=await G(`${this.APIOrigin}/peer/signaller-info`);if(!t.ok)throw new Error("Failed to get signaller info from Puter.");const{url:r,fallbackIce:s}=await t.json();y(this,nn,s),y(this,vr,r)},ci=async function(t){if(!(this.authToken||this.puter.env!=="web"))try{await this.puter.ui.authenticateWithPuter()}catch{throw new Error(`Need authentication to ${t} but failed to authenticate with Puter.`)}},li=async function(t){return t!=null&&t.iceServers?t.iceServers:(await this.ensureTurnRelays(t??{}),h(this,At)?h(this,At):(console.warn("Unable to use TURN relays. Some connections may fail."),h(this,nn)))},di=async function(t){await _(this,Fe,sc).call(this);const r=await _(this,Fe,li).call(this,t);return{authToken:this.authToken,iceServers:r,signallerUrl:h(this,vr),forceRelay:t==null?void 0:t.forceRelay,iceServersFor:s=>_(this,Fe,li).call(this,s)}};const xb=vb;class Rt extends(globalThis.HTMLElement||Object){constructor(){super(),typeof globalThis.HTMLElement<"u"&&this.attachShadow({mode:"open"})}connectedCallback(){this._setupThemeWatchers(),this._applyTheme(),this._rerender()}disconnectedCallback(){this._teardownThemeWatchers()}_setupThemeWatchers(){typeof globalThis.MutationObserver<"u"&&!this._themeObserver&&(this._themeObserver=new globalThis.MutationObserver(()=>this._applyTheme()),this._themeObserver.observe(this,{attributes:!0,attributeFilter:["theme"]})),typeof globalThis.matchMedia=="function"&&!this._themeMediaQuery&&(this._themeMediaQuery=globalThis.matchMedia("(prefers-color-scheme: dark)"),this._themeMediaListener=()=>this._applyTheme(),this._themeMediaQuery.addEventListener&&this._themeMediaQuery.addEventListener("change",this._themeMediaListener))}_teardownThemeWatchers(){this._themeObserver&&(this._themeObserver.disconnect(),this._themeObserver=null),this._themeMediaQuery&&this._themeMediaListener&&this._themeMediaQuery.removeEventListener&&this._themeMediaQuery.removeEventListener("change",this._themeMediaListener),this._themeMediaQuery=null,this._themeMediaListener=null}_applyTheme(){if(typeof this.getAttribute!="function")return;const e=this.getAttribute("theme");let t;e==="dark"?t=!0:e==="light"?t=!1:t=typeof globalThis.matchMedia=="function"&&globalThis.matchMedia("(prefers-color-scheme: dark)").matches,this.classList.toggle("puter-theme-dark",t)}_rerender(){this.shadowRoot&&(this.shadowRoot.innerHTML=`<style>${this.getStyles()}</style>${this.render()}`,this.onReady())}getStyles(){return""}render(){return""}onReady(){}emitEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}$(e){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector(e)}$$(e){var t;return(t=this.shadowRoot)==null?void 0:t.querySelectorAll(e)}open(){const e=this.$("dialog");e&&!e.open&&e.showModal()}close(){const e=this.$("dialog");e&&e.close(),this.remove()}}const Ce='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',ic=`
    /* Base button */
    .btn {
        color: #666666;
        font-size: 14px;
        text-align: center;
        line-height: 35px;
        height: 35px;
        padding: 0 30px;
        margin: 0;
        display: inline-block;
        appearance: none;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #b9b9b9;
        background: linear-gradient(#f6f6f6, #e1e1e1);
        box-shadow: inset 0px 1px 0px rgb(255 255 255 / 30%), 0 1px 2px rgb(0 0 0 / 15%);
        border-radius: 4px;
        outline: none;
        font-family: ${Ce};
    }
    .btn:active {
        background-color: #eeeeee;
        border-color: #cfcfcf;
        color: #a9a9a9;
        box-shadow: inset 0px 2px 3px rgb(0 0 0 / 36%), 0px 1px 0px white;
    }
    .btn:focus-visible {
        border-color: rgb(118 118 118);
    }

    /* Primary button */
    .btn-primary {
        border-color: #088ef0;
        background: linear-gradient(#34a5f8, #088ef0);
        color: white;
    }
    .btn-primary:active {
        background-color: #2798eb;
        border-color: #2798eb;
        color: #bedef5;
    }

    /* Danger button */
    .btn-danger {
        border-color: #f00808;
        background: linear-gradient(#ff4e4e, #ff4c4c);
        color: white;
    }

    /* Action/success button */
    .btn-success, .btn-action {
        border-color: #08bf4e;
        background: linear-gradient(#29d55d, #1ccd60);
        color: white;
    }

    /* Default button */
    .btn-default {
        color: #666666;
        border: 1px solid #b9b9b9;
        background: linear-gradient(#f6f6f6, #e1e1e1);
        box-shadow: inset 0px 1px 0px rgb(255 255 255 / 30%), 0 1px 2px rgb(0 0 0 / 15%);
    }

    /* Block button (full width) */
    .btn-block {
        width: 100%;
    }

    /* Normal size */
    .btn-normal {
        font-size: 16px;
        height: 40px;
        line-height: 38px;
        padding: 0 40px;
    }

    /* Disabled */
    .btn:disabled, .btn.disabled {
        background: #EEE !important;
        border: 1px solid #DDD !important;
        text-shadow: 0 1px 1px white !important;
        color: #CCC !important;
        cursor: default !important;
        pointer-events: none;
    }
`,Rr=n=>`data:image/svg+xml;base64,${btoa(n)}`,Pr={error:`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#e53935"/>
  <rect x="22" y="12" width="4" height="16" rx="2" fill="#ffffff"/>
  <circle cx="24" cy="34" r="2.5" fill="#ffffff"/>
</svg>`,warning:`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M24 5 L44 40 L4 40 Z" fill="#ffc107" stroke="#e0a800" stroke-width="1.5" stroke-linejoin="round"/>
  <rect x="22" y="18" width="4" height="12" rx="2" fill="#3f3f3f"/>
  <circle cx="24" cy="35" r="2" fill="#3f3f3f"/>
</svg>`,info:`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#2196f3"/>
  <circle cx="24" cy="14" r="2.5" fill="#ffffff"/>
  <rect x="22" y="20" width="4" height="16" rx="2" fill="#ffffff"/>
</svg>`,success:`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#4caf50"/>
  <path d="M14 24 L21 31 L34 17" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,confirm:`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#2196f3"/>
  <path d="M18.5 18.5 Q18.5 12.5 24 12.5 Q29.5 12.5 29.5 18 Q29.5 22 25.5 24 Q24 24.8 24 27.5" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="24" cy="34" r="2.25" fill="#ffffff"/>
</svg>`},da={error:Rr(Pr.error),warning:Rr(Pr.warning),info:Rr(Pr.info),success:Rr(Pr.success),confirm:Rr(Pr.confirm)};var Wt,kt;class _b extends Rt{constructor(){super(...arguments);E(this,Wt,null);E(this,kt,null)}get buttons(){return h(this,Wt)}set buttons(t){y(this,Wt,t)}get options(){return h(this,kt)}set options(t){y(this,kt,t)}getStyles(){return`
            dialog {
                background: transparent;
                border: none;
                box-shadow: none;
                outline: none;
                padding: 0;
                max-width: 90vw;
            }
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.5);
            }
            .alert-body {
                background-color: rgba(231, 238, 245, .95);
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                border: none;
                border-radius: 4px;
                padding: 32px;
                box-shadow: 0px 0px 15px #00000066;
                font-family: ${Ce};
                color: #414650;
                width: 350px;
                max-width: calc(100vw - 32px);
                box-sizing: border-box;
                text-align: center;
            }
            .alert-icon {
                width: 64px;
                height: 64px;
                margin: 10px auto 20px;
                display: block;
            }
            .message {
                font-size: 15px;
                line-height: 1.5;
                color: #414650;
                text-shadow: 1px 1px #ffffff52;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 20px;
            }
            .message p { margin: 0 0 10px; }
            .message p:last-child { margin-bottom: 0; }
            .buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 10px;
            }
            button {
                width: 100%;
                height: 35px;
                line-height: 35px;
                padding: 0;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 400;
                cursor: pointer;
                font-family: ${Ce};
                box-sizing: border-box;
                outline: none;
                color: #666666;
                border: 1px solid #b9b9b9;
                background: linear-gradient(#f6f6f6, #e1e1e1);
            }
            button:active {
                background-color: #eeeeee;
                border-color: #cfcfcf;
                color: #a9a9a9;
                box-shadow: inset 0px 2px 3px rgb(0 0 0 / 36%), 0px 1px 0px white;
            }
            button:focus-visible {
                border-color: rgb(118 118 118);
            }
            .btn-primary {
                background: linear-gradient(#34a5f8, #088ef0);
                border: 1px solid #088ef0;
                color: white;
            }
            .btn-primary:active {
                background-color: #2798eb;
                border-color: #2798eb;
                color: #bedef5;
            }
            .btn-danger {
                background: linear-gradient(#ff4e4e, #ff4c4c);
                border: 1px solid #f00808;
                color: white;
            }
            .btn-success {
                background: linear-gradient(#29d55d, #1ccd60);
                border: 1px solid #08bf4e;
                color: white;
            }
            .btn-warning {
                background: linear-gradient(#ffb74d, #ffa000);
                border: 1px solid #ffa000;
                color: #333;
            }
            .btn-info {
                background: linear-gradient(#42a5f5, #1976d2);
                border: 1px solid #1976d2;
                color: white;
            }
            .btn-default {
                color: #666666;
                border: 1px solid #b9b9b9;
                background: linear-gradient(#f6f6f6, #e1e1e1);
            }
            @media (max-width: 480px) {
                .alert-body {
                    width: 100%;
                    padding: 24px 20px;
                }
                button {
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                }
            }
        `}render(){var u,l,c;const t=this.getAttribute("message")||"",r=((u=h(this,kt))==null?void 0:u.type)||this.getAttribute("type")||"",s=((l=h(this,kt))==null?void 0:l.body_icon)||((c=h(this,kt))==null?void 0:c.icon)||this.getAttribute("icon")||da[r]||da.info,i=h(this,Wt)||[{label:"OK",value:!0,type:"primary"}],o=`<img class="alert-icon" src="${this._escapeAttr(s)}" alt="">`,a=i.map((d,f)=>{const g=d.type||(f===i.length-1?"primary":"default"),m=d.value!==void 0?d.value:d.label;return`<button class="btn-${g}" data-value="${this._escapeAttr(String(m))}">${this._escapeHTML(d.label)}</button>`}).join("");return`
            <dialog>
                <div class="alert-body">
                    ${o}
                    <div class="message">${this._renderMessage(t)}</div>
                    <div class="buttons">${a}</div>
                </div>
            </dialog>`}onReady(){const t=this.$("dialog"),r=h(this,Wt)||[{label:"OK",value:!0,type:"primary"}];this.$$("button").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.value,a=r.find(u=>String(u.value!==void 0?u.value:u.label)===o);this.emitEvent("response",a?a.value!==void 0?a.value:a.label:o),this.close()})}),t.addEventListener("click",i=>{i.target===t&&(this.emitEvent("response",void 0),this.close())});const s=this.$$("button");s.length>0&&s[s.length-1].focus()}_renderMessage(t){return this._escapeHTML(t).replace(/&lt;strong&gt;/g,"<strong>").replace(/&lt;\/strong&gt;/g,"</strong>").replace(/&lt;p&gt;/g,"<p>").replace(/&lt;\/p&gt;/g,"</p>").replace(/&lt;br\s*\/?&gt;/g,"<br>")}_escapeHTML(t){if(!t)return"";const r=document.createElement("div");return r.textContent=t,r.innerHTML}_escapeAttr(t){return String(t).replace(/"/g,"&quot;").replace(/'/g,"&#39;")}}Wt=new WeakMap,kt=new WeakMap;var un;class Ab extends Rt{constructor(){super(...arguments);E(this,un,null)}get options(){return h(this,un)}set options(t){y(this,un,t)}getStyles(){return`
            dialog {
                background: transparent;
                border: none;
                box-shadow: none;
                outline: none;
                padding: 0;
                max-width: 90vw;
            }
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.5);
            }
            .prompt-body {
                background-color: rgba(231, 238, 245, .95);
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                border: none;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0px 0px 15px #00000066;
                font-family: ${Ce};
                color: #414650;
                width: 450px;
                max-width: calc(100vw - 32px);
                box-sizing: border-box;
            }
            @media (max-width: 480px) {
                .prompt-body {
                    width: 100%;
                    padding: 24px 20px;
                }
                input[type="text"] {
                    padding: 12px;
                    font-size: 16px;
                }
                input[type="text"]:focus {
                    padding: 11px;
                }
                button {
                    padding: 14px 20px;
                    font-size: 16px;
                }
                .btn-ok {
                    flex: 1;
                }
                .btn-cancel {
                    flex: 1;
                }
            }
            .message {
                font-size: 15px;
                line-height: 1.5;
                color: #414650;
                text-shadow: 1px 1px #ffffff52;
                text-align: left;
            }
            .input-container {
                margin-top: 20px;
            }
            input[type="text"] {
                width: 100%;
                padding: 8px;
                border: 1px solid #b9b9b9;
                border-radius: 4px;
                color: #393f46;
                font-size: 14px;
                font-family: ${Ce};
                box-sizing: border-box;
                outline: none;
                transition: border-color 0.15s;
            }
            input[type="text"]:focus {
                border: 2px solid #01a0fd;
                padding: 7px;
            }
            .buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            .btn-cancel {
                background: linear-gradient(#f6f6f6, #e1e1e1);
                border: 1px solid #b9b9b9;
                color: #666666;
                border-radius: 4px;
                height: 35px;
                line-height: 35px;
                padding: 0 24px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                font-family: ${Ce};
                box-shadow: inset 0px 1px 0px rgb(255 255 255 / 30%), 0 1px 2px rgb(0 0 0 / 15%);
            }
            .btn-cancel:active {
                background-color: #eeeeee;
                border-color: #cfcfcf;
                color: #a9a9a9;
                box-shadow: inset 0px 2px 3px rgb(0 0 0 / 36%), 0px 1px 0px white;
            }
            .btn-ok {
                background: linear-gradient(#34a5f8, #088ef0);
                border: 1px solid #088ef0;
                color: white;
                border-radius: 4px;
                height: 35px;
                line-height: 35px;
                padding: 0 24px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                font-family: ${Ce};
                min-width: 110px;
                box-shadow: inset 0px 1px 0px rgb(255 255 255 / 30%), 0 1px 2px rgb(0 0 0 / 15%);
            }
            .btn-ok:active {
                background-color: #2798eb;
                border-color: #2798eb;
                color: #bedef5;
            }
            button:focus-visible {
                outline: 2px solid #01a0fd;
                outline-offset: 2px;
            }
        `}render(){const t=this.getAttribute("message")||"",r=this.getAttribute("placeholder")||"",s=this.getAttribute("default-value")||"";return`
            <dialog>
                <div class="prompt-body">
                    <div class="message">${this._escapeHTML(t)}</div>
                    <div class="input-container">
                        <input type="text" class="prompt-input" placeholder="${this._escapeAttr(r)}" value="${this._escapeAttr(s)}">
                    </div>
                    <div class="buttons">
                        <button class="btn-cancel">Cancel</button>
                        <button class="btn-ok">OK</button>
                    </div>
                </div>
            </dialog>`}onReady(){const t=this.$("dialog"),r=this.$(".prompt-input"),s=this.$(".btn-ok"),i=this.$(".btn-cancel");setTimeout(()=>r.focus(),30),r.addEventListener("keydown",o=>{o.key==="Enter"?(this.emitEvent("response",r.value),this.close()):o.key==="Escape"&&(this.emitEvent("response",!1),this.close())}),s.addEventListener("click",()=>{this.emitEvent("response",r.value),this.close()}),i.addEventListener("click",()=>{this.emitEvent("response",!1),this.close()}),t.addEventListener("click",o=>{o.target===t&&(this.emitEvent("response",!1),this.close())})}_escapeHTML(t){if(!t)return"";const r=document.createElement("div");return r.textContent=t,r.innerHTML}_escapeAttr(t){return t?t.replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}un=new WeakMap;const ir=[],kb=12,Eb=24,Db=16;function ha(){let n=Eb;for(const e of ir)e.style.top=`${n}px`,n+=e.offsetHeight+kb}const fa={info:{bg:"linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",color:"#0284c7"},success:{bg:"linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",color:"#16a34a"},warning:{bg:"linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",color:"#d97706"},error:{bg:"linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",color:"#dc2626"},default:{bg:"linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",color:"#7c3aed"}},pa={info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>`,success:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>`,warning:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,error:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>`,default:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>`};class Tb extends Rt{getStyles(){return`
            :host {
                position: fixed;
                right: ${Db}px;
                z-index: 999999;
                pointer-events: auto;
                transition: top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                            opacity 0.3s ease,
                            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .notification {
                width: 320px;
                border-radius: 11px;
                min-height: 54px;
                background: #ffffffcd;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                box-shadow: 0px 0px 17px -9px #000;
                border: 1px solid #d5d5d5;
                margin-bottom: 10px;
                display: flex;
                flex-direction: row;
                font-family: ${Ce};
                cursor: pointer;
                position: relative;
            }
            .notification:hover .close-btn {
                display: block;
            }
            .close-btn {
                position: absolute;
                background: white;
                border: none;
                border-radius: 100%;
                top: -6px;
                left: -6px;
                width: 13px;
                height: 13px;
                padding: 2px;
                filter: drop-shadow(0px 0px 0.5px rgb(51, 51, 51));
                display: none;
                cursor: pointer;
                font-size: 9px;
                line-height: 1;
                text-align: center;
                color: #666;
                z-index: 1;
            }
            .close-btn:hover {
                background: #f0f0f0;
                color: #222;
            }
            .icon-area {
                width: 40px;
                margin: 10px 5px 10px 15px;
                border-radius: 50%;
                filter: drop-shadow(0px 0px 0.5px rgb(51, 51, 51));
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .icon-area svg {
                width: 35px;
                height: 35px;
            }
            .icon-area img {
                width: 35px;
                height: 35px;
                object-fit: contain;
                border-radius: 50%;
            }
            :host([round-icon]) .icon-area img {
                border-radius: 50%;
            }
            .content {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                padding: 10px;
                min-width: 0;
            }
            .title {
                font-size: 12px;
                font-weight: 600;
                color: #333;
                line-height: 1.3;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .text {
                font-size: 12px;
                color: #555;
                margin-top: 4px;
                line-height: 1.4;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            /* Entrance animation */
            :host(.entering) {
                transform: translateX(110%) scale(0.95);
                opacity: 0;
            }
            :host(.visible) {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
            /* Exit animation */
            :host(.exiting) {
                transform: translateX(110%) scale(0.95);
                opacity: 0;
            }
            @media (max-width: 480px) {
                :host {
                    right: 10px;
                    left: 10px;
                }
                .notification {
                    width: auto;
                }
            }
            :host(.puter-theme-dark) .notification {
                background: #2d2d2dcd;
                border-color: #3a3a3a;
                box-shadow: 0px 0px 17px -6px #000;
            }
            :host(.puter-theme-dark) .close-btn {
                background: #3a3a3a;
                color: #ccc;
                filter: drop-shadow(0px 0px 0.5px rgb(230, 230, 230));
            }
            :host(.puter-theme-dark) .close-btn:hover {
                background: #4a4a4a;
                color: #fff;
            }
            :host(.puter-theme-dark) .icon-area {
                filter: drop-shadow(0px 0px 0.5px rgb(230, 230, 230));
            }
            :host(.puter-theme-dark) .title {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .text {
                color: #b0b0b0;
            }
        `}render(){const e=this.getAttribute("title")||"",t=this.getAttribute("text")||"",r=this.getAttribute("icon")||"",s=this.getAttribute("type")||"default";let i;if(r)i=`<div class="icon-area"><img src="${this._escapeAttr(r)}" alt=""></div>`;else{const o=fa[s]||fa.default,a=pa[s]||pa.default;i=`<div class="icon-area" style="color: ${o.color}">${a}</div>`}return`
            <div class="notification">
                ${i}
                <div class="content">
                    ${e?`<div class="title">${this._escapeHTML(e)}</div>`:""}
                    ${t?`<div class="text">${this._escapeHTML(t)}</div>`:""}
                </div>
                <button class="close-btn" aria-label="Close">✕</button>
            </div>`}onReady(){ir.push(this),this.classList.add("entering"),requestAnimationFrame(()=>{ha(),requestAnimationFrame(()=>{this.classList.remove("entering"),this.classList.add("visible")})}),this.$(".close-btn").addEventListener("click",t=>{t.stopPropagation(),this._dismiss()}),this.$(".notification").addEventListener("click",()=>{this.emitEvent("click",{})});const e=parseInt(this.getAttribute("duration")??"5000",10);e>0&&(this._dismissTimer=setTimeout(()=>this._dismiss(),e))}_dismiss(){this._dismissed||(this._dismissed=!0,this._dismissTimer&&clearTimeout(this._dismissTimer),this.classList.remove("visible"),this.classList.add("exiting"),setTimeout(()=>{const e=ir.indexOf(this);e!==-1&&ir.splice(e,1),ha(),this.emitEvent("close",{}),this.remove()},350))}disconnectedCallback(){super.disconnectedCallback(),this._dismissTimer&&clearTimeout(this._dismissTimer);const e=ir.indexOf(this);e!==-1&&ir.splice(e,1)}_escapeHTML(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}_escapeAttr(e){return e?e.replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}var De,q,je,Re,ze,Q,Gt,Vt,Xt,Te,st;const Mi=class Mi extends Rt{constructor(){super(...arguments);E(this,De,[]);E(this,q,null);E(this,je,null);E(this,Re,null);E(this,ze,[]);E(this,Q,null);E(this,Gt,"right");E(this,Vt,"");E(this,Xt,null);E(this,Te,null);E(this,st,null)}get items(){return h(this,De)}set items(t){y(this,De,t||[]),this.shadowRoot&&this.isConnected&&this._rerender()}getStyles(){return`
            :host {
                position: fixed;
                z-index: 9999999999;
            }

            /* .context-menu — lines 1647-1666 of style.css */
            .context-menu {
                overflow: hidden;
                white-space: nowrap;
                font-family: sans-serif;
                background: #fff;
                color: #333;
                border-radius: 8px;
                padding: 3px 0;
                min-width: 200px;
                background-color: rgb(255 255 255 / 85%);
                backdrop-filter: blur(3px);
                border: 1px solid #dcdcdc;
                box-shadow: 0px 3px 20px #00000022;
                margin-top: 5px;
                padding-left: 4px;
                padding-right: 4px;
                padding-top: 4px;
                padding-bottom: 4px;
                user-select: none;
                -webkit-user-select: none;
            }

            /* .context-menu-item:not(.context-menu-divider) — lines 1686-1694 */
            .menu-item {
                display: flex;
                align-items: center;
                padding: 5px 8px;
                list-style-type: none;
                user-select: none;
                -webkit-user-select: none;
                font-size: 12px;
                height: 28px;
                box-sizing: border-box;
                position: relative;
                cursor: default;
                white-space: nowrap;
                color: #333;
            }

            /* .context-menu-item-active:not(.context-menu-divider) — lines 1742-1745 */
            .menu-item:hover:not(.disabled):not(.divider),
            .menu-item.focused:not(.disabled):not(.divider),
            .menu-item.has-open-submenu {
                background-color: hsl(213, 74%, 56%);
                color: white;
                border-radius: 4px;
            }

            /* Active item turns all children white.
               For .has-open-submenu the :hover branch above already covers
               the hovered case; in the non-hovered grey state we want the
               children to keep their default colors, so we don't include
               .has-open-submenu here. */
            .menu-item:hover:not(.disabled):not(.divider) .icon,
            .menu-item:hover:not(.disabled):not(.divider) .check,
            .menu-item:hover:not(.disabled):not(.divider) .submenu-arrow,
            .menu-item:hover:not(.disabled):not(.divider) .label,
            .menu-item:hover:not(.disabled):not(.divider) .shortcut,
            .menu-item.focused:not(.disabled):not(.divider) .icon,
            .menu-item.focused:not(.disabled):not(.divider) .check,
            .menu-item.focused:not(.disabled):not(.divider) .submenu-arrow,
            .menu-item.focused:not(.disabled):not(.divider) .label,
            .menu-item.focused:not(.disabled):not(.divider) .shortcut {
                color: white;
            }
            .menu-item:hover:not(.disabled):not(.divider) .icon svg,
            .menu-item.focused:not(.disabled):not(.divider) .icon svg {
                filter: brightness(0) invert(1);
            }
            .menu-item:hover:not(.disabled):not(.divider) .icon img,
            .menu-item.focused:not(.disabled):not(.divider) .icon img {
                filter: brightness(0) invert(1);
            }

            /* Safe-triangle: while the cursor traces a diagonal path toward
               an open submenu, suppress :hover highlight on intermediate
               items so they don't flash blue.
               Keyboard-nav: after a keyboard navigation, suppress :hover on
               the (now stale) item the mouse is still resting on so only
               the keyboard-focused item highlights. Cleared on next
               mousemove. .focused and .has-open-submenu (managed by JS)
               still highlight normally. */
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider),
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) {
                background-color: transparent;
                color: #333;
            }
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon,
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .check,
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .submenu-arrow,
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .label,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .check,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .submenu-arrow,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .label {
                color: #333;
            }
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .shortcut,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .shortcut {
                color: #999;
            }
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon svg,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon svg {
                filter: none;
            }
            .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon img,
            .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon img {
                filter: drop-shadow(0px 0px 0.3px rgb(51, 51, 51));
            }

            /* .has-open-context-menu-submenu — line 1738-1739 */
            .menu-item.has-open-submenu:not(:hover) {
                background-color: #dfdfdf;
                color: #333;
            }
            .menu-item.has-open-submenu:not(:hover) .icon,
            .menu-item.has-open-submenu:not(:hover) .icon svg,
            .menu-item.has-open-submenu:not(:hover) .icon img {
                filter: none;
                color: #333;
            }

            /* .context-menu-item-disabled — lines 1753-1758 */
            .menu-item.disabled {
                opacity: 0.5;
                background-color: transparent;
                color: initial;
                cursor: initial;
            }

            /* Danger items: no special color in puter.com default theme */
            .menu-item.danger {
                color: #333;
            }
            .menu-item.danger .icon {
                color: #333;
            }

            /* .context-menu-divider — lines 1681-1684 */
            .divider {
                padding-top: 5px;
                padding-bottom: 5px;
                cursor: default;
                height: auto;
            }
            .divider hr {
                border: none;
                background: #ccc;
                height: 1px;
                width: 100%;
                margin: 0;
            }

            /* .context-menu-item-icon — lines 1760-1767 */
            .icon {
                display: inline-block;
                width: 20px;
                text-align: center;
                margin-right: 5px;
                font-size: 14px;
                line-height: 5px;
                flex-shrink: 0;
                color: #333;
            }
            .icon svg {
                width: 15px;
                height: 15px;
                vertical-align: middle;
            }
            /* .ctx-item-icon — lines 1696-1703 */
            .icon img {
                width: 15px;
                height: 15px;
                object-fit: contain;
                filter: drop-shadow(0px 0px 0.3px rgb(51, 51, 51));
            }

            .label {
                flex: 1;
                font-weight: 400;
            }

            .check {
                width: 20px;
                text-align: center;
                margin-right: 5px;
                flex-shrink: 0;
                font-size: 14px;
                line-height: 5px;
                color: #333;
            }

            /* .submenu-arrow — lines 1705-1709 */
            .submenu-arrow {
                width: 15px;
                height: 15px;
                float: right;
                flex-shrink: 0;
                color: #555;
            }

            .shortcut {
                margin-left: 16px;
                font-size: 11px;
                color: #999;
                flex-shrink: 0;
                letter-spacing: 0.5px;
            }

            /* === iOS-style action sheet (mobile) ========================= */
            :host(.sheet-mode) {
                left: 0 !important;
                right: 0 !important;
                top: auto !important;
                bottom: 0 !important;
                padding: 0 8px calc(8px + env(safe-area-inset-bottom)) 8px;
                box-sizing: border-box;
                animation: puter-sheet-in 260ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            :host(.sheet-mode.sheet-closing) {
                animation: puter-sheet-out 240ms cubic-bezier(0.4, 0, 1, 1) forwards;
            }

            @keyframes puter-sheet-in {
                from { transform: translateY(100%); }
                to   { transform: translateY(0); }
            }

            @keyframes puter-sheet-out {
                from { transform: translateY(0); }
                to   { transform: translateY(100%); }
            }

            :host(.sheet-mode) .context-menu {
                min-width: 0;
                width: 100%;
                border-radius: 14px;
                padding: 6px 0;
                background-color: rgb(255 255 255 / 96%);
                border: none;
                box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.18);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                             Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }

            :host(.sheet-mode) .menu-item {
                height: auto;
                min-height: 48px;
                padding: 12px 16px;
                font-size: 16px;
                border-radius: 0;
                gap: 10px;
            }

            /* Keyboard shortcuts have no meaning on touch / small-screen
               devices — hide them so labels can use the full width. */
            @media (max-width: 480px), (pointer: coarse) {
                .shortcut {
                    display: none;
                }
            }

            :host(.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) {
                background-color: rgba(0, 122, 255, 0.1);
                color: inherit;
                border-radius: 0;
            }
            :host(.sheet-mode) .menu-item:active:not(.disabled):not(.divider) {
                background-color: rgba(0, 122, 255, 0.2);
            }
            :host(.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) .label,
            :host(.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) .icon,
            :host(.sheet-mode) .menu-item:active:not(.disabled):not(.divider) .label,
            :host(.sheet-mode) .menu-item:active:not(.disabled):not(.divider) .icon {
                color: #333;
            }
            :host(.sheet-mode) .menu-item:hover .icon svg,
            :host(.sheet-mode) .menu-item:active .icon svg,
            :host(.sheet-mode) .menu-item:hover .icon img,
            :host(.sheet-mode) .menu-item:active .icon img {
                filter: none;
            }

            :host(.sheet-mode) .divider {
                min-height: 24px;
                padding: 0;
                display: flex;
                align-items: center;
            }
            :host(.sheet-mode) .divider hr {
                background: rgba(60, 60, 67, 0.2);
            }

            :host(.sheet-mode) .icon {
                width: 24px;
                margin-right: 0px;
            }
            :host(.sheet-mode) .icon svg,
            :host(.sheet-mode) .icon img {
                width: 20px;
                height: 20px;
            }

            /* Dark theme — applied when system prefers dark and no light
               override is set, or when theme="dark" is forced. The base
               class toggles .puter-theme-dark on the host accordingly. */
            :host(.puter-theme-dark) .context-menu {
                background: #2d2d2d;
                background-color: rgb(45 45 45 / 94%);
                color: #e6e6e6;
                border-color: #00000080;
                box-shadow: 0px 0px 15px #000000aa;
            }
            :host(.puter-theme-dark) .menu-item {
                color: #e6e6e6;
            }
            /* Inactive items: icon/check/shortcut/arrow tones */
            :host(.puter-theme-dark) .icon,
            :host(.puter-theme-dark) .check {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .submenu-arrow {
                color: #b0b0b0;
            }
            :host(.puter-theme-dark) .shortcut {
                color: #888;
            }
            :host(.puter-theme-dark) .icon img {
                filter: drop-shadow(0px 0px 0.3px rgb(230, 230, 230));
            }
            /* Inactive icon SVGs use currentColor already; nothing to invert */

            /* Safe-triangle / keyboard-nav: non-active hover restored colors should match dark */
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider),
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon,
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .check,
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .submenu-arrow,
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .label,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .check,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .submenu-arrow,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .label {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .shortcut,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .shortcut {
                color: #888;
            }
            :host(.puter-theme-dark) .context-menu.safe-traverse .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon img,
            :host(.puter-theme-dark) .context-menu.keyboard-nav .menu-item:hover:not(.has-open-submenu):not(.focused):not(.disabled):not(.divider) .icon img {
                filter: drop-shadow(0px 0px 0.3px rgb(230, 230, 230));
            }

            /* Submenu-open parent (no hover): subtle dark highlight */
            :host(.puter-theme-dark) .menu-item.has-open-submenu:not(:hover) {
                background-color: #3f3f3f;
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .menu-item.has-open-submenu:not(:hover) .icon,
            :host(.puter-theme-dark) .menu-item.has-open-submenu:not(:hover) .icon svg,
            :host(.puter-theme-dark) .menu-item.has-open-submenu:not(:hover) .icon img {
                color: #e6e6e6;
            }

            /* Danger items */
            :host(.puter-theme-dark) .menu-item.danger,
            :host(.puter-theme-dark) .menu-item.danger .icon {
                color: #ff7b72;
            }

            /* Divider */
            :host(.puter-theme-dark) .divider hr {
                background: #444;
            }

            /* Sheet mode (mobile) */
            :host(.puter-theme-dark.sheet-mode) .context-menu {
                background-color: rgb(40 40 40 / 96%);
                box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.45);
            }
            :host(.puter-theme-dark.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) {
                background-color: rgba(0, 122, 255, 0.22);
            }
            :host(.puter-theme-dark.sheet-mode) .menu-item:active:not(.disabled):not(.divider) {
                background-color: rgba(0, 122, 255, 0.35);
            }
            :host(.puter-theme-dark.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) .label,
            :host(.puter-theme-dark.sheet-mode) .menu-item:hover:not(.disabled):not(.divider) .icon,
            :host(.puter-theme-dark.sheet-mode) .menu-item:active:not(.disabled):not(.divider) .label,
            :host(.puter-theme-dark.sheet-mode) .menu-item:active:not(.disabled):not(.divider) .icon {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark.sheet-mode) .divider hr {
                background: rgba(255, 255, 255, 0.15);
            }
        `}render(){return`<div class="context-menu">${this._renderItems(h(this,De))}</div>`}_renderItems(t){const r=t.some(s=>s&&typeof s=="object"&&(s.icon||s.checked!==void 0));return t.map((s,i)=>{if(s==="-"||s.separator)return'<div class="menu-item divider"><hr></div>';const o=["menu-item"];s.disabled&&o.push("disabled"),(s.type==="danger"||s.danger)&&o.push("danger");const a=s.items&&s.items.length>0;let u="";s.checked!==void 0?u=`<span class="check">${s.checked?"✓":""}</span>`:s.icon?u=s.icon.startsWith("<")?`<span class="icon">${s.icon}</span>`:`<span class="icon"><img src="${this._escapeAttr(s.icon)}" alt=""></span>`:r&&(u='<span class="icon"></span>');const l=a?'<svg class="submenu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>':"",c=s.shortcut?`<span class="shortcut">${this._escapeHTML(this._formatShortcut(s.shortcut))}</span>`:"";return`
                <div class="${o.join(" ")}" data-index="${i}" ${a?'data-has-submenu="true"':""}>
                    ${u}
                    <span class="label">${this._escapeHTML(s.label||"")}</span>
                    ${c}
                    ${l}
                </div>`}).join("")}onReady(){this._positionMenu(),this._bindEvents()}_positionMenu(){const t=this.$(".context-menu");if(!t)return;if(this._isMobile()){this.classList.add("sheet-mode"),this.hasAttribute("data-submenu")||this._showBackdrop();return}const r=parseInt(this.getAttribute("x")||"0",10),s=parseInt(this.getAttribute("y")||"0",10);this.style.left=`${r}px`,this.style.top=`${s}px`,!this.hasAttribute("data-parent-managed")&&requestAnimationFrame(()=>{const i=t.getBoundingClientRect();i.right>window.innerWidth&&(this.style.left=`${Math.max(0,r-i.width)}px`),i.bottom>window.innerHeight&&(this.style.top=`${Math.max(0,window.innerHeight-i.height-10)}px`)})}_isMobile(){return window.innerWidth<=480||window.matchMedia&&window.matchMedia("(pointer: coarse)").matches&&window.innerWidth<768}_showBackdrop(){if(this._backdrop)return;const t=document.createElement("div");t.style.cssText=`
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.35);
            z-index: 999999998;
            opacity: 0;
            transition: opacity 0.2s ease;
        `,document.body.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1"}),t.addEventListener("click",()=>this._closeAll()),this._backdrop=t}_hideBackdrop(){if(!this._backdrop)return;const t=this._backdrop;t.style.opacity="0",setTimeout(()=>t.remove(),200),this._backdrop=null}_bindEvents(){this._outsideClickHandler&&document.removeEventListener("pointerdown",this._outsideClickHandler,!0),this._keyHandler&&document.removeEventListener("keydown",this._keyHandler,!0),h(this,Te)&&(document.removeEventListener("mousemove",h(this,Te)),y(this,Te,null)),this.$$(".menu-item.divider, .menu-item.disabled").forEach(s=>{s.addEventListener("mouseenter",()=>{if(h(this,q)&&this._isMouseHeadingToSubmenu(h(this,q).element)){this._setSafeTraverse(!0),h(this,Q)&&(clearTimeout(h(this,Q)),y(this,Q,null)),y(this,Q,setTimeout(()=>this._submenuCloseCheck(),100));return}this._setSafeTraverse(!1),this._clearFocus(),clearTimeout(h(this,je)),this._cancelSubmenuClose(),this._hideActiveSubmenu()})}),this.$$(".menu-item:not(.divider):not(.disabled)").forEach(s=>{const i=parseInt(s.dataset.index,10),o=h(this,De)[i];o&&(s.addEventListener("click",a=>{if(a.stopPropagation(),o.items&&o.items.length>0){(!h(this,q)||h(this,q).parentEl!==s)&&(clearTimeout(h(this,je)),this._cancelSubmenuClose(),this._showSubmenu(s,o.items));return}typeof o.action=="function"&&o.action(),this.emitEvent("select",o),this._closeAll()}),s.addEventListener("mouseenter",()=>{if(s.dataset.hasSubmenu==="true"){if(h(this,q)&&h(this,q).parentEl!==s&&this._isMouseHeadingToSubmenu(h(this,q).element)){y(this,st,i),this._setSafeTraverse(!0),h(this,Q)&&(clearTimeout(h(this,Q)),y(this,Q,null)),y(this,Q,setTimeout(()=>this._submenuCloseCheck(),100));return}y(this,st,null),this._setSafeTraverse(!1),this._setFocusIndex(i),this._cancelSubmenuClose(),clearTimeout(h(this,je)),h(this,q)&&h(this,q).parentEl!==s?this._showSubmenu(s,o.items):h(this,q)||y(this,je,setTimeout(()=>{this._showSubmenu(s,o.items)},200))}else if(h(this,q)){if(this._isMouseHeadingToSubmenu(h(this,q).element)){y(this,st,i),this._setSafeTraverse(!0),h(this,Q)&&(clearTimeout(h(this,Q)),y(this,Q,null)),y(this,Q,setTimeout(()=>this._submenuCloseCheck(),100));return}this._setSafeTraverse(!1),this._setFocusIndex(i),this._scheduleSubmenuClose()}else this._setSafeTraverse(!1),this._setFocusIndex(i)}),s.addEventListener("mouseleave",()=>{this._isMobile()||(clearTimeout(h(this,je)),s.dataset.hasSubmenu==="true"&&h(this,q)&&h(this,q).parentEl===s&&this._scheduleSubmenuClose())}))});const r=this.$(".context-menu");r&&r.addEventListener("mouseleave",()=>{this._clearFocus()}),this._outsideClickHandler=s=>{this._isEventInChain(s)||this._closeAll()},setTimeout(()=>{document.addEventListener("pointerdown",this._outsideClickHandler,!0)},0),y(this,Te,s=>{h(this,ze).push({x:s.clientX,y:s.clientY}),h(this,ze).length>3&&h(this,ze).shift(),this._setKeyboardNav(!1)}),document.addEventListener("mousemove",h(this,Te)),this._keyHandler=s=>{if(h(this,q))return;this._handleKey(s)&&(this._setKeyboardNav(!0),s.preventDefault(),s.stopImmediatePropagation())},document.addEventListener("keydown",this._keyHandler,!0)}_handleKey(t){const r=t.key;if(t.metaKey||t.ctrlKey)return!1;switch(r){case"Escape":return this._closeAll(),!0;case"ArrowDown":return this._moveFocus(1),!0;case"ArrowUp":{if(!this._parentMenu){const s=this._focusableIndices();if(s.length&&h(this,Re)===s[0])return this.dispatchEvent(new CustomEvent("puter-menu-navigate",{detail:{direction:"up"},bubbles:!0,composed:!0})),!0}return this._moveFocus(-1),!0}case"Home":{const s=this._focusableIndices();return s.length&&this._setFocusIndex(s[0]),!0}case"End":{const s=this._focusableIndices();return s.length&&this._setFocusIndex(s[s.length-1]),!0}case"Enter":case" ":return this._activateFocused(),!0;case"ArrowRight":return this._openFocusedSubmenu()||this._parentMenu||this.dispatchEvent(new CustomEvent("puter-menu-navigate",{detail:{direction:"right"},bubbles:!0,composed:!0})),!0;case"ArrowLeft":if(this._parentMenu){this._parentMenu._hideActiveSubmenu();const s=this._parentItemEl;if(s){const i=parseInt(s.dataset.index,10);this._parentMenu._setFocusIndex(i)}return!0}return this.dispatchEvent(new CustomEvent("puter-menu-navigate",{detail:{direction:"left"},bubbles:!0,composed:!0})),!0;case"Tab":return this._closeAll(),!0;default:return r.length===1&&!t.altKey?this._typeahead(r):!1}}_focusableIndices(){const t=[];return h(this,De).forEach((r,s)=>{r==="-"||r&&r.separator||r&&r.disabled||t.push(s)}),t}_setFocusIndex(t){y(this,Re,t),this.$$(".menu-item").forEach(s=>{const i=parseInt(s.dataset.index,10);s.classList.toggle("focused",i===t)});const r=this._itemEl(t);r&&typeof r.scrollIntoView=="function"&&r.scrollIntoView({block:"nearest"})}_clearFocus(){y(this,Re,null),this.$$(".menu-item.focused").forEach(t=>t.classList.remove("focused"))}_itemEl(t){return this.$(`.menu-item[data-index="${t}"]`)}_moveFocus(t){const r=this._focusableIndices();if(!r.length)return;let s=r.indexOf(h(this,Re));s===-1&&(s=t>0?-1:r.length);const i=(s+t+r.length)%r.length;this._setFocusIndex(r[i])}_activateFocused(){if(h(this,Re)===null)return;const t=this._itemEl(h(this,Re));t&&t.click()}_openFocusedSubmenu(){if(h(this,Re)===null)return!1;const t=h(this,De)[h(this,Re)];if(!t||!t.items||!t.items.length)return!1;const r=this._itemEl(h(this,Re));if(!r)return!1;clearTimeout(h(this,je)),this._cancelSubmenuClose();const s=!h(this,q)||h(this,q).parentEl!==r;return s&&this._showSubmenu(r,t.items),requestAnimationFrame(()=>{const i=h(this,q)&&h(this,q).element;if(i){if(s){const o=i._focusableIndices();o.length&&i._setFocusIndex(o[0])}typeof i._setKeyboardNav=="function"&&i._setKeyboardNav(!0)}}),!0}_typeahead(t){const r=t.toLowerCase();y(this,Vt,h(this,Vt)+r),clearTimeout(h(this,Xt)),y(this,Xt,setTimeout(()=>{y(this,Vt,"")},500));const s=this._focusableIndices();if(!s.length)return!1;const i=s.indexOf(h(this,Re)),o=h(this,Vt);for(let a=1;a<=s.length;a++){const u=s[(Math.max(0,i)+a)%s.length];if((h(this,De)[u]&&h(this,De)[u].label||"").toLowerCase().startsWith(o))return this._setFocusIndex(u),!0}if(o.length>1)for(let a=1;a<=s.length;a++){const u=s[(Math.max(0,i)+a)%s.length];if((h(this,De)[u]&&h(this,De)[u].label||"").toLowerCase().startsWith(r))return this._setFocusIndex(u),y(this,Vt,r),!0}return!1}_showSubmenu(t,r){this._hideActiveSubmenu(),this._cancelSubmenuClose(),t.classList.add("has-open-submenu"),t.classList.remove("focused");const s=document.createElement("puter-context-menu");s.setAttribute("data-submenu",""),s.setAttribute("data-parent-managed","");const i=this.getAttribute("theme");i&&s.setAttribute("theme",i),s.items=r,s._parentMenu=this,s._parentItemEl=t;const o=t.getBoundingClientRect(),a=window.innerWidth<480;a?(s.setAttribute("x",String(o.left)),s.setAttribute("y",String(o.bottom+2)),y(this,Gt,"below")):(s.setAttribute("x",String(o.right+2)),s.setAttribute("y",String(o.top)),y(this,Gt,"right")),s.addEventListener("select",u=>{this.emitEvent("select",u.detail),this._closeAll()}),this.classList.contains("sheet-mode")&&(this.style.display="none",this._sheetHidden=!0),document.body.appendChild(s),y(this,q,{element:s,parentEl:t}),requestAnimationFrame(()=>{if(!h(this,q)||h(this,q).element!==s)return;const u=s.shadowRoot&&s.shadowRoot.querySelector(".context-menu");if(!u)return;const l=u.getBoundingClientRect(),c=l.width,d=l.height;if(a){let f=o.left;f+c>window.innerWidth&&(f=Math.max(0,window.innerWidth-c-4));let g=o.bottom+2;g+d>window.innerHeight-10&&(g=Math.max(0,window.innerHeight-d-10)),s.style.left=`${f}px`,s.style.top=`${g}px`}else{let f=o.right+2;f+c>window.innerWidth&&(f=Math.max(0,o.left-c-2),y(this,Gt,"left"));let g=o.top;g+d>window.innerHeight-10&&(g=Math.max(0,window.innerHeight-d-10)),s.style.left=`${f}px`,s.style.top=`${g}px`}}),s.addEventListener("mouseenter",()=>{this._cancelSubmenuClose(),clearTimeout(h(this,je))}),s.addEventListener("mouseleave",()=>{this._scheduleSubmenuClose()})}_scheduleSubmenuClose(){this._cancelSubmenuClose(),y(this,Q,setTimeout(()=>this._submenuCloseCheck(),50))}_cancelSubmenuClose(){h(this,Q)&&(clearTimeout(h(this,Q)),y(this,Q,null)),y(this,st,null),this._setSafeTraverse(!1)}_submenuCloseCheck(){if(y(this,Q,null),!h(this,q)){this._setSafeTraverse(!1);return}const t=h(this,q).element,r=h(this,q).parentEl,s=h(this,ze)[h(this,ze).length-1];if(s&&(this._pointInElement(s,t)||this._pointInRect(s,r.getBoundingClientRect()))){this._setSafeTraverse(!1);return}if(this._isMouseHeadingToSubmenu(t)){y(this,Q,setTimeout(()=>this._submenuCloseCheck(),300));return}this._setSafeTraverse(!1),this._hideActiveSubmenu()}_setSafeTraverse(t){const r=this.$(".context-menu");r&&r.classList.toggle("safe-traverse",t)}_setKeyboardNav(t){const r=this.$(".context-menu");r&&r.classList.toggle("keyboard-nav",t)}_pointInRect(t,r){return t.x>=r.left&&t.x<=r.right&&t.y>=r.top&&t.y<=r.bottom}_pointInElement(t,r){const s=r.shadowRoot&&r.shadowRoot.querySelector(".context-menu");return s?this._pointInRect(t,s.getBoundingClientRect()):!1}_isMouseHeadingToSubmenu(t){if(h(this,ze).length<2)return!1;const r=t.shadowRoot&&t.shadowRoot.querySelector(".context-menu");if(!r)return!1;const s=r.getBoundingClientRect(),i=h(this,ze)[h(this,ze).length-1],o=h(this,ze)[0];let a,u;switch(h(this,Gt)){case"left":a={x:s.right,y:s.bottom},u={x:s.right,y:s.top};break;case"below":a={x:s.right,y:s.top},u={x:s.left,y:s.top};break;case"right":default:a={x:s.left,y:s.top},u={x:s.left,y:s.bottom};break}const l=(m,b)=>(b.y-m.y)/(b.x-m.x),c=l(i,a),d=l(i,u),f=l(o,a),g=l(o,u);return c<f&&d>g}_hideSubmenu(t){h(this,q)&&h(this,q).parentEl===t&&this._hideActiveSubmenu()}_hideActiveSubmenu(t=!0){if(h(this,q)&&(h(this,q).element._closing||h(this,q).element.remove(),h(this,q).parentEl.classList.remove("has-open-submenu"),y(this,q,null)),t&&this._sheetHidden&&(this.style.display="",this._sheetHidden=!1),h(this,st)!==null){const r=h(this,st);y(this,st,null),this._setFocusIndex(r);const s=h(this,De)[r];if(s&&s.items&&s.items.length){const i=this._itemEl(r);i&&this._showSubmenu(i,s.items)}}this._setSafeTraverse(!1)}_closeAll(){if(this._closing)return;this._closing=!0,this._cancelSubmenuClose(),clearTimeout(h(this,je)),clearTimeout(h(this,Xt));const t=this._sheetHidden;this._hideActiveSubmenu(!1),this._outsideClickHandler&&document.removeEventListener("pointerdown",this._outsideClickHandler,!0),this._keyHandler&&document.removeEventListener("keydown",this._keyHandler,!0),h(this,Te)&&(document.removeEventListener("mousemove",h(this,Te)),y(this,Te,null)),this.emitEvent("close",{}),this.classList.contains("sheet-mode")?(this._hideBackdrop(),t?this.remove():(this.classList.add("sheet-closing"),setTimeout(()=>this.remove(),250))):this.remove()}disconnectedCallback(){super.disconnectedCallback(),this._outsideClickHandler&&document.removeEventListener("pointerdown",this._outsideClickHandler,!0),this._keyHandler&&document.removeEventListener("keydown",this._keyHandler,!0),h(this,Te)&&(document.removeEventListener("mousemove",h(this,Te)),y(this,Te,null)),this._cancelSubmenuClose(),clearTimeout(h(this,je)),clearTimeout(h(this,Xt)),this._hideActiveSubmenu(),this._hideBackdrop()}_escapeHTML(t){if(!t)return"";const r=document.createElement("div");return r.textContent=t,r.innerHTML}_escapeAttr(t){return t?t.replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}_formatShortcut(t){if(!t)return"";const r=Mi._isMac(),o=String(t).replace(/⌘/g,"Mod+").replace(/⌃/g,"Ctrl+").replace(/⌥/g,"Alt+").replace(/⇧/g,"Shift+").split("+").map(a=>a.trim()).filter(Boolean).map(a=>{switch(a.toLowerCase()){case"mod":case"cmd":case"command":return r?"⌘":"Ctrl";case"ctrl":case"control":return r?"⌃":"Ctrl";case"alt":case"option":case"opt":return r?"⌥":"Alt";case"shift":return r?"⇧":"Shift";case"meta":case"super":case"win":return r?"⌘":"Win";default:return a}});return r?o.join(""):o.join("+")}_getActiveSubmenu(){return h(this,q)}_isEventInChain(t){const r=t.target;if(!r)return!1;if(this.contains(r))return!0;let s=h(this,q);for(;s&&s.element;){if(s.element.contains(r))return!0;s=s.element._getActiveSubmenu?s.element._getActiveSubmenu():null}return!1}static _isMac(){if(typeof navigator>"u")return!1;const t=navigator.userAgentData;return t&&typeof t.platform=="string"?/mac/i.test(t.platform):/Mac|iPhone|iPad|iPod/i.test(navigator.platform||navigator.userAgent||"")}};De=new WeakMap,q=new WeakMap,je=new WeakMap,Re=new WeakMap,ze=new WeakMap,Q=new WeakMap,Gt=new WeakMap,Vt=new WeakMap,Xt=new WeakMap,Te=new WeakMap,st=new WeakMap;let hi=Mi;class Sb extends Rt{getStyles(){return`
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                font-family: ${Ce};
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            :host(.visible) .overlay {
                opacity: 1;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #e0e0e0;
                border-top-color: #088ef0;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            .text {
                margin-top: 16px;
                font-size: 14px;
                color: #666666;
                text-align: center;
                padding: 0 20px;
                max-width: 90vw;
            }
            @media (max-width: 480px) {
                .spinner {
                    width: 48px;
                    height: 48px;
                    border-width: 4px;
                }
                .text {
                    font-size: 16px;
                }
            }
        `}render(){const e=this.getAttribute("text")||"";return`
            <div class="overlay">
                <div class="spinner"></div>
                ${e?`<div class="text">${this._escapeHTML(e)}</div>`:""}
            </div>`}onReady(){requestAnimationFrame(()=>{this.classList.add("visible")})}open(){this.classList.add("visible")}close(){this.classList.remove("visible"),setTimeout(()=>this.remove(),200)}_escapeHTML(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}}var Pe,ie,Be,_e,He,Et,Dt;class Cb extends Rt{constructor(){super(...arguments);E(this,Pe,[]);E(this,ie,null);E(this,Be,null);E(this,_e,null);E(this,He,!1);E(this,Et,!1);E(this,Dt,!1)}get items(){return h(this,Pe)}set items(t){y(this,Pe,t||[]),this.shadowRoot&&this.isConnected&&this._rerender()}getStyles(){return`
            :host {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                font-family: ${Ce};
                user-select: none;
                -webkit-user-select: none;
            }
            .menubar {
                display: flex;
                box-sizing: border-box;
                overflow: hidden;
                border-bottom: 1px solid #e3e3e3;
                background-color: #fafafa;
                padding: 2px 5px;
                align-items: center;
                height: 36px;
            }
            .menu-button {
                background: none;
                border: none;
                font-family: inherit;
                padding: 3px 10px;
                font-size: 13px;
                border-radius: 3px;
                cursor: default;
                color: #333;
                line-height: 1.2;
                margin: 0 1px;
            }
            /* Hover is driven by JS (.hovered) rather than :hover so we can
               clear stale keyboard focus the moment the mouse takes over and
               keep the two highlight sources from ever co-existing. */
            .menu-button.hovered,
            .menu-button.active,
            .menu-button.focused {
                background-color: #e2e2e2;
            }
            /* Suppress browser-native focus ring and tap highlight without
               touching background. CAUTION: setting background-color here
               would tie specificity with .menu-button.active and win by
               source order, which would erase the open-menu highlight as
               soon as the button takes DOM :focus from a click. */
            .menu-button:focus,
            .menu-button:focus-visible,
            .menu-button:active {
                outline: none;
                -webkit-tap-highlight-color: transparent;
            }
            @media (max-width: 480px) {
                .menubar {
                    height: 40px;
                    overflow-x: auto;
                    overflow-y: hidden;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .menubar::-webkit-scrollbar {
                    display: none;
                }
                .menu-button {
                    font-size: 14px;
                    padding: 6px 12px;
                    flex-shrink: 0;
                }
            }
            /* Dark theme — applied when system prefers dark and no light
               override is set, or when theme="dark" is forced. The base
               class toggles .puter-theme-dark on the host accordingly. */
            :host(.puter-theme-dark) .menubar {
                background-color: #2a2a2a;
                border-bottom-color: #3a3a3a;
            }
            :host(.puter-theme-dark) .menu-button {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .menu-button.hovered,
            :host(.puter-theme-dark) .menu-button.active,
            :host(.puter-theme-dark) .menu-button.focused {
                background-color: #3a3a3a;
            }
        `}render(){return`<div class="menubar">${(h(this,Pe)||[]).map((s,i)=>`<button class="menu-button" data-index="${i}">${this._escapeHTML(s.label||"")}</button>`).join("")}</div>`}onReady(){this._keyHandler&&document.removeEventListener("keydown",this._keyHandler,!0),this._keyUpHandler&&document.removeEventListener("keyup",this._keyUpHandler,!0),this._docPointerDownHandler&&document.removeEventListener("pointerdown",this._docPointerDownHandler,!0),this._docFocusInHandler&&document.removeEventListener("focusin",this._docFocusInHandler,!0),this._winBlurHandler&&window.removeEventListener("blur",this._winBlurHandler),this._mouseMoveHandler&&document.removeEventListener("mousemove",this._mouseMoveHandler),this.$$(".menu-button").forEach(r=>{const s=parseInt(r.dataset.index,10),i=h(this,Pe)[s];i&&(r.addEventListener("click",o=>{if(o.stopPropagation(),this._suppressClickFor===r){this._suppressClickFor=null;return}if(y(this,_e,s),y(this,He,!0),h(this,Be)===r){this._closeDropdown(),this._deactivateMenubar();return}this._openDropdown(r,i)}),r.addEventListener("mouseenter",()=>{r.classList.add("hovered"),h(this,_e)!==null&&(y(this,_e,null),this._renderButtonFocus());const o=this.shadowRoot,a=o&&o.activeElement;a&&a!==r&&a.classList.contains("menu-button")&&a.blur(),this._setKeyboardNav(!1),h(this,ie)&&h(this,Be)!==r&&this._openDropdown(r,i)}),r.addEventListener("mouseleave",()=>{r.classList.remove("hovered")}))}),this._keyHandler=r=>this._onGlobalKeyDown(r),this._keyUpHandler=r=>this._onGlobalKeyUp(r),document.addEventListener("keydown",this._keyHandler,!0),document.addEventListener("keyup",this._keyUpHandler,!0),this._docPointerDownHandler=r=>{const s=typeof r.composedPath=="function"?r.composedPath():[];h(this,Be)&&s.includes(h(this,Be))&&(this._suppressClickFor=h(this,Be),clearTimeout(this._suppressClickTimer),this._suppressClickTimer=setTimeout(()=>{this._suppressClickFor=null},400)),h(this,He)&&!h(this,ie)&&!s.includes(this)&&this._deactivateMenubar()},document.addEventListener("pointerdown",this._docPointerDownHandler,!0),this._docFocusInHandler=r=>{if(!h(this,He)||h(this,ie))return;(typeof r.composedPath=="function"?r.composedPath():[]).includes(this)||this._deactivateMenubar()},document.addEventListener("focusin",this._docFocusInHandler,!0),this._winBlurHandler=()=>{h(this,He)&&!h(this,ie)&&this._deactivateMenubar(),y(this,Et,!1),y(this,Dt,!1)},window.addEventListener("blur",this._winBlurHandler),this._mouseMoveHandler=()=>this._setKeyboardNav(!1),document.addEventListener("mousemove",this._mouseMoveHandler)}_onGlobalKeyDown(t){if(t.key==="Alt"&&!t.repeat?(y(this,Et,!0),y(this,Dt,!1)):h(this,Et)&&t.key!=="Alt"&&y(this,Dt,!0),t.key==="F10"){h(this,He)||h(this,ie)?(this._closeDropdown(),this._deactivateMenubar()):this._activateMenubar(),t.preventDefault(),t.stopImmediatePropagation();return}if(!h(this,ie)&&h(this,He)){switch(t.key){case"ArrowRight":this._moveButtonFocus(1,{openDropdown:!0});break;case"ArrowLeft":this._moveButtonFocus(-1,{openDropdown:!0});break;case"ArrowDown":case"Enter":case" ":this._openFocusedButton(!0);break;case"Escape":case"Tab":this._deactivateMenubar();break;default:return}t.preventDefault(),t.stopImmediatePropagation()}}_onGlobalKeyUp(t){if(t.key==="Alt"){const r=h(this,Et)&&!h(this,Dt);y(this,Et,!1),y(this,Dt,!1),r&&(h(this,He)||h(this,ie)?(this._closeDropdown(),this._deactivateMenubar()):this._activateMenubar(),t.preventDefault(),t.stopImmediatePropagation())}}_activateMenubar(){!h(this,Pe)||!h(this,Pe).length||document.querySelector("puter-context-menu")||(y(this,He,!0),y(this,_e,0),this._renderButtonFocus(),this._setKeyboardNav(!0))}_deactivateMenubar(){y(this,He,!1),y(this,_e,null),this._renderButtonFocus(),this._setKeyboardNav(!1)}_renderButtonFocus(){this.$$(".menu-button").forEach(t=>{const r=parseInt(t.dataset.index,10);t.classList.toggle("focused",r===h(this,_e))})}_setKeyboardNav(t){const r=this.$(".menubar");r&&r.classList.toggle("keyboard-nav",t)}_moveButtonFocus(t,{swapDropdown:r=!0,openDropdown:s=!1}={}){if(!h(this,Pe).length)return;const i=h(this,Pe).length,a=((h(this,_e)==null?t>0?-1:0:h(this,_e))+t+i)%i;y(this,_e,a),this._renderButtonFocus(),this._setKeyboardNav(!0);const u=this._buttonEl(a),l=h(this,Pe)[a];if(!(!u||!l)){if(r&&h(this,ie)){this._openDropdown(u,l);return}s&&this._openFocusedButton(!1)}}_buttonEl(t){return this.$(`.menu-button[data-index="${t}"]`)}_openFocusedButton(t){if(h(this,_e)==null)return;const r=this._buttonEl(h(this,_e)),s=h(this,Pe)[h(this,_e)];!r||!s||(this._openDropdown(r,s),t&&h(this,ie)&&requestAnimationFrame(()=>{const i=h(this,ie);if(i&&typeof i._focusableIndices=="function"){const o=i._focusableIndices();o.length&&i._setFocusIndex(o[0]),typeof i._setKeyboardNav=="function"&&i._setKeyboardNav(!0)}}))}_openDropdown(t,r){if(this._closeDropdown(),typeof r.action=="function"&&(!r.items||r.items.length===0)){r.action(),this.emitEvent("select",r);return}if(!r.items||r.items.length===0)return;const s=t.getBoundingClientRect(),i=document.createElement("puter-context-menu");i.setAttribute("data-submenu","");const o=this.getAttribute("theme");o&&i.setAttribute("theme",o),i.items=r.items,i.setAttribute("x",String(s.left)),i.setAttribute("y",String(s.bottom)),i.addEventListener("select",a=>{this.emitEvent("select",a.detail),this._closeDropdown(),this._deactivateMenubar()}),i.addEventListener("close",()=>{h(this,ie)===i&&(t.classList.remove("active"),y(this,ie,null),y(this,Be,null),this._deactivateMenubar())}),i.addEventListener("puter-menu-navigate",a=>{if(!a.detail)return;if(a.detail.direction==="up"){this._closeDropdown(),this._renderButtonFocus(),this._setKeyboardNav(!0);return}const u=a.detail.direction==="right"?1:-1;this._closeDropdown(),this._moveButtonFocus(u,{swapDropdown:!1,openDropdown:!0})}),document.body.appendChild(i),t.classList.add("active"),y(this,ie,i),y(this,Be,t)}_closeDropdown(){h(this,Be)&&h(this,Be).classList.remove("active"),h(this,ie)&&h(this,ie).remove(),y(this,ie,null),y(this,Be,null)}disconnectedCallback(){super.disconnectedCallback(),this._closeDropdown(),clearTimeout(this._suppressClickTimer),this._suppressClickFor=null,this._keyHandler&&document.removeEventListener("keydown",this._keyHandler,!0),this._keyUpHandler&&document.removeEventListener("keyup",this._keyUpHandler,!0),this._docPointerDownHandler&&document.removeEventListener("pointerdown",this._docPointerDownHandler,!0),this._docFocusInHandler&&document.removeEventListener("focusin",this._docFocusInHandler,!0),this._winBlurHandler&&window.removeEventListener("blur",this._winBlurHandler),this._mouseMoveHandler&&document.removeEventListener("mousemove",this._mouseMoveHandler)}_escapeHTML(t){if(!t)return"";const r=document.createElement("div");return r.textContent=t,r.innerHTML}}Pe=new WeakMap,ie=new WeakMap,Be=new WeakMap,_e=new WeakMap,He=new WeakMap,Et=new WeakMap,Dt=new WeakMap;const Ib=["#000000","#434343","#666666","#999999","#b7b7b7","#cccccc","#d9d9d9","#efefef","#f3f3f3","#ffffff","#980000","#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#4a86e8","#0000ff","#9900ff","#ff00ff","#e6b8af","#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#c9daf8","#cfe2f3","#d9d2e9","#ead1dc","#dd7e6b","#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#a4c2f4","#9fc5e8","#b4a7d6","#d5a6bd","#cc4125","#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6d9eeb","#6fa8dc","#8e7cc3","#c27ba0","#a61c00","#cc0000","#e69138","#f1c232","#6aa84f","#45818e","#3c78d8","#3d85c6","#674ea7","#a64d79","#85200c","#990000","#b45f06","#bf9000","#38761d","#134f5c","#1155cc","#0b5394","#351c75","#741b47","#5b0f00","#660000","#783f04","#7f6000","#274e13","#0c343d","#1c4587","#073763","#20124d","#4c1130"];var it;class Lb extends Rt{constructor(){super(...arguments);E(this,it,"#3b82f6")}getStyles(){return`
            dialog {
                background: transparent;
                border: none;
                box-shadow: none;
                outline: none;
                padding: 0;
                max-width: 90vw;
            }
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.5);
            }
            .picker-body {
                background-color: rgba(231, 238, 245, .95);
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                border: none;
                border-radius: 8px;
                padding: 24px;
                box-shadow: 0px 0px 15px #00000066;
                font-family: ${Ce};
                color: #414650;
                width: 350px;
                max-width: calc(100vw - 32px);
                box-sizing: border-box;
            }
            .header {
                display: flex;
                align-items: center;
                gap: 14px;
                margin-bottom: 20px;
            }
            .preview {
                width: 56px;
                height: 56px;
                border-radius: 4px;
                border: 1px solid #b9b9b9;
                background: var(--current-color, #3b82f6);
                flex-shrink: 0;
                transition: background 0.15s ease;
            }
            .header-info {
                flex: 1;
                min-width: 0;
            }
            .header-label {
                font-size: 12px;
                color: #666666;
                margin-bottom: 4px;
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }
            .hex-input {
                width: 100%;
                padding: 8px;
                font-family: ui-monospace, "SF Mono", Menlo, monospace;
                font-size: 14px;
                border: 1px solid #b9b9b9;
                border-radius: 4px;
                color: #414650;
                box-sizing: border-box;
                outline: none;
                text-transform: uppercase;
                transition: border-color 0.15s ease;
            }
            .hex-input:focus {
                border: 2px solid #01a0fd;
                padding: 7px;
            }
            .native-color-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 18px;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.5);
                border: 1px solid #b9b9b9;
                border-radius: 4px;
            }
            .native-color-row label {
                font-size: 13px;
                color: #666666;
                cursor: pointer;
                flex: 1;
            }
            input[type="color"] {
                width: 36px;
                height: 36px;
                padding: 0;
                border: 1px solid #b9b9b9;
                border-radius: 4px;
                cursor: pointer;
                background: transparent;
            }
            input[type="color"]::-webkit-color-swatch-wrapper { padding: 2px; }
            input[type="color"]::-webkit-color-swatch { border: none; border-radius: 2px; }
            .swatches {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                gap: 5px;
                margin-bottom: 20px;
            }
            .swatch {
                aspect-ratio: 1;
                border-radius: 3px;
                cursor: pointer;
                border: 1px solid rgba(0, 0, 0, 0.06);
                transition: transform 0.1s ease;
            }
            .swatch:hover {
                transform: scale(1.15);
                z-index: 1;
            }
            .swatch.selected {
                outline: 2px solid #01a0fd;
                outline-offset: 2px;
            }
            .buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            ${ic}
            .btn-cancel {
                /* uses base .btn styles */
            }
            .btn-ok {
                border-color: #088ef0;
                background: linear-gradient(#34a5f8, #088ef0);
                color: white;
                min-width: 90px;
            }
            .btn-ok:active {
                background-color: #2798eb;
                border-color: #2798eb;
                color: #bedef5;
            }
            @media (max-width: 480px) {
                .picker-body {
                    width: 100%;
                    padding: 20px;
                }
                .swatches {
                    grid-template-columns: repeat(8, 1fr);
                }
                .btn {
                    padding: 0 20px;
                    font-size: 16px;
                    height: 40px;
                    line-height: 40px;
                    flex: 1;
                }
            }
            :host(.puter-theme-dark) .picker-body {
                background-color: rgba(40, 44, 52, .95);
                color: #e6e6e6;
                box-shadow: 0px 0px 15px #000000aa;
            }
            :host(.puter-theme-dark) .preview {
                border-color: #555;
            }
            :host(.puter-theme-dark) .header-label {
                color: #aaa;
            }
            :host(.puter-theme-dark) .hex-input {
                background-color: #1f1f1f;
                border-color: #555;
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .native-color-row {
                background: rgba(255, 255, 255, 0.05);
                border-color: #555;
            }
            :host(.puter-theme-dark) .native-color-row label {
                color: #aaa;
            }
            :host(.puter-theme-dark) input[type="color"] {
                border-color: #555;
            }
            :host(.puter-theme-dark) .swatch {
                border-color: rgba(255, 255, 255, 0.1);
            }
            :host(.puter-theme-dark) .btn {
                color: #e6e6e6;
                border-color: #555;
                background: linear-gradient(#4a4a4a, #3a3a3a);
                box-shadow: inset 0px 1px 0px rgb(255 255 255 / 8%), 0 1px 2px rgb(0 0 0 / 25%);
            }
            :host(.puter-theme-dark) .btn:active {
                background-color: #333;
                border-color: #444;
                color: #999;
            }
        `}render(){const t=this.getAttribute("default-color")||"#3b82f6";y(this,it,this._normalizeHex(t));const r=Ib.map(s=>`<div class="swatch${s.toLowerCase()===h(this,it).toLowerCase()?" selected":""}"
                  data-color="${s}" style="background: ${s}"></div>`).join("");return`
            <dialog>
                <div class="picker-body" style="--current-color: ${h(this,it)}">
                    <div class="header">
                        <div class="preview"></div>
                        <div class="header-info">
                            <div class="header-label">Hex</div>
                            <input class="hex-input" type="text" value="${h(this,it).toUpperCase()}" maxlength="7">
                        </div>
                    </div>
                    <div class="native-color-row">
                        <label for="native-color">Pick any color</label>
                        <input id="native-color" type="color" value="${h(this,it)}">
                    </div>
                    <div class="swatches">${r}</div>
                    <div class="buttons">
                        <button class="btn btn-cancel">Cancel</button>
                        <button class="btn btn-ok">Select</button>
                    </div>
                </div>
            </dialog>`}onReady(){const t=this.$("dialog"),r=this.$(".hex-input"),s=this.$('input[type="color"]'),i=this.$(".btn-ok"),o=this.$(".btn-cancel");this.$$(".swatch").forEach(a=>{a.addEventListener("click",()=>{this._setColor(a.dataset.color)})}),r.addEventListener("input",a=>{const u=this._normalizeHex(a.target.value);u&&this._setColor(u,{fromHexInput:!0})}),s.addEventListener("input",a=>{this._setColor(a.target.value,{fromNative:!0})}),i.addEventListener("click",()=>{this.emitEvent("response",h(this,it)),this.close()}),o.addEventListener("click",()=>{this.emitEvent("response",null),this.close()}),t.addEventListener("click",a=>{a.target===t&&(this.emitEvent("response",null),this.close())}),t.addEventListener("cancel",a=>{this.emitEvent("response",null)})}_setColor(t,r={}){const s=this._normalizeHex(t);if(!s)return;y(this,it,s);const i=this.$(".picker-body");if(i&&i.style.setProperty("--current-color",s),!r.fromHexInput){const o=this.$(".hex-input");o&&(o.value=s.toUpperCase())}if(!r.fromNative){const o=this.$('input[type="color"]');o&&(o.value=s)}this.$$(".swatch").forEach(o=>{o.classList.toggle("selected",o.dataset.color.toLowerCase()===s.toLowerCase())})}_normalizeHex(t){return t?(t=t.trim(),t[0]!=="#"&&(t=`#${t}`),/^#[0-9a-f]{3}$/i.test(t)&&(t=`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`),/^#[0-9a-f]{6}$/i.test(t)?t.toLowerCase():null):null}}it=new WeakMap;const nr=[{name:"System UI",family:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',category:"System"},{name:"Arial",family:"Arial, sans-serif",category:"Sans Serif"},{name:"Helvetica",family:"Helvetica, sans-serif",category:"Sans Serif"},{name:"Verdana",family:"Verdana, sans-serif",category:"Sans Serif"},{name:"Tahoma",family:"Tahoma, sans-serif",category:"Sans Serif"},{name:"Trebuchet MS",family:'"Trebuchet MS", sans-serif',category:"Sans Serif"},{name:"Impact",family:"Impact, sans-serif",category:"Sans Serif"},{name:"Times New Roman",family:'"Times New Roman", Times, serif',category:"Serif"},{name:"Georgia",family:"Georgia, serif",category:"Serif"},{name:"Garamond",family:"Garamond, serif",category:"Serif"},{name:"Palatino",family:'Palatino, "Palatino Linotype", serif',category:"Serif"},{name:"Courier New",family:'"Courier New", Courier, monospace',category:"Monospace"},{name:"Consolas",family:"Consolas, monospace",category:"Monospace"},{name:"Monaco",family:"Monaco, monospace",category:"Monospace"},{name:"SF Mono",family:'"SF Mono", ui-monospace, monospace',category:"Monospace"},{name:"Brush Script",family:'"Brush Script MT", cursive',category:"Cursive"},{name:"Comic Sans",family:'"Comic Sans MS", cursive',category:"Cursive"}];var ft;class Rb extends Rt{constructor(){super(...arguments);E(this,ft,null)}getStyles(){return`
            dialog {
                background: transparent;
                border: none;
                box-shadow: none;
                outline: none;
                padding: 0;
                max-width: 90vw;
                max-height: 90vh;
            }
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.5);
            }
            .picker-body {
                background-color: rgba(231, 238, 245, .95);
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                border: none;
                border-radius: 8px;
                padding: 24px;
                box-shadow: 0px 0px 15px #00000066;
                font-family: ${Ce};
                color: #414650;
                width: 350px;
                max-width: calc(100vw - 32px);
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                max-height: 80vh;
            }
            .header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }
            .title {
                font-size: 15px;
                font-weight: 600;
                color: #414650;
                text-shadow: 1px 1px #ffffff52;
                flex: 1;
            }
            .search {
                width: 100%;
                padding: 8px;
                font-size: 14px;
                border: 1px solid #b9b9b9;
                border-radius: 4px;
                outline: none;
                box-sizing: border-box;
                font-family: ${Ce};
                margin-bottom: 14px;
                transition: border-color 0.15s ease;
            }
            .search:focus {
                border: 2px solid #01a0fd;
                padding: 7px;
            }
            .font-list {
                height: 200px;
                overflow-y: scroll;
                background-color: white;
                padding: 0 10px;
                margin-bottom: 16px;
                border-radius: 4px;
                border: 1px solid #b9b9b9;
            }
            .font-item {
                padding: 10px;
                border-radius: 2px;
                margin: 10px 0;
                cursor: pointer;
                font-size: 16px;
                color: #414650;
                display: flex;
                align-items: baseline;
                gap: 12px;
                transition: background 0.08s ease;
            }
            .font-item:hover {
                background: rgba(0, 0, 0, 0.04);
            }
            .font-item.selected {
                color: white;
                background-color: #2b62f1;
            }
            .font-item.selected .font-name-label {
                color: rgba(255, 255, 255, 0.7);
            }
            .font-name-label {
                font-family: ${Ce};
                font-size: 12px;
                color: #888;
                flex-shrink: 0;
                margin-left: auto;
            }
            .preview {
                padding: 14px;
                background: white;
                border: 1px solid #b9b9b9;
                border-radius: 4px;
                font-size: 24px;
                margin-bottom: 16px;
                min-height: 40px;
                color: #414650;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            ${ic}
            .btn-cancel {
                /* uses base .btn styles */
            }
            .btn-ok {
                border-color: #088ef0;
                background: linear-gradient(#34a5f8, #088ef0);
                color: white;
                min-width: 90px;
            }
            .btn-ok:active {
                background-color: #2798eb;
                border-color: #2798eb;
                color: #bedef5;
            }
            .btn-ok:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                box-shadow: none;
            }
            @media (max-width: 480px) {
                .picker-body {
                    width: 100%;
                    padding: 20px;
                    max-height: 90vh;
                }
                .btn {
                    padding: 0 20px;
                    font-size: 16px;
                    height: 40px;
                    line-height: 40px;
                    flex: 1;
                }
            }
            :host(.puter-theme-dark) .picker-body {
                background-color: rgba(40, 44, 52, .95);
                color: #e6e6e6;
                box-shadow: 0px 0px 15px #000000aa;
            }
            :host(.puter-theme-dark) .title {
                color: #e6e6e6;
                text-shadow: none;
            }
            :host(.puter-theme-dark) .search {
                background-color: #1f1f1f;
                border-color: #555;
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .font-list {
                background-color: #1f1f1f;
                border-color: #555;
            }
            :host(.puter-theme-dark) .font-item {
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .font-item:hover {
                background: rgba(255, 255, 255, 0.06);
            }
            :host(.puter-theme-dark) .font-name-label {
                color: #888;
            }
            :host(.puter-theme-dark) .preview {
                background: #1f1f1f;
                border-color: #555;
                color: #e6e6e6;
            }
            :host(.puter-theme-dark) .btn {
                color: #e6e6e6;
                border-color: #555;
                background: linear-gradient(#4a4a4a, #3a3a3a);
                box-shadow: inset 0px 1px 0px rgb(255 255 255 / 8%), 0 1px 2px rgb(0 0 0 / 25%);
            }
            :host(.puter-theme-dark) .btn:active {
                background-color: #333;
                border-color: #444;
                color: #999;
            }
        `}render(){const t=this.getAttribute("default-font")||"System UI";y(this,ft,nr.find(s=>s.name.toLowerCase()===t.toLowerCase()||s.family.toLowerCase().includes(t.toLowerCase()))||nr[0]);const r=this._renderFontList(nr);return`
            <dialog>
                <div class="picker-body">
                    <div class="header">
                        <div class="title">Choose Font</div>
                    </div>
                    <input class="search" type="text" placeholder="Search fonts...">
                    <div class="preview" style="font-family: ${h(this,ft).family}">The quick brown fox</div>
                    <div class="font-list">
                        ${r}
                    </div>
                    <div class="buttons">
                        <button class="btn btn-cancel">Cancel</button>
                        <button class="btn btn-ok">Select</button>
                    </div>
                </div>
            </dialog>`}_renderFontList(t){return t.map(r=>`
            <div class="font-item${r.name===h(this,ft).name?" selected":""}"
                 data-name="${this._escapeAttr(r.name)}"
                 style="font-family: ${r.family}">
                ${this._escapeHTML(r.name)}
            </div>
        `).join("")}onReady(){const t=this.$("dialog"),r=this.$(".search"),s=this.$(".font-list"),i=this.$(".preview"),o=this.$(".btn-ok"),a=this.$(".btn-cancel"),u=()=>{this.$$(".font-item").forEach(l=>{l.addEventListener("click",()=>{const c=nr.find(d=>d.name===l.dataset.name);c&&(y(this,ft,c),this.$$(".font-item").forEach(d=>d.classList.remove("selected")),l.classList.add("selected"),i.style.fontFamily=c.family)}),l.addEventListener("dblclick",()=>{const c=nr.find(d=>d.name===l.dataset.name);c&&(y(this,ft,c),this.emitEvent("response",{fontFamily:c.family}),this.close())})})};u(),r.addEventListener("input",l=>{const c=l.target.value.toLowerCase(),d=nr.filter(f=>f.name.toLowerCase().includes(c)||f.category.toLowerCase().includes(c));s.innerHTML=this._renderFontList(d),u()}),o.addEventListener("click",()=>{this.emitEvent("response",{fontFamily:h(this,ft).family}),this.close()}),a.addEventListener("click",()=>{this.emitEvent("response",null),this.close()}),t.addEventListener("click",l=>{l.target===t&&(this.emitEvent("response",null),this.close())})}_escapeHTML(t){if(!t)return"";const r=document.createElement("div");return r.textContent=t,r.innerHTML}_escapeAttr(t){return t?t.replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}ft=new WeakMap;const Pb=[["puter-alert",_b],["puter-prompt",Ab],["puter-notification",Tb],["puter-context-menu",hi],["puter-spinner",Sb],["puter-menubar",Cb],["puter-color-picker",Lb],["puter-font-picker",Rb]];function Bb(){if(!(typeof globalThis.HTMLElement>"u"||!globalThis.customElements))for(const[n,e]of Pb)customElements.get(n)||customElements.define(n,e)}class Ri{constructor(e={}){this.fieldsObj=e,this.enabled=new Set}on(e){this.enabled.add(e)}fields(e={}){return new Ri({...this.fieldsObj,...e})}info(...e){console.log(...this._prefix(),...e)}warn(...e){console.warn(...this._prefix(),...e)}error(...e){console.error(...this._prefix(),...e)}debug(...e){console.debug(...this._prefix(),...e)}_prefix(){const e=Object.entries(this.fieldsObj);return e.length?[`[${e.map(([t,r])=>`${t}=${r}`).join(" ")}]`]:[]}}class Mb{constructor(){this.locked=!1,this.queue=[]}async acquire(){if(!this.locked){this.locked=!0;return}await new Promise(e=>this.queue.push(e)),this.locked=!0}release(){const e=this.queue.shift();if(e){e();return}this.locked=!1}}const qb="https://puter.com",tt="puter.auth.token.v2",Ns="puter.auth.token",lt="puter.auth.token.origin.v2";var cn,ln;class Pi{constructor(){p(this,"env");p(this,"args",{});p(this,"authToken",null);p(this,"APIOrigin");p(this,"tools",[]);p(this,"util");p(this,"auth");p(this,"os");p(this,"fs");p(this,"ui");p(this,"hosting");p(this,"apps");p(this,"ai");p(this,"kv");p(this,"email");p(this,"events");p(this,"perms");p(this,"teams");p(this,"drivers");p(this,"debug");p(this,"peer");p(this,"workers");p(this,"path");E(this,cn,"https://api.puter.com");E(this,ln,"https://puter.com");p(this,"onAuth");p(this,"puterAuthState",{isPromptOpen:!1,authGranted:null,resolvers:[]});p(this,"appInstanceID");p(this,"parentInstanceID");p(this,"eventHandlers",{});p(this,"_reauthInflight",null);p(this,"_authStateListeners",new Set);p(this,"debugMode",!1);p(this,"quiet",!1);p(this,"socketEnabled",globalThis.puter_socket_enabled!==!1);p(this,"normalizeAuthTokenCandidate",function(e){if(typeof e!="string")return null;const t=e.trim();return!t||t==="null"||t==="undefined"?null:t});p(this,"decodeJwtPayload",function(e){if(typeof e!="string")return null;const t=e.split(".");if(t.length<2)return null;let r=t[1];r=r.replace(/-/g,"+").replace(/_/g,"/");const s=r.length%4;s&&(r+="=".repeat(4-s));try{let i;if(typeof globalThis.atob=="function")i=decodeURIComponent(Array.prototype.map.call(globalThis.atob(r),a=>`%${`00${a.charCodeAt(0).toString(16)}`.slice(-2)}`).join(""));else if(typeof globalThis.Buffer<"u")i=globalThis.Buffer.from(r,"base64").toString("utf8");else return null;const o=JSON.parse(i);return o&&typeof o=="object"?o:null}catch{return null}});p(this,"normalizeStringCandidate",function(e){return typeof e!="string"?null:e.trim()||null});p(this,"decodeCompressedAppID",function(e){const t=this.normalizeStringCandidate(e);if(!t)return null;if(t.includes("-"))return t;try{let r;if(typeof globalThis.Buffer<"u")r=globalThis.Buffer.from(t,"base64");else if(typeof globalThis.atob=="function"){const i=globalThis.atob(t);r=Uint8Array.from(i,o=>o.charCodeAt(0))}else return null;if(!r||r.length!==16)return null;const s=typeof globalThis.Buffer<"u"&&typeof globalThis.Buffer.isBuffer=="function"&&globalThis.Buffer.isBuffer(r)?r.toString("hex"):Array.from(r).map(i=>i.toString(16).padStart(2,"0")).join("");return s.length!==32?null:`app-${[s.slice(0,8),s.slice(8,12),s.slice(12,16),s.slice(16,20),s.slice(20)].join("-")}`}catch{return null}});p(this,"getAppIDFromAuthToken",function(e){const t=this.decodeJwtPayload(e);if(!t)return null;const r=this.normalizeStringCandidate(t.app_uid);return r||this.decodeCompressedAppID(t.au)});p(this,"setAppID",function(e){try{localStorage.setItem("puter.app.id",e)}catch(t){console.error("Error accessing localStorage:",t)}this.appID=e,this.appDataPath=e?`~/AppData/${e}`:void 0});p(this,"setAuthToken",function(e){const t=this.normalizeAuthTokenCandidate(e);this.authToken=t;const r=this.getAppIDFromAuthToken(t);if(r&&this.setAppID(r),this.env==="web"||this.env==="app"){this.storeSessionToken_(this.env==="app"&&this.isUserSessionToken_(t)?t:null);try{t?this.isUserSessionToken_(t)||(localStorage.setItem(tt,t),localStorage.setItem(lt,this.APIOrigin)):(localStorage.removeItem(tt),localStorage.removeItem(lt)),localStorage.removeItem(Ns)}catch(s){console.error("Error accessing localStorage:",s)}}this.env==="gui"&&setInterval(R.checkAndUpdateGUIFScache,1e4),this._emitAuthStateChanged(),this.request_rao_(),this.whoamiCache_=this.cacheWhoami_()});p(this,"_storedTokenUsableForCurrentOrigin",function(e){return el({boundOrigin:e,currentOrigin:this.APIOrigin,defaultAPIOrigin:this.defaultAPIOrigin})});p(this,"setAPIOrigin",function(e){this.APIOrigin=e,this._emitAuthStateChanged()});p(this,"runWhenPuterHappensCallbacks",function(){if(this.env!=="gui"||!globalThis.when_puter_happens)return;const e=Array.isArray(globalThis.when_puter_happens)?globalThis.when_puter_happens:[globalThis.when_puter_happens];for(const t of e)try{t({puter:this})}catch(r){this.debugMode&&console.error("when_puter_happens callback failed",r)}});p(this,"_clearAuthToken",function(){if(this.authToken=null,this.env==="web"||this.env==="app"){this.storeSessionToken_(null);try{localStorage.removeItem(tt),localStorage.removeItem(lt),localStorage.removeItem(Ns)}catch(e){console.error("Error accessing localStorage:",e)}}});p(this,"resetAuthToken",function(){if(this.env==="web-worker"||this.env==="service-worker")throw new Error("Sign out is not permitted from WebWorkers or ServiceWorkers");this._clearAuthToken(),this._emitAuthStateChanged()});p(this,"triggerReauth",async function(e={}){const{reason:t,auth_id:r}=e;if(this._reauthInflight)return this._reauthInflight;this._emitReauthEvent({reason:t,auth_id:r}),this._clearAuthToken(),this._emitAuthStateChanged(),this._reauthInflight=(async()=>{var s,i;if(this.env!=="gui"){if(this.env==="web-worker"||this.env==="service-worker"||this.env==="nodejs"){const o=new Error("reauth_required");throw o.code="reauth_required",o.reason=t,o.auth_id=r,o}if(this.env==="web"){await this.ui.authenticateWithPuter({auth_id:r,reason:t});return}if(this.env==="app"){try{(i=(s=globalThis.parent)==null?void 0:s.postMessage)==null||i.call(s,{msg:"reauth_required",appInstanceID:this.appInstanceID,reason:t,auth_id:r},this.defaultGUIOrigin)}catch{}await new Promise((o,a)=>{var c;const u=globalThis.parent,l=d=>{var f;d.origin===this.defaultGUIOrigin&&(u&&d.source!==u||((f=d.data)==null?void 0:f.msg)==="puter.token"&&(globalThis.removeEventListener("message",l),o()))};(c=globalThis.addEventListener)==null||c.call(globalThis,"message",l),setTimeout(()=>{var d;(d=globalThis.removeEventListener)==null||d.call(globalThis,"message",l),a(new Error("reauth_timeout"))},5*60*1e3)})}}})();try{await this._reauthInflight}finally{this._reauthInflight=null}});p(this,"dropStaleAuthToken",function({reason:e,auth_id:t,sentToken:r}={}){r&&r!==this.authToken||(this._emitReauthEvent({reason:e,auth_id:t}),this._clearAuthToken(),this._emitAuthStateChanged())});p(this,"_emitReauthEvent",function({reason:e,auth_id:t}){var r;try{const s=(r=this.eventHandlers)==null?void 0:r["puter.auth.reauth_required"];if(Array.isArray(s))for(const i of s)try{i({reason:e,auth_id:t})}catch{}}catch{}});p(this,"on",function(e,t){return this.eventHandlers[e]||(this.eventHandlers[e]=[]),this.eventHandlers[e].push(t),()=>this.off(e,t)});p(this,"off",function(e,t){const r=this.eventHandlers[e];if(!r)return;const s=r.indexOf(t);s>=0&&r.splice(s,1)});p(this,"discardRetiredAuthToken_",function(){try{localStorage.removeItem(Ns)}catch{}});p(this,"isUserSessionToken_",function(e){return rl(this.decodeJwtPayload(e))});p(this,"storeSessionToken_",function(e){try{e?(sessionStorage.setItem(tt,e),sessionStorage.setItem(lt,this.APIOrigin)):(sessionStorage.removeItem(tt),sessionStorage.removeItem(lt))}catch{}});p(this,"readStoredSessionToken_",function(){try{const e=this.normalizeAuthTokenCandidate(sessionStorage.getItem(tt)),t=this.normalizeStringCandidate(sessionStorage.getItem(lt));if(e&&this.isUserSessionToken_(e)&&this._storedTokenUsableForCurrentOrigin(t))return e}catch{}return null});p(this,"discardStoredSessionToken_",function(){try{this.isUserSessionToken_(localStorage.getItem(tt))&&(localStorage.removeItem(tt),localStorage.removeItem(lt))}catch{}});p(this,"stripLaunchTokenFromUrl_",function(e){var s,i;const t=()=>{try{const o=tl(globalThis.location.href,e);o&&globalThis.history.replaceState(globalThis.history.state,"",o)}catch{}},r=()=>setTimeout(t,0);((s=globalThis.document)==null?void 0:s.readyState)==="complete"?r():(i=globalThis.addEventListener)==null||i.call(globalThis,"load",r,{once:!0})});p(this,"exit",function(e=0){e&&typeof e!="number"&&(console.warn("puter.exit() requires status code to be a number. Treating it as 1"),e=1),globalThis.parent.postMessage({msg:"exit",appInstanceID:this.appInstanceID,statusCode:e},"*")});p(this,"randName",function(e="-"){const t=["helpful","sensible","loyal","honest","clever","capable","calm","smart","genius","bright","charming","creative","diligent","elegant","fancy","colorful","avid","active","gentle","happy","intelligent","jolly","kind","lively","merry","nice","optimistic","polite","quiet","relaxed","silly","victorious","witty","young","zealous","strong","brave","agile","bold"],r=["street","roof","floor","tv","idea","morning","game","wheel","shoe","bag","clock","pencil","pen","magnet","chair","table","house","dog","room","book","car","cat","tree","flower","bird","fish","sun","moon","star","cloud","rain","snow","wind","mountain","river","lake","sea","ocean","island","bridge","road","train","plane","ship","bicycle","horse","elephant","lion","tiger","bear","zebra","giraffe","monkey","snake","rabbit","duck","goose","penguin","frog","crab","shrimp","whale","octopus","spider","ant","bee","butterfly","dragonfly","ladybug","snail","camel","kangaroo","koala","panda","piglet","sheep","wolf","fox","deer","mouse","seal","chicken","cow","dinosaur","puppy","kitten","circle","square","garden","otter","bunny","meerkat","harp"];return t[Math.floor(Math.random()*t.length)]+e+r[Math.floor(Math.random()*r.length)]+e+Math.floor(Math.random()*1e4)});p(this,"getUser",function(...e){let t;return typeof e[0]=="object"&&e[0]!==null?t=e[0]:t={success:e[0],error:e[1]},new Promise((r,s)=>{const i=Zt("/whoami",this.APIOrigin,this.authToken,"get");Lt(i,t.success,t.error,r,s),i.send()})});p(this,"print",function(...e){let t={};e.length>0&&typeof e[e.length-1]=="object"&&e[e.length-1]!==null&&("escapeHTML"in e[e.length-1]||"code"in e[e.length-1])&&(t=e.pop());for(let r of e)(t.escapeHTML===!0||t.code===!0)&&typeof r=="string"&&(r=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")),t.code===!0&&(r=`<code><pre>${r}</pre></code>`),document.body.innerHTML+=r});p(this,"configureAPILogging",function(e={}){return this.apiCallLogger&&this.apiCallLogger.updateConfig(e),this});p(this,"enableAPILogging",function(e={}){return this.apiCallLogger&&this.apiCallLogger.updateConfig({...e,enabled:!0}),this});p(this,"disableAPILogging",function(){return this.apiCallLogger&&this.apiCallLogger.disable(),this});p(this,"initNetworkMonitoring",function(){if(typeof globalThis.navigator>"u"||typeof globalThis.addEventListener!="function")return;let e=navigator.onLine;const t=()=>{const r=navigator.onLine;if(e&&!r){console.log("Network connection lost - purging cache");try{this._cache.flushall(),console.log("Cache purged successfully")}catch(s){console.error("Error purging cache:",s)}}e=r};globalThis.addEventListener("online",t),globalThis.addEventListener("offline",t),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{setTimeout(t,100)})});p(this,"printDevCTA",function(){if(this.quiet||globalThis.PUTER_QUIET)return;const e=globalThis.matchMedia&&globalThis.matchMedia("(prefers-color-scheme: dark)").matches,t=e?"#7c8cff":"#000fd8",r=e?"#cbd5f5":"rgb(0, 57, 137)",s=e?"#93c5fd":"#3b82f6",i=e?"#64748b":"#94a3b8";console.log(`%c ____  _   _ _____ _____ ____       _ ____  
|  _ \\| | | |_   _| ____|  _ \\     | / ___| 
| |_) | | | | | | |  _| | |_) | _  | \\___ \\ 
|  __/| |_| | | | | |___|  _ < | |_| |___) |
|_|    \\___/  |_| |_____|_| \\_(_)___/|____/ `,`color: ${t}; font-weight: bold; font-size: 14px; font-family: monospace;`),console.log(`%cSubmit this app to the Puter App Store:
%chttps://apps.puter.com/`,`color: ${r}; font-size: 18px; font-weight: bold;`,`color: ${s}; font-size: 18px; font-weight: bold; text-decoration: underline;`),console.log("%cTo disable this message: %cputer.quiet = true",`color: ${i}; font-size: 11px;`,`color: ${i}; font-size: 11px; font-style: italic;`)});p(this,"warnUnsupportedOrigin",function(){var t;if(!fi()||this._opaqueOriginWarned||(this._opaqueOriginWarned=!0,console.warn("Puter.js: this page has no origin to sign in with. Serve it over http://localhost or a real domain instead of opening it from a file, and give sandboxed iframes allow-same-origin."),((t=globalThis.location)==null?void 0:t.protocol)!=="file:"))return;const e=()=>{const r=new Yt(()=>{},()=>{});document.body.appendChild(r),r.openNotice()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()});p(this,"checkAndUpdateGUIFScache",function(){if(R.env!=="gui"||!R.whoami)return;let e=R.whoami.username;const t=a=>{a.catch(()=>{})};let r=`/${e}`,s=`/${e}/Desktop`,i=`/${e}/Documents`,o=`/${e}/Public`;R._cache.get(`item:${r}`)||(console.log(`/${e} item is not cached, refetching cache`),t(R.fs.stat(r))),R._cache.get(`item:${s}`)||(console.log(`/${e}/Desktop item is not cached, refetching cache`),t(R.fs.stat(s))),R._cache.get(`item:${i}`)||(console.log(`/${e}/Documents item is not cached, refetching cache`),t(R.fs.stat(i))),R._cache.get(`item:${o}`)||(console.log(`/${e}/Public item is not cached, refetching cache`),t(R.fs.stat(o))),R._cache.get(`readdir:${r}`)||(console.log(`/${e} is not cached, refetching cache`),t(R.fs.readdir(r))),R._cache.get(`readdir:${s}`)||(console.log(`/${e}/Desktop is not cached, refetching cache`),t(R.fs.readdir(s))),R._cache.get(`readdir:${i}`)||(console.log(`/${e}/Documents is not cached, refetching cache`),t(R.fs.readdir(i))),R._cache.get(`readdir:${o}`)||(console.log(`/${e}/Public is not cached, refetching cache`),t(R.fs.readdir(o)))});var r;this._cache=new Gi({dbName:"puter_cache"}),this._opscache=new Gi;let e=new URLSearchParams((r=globalThis.location)==null?void 0:r.search);if(e.has("puter.app_instance_id")&&La(globalThis)?this.env="app":globalThis.puter_gui_enabled===!0?this.env="gui":globalThis.WorkerGlobalScope?(globalThis.ServiceWorkerGlobalScope?(this.env="service-worker",globalThis.XMLHttpRequest||(globalThis.XMLHttpRequest=zn),globalThis.location||(globalThis.location=new URL("https://puter.site/"))):this.env="web-worker",globalThis.localStorage||(globalThis.localStorage=Me)):globalThis.process?(this.env="nodejs",globalThis.localStorage||(globalThis.localStorage=Me),globalThis.XMLHttpRequest||(globalThis.XMLHttpRequest=zn),globalThis.location||(globalThis.location=new URL("https://nodejs.puter.site/")),globalThis.addEventListener||(globalThis.addEventListener=()=>{})):this.env="web",this.env!=="gui"){let s=location.hostname.replace(/\.$/,"");const o=new URL(qb).hostname;s===o&&(this.env="gui")}e.has("puter.args")?this.args=JSON.parse(decodeURIComponent(e.get("puter.args"))):this.args={},e.has("puter.app_instance_id")&&(this.appInstanceID=decodeURIComponent(e.get("puter.app_instance_id"))),e.has("puter.parent_instance_id")&&(this.parentInstanceID=decodeURIComponent(e.get("puter.parent_instance_id"))),e.has("puter.app.id")&&(this.appID=decodeURIComponent(e.get("puter.app.id"))),e.has("puter.app.name")&&(this.appName=decodeURIComponent(e.get("puter.app.name"))),this.appID&&(this.appDataPath=`~/AppData/${this.appID}`),this.APIOrigin=this.defaultAPIOrigin,e.has("puter.api_origin")&&this.env==="app"?this.APIOrigin=decodeURIComponent(e.get("puter.api_origin")):e.has("puter.domain")&&this.env==="app"&&(this.APIOrigin=`https://api.${e.get("puter.domain")}`);let t=new Ri;if(this.logger=t,this.apiCallLogger=new xc({enabled:!1}),this.lock_rao_=new Mb,this.p_can_request_rao_=Promise.resolve(),this.rao_requested_=!1,this.whoamiCache_=null,(this.env==="web"||this.env==="app")&&this.discardStoredSessionToken_(),this.env==="gui")this.authToken=window.auth_token,this.initSubmodules();else if(this.env==="app"){const s=e.has("puter.auth.token")?"puter.auth.token":"auth_token",i=this.normalizeAuthTokenCandidate(e.get(s));i&&this.stripLaunchTokenFromUrl_(s);try{let o=i;const a=i?null:this.readStoredSessionToken_();if(i)this.setAuthToken(i);else if(a)this.setAuthToken(a),o=a;else{const l=this.normalizeStringCandidate(localStorage.getItem(lt)),c=this.normalizeAuthTokenCandidate(localStorage.getItem(tt));c&&this._storedTokenUsableForCurrentOrigin(l)?(this.setAuthToken(c),o=c):c&&(this._needsOriginReauth={reason:"api_origin_mismatch"})}if(!this.getAppIDFromAuthToken(o)&&!this.appID){const l=localStorage.getItem("puter.app.id");l&&this.setAppID(l)}}catch(o){console.error("Error accessing localStorage:",o)}if(this.initSubmodules(),this._needsOriginReauth){const o=this._needsOriginReauth;this._needsOriginReauth=null,this.setAPIOrigin(this.defaultAPIOrigin),this.triggerReauth(o)}}else if(this.env==="web"){this.initSubmodules();try{const s=this.normalizeAuthTokenCandidate(localStorage.getItem(tt)),i=this.normalizeStringCandidate(localStorage.getItem(lt));s&&this._storedTokenUsableForCurrentOrigin(i)?this.setAuthToken(s):s&&this._clearAuthToken(),!this.appID&&localStorage.getItem("puter.app.id")&&this.setAppID(localStorage.getItem("puter.app.id"))}catch(s){console.error("Error accessing localStorage:",s)}this.printDevCTA(),this.warnUnsupportedOrigin()}else(this.env==="web-worker"||this.env==="service-worker"||this.env==="nodejs")&&this.initSubmodules();(this.env==="web"||this.env==="app")&&this.discardRetiredAuthToken_(),(async()=>{try{const s=await this.whoamiCache_;if(!s)return;const i=`[${s.app_name??this.appInstanceID??"HOST"}]`;t=t.fields({prefix:i}),this.logger=t}catch(s){this.debugMode&&console.error("Failed to initialize prefix logger",s)}})(),this.net={generateWispV1URL:async()=>{const{token:s,server:i}=await(await G(`${this.APIOrigin}/wisp/relay-token/create`,{method:"POST",includePuterAuth:!0,headers:{"Content-Type":"application/json"},body:JSON.stringify({})})).json();return`${i}/${s}/`},Socket:ku,tls:{TLSSocket:Sm},fetch:Lm},this.initNetworkMonitoring()}get defaultAPIOrigin(){return globalThis.PUTER_API_ORIGIN||globalThis.PUTER_API_ORIGIN_ENV||h(this,cn)}set defaultAPIOrigin(e){y(this,cn,e)}get defaultGUIOrigin(){return globalThis.PUTER_ORIGIN||globalThis.PUTER_ORIGIN_ENV||h(this,ln)}set defaultGUIOrigin(e){y(this,ln,e)}initSubmodules(){this.util=new eb,this.auth=this.registerModule("auth",zl),this.os=this.registerModule("os",qm),this.fs=this.registerModule("fs",Jp),this.ui=this.registerModule("ui",Jg,{appInstanceID:this.appInstanceID,parentInstanceID:this.parentInstanceID}),this.hosting=this.registerModule("hosting",nm),this.apps=this.registerModule("apps",$l),this.ai=this.registerModule("ai",Rl),this.kv=this.registerModule("kv",vm),this.email=this.registerModule("email",eh),this.events=this.registerModule("events",Hf),this.perms=this.registerModule("perms",kg),this.teams=this.registerModule("teams",Gg),this.drivers=this.registerModule("drivers",Vl),this.debug=this.registerModule("debug",Hl),this.peer=this.registerModule("peer",xb),this.workers=this.registerModule("workers",rb),this.path=j,Bb()}async request_rao_(){if(await this.p_can_request_rao_,!(this.env==="gui"||this.env==="app"||!this.socketEnabled)){if(await this.lock_rao_.acquire(),this.rao_requested_){this.lock_rao_.release();return}try{const e=await G(`${this.APIOrigin}/rao`,{method:"POST",includePuterAuth:!0,headers:{Origin:location.origin},interactiveReauth:!1});return this.rao_requested_=!0,await e.json()}catch(e){console.error(e)}finally{this.lock_rao_.release()}}}async cacheWhoami_(){if(!this.authToken||!this.socketEnabled)return null;try{const e=await G(`${this.APIOrigin}/whoami`,{authToken:this.authToken,interactiveReauth:!1,logContext:{service:"auth",operation:"whoami",params:{}}});return e.ok?(this.whoami=await e.json(),this.whoami):null}catch{return null}}registerModule(e,t,r={}){const s=new t(this,r);return s.puter=this,this[e]=s,s._init&&s._init({puter:this}),s}onAuthStateChanged(e){return this._authStateListeners.add(e),()=>this._authStateListeners.delete(e)}_emitAuthStateChanged(){for(const e of this._authStateListeners)try{e()}catch(t){this.debugMode&&console.error("Auth state listener failed",t)}}}cn=new WeakMap,ln=new WeakMap,p(Pi,"FSItem",Le);const R=new Pi;globalThis.puter=R;R.runWhenPuterHappensCallbacks();const or=R.ui.parentApp();globalThis.puterParent=or;or&&(console.log("I have a parent, registering tools"),or.on("message",async n=>{if(console.log("Got tool req ",n),n.$==="requestTools"&&(console.log("Responding with tools"),or.postMessage({$:"providedTools",tools:JSON.parse(JSON.stringify(R.tools))})),n.$==="executeTool"){console.log("xecuting tools");const[e]=R.tools.filter(r=>r.function.name===n.toolName),t=await e.exec(n.parameters);or.postMessage({$:"toolResponse",response:t,tag:n.tag})}}),or.postMessage({$:"ready"}));globalThis.addEventListener&&globalThis.addEventListener("message",async n=>{if(n.origin===R.defaultGUIOrigin){if(n.data.msg&&n.data.msg==="requestOrigin")n.source.postMessage({msg:"originResponse"},"*");else if(n.data.msg==="puter.token"){if(R.setAuthToken(n.data.token),!R.getAppIDFromAuthToken(n.data.token)&&!R.appID){const r=R.normalizeStringCandidate(n.data.app_uid);r&&R.setAppID(r)}R.puterAuthState.authGranted=!0,R.onAuth&&typeof R.onAuth=="function"&&R.getUser().then(r=>{R.onAuth(r)}),R.puterAuthState.isPromptOpen=!1;const t=R.puterAuthState.resolvers;R.puterAuthState.resolvers=[];for(const r of t)R.puterAuthState.authGranted?r.resolve():r.reject()}}});const zb=Object.freeze(Object.defineProperty({__proto__:null,Puter:Pi,default:R,puter:R},Symbol.toStringTag,{value:"Module"}));export{Wi as _,ga as g,zb as i};
