/* 체크박스 상태를 브라우저에 저장 (페이지별 키) */
(function () {
  var key = 'mm-edu:' + location.pathname.split('/').pop();
  var boxes = document.querySelectorAll('.check input[type=checkbox]');
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}

  boxes.forEach(function (b, i) {
    var id = b.dataset.k || ('c' + i);
    b.dataset.k = id;
    if (saved[id]) b.checked = true;
    b.addEventListener('change', function () {
      saved[id] = b.checked;
      try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {}
      count();
    });
  });

  function count() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var scope = document.querySelector(el.dataset.count);
      if (!scope) return;
      var all = scope.querySelectorAll('input[type=checkbox]');
      var done = scope.querySelectorAll('input[type=checkbox]:checked');
      el.textContent = done.length + ' / ' + all.length;
    });
  }
  count();

  document.querySelectorAll('[data-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      boxes.forEach(function (b) { b.checked = false; });
      try { localStorage.removeItem(key); } catch (e) {}
      count();
    });
  });
})();
