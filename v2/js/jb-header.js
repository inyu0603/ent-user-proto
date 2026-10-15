/* ================================================================
   잡아바 공통 헤더 (기업회원 로그인 후)
   - 출처 : 03_화면설계/design (디자인 정본) — 2026-10-01 이식
       · 마크업 = design/biz-home.html <header class="jb-header"> 원문
         (정본 화면 링크는 ../../03_화면설계/design/ 로 보정 · 유틸 우측은 기업회원 상태로 교체)
       · 드로어 = design/js/main.js 「4. 드로어 아코디언」·「5. 전체메뉴 드로어」 원문
   - 스타일 : css/jb-header.css
   - 정본이 바뀌면 이 파일을 다시 추출한다(직접 수정 금지).
   ================================================================ */
(function(){
  "use strict";

  var HEADER_HTML = "<header class=\"jb-header\">\n  <div class=\"jb-header__util\">\n    <div class=\"jb-container\">\n      <ul class=\"jb-utilbtns\">\n        <li><a class=\"jb-utilbtn jb-utilbtn--lms\" href=\"#\" data-dev-href=\"https://lms.gg.go.kr/home.do\">러닝센터</a></li>\n        <li><a class=\"jb-utilbtn jb-utilbtn--apply\" href=\"#\" data-dev-href=\"https://apply.jobaba.net/bsns/bsnsListView.do\">잡아바 어플라이</a></li>\n        <li><a class=\"jb-utilbtn jb-utilbtn--map\" href=\"#\" data-dev-href=\"/map.do?ref=JOBABA\" data-dev-onclick=\"fn_OpenJobMap(event)\">일자리맵</a></li>\n        <li><a class=\"jb-utilbtn jb-utilbtn--biz\" href=\"../../03_화면설계/design/biz-home.html\" data-dev-todo=\"기업서비스 신설 — 운영 대응 URL·전용 색상 미정\">기업서비스</a></li>\n      </ul>\n      <!-- 기업회원 로그인 후 (운영 <c:otherwise>) : 기업 마이페이지 onMyPage2() · 로그아웃 goGjfLogout()\n           PL 2026-09-28 — 회원명(잡아바기업)·「기업정보」는 표시하지 않는다 -->\n      <ul class=\"jb-utillinks\" data-auth=\"biz-member\">\n        <li><a href=\"bzm-recruit-list.html\" data-dev-onclick=\"onMyPage2()\">기업 마이페이지</a></li>\n        <li><a href=\"#\" data-dev-onclick=\"goGjfLogout()\" data-toast=\"로그아웃합니다. (기업 비로그인 홈으로 이동)\">로그아웃</a></li>\n        <li><a href=\"#\" data-dev-href=\"/hpdsk/qna/list.do\">고객센터</a></li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"jb-container jb-header__main\">\n    <a class=\"jb-logo\" href=\"../../03_화면설계/design/main.html\"><img src=\"assets/img/logo/main_header_logo_20260629.png\" alt=\"경기도일자리포털 잡아바\"></a>\n      <nav class=\"jb-gnb\" aria-label=\"주메뉴\">\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"../../03_화면설계/design/job-public-list.html\" data-dev-href=\"/pblcEmpmn/list.do\">일자리 찾기</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"일자리 찾기 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/job-public-list.html\" data-dev-href=\"/pblcEmpmn/list.do\">공공채용</a>\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/job-corp-list.html\" data-dev-href=\"/empmn/enterpriseEmployListNew.do\">기업채용</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/entCntnts/exhb/exhbListNew.do\">온라인 채용관</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/cntn/covJobInfoCntr.do\">테마채용관</a>\n          </div>\n        </div>\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"../../03_화면설계/design/sprt-job-list.html\" data-dev-href=\"/jobSprt/list.do\">정책·지원 찾기</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"정책·지원 찾기 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/sprt-job-list.html\" data-dev-href=\"/jobSprt/list.do\">일자리 지원정책</a>\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/sprt-ent-list.html\" data-dev-href=\"/entSprt/list.do\">기업 지원정책</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/thema/themeInfo.do\">정책활용꿀팁</a>\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/sprt-prep-list.html\" data-dev-href=\"/empmEdu/list.do\">취업지원 정책</a>\n          </div>\n        </div>\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"#\" data-dev-href=\"https://apply.jobaba.net/bsns/bsnsListView.do\">신청·접수</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"신청·접수 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"https://apply.jobaba.net/bsns/bsnsListView.do\">지원사업</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-todo=\"신설 — 운영 대응 URL 없음\">기간제 채용관</a>\n          </div>\n        </div>\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"#\" data-dev-href=\"/prepHub/main.do\">취업 준비·역량강화</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"취업 준비·역량강화 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/jobDiagnose/diagnoseView.do\">취업진단</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/introduction/mainList.do\">자소서첨삭</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/interview/mainList.do\">AI 역량검사</a>\n            <a class=\"jb-gnb__sub-item jb-gnb__sub-item--feature\" href=\"#\" data-dev-href=\"${lmsDomainUrl}/gjf/service/hr/open_class.do?codes=017,018,019,020&amp;mid=1867\" target=\"_blank\" rel=\"noopener\" title=\"동영상강의 — 러닝센터 (새 창)\">동영상강의<i class=\"jb-ico jb-ico--external\" aria-hidden=\"true\"></i></a><!-- D76 강조 · 정본 반영(2026-09-18 D122) -->\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/thema/list.do\">잡학사전</a>\n          </div>\n        </div>\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"../../03_화면설계/design/target-hub.html\" data-dev-href=\"/trgtHub/main.do\">대상별 서비스</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"대상별 서비스 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/target-hub.html\" data-dev-href=\"/trgtHub/main.do?tab=youth\">청년</a>\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/target-hub.html\" data-dev-href=\"/trgtHub/main.do?tab=senior\">중장년</a>\n            <a class=\"jb-gnb__sub-item\" href=\"../../03_화면설계/design/target-hub.html\" data-dev-href=\"/trgtHub/main.do?tab=disabled\">장애인</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"https://www.dream.go.kr/dream/index.do\" target=\"_blank\" rel=\"noopener\">여성(꿈날개)<i class=\"jb-ico jb-ico--external\" aria-hidden=\"true\"></i></a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"https://job.gg.go.kr/global/main.do\" target=\"_blank\" rel=\"noopener\">외국인포털<i class=\"jb-ico jb-ico--external\" aria-hidden=\"true\"></i></a>\n          </div>\n        </div>\n        <div class=\"jb-gnb__unit\">\n          <a class=\"jb-gnb__item\" href=\"#\" data-dev-href=\"/hpdsk/ntc/list.do\">고객지원</a>\n          <div class=\"jb-gnb__sub\" role=\"group\" aria-label=\"고객지원 하위메뉴\">\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/hpdsk/ntc/list.do\">공지사항</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/hpdsk/qna/list.do\">Q&amp;A</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/hpdsk/faq/list.do\">FAQ</a>\n            <a class=\"jb-gnb__sub-item\" href=\"#\" data-dev-href=\"/event/list.do\">이벤트</a>\n          </div>\n        </div>\n      </nav>\n    <button class=\"jb-search-btn\" type=\"button\" aria-label=\"통합검색\" data-toast=\"통합검색 레이어를 엽니다.\"><img class=\"jb-i\" src=\"assets/img/icon/ui/search.svg\" alt=\"\"></button>\n    <button class=\"jb-menu-btn\" type=\"button\" data-drawer-toggle aria-controls=\"jb-drawer\" aria-expanded=\"false\" aria-label=\"전체 메뉴 열기\"><span></span><span></span><span></span></button>\n  </div>\n</header>";

  /* ── 5-1. 드로어 아코디언 + 현재 위치 표시 ──────────────────────
     · 상위 메뉴는 [링크 + 토글버튼] 로 분리한다(운영 .menu-title > a + span.arrow 와 동일 구조).
     · 현재 페이지에 해당하는 항목만 aria-current="page" 를 받고, 그 대메뉴만 펼친 채로 연다.
     · 판별 기준은 data-dev-href(운영 경로) → href 순. 절대경로는 pathname 전체,
       상대경로(정적 프로토타입)는 파일명으로 비교한다. */
  function setupDrawerAccordion(nav){
    var here = window.location.pathname;
    var hereFile = here.substring(here.lastIndexOf("/") + 1);

    function target(a){
      var h = a.getAttribute("data-dev-href") || a.getAttribute("href") || "";
      if(!h || h === "#") return "";
      h = h.split("?")[0].split("#")[0].replace(/^https?:\/\/[^/]+/, "");
      return h;
    }
    function isCurrent(a){
      var h = target(a);
      if(!h) return false;
      return h.charAt(0) === "/" ? h === here : h === hereFile;
    }

    var units = [].slice.call(nav.querySelectorAll(".jb-gnb__unit"));
    var opened = null;

    units.forEach(function(unit, index){
      var item = unit.querySelector(".jb-gnb__item");
      var sub = unit.querySelector(".jb-gnb__sub");
      if(!item) return;

      /* 상위 = 링크 / 토글 = 별도 버튼 */
      var title = document.createElement("div");
      title.className = "jb-drawer__title";
      unit.insertBefore(title, item);
      title.appendChild(item);

      if(!sub){ unit.classList.add("is-leaf"); return; }

      var id = "jb-drawer-sub-" + (index + 1);
      sub.id = id;
      sub.hidden = true;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "jb-drawer__arrow";
      btn.setAttribute("data-acc-toggle", "");
      btn.setAttribute("aria-controls", id);
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", item.textContent.trim() + " 하위메뉴 열기");
      title.appendChild(btn);

      /* 현재 위치 : 상위 자신 또는 하위 중 하나가 현재 페이지 */
      var currentSub = [].slice.call(sub.querySelectorAll(".jb-gnb__sub-item")).filter(isCurrent)[0];
      if(currentSub) currentSub.setAttribute("aria-current", "page");
      if(isCurrent(item)) item.setAttribute("aria-current", "page");
      if(currentSub || isCurrent(item)) opened = unit;

      btn.addEventListener("click", function(){
        setOpen(unit, sub.hidden);
      });
    });

    function setOpen(unit, open){
      units.forEach(function(other){
        var osub = other.querySelector(".jb-gnb__sub");
        var obtn = other.querySelector(".jb-drawer__arrow");
        if(!osub || !obtn) return;
        var on = (other === unit) && open;   /* 한 번에 하나만 펼친다 */
        osub.hidden = !on;
        obtn.setAttribute("aria-expanded", on ? "true" : "false");
        obtn.setAttribute("aria-label", other.querySelector(".jb-gnb__item").textContent.trim() + " 하위메뉴 " + (on ? "닫기" : "열기"));
        other.classList.toggle("is-open", on);
      });
    }

    if(opened){
      opened.classList.add("is-current");
      setOpen(opened, true);
    }
  }


  /* ── 5. 전체메뉴 드로어 (1260 이하) ──────────────────────────────
     헤더의 GNB·유틸을 복제해 우측 드로어를 만든다. 운영은 .h_mobile 별도 마크업이므로
     이관 시에는 이 복제 대신 JSP 의 모바일 메뉴 마크업을 쓴다. */
  function setupDrawer(){
    var toggle = document.querySelector("[data-drawer-toggle]");
    var gnb = document.querySelector(".jb-header__main .jb-gnb");
    if(!toggle || !gnb || document.getElementById("jb-drawer")) return;

    var drawer = document.createElement("div");
    drawer.className = "jb-drawer";
    drawer.id = "jb-drawer";
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="jb-drawer__backdrop" data-drawer-close></div>'+
      '<div class="jb-drawer__panel" role="dialog" aria-modal="true" aria-label="전체 메뉴" tabindex="-1">'+
        '<div class="jb-drawer__head">'+
          '<span class="jb-drawer__logo"><img src="assets/img/logo/logo-jobaba.svg" alt="경기도일자리포털 잡아바"></span>'+
          '<button class="jb-drawer__close" type="button" data-drawer-close aria-label="전체 메뉴 닫기"></button>'+
        '</div>'+
        '<div class="jb-drawer__account"></div>'+   /* 타이틀 아래 : 로그인 링크 + 통합검색 (운영 .h_mobile_login_area + .h_mobile_search_area) */
        '<div class="jb-drawer__body"></div>'+
        '<div class="jb-drawer__quick"></div>'+     /* 맨 아래 : 관련 서비스 pill (운영 .h_mobile_bottom_area) */
      '</div>';

    var navClone = gnb.cloneNode(true);
    navClone.setAttribute("aria-label", "모바일 전체 메뉴");
    drawer.querySelector(".jb-drawer__body").appendChild(navClone);

    var btns = document.querySelector(".jb-header__util .jb-utilbtns");
    if(btns) drawer.querySelector(".jb-drawer__quick").appendChild(btns.cloneNode(true));
    /* 로그인 전/후 두 벌을 모두 복제한다 — [data-auth] 가 남아 있어 상태 전환 시 함께 토글된다.
       운영 .h_mobile_login_area 와 동일하게 로그인 관련 항목만 남긴다.
         · 사용자 이름(김청년님)은 모바일 미노출
         · 고객센터는 GNB '고객지원' 으로 접근하므로 제외 */
    [].forEach.call(document.querySelectorAll(".jb-header__util .jb-utillinks"), function(links){
      var linkClone = links.cloneNode(true);
      [].forEach.call(linkClone.querySelectorAll("li"), function(li){
        var a = li.querySelector("a");
        var drop = li.classList.contains("jb-utillinks__me") ||
                   (a && (a.getAttribute("data-dev-href") || "").indexOf("/hpdsk/qna/") === 0);
        if(drop) li.parentNode.removeChild(li);
      });
      drawer.querySelector(".jb-drawer__account").appendChild(linkClone);
    });
    /* 통합검색 — 운영 .h_mobile_search_area 상속 :
       form[action=/search/search.do][method=post] · button onclick=fn_TopSearch('M') · CSRFToken hidden */
    drawer.querySelector(".jb-drawer__account").insertAdjacentHTML("beforeend",
      '<div class="jb-drawer__search">'+
        '<form role="search" data-dev-action="/search/search.do" data-dev-method="post" onsubmit="return false;">'+
          '<label class="jb-sr-only" for="jb-drawer-search">통합검색</label>'+
          '<input id="jb-drawer-search" type="search" name="mobileTopSearch" placeholder="검색어를 입력하세요." autocomplete="off">'+
          '<button type="submit" aria-label="검색" data-dev-onclick="fn_TopSearch(\'M\')">'+
            '<img class="jb-i" src="assets/img/icon/ui/search.svg" alt="">'+
          '</button>'+
        '</form>'+
      '</div>');

    setupDrawerAccordion(navClone);

    document.body.appendChild(drawer);
    var panel = drawer.querySelector(".jb-drawer__panel");
    var returnFocus = null;

    function open(){
      returnFocus = document.activeElement;
      drawer.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "전체 메뉴 닫기");
      document.body.classList.add("is-drawer-open");
      panel.focus();
    }
    function close(){
      if(drawer.hidden) return;
      drawer.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "전체 메뉴 열기");
      document.body.classList.remove("is-drawer-open");
      if(returnFocus && document.contains(returnFocus)) returnFocus.focus();
      returnFocus = null;
    }

    toggle.addEventListener("click", function(){ if(drawer.hidden) open(); else close(); });
    drawer.addEventListener("click", function(event){
      if(event.target.closest("[data-acc-toggle]")) return;   /* 아코디언 토글은 닫지 않는다 */
      if(event.target.closest("[data-drawer-close]") || event.target.closest("a[href]")) close();
    });
  

  document.addEventListener("keydown", function(event){
      if(!drawer.hidden && event.key === "Escape") close();
    });
    /* 데스크톱 폭으로 돌아가면 닫는다 (운영 전환점 1260) */
    window.addEventListener("resize", function(){
      if(window.innerWidth > 1260) close();
    });
  }


  /* 마운트 : <div id="site-header"></div> 자리에 헤더를 넣고 드로어를 만든다 */
  document.addEventListener("DOMContentLoaded", function(){
    var mount = document.getElementById("site-header");
    if(!mount) return;
    var t = document.createElement("template");
    t.innerHTML = HEADER_HTML.trim();
    mount.replaceWith(t.content.firstChild);
    setupDrawer();
  });
})();
