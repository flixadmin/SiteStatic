let push_html = `
<style>
.push-card {max-height: calc(100% - 2rem);overflow: auto;position: fixed;z-index: 30;bottom: 0;right: 0;}
.push-card.hide {transform: translateX(26rem) scale(0);opacity: 0;visibility: hidden;}
.push-bell {font-size: 2.5rem;color: #059669;margin-top: auto;margin-bottom: auto;}
.dark .push-bell {color: #34d399}
.push-card .sp {margin-left: auto;color: rgb(5 150 105/.75);border: 2px solid rgb(5 150 105/.75);}
.dark .push-card .sp {color: rgb(52 211 153/.75);border-color: rgb(52 211 153/.75);}
.push-card .sp:hover {color: white;border-color: transparent;}
.push-card .sb {margin-right: auto}
@media only screen and (max-width: 500px) {
  .push-card {max-width: calc(100% - 2rem);}
}
</style>
<div class="push-card hide bg-slate-200 dark:bg-slate-600 max-w-96 w-full rounded-md m-4 border border-slate-300 dark:border-slate-500 p-4 text-slate-700 dark:text-slate-100 shadow-md ease-out duration-300">
  <div class="flex gap-3">
    <i class="bi bi-bell push-bell"></i>
    <p>Subscribe to our push notification and you will never miss any updates of <b style="text-wrap: nowrap;">Movie or Series</b></p>
  </div>
  <div class="flex gap-3 mt-3">
    <button class="sp ease-out duration-300 px-4 py-2 rounded leading-none active:scale-[.9] hover:bg-emerald-600 active:bg-emerald-700 dark:hover:bg-emerald-400/75 dark:active:bg-emerald-400">Later</button>
    <button class="sb bg-emerald-600/75 hover:bg-emerald-600 active:bg-emerald-700 dark:bg-emerald-400/50 dark:hover:bg-emerald-400/75 dark:active:bg-emerald-400 text-white ease-out duration-300 px-4 py-2 rounded leading-none active:scale-[.9]">Subscribe</button>
  </div>
</div>`;

$('body').append(push_html);

function setCookie(name, value, domain, daysToExpire) {
  let date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};domain=${domain};SameSite=Lax;${expires};path=/`;
}
function suppress_push_asking() {
  setCookie("push_sp", 1, window.location.hostname, 1);
  $(".push-card").addClass('hide');
}
function open_push_page() {
  window.open('https://push.flixwonders.com');
  $(".push-card").addClass('hide');
}
function askForPush() {
  $(".push-card").removeClass("hide");
}

let has_perm = document.cookie.indexOf("perm=1") != -1;
let site_view = parseInt(window.sessionStorage.getItem('site_view'));
site_view = site_view ? site_view + 1 : 1;
window.sessionStorage.setItem('site_view', site_view);
let sleepTime = 3; // sec
let required_view = 2;
let is_suppressed = document.cookie.indexOf("push_sp=1") != -1;

if (!has_perm && site_view >= required_view && !is_suppressed) {
  setTimeout(askForPush, sleepTime * 1000);
}
$(".push-card .sp").click(suppress_push_asking);
$(".push-card .sb").click(open_push_page);
