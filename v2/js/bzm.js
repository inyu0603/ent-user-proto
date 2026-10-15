/* ================================================================
   05_기업서비스 프로토타입 공통 스크립트 (Vanilla JS · 서버 통신 없음)
   - ① 프로토바 + 기능정의 패널 (검토용 도구, 실서비스 UI 아님)
   - ② 사이트 푸터 렌더 (body[data-user="biz-member"] 일 때 · 상단 헤더는 jb-header.js)
   - ③ 검토용 인터랙션 : 모달 · 탭 · 토스트 · 확인창 · 관심 표시 · 필수값 검증 · 수정 모드
   - 실제 저장·조회는 하지 않는다(화면 흐름 시연용).
   ================================================================ */
(function(){
  "use strict";

  var STATE_LABEL = { "biz-member":"기업회원 로그인 후", "admin":"관리자(재단)", "common":"공통 안내" };

  function pageKey(){
    var f = location.pathname.split("/").pop() || "index.html";
    return f.replace(/\.html$/,"");
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  /* ---------- 토스트 ---------- */
  function toast(msg){
    var t = document.querySelector(".toast");
    if(!t){ t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); t.setAttribute("aria-live","polite"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("is-on"); }, 2200);
  }
  window.bzmToast = toast;

  /* ---------- ① 프로토바 + 기능정의 패널 ---------- */
  function renderProtobar(){
    var user = document.body.getAttribute("data-user") || "common";
    var bar = document.createElement("div");
    bar.className = "protobar";
    bar.innerHTML =
      '<span class="protobar__tag">PROTOTYPE</span>' +
      '<span class="protobar__state">' + esc(STATE_LABEL[user] || "") + '</span>' +
      '<span class="protobar__act">' +
        (pageKey() !== "index" ? '<a class="protobar__btn" href="index.html"><i data-lucide="layout-list"></i>화면 목록</a>' : '') +
        (window.BZM_FEATURES && window.BZM_FEATURES[pageKey()] ? '<button type="button" class="protobar__btn" data-fdef-open><i data-lucide="file-text"></i>기능정의</button>' : '') +
      '</span>';
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function renderFdef(){
    var d = window.BZM_FEATURES && window.BZM_FEATURES[pageKey()];
    if(!d) return;
    var user = document.body.getAttribute("data-user");
    var st = d.states && d.states[user];
    var feats = (d.features || []).map(function(f){ return '<li><b>' + esc(f[0]) + '</b>' + esc(f[1]) + '</li>'; }).join("");
    var review = (d.review || []).map(function(r){ return '<li>' + esc(r) + '</li>'; }).join("");
    var wrap = document.createElement("div");
    wrap.className = "fdef"; wrap.id = "fdef";
    wrap.innerHTML =
      '<div class="fdef__dim" data-fdef-close></div>' +
      '<aside class="fdef__panel" role="dialog" aria-modal="true" aria-labelledby="fdef-t">' +
        '<div class="fdef__head"><div><p class="xsmall muted">' + esc(d.status || "") + '</p><h2 id="fdef-t">' + esc(d.title) + '</h2></div>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-fdef-close aria-label="닫기"><i data-lucide="x"></i></button></div>' +
        '<div class="fdef__sec"><h3>화면 목적</h3><p class="small">' + esc(d.purpose) + '</p></div>' +
        (st ? '<div class="fdef__sec"><h3>' + esc(STATE_LABEL[user] || "") + '</h3><div class="fdef__box"><p>' + esc(st.description) + '</p><p class="muted" style="margin-top:6px">' + esc(st.comparison) + '</p></div></div>' : '') +
        '<div class="fdef__sec"><h3>기능</h3><ul class="fdef__list">' + feats + '</ul></div>' +
        (review ? '<div class="fdef__sec"><h3>검토 · 미결</h3><ul class="fdef__list">' + review + '</ul></div>' : '') +
      '</aside>';
    document.body.appendChild(wrap);
  }

  /* ---------- ② 사이트 푸터 (헤더는 jb-header.js — 디자인 정본 이식) ---------- */
  function renderSite(){
    if(document.body.getAttribute("data-user") !== "biz-member") return;
    var f = document.getElementById("site-footer");
    if(f){
      f.innerHTML = '<footer class="site-foot"><div class="container">경기도일자리재단 · 잡아바</div></footer>';
    }
  }

  /* ---------- 모달 ---------- */
  var lastFocus = null;
  function openModal(id){
    var m = document.getElementById(id); if(!m) return;
    document.querySelectorAll(".modal.is-open").forEach(function(o){ o.classList.remove("is-open"); o.setAttribute("aria-hidden","true"); });
    lastFocus = document.activeElement;
    m.classList.add("is-open"); m.setAttribute("aria-hidden","false");
    var f = m.querySelector("textarea, input, select, button"); if(f) f.focus();
  }
  function closeModals(){
    document.querySelectorAll(".modal.is-open").forEach(function(m){ m.classList.remove("is-open"); m.setAttribute("aria-hidden","true"); });
    var fd = document.getElementById("fdef"); if(fd) fd.classList.remove("is-open");
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
  window.bzmCloseModals = closeModals;

  /* ---------- ③ 인터랙션 위임 ---------- */
  document.addEventListener("click", function(e){
    var t = e.target;

    if(t.closest("[data-fdef-open]")){ lastFocus = t.closest("button"); var fd = document.getElementById("fdef"); fd.classList.add("is-open"); fd.querySelector("[data-fdef-close].btn").focus(); return; }
    if(t.closest("[data-fdef-close]")){ closeModals(); return; }

    var mo = t.closest("[data-modal-open]");
    if(mo){ e.preventDefault(); openModal(mo.getAttribute("data-modal-open")); return; }
    if(t.closest("[data-modal-close]") && !t.closest("[data-confirm],[data-toast]")){ closeModals(); return; }
    if(t.classList && t.classList.contains("modal")){ closeModals(); return; }

    // 탭 : [data-show="패널id"] — 같은 .tabs 안에서 하나만 선택
    var tab = t.closest("[data-show]");
    if(tab){
      var group = tab.closest(".tabs");
      group.querySelectorAll("[data-show]").forEach(function(b){
        var on = b === tab;
        b.setAttribute("aria-selected", on ? "true" : "false");
        var p = document.getElementById(b.getAttribute("data-show")); if(p) p.hidden = !on;
      });
      return;
    }

    // 선택 칩 토글 (복지 키워드 등)
    var chip = t.closest("[data-chip]");
    if(chip){ chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true"); return; }

    // 항목 삭제 : data-remove="(상위 선택자)" — 값 없으면 자기 자신
    var rm = t.closest("[data-remove]");
    if(rm){
      var sel = rm.getAttribute("data-remove"); var target = sel ? rm.closest(sel) : rm;
      var qaList = target && target.closest(".qa");
      if(target) target.remove();
      if(qaList) renumberQa(qaList);
      return;
    }

    // 사전질문 추가 (FR-BZM-U12)
    var qa = t.closest("[data-qa-add]");
    if(qa){
      var list = document.getElementById(qa.getAttribute("data-qa-add"));
      var n = list.children.length + 1;
      var item = document.createElement("div");
      item.className = "qa__item";
      item.innerHTML =
        '<span class="qa__no">' + n + '</span>' +
        '<input class="input qa__q" name="bfQstn" placeholder="질문을 입력하세요" aria-label="사전질문 ' + n + ' 내용">' +
        '<span class="qa__len">' +
          '<input class="input input--auto" type="number" name="lttrLimitBgn" min="0" value="0" aria-label="사전질문 ' + n + ' 최소 글자수"> ~ ' +
          '<input class="input input--auto" type="number" name="lttrLimitEnd" min="1" value="500" aria-label="사전질문 ' + n + ' 최대 글자수"> 자' +
        '</span>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-remove=".qa__item">삭제</button>' +
        '<p class="qa__err"><i data-lucide="circle-alert"></i><span></span></p>';
      list.appendChild(item);
      if(window.lucide) window.lucide.createIcons();
      item.querySelector(".qa__q").focus();
      return;
    }

    // 관심 표시 토글 (FR-BZM-U17)
    var star = t.closest(".star");
    if(star){
      var on = star.getAttribute("aria-pressed") !== "true";
      star.setAttribute("aria-pressed", on ? "true" : "false");
      star.setAttribute("aria-label", on ? "관심 표시됨" : "관심 표시");
      toast(on ? "관심 지원자로 표시했습니다." : "관심 표시를 해제했습니다.");
      return;
    }

    // 토글 스위치 (확인창 포함 가능)
    var tg = t.closest(".toggle");
    if(tg && !tg.disabled){
      var msg = tg.getAttribute(tg.getAttribute("aria-checked") === "true" ? "data-confirm-off" : "data-confirm-on");
      if(msg && !window.confirm(msg)) return;
      tg.setAttribute("aria-checked", tg.getAttribute("aria-checked") === "true" ? "false" : "true");
      toast("변경했습니다.");
      return;
    }

    // 확인창 후 토스트 : data-confirm="질문" data-done="완료 메시지" data-go="이동"
    var cf = t.closest("[data-confirm]");
    if(cf){
      e.preventDefault();
      if(window.confirm(cf.getAttribute("data-confirm"))){
        if(cf.hasAttribute("data-modal-close")) closeModals();
        var done = cf.getAttribute("data-done"); if(done) toast(done);
        var go = cf.getAttribute("data-go"); if(go) setTimeout(function(){ location.href = go; }, 700);
      }
      return;
    }

    // 단순 토스트 : data-toast
    var ts = t.closest("[data-toast]");
    if(ts){ e.preventDefault(); if(ts.hasAttribute("data-modal-close")) closeModals(); toast(ts.getAttribute("data-toast")); }
  });

  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeModals(); });

  // 필수값 검증 시연 (FR-BZM-U09) — form[data-validate] 안의 .frow[data-required]
  document.addEventListener("submit", function(e){
    var form = e.target;
    if(form.hasAttribute("data-toast-submit")){ e.preventDefault(); toast(form.getAttribute("data-toast-submit")); return; }
    if(!form.hasAttribute("data-validate")) return;
    e.preventDefault();
    var first = null;
    form.querySelectorAll(".frow[data-required]").forEach(function(row){
      var empty = false;
      row.querySelectorAll("input:not([type=checkbox]):not([type=radio]):not([data-optional]), select, textarea").forEach(function(c){
        if(!String(c.value || "").trim()) empty = true;
      });
      if(row.querySelector("[data-chips]") && !row.querySelector("[data-chips] .chip")) empty = true;
      row.classList.toggle("is-invalid", empty);
      if(empty && !first) first = row;
    });
    // 사전질문 (FR-BZM-U12) : 질문이 있으면 글자수 필수 · 최소 ≤ 최대 · 최대 1 이상
    form.querySelectorAll(".qa__item").forEach(function(item){
      var q = item.querySelector("[name=bfQstn]"), mn = item.querySelector("[name=lttrLimitBgn]"), mx = item.querySelector("[name=lttrLimitEnd]");
      var msg = "";
      var hasQ = q && q.value.trim();
      if(hasQ){
        var a = parseInt(mn.value, 10), b = parseInt(mx.value, 10);
        if(isNaN(a) || isNaN(b)) msg = "답변 최소·최대 글자수를 입력해주세요.";
        else if(a < 0 || b < 1) msg = "글자수는 최소 0자, 최대 1자 이상이어야 합니다.";
        else if(a > b) msg = "최소 글자수가 최대 글자수보다 클 수 없습니다.";
      } else {
        msg = "질문을 입력하거나 이 문항을 삭제해주세요.";   // 사전질문이 필요 없으면 문항을 모두 삭제한다
      }
      item.classList.toggle("is-invalid", !!msg);
      item.querySelector(".qa__err span").textContent = msg;
      if(msg && !first) first = item;
    });

    // 접수기간 : 상시채용이 아니면 종료일 ≥ 시작일
    var bg = form.querySelector("[name=rqtBgnDe]"), ed = form.querySelector("[name=rqtEndDe]");
    if(bg && ed && bg.value && ed.value && ed.value < bg.value){
      var r = ed.closest(".frow"); r.classList.add("is-invalid");
      r.querySelector(".ferr span").textContent = "접수기간 종료일자가 시작일자보다 빠를 수 없습니다.";
      if(!first) first = r;
    }
    if(first){
      first.scrollIntoView({block:"center"});
      var fc = first.querySelector("input,select,textarea,button"); if(fc) fc.focus();
      toast("필수 항목을 확인해 주세요.");
      return;
    }
    var msg = form.getAttribute("data-confirm-save");
    if(msg && !window.confirm(msg)) return;
    toast(form.getAttribute("data-done") || "저장되었습니다.");
    var go = form.getAttribute("data-go"); if(go) setTimeout(function(){ location.href = go; }, 900);
  });

  // 입력 시 오류 해제
  document.addEventListener("input", function(e){
    var row = e.target.closest && e.target.closest(".frow.is-invalid");
    if(row && String(e.target.value || "").trim()) row.classList.remove("is-invalid");
    var qi = e.target.closest && e.target.closest(".qa__item.is-invalid");
    if(qi) qi.classList.remove("is-invalid");
  });

  /* 사전질문 문항 번호·라벨 다시 매기기 (삭제 후) */
  function renumberQa(list){
    [].forEach.call(list.querySelectorAll(".qa__item"), function(item, i){
      var n = i + 1;
      item.querySelector(".qa__no").textContent = n;
      item.querySelector("[name=bfQstn]").setAttribute("aria-label", "사전질문 " + n + " 내용");
      item.querySelector("[name=lttrLimitBgn]").setAttribute("aria-label", "사전질문 " + n + " 최소 글자수");
      item.querySelector("[name=lttrLimitEnd]").setAttribute("aria-label", "사전질문 " + n + " 최대 글자수");
    });
  }

  /* ---------- 초기화 ---------- */
  document.addEventListener("DOMContentLoaded", function(){
    renderSite();
    renderProtobar();
    renderFdef();
    // 수정 모드 (?mode=edit) — FR-BZM-U11
    var edit = new URLSearchParams(location.search).get("mode") === "edit";
    document.querySelectorAll("[data-mode]").forEach(function(el){
      el.hidden = (el.getAttribute("data-mode") === "edit") ? !edit : edit;
    });
    document.body.classList.toggle("is-edit", edit);
    if(window.lucide) window.lucide.createIcons();
  });
})();
