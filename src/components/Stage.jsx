import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';
import { BOX_CONFIGS, PORTFOLIO_DATA } from '../data/portfolioData';
import Box3D from './Box3D';
import Claw from './Claw';
import HomeView from '../views/HomeView';
import AboutView from '../views/AboutView';
import SkillsView from '../views/SkillsView';
import ExpView from '../views/ExpView';
import PortView from '../views/PortView';
import ContactView from '../views/ContactView';
import TeamView from '../views/TeamView';

const Stage = forwardRef(function Stage(
  {
    currentBoxIndex,
    setCurrentBoxIndex,
    filters,
    onFilterChange,
    onOpenLightbox,
    onScrollTop
  },
  ref
) {
  const stageRef = useRef(null);
  const clawRef = useRef(null);
  const prRef = useRef(null);
  const boxRefs = useRef([]);

  const [showBack, setShowBack] = useState(false);
  const [boxStatus, setBoxStatus] = useState(() =>
    BOX_CONFIGS.map(() => ({ pile: true, open: false, inside: false, gone: false }))
  );
  const boxStatusRef = useRef(
    BOX_CONFIGS.map(() => ({ pile: true, open: false, inside: false, gone: false }))
  );

  const updateBoxStatus = (updater) => {
    const next = typeof updater === 'function' ? updater(boxStatusRef.current) : updater;
    boxStatusRef.current = next;
    setBoxStatus(next);
  };

  const curRef = useRef(null);
  const busyRef = useRef(false);
  const queueRef = useRef(null);
  const insideRef = useRef(false);
  const initialTimerRef = useRef(null);
  const GRef = useRef(null);
  const boxDataRef = useRef(
    BOX_CONFIGS.map(() => ({ x: 0, top: 0, h: 0, w: 0 }))
  );

  const isReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, isReducedMotion() ? 0 : ms));

  const geo = () => {
    const st = stageRef.current;
    if (!st) return;
    const sw = st.clientWidth;
    const sh = st.clientHeight;
    const mob = sw < 768;
    const W = mob
      ? Math.min(140, sw * 0.35)
      : Math.min(250, Math.max(160, sw * 0.165));
    let k = mob ? 2.2 : 1.85;
    if (W * k > sw - 16) k = (sw - 16) / W;
    GRef.current = {
      sw,
      sh,
      W,
      H: W * (mob ? 0.7 : 0.6),
      D: W * (mob ? 0.66 : 0.62),
      k
    };
  };

  const put = (i, m, dur) => {
    const b = boxDataRef.current[i];
    const G = GRef.current;
    if (!G) return;
    const p = BOX_CONFIGS[i].pos;
    const lift = m > 0;
    const el = boxRefs.current[i];
    if (!el) return;

    let s = m ? G.k : 1;
    let x = m ? G.sw / 2 : p[0] * G.sw;
    let h = G.H * s;
    let y = m ? 120 + h / 2 : p[1] * G.sh;
    let w = G.W * s;
    let d = G.D * s;

    if (m === 2) {
      const A = G.sw - (G.sw < 768 ? 16 : 48);
      const B = G.sh - (G.sw < 768 ? 16 : 32);
      d = Math.min(200, A * 0.15);
      s = 1400 / (1400 + d / 2);
      w = A / s;
      h = B / s;
      y = G.sh / 2;
    }

    const pileZ = Math.round(p[1] * 30);
    const liftZ = m === 2 ? 85 : 65;
    el.style.setProperty('--dur', dur + 's');
    el.style.setProperty('--W', w + 'px');
    el.style.setProperty('--H', h + 'px');
    el.style.setProperty('--D', d + 'px');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.zIndex = lift ? liftZ.toString() : pileZ.toString();
    el.style.transform =
      'translate(-50%,-50%) ' +
      (m === 2
        ? 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
        : lift
        ? 'rotateX(-7deg) rotateY(-11deg) rotateZ(0deg)'
        : `rotateX(${p[2]}deg) rotateY(${p[3]}deg) rotateZ(${p[4]}deg)`);

    b.x = x;
    b.top = y - h / 2;
    b.h = h;
    b.w = w;
  };

  const claw = (x, top, w, h, dur, open) => {
    const cl = clawRef.current;
    const pr = prRef.current;
    if (!cl || !pr) return;
    cl.style.setProperty('--cd', dur + 's');
    cl.style.left = x + 'px';
    cl.style.top = top - 46 + 'px';
    pr.style.width = w * (open ? 1.3 : 1.06) + 'px';
    pr.style.setProperty('--ph', h * 0.3 + 16 + 'px');
  };

  const zoomIn = async () => {
    const i = curRef.current;
    if (i === null) return;
    insideRef.current = true;
    const st = stageRef.current;
    if (!st) return;
    st.classList.add('in-box');
    st.style.perspectiveOrigin = '50% 50%';

    boxRefs.current.forEach((el, j) => {
      if (!el) return;
      if (j !== i) {
        el.style.setProperty('--dur', '.6s');
        el.classList.add('gone');
      }
    });

    updateBoxStatus((prev) =>
      prev.map((s, idx) =>
        idx === i
          ? { ...s, inside: true, open: true, pile: false, gone: false }
          : { ...s, gone: true }
      )
    );

    const activeEl = boxRefs.current[i];
    if (activeEl) {
      activeEl.classList.add('inside');
      put(i, 2, 0.9);
    }
    const G = GRef.current;
    if (G) {
      claw(G.sw / 2, -260, G.W, G.H, 0.9, false);
    }
    setShowBack(true);
    await wait(900);
  };

  const zoomOut = async () => {
    const i = curRef.current;
    if (i === null) return;
    insideRef.current = false;
    setShowBack(false);
    const st = stageRef.current;
    if (!st) return;
    st.classList.remove('in-box');
    st.style.perspectiveOrigin = '';

    boxRefs.current.forEach((el) => {
      if (!el) return;
      el.style.setProperty('--dur', '.6s');
      el.classList.remove('gone');
    });

    updateBoxStatus((prev) =>
      prev.map((s, idx) =>
        idx === i
          ? { ...s, inside: false }
          : { ...s, gone: false }
      )
    );

    const activeEl = boxRefs.current[i];
    if (activeEl) {
      activeEl.classList.remove('inside');
      put(i, 1, 0.9);
      const b = boxDataRef.current[i];
      claw(b.x, b.top, b.w, b.h, 0.9, false);
    }
    await wait(900);
  };

  const select = async (i) => {
    if (initialTimerRef.current) {
      clearTimeout(initialTimerRef.current);
      initialTimerRef.current = null;
    }
    if (busyRef.current) {
      queueRef.current = i;
      return;
    }
    if (i === curRef.current && i !== null) return;
    busyRef.current = true;

    if (insideRef.current) {
      await zoomOut();
    }

    if (curRef.current !== null) {
      const prev = curRef.current;
      updateBoxStatus((prevStatuses) =>
        prevStatuses.map((s, idx) => (idx === prev ? { ...s, open: false } : s))
      );
      const o = boxRefs.current[prev];
      if (o) {
        o.classList.remove('open');
      }
      await wait(450);

      updateBoxStatus((prevStatuses) =>
        prevStatuses.map((s, idx) => (idx === prev ? { ...s, pile: true } : s))
      );
      if (o) {
        o.classList.add('pile');
        put(prev, 0, 0.85);
        o.style.zIndex = '60';
        const bPrev = boxDataRef.current[prev];
        claw(bPrev.x, bPrev.top, bPrev.w, bPrev.h, 0.85, false);
      }
      await wait(850);

      if (o) {
        const p = BOX_CONFIGS[prev].pos;
        o.style.zIndex = Math.round(p[1] * 30).toString();
        const bPrev = boxDataRef.current[prev];
        claw(bPrev.x, bPrev.top, bPrev.w, bPrev.h, 0.24, true);
      }
      await wait(240);
    }

    if (i === null) {
      curRef.current = null;
      setCurrentBoxIndex(null);
      const G = GRef.current;
      if (G) {
        claw(G.sw / 2, -90, G.W, G.H, 0.75, true);
      }
      await wait(750);
      busyRef.current = false;
      return;
    }

    const t = boxDataRef.current[i];
    curRef.current = i;
    setCurrentBoxIndex(i);

    claw(t.x, t.top - 130, t.w, t.h, 0.75, true);
    await wait(750);

    claw(t.x, t.top, t.w, t.h, 0.56, true);
    await wait(560);

    claw(t.x, t.top, t.w, t.h, 0.24, false);
    await wait(240);

    updateBoxStatus((prevStatuses) =>
      prevStatuses.map((s, idx) => (idx === i ? { ...s, pile: false } : s))
    );
    const targetEl = boxRefs.current[i];
    if (targetEl) {
      targetEl.classList.remove('pile');
      targetEl.style.zIndex = '65';
      put(i, 1, 0.95);
      claw(boxDataRef.current[i].x, boxDataRef.current[i].top, boxDataRef.current[i].w, boxDataRef.current[i].h, 0.95, false);
    }
    await wait(950);

    updateBoxStatus((prevStatuses) =>
      prevStatuses.map((s, idx) => (idx === i ? { ...s, open: true } : s))
    );
    if (targetEl) {
      targetEl.classList.add('open');
      targetEl.style.zIndex = '80';
    }
    await wait(750);
    await zoomIn();

    const inEl = document.getElementById('in-' + BOX_CONFIGS[i].id);
    const h2 = inEl ? inEl.querySelector('h2') : null;
    if (h2) h2.focus({ preventScroll: true });

    busyRef.current = false;
    if (queueRef.current !== null) {
      const q = queueRef.current;
      queueRef.current = null;
      select(q);
    }
  };

  const layout = () => {
    geo();
    const st = stageRef.current;
    if (!st || !GRef.current) return;
    st.style.setProperty('--dur', '0s');

    BOX_CONFIGS.forEach((b, i) => {
      const el = boxRefs.current[i];
      if (!el) return;
      el.style.transition = 'none';
      const isCur = i === curRef.current;
      const isPile = boxStatusRef.current[i]?.pile ?? true;
      put(i, isCur && !isPile ? (insideRef.current ? 2 : 1) : 0, 0);
    });

    const G = GRef.current;
    if (curRef.current === null || (boxStatusRef.current[curRef.current]?.pile ?? true)) {
      claw(G.sw / 2, -90, G.W, G.H, 0, true);
    } else if (insideRef.current) {
      claw(G.sw / 2, -260, G.W, G.H, 0, false);
    } else {
      const b = boxDataRef.current[curRef.current];
      claw(b.x, b.top, b.w, b.h, 0, false);
    }

    requestAnimationFrame(() => {
      BOX_CONFIGS.forEach((b, i) => {
        const el = boxRefs.current[i];
        if (el) el.style.transition = '';
      });
    });
  };

  useImperativeHandle(ref, () => ({
    select: (i) => select(i),
    layout: () => layout()
  }));

  useEffect(() => {
    layout();
    initialTimerRef.current = setTimeout(() => {
      initialTimerRef.current = null;
      select(0);
    }, 500);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    };
    const handleOrientation = () => {
      setTimeout(layout, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const renderViewContent = (configId) => {
    switch (configId) {
      case 'home':
        return (
          <HomeView
            onSelectBox={select}
            onSelectMember={(mId) => onFilterChange('ab', mId)}
          />
        );
      case 'about':
        return (
          <AboutView
            selectedMemberId={filters.ab}
            onSelectMember={(mId) => onFilterChange('ab', mId)}
            onSelectProject={(pId) => onFilterChange('pd', pId)}
            onSelectBox={select}
          />
        );
      case 'skills':
        return (
          <SkillsView filters={filters} onFilterChange={onFilterChange} />
        );
      case 'exp':
        return <ExpView filters={filters} onFilterChange={onFilterChange} />;
      case 'port':
        return (
          <PortView
            selectedProjectId={filters.pd}
            onSelectProject={(pId) => onFilterChange('pd', pId)}
            filters={filters}
            onFilterChange={onFilterChange}
            onOpenLightbox={onOpenLightbox}
          />
        );
      case 'contact':
        return <ContactView />;
      case 'team':
        return <TeamView onSelectBox={select} onScrollTop={onScrollTop} />;
      default:
        return null;
    }
  };

  return (
    <main id="stage" ref={stageRef} tabIndex="-1">
      <p className="meta" aria-hidden="true">
        {PORTFOLIO_DATA.team.name.toUpperCase()} · <b>7 KARDUS</b> · 2026
      </p>
      <div className="bg" aria-hidden="true">
        PORTOFOLIO
      </div>
      <div className="pill" aria-hidden="true">
        PILIH KARDUS ↓
      </div>

      <button
        className="btn"
        id="back"
        type="button"
        hidden={!showBack}
        onClick={() => select(null)}
      >
        ← Pilih kardus lain
      </button>

      {BOX_CONFIGS.map((config, index) => (
        <Box3D
          key={config.id}
          config={config}
          index={index}
          status={boxStatus[index]}
          boxRef={(el) => (boxRefs.current[index] = el)}
          onHitClick={(idx) => select(idx)}
        >
          {renderViewContent(config.id)}
        </Box3D>
      ))}

      <Claw clawRef={clawRef} prRef={prRef} />
    </main>
  );
});

export default Stage;
