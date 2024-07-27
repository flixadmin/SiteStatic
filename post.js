// POST JS
window.addEventListener('load', function () {
let cover_img=function(){return $(".ps .cover-img .to-load")},backdrop_img=function(){return $(".ps .backdrop-img .to-load")};cover_img().replaceTag("img"),cover_img().on("load",function(){$(this).removeClass("to-load animate-pulse dark:bg-slate-600 bg-slate-400 text-transparent").addClass("loaded")}).on("error",function(){$(this).attr("src",CDN(window.mthumbnail_url.replace("/original/","/w500/")))}),backdrop_img().attr("src",CDN(window.mbackground_url.replace('/original/', '/w780/'))).replaceTag("img"),backdrop_img().on("load",function(){$(this).removeClass("to-load").addClass("loaded").parent().removeClass('animate-pulse dark:bg-slate-600 bg-slate-400')});
window.cover = new FsLightbox();window.cover.props.sources = [CDN(window.mthumbnail_url)];
window.backdrop = new FsLightbox();window.backdrop.props.sources = [CDN(window.mbackground_url)];
$('.ps .year').text('(' + window.mrelease_date.split(',')[1].trim() + ')').addClass('brightness-75');
let label_html = $('#post_labels').html();$('#post_labels').remove();
let sc = `
<p class='tagline text-slate-600 dark:text-slate-200 mb-2'>${window.mtagline}</p>
<h5 class='text-xl font-medium mb-1'>Overview</h5>
<p class='overview mb-2'>${window.mdescription}</p>
<h5 class='text-xl font-medium mb-1'>Basic Info</h5>
<table class='w-full border-collapse border border-slate-300 dark:border-slate-500 text-center mb-2'>
  <tbody class='border-inherit'>
    <tr class='even:bg-slate-50 odd:bg-slate-100 dark:even:bg-slate-600 dark:odd:bg-slate-600/50 border border-inherit'><td class='border border-inherit w-1/2 py-2'>Release Date</td><td>${window.mrelease_date}</td></tr>
    <tr class='even:bg-slate-50 odd:bg-slate-100 dark:even:bg-slate-600 dark:odd:bg-slate-600/50 border border-inherit'><td class='border border-inherit w-1/2 py-2'>Rating</td><td>${window.mrating / 10}</td></tr>
    <tr class='even:bg-slate-50 odd:bg-slate-100 dark:even:bg-slate-600 dark:odd:bg-slate-600/50 border border-inherit'><td class='border border-inherit w-1/2 py-2'>Duration</td><td>${window.mduration}</td></tr>
    <tr class='even:bg-slate-50 odd:bg-slate-100 dark:even:bg-slate-600 dark:odd:bg-slate-600/50 border border-inherit'><td class='border border-inherit w-1/2 py-2'>Genres</td><td><div class='flex flex-wrap gap-1 justify-center p-1'>${label_html}</div></td></tr>
  </tbody>
</table>
<h5 class='text-xl font-medium mb-1'>Images</h5>
<div class='grid media grid-cols-2 sm:grid-cols-3 gap-3 my-2 mx-auto'>
`;
window.media = new FsLightbox();window.media.props.sources = [];
window.mimages.sort(() => Math.random() - 0.5).slice(0, 12).forEach(function (e, i) {
  window.media.props.sources.push(CDN(e));
  sc+=`<div class='rounded w-full cursor-zoom-in aspect-backdrop to-load animate-pulse dark:bg-slate-600 bg-slate-400' src='${CDN(e, 300, 80)}' onclick='window.media.open(${i})'></div>`;
})
sc += `</div>
<div id='alert'></div>
<div class='flex justify-between mb-1'>
  <h5 class='text-xl font-medium'>Download</h5>
  <button class='rounded filter-btn p-1 text-sm ease-out duration-300 border bg-emerald-200/50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:bg-emerald-800/50 dark:text-emerald-400 dark:border-emerald-700/75 dark:hover:bg-emerald-400/75 dark:hover:text-white dark:hover:border-emerald-400/75 leading-none' style='display: none'>Filter</button>
</div>
<div id='dl' class='relative overflow-x-auto rounded-md mb-1'>
  <span class="border-4 rounded-full w-10 h-10 block mx-auto my-6 border-emerald-600/[.5] border-t-emerald-600 dark:border-emerald-400/[.5] dark:border-t-emerald-400 animate-spin"></span>
</div>
<div align="center" class="mt-4">
  <button id="dlvlt" style="display: none" class="bg-emerald-600/[.85] text-white py-2 px-4 opacity-[.9] leading-none rounded-md text-lg ease-out duration-300 active:scale-[.9] hover:bg-emerald-600 dark:bg-emerald-400/75 dark:hover:bg-emerald-500/75">
    <span>Download Visible Links TXT</span>
  </button>
</div>
<p class="faq9450" style="display: none"><b>What to do with this TXT?:</b>  Nowadays, most of the modern Download Managers (like: 1DM and FDM) supports link importing feature. You just have to select this TXT file in your Download Manager and then it will import all the links to download.</p>
`;
$('.sc').html(sc);
$('.sc .media .to-load').replaceTag('img');$('.sc .media .to-load').on('load', function(){$(this).removeClass('to-load animate-pulse dark:bg-slate-600 bg-slate-400').addClass('loaded')});
window.dispatchEvent(new Event('resize'));
$('#dlvlt').on('click', on_dlvlt_click);
load_streams();
$('body').append(`<div id="modal" class="fixed w-full h-full top-0 left-0 z-40 backdrop-blur-sm backdrop-brightness-75 text-slate-700 dark:text-slate-100 flex items-center justify-center ease duration-300 opacity-0 invisible" tabindex="-1">
  <div class="card bg-slate-200 dark:bg-slate-600 max-w-96 w-full rounded-md m-4 shadow-md border border-slate-300 dark:border-slate-500 p-4" style="max-height: calc(100% - 2rem); overflow: auto;">
    <h3 class="heading text-2xl text-center">Filter Links</h3>
    <hr class="h-px my-3 bg-slate-300 border-0 dark:bg-slate-500">
    <div class="body">
      <label for="fseason" class="block mb-1 font-medium">Season</label>
      <select id="fseason" class="block w-full p-2 mb-3 text-sm outline-none border border-gray-300 rounded-lg bg-gray-100 focus:ring-emerald-600 focus:border-emerald-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-emerald-400 dark:focus:border-emerald-400">
        <option value="" selected="">All</option>
      </select>
      <label for="flang" class="block mb-1 font-medium">Language</label>
      <select id="flang" class="block w-full p-2 mb-3 text-sm outline-none border border-gray-300 rounded-lg bg-gray-100 focus:ring-emerald-600 focus:border-emerald-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-emerald-400 dark:focus:border-emerald-400">
        <option value="" selected="">All</option>
      </select>
      <label for="fres" class="block mb-1 font-medium">Quality</label>
      <select id="fres" class="block w-full p-2 mb-3 text-sm outline-none border border-gray-300 rounded-lg bg-gray-100 focus:ring-emerald-600 focus:border-emerald-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-emerald-400 dark:focus:border-emerald-400">
        <option value="" selected="">All</option>
      </select>
    </div>
    <hr class="h-px my-3 bg-slate-300 border-0 dark:bg-slate-500">
    <div class="footer flex items-center justify-center">
      <a role="button" class="filter_link text-sm block bg-emerald-600/75 hover:bg-emerald-600 active:bg-emerald-700 dark:bg-emerald-400/50 dark:hover:bg-emerald-400/75 dark:active:bg-emerald-400 text-white ease-out duration-300 px-4 py-2 rounded leading-none active:scale-[.9]">Filter</a>
    </div>
  </div>
</div>`);
$('#modal, .filter-btn, .filter_link').click(function(e){if(e.target == $(this)[0]){$('#modal').toggleClass('invisible opacity-0');$('body').toggleClass('overflow-hidden')}});
$('.filter_link').click(function(){
  let s = $('#fseason').val();
  let l = $('#flang').val();
  let r = $('#fres').val();
  $('#dl tbody tr').each(function(){
    let ts = s == '' ? '' : $(this).find('.ts').text().trim();
    let tl = l == '' ? '' : $(this).find('.tl').text().trim();
    let tr = r == '' ? '' : $(this).find('.tr').text().trim();
    let matched = s == ts && l == tl && r==tr;
    matched ? $(this).show() : $(this).hide();
  })
});
}) // END Listener
async function load_streams() {
  let dl = $('#dl');
  let err_msg = (s) => `<p class="error col-span-full px-6 py-3 rounded-md bg-yellow-200/50 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-100 text-lg w-fit mx-auto shadow"><i class="bi bi-exclamation-octagon me-2"></i> ${s}</p>`;
  $.ajax({
    url: "//app.flixwonders.com/api/getData/" + window.post_id,
    method: 'POST',
    xhrFields: {withCredentials: true},
    success: function (r, s) {
      let isTV = r.type != 'movie';
      if (!isTV) {$('#fseason, label[for="fseason"]').hide()}
      $('.filter-btn').show();
      let table = $('<table class="w-full text-sm text-slate-600 dark:text-slate-300 leading-none"></table>')
      table.append(`
      <thead class="text-xs uppercase bg-slate-200/75 dark:bg-slate-800">
        <tr>
          ${isTV ? `
          <th scope="col" class="px-4 py-4">Season</th>
          <th scope="col" class="px-4 py-4">Episode</th>
          `:''}
          <th scope="col" class="px-6 py-4">Language</th>
          <th scope="col" class="px-6 py-4">Quality</th>
          <th scope="col" class="px-6 py-4">Size</th>
          <th scope="col" class="px-6 py-4">Action</th>
        </tr>
      </thead>`);
      let tbody = $('<tbody class="text-center"></tbody>');
      let items = r.links;
      items.sort((a, b) => {
          if (a.s !== b.s) {
              return a.s - b.s;
          }
          if (a.e !== b.e) {
              return a.e - b.e;
          }
          if (a.lang != b.lang) {return a.lang.localeCompare(b.lang)}
          return a.res.localeCompare(b.res)
      });
      [... new Set(items.map(i=>(i.s + '').trim()))].forEach(function(i){$('#fseason').append(`<option value="${i}">${i}</option>`)});
      [... new Set(items.map(i=>i.lang.trim()))].forEach(function(i){$('#flang').append(`<option value="${i}">${i.replaceAll(',', ' &')}</option>`)});
      [... new Set(items.map(i=>i.res.trim()))].forEach(function(i){$('#fres').append(`<option value="${i}">${i}</option>`)});
	  let btn_cls = 'rounded p-1 ease-out duration-300 border bg-emerald-200/50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:bg-emerald-800/50 dark:text-emerald-400 dark:border-emerald-700/75 dark:hover:bg-emerald-400/75 dark:hover:text-white dark:hover:border-emerald-400/75';
      items.forEach(e => {
        tbody.append(`
        <tr data-id="${e.id}" class="ease-out duration-300 bg-slate-50 border-b dark:bg-slate-800/50 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 last:border-0 whitespace-nowrap">
          ${isTV ? `
          <td class="ts px-4 py-3">${e.s}</td>
          <td class="te px-4 py-3">${e.e}</td>
          `:''}
          <td class="tl px-6 py-3">${e.lang}</td>
          <td class="tr px-6 py-3">${e.res}</td>
          <td class="tsi px-6 py-3">${e.size}</td>
          <td class="ta px-6 py-3">
            ${r.locked ? `
            <a class="${btn_cls}" href="${e.url}">Unlock Link</a>
            ` : `
            <a class="${btn_cls}" target="_blank" href="${e.url}">Download</a>
            |
            <a role="button" class="${btn_cls}" onclick="playStream(this)">Watch</a>
            `}
          </td>
        </tr>`);
      });
      table.append(tbody);
	  if (!r.locked) {onlinkUnlock()}
      dl.html('').append(table).addClass('shadow border dark:border-slate-600');
      window.dispatchEvent(new Event('resize'));
    },
    error: function (e, s) {
      dl.html(err_msg('Something went Wrong')).removeAttr('class');
      window.dispatchEvent(new Event('resize'));
    }
  });
}
function playStream(elem) {
  let litem = $(elem).parent().parent();
  window.localStorage.setItem('player_pid', window.post_id);
  window.localStorage.setItem('player_tmdbid', window.mid);
  window.localStorage.setItem('player_season', litem.find('.ts').text());
  window.localStorage.setItem('player_episode', litem.find('.te').text());
  window.localStorage.setItem('player_bg', window.mbackground_url);
  window.localStorage.setItem('player_title', window.mtitle);
  window.location.href = '/p/player.html';
}
function onlinkUnlock () {
  let c = `<div class="min-h-16 rounded-lg px-3 flex gap-1 items-center bg-emerald-200 text-emerald-700 py-2 my-3 dark:bg-emerald-800 dark:text-emerald-200">
    <i class="bi bi-check text-5xl"></i> <p>Tips: Using <a class="LINKCLS" target="_blank" href="https://www.freedownloadmanager.org/download.htm">FDM</a> on PC or <a class="LINKCLS" target="_blank" href="https://play.google.com/store/apps/details?id=idm.internet.download.manager&hl=en&gl=US&pli=1">1DM</a> on Android may result in better download speed!
  </p></div>`.replaceAll('LINKCLS', 'font-medium text-emerald-800 dark:text-emerald-100 hover:underline hover:text-emerald-900 dark:hover:text-emerald-50 ease-out duration-300');
  $('#alert').html(c);
  $('#dlvlt, .faq9450').show();
}
function on_dlvlt_click () {
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  function getLinksDL () {
    let lotf = '';
    $('#dl .ta a:first-child:visible').each(function(){lotf+=$(this).attr('href')+'\r\n'});
    return lotf.trim();
  }
  const filename = `${window.mtitle} ${window.mrelease_date.split(',')[1].trim()} ${Date().normalize()}.txt`;
  const fileContent = getLinksDL();
  downloadFile(filename, fileContent);
}
