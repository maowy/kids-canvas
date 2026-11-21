// 小画家 · 独立网页版（iPad / 浏览器）
// 画布引擎与面板 UI 从 DSH 插件版移植；只把宿主外壳换成普通网页。
(function () {
  const React = window.React
  const ReactDOM = window.ReactDOM
  const h = React.createElement
    const { useRef, useState, useEffect } = React

    const NS = 'kids-canvas'
    const PANEL = 'kids-canvas'
    const STORE = 'dsh-kids-canvas:v1'
    const MUTE_STORE = 'dsh-kids-canvas:muted'

    // ---------------- 文案 ----------------
    const ZH = {
      title: '小画家',
      modesLabel: '玩法',
      modeDraw: '画画',
      modeMagic: '魔法',
      modeGame: '抓星星',
      undo: '撤销',
      clear: '清空画布',
      hintNothingUndo: '还没有可以撤销的哦，先画一笔吧',
      newCanvas: '新建',
      hintNew: '新的一张，开始画吧！刚才那张按撤销还能找回来',
      hintNewEmpty: '已经是新的一张啦，开始画吧',
      soundOn: '关闭声音',
      soundOff: '打开声音',
      save: '保存图画',
      colorsLabel: '颜色',
      rainbow: '彩虹笔',
      colorRed: '红色', colorOrange: '橙色', colorYellow: '黄色', colorGreen: '绿色',
      colorTeal: '青色', colorBlue: '蓝色', colorPurple: '紫色', colorPink: '粉色', colorBrown: '棕色',
      brushLabel: '画笔粗细',
      sizeSmall: '细笔', sizeMedium: '中笔', sizeBig: '粗笔',
      eraser: '橡皮',
      eraserGroup: '橡皮',
      eraserTip: '橡皮：碰到哪一笔就整笔擦掉',
      fineEraser: '细擦',
      fineEraserTip: '精细橡皮：只擦掉碰到的一小段',
      hintFineErase: '细擦来了：只擦掉碰到的一小段，慢慢擦～',
      stampsLabel: '贴纸',
      toolsLabel: '画笔、橡皮、贴纸和写字',
      scenesLabel: '背景',
      sceneSpace: '外太空',
      sceneOcean: '海底世界',
      sceneMeadow: '草地',
      sceneAurora: '极光雪地',
      sceneCandy: '糖果天空',
      sceneMonster: '怪物乐园',
      scenePaper: '白纸',
      bgPink: '粉色', bgPeach: '杏色', bgLemon: '柠檬黄', bgMint: '薄荷绿',
      bgSky: '天蓝', bgLilac: '薰衣草', bgWhite: '白色', bgBoard: '黑板',
      loupe: '放大镜',
      zoomIn: '放大一点',
      zoomOut: '缩小一点',
      closeLoupe: '收起放大镜',
      hintLoupe: '放大镜来啦：移动手指看细节，用 ＋ − 调大小',
      stampStar: '星星', stampHeart: '爱心', stampFlower: '小花',
      stampRocket: '火箭', stampSun: '太阳', stampMoon: '月亮',
      stampDino: '恐龙', stampIceCream: '冰淇淋', stampRainbow: '彩虹',
      stampFlag: '国旗', stampMilkshake: '奶昔', stampBurger: '汉堡',
      stampCake: '蛋糕', stampDonut: '甜甜圈', stampBalloon: '气球',
      stickerSize: '贴纸大小',
      stampSizeSmall: '小', stampSizeMedium: '中', stampSizeLarge: '大',
      adjust: '调整',
      hintAdjust: '调整贴纸：按住贴纸可以拖，下面选「小 / 中 / 大」改大小',
      textTool: '写字',
      hintText: '写字：点一下画布，输入文字，按回车或 ✓ 贴上去',
      textPlaceholder: '输入文字…',
      textDone: '贴上去',
      cancel: '取消',
      stampButterfly: '蝴蝶', stampFish: '小鱼', stampCat: '小猫',
      canvasLabel: '画布：用手指或鼠标画画，点按钮切换玩法',
      gameScore: '颗星星',
      hintStart: '你好呀！用小手画点什么吧～',
      hintWelcomeBack: '你的画还在呢！点上面的「魔法」让它们动起来',
      hintDrawn: '画得真好！点「魔法」试试，它们会动哦',
      hintMagic: '点一点画里的东西，它们会跳舞哦！',
      hintGame: '抓星星！点一下飞到亮亮的星星',
      hintClear: '画都飞走啦，点「撤销」还能找回来',
      hintSaved: '画保存好啦，去下载里看看！',
      hintSaveFail: '保存没成功，再点一次试试',
      hintSticker: '贴纸贴好啦！点「魔法」让它飞起来',
      hintErase: '擦掉啦',
      hintCelebrate: '太厉害了！收集了 {n} 颗星星',
    }
    const EN = {
      title: 'Little painter',
      modesLabel: 'Play modes',
      modeDraw: 'Draw',
      modeMagic: 'Magic',
      modeGame: 'Stars',
      undo: 'Undo',
      clear: 'Clear canvas',
      hintNothingUndo: 'Nothing to undo yet — draw something first',
      newCanvas: 'New',
      hintNew: 'Fresh page! The last one can still come back with Undo',
      hintNewEmpty: 'This is already a fresh page — start drawing',
      soundOn: 'Mute sound',
      soundOff: 'Unmute sound',
      save: 'Save picture',
      colorsLabel: 'Colors',
      rainbow: 'Rainbow crayon',
      colorRed: 'Red', colorOrange: 'Orange', colorYellow: 'Yellow', colorGreen: 'Green',
      colorTeal: 'Teal', colorBlue: 'Blue', colorPurple: 'Purple', colorPink: 'Pink', colorBrown: 'Brown',
      brushLabel: 'Brush size',
      sizeSmall: 'Thin', sizeMedium: 'Medium', sizeBig: 'Thick',
      eraser: 'Eraser',
      eraserGroup: 'Erasers',
      eraserTip: 'Eraser: removes the whole stroke it touches',
      fineEraser: 'Fine',
      fineEraserTip: 'Fine eraser: rubs away only the part it touches',
      hintFineErase: 'Fine eraser: it only rubs away the bit you touch',
      stampsLabel: 'Stickers',
      toolsLabel: 'Brushes, erasers, stickers and text',
      scenesLabel: 'Background',
      sceneSpace: 'Outer space',
      sceneOcean: 'Under the sea',
      sceneMeadow: 'Meadow',
      sceneAurora: 'Aurora snow',
      sceneCandy: 'Candy sky',
      sceneMonster: 'Monster land',
      scenePaper: 'Paper',
      bgPink: 'Pink', bgPeach: 'Peach', bgLemon: 'Lemon', bgMint: 'Mint',
      bgSky: 'Sky', bgLilac: 'Lilac', bgWhite: 'White', bgBoard: 'Chalkboard',
      loupe: 'Magnifier',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      closeLoupe: 'Put the magnifier away',
      hintLoupe: 'Magnifier on: move to look closely, use + and - to change the size',
      stampStar: 'Star', stampHeart: 'Heart', stampFlower: 'Flower',
      stampRocket: 'Rocket', stampSun: 'Sun', stampMoon: 'Moon',
      stampDino: 'Dino', stampIceCream: 'Ice cream', stampRainbow: 'Rainbow',
      stampFlag: 'Flag', stampMilkshake: 'Milkshake', stampBurger: 'Burger',
      stampCake: 'Cake', stampDonut: 'Donut', stampBalloon: 'Balloon',
      stickerSize: 'Sticker size',
      stampSizeSmall: 'S', stampSizeMedium: 'M', stampSizeLarge: 'L',
      adjust: 'Adjust',
      hintAdjust: 'Adjust stickers: drag one to move it, or pick S / M / L to resize',
      textTool: 'Write',
      hintText: 'Write: tap the canvas, type, then press Enter or ✓',
      textPlaceholder: 'Type something…',
      textDone: 'Place it',
      cancel: 'Cancel',
      stampButterfly: 'Butterfly', stampFish: 'Fish', stampCat: 'Cat',
      canvasLabel: 'Drawing canvas: draw with a finger or the mouse, switch modes with the buttons',
      gameScore: 'stars',
      hintStart: 'Hello! Draw something with your finger~',
      hintWelcomeBack: 'Your picture is still here! Tap Magic to bring it alive',
      hintDrawn: 'Lovely! Tap Magic and watch them move',
      hintMagic: 'Tap anything you drew — it will dance!',
      hintGame: 'Catch the stars! Tap the glowing ones',
      hintClear: 'All gone! Tap Undo to bring them back',
      hintSaved: 'Saved! Look in your downloads',
      hintSaveFail: 'Saving failed, please try again',
      hintSticker: 'Sticker placed! Tap Magic to make it fly',
      hintErase: 'Erased',
      hintCelebrate: 'Amazing! {n} stars collected',
    }

    // ---------------- 画具 ----------------
    const COLORS = [
      { id: 'red', value: '#ff5d73', label: 'colorRed' },
      { id: 'orange', value: '#ff9f43', label: 'colorOrange' },
      { id: 'yellow', value: '#ffd93d', label: 'colorYellow' },
      { id: 'green', value: '#57c785', label: 'colorGreen' },
      { id: 'teal', value: '#3fc9d1', label: 'colorTeal' },
      { id: 'blue', value: '#4d96ff', label: 'colorBlue' },
      { id: 'purple', value: '#9b6bff', label: 'colorPurple' },
      { id: 'pink', value: '#ff8ad8', label: 'colorPink' },
      { id: 'brown', value: '#a9714b', label: 'colorBrown' },
    ]
    const RAINBOW = ['#ff5d73', '#ff9f43', '#ffd93d', '#57c785', '#3fc9d1', '#4d96ff', '#9b6bff', '#ff8ad8']
    const SIZES = [
      { value: 7, dot: 6, label: 'sizeSmall' },
      { value: 15, dot: 12, label: 'sizeMedium' },
      { value: 26, dot: 20, label: 'sizeBig' },
    ]
    const STAMPS = [
      { kind: 'star', emoji: '⭐', size: 58, key: 'stampStar' },
      { kind: 'heart', emoji: '💖', size: 56, key: 'stampHeart' },
      { kind: 'flower', emoji: '🌸', size: 62, key: 'stampFlower' },
      { kind: 'butterfly', emoji: '🦋', size: 68, key: 'stampButterfly' },
      { kind: 'fish', emoji: '🐟', size: 66, key: 'stampFish' },
      { kind: 'cat', emoji: '🐱', size: 64, key: 'stampCat' },
      { kind: 'rocket', emoji: '🚀', size: 64, key: 'stampRocket' },
      { kind: 'sun', emoji: '☀️', size: 60, key: 'stampSun' },
      { kind: 'moon', emoji: '🌙', size: 56, key: 'stampMoon' },
      { kind: 'dino', emoji: '🦕', size: 70, key: 'stampDino' },
      { kind: 'icecream', emoji: '🍦', size: 60, key: 'stampIceCream' },
      { kind: 'rainbow', emoji: '🌈', size: 70, key: 'stampRainbow' },
      { kind: 'flag', emoji: '🇨🇳', size: 66, key: 'stampFlag' },
      { kind: 'milkshake', emoji: '🥤', size: 62, key: 'stampMilkshake' },
      { kind: 'burger', emoji: '🍔', size: 64, key: 'stampBurger' },
      { kind: 'cake', emoji: '🎂', size: 66, key: 'stampCake' },
      { kind: 'donut', emoji: '🍩', size: 58, key: 'stampDonut' },
      { kind: 'balloon', emoji: '🎈', size: 58, key: 'stampBalloon' },
    ]
    const STAMP_SIZE = {}
    for (const s of STAMPS) STAMP_SIZE[s.kind] = s.size
    const MODES = [
      { id: 'draw', icon: 'pencil', key: 'modeDraw' },
      { id: 'magic', icon: 'sparkle', key: 'modeMagic' },
      { id: 'game', icon: 'star', key: 'modeGame' },
    ]
    const PARTY = ['#ff5d73', '#ffb03a', '#ffd93d', '#57c785', '#3fc9d1', '#4d96ff', '#9b6bff', '#ff8ad8']
    // 可选的画布背景
    const SCENES = [
      { id: 'space', emoji: '🚀', label: 'sceneSpace' },
      { id: 'ocean', emoji: '🐠', label: 'sceneOcean' },
      { id: 'meadow', emoji: '🌳', label: 'sceneMeadow' },
      { id: 'aurora', emoji: '🌌', label: 'sceneAurora' },
      { id: 'candy', emoji: '🍭', label: 'sceneCandy' },
      { id: 'monster', emoji: '👾', label: 'sceneMonster' },
      { id: 'paper', emoji: '📄', label: 'scenePaper' },
    ]
    const SCENE_IDS = SCENES.map((s) => s.id)
    // 纯色背景（点色点直接换底色）
    const BG_COLORS = [
      { id: 'pink', value: '#ffd6e7', label: 'bgPink' },
      { id: 'peach', value: '#ffe3c8', label: 'bgPeach' },
      { id: 'lemon', value: '#fff6c2', label: 'bgLemon' },
      { id: 'mint', value: '#d9f5e3', label: 'bgMint' },
      { id: 'sky', value: '#cfeaff', label: 'bgSky' },
      { id: 'lilac', value: '#e6dcff', label: 'bgLilac' },
      { id: 'white', value: '#ffffff', label: 'bgWhite' },
      { id: 'board', value: '#2b2b3a', label: 'bgBoard' },
    ]
    const SCENE_KEY = 'dsh-kids-canvas:scene'

    // ---------------- 小工具 ----------------
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
    const rand = (a, b) => a + Math.random() * (b - a)
    const randInt = (a, b) => Math.floor(rand(a, b + 1))
    function hexToRgba(hex, alpha) {
      const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''))
      if (!m) return `rgba(255,255,255,${alpha})`
      const n = parseInt(m[1], 16)
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
    }
    function readMuted() {
      try { return window.localStorage.getItem(MUTE_STORE) === '1' } catch { return false }
    }

    // ---------------- 音效（WebAudio 现场合成，不加载任何资源） ----------------
    function createSound() {
      let ac = null
      let master = null
      let muted = false
      const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760]

      function ensure() {
        if (muted) return null
        if (!ac) {
          const Ctor = window.AudioContext || window.webkitAudioContext
          if (!Ctor) return null
          try {
            ac = new Ctor()
            master = ac.createGain()
            master.gain.value = 0.5
            master.connect(ac.destination)
          } catch {
            return null
          }
        }
        if (ac.state === 'suspended') {
          try { ac.resume() } catch {}
        }
        return ac
      }
      function tone(freq, delay, dur, peak, type) {
        const c = ensure()
        if (!c || !master) return
        const at = c.currentTime + (delay || 0)
        try {
          const osc = c.createOscillator()
          const gain = c.createGain()
          osc.type = type || 'triangle'
          osc.frequency.setValueAtTime(freq, at)
          gain.gain.setValueAtTime(0.0001, at)
          gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + 0.014)
          gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
          osc.connect(gain)
          gain.connect(master)
          osc.start(at)
          osc.stop(at + dur + 0.06)
        } catch {}
      }
      return {
        unlock() { ensure() },
        setMuted(v) {
          muted = !!v
          if (master) {
            try { master.gain.value = muted ? 0 : 0.5 } catch {}
          }
        },
        draw() { tone(260 + Math.random() * 70, 0, 0.07, 0.025, 'sine') },
        tap(n) {
          const f = PENTA[Math.abs(Math.round(n || 0)) % PENTA.length]
          tone(f, 0, 0.3, 0.15, 'triangle')
          tone(f * 2, 0.012, 0.15, 0.035, 'sine')
        },
        pop() {
          tone(700, 0, 0.15, 0.09, 'sine')
          tone(1050, 0.03, 0.12, 0.04, 'sine')
        },
        erase() { tone(320, 0, 0.1, 0.05, 'sine') },
        clear() { [0, 1, 2, 3].forEach((i) => tone(PENTA[3 - i], i * 0.05, 0.2, 0.07)) },
        catchStar(n) {
          const f = PENTA[(Math.max(0, n) + 2) % PENTA.length]
          tone(f, 0, 0.26, 0.14, 'triangle')
          tone(f * 1.5, 0.05, 0.2, 0.05, 'sine')
        },
        cheer() { [0, 2, 4, 6].forEach((i, k) => tone(PENTA[i], k * 0.08, 0.3, 0.11)) },
        save() { tone(880, 0, 0.18, 0.07, 'sine') },
      }
    }

    // ---------------- 画布引擎 ----------------
    function createEngine(canvas, root, opts) {
      let seq = 0
      const state = {
        w: 0,
        h: 0,
        dpr: 1,
        night: false,
        scene: 'space',
        bgColor: '#ffd6e7',
        mode: 'draw',
        tool: { kind: 'brush', color: COLORS[0].value, size: 15, rainbow: false, stamp: null },
        strokes: [],
        stickers: [],
        texts: [],
        sparks: [],
        gameStars: [],
        history: [],
        live: new Map(),
        erasing: null,
        hover: null,
        fineBatch: null,
        loupe: { active: false, zoom: 2.5, x: 0, y: 0 },
        stampScale: 1,
        selected: null,
        adjustDrag: null,
        eraseSaid: false,
        time: 0,
        last: 0,
        raf: 0,
        running: false,
        bg: document.createElement('canvas'),
        bgStars: [],
        score: 0,
        catches: 0,
        drawnHinted: false,
        stampSaid: 0,
        reduced: false,
        ro: null,
        disposed: false,
      }

      // ---- 基础几何 ----
      function distToSeg(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1
        const dy = y2 - y1
        const len2 = dx * dx + dy * dy
        if (!len2) return Math.hypot(px - x1, py - y1)
        let t = ((px - x1) * dx + (py - y1) * dy) / len2
        t = clamp(t, 0, 1)
        return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
      }
      function circle(g, x, y, r) {
        g.beginPath()
        g.arc(x, y, Math.max(0.2, r), 0, Math.PI * 2)
        g.fill()
      }
      function starPath(g, x, y, r, inner) {
        g.beginPath()
        for (let i = 0; i < 10; i++) {
          const rad = i % 2 ? inner : r
          const a = -Math.PI / 2 + (i * Math.PI) / 5
          const px = x + Math.cos(a) * rad
          const py = y + Math.sin(a) * rad
          if (i) g.lineTo(px, py)
          else g.moveTo(px, py)
        }
        g.closePath()
      }

      // ---- 笔画 ----
      function buildPath(pts) {
        const p = new Path2D()
        if (!pts.length) return p
        if (pts.length === 1) {
          p.moveTo(pts[0].x, pts[0].y)
          p.lineTo(pts[0].x + 0.01, pts[0].y)
          return p
        }
        p.moveTo(pts[0].x, pts[0].y)
        if (pts.length === 2) {
          p.lineTo(pts[1].x, pts[1].y)
          return p
        }
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2
          const my = (pts[i].y + pts[i + 1].y) / 2
          p.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
        }
        const last = pts[pts.length - 1]
        p.lineTo(last.x, last.y)
        return p
      }
      function refreshStroke(s) {
        s.path = buildPath(s.pts)
        let x0 = Infinity
        let y0 = Infinity
        let x1 = -Infinity
        let y1 = -Infinity
        for (const p of s.pts) {
          if (p.x < x0) x0 = p.x
          if (p.y < y0) y0 = p.y
          if (p.x > x1) x1 = p.x
          if (p.y > y1) y1 = p.y
        }
        if (!isFinite(x0)) { x0 = 0; y0 = 0; x1 = 0; y1 = 0 }
        s.bbox = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
        s.center = { x: (x0 + x1) / 2, y: (y0 + y1) / 2 }
        s.grad = null
      }
      function makeStroke(p, tool) {
        const s = {
          id: ++seq,
          pts: [p],
          color: tool.color,
          size: tool.size,
          rainbow: !!tool.rainbow,
          path: null,
          bbox: null,
          center: null,
          phase: rand(0, Math.PI * 2),
          spd: rand(0.8, 1.3),
          popStart: null,
          grad: null,
        }
        refreshStroke(s)
        return s
      }
      function rainbowFor(g, s) {
        const b = s.bbox
        const grad = g.createLinearGradient(b.x, b.y, b.x + Math.max(1, b.w), b.y + Math.max(1, b.h))
        for (let i = 0; i < RAINBOW.length; i++) grad.addColorStop(i / (RAINBOW.length - 1), RAINBOW[i])
        return grad
      }
      function strokePose(s, magic) {
        let dx = 0
        let dy = 0
        let rot = 0
        let scale = 1
        if (magic && !state.reduced) {
          const t = state.time
          dx = Math.sin(t * 0.6 + s.phase) * 8
          dy = Math.cos(t * 0.74 + s.phase * 1.3) * 6
          rot = Math.sin(t * 0.42 + s.phase) * 0.035
        }
        if (s.popStart !== null) {
          const q = (state.time - s.popStart) / 0.65
          if (q >= 1) {
            s.popStart = null
          } else if (q >= 0) {
            scale = 1 + Math.sin(Math.PI * q) * 0.24
            dy -= Math.sin(Math.PI * q) * 18
            rot += Math.sin(Math.PI * q * 2) * 0.14
          }
        }
        return { dx, dy, rot, scale }
      }
      function nearStroke(s, p, pad) {
        const lim = s.size / 2 + pad
        const pts = s.pts
        if (pts.length === 1) return Math.hypot(p.x - pts[0].x, p.y - pts[0].y) <= lim
        for (let i = 0; i < pts.length - 1; i++) {
          if (distToSeg(p.x, p.y, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) <= lim) return true
        }
        return false
      }

      // ---- 贴纸 ----
      function stickerPose(st) {
        if (state.tool.kind === 'adjust') {
          return { x: st.x, y: st.y, rot: 0, scale: 1, flip: 1 }
        }
        const t = state.time
        const k = state.mode === 'magic' && !state.reduced ? 1.7 : 1
        let x = st.x
        let y = st.y
        let rot = 0
        let scale = 1
        let flip = 1
        if (st.kind === 'butterfly') {
          x += Math.sin(t * 0.9 * k + st.phase) * 26 * k
          y += Math.sin(t * 1.5 * k + st.phase * 1.6) * 16 * k
          rot = Math.sin(t * 1.1 + st.phase) * 0.16
        } else if (st.kind === 'fish') {
          x += Math.sin(t * 0.55 * k + st.phase) * 30 * k
          y += Math.sin(t * 1.2 * k + st.phase) * 10 * k
          flip = Math.cos(t * 0.55 * k + st.phase) >= 0 ? 1 : -1
          rot = Math.sin(t * 1.2 + st.phase) * 0.06 * flip
        } else if (st.kind === 'star') {
          y += Math.sin(t * 1.6 * k + st.phase) * 6 * k
          rot = Math.sin(t * 0.8 + st.phase) * 0.12 * k
        } else if (st.kind === 'flower') {
          rot = Math.sin(t * 1.1 * k + st.phase) * 0.1 * k
        } else if (st.kind === 'heart') {
          y += Math.sin(t * 1.3 * k + st.phase) * 7 * k
        } else if (st.kind === 'cat') {
          y += Math.sin(t * 1.2 + st.phase) * 3
          rot = Math.sin(t * 0.9 + st.phase) * 0.03
        } else if (st.kind === 'rocket') {
          y += Math.sin(t * 1.4 * k + st.phase) * 5 * k
          rot = Math.sin(t * 1.1 + st.phase) * 0.06
        } else if (st.kind === 'sun') {
          rot = Math.sin(t * 0.5 + st.phase) * 0.22 * k
          scale = 1 + Math.sin(t * 2 + st.phase) * 0.02
        } else if (st.kind === 'moon') {
          y += Math.sin(t * 1.1 * k + st.phase) * 5 * k
          rot = Math.sin(t * 0.7 + st.phase) * 0.08
        } else if (st.kind === 'dino') {
          y += Math.sin(t * 1.6 * k + st.phase) * 4 * k
          rot = Math.sin(t * 0.9 + st.phase) * 0.02
        } else if (st.kind === 'icecream') {
          y += Math.sin(t * 1.5 * k + st.phase) * 5 * k
        } else if (st.kind === 'rainbow') {
          y += Math.sin(t * 1.2 * k + st.phase) * 3 * k
          rot = Math.sin(t * 1.0 + st.phase) * 0.05 * k
        } else if (st.kind === 'flag') {
          rot = Math.sin(t * 1.1 + st.phase) * 0.12 * k
        } else if (st.kind === 'milkshake') {
          y += Math.sin(t * 1.4 * k + st.phase) * 5 * k
          rot = Math.sin(t * 0.8 + st.phase) * 0.03
        } else if (st.kind === 'burger') {
          y += Math.sin(t * 1.5 * k + st.phase) * 4 * k
        } else if (st.kind === 'cake') {
          y += Math.sin(t * 1.3 * k + st.phase) * 4 * k
          rot = Math.sin(t * 0.9 + st.phase) * 0.02
        } else if (st.kind === 'donut') {
          y += Math.sin(t * 1.4 * k + st.phase) * 3 * k
          rot = Math.sin(t * 0.9 + st.phase) * 0.18 * k
        } else if (st.kind === 'balloon') {
          y += Math.sin(t * 1.2 * k + st.phase) * 7 * k
          rot = Math.sin(t * 0.8 + st.phase) * 0.06
        }
        if (st.popStart !== null) {
          const q = (state.time - st.popStart) / 0.6
          if (q >= 1) {
            st.popStart = null
          } else if (q >= 0) {
            scale = 1 + Math.sin(Math.PI * q) * 0.28
            y -= Math.sin(Math.PI * q) * 20
            rot += Math.sin(Math.PI * 2 * q) * 0.3
          }
        }
        return { x, y, rot, scale, flip }
      }

      function drawStarShape(g, x, y, r) {
        starPath(g, x, y, r, r * 0.44)
        const grad = g.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r)
        grad.addColorStop(0, '#fffbe0')
        grad.addColorStop(0.55, '#ffd93d')
        grad.addColorStop(1, '#ffab2e')
        g.fillStyle = grad
        g.fill()
        g.lineWidth = Math.max(1.4, r * 0.06)
        g.strokeStyle = 'rgba(255,255,255,.9)'
        g.stroke()
      }

      function drawStickerBody(g, kind, size) {
        const r = size / 2
        const t = state.time
        if (kind === 'star') {
          drawStarShape(g, 0, 0, r * 0.92)
        } else if (kind === 'heart') {
          g.beginPath()
          g.moveTo(0, r * 0.72)
          g.bezierCurveTo(-r * 1.1, -r * 0.05, -r * 0.62, -r * 0.92, 0, -r * 0.34)
          g.bezierCurveTo(r * 0.62, -r * 0.92, r * 1.1, -r * 0.05, 0, r * 0.72)
          g.closePath()
          const grad = g.createLinearGradient(0, -r * 0.8, 0, r * 0.7)
          grad.addColorStop(0, '#ff9ec7')
          grad.addColorStop(1, '#ff5d8f')
          g.fillStyle = grad
          g.fill()
          g.fillStyle = 'rgba(255,255,255,.65)'
          circle(g, -r * 0.28, -r * 0.2, r * 0.13)
        } else if (kind === 'flower') {
          for (let i = 0; i < 5; i++) {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2
            const px = Math.cos(a) * r * 0.42
            const py = Math.sin(a) * r * 0.42
            g.fillStyle = i % 2 ? '#ffb3d1' : '#ff8fc0'
            circle(g, px, py, r * 0.32)
          }
          g.fillStyle = '#ffd93d'
          circle(g, 0, 0, r * 0.24)
          g.fillStyle = 'rgba(255,255,255,.7)'
          circle(g, -r * 0.05, -r * 0.06, r * 0.08)
        } else if (kind === 'butterfly') {
          const flap = 0.55 + 0.45 * Math.abs(Math.sin(t * 6 + 1.2))
          g.save()
          g.fillStyle = '#b28dff'
          g.beginPath(); g.ellipse(-r * 0.42 * flap, -r * 0.3, r * 0.46 * flap, r * 0.52, -0.5, 0, Math.PI * 2); g.fill()
          g.beginPath(); g.ellipse(r * 0.42 * flap, -r * 0.3, r * 0.46 * flap, r * 0.52, 0.5, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#8ab6ff'
          g.beginPath(); g.ellipse(-r * 0.36 * flap, r * 0.34, r * 0.34 * flap, r * 0.32, 0.5, 0, Math.PI * 2); g.fill()
          g.beginPath(); g.ellipse(r * 0.36 * flap, r * 0.34, r * 0.34 * flap, r * 0.32, -0.5, 0, Math.PI * 2); g.fill()
          g.fillStyle = 'rgba(255,255,255,.8)'
          circle(g, -r * 0.42 * flap, -r * 0.34, r * 0.09)
          circle(g, r * 0.42 * flap, -r * 0.34, r * 0.09)
          g.restore()
          g.fillStyle = '#4a3b6b'
          g.beginPath(); g.ellipse(0, 0, r * 0.11, r * 0.5, 0, 0, Math.PI * 2); g.fill()
          g.strokeStyle = '#4a3b6b'
          g.lineWidth = Math.max(1.3, r * 0.055)
          g.lineCap = 'round'
          g.beginPath(); g.moveTo(0, -r * 0.46); g.quadraticCurveTo(-r * 0.18, -r * 0.76, -r * 0.32, -r * 0.7); g.stroke()
          g.beginPath(); g.moveTo(0, -r * 0.46); g.quadraticCurveTo(r * 0.18, -r * 0.76, r * 0.32, -r * 0.7); g.stroke()
        } else if (kind === 'fish') {
          const wag = Math.sin(t * 5 + 0.4)
          g.fillStyle = '#ef8454'
          g.save()
          g.translate(-r * 0.72, 0)
          g.rotate(wag * 0.28)
          g.beginPath()
          g.moveTo(0, 0)
          g.lineTo(-r * 0.46, -r * 0.42)
          g.lineTo(-r * 0.46, r * 0.42)
          g.closePath()
          g.fill()
          g.restore()
          const grad = g.createLinearGradient(-r * 0.7, 0, r * 0.7, 0)
          grad.addColorStop(0, '#ffb347')
          grad.addColorStop(1, '#ff7b54')
          g.beginPath()
          g.ellipse(0, 0, r * 0.8, r * 0.5, 0, 0, Math.PI * 2)
          g.fillStyle = grad
          g.fill()
          g.fillStyle = 'rgba(255,255,255,.55)'
          g.beginPath()
          g.moveTo(-r * 0.1, -r * 0.34)
          g.lineTo(r * 0.08, -r * 0.62)
          g.lineTo(r * 0.24, -r * 0.3)
          g.closePath()
          g.fill()
          g.fillStyle = '#ffffff'
          circle(g, r * 0.38, -r * 0.1, r * 0.15)
          g.fillStyle = '#3a2b2b'
          circle(g, r * 0.42, -r * 0.1, r * 0.07)
          g.strokeStyle = 'rgba(130,60,40,.75)'
          g.lineWidth = Math.max(1.2, r * 0.05)
          g.beginPath()
          g.arc(r * 0.62, r * 0.08, r * 0.1, 0.2, 1.2)
          g.stroke()
        } else if (kind === 'cat') {
          g.fillStyle = '#f2b56b'
          g.beginPath(); g.moveTo(-r * 0.74, -r * 0.22); g.lineTo(-r * 0.52, -r * 0.98); g.lineTo(-r * 0.14, -r * 0.46); g.closePath(); g.fill()
          g.beginPath(); g.moveTo(r * 0.74, -r * 0.22); g.lineTo(r * 0.52, -r * 0.98); g.lineTo(r * 0.14, -r * 0.46); g.closePath(); g.fill()
          g.fillStyle = '#ffb3c7'
          g.beginPath(); g.moveTo(-r * 0.6, -r * 0.36); g.lineTo(-r * 0.49, -r * 0.8); g.lineTo(-r * 0.3, -r * 0.48); g.closePath(); g.fill()
          g.beginPath(); g.moveTo(r * 0.6, -r * 0.36); g.lineTo(r * 0.49, -r * 0.8); g.lineTo(r * 0.3, -r * 0.48); g.closePath(); g.fill()
          const grad = g.createRadialGradient(-r * 0.2, -r * 0.3, r * 0.1, 0, 0, r * 0.9)
          grad.addColorStop(0, '#ffe3bb')
          grad.addColorStop(1, '#f4bf78')
          g.beginPath(); g.arc(0, 0, r * 0.8, 0, Math.PI * 2); g.fillStyle = grad; g.fill()
          const blink = Math.sin(t * 1.7 + 0.9) > 0.97 ? 0.12 : 1
          g.fillStyle = '#4a3423'
          g.save(); g.translate(-r * 0.3, -r * 0.08); g.scale(0.85, blink); circle(g, 0, 0, r * 0.1); g.restore()
          g.save(); g.translate(r * 0.3, -r * 0.08); g.scale(0.85, blink); circle(g, 0, 0, r * 0.1); g.restore()
          g.fillStyle = '#ff9fb2'
          g.beginPath(); g.moveTo(0, r * 0.14); g.lineTo(-r * 0.09, r * 0.24); g.lineTo(r * 0.09, r * 0.24); g.closePath(); g.fill()
          g.strokeStyle = 'rgba(110,70,40,.7)'
          g.lineWidth = Math.max(1.2, r * 0.05)
          g.lineCap = 'round'
          g.beginPath(); g.moveTo(0, r * 0.24); g.lineTo(0, r * 0.32); g.stroke()
          g.beginPath(); g.arc(-r * 0.1, r * 0.34, r * 0.1, 0.1, Math.PI - 0.4); g.stroke()
          g.beginPath(); g.arc(r * 0.1, r * 0.34, r * 0.1, 0.4, Math.PI - 0.1); g.stroke()
          g.strokeStyle = 'rgba(110,70,40,.45)'
          g.beginPath(); g.moveTo(-r * 0.36, r * 0.2); g.lineTo(-r * 0.76, r * 0.12); g.stroke()
          g.beginPath(); g.moveTo(-r * 0.36, r * 0.3); g.lineTo(-r * 0.76, r * 0.34); g.stroke()
          g.beginPath(); g.moveTo(r * 0.36, r * 0.2); g.lineTo(r * 0.76, r * 0.12); g.stroke()
          g.beginPath(); g.moveTo(r * 0.36, r * 0.3); g.lineTo(r * 0.76, r * 0.34); g.stroke()
        } else if (kind === 'rocket') {
          const r = size / 2
          const flame = g.createLinearGradient(0, r * 0.5, 0, r * 0.95)
          flame.addColorStop(0, '#fff0a0')
          flame.addColorStop(1, 'rgba(255, 120, 90, 0)')
          g.fillStyle = flame
          g.beginPath(); g.moveTo(-r * 0.2, r * 0.52); g.quadraticCurveTo(0, r * 0.96, r * 0.2, r * 0.52); g.closePath(); g.fill()
          g.fillStyle = '#ff5d73'
          g.beginPath(); g.moveTo(-r * 0.3, r * 0.12); g.lineTo(-r * 0.62, r * 0.52); g.lineTo(-r * 0.3, r * 0.52); g.closePath(); g.fill()
          g.beginPath(); g.moveTo(r * 0.3, r * 0.12); g.lineTo(r * 0.62, r * 0.52); g.lineTo(r * 0.3, r * 0.52); g.closePath(); g.fill()
          const body = g.createLinearGradient(-r * 0.3, 0, r * 0.32, 0)
          body.addColorStop(0, '#ffffff')
          body.addColorStop(0.6, '#e6edfa')
          body.addColorStop(1, '#b9c4dd')
          g.fillStyle = body
          g.beginPath()
          g.moveTo(0, -r * 0.92)
          g.bezierCurveTo(r * 0.3, -r * 0.62, r * 0.34, -r * 0.15, r * 0.34, r * 0.4)
          g.lineTo(r * 0.34, r * 0.56)
          g.lineTo(-r * 0.34, r * 0.56)
          g.lineTo(-r * 0.34, r * 0.4)
          g.bezierCurveTo(-r * 0.34, -r * 0.15, -r * 0.3, -r * 0.62, 0, -r * 0.92)
          g.closePath(); g.fill()
          g.fillStyle = '#ff5d73'
          g.beginPath()
          g.moveTo(0, -r * 0.92)
          g.bezierCurveTo(r * 0.18, -r * 0.74, r * 0.26, -r * 0.56, r * 0.27, -r * 0.42)
          g.lineTo(-r * 0.27, -r * 0.42)
          g.bezierCurveTo(-r * 0.26, -r * 0.56, -r * 0.18, -r * 0.74, 0, -r * 0.92)
          g.closePath(); g.fill()
          g.fillStyle = '#2b3a67'
          circle(g, 0, -r * 0.04, r * 0.22)
          const glass = g.createRadialGradient(-r * 0.06, -r * 0.1, 1, 0, -r * 0.04, r * 0.18)
          glass.addColorStop(0, '#c8f2ff')
          glass.addColorStop(1, '#4aa8e0')
          g.fillStyle = glass
          circle(g, 0, -r * 0.04, r * 0.16)
          g.fillStyle = 'rgba(255,255,255,.85)'
          circle(g, -r * 0.06, -r * 0.1, r * 0.04)
        } else if (kind === 'sun') {
          const r = size / 2
          g.fillStyle = '#ffd23f'
          for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2
            const inner = r * 0.6
            const outer = r * 0.95
            const spread = 0.1
            g.beginPath()
            g.moveTo(Math.cos(a - spread) * inner, Math.sin(a - spread) * inner)
            g.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
            g.lineTo(Math.cos(a + spread) * inner, Math.sin(a + spread) * inner)
            g.closePath(); g.fill()
          }
          const grad = g.createRadialGradient(-r * 0.2, -r * 0.25, r * 0.1, 0, 0, r * 0.66)
          grad.addColorStop(0, '#fff3a8')
          grad.addColorStop(1, '#ffc93c')
          g.fillStyle = grad
          g.beginPath(); g.arc(0, 0, r * 0.62, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#8a5a2b'
          circle(g, -r * 0.2, -r * 0.06, r * 0.06)
          circle(g, r * 0.2, -r * 0.06, r * 0.06)
          g.strokeStyle = '#8a5a2b'
          g.lineWidth = Math.max(1.4, r * 0.05)
          g.lineCap = 'round'
          g.beginPath(); g.arc(0, r * 0.04, r * 0.2, 0.3, Math.PI - 0.3); g.stroke()
          g.fillStyle = 'rgba(255, 150, 120, .5)'
          circle(g, -r * 0.36, r * 0.12, r * 0.09)
          circle(g, r * 0.36, r * 0.12, r * 0.09)
        } else if (kind === 'moon') {
          const r = size / 2
          const glow = g.createRadialGradient(0, 0, r * 0.5, 0, 0, r * 0.95)
          glow.addColorStop(0, 'rgba(255, 246, 201, .45)')
          glow.addColorStop(1, 'rgba(255, 246, 201, 0)')
          g.fillStyle = glow
          g.beginPath(); g.arc(0, 0, r * 0.95, 0, Math.PI * 2); g.fill()
          const grad = g.createRadialGradient(-r * 0.25, -r * 0.3, r * 0.1, 0, 0, r * 0.8)
          grad.addColorStop(0, '#fffbe0')
          grad.addColorStop(1, '#ffd76a')
          g.fillStyle = grad
          g.beginPath(); g.arc(0, 0, r * 0.8, 0, Math.PI * 2); g.fill()
          g.fillStyle = 'rgba(205, 165, 80, .35)'
          circle(g, -r * 0.28, -r * 0.2, r * 0.14)
          circle(g, -r * 0.05, r * 0.28, r * 0.1)
          circle(g, r * 0.3, -r * 0.05, r * 0.08)
          g.fillStyle = '#fff6c9'
          starPath(g, r * 0.64, -r * 0.56, r * 0.12, r * 0.05)
          g.fill()
        } else if (kind === 'dino') {
          const r = size / 2
          g.fillStyle = '#7bd389'
          g.beginPath()
          g.moveTo(-r * 0.36, r * 0.18)
          g.quadraticCurveTo(-r * 0.82, r * 0.12, -r * 0.74, -r * 0.18)
          g.quadraticCurveTo(-r * 0.55, r * 0.04, -r * 0.3, r * 0.32)
          g.closePath(); g.fill()
          g.beginPath(); g.ellipse(-r * 0.05, r * 0.18, r * 0.4, r * 0.26, 0, 0, Math.PI * 2); g.fill()
          g.beginPath()
          g.moveTo(r * 0.12, r * 0.1)
          g.quadraticCurveTo(r * 0.3, -r * 0.3, r * 0.26, -r * 0.62)
          g.lineTo(r * 0.46, -r * 0.62)
          g.quadraticCurveTo(r * 0.54, -r * 0.2, r * 0.34, r * 0.16)
          g.closePath(); g.fill()
          g.beginPath(); g.ellipse(r * 0.37, -r * 0.64, r * 0.2, r * 0.15, -0.25, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#5fbf75'
          g.fillRect(-r * 0.32, r * 0.36, r * 0.13, r * 0.3)
          g.fillRect(-r * 0.06, r * 0.38, r * 0.13, r * 0.28)
          g.fillRect(r * 0.18, r * 0.34, r * 0.12, r * 0.3)
          g.fillStyle = 'rgba(255,255,255,.5)'
          circle(g, -r * 0.2, r * 0.12, r * 0.06)
          circle(g, -r * 0.04, r * 0.24, r * 0.05)
          circle(g, r * 0.08, r * 0.1, r * 0.045)
          g.fillStyle = '#ffffff'
          circle(g, r * 0.42, -r * 0.68, r * 0.055)
          g.fillStyle = '#2b3a33'
          circle(g, r * 0.43, -r * 0.68, r * 0.03)
          g.strokeStyle = '#2b3a33'
          g.lineWidth = Math.max(1.2, r * 0.04)
          g.lineCap = 'round'
          g.beginPath(); g.arc(r * 0.42, -r * 0.58, r * 0.06, 0.2, Math.PI - 0.2); g.stroke()
        } else if (kind === 'icecream') {
          const r = size / 2
          g.fillStyle = '#e8b06a'
          g.beginPath()
          g.moveTo(-r * 0.34, r * 0.06)
          g.lineTo(r * 0.34, r * 0.06)
          g.lineTo(0, r * 0.86)
          g.closePath(); g.fill()
          g.strokeStyle = 'rgba(150, 95, 45, .45)'
          g.lineWidth = Math.max(1, r * 0.04)
          for (let i = 0; i < 3; i++) {
            const y = r * (0.2 + i * 0.18)
            const half = r * (0.26 - i * 0.08)
            g.beginPath(); g.moveTo(-half, y); g.lineTo(half, y); g.stroke()
          }
          const scoop1 = g.createRadialGradient(-r * 0.14, -r * 0.28, r * 0.05, 0, -r * 0.16, r * 0.42)
          scoop1.addColorStop(0, '#d6fff2')
          scoop1.addColorStop(1, '#8fe3c8')
          g.fillStyle = scoop1
          g.beginPath(); g.arc(-r * 0.02, -r * 0.12, r * 0.4, 0, Math.PI * 2); g.fill()
          const scoop2 = g.createRadialGradient(-r * 0.1, -r * 0.62, r * 0.05, 0, -r * 0.5, r * 0.34)
          scoop2.addColorStop(0, '#ffe1ef')
          scoop2.addColorStop(1, '#ff9ec7')
          g.fillStyle = scoop2
          g.beginPath(); g.arc(r * 0.04, -r * 0.48, r * 0.32, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#ff5d73'
          circle(g, r * 0.04, -r * 0.78, r * 0.09)
          g.strokeStyle = '#6b8f3c'
          g.lineWidth = Math.max(1.2, r * 0.03)
          g.beginPath(); g.moveTo(r * 0.04, -r * 0.86); g.quadraticCurveTo(r * 0.12, -r * 0.98, r * 0.18, -r * 0.92); g.stroke()
        } else if (kind === 'rainbow') {
          const r = size / 2
          const bands = ['#ff5d73', '#ffb03a', '#ffd93d', '#57c785', '#4d96ff']
          const bw = r * 0.13
          g.lineCap = 'butt'
          for (let i = 0; i < bands.length; i++) {
            g.strokeStyle = bands[i]
            g.lineWidth = bw
            g.beginPath()
            g.arc(0, r * 0.28, r * 0.72 - i * (bw + 1), Math.PI, Math.PI * 2)
            g.stroke()
          }
          g.fillStyle = 'rgba(255,255,255,.95)'
          puff(g, -r * 0.72, r * 0.28, r * 0.17)
          puff(g, -r * 0.55, r * 0.34, r * 0.12)
          puff(g, r * 0.72, r * 0.28, r * 0.17)
          puff(g, r * 0.55, r * 0.34, r * 0.12)
        } else if (kind === 'flag') {
          const r = size / 2
          g.strokeStyle = '#c9d3e0'
          g.lineWidth = Math.max(2, r * 0.09)
          g.lineCap = 'round'
          g.beginPath(); g.moveTo(-r * 0.72, -r * 0.84); g.lineTo(-r * 0.72, r * 0.86); g.stroke()
          g.fillStyle = '#ffd93d'
          circle(g, -r * 0.72, -r * 0.92, r * 0.09)
          const wave = Math.sin(state.time * 2.2) * r * 0.06
          g.fillStyle = '#de2910'
          g.beginPath()
          g.moveTo(-r * 0.66, -r * 0.72)
          g.quadraticCurveTo(0, -r * 0.82 + wave, r * 0.8, -r * 0.66)
          g.lineTo(r * 0.8, r * 0.2)
          g.quadraticCurveTo(0, r * 0.1 - wave, -r * 0.66, r * 0.26)
          g.closePath(); g.fill()
          g.fillStyle = '#ffde00'
          starPath(g, -r * 0.48, -r * 0.48, r * 0.17, r * 0.07)
          g.fill()
          const small = [[-r * 0.24, -r * 0.62], [-r * 0.2, -r * 0.44], [-r * 0.2, -r * 0.28], [-r * 0.26, -r * 0.16]]
          for (const [sx, sy] of small) {
            starPath(g, sx, sy, r * 0.06, r * 0.025)
            g.fill()
          }
        } else if (kind === 'milkshake') {
          const r = size / 2
          g.strokeStyle = '#ff8ad8'
          g.lineWidth = Math.max(3, r * 0.12)
          g.lineCap = 'round'
          g.beginPath(); g.moveTo(r * 0.18, -r * 0.42); g.lineTo(r * 0.38, -r * 0.92); g.stroke()
          const cup = g.createLinearGradient(-r * 0.42, 0, r * 0.42, 0)
          cup.addColorStop(0, '#ffffff')
          cup.addColorStop(1, '#d8e6f5')
          g.fillStyle = cup
          g.beginPath()
          g.moveTo(-r * 0.42, -r * 0.32)
          g.lineTo(r * 0.42, -r * 0.32)
          g.lineTo(r * 0.28, r * 0.82)
          g.lineTo(-r * 0.28, r * 0.82)
          g.closePath(); g.fill()
          g.fillStyle = '#ffb3d1'
          g.beginPath()
          g.moveTo(-r * 0.39, -r * 0.2)
          g.lineTo(r * 0.39, -r * 0.2)
          g.lineTo(r * 0.26, r * 0.62)
          g.lineTo(-r * 0.26, r * 0.62)
          g.closePath(); g.fill()
          g.strokeStyle = 'rgba(140, 160, 190, .5)'
          g.lineWidth = Math.max(1.2, r * 0.05)
          g.beginPath(); g.moveTo(-r * 0.42, -r * 0.32); g.lineTo(r * 0.42, -r * 0.32); g.stroke()
          g.fillStyle = '#fff6e0'
          puff(g, 0, -r * 0.38, r * 0.26)
          puff(g, -r * 0.17, -r * 0.28, r * 0.19)
          puff(g, r * 0.17, -r * 0.28, r * 0.19)
          puff(g, 0, -r * 0.56, r * 0.17)
          g.fillStyle = '#ff5d73'
          circle(g, 0, -r * 0.72, r * 0.11)
          g.strokeStyle = '#6b8f3c'
          g.lineWidth = Math.max(1, r * 0.04)
          g.beginPath(); g.moveTo(0, -r * 0.8); g.quadraticCurveTo(r * 0.12, -r * 0.94, r * 0.2, -r * 0.86); g.stroke()
        } else if (kind === 'burger') {
          const r = size / 2
          g.fillStyle = '#e0a15c'
          g.beginPath(); g.ellipse(0, r * 0.5, r * 0.62, r * 0.2, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#6b3f2a'
          g.beginPath(); g.ellipse(0, r * 0.22, r * 0.6, r * 0.16, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#ffd93d'
          g.beginPath()
          g.moveTo(-r * 0.62, r * 0.16)
          g.lineTo(-r * 0.3, r * 0.04)
          g.lineTo(0, r * 0.16)
          g.lineTo(r * 0.3, r * 0.04)
          g.lineTo(r * 0.62, r * 0.16)
          g.lineTo(r * 0.62, r * 0.26)
          g.lineTo(-r * 0.62, r * 0.26)
          g.closePath(); g.fill()
          g.fillStyle = '#57c785'
          g.beginPath(); g.ellipse(0, r * 0.02, r * 0.66, r * 0.12, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#f2c078'
          g.beginPath()
          g.moveTo(-r * 0.64, -r * 0.04)
          g.bezierCurveTo(-r * 0.6, -r * 0.64, r * 0.6, -r * 0.64, r * 0.64, -r * 0.04)
          g.closePath(); g.fill()
          g.fillStyle = 'rgba(255,255,255,.85)'
          circle(g, -r * 0.25, -r * 0.32, r * 0.045)
          circle(g, r * 0.05, -r * 0.42, r * 0.045)
          circle(g, r * 0.32, -r * 0.26, r * 0.045)
        } else if (kind === 'cake') {
          const r = size / 2
          g.fillStyle = 'rgba(255,255,255,.85)'
          g.beginPath(); g.ellipse(0, r * 0.78, r * 0.74, r * 0.12, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#ffb3d1'
          g.fillRect(-r * 0.55, r * 0.18, r * 1.1, r * 0.42)
          g.fillStyle = '#fff3c4'
          g.fillRect(-r * 0.55, r * 0.12, r * 1.1, r * 0.16)
          g.fillStyle = '#ff8fc0'
          g.fillRect(-r * 0.38, -r * 0.22, r * 0.76, r * 0.4)
          g.fillStyle = '#fff3c4'
          g.beginPath(); g.ellipse(0, -r * 0.22, r * 0.38, r * 0.1, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#5bc8ff'
          g.fillRect(-r * 0.05, -r * 0.56, r * 0.1, r * 0.26)
          g.fillStyle = '#ffd93d'
          g.beginPath(); g.ellipse(0, -r * 0.64, r * 0.07, r * 0.1, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#ff5d73'
          circle(g, r * 0.24, -r * 0.3, r * 0.07)
          g.fillStyle = 'rgba(255,255,255,.75)'
          circle(g, -r * 0.3, r * 0.34, r * 0.04)
          circle(g, r * 0.05, r * 0.46, r * 0.04)
          circle(g, r * 0.34, r * 0.36, r * 0.04)
        } else if (kind === 'donut') {
          const r = size / 2
          g.fillStyle = '#e8b06a'
          g.beginPath()
          g.arc(0, 0, r * 0.82, 0, Math.PI * 2, false)
          g.arc(0, 0, r * 0.3, 0, Math.PI * 2, true)
          g.fill()
          g.fillStyle = '#ff9ec7'
          g.beginPath()
          g.arc(0, 0, r * 0.78, 0, Math.PI * 2, false)
          g.arc(0, 0, r * 0.32, 0, Math.PI * 2, true)
          g.fill()
          const colors = ['#ffd93d', '#5bc8ff', '#57c785', '#ffffff']
          for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2 + 0.3
            const rr = r * (0.46 + (i % 3) * 0.08)
            g.save()
            g.translate(Math.cos(a) * rr, Math.sin(a) * rr)
            g.rotate(a)
            g.fillStyle = colors[i % 4]
            g.fillRect(-r * 0.025, -r * 0.06, r * 0.05, r * 0.12)
            g.restore()
          }
        } else if (kind === 'balloon') {
          const r = size / 2
          g.strokeStyle = 'rgba(120, 140, 180, .8)'
          g.lineWidth = Math.max(1.2, r * 0.04)
          g.beginPath(); g.moveTo(0, r * 0.55); g.quadraticCurveTo(r * 0.12, r * 0.8, -r * 0.05, r * 0.95); g.stroke()
          const grad = g.createRadialGradient(-r * 0.2, -r * 0.3, r * 0.1, 0, 0, r * 0.75)
          grad.addColorStop(0, '#ffb3d1')
          grad.addColorStop(1, '#ff5d8f')
          g.fillStyle = grad
          g.beginPath(); g.ellipse(0, -r * 0.05, r * 0.58, r * 0.68, 0, 0, Math.PI * 2); g.fill()
          g.fillStyle = '#ff5d8f'
          g.beginPath(); g.moveTo(-r * 0.08, r * 0.55); g.lineTo(r * 0.08, r * 0.55); g.lineTo(0, r * 0.66); g.closePath(); g.fill()
          g.fillStyle = 'rgba(255,255,255,.7)'
          g.beginPath(); g.ellipse(-r * 0.2, -r * 0.28, r * 0.1, r * 0.16, -0.5, 0, Math.PI * 2); g.fill()
        }
      }

      // ---- 外太空背景 ----
      function paintBackground() {
        const w = Math.max(1, state.w)
        const hgt = Math.max(1, state.h)
        const dpr = state.dpr || 1
        state.bg.width = Math.round(w * dpr)
        state.bg.height = Math.round(hgt * dpr)
        const g = state.bg.getContext('2d')
        if (!g) return
        g.setTransform(dpr, 0, 0, dpr, 0, 0)
        g.clearRect(0, 0, w, hgt)
        const scene = state.scene
        if (scene === 'ocean') paintOcean(g, w, hgt)
        else if (scene === 'meadow') paintMeadow(g, w, hgt)
        else if (scene === 'aurora') paintAurora(g, w, hgt)
        else if (scene === 'candy') paintCandy(g, w, hgt)
        else if (scene === 'monster') paintMonster(g, w, hgt)
        else if (scene === 'paper') paintPaper(g, w, hgt)
        else if (scene === 'solid') paintSolid(g, w, hgt, state.bgColor)
        else paintSpace(g, w, hgt)
      }
      function paintSpace(g, w, hgt) {
        const dark = state.night
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        if (dark) {
          sky.addColorStop(0, '#040714')
          sky.addColorStop(0.42, '#0b1028')
          sky.addColorStop(0.78, '#161233')
          sky.addColorStop(1, '#221738')
        } else {
          sky.addColorStop(0, '#0a0f2c')
          sky.addColorStop(0.42, '#171a4a')
          sky.addColorStop(0.78, '#2a1b52')
          sky.addColorStop(1, '#3b2157')
        }
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)

        // 星云：几团很淡的彩色光雾
        const nebulas = [
          [0.16, 0.74, 0.62, '255, 110, 200', dark ? 0.16 : 0.22],
          [0.82, 0.28, 0.46, '90, 200, 255', dark ? 0.13 : 0.17],
          [0.55, 0.94, 0.56, '150, 110, 255', dark ? 0.13 : 0.16],
          [0.95, 0.72, 0.4, '255, 165, 120', dark ? 0.1 : 0.13],
        ]
        for (const [nx, ny, nr, rgb, alpha] of nebulas) {
          const cx = nx * w
          const cy = ny * hgt
          const r = Math.max(w, hgt) * nr
          const rg = g.createRadialGradient(cx, cy, r * 0.04, cx, cy, r)
          rg.addColorStop(0, 'rgba(' + rgb + ', ' + alpha + ')')
          rg.addColorStop(1, 'rgba(' + rgb + ', 0)')
          g.fillStyle = rg
          g.beginPath()
          g.arc(cx, cy, r, 0, Math.PI * 2)
          g.fill()
        }

        // 固定的小星星
        for (let i = 0; i < 150; i++) {
          const x = (((i * 73) % 1000) / 1000) * w
          const y = (((i * 137) % 1000) / 1000) * hgt
          const r = 0.4 + ((i * 17) % 10) / 15
          g.globalAlpha = 0.25 + ((i * 29) % 10) / 16
          g.fillStyle = i % 9 === 0 ? '#ffe9b0' : '#ffffff'
          circle(g, x, y, r)
        }
        g.globalAlpha = 1

        // 带光环的大行星 + 远处的小卫星
        drawPlanet(g, w * 0.15, hgt * 0.23, Math.min(w, hgt) * 0.088, dark)
        drawMoon(g, w * 0.9, hgt * 0.64, Math.min(w, hgt) * 0.022)
      }
      function drawPlanet(g, x, y, r, dark) {
        g.save()
        g.translate(x, y)
        g.rotate(-0.34)
        // 后半圈光环
        const ring = g.createLinearGradient(-r * 2.2, 0, r * 2.2, 0)
        ring.addColorStop(0, 'rgba(255, 214, 150, .06)')
        ring.addColorStop(0.28, 'rgba(255, 226, 168, .5)')
        ring.addColorStop(0.5, 'rgba(255, 244, 210, .2)')
        ring.addColorStop(0.72, 'rgba(255, 226, 168, .44)')
        ring.addColorStop(1, 'rgba(255, 214, 150, .05)')
        g.strokeStyle = ring
        g.lineWidth = Math.max(3, r * 0.17)
        g.beginPath()
        g.ellipse(0, 0, r * 2.15, r * 0.62, 0, 0, Math.PI * 2)
        g.stroke()
        // 行星本体
        const body = g.createRadialGradient(-r * 0.4, -r * 0.42, r * 0.08, 0, 0, r * 1.06)
        body.addColorStop(0, dark ? '#ffe0ae' : '#ffe9c2')
        body.addColorStop(0.52, dark ? '#e39d6d' : '#f2b47e')
        body.addColorStop(1, dark ? '#7c4460' : '#9c5570')
        g.fillStyle = body
        g.beginPath()
        g.arc(0, 0, r, 0, Math.PI * 2)
        g.fill()
        // 淡淡的条纹
        g.save()
        g.beginPath()
        g.arc(0, 0, r, 0, Math.PI * 2)
        g.clip()
        g.fillStyle = 'rgba(120, 62, 84, .2)'
        g.fillRect(-r, -r * 0.18, r * 2, r * 0.16)
        g.fillRect(-r, r * 0.26, r * 2, r * 0.1)
        g.restore()
        // 前半圈光环压在行星上
        g.strokeStyle = 'rgba(255, 236, 190, .55)'
        g.lineWidth = Math.max(3, r * 0.17)
        g.beginPath()
        g.ellipse(0, 0, r * 2.15, r * 0.62, 0, Math.PI * 0.08, Math.PI * 0.92)
        g.stroke()
        g.restore()
      }
      function drawMoon(g, x, y, r) {
        g.save()
        const halo = g.createRadialGradient(x, y, r * 0.4, x, y, r * 4.2)
        halo.addColorStop(0, 'rgba(200, 220, 255, .18)')
        halo.addColorStop(1, 'rgba(200, 220, 255, 0)')
        g.fillStyle = halo
        g.beginPath()
        g.arc(x, y, r * 4.2, 0, Math.PI * 2)
        g.fill()
        const body = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r)
        body.addColorStop(0, '#f4f7ff')
        body.addColorStop(0.7, '#c9d3ea')
        body.addColorStop(1, '#9aa6c4')
        g.fillStyle = body
        g.beginPath()
        g.arc(x, y, r, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = 'rgba(120, 135, 170, .35)'
        circle(g, x - r * 0.3, y - r * 0.1, r * 0.18)
        circle(g, x + r * 0.28, y + r * 0.24, r * 0.13)
        circle(g, x + r * 0.05, y - r * 0.4, r * 0.1)
        g.restore()
      }

      // 慢慢飘的小火箭
      function drawRocket(g) {
        const t = state.time
        const scale = clamp(Math.min(state.w, state.h) / 760, 0.7, 1.1)
        const x = state.w * 0.84 + (state.reduced ? 0 : Math.sin(t * 0.3) * 9)
        const y = state.h * 0.4 + (state.reduced ? 0 : Math.sin(t * 0.45 + 1.1) * 11)
        const flame = 1 + 0.16 * Math.sin(t * 17) + 0.09 * Math.sin(t * 26 + 0.6)
        g.save()
        g.translate(x, y)
        g.rotate(-0.2 + (state.reduced ? 0 : Math.sin(t * 0.5) * 0.03))
        g.scale(scale, scale)
        // 尾焰
        const flameGrad = g.createLinearGradient(0, 22, 0, 50)
        flameGrad.addColorStop(0, 'rgba(255, 240, 160, .95)')
        flameGrad.addColorStop(0.55, 'rgba(255, 170, 70, .9)')
        flameGrad.addColorStop(1, 'rgba(255, 90, 120, 0)')
        g.fillStyle = flameGrad
        g.beginPath()
        g.moveTo(-8, 22)
        g.quadraticCurveTo(0, 22 + 24 * flame, 8, 22)
        g.closePath()
        g.fill()
        // 尾翼
        g.fillStyle = '#ff5d73'
        g.beginPath(); g.moveTo(-11, 8); g.lineTo(-23, 24); g.lineTo(-11, 24); g.closePath(); g.fill()
        g.beginPath(); g.moveTo(11, 8); g.lineTo(23, 24); g.lineTo(11, 24); g.closePath(); g.fill()
        // 机身
        const body = g.createLinearGradient(-13, 0, 14, 0)
        body.addColorStop(0, '#ffffff')
        body.addColorStop(0.55, '#e4ebfb')
        body.addColorStop(1, '#b9c4dd')
        g.fillStyle = body
        g.beginPath()
        g.moveTo(0, -29)
        g.bezierCurveTo(11, -19, 13, -4, 13, 13)
        g.lineTo(13, 24)
        g.lineTo(-13, 24)
        g.lineTo(-13, 13)
        g.bezierCurveTo(-13, -4, -11, -19, 0, -29)
        g.closePath()
        g.fill()
        // 红色鼻锥
        g.fillStyle = '#ff5d73'
        g.beginPath()
        g.moveTo(0, -29)
        g.bezierCurveTo(6, -23, 9.5, -17, 10, -11)
        g.lineTo(-10, -11)
        g.bezierCurveTo(-9.5, -17, -6, -23, 0, -29)
        g.closePath()
        g.fill()
        // 腰线
        g.strokeStyle = 'rgba(120, 140, 180, .45)'
        g.lineWidth = 1.4
        g.beginPath(); g.moveTo(-12.4, 6); g.lineTo(12.4, 6); g.stroke()
        // 舷窗
        g.fillStyle = '#2b3a67'
        g.beginPath(); g.arc(0, -1, 8.6, 0, Math.PI * 2); g.fill()
        const glass = g.createRadialGradient(-2.5, -3.5, 1, 0, -1, 7)
        glass.addColorStop(0, '#c8f2ff')
        glass.addColorStop(1, '#4aa8e0')
        g.fillStyle = glass
        g.beginPath(); g.arc(0, -1, 6.6, 0, Math.PI * 2); g.fill()
        g.fillStyle = 'rgba(255,255,255,.85)'
        circle(g, -2.6, -4, 1.9)
        // 小铆钉
        g.fillStyle = 'rgba(120, 140, 180, .5)'
        circle(g, -8, 18, 1.1)
        circle(g, 8, 18, 1.1)
        g.restore()
      }

      // 会闪的星星、偶尔划过的流星和慢慢飘的星尘
      function drawSpaceAmbient(g) {
        const t = state.time
        for (const s of state.bgStars) {
          const a = 0.25 + 0.75 * Math.abs(Math.sin(t * s.spd + s.phase))
          g.globalAlpha = a
          g.fillStyle = s.r > 1.5 ? '#ffe9b0' : '#fff8d8'
          circle(g, s.x * state.w, s.y * state.h, s.r)
        }
        g.globalAlpha = 1

        // 流星：每 8 秒左右划过一颗
        const cycle = 8
        const phase = t % cycle
        if (phase < 1.2) {
          const p = phase / 1.2
          const a = Math.sin(Math.PI * p) * 0.9
          const hx = state.w * (0.92 - 0.44 * p)
          const hy = state.h * (0.08 + 0.3 * p)
          const tx = hx + state.w * 0.14
          const ty = hy - state.h * 0.08
          g.save()
          g.globalAlpha = a
          const trail = g.createLinearGradient(hx, hy, tx, ty)
          trail.addColorStop(0, 'rgba(255, 255, 255, .95)')
          trail.addColorStop(1, 'rgba(170, 210, 255, 0)')
          g.strokeStyle = trail
          g.lineWidth = 3
          g.lineCap = 'round'
          g.beginPath()
          g.moveTo(hx, hy)
          g.lineTo(tx, ty)
          g.stroke()
          g.fillStyle = '#ffffff'
          circle(g, hx, hy, 2.4)
          g.restore()
        }

        // 慢慢飘的星尘
        for (let i = 0; i < 14; i++) {
          const speed = state.reduced ? 0 : 0.004 + (i % 3) * 0.002
          const x = ((((i * 0.137) + t * speed) % 1) * state.w)
          const y = ((((i * 0.381) + t * speed * 0.6) % 1) * state.h)
          g.globalAlpha = 0.12 + (i % 4) * 0.04
          g.fillStyle = '#cfe6ff'
          circle(g, x, y, 1)
        }
        g.globalAlpha = 1
        drawRocket(g)
      }

      // ---- 其它背景：静态层 + 会动的那一层 ----
      function puff(g, x, y, r) {
        g.beginPath()
        g.arc(x, y, r, 0, Math.PI * 2)
        g.fill()
      }
      function hillShape(g, w, hgt, base, lift) {
        const y = hgt * base
        g.beginPath()
        g.moveTo(0, hgt)
        g.lineTo(0, y)
        g.bezierCurveTo(w * 0.22, y - hgt * lift, w * 0.4, y + hgt * lift * 0.5, w * 0.62, y - hgt * lift * 0.4)
        g.bezierCurveTo(w * 0.8, y - hgt * lift * 1.1, w * 0.9, y + hgt * lift * 0.4, w, y - hgt * lift * 0.2)
        g.lineTo(w, hgt)
        g.closePath()
        g.fill()
      }
      function drawSmallFish(g, x, y, size, dir, i) {
        const palettes = [['#ffb03a', '#ff7b54'], ['#ff8ad8', '#ff5d73'], ['#4ecdc4', '#4d96ff']]
        const c = palettes[i % palettes.length]
        g.save()
        g.translate(x, y)
        g.scale(dir, 1)
        const grad = g.createLinearGradient(-size * 0.5, 0, size * 0.5, 0)
        grad.addColorStop(0, c[0])
        grad.addColorStop(1, c[1])
        g.fillStyle = grad
        g.beginPath()
        g.moveTo(-size * 0.45, 0)
        g.lineTo(-size * 0.72, -size * 0.22)
        g.lineTo(-size * 0.72, size * 0.22)
        g.closePath()
        g.fill()
        g.beginPath()
        g.ellipse(0, 0, size * 0.5, size * 0.28, 0, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = '#ffffff'
        circle(g, size * 0.28, -size * 0.05, size * 0.09)
        g.fillStyle = '#2a2a2a'
        circle(g, size * 0.3, -size * 0.05, size * 0.045)
        g.restore()
      }

      // 海底
      function paintOcean(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#9fe9ff')
        sky.addColorStop(0.32, '#54c6e8')
        sky.addColorStop(0.68, '#1479a6')
        sky.addColorStop(1, '#08456b')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        for (let i = 0; i < 4; i++) {
          const x = w * (0.1 + i * 0.24)
          const beam = g.createLinearGradient(x, 0, x + w * 0.06, hgt)
          beam.addColorStop(0, 'rgba(220, 250, 255, .22)')
          beam.addColorStop(1, 'rgba(220, 250, 255, 0)')
          g.fillStyle = beam
          g.beginPath()
          g.moveTo(x, 0)
          g.lineTo(x + w * 0.09, 0)
          g.lineTo(x + w * 0.17, hgt)
          g.lineTo(x + w * 0.04, hgt)
          g.closePath()
          g.fill()
        }
        g.fillStyle = '#f0d6a4'
        g.beginPath()
        g.moveTo(0, hgt)
        g.lineTo(0, hgt * 0.9)
        g.bezierCurveTo(w * 0.25, hgt * 0.86, w * 0.4, hgt * 0.94, w * 0.62, hgt * 0.9)
        g.bezierCurveTo(w * 0.8, hgt * 0.87, w * 0.9, hgt * 0.92, w, hgt * 0.89)
        g.lineTo(w, hgt)
        g.closePath()
        g.fill()
        g.fillStyle = '#2d6f83'
        g.beginPath(); g.ellipse(w * 0.2, hgt * 0.9, w * 0.05, hgt * 0.03, -0.2, 0, Math.PI * 2); g.fill()
        g.fillStyle = '#3d8a9e'
        g.beginPath(); g.ellipse(w * 0.72, hgt * 0.915, w * 0.06, hgt * 0.035, 0.2, 0, Math.PI * 2); g.fill()
        g.strokeStyle = '#ff8fb1'
        g.lineWidth = Math.max(3, w * 0.006)
        g.lineCap = 'round'
        for (let i = 0; i < 3; i++) {
          const bx = w * (0.32 + i * 0.035)
          const by = hgt * 0.9
          g.beginPath()
          g.moveTo(bx, by)
          g.quadraticCurveTo(bx - 6, by - 26, bx - 12, by - 42)
          g.moveTo(bx, by)
          g.quadraticCurveTo(bx + 8, by - 24, bx + 14, by - 38)
          g.stroke()
        }
      }
      function drawOceanAmbient(g) {
        const t = state.time
        // 海草
        for (let i = 0; i < 4; i++) {
          const baseX = state.w * (0.12 + i * 0.22)
          const baseY = state.h * 0.94
          const hgt = state.h * (0.13 + (i % 3) * 0.03)
          g.strokeStyle = i % 2 ? 'rgba(58, 177, 120, .9)' : 'rgba(96, 205, 140, .85)'
          g.lineWidth = Math.max(4, 8 - i)
          g.lineCap = 'round'
          g.beginPath()
          g.moveTo(baseX, baseY)
          for (let k = 1; k <= 5; k++) {
            const f = k / 5
            const sway = Math.sin(t * 1.2 + i * 1.7 + f * 2.2) * 14 * f
            g.lineTo(baseX + sway, baseY - hgt * f)
          }
          g.stroke()
        }
        // 小鱼
        for (let i = 0; i < 3; i++) {
          const dir = i % 2 ? 1 : -1
          const speed = (0.018 + i * 0.006) * dir
          const raw = i * 0.37 + t * speed
          const x = (((raw % 1) + 1) % 1) * state.w
          const y = state.h * (0.24 + i * 0.17) + Math.sin(t * 1.1 + i) * 10
          drawSmallFish(g, x, y, 26 + i * 6, dir, i)
        }
        // 气泡
        for (let i = 0; i < 16; i++) {
          const speed = 0.018 + (i % 4) * 0.006
          const y = ((((i * 0.13 + 1 - t * speed) % 1) + 1) % 1) * state.h
          const x = (((i * 0.29) % 1) * state.w) + Math.sin(t * 1.4 + i) * 8
          const r = 2 + (i % 4) * 1.4
          g.globalAlpha = 0.3 + (i % 3) * 0.12
          g.strokeStyle = 'rgba(255,255,255,.9)'
          g.lineWidth = 1.2
          g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke()
          g.fillStyle = 'rgba(255,255,255,.3)'
          circle(g, x - r * 0.3, y - r * 0.3, r * 0.35)
        }
        g.globalAlpha = 1
      }

      // 草地
      function paintMeadow(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#bfe9ff')
        sky.addColorStop(0.45, '#e6f8ff')
        sky.addColorStop(0.78, '#fff6dd')
        sky.addColorStop(1, '#fdf0d2')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        const sx = w * 0.82
        const sy = hgt * 0.17
        const halo = g.createRadialGradient(sx, sy, 8, sx, sy, 150)
        halo.addColorStop(0, 'rgba(255, 240, 160, .75)')
        halo.addColorStop(1, 'rgba(255, 240, 160, 0)')
        g.fillStyle = halo
        g.beginPath(); g.arc(sx, sy, 150, 0, Math.PI * 2); g.fill()
        g.fillStyle = '#ffe27a'
        g.beginPath(); g.arc(sx, sy, 30, 0, Math.PI * 2); g.fill()
        g.fillStyle = 'rgba(255,255,255,.6)'
        circle(g, sx - 7, sy - 9, 10)
        g.fillStyle = 'rgba(170, 222, 160, .55)'
        hillShape(g, w, hgt, 0.76, 0.1)
        g.fillStyle = 'rgba(133, 208, 126, .6)'
        hillShape(g, w, hgt, 0.87, 0.13)
        g.fillStyle = '#8bcf7d'
        hillShape(g, w, hgt, 0.965, 0.08)
        for (let i = 0; i < 20; i++) {
          const x = ((i * 0.37) % 1) * w
          const y = hgt * (0.9 + (i % 5) * 0.012)
          g.fillStyle = i % 3 === 0 ? '#ffd93d' : i % 3 === 1 ? '#ff8ad8' : '#ffffff'
          circle(g, x, y, 2 + (i % 3))
        }
        g.fillStyle = '#8a5a34'
        g.fillRect(w * 0.08, hgt * 0.78, Math.max(6, w * 0.012), hgt * 0.1)
        g.fillStyle = '#6bc46a'
        const treeR = Math.min(w, hgt) * 0.05
        circle(g, w * 0.086, hgt * 0.77, treeR)
        circle(g, w * 0.062, hgt * 0.79, treeR * 0.75)
        circle(g, w * 0.11, hgt * 0.79, treeR * 0.75)
      }
      function drawMeadowAmbient(g) {
        const t = state.time
        for (let i = 0; i < 3; i++) {
          const drift = state.reduced ? 0 : t * 0.004 * (1 + i * 0.4)
          const x = ((((i * 0.38 + drift) % 1.2) - 0.1)) * state.w
          const y = state.h * (0.13 + i * 0.07)
          const s = 0.7 + i * 0.16
          g.save()
          g.translate(x, y)
          g.scale(s, s)
          g.fillStyle = 'rgba(255,255,255,.8)'
          puff(g, 0, 0, 42)
          puff(g, 36, 8, 30)
          puff(g, -34, 10, 26)
          puff(g, 14, -14, 26)
          g.restore()
        }
        for (let i = 0; i < 2; i++) {
          const x = state.w * (i ? 0.72 : 0.32) + (state.reduced ? 0 : Math.sin(t * 0.9 + i * 2) * 22)
          const y = state.h * (i ? 0.56 : 0.4) + (state.reduced ? 0 : Math.cos(t * 1.3 + i) * 14)
          g.save()
          g.translate(x, y)
          g.scale(0.9, 0.9)
          drawStickerBody(g, 'butterfly', 34)
          g.restore()
        }
      }

      // 极光雪地
      function paintAurora(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#050f1e')
        sky.addColorStop(0.5, '#0a2438')
        sky.addColorStop(1, '#0e3550')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        for (let i = 0; i < 90; i++) {
          const x = (((i * 71) % 1000) / 1000) * w
          const y = (((i * 131) % 720) / 1000) * hgt
          g.globalAlpha = 0.25 + ((i * 23) % 10) / 14
          g.fillStyle = i % 11 === 0 ? '#cfe9ff' : '#ffffff'
          circle(g, x, y, 0.5 + ((i * 7) % 10) / 12)
        }
        g.globalAlpha = 1
        g.fillStyle = '#cfe6f5'
        hillShape(g, w, hgt, 0.78, 0.12)
        g.fillStyle = '#b3d3e8'
        hillShape(g, w, hgt, 0.9, 0.12)
        g.fillStyle = '#8fb7d2'
        hillShape(g, w, hgt, 0.97, 0.06)
        for (let i = 0; i < 6; i++) {
          const x = w * (0.08 + i * 0.17)
          const base = hgt * (0.9 + (i % 3) * 0.012)
          const s = Math.min(w, hgt) * (0.035 + (i % 3) * 0.008)
          g.fillStyle = '#173246'
          g.beginPath(); g.moveTo(x, base - s * 2.2); g.lineTo(x - s, base); g.lineTo(x + s, base); g.closePath(); g.fill()
          g.beginPath(); g.moveTo(x, base - s * 3.2); g.lineTo(x - s * 0.75, base - s * 0.9); g.lineTo(x + s * 0.75, base - s * 0.9); g.closePath(); g.fill()
        }
      }
      function drawAuroraAmbient(g) {
        const t = state.time
        for (let band = 0; band < 3; band++) {
          g.save()
          g.globalCompositeOperation = 'lighter'
          const grad = g.createLinearGradient(0, 0, state.w, 0)
          grad.addColorStop(0, 'rgba(90, 255, 180, 0)')
          grad.addColorStop(0.3, band === 1 ? 'rgba(120, 255, 210, .2)' : 'rgba(110, 220, 255, .14)')
          grad.addColorStop(0.7, band === 2 ? 'rgba(180, 140, 255, .16)' : 'rgba(140, 255, 200, .12)')
          grad.addColorStop(1, 'rgba(90, 255, 180, 0)')
          g.strokeStyle = grad
          g.lineWidth = state.h * 0.075
          g.lineCap = 'round'
          g.beginPath()
          for (let i = 0; i <= 12; i++) {
            const x = (i / 12) * state.w
            const y = state.h * (0.2 + band * 0.05) + Math.sin(i * 0.7 + t * 0.5 + band * 1.6) * state.h * 0.05
            if (i === 0) g.moveTo(x, y)
            else g.lineTo(x, y)
          }
          g.stroke()
          g.restore()
        }
        for (let i = 0; i < 28; i++) {
          const s = state.bgStars[i]
          if (!s) break
          g.globalAlpha = 0.2 + 0.6 * Math.abs(Math.sin(t * s.spd * 0.8 + s.phase))
          g.fillStyle = '#eaf6ff'
          circle(g, s.x * state.w, s.y * state.h * 0.7, s.r * 0.9)
        }
        g.globalAlpha = 1
        for (let i = 0; i < 36; i++) {
          const speed = 0.02 + (i % 5) * 0.006
          const y = ((((i * 0.073 + t * speed) % 1) + 1) % 1) * state.h
          const x = ((i * 0.271) % 1) * state.w + Math.sin(t * 0.8 + i) * 12
          g.globalAlpha = 0.4 + (i % 4) * 0.12
          g.fillStyle = '#ffffff'
          circle(g, x, y, 1.2 + (i % 3) * 0.7)
        }
        g.globalAlpha = 1
      }

      // 糖果天空
      function paintCandy(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#ffe1f0')
        sky.addColorStop(0.55, '#f3ecff')
        sky.addColorStop(1, '#dff3ff')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        const cx = w * 0.5
        const cy = hgt * 0.86
        const R = Math.min(w, hgt) * 0.46
        const bands = ['#ff8ad8', '#ffb03a', '#ffd93d', '#6bd88a', '#5bc8ff', '#9b6bff']
        const bw = Math.max(9, Math.min(w, hgt) * 0.022)
        g.lineCap = 'butt'
        g.globalAlpha = 0.5
        for (let i = 0; i < bands.length; i++) {
          g.strokeStyle = bands[i]
          g.lineWidth = bw
          g.beginPath()
          g.arc(cx, cy, R - i * (bw + 2), Math.PI, Math.PI * 2)
          g.stroke()
        }
        g.globalAlpha = 1
        for (let i = 0; i < 3; i++) {
          const x = w * (0.12 + i * 0.36)
          const y = hgt * (0.16 + (i % 2) * 0.12)
          const s = 0.8 + (i % 2) * 0.3
          g.save()
          g.translate(x, y)
          g.scale(s, s)
          g.fillStyle = 'rgba(255,255,255,.8)'
          puff(g, 0, 0, 40)
          puff(g, 34, 8, 28)
          puff(g, -32, 10, 24)
          puff(g, 12, -14, 24)
          g.restore()
        }
        for (let i = 0; i < 14; i++) {
          const x = ((i * 0.29) % 1) * w
          const y = hgt * (0.28 + (i % 5) * 0.09)
          g.globalAlpha = 0.5
          g.fillStyle = PARTY[i % PARTY.length]
          circle(g, x, y, 2 + (i % 3))
        }
        g.globalAlpha = 1
      }
      function drawCandyAmbient(g) {
        const t = state.time
        for (let i = 0; i < 10; i++) {
          const x = ((i * 0.137) % 1) * state.w + (state.reduced ? 0 : Math.sin(t * 0.5 + i * 1.3) * 14)
          const y = ((i * 0.271) % 1) * state.h + (state.reduced ? 0 : Math.cos(t * 0.7 + i * 1.1) * 12)
          const size = 11 + (i % 4) * 5
          g.save()
          g.translate(x, y)
          g.rotate(state.reduced ? 0 : Math.sin(t * 0.6 + i) * 0.3)
          if (i % 3 === 0) {
            g.fillStyle = i % 2 ? '#ff8ad8' : '#ffd93d'
            circle(g, 0, 0, size * 0.5)
            g.fillStyle = 'rgba(255,255,255,.7)'
            circle(g, -size * 0.14, -size * 0.14, size * 0.16)
          } else if (i % 3 === 1) {
            drawStickerBody(g, 'star', size)
          } else {
            drawStickerBody(g, 'heart', size)
          }
          g.restore()
        }
        g.globalAlpha = 1
      }

      // 怪物乐园
      function paintMonster(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#2b1b4e')
        sky.addColorStop(0.45, '#1d1440')
        sky.addColorStop(1, '#120c26')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        const mx = w * 0.78
        const my = hgt * 0.18
        const halo = g.createRadialGradient(mx, my, 8, mx, my, 120)
        halo.addColorStop(0, 'rgba(190, 255, 200, .3)')
        halo.addColorStop(1, 'rgba(190, 255, 200, 0)')
        g.fillStyle = halo
        g.beginPath(); g.arc(mx, my, 120, 0, Math.PI * 2); g.fill()
        const moonGrad = g.createRadialGradient(mx - 8, my - 10, 4, mx, my, 34)
        moonGrad.addColorStop(0, '#eaffd6')
        moonGrad.addColorStop(1, '#b8e6a8')
        g.fillStyle = moonGrad
        g.beginPath(); g.arc(mx, my, 34, 0, Math.PI * 2); g.fill()
        g.fillStyle = 'rgba(120, 170, 120, .35)'
        circle(g, mx - 10, my - 6, 6)
        circle(g, mx + 9, my + 8, 4)
        for (let i = 0; i < 80; i++) {
          const x = (((i * 73) % 1000) / 1000) * w
          const y = (((i * 131) % 640) / 1000) * hgt
          g.globalAlpha = 0.2 + ((i * 23) % 10) / 20
          g.fillStyle = i % 9 === 0 ? '#eaffd6' : '#ffffff'
          circle(g, x, y, 0.5 + ((i * 7) % 10) / 14)
        }
        g.globalAlpha = 1
        g.fillStyle = '#1e1540'
        hillShape(g, w, hgt, 0.72, 0.08)
        g.fillStyle = '#17102f'
        hillShape(g, w, hgt, 0.84, 0.1)
        drawCastle(g, w * 0.28, hgt * 0.86, Math.min(w, hgt) * 0.15)
        g.fillStyle = '#100a22'
        hillShape(g, w, hgt, 0.94, 0.05)
      }
      function drawCastle(g, cx, baseY, s) {
        g.save()
        g.translate(cx, baseY)
        const wallH = s * 0.9
        g.fillStyle = '#241a44'
        g.fillRect(-s, -wallH, s * 2, wallH)
        for (let i = 0; i < 5; i++) {
          g.fillRect(-s + i * (s * 0.45), -wallH - s * 0.14, s * 0.24, s * 0.14)
        }
        const towers = [[-s * 0.78, s * 1.5, s * 0.32], [s * 0.78, s * 1.5, s * 0.32], [0, s * 2.0, s * 0.4]]
        for (const [tx, th, tw] of towers) {
          g.fillStyle = '#241a44'
          g.fillRect(tx - tw / 2, -th, tw, th)
          g.fillStyle = '#3a2a6a'
          g.beginPath()
          g.moveTo(tx - tw * 0.62, -th)
          g.lineTo(tx, -th - tw * 0.9)
          g.lineTo(tx + tw * 0.62, -th)
          g.closePath(); g.fill()
          g.fillStyle = '#ffd93d'
          g.fillRect(tx - tw * 0.12, -th + th * 0.3, tw * 0.24, tw * 0.34)
          g.fillRect(tx - tw * 0.12, -th + th * 0.62, tw * 0.24, tw * 0.34)
        }
        g.fillStyle = '#120c26'
        g.beginPath()
        g.moveTo(-s * 0.28, 0)
        g.lineTo(-s * 0.28, -s * 0.42)
        g.quadraticCurveTo(0, -s * 0.72, s * 0.28, -s * 0.42)
        g.lineTo(s * 0.28, 0)
        g.closePath(); g.fill()
        g.fillStyle = '#ffd93d'
        g.fillRect(-s * 0.18, -s * 0.86, s * 0.1, s * 0.14)
        g.fillRect(s * 0.08, -s * 0.86, s * 0.1, s * 0.14)
        g.restore()
      }
      function drawBat(g, x, y, size, flapPhase) {
        g.save()
        g.translate(x, y)
        const flap = 0.45 + 0.55 * Math.abs(Math.sin(flapPhase))
        g.fillStyle = '#1a1233'
        g.beginPath()
        g.moveTo(0, 0)
        g.quadraticCurveTo(-size * 0.5, -size * 0.55 * flap, -size, -size * 0.12)
        g.quadraticCurveTo(-size * 0.55, size * 0.06, 0, size * 0.16)
        g.quadraticCurveTo(size * 0.55, size * 0.06, size, -size * 0.12)
        g.quadraticCurveTo(size * 0.5, -size * 0.55 * flap, 0, 0)
        g.fill()
        g.fillStyle = '#ffd93d'
        circle(g, -size * 0.15, -size * 0.04, 1.6)
        circle(g, size * 0.15, -size * 0.04, 1.6)
        g.restore()
      }
      function drawGhost(g, x, y, size, t) {
        const r = size / 2
        g.save()
        g.translate(x, y)
        g.globalAlpha = 0.92
        g.fillStyle = 'rgba(245, 248, 255, .94)'
        g.beginPath()
        g.moveTo(-r * 0.7, r * 0.62)
        g.lineTo(-r * 0.7, 0)
        g.arc(0, 0, r * 0.7, Math.PI, 0, false)
        g.lineTo(r * 0.7, r * 0.62)
        const step = (r * 1.4) / 3
        let bx = r * 0.7
        for (let i = 0; i < 3; i++) {
          const nx = bx - step
          g.quadraticCurveTo(bx - step / 2, r * 0.34, nx, r * 0.62)
          bx = nx
        }
        g.closePath()
        g.fill()
        g.fillStyle = 'rgba(70, 60, 100, .85)'
        circle(g, -r * 0.24, -r * 0.05, r * 0.09)
        circle(g, r * 0.24, -r * 0.05, r * 0.09)
        g.strokeStyle = 'rgba(70, 60, 100, .7)'
        g.lineWidth = Math.max(1.2, r * 0.05)
        g.lineCap = 'round'
        g.beginPath(); g.arc(0, r * 0.16, r * 0.18, 0.3, Math.PI - 0.3); g.stroke()
        g.fillStyle = 'rgba(255, 170, 190, .5)'
        circle(g, -r * 0.4, r * 0.08, r * 0.08)
        circle(g, r * 0.4, r * 0.08, r * 0.08)
        g.restore()
      }
      function drawBlobMonster(g, x, y, size, color, light, t) {
        const r = size / 2
        g.save()
        g.translate(x, y)
        const wob = 1 + Math.sin(t * 2.2 + x * 0.01) * 0.03
        g.save()
        g.scale(wob, 2 - wob)
        g.fillStyle = color
        g.beginPath(); g.moveTo(-r * 0.5, -r * 0.55); g.lineTo(-r * 0.64, -r * 1.02); g.lineTo(-r * 0.2, -r * 0.72); g.closePath(); g.fill()
        g.beginPath(); g.moveTo(r * 0.5, -r * 0.55); g.lineTo(r * 0.64, -r * 1.02); g.lineTo(r * 0.2, -r * 0.72); g.closePath(); g.fill()
        const grad = g.createRadialGradient(-r * 0.22, -r * 0.3, r * 0.08, 0, 0, r * 0.95)
        grad.addColorStop(0, light)
        grad.addColorStop(1, color)
        g.fillStyle = grad
        g.beginPath(); g.ellipse(0, 0, r * 0.78, r * 0.72, 0, 0, Math.PI * 2); g.fill()
        g.strokeStyle = color
        g.lineWidth = r * 0.18
        g.lineCap = 'round'
        g.beginPath(); g.moveTo(-r * 0.7, r * 0.12); g.lineTo(-r * 1.02, r * 0.3); g.stroke()
        g.beginPath(); g.moveTo(r * 0.7, r * 0.12); g.lineTo(r * 1.02, r * 0.3); g.stroke()
        g.fillStyle = '#ffffff'
        circle(g, -r * 0.28, -r * 0.12, r * 0.2)
        circle(g, r * 0.28, -r * 0.12, r * 0.2)
        g.fillStyle = '#2a1a3a'
        circle(g, -r * 0.26, -r * 0.1, r * 0.1)
        circle(g, r * 0.3, -r * 0.1, r * 0.1)
        g.strokeStyle = '#2a1a3a'
        g.lineWidth = r * 0.07
        g.lineCap = 'round'
        g.beginPath(); g.arc(0, r * 0.2, r * 0.24, 0.3, Math.PI - 0.3); g.stroke()
        g.restore()
        g.restore()
      }
      function drawMonsterAmbient(g) {
        const t = state.time
        for (let i = 0; i < 3; i++) {
          const drift = state.reduced ? 0 : Math.sin(t * 0.25 + i * 2) * 24
          g.save()
          g.globalAlpha = 0.05 + i * 0.015
          g.fillStyle = '#c9d6ff'
          g.beginPath()
          g.ellipse(state.w * (0.2 + i * 0.3) + drift, state.h * (0.85 + i * 0.02), state.w * 0.26, state.h * 0.045, 0, 0, Math.PI * 2)
          g.fill()
          g.restore()
        }
        for (let i = 0; i < 2; i++) {
          const speed = 0.012 + i * 0.004
          const raw = i * 0.45 + t * speed
          const x = ((((raw % 1.2) + 1.2) % 1.2) - 0.1) * state.w
          const y = state.h * (0.24 + i * 0.12) + (state.reduced ? 0 : Math.sin(t * 1.4 + i) * 12)
          drawBat(g, x, y, 24 + i * 6, t * 8 + i)
        }
        const gx = state.w * 0.64 + (state.reduced ? 0 : Math.sin(t * 0.4) * 14)
        const gy = state.h * 0.34 + (state.reduced ? 0 : Math.sin(t * 0.8 + 1) * 10)
        drawGhost(g, gx, gy, 58, t)
        drawBlobMonster(
          g,
          state.w * 0.15 + (state.reduced ? 0 : Math.sin(t * 0.5) * 10),
          state.h * 0.56 + (state.reduced ? 0 : Math.sin(t * 0.9 + 2) * 10),
          58, '#9b6bff', '#d6c6ff', t
        )
        drawBlobMonster(
          g,
          state.w * 0.86 + (state.reduced ? 0 : Math.sin(t * 0.6 + 2) * 10),
          state.h * 0.63 + (state.reduced ? 0 : Math.sin(t * 1.1) * 10),
          50, '#6bd88a', '#c6f2d2', t
        )
      }

      // 纯色
      function paintSolid(g, w, hgt, color) {
        const base = /^#[0-9a-f]{6}$/i.test(color || '') ? color : '#ffd6e7'
        g.fillStyle = base
        g.fillRect(0, 0, w, hgt)
        const glow = g.createLinearGradient(0, 0, 0, hgt)
        glow.addColorStop(0, 'rgba(255, 255, 255, .24)')
        glow.addColorStop(0.55, 'rgba(255, 255, 255, 0)')
        glow.addColorStop(1, 'rgba(0, 0, 0, .07)')
        g.fillStyle = glow
        g.fillRect(0, 0, w, hgt)
      }

      // 白纸
      function paintPaper(g, w, hgt) {
        const sky = g.createLinearGradient(0, 0, 0, hgt)
        sky.addColorStop(0, '#fffdf8')
        sky.addColorStop(1, '#f6f0e4')
        g.fillStyle = sky
        g.fillRect(0, 0, w, hgt)
        g.fillStyle = 'rgba(120, 105, 80, .07)'
        for (let y = 26; y < hgt; y += 34) {
          for (let x = 26; x < w; x += 34) {
            circle(g, x, y, 1)
          }
        }
      }

      // 按当前背景画会动的那一层
      function drawAmbient(g) {
        if (state.scene === 'ocean') drawOceanAmbient(g)
        else if (state.scene === 'meadow') drawMeadowAmbient(g)
        else if (state.scene === 'aurora') drawAuroraAmbient(g)
        else if (state.scene === 'candy') drawCandyAmbient(g)
        else if (state.scene === 'monster') drawMonsterAmbient(g)
        else if (state.scene === 'paper') { /* 白纸保持安静 */ }
        else if (state.scene === 'solid') { /* 纯色保持安静 */ }
        else drawSpaceAmbient(g)
      }

      // ---- 星星游戏 ----
      function newStar() {
        const w = Math.max(320, state.w)
        const hgt = Math.max(240, state.h)
        const minY = 120
        const maxY = Math.max(minY + 40, hgt - 190)
        return {
          baseX: rand(70, Math.max(130, w - 70)),
          baseY: rand(minY, maxY),
          ampX: rand(20, 58),
          ampY: rand(12, 36),
          speed: rand(0.5, 1.0),
          phase: rand(0, Math.PI * 2),
          r: rand(22, 29),
        }
      }
      function starPos(st) {
        const t = state.time
        return {
          x: st.baseX + Math.sin(t * st.speed + st.phase) * st.ampX,
          y: st.baseY + Math.cos(t * st.speed * 0.8 + st.phase * 1.4) * st.ampY,
        }
      }
      function ensureGameStars() {
        if (state.gameStars.length) return
        state.gameStars = []
        for (let i = 0; i < 5; i++) state.gameStars.push(newStar())
      }

      // ---- 粒子 ----
      function burst(x, y, colors, n, speed) {
        for (let i = 0; i < n; i++) {
          const a = rand(0, Math.PI * 2)
          const v = speed * rand(0.35, 1.25)
          const life = rand(0.45, 0.95)
          state.sparks.push({
            kind: 'spark',
            x, y,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v - 40,
            life,
            total: life,
            size: rand(1.8, 4.2),
            color: colors[randInt(0, colors.length - 1)],
            rot: rand(0, Math.PI),
            spin: rand(-8, 8),
            gravity: 240,
          })
        }
      }
      function confetti(x, y, n) {
        for (let i = 0; i < n; i++) {
          const life = rand(1.1, 1.9)
          state.sparks.push({
            kind: 'confetti',
            x, y,
            vx: rand(-260, 260),
            vy: rand(-380, -120),
            life,
            total: life,
            size: rand(5, 10),
            color: PARTY[randInt(0, PARTY.length - 1)],
            rot: rand(0, Math.PI),
            spin: rand(-10, 10),
            gravity: 460,
          })
        }
      }
      function stepParticles(dt) {
        const arr = state.sparks
        for (let i = arr.length - 1; i >= 0; i--) {
          const p = arr[i]
          p.life -= dt
          if (p.life <= 0) {
            arr.splice(i, 1)
            continue
          }
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.vy += p.gravity * dt
          p.rot += p.spin * dt
          p.vx *= 0.992
        }
        if (arr.length > 420) arr.splice(0, arr.length - 420)
      }
      function drawEraserRing(g) {
        const r = state.tool.kind === 'fineEraser' ? 13 : 24
        g.save()
        g.setLineDash([6, 5])
        g.beginPath()
        g.arc(state.hover.x, state.hover.y, r, 0, Math.PI * 2)
        g.strokeStyle = state.tool.kind === 'fineEraser' ? 'rgba(255,200,80,.98)' : 'rgba(255,255,255,.95)'
        g.lineWidth = 3
        g.stroke()
        g.strokeStyle = 'rgba(30,36,58,.55)'
        g.lineWidth = 1.2
        g.stroke()
        g.setLineDash([])
        g.restore()
      }
      function drawSelection(g) {
        const st = state.selected
        if (!st || state.mode !== 'draw' || state.tool.kind !== 'adjust') return
        if (state.stickers.indexOf(st) < 0) return
        g.save()
        g.setLineDash([7, 5])
        g.strokeStyle = 'rgba(255, 186, 64, .95)'
        g.lineWidth = 2.5
        if (st.text) {
          const pose = textPose(st)
          const hw = Math.max(st.size * 0.8, (st.w || 0) / 2) + 10
          const hh = Math.max(st.size * 0.75, (st.h || 0) / 2) + 8
          const x = pose.x - hw
          const y = pose.y - hh
          const w = hw * 2
          const hgt = hh * 2
          g.beginPath()
          if (g.roundRect) g.roundRect(x, y, w, hgt, 12)
          else g.rect(x, y, w, hgt)
          g.stroke()
        } else {
          const pose = stickerPose(st)
          g.beginPath()
          g.arc(pose.x, pose.y, st.size * 0.62, 0, Math.PI * 2)
          g.stroke()
        }
        g.setLineDash([])
        g.restore()
      }
      function measureTextWidth(text, size) {
        const g = canvas.getContext('2d')
        if (!g) return String(text).length * size * 0.6
        g.save()
        g.font = '700 ' + size + 'px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
        const w = g.measureText(String(text)).width
        g.restore()
        return w
      }
      function wrapText(text, size, maxW) {
        const chars = Array.from(String(text))
        const lines = []
        let line = ''
        for (const ch of chars) {
          const cand = line + ch
          if (line && measureTextWidth(cand, size) > maxW) {
            lines.push(line)
            line = ch
          } else {
            line = cand
          }
        }
        if (line || !lines.length) lines.push(line)
        return lines
      }
      function layoutText(it) {
        if (!it.text) return it
        const maxW = Math.max(120, Math.min(state.w - 40, 560))
        it.lines = wrapText(it.text, it.size, maxW)
        it.lineHeight = Math.round(it.size * 1.18)
        let w = 0
        for (const line of it.lines) w = Math.max(w, measureTextWidth(line, it.size))
        it.w = w
        it.h = it.lines.length * it.lineHeight
        const loX = it.w / 2 + 10
        const hiX = Math.max(loX, state.w - it.w / 2 - 10)
        it.x = clamp(it.x, loX, hiX)
        const loY = it.h / 2 + 10
        const hiY = Math.max(loY, state.h - it.h / 2 - 10)
        it.y = clamp(it.y, loY, hiY)
        return it
      }
      function textPose(it) {
        if (state.tool.kind === 'adjust') return { dx: 0, dy: 0, rot: 0, scale: 1 }
        let dx = 0
        let dy = 0
        let rot = 0
        let scale = 1
        if (state.mode === 'magic' && !state.reduced) {
          const t = state.time
          dx = Math.sin(t * 0.6 + it.phase) * 5
          dy = Math.cos(t * 0.72 + it.phase) * 4
          rot = Math.sin(t * 0.42 + it.phase) * 0.03
        }
        if (it.popStart !== null) {
          const q = (state.time - it.popStart) / 0.6
          if (q >= 1) it.popStart = null
          else if (q >= 0) {
            scale = 1 + Math.sin(Math.PI * q) * 0.22
            dy -= Math.sin(Math.PI * q) * 12
          }
        }
        return { dx, dy, rot, scale }
      }
      function drawTexts(g) {
        for (const it of state.texts) {
          const pose = textPose(it)
          g.save()
          g.translate(it.x + pose.dx, it.y + pose.dy)
          g.rotate(pose.rot)
          g.scale(pose.scale, pose.scale)
          g.font = '700 ' + it.size + 'px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
          g.textAlign = 'center'
          g.textBaseline = 'middle'
          g.lineJoin = 'round'
          g.lineWidth = Math.max(2, it.size * 0.15)
          g.strokeStyle = 'rgba(255, 255, 255, .78)'
          g.fillStyle = it.color
          const lines = it.lines && it.lines.length ? it.lines : [it.text]
          const lh = it.lineHeight || it.size * 1.18
          const startY = -((lines.length - 1) * lh) / 2
          for (let i = 0; i < lines.length; i++) {
            const ly = startY + i * lh
            g.strokeText(lines[i], 0, ly)
            g.fillText(lines[i], 0, ly)
          }
          g.restore()
        }
      }
      function textAt(p) {
        for (let i = state.texts.length - 1; i >= 0; i--) {
          const it = state.texts[i]
          const hw = Math.max(it.size * 0.8, (it.w || 0) / 2) + 8
          const hh = Math.max(it.size * 0.75, (it.h || 0) / 2) + 6
          if (Math.abs(p.x - it.x) <= hw && Math.abs(p.y - it.y) <= hh) return it
        }
        return null
      }
      function drawParticles(g) {
        for (const p of state.sparks) {
          const a = clamp(p.life / p.total, 0, 1)
          g.save()
          g.globalAlpha = p.kind === 'spark' ? a : a * 0.95
          g.fillStyle = p.color
          g.translate(p.x, p.y)
          g.rotate(p.rot)
          if (p.kind === 'spark') {
            const s = p.size
            g.beginPath()
            g.moveTo(0, -s * 1.7)
            g.quadraticCurveTo(s * 0.35, -s * 0.35, s * 1.7, 0)
            g.quadraticCurveTo(s * 0.35, s * 0.35, 0, s * 1.7)
            g.quadraticCurveTo(-s * 0.35, s * 0.35, -s * 1.7, 0)
            g.quadraticCurveTo(-s * 0.35, -s * 0.35, 0, -s * 1.7)
            g.fill()
          } else {
            g.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66)
          }
          g.restore()
        }
        g.globalAlpha = 1
      }

      // ---- 放大镜 ----
      function drawLoupe(g) {
        const L = state.loupe
        const R = 100
        const Z = L.zoom
        // 镜片里的内容：把场景以镜心为中心放大，重新画一遍（不会把镜子自己画进去）
        g.save()
        g.beginPath()
        g.arc(L.x, L.y, R, 0, Math.PI * 2)
        g.clip()
        g.translate(L.x, L.y)
        g.scale(Z, Z)
        g.translate(-L.x, -L.y)
        g.drawImage(state.bg, 0, 0, state.w, state.h)
        drawAmbient(g)
        drawStrokes(g)
        drawStickers(g)
        drawTexts(g)
        if (state.mode === 'game') drawGameStars(g)
        drawParticles(g)
        drawSelection(g)
        g.restore()

        // 镜框（白圈 + 阴影）
        g.save()
        g.beginPath()
        g.arc(L.x, L.y, R, 0, Math.PI * 2)
        g.shadowColor = 'rgba(18, 28, 58, .35)'
        g.shadowBlur = 26
        g.shadowOffsetY = 10
        g.strokeStyle = 'rgba(255, 255, 255, .96)'
        g.lineWidth = 9
        g.stroke()
        g.restore()

        // 内圈细线 + 玻璃反光
        g.save()
        g.beginPath()
        g.arc(L.x, L.y, R, 0, Math.PI * 2)
        g.strokeStyle = 'rgba(110, 135, 175, .55)'
        g.lineWidth = 1.6
        g.stroke()
        g.beginPath()
        g.arc(L.x, L.y, R - 14, Math.PI * 1.06, Math.PI * 1.34)
        g.strokeStyle = 'rgba(255, 255, 255, .62)'
        g.lineWidth = 7
        g.lineCap = 'round'
        g.stroke()
        g.restore()
      }
      function setLoupe(on) {
        const next = !!on
        if (next === state.loupe.active) return
        state.loupe.active = next
        if (next) {
          state.loupe.x = state.w / 2
          state.loupe.y = state.h / 2
          state.hover = null
        }
        canvas.dataset.loupe = next ? '1' : '0'
      }
      function setLoupeZoom(z) {
        const next = clamp(Number(z) || 2.5, 1.5, 4)
        state.loupe.zoom = next
      }

      // ---- 绘制 ----
      function draw() {
        const g = canvas.getContext('2d')
        if (!g || !state.w) return
        g.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
        g.clearRect(0, 0, state.w, state.h)
        g.drawImage(state.bg, 0, 0, state.w, state.h)
        drawAmbient(g)
        drawStrokes(g)
        drawStickers(g)
        drawTexts(g)
        if (state.mode === 'game') drawGameStars(g)
        drawParticles(g)
        if (state.hover && !state.loupe.active && state.mode === 'draw' && (state.tool.kind === 'eraser' || state.tool.kind === 'fineEraser')) drawEraserRing(g)
        if (state.loupe.active) drawLoupe(g)
      }
      function drawStrokes(g) {
        const magic = state.mode === 'magic'
        const alpha = state.mode === 'game' ? 0.28 : 1
        for (const s of state.strokes) {
          if (!s.path) continue
          const pose = strokePose(s, magic)
          // 渐变在未变换的坐标系里建好，再随笔画一起做魔法位移
          const paint = s.rainbow ? (s.grad || (s.grad = rainbowFor(g, s))) : s.color
          g.save()
          g.globalAlpha = alpha
          g.lineWidth = s.size
          g.lineCap = 'round'
          g.lineJoin = 'round'
          if (magic && !state.reduced && state.strokes.length < 140) {
            g.shadowColor = s.rainbow ? 'rgba(180,150,255,.5)' : hexToRgba(s.color, 0.45)
            g.shadowBlur = 7
          }
          g.translate(s.center.x + pose.dx, s.center.y + pose.dy)
          g.rotate(pose.rot)
          g.scale(pose.scale, pose.scale)
          g.translate(-s.center.x, -s.center.y)
          g.strokeStyle = paint
          g.stroke(s.path)
          g.restore()
        }
        g.globalAlpha = 1
      }
      function drawStickers(g) {
        for (const st of state.stickers) {
          const pose = stickerPose(st)
          g.save()
          g.translate(pose.x, pose.y)
          g.rotate(pose.rot)
          g.scale(pose.flip * pose.scale, pose.scale)
          drawStickerBody(g, st.kind, st.size)
          g.restore()
        }
      }
      function drawGameStars(g) {
        for (const st of state.gameStars) {
          const p = starPos(st)
          const pulse = 1 + Math.sin(state.time * 3 + st.phase) * 0.06
          g.save()
          g.shadowColor = 'rgba(255, 208, 90, .95)'
          g.shadowBlur = 26
          drawStarShape(g, p.x, p.y, st.r * pulse)
          g.restore()
          g.save()
          g.globalAlpha = 0.45 + 0.4 * Math.abs(Math.sin(state.time * 4 + st.phase))
          g.strokeStyle = 'rgba(255, 244, 180, .9)'
          g.lineWidth = 2
          g.beginPath()
          g.arc(p.x, p.y, st.r * 1.3, 0, Math.PI * 2)
          g.stroke()
          g.restore()
        }
      }

      // ---- 尺寸 ----
      function scaleScene(sx, sy) {
        const s = (sx + sy) / 2
        for (const st of state.strokes) {
          for (const p of st.pts) {
            p.x *= sx
            p.y *= sy
          }
          st.size = Math.max(2, st.size * s)
          refreshStroke(st)
        }
        for (const st of state.stickers) {
          st.x *= sx
          st.y *= sy
          st.size *= s
          if (st.baseSize) st.baseSize *= s
        }
        for (const it of state.texts) {
          it.x *= sx
          it.y *= sy
          it.size *= s
          it.baseSize *= s
        }
        for (const st of state.gameStars) {
          st.baseX *= sx
          st.baseY *= sy
          st.r *= s
          st.ampX *= sx
          st.ampY *= sy
        }
        for (const p of state.sparks) {
          p.x *= sx
          p.y *= sy
        }
      }
      function resize() {
        const rect = root.getBoundingClientRect()
        let w = Math.round(rect.width)
        let hgt = Math.round(rect.height)
        if (!w || !hgt) {
          w = Math.round(canvas.clientWidth)
          hgt = Math.round(canvas.clientHeight)
        }
        if (!w || !hgt) return
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        if (w === state.w && hgt === state.h && dpr === state.dpr) return
        const sx = state.w ? w / state.w : 1
        const sy = state.h ? hgt / state.h : 1
        if (state.w && (Math.abs(sx - 1) > 0.001 || Math.abs(sy - 1) > 0.001)) scaleScene(sx, sy)
        state.w = w
        state.h = hgt
        state.dpr = dpr
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(hgt * dpr)
        for (const it of state.texts) layoutText(it)
        paintBackground()
        if (opts.onSize) opts.onSize(state.w, state.h)
      }

      // ---- 历史 / 状态 ----
      function afterChange() {
        if (opts.onHistory) opts.onHistory(state.history.length > 0)
        if (opts.onArt) opts.onArt(state.strokes.length + state.stickers.length + state.texts.length > 0)
        if (opts.onChange) opts.onChange()
      }
      function pushHistory(entry) {
        state.history.push(entry)
        if (state.history.length > 60) state.history.shift()
      }
      function finalizeStroke(s) {
        if (!state.strokes.includes(s)) state.strokes.push(s)
        refreshStroke(s)
        pushHistory({ type: 'stroke', value: s })
        afterChange()
        if (opts.sfx) opts.sfx.draw()
        if (!state.drawnHinted) {
          state.drawnHinted = true
          if (opts.onSay) opts.onSay('hintDrawn')
        }
      }
      function undo() {
        if (!state.history.length) return false
        const entry = state.history.pop()
        if (entry.type === 'stroke') {
          state.strokes = state.strokes.filter((s) => s.id !== entry.value.id)
        } else if (entry.type === 'sticker') {
          state.stickers = state.stickers.filter((s) => s.id !== entry.value.id)
        } else if (entry.type === 'text') {
          state.texts = state.texts.filter((t) => t.id !== entry.value.id)
        } else if (entry.type === 'erase') {
          for (const it of entry.value) {
            if (it.type === 'stroke') state.strokes.push(it.value)
            else if (it.type === 'text') state.texts.push(it.value)
            else state.stickers.push(it.value)
          }
        } else if (entry.type === 'fine') {
          state.strokes = entry.value.strokes
          state.stickers = entry.value.stickers
          state.texts = entry.value.texts
        } else if (entry.type === 'new') {
          state.strokes = entry.value.strokes
          state.stickers = entry.value.stickers
          state.texts = entry.value.texts
        } else if (entry.type === 'move') {
          entry.value.sticker.x = entry.value.before.x
          entry.value.sticker.y = entry.value.before.y
        } else if (entry.type === 'resize') {
          entry.value.sticker.size = entry.value.before
          if (entry.value.sticker.text) layoutText(entry.value.sticker)
        } else if (entry.type === 'clear') {
          state.strokes = entry.value.strokes
          state.stickers = entry.value.stickers
          state.texts = entry.value.texts
        }
        afterChange()
        if (state.selected) emitSelection()
        return true
      }
      function newCanvas() {
        clearSelection()
        // 收掉还没结束的笔画
        if (state.live.size) {
          for (const st of state.live.values()) finalizeStroke(st)
          state.live.clear()
        }
        const hasArt = state.strokes.length + state.stickers.length + state.texts.length > 0
        state.score = 0
        state.catches = 0
        if (opts.onScore) opts.onScore(0)
        if (hasArt) {
          const archive = { strokes: state.strokes.slice(), stickers: state.stickers.slice(), texts: state.texts.slice() }
          state.strokes = []
          state.stickers = []
          state.texts = []
          state.sparks.length = 0
          // 旧的一张留作唯一一步撤销，给按错的小孩留个后路
          state.history = [{ type: 'new', value: archive }]
          confetti(state.w / 2, state.h * 0.36, 26)
          if (opts.sfx) opts.sfx.clear()
          if (opts.onSay) opts.onSay('hintNew')
        } else {
          state.history = []
          if (opts.onSay) opts.onSay('hintNewEmpty')
        }
        afterChange()
      }
      function clear() {
        clearSelection()
        if (!state.strokes.length && !state.stickers.length && !state.texts.length) return
        pushHistory({ type: 'clear', value: { strokes: state.strokes.slice(), stickers: state.stickers.slice(), texts: state.texts.slice() } })
        state.strokes = []
        state.stickers = []
        state.texts = []
        for (let i = 0; i < 5; i++) confetti(state.w * (0.2 + i * 0.15), state.h * 0.42, 9)
        if (opts.sfx) opts.sfx.clear()
        if (opts.onSay) opts.onSay('hintClear')
        afterChange()
      }
      function saveImage() {
        try {
          const url = canvas.toDataURL('image/png')
          const now = new Date()
          const pad = (n) => String(n).padStart(2, '0')
          const a = document.createElement('a')
          a.href = url
          a.download = 'kids-canvas-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + pad(now.getHours()) + pad(now.getMinutes()) + '.png'
          a.click()
          if (opts.sfx) opts.sfx.save()
          if (opts.onSay) opts.onSay('hintSaved')
          return true
        } catch {
          if (opts.onSay) opts.onSay('hintSaveFail')
          return false
        }
      }

      // ---- 涂鸦 / 擦除 / 交互 ----
      function localPoint(e) {
        const r = canvas.getBoundingClientRect()
        return { x: e.clientX - r.left, y: e.clientY - r.top }
      }
      function paint(p) {
        const st = makeStroke(p, state.tool)
        state.strokes.push(st)
        // 小朋友可以一直画：超出上限时丢掉最早的一笔，避免越画越卡
        if (state.strokes.length > 800) state.strokes.shift()
        return st
      }
      function addPoint(s, p) {
        const last = s.pts[s.pts.length - 1]
        if (last && Math.hypot(p.x - last.x, p.y - last.y) < 1.6) return
        s.pts.push(p)
        refreshStroke(s)
      }
      function eraseAt(p) {
        const gone = []
        for (let i = state.strokes.length - 1; i >= 0; i--) {
          if (nearStroke(state.strokes[i], p, 14)) {
            gone.push({ type: 'stroke', value: state.strokes[i] })
            state.strokes.splice(i, 1)
          }
        }
        for (let i = state.stickers.length - 1; i >= 0; i--) {
          const st = state.stickers[i]
          const pose = stickerPose(st)
          if (Math.hypot(p.x - pose.x, p.y - pose.y) < st.size * 0.6) {
            gone.push({ type: 'sticker', value: st })
            state.stickers.splice(i, 1)
            if (state.selected === st) clearSelection()
          }
        }
        for (let i = state.texts.length - 1; i >= 0; i--) {
          if (textAt(p) === state.texts[i]) {
            gone.push({ type: 'text', value: state.texts[i] })
            if (state.selected === state.texts[i]) clearSelection()
            state.texts.splice(i, 1)
          }
        }
        if (!gone.length) return
        pushHistory({ type: 'erase', value: gone })
        burst(p.x, p.y, ['#e9f1fb', '#ffffff', '#ffd93d'], 5, 90)
        if (opts.sfx) opts.sfx.erase()
        if (!state.eraseSaid) {
          state.eraseSaid = true
          if (opts.onSay) opts.onSay('hintErase')
        }
        afterChange()
      }
      function makeFrag(src, pts) {
        const frag = {
          id: ++seq,
          pts: pts.slice(),
          color: src.color,
          size: src.size,
          rainbow: src.rainbow,
          path: null,
          bbox: null,
          center: null,
          phase: rand(0, Math.PI * 2),
          spd: rand(0.8, 1.3),
          popStart: null,
          grad: null,
        }
        refreshStroke(frag)
        return frag
      }
      // 精细橡皮：把碰到的那一小段从笔画里抠掉，剩下的点各自成段
      function fineEraseAt(p, feedback) {
        const batch = state.fineBatch
        if (!batch) return
        const radius = 12
        let changed = false
        for (let i = state.strokes.length - 1; i >= 0; i--) {
          const s = state.strokes[i]
          const lim = radius + s.size / 2
          let touched = false
          const runs = []
          let cur = []
          for (const pt of s.pts) {
            if (Math.hypot(pt.x - p.x, pt.y - p.y) <= lim) {
              touched = true
              if (cur.length >= 2) runs.push(cur)
              cur = []
            } else {
              cur.push(pt)
            }
          }
          if (!touched) continue
          if (cur.length >= 2) runs.push(cur)
          state.strokes.splice(i, 1)
          for (const run of runs) state.strokes.push(makeFrag(s, run))
          changed = true
        }
        for (let i = state.stickers.length - 1; i >= 0; i--) {
          const st = state.stickers[i]
          const pose = stickerPose(st)
          if (Math.hypot(p.x - pose.x, p.y - pose.y) < st.size * 0.6) {
            state.stickers.splice(i, 1)
            if (state.selected === st) clearSelection()
            changed = true
          }
        }
        for (let i = state.texts.length - 1; i >= 0; i--) {
          const it = state.texts[i]
          const hw = Math.max(it.size * 0.8, (it.w || 0) / 2) + 6
          const hh = it.size * 0.75 + 6
          if (Math.abs(p.x - it.x) <= hw && Math.abs(p.y - it.y) <= hh) {
            if (state.selected === it) clearSelection()
            state.texts.splice(i, 1)
            changed = true
          }
        }
        if (!changed) return
        batch.changed = true
        if (feedback) {
          burst(p.x, p.y, ['#eef4ff', '#ffffff'], 4, 80)
          if (opts.sfx) opts.sfx.erase()
        }
      }
      function addText(x, y, text) {
        const value = String(text || '').trim().slice(0, 40)
        if (!value) return false
        const size = clamp(Math.round(state.tool.size * 2.2), 18, 64)
        const item = {
          id: ++seq,
          text: value,
          x,
          y,
          size,
          baseSize: size,
          color: state.tool.color,
          phase: rand(0, Math.PI * 2),
          popStart: null,
          w: 0,
          h: 0,
          lines: [],
          lineHeight: size * 1.18,
        }
        layoutText(item)
        state.texts.push(item)
        pushHistory({ type: 'text', value: item })
        burst(x, y - size * 0.4, ['#ffd93d', '#ffffff'], 5, 70)
        if (opts.sfx) opts.sfx.pop()
        afterChange()
        return true
      }
      function placeStamp(p) {
        const kind = state.tool.stamp || 'star'
        const base = STAMP_SIZE[kind] || 58
        const st = {
          id: ++seq,
          kind,
          baseSize: base,
          size: clamp(base * state.stampScale, 12, 240),
          x: p.x,
          y: p.y,
          phase: rand(0, Math.PI * 2),
          popStart: null,
        }
        state.stickers.push(st)
        if (state.stickers.length > 200) {
          const dropped = state.stickers.shift()
          if (state.selected === dropped) clearSelection()
        }
        pushHistory({ type: 'sticker', value: st })
        burst(p.x, p.y, [PARTY[randInt(0, PARTY.length - 1)], '#ffffff'], 7, 110)
        if (opts.sfx) opts.sfx.pop()
        state.stampSaid += 1
        if (state.stampSaid <= 2 && opts.onSay) opts.onSay('hintSticker')
        afterChange()
      }
      function poke(p) {
        const hitText = textAt(p)
        if (hitText) {
          hitText.popStart = state.time
          burst(hitText.x, hitText.y - hitText.size * 0.3, ['#ffd93d', '#ffffff', hitText.color], 12, 190)
          if (opts.sfx) opts.sfx.pop()
          return true
        }
        for (let i = state.stickers.length - 1; i >= 0; i--) {
          const st = state.stickers[i]
          const pose = stickerPose(st)
          if (Math.hypot(p.x - pose.x, p.y - pose.y) < st.size * 0.58) {
            st.popStart = state.time
            burst(pose.x, pose.y, ['#ff8ad8', '#ffd93d', '#9b6bff', '#ffffff'], 12, 200)
            if (opts.sfx) opts.sfx.pop()
            return true
          }
        }
        for (let i = state.strokes.length - 1; i >= 0; i--) {
          const s = state.strokes[i]
          if (nearStroke(s, p, 16)) {
            s.popStart = state.time
            const cx = s.center.x + (p.x - s.center.x) * 0.3
            const cy = s.center.y + (p.y - s.center.y) * 0.3
            burst(cx, cy, [s.color, '#ffffff', '#ffd93d'], 10, 190)
            if (opts.sfx) opts.sfx.tap(randInt(0, 9))
            return true
          }
        }
        burst(p.x, p.y, ['#ffffff', '#ffe9a8'], 3, 60)
        if (opts.sfx) opts.sfx.tap(randInt(0, 9))
        return false
      }
      function tapStar(p) {
        for (const st of state.gameStars) {
          const q = starPos(st)
          if (Math.hypot(p.x - q.x, p.y - q.y) < st.r + 18) {
            burst(q.x, q.y, ['#ffd93d', '#fff3c4', '#ffb03a', '#ffffff'], 18, 240)
            confetti(q.x, q.y, 9)
            state.catches += 1
            state.score += 1
            if (opts.onScore) opts.onScore(state.score)
            if (opts.sfx) opts.sfx.catchStar(state.catches)
            const idx = state.gameStars.indexOf(st)
            if (idx >= 0) state.gameStars[idx] = newStar()
            if (state.catches % 5 === 0) {
              if (opts.sfx) opts.sfx.cheer()
              confetti(state.w / 2, state.h * 0.32, 56)
              if (opts.onCelebrate) opts.onCelebrate(state.score)
            }
            return
          }
        }
        burst(p.x, p.y, ['#fff3c4', '#ffffff'], 4, 80)
        if (opts.sfx) opts.sfx.tap(randInt(0, 9))
      }

      // ---- 贴纸调整 ----
      function objectAt(p) {
        return textAt(p) || stickerAt(p)
      }
      function stickerAt(p) {
        for (let i = state.stickers.length - 1; i >= 0; i--) {
          const st = state.stickers[i]
          const pose = stickerPose(st)
          if (Math.hypot(p.x - pose.x, p.y - pose.y) <= st.size * 0.62) return st
        }
        return null
      }
      function emitSelection() {
        if (!opts.onSelectRatio) return
        const st = state.selected
        opts.onSelectRatio(st ? clamp(st.size / (st.baseSize || st.size), 0.5, 1.8) : null)
      }
      function selectSticker(st) {
        state.selected = st || null
        emitSelection()
      }
      function clearSelection() {
        if (!state.selected) return
        state.selected = null
        emitSelection()
      }
      function setStampScale(mult) {
        state.stampScale = clamp(Number(mult) || 1, 0.5, 1.8)
      }
      function resizeSelectedTo(mult) {
        const st = state.selected
        if (!st) return false
        const base = st.baseSize || st.size
        const target = clamp(base * clamp(Number(mult) || 1, 0.5, 1.8), 12, 240)
        if (Math.abs(target - st.size) < 0.5) return false
        const before = st.size
        st.size = target
        if (st.text) layoutText(st)
        pushHistory({ type: 'resize', value: { sticker: st, before, after: target } })
        afterChange()
        emitSelection()
        return true
      }

      // ---- 指针事件 ----
      function onPointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        e.preventDefault()
        if (opts.sfx) opts.sfx.unlock()
        if (opts.trackEyes) opts.trackEyes(e.clientX, e.clientY)
        const p = localPoint(e)
        if (state.loupe.active) {
          state.loupe.x = p.x
          state.loupe.y = p.y
          if (opts.sfx) opts.sfx.draw()
          return
        }
        if (state.mode === 'draw' && state.tool.kind === 'text') {
          if (opts.onTextPoint) opts.onTextPoint(p.x, p.y)
          return
        }
        if (state.mode === 'draw' && state.tool.kind === 'adjust') {
          if (state.adjustDrag) return
          const hit = objectAt(p)
          selectSticker(hit)
          if (hit) {
            state.adjustDrag = {
              pointerId: e.pointerId,
              sticker: hit,
              dx: p.x - hit.x,
              dy: p.y - hit.y,
              sx: hit.x,
              sy: hit.y,
              moved: false,
            }
            try { canvas.setPointerCapture(e.pointerId) } catch {}
            if (opts.sfx) opts.sfx.pop()
          }
          return
        }
        if (state.mode === 'game') {
          tapStar(p)
          return
        }
        if (state.mode === 'magic') {
          poke(p)
          return
        }
        if (state.tool.kind === 'eraser' || state.tool.kind === 'fineEraser') {
          if (state.erasing !== null) return
          // 另一只手还在画的那一笔先收尾，免得被擦成孤儿笔画
          if (state.live.size) {
            for (const live of state.live.values()) finalizeStroke(live)
            state.live.clear()
          }
          state.erasing = e.pointerId
          state.eraseSaid = false
          state.hover = p
          if (state.tool.kind === 'fineEraser') {
            state.fineBatch = {
              snapshot: { strokes: state.strokes.slice(), stickers: state.stickers.slice(), texts: state.texts.slice() },
              changed: false,
            }
            fineEraseAt(p, true)
          } else {
            eraseAt(p)
          }
          return
        }
        if (state.tool.kind === 'stamp') {
          placeStamp(p)
          return
        }
        const st = paint(p)
        state.live.set(e.pointerId, st)
        try { canvas.setPointerCapture(e.pointerId) } catch {}
      }
      function onPointerMove(e) {
        if (opts.trackEyes) opts.trackEyes(e.clientX, e.clientY)
        const p = localPoint(e)
        if (state.loupe.active) {
          state.loupe.x = p.x
          state.loupe.y = p.y
          return
        }
        if (state.adjustDrag && state.adjustDrag.pointerId === e.pointerId) {
          const d = state.adjustDrag
          let nx = p.x - d.dx
          let ny = p.y - d.dy
          if (d.sticker.text) {
            const hw = Math.max(8, (d.sticker.w || d.sticker.size) / 2)
            const hh = Math.max(8, (d.sticker.h || d.sticker.size) / 2)
            const loX = Math.min(hw + 4, state.w / 2)
            const hiX = Math.max(loX, state.w - hw - 4)
            const loY = Math.min(hh + 4, state.h / 2)
            const hiY = Math.max(loY, state.h - hh - 4)
            nx = clamp(nx, loX, hiX)
            ny = clamp(ny, loY, hiY)
          }
          if (Math.abs(nx - d.sx) + Math.abs(ny - d.sy) > 2) d.moved = true
          d.sticker.x = nx
          d.sticker.y = ny
          return
        }
        if (state.mode === 'draw' && (state.tool.kind === 'eraser' || state.tool.kind === 'fineEraser')) state.hover = p
        else if (state.hover) state.hover = null
        const st = state.live.get(e.pointerId)
        if (st) {
          addPoint(st, p)
          return
        }
        if (state.erasing === e.pointerId) {
          if (state.tool.kind === 'fineEraser') fineEraseAt(p, false)
          else eraseAt(p)
        }
      }
      function onPointerLeave() {
        state.hover = null
      }
      function onPointerUp(e) {
        if (state.adjustDrag && state.adjustDrag.pointerId === e.pointerId) {
          const d = state.adjustDrag
          if (d.moved) {
            pushHistory({ type: 'move', value: { sticker: d.sticker, before: { x: d.sx, y: d.sy }, after: { x: d.sticker.x, y: d.sticker.y } } })
            afterChange()
          }
          state.adjustDrag = null
          try { canvas.releasePointerCapture(e.pointerId) } catch {}
          return
        }
        const st = state.live.get(e.pointerId)
        if (st) {
          state.live.delete(e.pointerId)
          finalizeStroke(st)
          try { canvas.releasePointerCapture(e.pointerId) } catch {}
        }
        if (state.erasing === e.pointerId) {
          if (state.fineBatch) {
            if (state.fineBatch.changed) {
              pushHistory({ type: 'fine', value: state.fineBatch.snapshot })
              afterChange()
            }
            state.fineBatch = null
          }
          state.erasing = null
          state.eraseSaid = false
        }
      }
      function prevent(e) { e.preventDefault() }
      function onVisibility() {
        if (document.hidden) stop()
        else if (!state.disposed) start()
      }

      // ---- 循环 ----
      function step(dt) {
        state.time += dt
        stepParticles(dt)
      }
      function frame(ts) {
        if (!state.running) return
        const dt = Math.min(0.05, Math.max(0, (ts - state.last) / 1000))
        state.last = ts
        step(dt)
        draw()
        state.raf = window.requestAnimationFrame(frame)
      }
      function start() {
        if (state.running || state.disposed) return
        state.running = true
        state.last = performance.now()
        state.raf = window.requestAnimationFrame(frame)
      }
      function stop() {
        state.running = false
        if (state.raf) window.cancelAnimationFrame(state.raf)
        state.raf = 0
      }

      // ---- 对外 ----
      function init() {
        state.reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        state.bgStars = []
        for (let i = 0; i < 64; i++) {
          state.bgStars.push({
            x: ((i * 37) % 100) / 100,
            y: (((i * 61) % 74) + 4) / 100,
            r: 0.7 + ((i * 13) % 10) / 7,
            phase: (i * 0.7) % 6.28,
            spd: 0.5 + ((i * 17) % 10) / 9,
          })
        }
        resize()
        state.ro = new ResizeObserver(resize)
        state.ro.observe(root)
        canvas.addEventListener('pointerdown', onPointerDown)
        canvas.addEventListener('pointermove', onPointerMove)
        canvas.addEventListener('pointerup', onPointerUp)
        canvas.addEventListener('pointercancel', onPointerUp)
        canvas.addEventListener('pointerleave', onPointerLeave)
        canvas.addEventListener('contextmenu', prevent)
        window.addEventListener('pointerup', onPointerUp)
        document.addEventListener('visibilitychange', onVisibility)
        window.addEventListener('pagehide', flush)
        start()
      }
      function flush() {
        if (opts.onFlush) opts.onFlush()
      }
      function destroy() {
        if (state.disposed) return
        flush()
        state.disposed = true
        stop()
        if (state.ro) {
          try { state.ro.disconnect() } catch {}
        }
        canvas.removeEventListener('pointerdown', onPointerDown)
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerup', onPointerUp)
        canvas.removeEventListener('pointercancel', onPointerUp)
        canvas.removeEventListener('pointerleave', onPointerLeave)
        canvas.removeEventListener('contextmenu', prevent)
        window.removeEventListener('pointerup', onPointerUp)
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pagehide', flush)
        state.live.clear()
        state.fineBatch = null
        state.adjustDrag = null
        state.selected = null
        state.strokes = []
        state.stickers = []
        state.texts = []
        state.sparks = []
        state.gameStars = []
      }
      function setNight(v) {
        const next = !!v
        if (next === state.night) return
        state.night = next
        if (state.w) paintBackground()
      }
      function setScene(id) {
        let key = 'space'
        let color = null
        if (typeof id === 'string' && id.indexOf('solid:') === 0) {
          const c = id.slice(6)
          if (!/^#[0-9a-f]{6}$/i.test(c)) return
          key = 'solid'
          color = c
        } else if (SCENE_IDS.indexOf(id) >= 0) {
          key = id
        }
        if (key === state.scene && (key !== 'solid' || color === state.bgColor)) return
        state.scene = key
        if (color) state.bgColor = color
        if (state.w) paintBackground()
        if (opts.sfx) opts.sfx.pop()
      }
      function setMode(next) {
        if (next !== 'draw' && next !== 'magic' && next !== 'game') return
        if (next === state.mode) return
        for (const st of state.live.values()) finalizeStroke(st)
        state.live.clear()
        state.mode = next
        if (next !== 'draw') clearSelection()
        canvas.dataset.mode = next
        if (next === 'magic') {
          const hasArt = state.strokes.length + state.stickers.length > 0
          if (opts.onSay) opts.onSay(hasArt ? 'hintMagic' : 'hintStart')
        }
        if (next === 'game') {
          ensureGameStars()
          if (opts.onSay) opts.onSay('hintGame')
        }
        if (opts.onChange) opts.onChange()
      }
      function setTool(next) {
        state.tool = {
          kind: next.kind || 'brush',
          color: next.color || COLORS[0].value,
          size: next.size || 15,
          rainbow: !!next.rainbow,
          stamp: next.stamp || null,
        }
        canvas.dataset.tool = state.tool.kind
        if (state.tool.kind !== 'adjust') clearSelection()
        if (state.tool.kind !== 'eraser' && state.tool.kind !== 'fineEraser') state.hover = null
      }

      // ---- 存档 ----
      function serialize() {
        const strokes = state.strokes.slice(-280).map((s) => ({
          c: s.color,
          z: Math.round(s.size * 10) / 10,
          r: s.rainbow ? 1 : 0,
          p: s.pts.map((p) => [Math.round(p.x * 10) / 10, Math.round(p.y * 10) / 10]),
        }))
        const stickers = state.stickers.slice(-140).map((s) => ({
          k: s.kind,
          x: Math.round(s.x),
          y: Math.round(s.y),
          s: Math.round(s.size),
          ph: Math.round(s.phase * 100) / 100,
        }))
        const texts = state.texts.slice(-80).map((t) => ({
          t: t.text,
          x: Math.round(t.x),
          y: Math.round(t.y),
          s: Math.round(t.size),
          c: t.color,
        }))
        return { v: 1, w: Math.round(state.w), h: Math.round(state.h), strokes, stickers, texts }
      }
      function load(data) {
        if (!data || data.v !== 1) return false
        const sx = data.w ? state.w / data.w : 1
        const sy = data.h ? state.h / data.h : 1
        let count = 0
        const strokes = Array.isArray(data.strokes) ? data.strokes : []
        for (const raw of strokes) {
          if (!raw || !Array.isArray(raw.p) || !raw.p.length) continue
          const pts = []
          for (const pair of raw.p) {
            if (!Array.isArray(pair) || pair.length < 2) continue
            const x = Number(pair[0])
            const y = Number(pair[1])
            if (!isFinite(x) || !isFinite(y)) continue
            pts.push({ x: x * sx, y: y * sy })
          }
          if (!pts.length) continue
          const st = {
            id: ++seq,
            pts,
            color: typeof raw.c === 'string' ? raw.c : COLORS[0].value,
            size: Math.max(2, (Number(raw.z) || 15) * ((sx + sy) / 2)),
            rainbow: !!raw.r,
            path: null,
            bbox: null,
            center: null,
            phase: rand(0, Math.PI * 2),
            spd: rand(0.8, 1.3),
            popStart: null,
            grad: null,
          }
          refreshStroke(st)
          state.strokes.push(st)
          count += 1
        }
        const stickers = Array.isArray(data.stickers) ? data.stickers : []
        for (const raw of stickers) {
          if (!raw || !STAMP_SIZE[raw.k]) continue
          const x = Number(raw.x)
          const y = Number(raw.y)
          if (!isFinite(x) || !isFinite(y)) continue
          state.stickers.push({
            id: ++seq,
            kind: raw.k,
            baseSize: STAMP_SIZE[raw.k],
            size: Math.max(20, (Number(raw.s) || STAMP_SIZE[raw.k]) * ((sx + sy) / 2)),
            x: x * sx,
            y: y * sy,
            phase: Number(raw.ph) || rand(0, Math.PI * 2),
            popStart: null,
          })
          count += 1
        }
        const texts = Array.isArray(data.texts) ? data.texts : []
        for (const raw of texts) {
          if (!raw || typeof raw.t !== 'string' || !raw.t.trim()) continue
          const x = Number(raw.x)
          const y = Number(raw.y)
          if (!isFinite(x) || !isFinite(y)) continue
          const size = Math.max(12, (Number(raw.s) || 30) * ((sx + sy) / 2))
          const item = {
            id: ++seq,
            text: raw.t.slice(0, 40),
            x: x * sx,
            y: y * sy,
            size,
            baseSize: size,
            color: typeof raw.c === 'string' ? raw.c : COLORS[0].value,
            phase: rand(0, Math.PI * 2),
            popStart: null,
            w: 0,
            h: 0,
            lines: [],
            lineHeight: size * 1.18,
          }
          layoutText(item)
          state.texts.push(item)
          count += 1
        }
        if (count) afterChange()
        return count > 0
      }

      return {
        init,
        destroy,
        resize,
        setNight,
        setScene,
        setMode,
        setTool,
        setLoupe,
        setLoupeZoom,
        setStampScale,
        resizeSelectedTo,
        addText,
        undo,
        newCanvas,
        clear,
        saveImage,
        serialize,
        load,
        canUndo: () => state.history.length > 0,
        hasArt: () => state.strokes.length + state.stickers.length + state.texts.length > 0,
      }
    }

    // ---------------- 图标 ----------------
    function Glyph(props) {
      const name = props.name
      const size = props.size || 18
      const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        focusable: false,
      }
      if (name === 'pencil') {
        return h('svg', common,
          h('path', { d: 'M4.6 19.4l4.5-1.1L19.6 7.8a2.2 2.2 0 0 0-3.1-3.1L6 15.2 4.6 19.4z' }),
          h('path', { d: 'M14.8 6.2l3 3' }))
      }
      if (name === 'sparkle') {
        return h('svg', common,
          h('path', { d: 'M11 2.8l1.9 5.3 5.3 1.9-5.3 1.9L11 17.2 9.1 11.9 3.8 10l5.3-1.9z' }),
          h('path', { d: 'M18.4 15.6l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z' }))
      }
      if (name === 'star') {
        return h('svg', common, h('path', { d: 'M12 3.2l2.7 5.7 6.1.8-4.5 4.3 1.1 6.1L12 17.1l-5.4 3 1.1-6.1L3.2 9.7l6.1-.8z' }))
      }
      if (name === 'undo') {
        return h('svg', common,
          h('path', { d: 'M9.5 14.5L4 9l5.5-5.5' }),
          h('path', { d: 'M4.2 9h9.3a5.5 5.5 0 0 1 0 11H10' }))
      }
      if (name === 'sound') {
        return h('svg', common,
          h('path', { d: 'M4 9.5h3.2L11.7 6v12L7.2 14.5H4z' }),
          h('path', { d: 'M15 8.6a4.8 4.8 0 0 1 0 6.8' }),
          h('path', { d: 'M17.6 6a8.4 8.4 0 0 1 0 12' }))
      }
      if (name === 'muted') {
        return h('svg', common,
          h('path', { d: 'M4 9.5h3.2L11.7 6v12L7.2 14.5H4z' }),
          h('path', { d: 'M15.2 9.6l5 4.8' }),
          h('path', { d: 'M20.2 9.6l-5 4.8' }))
      }
      if (name === 'save') {
        return h('svg', common,
          h('path', { d: 'M12 4v9.6' }),
          h('path', { d: 'M8.2 10.2L12 14l3.8-3.8' }),
          h('path', { d: 'M4.6 17.6v1.2a1.6 1.6 0 0 0 1.6 1.6h11.6a1.6 1.6 0 0 0 1.6-1.6v-1.2' }))
      }
      if (name === 'trash') {
        return h('svg', common,
          h('path', { d: 'M4.6 7h14.8' }),
          h('path', { d: 'M9.6 7V4.8h4.8V7' }),
          h('path', { d: 'M6.8 7l.8 12.2h8.8L17.2 7' }),
          h('path', { d: 'M10.4 10.6v5.4' }),
          h('path', { d: 'M13.6 10.6v5.4' }))
      }
      if (name === 'text') {
        return h('svg', common,
          h('path', { d: 'M5 6.5h14' }),
          h('path', { d: 'M12 6.5v12.5' }),
          h('path', { d: 'M8.6 19h6.8' }))
      }
      if (name === 'check') {
        return h('svg', common,
          h('path', { d: 'M5 12.6l4.4 4.4L19 7.4' }))
      }
      if (name === 'move') {
        return h('svg', common,
          h('path', { d: 'M12 3v18' }),
          h('path', { d: 'M3 12h18' }),
          h('path', { d: 'M9 6l3-3 3 3' }),
          h('path', { d: 'M9 18l3 3 3-3' }),
          h('path', { d: 'M6 9l-3 3 3 3' }),
          h('path', { d: 'M18 9l3 3-3 3' }))
      }
      if (name === 'newPage') {
        return h('svg', common,
          h('path', { d: 'M6 3.4h7.2L18 8.2v12.4H6z' }),
          h('path', { d: 'M13 3.6V8.4h4.8' }),
          h('path', { d: 'M12 11.6v5.2' }),
          h('path', { d: 'M9.4 14.2h5.2' }))
      }
      if (name === 'search') {
        return h('svg', common,
          h('circle', { cx: 10.6, cy: 10.6, r: 6.4 }),
          h('path', { d: 'M15.4 15.4L20 20' }))
      }
      if (name === 'plus') {
        return h('svg', common,
          h('path', { d: 'M12 5v14' }),
          h('path', { d: 'M5 12h14' }))
      }
      if (name === 'minus') {
        return h('svg', common, h('path', { d: 'M5 12h14' }))
      }
      if (name === 'close') {
        return h('svg', common,
          h('path', { d: 'M6 6l12 12' }),
          h('path', { d: 'M18 6L6 18' }))
      }
      if (name === 'eraser') {
        return h('svg', common,
          h('path', { d: 'M8.2 15.9l7.6-7.6a2.4 2.4 0 0 1 3.4 3.4l-7.6 7.6H8.2z' }),
          h('path', { d: 'M12.4 11.7l4 4' }),
          h('path', { d: 'M4.8 20.2h14.4' }))
      }
      return null
    }

    function BrandMark() {
      return h('svg', { width: 26, height: 26, viewBox: '0 0 32 32', 'aria-hidden': true, focusable: false },
        h('rect', { x: 1, y: 1, width: 30, height: 30, rx: 10, fill: '#fff3cf' }),
        h('path', { d: 'M6.4 23.6a9.6 9.6 0 0 1 19.2 0', fill: 'none', stroke: '#ff7a59', strokeWidth: 3.4, strokeLinecap: 'round' }),
        h('path', { d: 'M10.4 23.6a5.6 5.6 0 0 1 11.2 0', fill: 'none', stroke: '#ffb03a', strokeWidth: 3.4, strokeLinecap: 'round' }),
        h('path', { d: 'M14.4 23.6a1.6 1.6 0 0 1 3.2 0', fill: 'none', stroke: '#4d96ff', strokeWidth: 3.4, strokeLinecap: 'round' }),
        h('path', { d: 'M24.4 6.2l1.3 3.1 3.1 1.3-3.1 1.3-1.3 3.1-1.3-3.1-3.1-1.3 3.1-1.3z', fill: '#ffd93d' }))
    }

    function Mascot(props) {
      return h('svg', { viewBox: '0 0 96 96', 'aria-hidden': true, focusable: false },
        h('defs', null,
          h('radialGradient', { id: 'kc-body', cx: '38%', cy: '26%', r: '82%' },
            h('stop', { offset: '0', stopColor: '#fff7cf' }),
            h('stop', { offset: '1', stopColor: '#ffce5c' }))),
        h('ellipse', { cx: 48, cy: 89, rx: 25, ry: 4.5, fill: 'rgba(48,38,10,.14)' }),
        h('path', {
          d: 'M14 54c0-23 14-33 34-33s34 10 34 33c0 18-12 28-34 28S14 72 14 54z',
          fill: 'url(#kc-body)',
          stroke: '#efb23f',
          strokeWidth: 2,
        }),
        h('ellipse', { cx: 27, cy: 65, rx: 8, ry: 4.6, fill: '#ffb3a1', opacity: 0.72 }),
        h('ellipse', { cx: 69, cy: 65, rx: 8, ry: 4.6, fill: '#ffb3a1', opacity: 0.72 }),
        h('g', { className: 'kc-eye' },
          h('ellipse', { cx: 36, cy: 51, rx: 8.2, ry: 9.8, fill: '#fff' }),
          h('ellipse', { ref: props.pupilL, cx: 37.4, cy: 52, rx: 4.1, ry: 4.8, fill: '#33261a' }),
          h('circle', { cx: 39, cy: 49.8, r: 1.5, fill: '#fff' })),
        h('g', { className: 'kc-eye' },
          h('ellipse', { cx: 62, cy: 51, rx: 8.2, ry: 9.8, fill: '#fff' }),
          h('ellipse', { ref: props.pupilR, cx: 63.4, cy: 52, rx: 4.1, ry: 4.8, fill: '#33261a' }),
          h('circle', { cx: 65, cy: 49.8, r: 1.5, fill: '#fff' })),
        h('path', { d: 'M41 70q7 6.4 14 0', fill: 'none', stroke: '#8a5a2b', strokeWidth: 2.4, strokeLinecap: 'round' }),
        h('path', { d: 'M77 12l1.7 4.3 4.3 1.7-4.3 1.7L77 24l-1.7-4.3-4.3-1.7 4.3-1.7z', fill: '#ffd93d' }))
    }

    // ---------------- 样式 ----------------
    const CSS = `
.kc-root {
  --kc-surface: var(--dsw-alias-bg-layer-1);
  --kc-surface: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 86%, transparent);
  --kc-line: var(--dsw-alias-border-l1);
  --kc-ink-2: var(--dsw-alias-label-secondary);
  --kc-hover: var(--dsw-alias-interactive-bg-hover, rgba(24, 34, 66, .07));
  --kc-shadow: 0 14px 34px -24px rgba(22, 32, 64, .6), 0 3px 10px -7px rgba(22, 32, 64, .28);
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  container: kc / inline-size;
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
  background: var(--dsw-alias-bg-base);
}
.kc-root *, .kc-root *::before, .kc-root *::after { box-sizing: border-box; }
.kc-root button { font: inherit; color: inherit; border: 0; background: none; padding: 0; cursor: pointer; }
.kc-root button:disabled { cursor: default; }

.kc-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
  cursor: crosshair;
}
.kc-canvas[data-tool="eraser"] { cursor: cell; }
.kc-canvas[data-tool="fineEraser"] { cursor: cell; }
.kc-canvas[data-tool="adjust"] { cursor: grab; }
.kc-canvas[data-tool="text"] { cursor: text; }
.kc-canvas[data-tool="stamp"] { cursor: copy; }
.kc-canvas[data-mode="magic"] { cursor: pointer; }
.kc-canvas[data-mode="game"] { cursor: pointer; }

.kc-top {
  position: absolute;
  z-index: 6;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
.kc-top > * { pointer-events: auto; }
.kc-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 15px 0 10px;
  border-radius: 17px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(16px) saturate(1.25);
  backdrop-filter: blur(16px) saturate(1.25);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
  flex: none;
}
.kc-brand-mark { display: grid; place-items: center; width: 26px; height: 26px; }
.kc-brand-name { font-size: 15px; font-weight: 700; letter-spacing: .2px; white-space: nowrap; }
.kc-modes {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-inline: auto;
  padding: 5px;
  border-radius: 19px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(16px) saturate(1.25);
  backdrop-filter: blur(16px) saturate(1.25);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
}
.kc-mode {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 650;
  color: var(--kc-ink-2);
  white-space: nowrap;
  transition: background .18s ease, color .18s ease, transform .18s ease;
}
.kc-mode:hover { background: var(--kc-hover); color: var(--dsw-alias-label-primary); }
.kc-mode:active { transform: scale(.96); }
.kc-mode[aria-pressed="true"] { color: #fff; box-shadow: 0 8px 18px -10px rgba(40, 20, 40, .55); }
.kc-mode[aria-pressed="true"][data-mode="draw"] { background: linear-gradient(135deg, #e8556f, #c33f60); }
.kc-mode[aria-pressed="true"][data-mode="magic"] { background: linear-gradient(135deg, #7d63ee, #5343cf); }
.kc-mode[aria-pressed="true"][data-mode="game"] { background: linear-gradient(135deg, #ffce4d, #ffa62e); color: #4a2f00; }
.kc-mode svg { flex: none; }
.kc-top-tools {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  border-radius: 17px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(16px) saturate(1.25);
  backdrop-filter: blur(16px) saturate(1.25);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
  flex: none;
}
.kc-iconbtn {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--kc-ink-2);
  transition: background .16s ease, color .16s ease, transform .16s ease;
}
.kc-iconbtn:hover { background: var(--kc-hover); color: var(--dsw-alias-label-primary); }
.kc-iconbtn:active { transform: scale(.92); }
.kc-iconbtn[data-tone="danger"]:hover { background: color-mix(in srgb, #ff5d73 16%, transparent); color: #e0455c; }
.kc-iconbtn:disabled { opacity: .32; }
.kc-iconbtn.is-on { background: var(--dsw-alias-bg-layer-1); box-shadow: inset 0 0 0 1.5px #ffb03a; color: var(--dsw-alias-label-primary); }
.kc-iconbtn.is-ready { color: var(--dsw-alias-label-primary); }
.kc-iconbtn.kc-iconbtn--label { width: auto; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px 0 10px; }
.kc-iconbtn-text { font-size: 13px; font-weight: 650; white-space: nowrap; line-height: 1; }

.kc-score {
  position: absolute;
  z-index: 5;
  top: 70px;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
  font-size: 20px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  transform: translateX(-50%);
  animation: kc-pop .42s cubic-bezier(.2, 1.4, .4, 1);
}
.kc-score svg { color: #ffb03a; }
.kc-score-label { font-size: 13px; font-weight: 650; color: var(--kc-ink-2); }

.kc-zoomctl {
  position: absolute;
  z-index: 7;
  top: 70px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  border-radius: 17px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
}
.kc-zoombtn {
  width: 34px;
  height: 34px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: var(--kc-ink-2);
  transition: background .16s ease, color .16s ease;
}
.kc-zoombtn:hover { background: var(--kc-hover); color: var(--dsw-alias-label-primary); }
.kc-zoombtn:disabled { opacity: .3; }
.kc-zoomval {
  min-width: 48px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.kc-root.is-loupe .kc-score { top: 122px; }
.kc-canvas[data-loupe="1"] { cursor: none; }

.kc-dock {
  position: absolute;
  z-index: 6;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.kc-dock-card {
  pointer-events: auto;
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  max-width: 100%;
  padding: 9px 16px 9px 9px;
  border-radius: 25px;
  background: var(--kc-surface);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  backdrop-filter: blur(18px) saturate(1.3);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
}
.kc-mascot { width: 68px; height: 68px; flex: none; }
.kc-mascot svg { width: 100%; height: 100%; display: block; animation: kc-bob 3.4s ease-in-out infinite; }
.kc-eye { transform-box: fill-box; transform-origin: center; animation: kc-blink 5.6s ease-in-out infinite; }
.kc-controls { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.kc-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.kc-swatch {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  flex: none;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(20, 20, 40, .14), 0 1px 2px rgba(20, 20, 40, .12);
  transition: transform .16s ease, box-shadow .16s ease;
}
.kc-swatch:hover { transform: scale(1.1); }
.kc-swatch[aria-pressed="true"] {
  transform: scale(1.16);
  box-shadow: 0 0 0 3px var(--dsw-alias-bg-layer-1), 0 0 0 5px var(--swatch, #ff7a59), inset 0 0 0 1px rgba(20, 20, 40, .1);
}
.kc-swatch--rainbow { background: conic-gradient(#ff5d73, #ff9f43, #ffd93d, #57c785, #3fc9d1, #4d96ff, #9b6bff, #ff8ad8, #ff5d73); }
.kc-chip {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex: none;
  color: var(--kc-ink-2);
  transition: background .16s ease, box-shadow .16s ease, transform .16s ease;
}
.kc-chip:hover { background: var(--kc-hover); }
.kc-chip:active { transform: scale(.94); }
.kc-chip[aria-pressed="true"] { background: var(--dsw-alias-bg-layer-1); box-shadow: inset 0 0 0 1.5px #ffb03a; color: var(--dsw-alias-label-primary); }
.kc-seg { display: inline-flex; align-items: center; gap: 3px; padding: 3px; border-radius: 12px; background: var(--dsw-alias-bg-layer-2); box-shadow: inset 0 0 0 1px var(--kc-line); flex: none; }
.kc-segbtn { display: inline-flex; align-items: center; gap: 5px; height: 26px; padding: 0 9px; border-radius: 9px; font-size: 13px; font-weight: 650; color: var(--kc-ink-2); white-space: nowrap; transition: background .16s ease, color .16s ease, box-shadow .16s ease; }
.kc-segbtn:hover { background: var(--kc-hover); color: var(--dsw-alias-label-primary); }
.kc-segbtn[aria-pressed="true"] { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); box-shadow: inset 0 0 0 1.5px #ffb03a; }
.kc-segbtn:focus-visible { outline: 2px solid #6a8bff; outline-offset: 1px; }
.kc-dot { border-radius: 50%; display: block; }
.kc-sep { width: 1px; height: 22px; background: var(--kc-line); margin: 0 3px; flex: none; }
.kc-stamp {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
  line-height: 1;
  flex: none;
  transition: background .16s ease, transform .16s ease, box-shadow .16s ease;
}
.kc-stamp:hover { background: var(--kc-hover); }
.kc-stamp:active { transform: scale(.92); }
.kc-stamp[aria-pressed="true"] { background: var(--dsw-alias-bg-layer-1); box-shadow: inset 0 0 0 1.5px #ffb03a; transform: translateY(-1px); }
.kc-scenes { gap: 6px; }
.kc-stamps { gap: 5px; }
.kc-row-label { font-size: 12px; font-weight: 650; color: var(--kc-ink-2); white-space: nowrap; letter-spacing: .5px; }
.kc-scenebtn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 16px;
  line-height: 1;
  flex: none;
  transition: background .16s ease, box-shadow .16s ease, transform .16s ease;
}
.kc-scenebtn:hover { background: var(--kc-hover); }
.kc-scenebtn[aria-pressed="true"] { background: var(--dsw-alias-bg-layer-1); box-shadow: inset 0 0 0 1.5px #ffb03a; transform: translateY(-1px); }
.kc-bgcolor {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  flex: none;
  box-shadow: inset 0 0 0 1px rgba(20, 20, 40, .16);
  transition: transform .16s ease, box-shadow .16s ease;
}
.kc-bgcolor:hover { transform: scale(1.12); }
.kc-bgcolor[aria-pressed="true"] {
  transform: scale(1.16);
  box-shadow: 0 0 0 2px var(--dsw-alias-bg-layer-1), 0 0 0 4px #ffb03a, inset 0 0 0 1px rgba(20, 20, 40, .12);
}
.kc-textedit {
  position: absolute;
  z-index: 20;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px 6px 12px;
  border-radius: 14px;
  background: var(--dsw-alias-bg-overlay);
  box-shadow: inset 0 0 0 1px var(--kc-line), var(--kc-shadow);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  animation: kc-pop-in .18s cubic-bezier(.2, 1.3, .4, 1);
}
.kc-textinput {
  width: 190px;
  height: 34px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 16px;
  font-weight: 650;
  outline: none;
}
.kc-textinput::placeholder { color: var(--dsw-alias-label-secondary); opacity: .85; }
.kc-textbtn {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--kc-ink-2);
  transition: background .16s ease, color .16s ease;
}
.kc-textbtn:hover { background: var(--kc-hover); color: var(--dsw-alias-label-primary); }
.kc-textbtn--ok { background: #ffb03a; color: #4a2f00; }
.kc-textbtn--ok:hover { background: #ffa41f; color: #4a2f00; }

.kc-bubble {
  position: absolute;
  left: 10px;
  bottom: calc(100% + 10px);
  max-width: 280px;
  padding: 10px 14px;
  border-radius: 16px 16px 16px 4px;
  background: #fffdf4;
  color: #3d2b1f;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 550;
  box-shadow: 0 12px 26px -16px rgba(50, 30, 10, .55), inset 0 0 0 1px rgba(120, 80, 30, .12);
  opacity: 0;
  transform: translateY(6px) scale(.97);
  transform-origin: 20% 100%;
  transition: opacity .22s ease, transform .22s ease;
  pointer-events: none;
}
.kc-bubble.is-on { opacity: 1; transform: none; }

.kc-root button:focus-visible, .kc-root [role="button"]:focus-visible {
  outline: 2px solid #6a8bff;
  outline-offset: 2px;
}

@keyframes kc-bob {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
}
@keyframes kc-blink {
  0%, 91%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(.12); }
  97% { transform: scaleY(1); }
}
@keyframes kc-pop-in {
  from { opacity: 0; transform: translate(-50%, -50%) scale(.9); }
  to { opacity: 1; }
}
@keyframes kc-pop {
  0% { transform: translateX(-50%) scale(.82); }
  60% { transform: translateX(-50%) scale(1.06); }
  100% { transform: translateX(-50%) scale(1); }
}

@container kc (max-width: 760px) {
  .kc-brand-name { display: none; }
  .kc-brand { padding: 0 10px; }
  .kc-iconbtn.kc-iconbtn--label { width: 36px; padding: 0; }
  .kc-iconbtn-text { display: none; }
}
@container kc (max-width: 700px) {
  .kc-dock-card { padding: 8px 12px 8px 8px; gap: 10px; }
  .kc-mascot { width: 58px; height: 58px; }
  .kc-swatch { width: 30px; height: 30px; }
  .kc-mode { padding: 0 12px; }
  .kc-chip { width: 30px; height: 30px; }
  .kc-stamp { width: 32px; height: 32px; }
}
@container kc (max-width: 600px) {
  .kc-top { gap: 6px; }
  .kc-score { top: 66px; height: 40px; font-size: 18px; }
  .kc-zoomctl { top: 66px; right: 10px; }
  .kc-root.is-loupe .kc-score { top: 118px; }
  .kc-dock { left: 10px; right: 10px; bottom: 10px; }
}
@container kc (max-width: 560px) {
  .kc-mode-text { display: none; }
}
@container kc (max-width: 620px) {
  .kc-brand { display: none; }
}
@container kc (max-width: 520px) {
  .kc-mode { padding: 0 10px; }
  .kc-mode-text { display: none; }
  .kc-iconbtn { width: 32px; height: 32px; border-radius: 10px; }
  .kc-iconbtn.kc-iconbtn--label { width: 32px; padding: 0; }
  .kc-iconbtn-text { display: none; }
  .kc-zoombtn { width: 30px; height: 30px; }
  .kc-zoomval { min-width: 42px; font-size: 13px; }
  .kc-scenebtn { width: 29px; height: 29px; font-size: 15px; }
  .kc-bgcolor { width: 24px; height: 24px; }
  .kc-textinput { width: 150px; font-size: 15px; }
  .kc-textbtn { width: 30px; height: 30px; }
  .kc-row-label { font-size: 12px; }
  .kc-top-tools { padding: 4px; gap: 1px; }
  .kc-mascot { width: 50px; height: 50px; }
  .kc-row { gap: 4px; }
  .kc-swatch { width: 27px; height: 27px; }
  .kc-sep { display: none; }
}
@media (max-height: 640px) {
  .kc-mascot { width: 52px; height: 52px; }
  .kc-dock-card { padding-top: 6px; padding-bottom: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .kc-mascot svg, .kc-eye, .kc-score { animation: none; }
  .kc-root * { transition-duration: .01ms !important; }
}
`

    // ---------------- React 面板 ----------------
    function createPanel(ctx, themeStore, localeStore, translate) {
      function useStore(store, fallback) {
        const [value, setValue] = useState(() => {
          try { return store.get() } catch { return fallback }
        })
        useEffect(() => {
          setValue(store.get())
          return store.subscribe(() => setValue(store.get()))
        }, [store])
        return value
      }

      return function KidsCanvasPanel() {
        const theme = useStore(themeStore, 'light')
        useStore(localeStore, 'zh') // 语言切换时重渲染
        const t = (key) => translate(key)

        const rootRef = useRef(null)
        const canvasRef = useRef(null)
        const mascotRef = useRef(null)
        const pupilL = useRef(null)
        const pupilR = useRef(null)
        const engineRef = useRef(null)
        const optsRef = useRef(null)
        const soundRef = useRef(null)
        const saveTimer = useRef(0)
        const bubbleTimer = useRef(0)
        const textInputRef = useRef(null)

        const [mode, setMode] = useState('draw')
        const [tool, setTool] = useState({ kind: 'brush', color: COLORS[0].value, size: 15, rainbow: false, stamp: null })
        const [muted, setMuted] = useState(readMuted)
        const [score, setScore] = useState(0)
        const [canUndo, setCanUndo] = useState(false)
        const [hasArt, setHasArt] = useState(false)
        const [bubble, setBubble] = useState({ text: '', on: false })
        const [loupe, setLoupe] = useState(false)
        const [loupeZoom, setLoupeZoom] = useState(2.5)
        const [stampScale, setStampScaleState] = useState(1)
        const [editing, setEditing] = useState(null)
        const [view, setView] = useState({ w: 0, h: 0 })
        const [scene, setSceneState] = useState(() => {
          try {
            const saved = window.localStorage.getItem(SCENE_KEY)
            if (saved && SCENE_IDS.indexOf(saved) >= 0) return saved
            if (saved && /^solid:#[0-9a-f]{6}$/i.test(saved)) return saved
            return 'space'
          } catch {
            return 'space'
          }
        })

        if (!soundRef.current) soundRef.current = createSound()
        if (!optsRef.current) optsRef.current = {}
        const sound = soundRef.current
        const opts = optsRef.current

        function say(key, n) {
          let text = t(key)
          if (n !== undefined && n !== null) text = text.replace('{n}', String(n))
          setBubble({ text, on: true })
          clearTimeout(bubbleTimer.current)
          bubbleTimer.current = window.setTimeout(() => setBubble((b) => ({ text: b.text, on: false })), 4300)
        }
        function look(clientX, clientY) {
          const m = mascotRef.current
          if (!m) return
          const r = m.getBoundingClientRect()
          if (!r.width) return
          const dx = clamp((clientX - (r.left + r.width / 2)) / 170, -1, 1)
          const dy = clamp((clientY - (r.top + r.height / 2)) / 170, -1, 1)
          const tx = 'translate(' + (dx * 3.2).toFixed(1) + 'px, ' + (dy * 3.2).toFixed(1) + 'px)'
          if (pupilL.current) pupilL.current.style.transform = tx
          if (pupilR.current) pupilR.current.style.transform = tx
        }
        function saveNow() {
          const engine = engineRef.current
          if (!engine) return
          try {
            const text = JSON.stringify(engine.serialize())
            if (text.length < 1500000) window.localStorage.setItem(STORE, text)
          } catch {}
        }
        function scheduleSave() {
          clearTimeout(saveTimer.current)
          saveTimer.current = window.setTimeout(saveNow, 700)
        }

        opts.sfx = sound
        opts.onSay = say
        opts.onScore = setScore
        opts.onHistory = setCanUndo
        opts.onArt = setHasArt
        opts.onChange = scheduleSave
        opts.onCelebrate = (n) => say('hintCelebrate', n)
        opts.onSelectRatio = (ratio) => { if (ratio != null) setStampScaleState(ratio) }
        opts.onTextPoint = (x, y) => setEditing({ x, y, value: '' })
        opts.onSize = (w, hgt) => setView((v) => (v.w === w && v.h === hgt ? v : { w, h: hgt }))
        opts.trackEyes = look
        opts.onFlush = saveNow

        useEffect(() => {
          const canvas = canvasRef.current
          const root = rootRef.current
          if (!canvas || !root) return undefined
          const engine = createEngine(canvas, root, optsRef.current)
          engineRef.current = engine
          engine.setNight(themeStore.get() === 'dark')
          engine.init()
          let restored = false
          try {
            const raw = window.localStorage.getItem(STORE)
            if (raw) restored = engine.load(JSON.parse(raw))
          } catch {}
          optsRef.current.onSay(restored ? 'hintWelcomeBack' : 'hintStart')
          return () => {
            engine.destroy()
            engineRef.current = null
            clearTimeout(saveTimer.current)
            clearTimeout(bubbleTimer.current)
          }
        }, [])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setNight(theme === 'dark')
        }, [theme])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setMode(mode)
        }, [mode])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setTool(tool)
        }, [tool])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setLoupe(loupe)
        }, [loupe])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setScene(scene)
          try { window.localStorage.setItem(SCENE_KEY, scene) } catch {}
        }, [scene])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setLoupeZoom(loupeZoom)
        }, [loupeZoom])

        useEffect(() => {
          const engine = engineRef.current
          if (engine) engine.setStampScale(stampScale)
        }, [stampScale])

        useEffect(() => {
          const el = textInputRef.current
          if (editing && el) el.focus()
        }, [editing && editing.x, editing && editing.y])

        useEffect(() => {
          if (editing && (tool.kind !== 'text' || mode !== 'draw')) setEditing(null)
        }, [editing, tool.kind, mode])

        useEffect(() => {
          sound.setMuted(muted)
          try { window.localStorage.setItem(MUTE_STORE, muted ? '1' : '0') } catch {}
        }, [muted])

        useEffect(() => {
          function onKey(e) {
            if (!(e.metaKey || e.ctrlKey) || String(e.key).toLowerCase() !== 'z') return
            const el = e.target
            if (el && el.tagName && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return
            e.preventDefault()
            const engine = engineRef.current
            if (engine) engine.undo()
          }
          window.addEventListener('keydown', onKey)
          return () => window.removeEventListener('keydown', onKey)
        }, [])

        function chooseMode(next) {
          sound.unlock()
          if (loupe) setLoupe(false)
          setMode(next)
        }
        function toggleLoupe() {
          sound.unlock()
          const next = !loupe
          setLoupe(next)
          if (next) say('hintLoupe')
        }
        function zoomBy(dir) {
          sound.unlock()
          const steps = [1.5, 2.5, 4]
          const idx = steps.indexOf(loupeZoom)
          setLoupeZoom(steps[clamp((idx < 0 ? 1 : idx) + dir, 0, steps.length - 1)])
        }
        function chooseColor(c) {
          sound.unlock()
          if (loupe) setLoupe(false)
          setTool((prev) => ({ ...prev, kind: prev.kind === 'text' ? 'text' : 'brush', color: c.value, rainbow: false, stamp: null }))
          if (mode !== 'draw') setMode('draw')
        }
        function chooseRainbow() {
          sound.unlock()
          if (loupe) setLoupe(false)
          setTool((prev) => ({ ...prev, kind: 'brush', rainbow: true, stamp: null }))
          if (mode !== 'draw') setMode('draw')
        }
        function chooseSize(size) {
          if (loupe) setLoupe(false)
          setTool((prev) => ({ ...prev, size, kind: prev.kind === 'text' ? 'text' : 'brush', stamp: null }))
        }
        function toggleEraser() {
          sound.unlock()
          if (loupe) setLoupe(false)
          setTool((prev) => ({ ...prev, kind: prev.kind === 'eraser' ? 'brush' : 'eraser', stamp: null }))
          if (mode !== 'draw') setMode('draw')
        }
        function toggleFineEraser() {
          sound.unlock()
          if (loupe) setLoupe(false)
          const was = tool.kind === 'fineEraser'
          setTool((prev) => ({ ...prev, kind: was ? 'brush' : 'fineEraser', stamp: null }))
          if (mode !== 'draw') setMode('draw')
          if (!was) say('hintFineErase')
        }
        function pickStamp(st) {
          sound.unlock()
          if (loupe) setLoupe(false)
          setTool((prev) => ({
            ...prev,
            kind: prev.kind === 'stamp' && prev.stamp === st.kind ? 'brush' : 'stamp',
            stamp: prev.kind === 'stamp' && prev.stamp === st.kind ? null : st.kind,
            rainbow: false,
          }))
          if (mode !== 'draw') setMode('draw')
        }
        function toggleAdjust() {
          sound.unlock()
          if (loupe) setLoupe(false)
          const next = tool.kind === 'adjust' ? 'brush' : 'adjust'
          setTool((prev) => ({ ...prev, kind: next, stamp: null }))
          if (mode !== 'draw') setMode('draw')
          if (next === 'adjust') say('hintAdjust')
        }
        function chooseStampSize(mult) {
          sound.unlock()
          setStampScaleState(mult)
          const engine = engineRef.current
          if (engine) {
            engine.setStampScale(mult)
            engine.resizeSelectedTo(mult)
          }
        }
        function toggleText() {
          sound.unlock()
          if (loupe) setLoupe(false)
          const next = tool.kind === 'text' ? 'brush' : 'text'
          setTool((prev) => ({ ...prev, kind: next, stamp: null }))
          if (mode !== 'draw') setMode('draw')
          if (next === 'text') say('hintText')
          if (next !== 'text') setEditing(null)
        }
        function commitText() {
          const value = editing && editing.value ? editing.value.trim() : ''
          if (value) {
            const engine = engineRef.current
            if (engine) engine.addText(editing.x, editing.y, value)
          }
          setEditing(null)
        }
        function doNew() {
          sound.unlock()
          if (loupe) setLoupe(false)
          const engine = engineRef.current
          if (engine) engine.newCanvas()
        }
        function doUndo() {
          sound.unlock()
          const engine = engineRef.current
          if (!engine) return
          if (!engine.canUndo()) {
            say('hintNothingUndo')
            return
          }
          engine.undo()
        }
        function doClear() {
          const engine = engineRef.current
          if (engine) engine.clear()
        }
        function doSave() {
          const engine = engineRef.current
          if (engine) engine.saveImage()
        }

        const colorPressed = (c) => tool.kind !== 'eraser' && tool.kind !== 'fineEraser' && tool.kind !== 'stamp' && !tool.rainbow && tool.color === c.value
        const paintStroke = tool.rainbow
          ? 'conic-gradient(' + RAINBOW.join(', ') + ', ' + RAINBOW[0] + ')'
          : tool.color

        function iconBtn(name, label, onClick, extra) {
          const ex = extra || {}
          return h('button', {
            type: 'button',
            className: 'kc-iconbtn' + (ex.pressed ? ' is-on' : ''),
            title: label,
            'aria-label': label,
            'aria-pressed': ex.pressed === undefined ? undefined : !!ex.pressed,
            onClick,
            disabled: !!ex.disabled,
            'data-tone': ex.tone || undefined,
          }, h(Glyph, { name, size: 19 }))
        }

        const scoreChip = mode === 'game'
          ? h('div', { className: 'kc-score', key: 'score-' + score, role: 'status', 'aria-live': 'polite' },
            h(Glyph, { name: 'star', size: 20 }),
            h('span', null, String(score)),
            h('span', { className: 'kc-score-label' }, t('gameScore')))
          : null

        const colorRow = h('div', { className: 'kc-row', role: 'group', 'aria-label': t('colorsLabel') },
          COLORS.map((c) => h('button', {
            key: c.id,
            type: 'button',
            className: 'kc-swatch',
            style: { background: c.value, '--swatch': c.value },
            title: t(c.label),
            'aria-label': t(c.label),
            'aria-pressed': colorPressed(c),
            onClick: () => chooseColor(c),
          })),
          h('button', {
            type: 'button',
            className: 'kc-swatch kc-swatch--rainbow',
            style: { '--swatch': '#ff8ad8' },
            title: t('rainbow'),
            'aria-label': t('rainbow'),
            'aria-pressed': tool.rainbow && tool.kind === 'brush',
            onClick: chooseRainbow,
          }))

        const adjustGroup = h('div', { className: 'kc-seg', role: 'group', 'aria-label': t('adjust') },
          h('button', {
            type: 'button',
            className: 'kc-segbtn',
            title: t('adjust'),
            'aria-label': t('adjust'),
            'aria-pressed': tool.kind === 'adjust',
            onClick: toggleAdjust,
          },
            h(Glyph, { name: 'move', size: 15 }),
            h('span', null, t('adjust'))))

        const textGroup = h('div', { className: 'kc-seg', role: 'group', 'aria-label': t('textTool') },
          h('button', {
            type: 'button',
            className: 'kc-segbtn',
            title: t('textTool'),
            'aria-label': t('textTool'),
            'aria-pressed': tool.kind === 'text',
            onClick: toggleText,
          },
            h(Glyph, { name: 'text', size: 15 }),
            h('span', null, t('textTool'))))

        const toolRow = h('div', { className: 'kc-row', role: 'group', 'aria-label': t('toolsLabel') },
          SIZES.map((sz) => h('button', {
            key: sz.value,
            type: 'button',
            className: 'kc-chip',
            title: t(sz.label),
            'aria-label': t(sz.label),
            'aria-pressed': (tool.kind === 'brush' || tool.kind === 'text') && !tool.rainbow && tool.size === sz.value,
            onClick: () => chooseSize(sz.value),
          }, h('span', { className: 'kc-dot', style: { width: sz.dot, height: sz.dot, background: paintStroke } }))),
          h('span', { className: 'kc-sep' }),
          h('div', { className: 'kc-seg', role: 'group', 'aria-label': t('eraserGroup') },
            h('button', {
              type: 'button',
              className: 'kc-segbtn',
              title: t('eraserTip'),
              'aria-label': t('eraserTip'),
              'aria-pressed': tool.kind === 'eraser',
              onClick: toggleEraser,
            },
              h(Glyph, { name: 'eraser', size: 15 }),
              h('span', null, t('eraser'))),
            h('button', {
              type: 'button',
              className: 'kc-segbtn',
              title: t('fineEraserTip'),
              'aria-label': t('fineEraserTip'),
              'aria-pressed': tool.kind === 'fineEraser',
              onClick: toggleFineEraser,
            },
              h(Glyph, { name: 'eraser', size: 15 }),
              h('span', null, t('fineEraser')))),
          h('span', { className: 'kc-sep' }),
          adjustGroup,
          h('span', { className: 'kc-sep' }),
          textGroup
        )

        const stampSizeGroup = h('div', { className: 'kc-seg', role: 'group', 'aria-label': t('stickerSize') },
          [['stampSizeSmall', 0.7], ['stampSizeMedium', 1], ['stampSizeLarge', 1.4]].map(([key, mult]) =>
            h('button', {
              key,
              type: 'button',
              className: 'kc-segbtn',
              'aria-pressed': Math.abs(stampScale - mult) < 0.01,
              onClick: () => chooseStampSize(mult),
            }, t(key))))

        const stampRow = h('div', { className: 'kc-row kc-stamps', role: 'group', 'aria-label': t('stampsLabel') },
          h('span', { className: 'kc-row-label' }, t('stampsLabel')),
          STAMPS.map((st) => h('button', {
            key: st.kind,
            type: 'button',
            className: 'kc-stamp',
            title: t(st.key),
            'aria-label': t(st.key),
            'aria-pressed': tool.kind === 'stamp' && tool.stamp === st.kind,
            onClick: () => pickStamp(st),
          }, st.emoji)),
          h('span', { className: 'kc-sep' }),
          stampSizeGroup)

        const sceneRow = h('div', { className: 'kc-row kc-scenes', role: 'group', 'aria-label': t('scenesLabel') },
          h('span', { className: 'kc-row-label' }, t('scenesLabel')),
          SCENES.map((sc) => h('button', {
            key: sc.id,
            type: 'button',
            className: 'kc-scenebtn',
            title: t(sc.label),
            'aria-label': t(sc.label),
            'aria-pressed': scene === sc.id,
            onClick: () => { sound.unlock(); setSceneState(sc.id) },
          }, sc.emoji)),
          h('span', { className: 'kc-sep' }),
          BG_COLORS.map((c) => h('button', {
            key: c.id,
            type: 'button',
            className: 'kc-bgcolor',
            style: { background: c.value },
            title: t(c.label),
            'aria-label': t(c.label),
            'aria-pressed': scene === 'solid:' + c.value,
            onClick: () => { sound.unlock(); setSceneState('solid:' + c.value) },
          })))

        return h('div', { className: 'kc-root' + (loupe ? ' is-loupe' : ''), ref: rootRef },
          h('style', null, CSS),
          h('canvas', {
            ref: canvasRef,
            className: 'kc-canvas',
            role: 'img',
            'aria-label': t('canvasLabel'),
            'data-mode': mode,
          }),
          h('header', { className: 'kc-top' },
            h('div', { className: 'kc-brand' },
              h('span', { className: 'kc-brand-mark' }, h(BrandMark, null)),
              h('span', { className: 'kc-brand-name' }, t('title'))),
            h('div', { className: 'kc-modes', role: 'group', 'aria-label': t('modesLabel') },
              MODES.map((m) => h('button', {
                key: m.id,
                type: 'button',
                className: 'kc-mode',
                'data-mode': m.id,
                'aria-pressed': mode === m.id,
                title: t(m.key),
                onClick: () => chooseMode(m.id),
              },
                h(Glyph, { name: m.icon, size: 18 }),
                h('span', { className: 'kc-mode-text' }, t(m.key))))),
            h('div', { className: 'kc-top-tools' },
              h('button', {
                type: 'button',
                className: 'kc-iconbtn kc-iconbtn--label',
                title: t('newCanvas'),
                'aria-label': t('newCanvas'),
                onClick: doNew,
              },
                h(Glyph, { name: 'newPage', size: 19 }),
                h('span', { className: 'kc-iconbtn-text' }, t('newCanvas'))),
              h('button', {
                type: 'button',
                className: 'kc-iconbtn kc-iconbtn--label' + (canUndo ? ' is-ready' : ''),
                title: t('undo'),
                'aria-label': t('undo'),
                onClick: doUndo,
              },
                h(Glyph, { name: 'undo', size: 19 }),
                h('span', { className: 'kc-iconbtn-text' }, t('undo'))),
              iconBtn('search', t('loupe'), toggleLoupe, { pressed: loupe }),
              h('button', {
                type: 'button',
                className: 'kc-iconbtn',
                title: muted ? t('soundOff') : t('soundOn'),
                'aria-label': muted ? t('soundOff') : t('soundOn'),
                'aria-pressed': muted,
                onClick: () => setMuted((v) => !v),
              }, h(Glyph, { name: muted ? 'muted' : 'sound', size: 19 })),
              iconBtn('save', t('save'), doSave),
              iconBtn('trash', t('clear'), doClear, { disabled: !hasArt, tone: 'danger' }))),
          editing ? h('div', {
            className: 'kc-textedit',
            style: {
              left: clamp(editing.x, 150, Math.max(150, view.w - 150)),
              top: clamp(editing.y, 60, Math.max(60, view.h - 170)),
            },
          },
            h('input', {
              ref: textInputRef,
              className: 'kc-textinput',
              value: editing.value,
              maxLength: 40,
              placeholder: t('textPlaceholder'),
              'aria-label': t('textPlaceholder'),
              onChange: (e) => setEditing((v) => (v ? { ...v, value: e.target.value } : v)),
              onKeyDown: (e) => {
                if (e.key === 'Enter') { e.preventDefault(); commitText() }
                else if (e.key === 'Escape') { e.preventDefault(); setEditing(null) }
              },
            }),
            h('button', {
              type: 'button',
              className: 'kc-textbtn kc-textbtn--ok',
              title: t('textDone'),
              'aria-label': t('textDone'),
              onClick: commitText,
            }, h(Glyph, { name: 'check', size: 17 })),
            h('button', {
              type: 'button',
              className: 'kc-textbtn',
              title: t('cancel'),
              'aria-label': t('cancel'),
              onClick: () => setEditing(null),
            }, h(Glyph, { name: 'close', size: 16 }))) : null,
          loupe ? h('div', { className: 'kc-zoomctl', role: 'group', 'aria-label': t('loupe') },
            h('button', {
              type: 'button',
              className: 'kc-zoombtn',
              title: t('zoomOut'),
              'aria-label': t('zoomOut'),
              disabled: loupeZoom <= 1.5,
              onClick: () => zoomBy(-1),
            }, h(Glyph, { name: 'minus', size: 16 })),
            h('span', { className: 'kc-zoomval' }, loupeZoom + '×'),
            h('button', {
              type: 'button',
              className: 'kc-zoombtn',
              title: t('zoomIn'),
              'aria-label': t('zoomIn'),
              disabled: loupeZoom >= 4,
              onClick: () => zoomBy(1),
            }, h(Glyph, { name: 'plus', size: 16 })),
            h('button', {
              type: 'button',
              className: 'kc-zoombtn kc-zoombtn--close',
              title: t('closeLoupe'),
              'aria-label': t('closeLoupe'),
              onClick: () => setLoupe(false),
            }, h(Glyph, { name: 'close', size: 16 }))) : null,
          scoreChip,
          h('footer', { className: 'kc-dock' },
            h('div', { className: 'kc-dock-card' },
              h('div', { className: 'kc-mascot', ref: mascotRef },
                h(Mascot, { pupilL, pupilR })),
              h('div', { className: 'kc-controls' }, colorRow, toolRow, stampRow, sceneRow),
              h('div', {
                className: 'kc-bubble' + (bubble.on ? ' is-on' : ''),
                role: 'status',
                'aria-live': 'polite',
              }, bubble.text))))
      }
    }

    // ---------------- 注册 ----------------
    function apply(ctx) {
      // 主题：把当前明暗映射到外太空的亮 / 暗两套配色
      const themeStore = {
        value: 'light',
        subs: new Set(),
        get() { return this.value },
        set(v) {
          if (v !== this.value) {
            this.value = v
            for (const fn of this.subs) fn()
          }
        },
        subscribe(fn) {
          this.subs.add(fn)
          return () => { this.subs.delete(fn) }
        },
      }
      ctx.inject(['theme'], (c) => {
        const push = (snap) => {
          try {
            themeStore.set(snap && snap.active && snap.active.colorScheme === 'dark' ? 'dark' : 'light')
          } catch {
            themeStore.set('light')
          }
        }
        try { push(c.theme.getTheme()) } catch {}
        c.effect(() => c.on('theme/change', push))
      })

      // 语言：注册本插件的词典，并跟随 DSH 的语言切换
      const localeStore = {
        value: 'zh',
        subs: new Set(),
        get() { return this.value },
        set(v) {
          if (v !== this.value) {
            this.value = v
            for (const fn of this.subs) fn()
          }
        },
        subscribe(fn) {
          this.subs.add(fn)
          return () => { this.subs.delete(fn) }
        },
      }
      function translate(key) {
        const en = /^en/i.test(localeStore.get() || '')
        const dict = en ? EN : ZH
        try {
          if (ctx.get('locale')) {
            const value = ctx.locale.bind(NS)(key)
            if (typeof value === 'string' && value && value !== key) return value
          }
        } catch {}
        return dict[key] || ZH[key] || key
      }
      ctx.inject(['locale'], (c) => {
        c.effect(() => c.locale.register(NS, { zh: ZH, en: EN }))
        const push = () => {
          try {
            const snap = c.locale.getSnapshot()
            localeStore.set(snap && snap.active ? snap.active : 'zh')
          } catch {}
        }
        push()
        c.effect(() => c.locale.subscribe(push))
      })

      const Panel = createPanel(ctx, themeStore, localeStore, translate)

      ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist',
        id: PANEL,
        order: 7,
        label: () => translate('title'),
      }, SidebarIcon)))

      ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: PANEL,
      }, Panel)))
    }

    function SidebarIcon(props) {
      const size = props && typeof props.size === 'number' ? props.size : 20
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        'aria-hidden': true,
        focusable: false,
      },
        h('rect', { x: 1.4, y: 1.4, width: 21.2, height: 21.2, rx: 6.6, fill: '#fff3cf' }),
        h('path', { d: 'M4.8 17.6a7.2 7.2 0 0 1 14.4 0', stroke: '#ff7a59', strokeWidth: 2.4, strokeLinecap: 'round' }),
        h('path', { d: 'M8.4 17.6a3.6 3.6 0 0 1 7.2 0', stroke: '#ffb03a', strokeWidth: 2.4, strokeLinecap: 'round' }),
        h('circle', { cx: 12, cy: 17.6, r: 1.5, fill: '#4d96ff' }))
    }

  // ---------- 独立页面挂载 ----------
  function makeStore(initial) {
    let value = initial
    const subs = new Set()
    return {
      get() { return value },
      set(next) {
        if (next === value) return
        value = next
        for (const fn of subs) fn()
      },
      subscribe(fn) {
        subs.add(fn)
        return () => { subs.delete(fn) }
      },
    }
  }
  const themeStore = makeStore('light')
  const localeStore = makeStore(/^en/i.test(navigator.language || 'zh') ? 'en' : 'zh')
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => themeStore.set(mq.matches ? 'dark' : 'light')
    sync()
    if (mq.addEventListener) mq.addEventListener('change', sync)
    else if (mq.addListener) mq.addListener(sync)
  }
  const translate = (key) => {
    const dict = /^en/i.test(localeStore.get() || '') ? EN : ZH
    return dict[key] || ZH[key] || key
  }
  const Panel = createPanel({}, themeStore, localeStore, translate)
  const mount = document.getElementById('root')
  ReactDOM.createRoot(mount).render(h(Panel))
})()
