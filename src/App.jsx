import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  CheckSquare, 
  Languages, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Info,
  ArrowRight,
  Maximize,
  RotateCcw,
  Sparkle
} from 'lucide-react';

const t = {
  EN: {
    title: "HKDSE Lens Optics Master",
    subtitle: "Interactive Ray Diagrams, Hands-on Drilling & Exam Practice",
    toggleLang: "中文",
    tabs: {
      theory: "Theory & Formulas",
      simulation: "Interactive Simulation",
      drill: "Ray Drawing Drill",
      misconceptions: "DSE Misconceptions",
      exercise: "Exam Exercises",
      consolidation: "Revision Checklist"
    },
    theorySec: {
      title: "Core DSE Lens Concepts",
      convexTitle: "1. Converging Lens (Convex Lens 凸透鏡)",
      convexDesc: "Thicker in the middle than at the edges. It converges parallel light rays to a real principal focus.",
      concaveTitle: "2. Diverging Lens (Concave Lens 凹透鏡)",
      concaveDesc: "Thinner in the middle than at the edges. It diverges parallel light rays so they appear to come from a virtual principal focus.",
      signTitle: "DSE Sign Convention: Real-is-Positive",
      signDesc: "In the HKDSE syllabus, the Real-is-Positive convention is most widely used:",
      signList: [
        "Object distance (u): always +ve for real objects.",
        "Image distance (v): +ve for real images (opposite side of lens), -ve for virtual images (same side as object).",
        "Focal length (f): +ve for Convex (converging) lens, -ve for Concave (diverging) lens."
      ],
      formulas: "Key Mathematical Formulas",
      formula1: "Lens Formula (透鏡公式):",
      formula2: "Linear Magnification (放大率):",
      threeRaysTitle: "The Three Principal Rays (三條特殊光線)",
      threeRaysList: [
        "Ray 1 (Parallel): Incident parallel to principal axis refracts through (or appears to diverge from) the principal focus F.",
        "Ray 2 (Central): Incident through the optical center C passes straight through without bending.",
        "Ray 3 (Focal): Incident through (or heading towards) the principal focus F refracts parallel to the principal axis."
      ]
    },
    simSec: {
      title: "Interactive Lens Simulator",
      controls: "Control Panel",
      lensType: "Lens Type",
      convex: "Convex (Converging)",
      concave: "Concave (Diverging)",
      focalLength: "Focal Length (f)",
      objectDist: "Object Distance (u)",
      objectHeight: "Object Height (h)",
      natureTitle: "Calculated Image Properties",
      natureLabels: {
        formula: "Calculation:",
        u: "Object Distance (u):",
        v: "Image Distance (v):",
        m: "Magnification (m):",
        type: "Image Nature:",
        real: "Real Image (Can be projected on screen)",
        virtual: "Virtual Image (Cannot be projected, seen only through lens)",
        inverted: "Inverted (Upside down)",
        erect: "Erect (Upright)",
        magnified: "Magnified (Larger)",
        diminished: "Diminished (Smaller)",
        sameSize: "Same Size"
      }
    },
    drillSec: {
      title: "Ray Diagram Interactive Drill",
      instructions: "Instructions: Drag the yellow and red circles on the right to align the refracted rays correctly! The rays will automatically snap when you are close. When both rays are correctly aligned, the image will be unlocked!",
      level: "Level / Scenario:",
      lvl1: "Convex Lens: Object beyond 2F (Real & Diminished)",
      lvl2: "Convex Lens: Object inside F (Virtual & Magnified / Magnifying Glass)",
      lvl3: "Concave Lens: Virtual & Diminished Image",
      checkBtn: "Verify Diagram",
      resetBtn: "Reset Handles",
      nextChallengeBtn: "New Practice (Same Level)",
      nextLevelBtn: "Go to Next Level",
      nextBtnFinal: "Restart from Level 1",
      feedbackCorrect: "Excellent! Your ray paths are mathematically and physically correct! 🎉",
      feedbackWrong: "Not quite correct yet. Check the path of the Parallel Ray (should pass through Focus F') and Central Ray (should pass straight through C). Click 'Reset' to try again.",
      parallelRay: "Parallel Ray",
      centralRay: "Central Ray",
      emergentParallel: "Incident Parallel -> Must refract through Right Focus F'",
      emergentCentral: "Incident Central -> Must pass straight through Center C",
      concaveEmergentParallel: "Incident Parallel -> Must refract to line up with Left Focus F",
      successTitle: "Target Unlocked!",
      exerciseLabel: "Exercise:"
    },
    misconSec: {
      title: "HKDSE Mythbusters",
      myth: "Student Misconception",
      reality: "Scientific Reality & DSE Focus"
    },
    exerciseSec: {
      title: "HKDSE-Style Exercises",
      hint: "Show Hint",
      check: "Check Answer",
      correct: "Correct!",
      incorrect: "Incorrect. Try again!",
      retry: "Retry",
      q1: {
        q: "An object is initially placed at 1.5f in front of a convex lens. If the object is slowly moved away from the lens to 2.5f, which of the following statements is correct regarding the image?",
        opts: [
          "The image remains real, becomes magnified, and moves closer to the lens.",
          "The image remains real, becomes diminished, and moves closer to the lens.",
          "The image becomes virtual, erect, and magnified.",
          "The image remains real, becomes diminished, and moves further away from the lens."
        ],
        ans: 1,
        hint: "At u = 1.5f (between F and 2F), the image is real, inverted, and magnified beyond 2F. At u = 2.5f (beyond 2F), the image is real, inverted, and diminished (between F and 2F).",
        explain: "When a real object moves away from a convex lens, its real image always moves closer to the lens and becomes smaller."
      },
      q2: {
        q: "A student uses a magnifying glass (convex lens) of focal length 12 cm to inspect a stamp. An erect virtual image is formed which is 3 times the size of the stamp. How far is the stamp from the lens?",
        opts: [
          "4 cm",
          "8 cm",
          "16 cm",
          "24 cm"
        ],
        ans: 1,
        hint: "Since it is an erect virtual image, magnification m = -v/u = 3, so v = -3u. Use the lens formula: 1/u + 1/v = 1/f.",
        explain: "Using 1/u + 1/v = 1/f with f = +12 cm and v = -3u: 1/u - 1/(3u) = 1/12 => 2/(3u) = 1/12 => 3u = 24 => u = 8 cm."
      },
      q3: {
        q: "If the upper half of a convex lens is covered with a piece of black paper, what will happen to the image of a bright candle formed on a screen?",
        opts: [
          "Only the bottom half of the candle image is shown.",
          "Only the top half of the candle image is shown.",
          "The complete candle image is shown but is less bright.",
          "No image can be formed on the screen anymore."
        ],
        ans: 2,
        hint: "Every part of the lens refractor converges light from the object to build the entire image. Think about the total number of light rays passing through.",
        explain: "Light rays from every point of the candle still pass through the uncovered lower half of the lens to form a complete image. However, since half of the light is blocked, the image becomes dimmer (less bright)."
      }
    },
    consolidationSec: {
      title: "DSE High-Yield Revision Summary",
      tableHeader: {
        lens: "Lens Type",
        pos: "Object Position",
        imgPos: "Image Position",
        nature: "Image Nature",
        app: "Common Application"
      },
      checklistTitle: "HKDSE Learning Objective Tracker",
      checklist: [
        "I can draw ray diagrams to locate images formed by convex and concave lenses.",
        "I can state and distinguish between real and virtual images.",
        "I can apply the lens formula (1/u + 1/v = 1/f) with correct sign conventions.",
        "I can calculate linear magnification (m = v/u = h_i / h_o).",
        "I can explain why blocking part of a lens only dims the image without cutting it in half."
      ]
    }
  },
  TC: {
    title: "DSE 物理：透鏡光學特訓",
    subtitle: "互動光路圖、手動繪圖特訓與公開試操練",
    toggleLang: "English",
    tabs: {
      theory: "核心理論與公式",
      simulation: "互動透鏡模擬器",
      drill: "光路圖作圖特訓",
      misconceptions: "DSE 常見迷思",
      exercise: "公開試模擬題",
      consolidation: "複習與鞏固清單"
    },
    theorySec: {
      title: "DSE 重點透鏡觀念",
      convexTitle: "1. 凸透鏡 (Convex / Converging Lens)",
      convexDesc: "中間厚、邊緣薄。能將平行光線折射並會聚於真實的主焦點 F 上。",
      concaveTitle: "2. 凹透鏡 (Concave / Diverging Lens)",
      concaveDesc: "中間薄、邊緣厚。能將平行光線發散，使光線彷彿從虛擬的主焦點 F 射出。",
      signTitle: "DSE 正負值約定：實物實像為正 (Real-is-Positive)",
      signDesc: "在 HKDSE 課程中，最普遍使用的是「實物實像為正」常規：",
      signList: [
        "物距 (u)：實物恆為正值 (+ve)。",
        "像距 (v)：實像為正值 (+ve，在透鏡另一側)；虛像為負值 (-ve，在物體同側)。",
        "焦距 (f)：凸透鏡（會聚）為正值 (+ve)；凹透鏡（發散）為負值 (-ve)。"
      ],
      formulas: "核心計算公式",
      formula1: "透鏡公式 (Lens Formula):",
      formula2: "線性放大率 (Linear Magnification):",
      threeRaysTitle: "三條特殊光線 (The Three Principal Rays)",
      threeRaysList: [
        "光線 1 (平行)：平行於主光軸的入射光線，折射後通過（或看似來自）主焦點 F。",
        "光線 2 (中心)：通過光心 C 的入射光線，方向不變，筆直穿過。",
        "光線 3 (焦點)：通過（或指向）主焦點 F 的入射光線，折射後平行於主光軸。"
      ]
    },
    simSec: {
      title: "互動透鏡實驗模擬",
      controls: "參數控制面板",
      lensType: "透鏡類型",
      convex: "凸透鏡 (會聚)",
      concave: "凹透鏡 (發散)",
      focalLength: "焦距 (f)",
      objectDist: "物距 (u)",
      objectHeight: "物體高度 (h)",
      natureTitle: "折射成像物理屬性",
      natureLabels: {
        formula: "公式計算：",
        u: "物距 (u) =",
        v: "像距 (v) =",
        m: "放大率 (m) =",
        type: "成像性質：",
        real: "實像 (Real Image - 可用光屏接收)",
        virtual: "虛像 (Virtual Image - 不能用光屏接收，需透過透鏡觀察)",
        inverted: "倒立 (Inverted)",
        erect: "正立 (Erect)",
        magnified: "放大 (Magnified)",
        diminished: "縮小 (Diminished)",
        sameSize: "等大"
      }
    },
    drillSec: {
      title: "光路作圖動手特訓",
      instructions: "作圖指引：拖拽右側的黃色與紅色圓點，調整折射光線的路徑！當接近正確路徑時會自動磁吸。當兩條光線均正確對齊時，將成功解鎖像的位置！",
      level: "選擇訓練情境：",
      lvl1: "凸透鏡：物體在 2F 以外 (成實像、縮小)",
      lvl2: "凸透鏡：物體在 F 以內 (成虛像、放大 / 放大鏡)",
      lvl3: "凹透鏡：正立縮小虛像",
      checkBtn: "驗證光路圖",
      resetBtn: "重設控制點",
      nextChallengeBtn: "新練習 (同關卡)",
      nextLevelBtn: "進入下一關",
      nextBtnFinal: "重頭挑戰第 1 關",
      feedbackCorrect: "太棒了！你的折射光路符合物理規律且非常精準！🎉",
      feedbackWrong: "光路尚未對齊。提示：平行光線折射後應通過焦點 F'，通過光心 C 的光線應筆直穿過。請點擊「重設」再次嘗試。",
      parallelRay: "平行軸入射線",
      centralRay: "過光心入射線",
      emergentParallel: "平行入射 -> 折射後必須精確通過右側焦點 F'",
      emergentCentral: "過光心入射 -> 折射後必須筆直前進不偏折",
      concaveEmergentParallel: "平行入射 -> 折射後其反向延長線必須指向左側焦點 F",
      successTitle: "解鎖成像！",
      exerciseLabel: "練習題："
    },
    misconSec: {
      title: "DSE 迷思與考點拆解",
      myth: "學生常見錯誤觀念",
      reality: "科學事實與 DSE 評分重點"
    },
    exerciseSec: {
      title: "DSE 歷屆風格模擬題",
      hint: "顯示提示",
      check: "核對答案",
      correct: "答對了！非常優秀！",
      incorrect: "答案不正確，再想一想！",
      retry: "重試",
      q1: {
        q: "一物體最初置於凸透鏡前 1.5f 處。若物體慢慢遠離透鏡至 2.5f 處，下列哪項關於其像的描述是正確的？",
        opts: [
          "像保持為實像，並變為放大，且向透鏡移動。",
          "像保持為實像，並變為縮小，且向透鏡移動。",
          "像變為正立、放大的虛像。",
          "像保持為實像，並變為縮小，且遠離透鏡。"
        ],
        ans: 1,
        hint: "當 u = 1.5f (在 F 與 2F 之間) 時，成放大、倒立實像於 2F 以外。當 u = 2.5f (在 2F 以外) 時，成縮小、倒立實像於 F 與 2F 之間。",
        explain: "對於凸透鏡，當實物遠離透鏡時，其所成的實像必定會向透鏡靠近，且體積逐漸變小。"
      },
      q2: {
        q: "學生利用焦距為 12 cm 的凸透鏡作為放大鏡觀察郵票。所得的正立虛像大小為郵票的 3 倍。求郵票與透鏡之間的距離。",
        opts: [
          "4 cm",
          "8 cm",
          "16 cm",
          "24 cm"
        ],
        ans: 1,
        hint: "由於是正立虛像，放大率 m = -v/u = 3，得 v = -3u。代入透鏡公式：1/u + 1/v = 1/f。",
        explain: "利用 1/u + 1/v = 1/f，其中 f = +12 cm，v = -3u： 1/u - 1/(3u) = 1/12 => 2/(3u) = 1/12 => 3u = 24 => u = 8 cm."
      },
      q3: {
        q: "若用一張黑紙將凸透鏡的上半部分遮擋，在光屏上所成的蠟燭實像會發生甚麼變化？",
        opts: [
          "光屏上只會顯示蠟燭下半部分的像。",
          "光屏上只會顯示蠟燭上半部分的像。",
          "光屏上仍顯示完整的像，但亮度變暗。",
          "光屏上將完全無法成像。"
        ],
        ans: 2,
        hint: "透鏡的每一個部分都將光線匯聚以形成完整的像。考慮通過透鏡的總光線量變化。",
        explain: "來自蠟燭各點的光線依然能通過透鏡未被遮擋的下半部折射並會聚，形成完整的像。但因為通過的光線總量減少了一半，成像的亮度會相應減弱。"
      }
    },
    consolidationSec: {
      title: "DSE 核心複習對照表",
      tableHeader: {
        lens: "透鏡種類",
        pos: "物體位置 (u)",
        imgPos: "成像位置 (v)",
        nature: "成像性質",
        app: "常見生活應用"
      },
      checklistTitle: "DSE 學習進度自測清單",
      checklist: [
        "我能畫出光路圖以確定凸透鏡和凹透鏡所成的像。",
        "我能解釋並區分實像 (Real Image) 與虛像 (Virtual Image)。",
        "我能正確運用透鏡公式 (1/u + 1/v = 1/f) 及其正負常規進行計算。",
        "我能計算線性放大率 (m = v/u = h_i / h_o)。",
        "我能解釋遮擋部分透鏡只會降低成像亮度，而不會切除一半成像的原因。"
      ]
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('EN');
  const [activeTab, setActiveTab] = useState('theory');

  // --- Simulation State ---
  const [lensType, setLensType] = useState('convex'); // 'convex' | 'concave'
  const [focalLength, setFocalLength] = useState(100);
  const [objectDist, setObjectDist] = useState(180);
  const [objectHeight, setObjectHeight] = useState(50);

  // --- Drill State & Dataset ---
  const [drillLevel, setDrillLevel] = useState(1); // 1, 2, 3
  const [drillChallengeIdx, setDrillChallengeIdx] = useState(0); // 0, 1, 2 per level
  const [ray1TargetY, setRay1TargetY] = useState(250); // Initial target Y for Ray 1
  const [ray2TargetY, setRay2TargetY] = useState(240); // Initial target Y for Ray 2
  const [isDragging, setIsDragging] = useState(null); // 'ray1' | 'ray2'
  const [drillFeedback, setDrillFeedback] = useState(null); // { success: boolean, text: string }
  const [isDrillSuccess, setIsDrillSuccess] = useState(false);
  const drillSvgRef = useRef(null);

  // --- Exercise State ---
  const [userAnswers, setUserAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [submitted, setSubmitted] = useState({});

  // --- Checklist State ---
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);

  const activeTrans = t[lang];

  // Helper for toggle language
  const toggleLanguage = () => {
    setLang(prev => (prev === 'EN' ? 'TC' : 'EN'));
  };

  // Lens formula calculations (Real-is-positive convention)
  const f_val = lensType === 'convex' ? focalLength : -focalLength;
  const u_val = objectDist;
  
  // 1/v = 1/f - 1/u => v = (u * f) / (u - f)
  let v_val = 0;
  let isInfinity = false;
  if (Math.abs(u_val - f_val) < 0.01) {
    isInfinity = true;
  } else {
    v_val = (u_val * f_val) / (u_val - f_val);
  }

  const mag = isInfinity ? Infinity : Math.abs(v_val / u_val);

  // Dynamically computes ray paths & snapper goals from actual physical equations
  const getDrillParams = (level, challengeIdx) => {
    // 3 distinct exercises per level
    const challenges = {
      1: [
        { u: 240, f: 100, h: 60, type: 'convex', nameEN: "Exercise A", nameTC: "練習 A" },
        { u: 220, f: 90, h: 50, type: 'convex', nameEN: "Exercise B", nameTC: "練習 B" },
        { u: 250, f: 110, h: 70, type: 'convex', nameEN: "Exercise C", nameTC: "練習 C" }
      ],
      2: [
        { u: 60, f: 100, h: 40, type: 'convex', nameEN: "Exercise A", nameTC: "練習 A" },
        { u: 70, f: 110, h: 50, type: 'convex', nameEN: "Exercise B", nameTC: "練習 B" },
        { u: 50, f: 85, h: 35, type: 'convex', nameEN: "Exercise C", nameTC: "練習 C" }
      ],
      3: [
        { u: 140, f: 100, h: 65, type: 'concave', nameEN: "Exercise A", nameTC: "練習 A" },
        { u: 180, f: 120, h: 75, type: 'concave', nameEN: "Exercise B", nameTC: "練習 B" },
        { u: 100, f: 80, h: 50, type: 'concave', nameEN: "Exercise C", nameTC: "練習 C" }
      ]
    };

    const base = challenges[level]?.[challengeIdx] || challenges[1][0];
    const { u, f, h, type, nameEN, nameTC } = base;

    // Ray 1 Target Y Calculation (Real-is-Positive Physics slope equation evaluated at X = 480)
    let correctY1 = 200;
    if (type === 'convex') {
      correctY1 = 200 + (h / f) * (180 - f);
    } else { // concave
      correctY1 = 200 - h - (180 * h) / f;
    }

    // Ray 2 Target Y Calculation (optical straight pass through C evaluated at X = 480)
    const correctY2 = 200 + (180 * h) / u;

    // Image coordinates in the diagram
    const f_signed = type === 'convex' ? f : -f;
    const v = (u * f_signed) / (u - f_signed);
    const imageX = 300 + v;
    const imageY = 200 + (v / u) * h;

    return {
      type,
      u,
      f,
      h,
      correctY1,
      correctY2,
      imageX,
      imageY,
      v,
      name: lang === 'EN' ? nameEN : nameTC
    };
  };

  const drillParams = getDrillParams(drillLevel, drillChallengeIdx);

  // Trigger reset of interactive handle positions when scenario OR sub-exercise changes
  useEffect(() => {
    setRay1TargetY(200);
    setRay2TargetY(220);
    setIsDrillSuccess(false);
    setDrillFeedback(null);
  }, [drillLevel, drillChallengeIdx]);

  // Handle Dragging initialization
  const handleMouseDown = (handle, e) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleTouchStart = (handle, e) => {
    if (e.cancelable) e.preventDefault();
    setIsDragging(handle);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const svg = drillSvgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      const relativeY = ((clientY - rect.top) / rect.height) * 400;
      const clampedY = Math.max(20, Math.min(380, relativeY));

      const snapThreshold = 12; // Snap window

      if (isDragging === 'ray1') {
        let finalY = clampedY;
        if (Math.abs(clampedY - drillParams.correctY1) < snapThreshold) {
          finalY = drillParams.correctY1; // Magnetic snap
        }
        setRay1TargetY(finalY);
      } else if (isDragging === 'ray2') {
        let finalY = clampedY;
        if (Math.abs(clampedY - drillParams.correctY2) < snapThreshold) {
          finalY = drillParams.correctY2; // Magnetic snap
        }
        setRay2TargetY(finalY);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('touchmove', handleGlobalMouseMove, { passive: false });
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, drillParams]);

  // Loads another unique exercise within the same level
  const handleNextChallenge = () => {
    setDrillChallengeIdx(prev => (prev + 1) % 3);
  };

  // Transitions directly to the next level
  const handleNextLevel = () => {
    setDrillChallengeIdx(0);
    if (drillLevel < 3) {
      setDrillLevel(prev => prev + 1);
    } else {
      setDrillLevel(1);
    }
  };

  const verifyDrill = () => {
    const errorMargin = 8; // Pixel tolerance
    const diff1 = Math.abs(ray1TargetY - drillParams.correctY1);
    const diff2 = Math.abs(ray2TargetY - drillParams.correctY2);

    if (diff1 <= errorMargin && diff2 <= errorMargin) {
      setIsDrillSuccess(true);
      setDrillFeedback({
        success: true,
        text: activeTrans.drillSec.feedbackCorrect
      });
    } else {
      setIsDrillSuccess(false);
      setDrillFeedback({
        success: false,
        text: activeTrans.drillSec.feedbackWrong
      });
    }
  };

  // Handle quiz options selection
  const handleSelectOption = (qId, optIdx) => {
    if (submitted[qId]) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const checkAnswer = (qId, correctIdx) => {
    setSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  const resetQuestion = (qId) => {
    setUserAnswers(prev => ({ ...prev, [qId]: undefined }));
    setSubmitted(prev => ({ ...prev, [qId]: false }));
    setShowHints(prev => ({ ...prev, [qId]: false }));
  };

  const toggleChecklistItem = (index) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top bilingual Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {activeTrans.title}
              </h1>
              <p className="text-xs text-slate-400">{activeTrans.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Languages className="h-4 w-4 text-indigo-400" />
            <span>{activeTrans.toggleLang}</span>
          </button>
        </div>
      </header>

      {/* Main Tab Interface */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 bg-slate-800/50 p-1.5 rounded-xl border border-slate-800 scrollbar-none">
          {Object.keys(activeTrans.tabs).map((tabKey) => {
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tabKey === 'theory' && <BookOpen className="h-4 w-4" />}
                {tabKey === 'simulation' && <Maximize className="h-4 w-4" />}
                {tabKey === 'drill' && <RefreshCw className="h-4 w-4" />}
                {tabKey === 'misconceptions' && <AlertTriangle className="h-4 w-4" />}
                {tabKey === 'exercise' && <HelpCircle className="h-4 w-4" />}
                {tabKey === 'consolidation' && <CheckSquare className="h-4 w-4" />}
                {activeTrans.tabs[tabKey]}
              </button>
            );
          })}
        </div>

        {/* Content Section wrapper */}
        <div className="bg-slate-800/40 rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl min-h-[500px]">
          
          {/* 1. THEORY TAB */}
          {activeTab === 'theory' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                  <BookOpen className="h-6 w-6" />
                  {activeTrans.theorySec.title}
                </h2>
              </div>

              {/* Grid block for Convex and Concave definitions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">{activeTrans.theorySec.convexTitle}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{activeTrans.theorySec.convexDesc}</p>
                  <div className="flex justify-center bg-slate-950 p-4 rounded-lg">
                    {/* SVG representing Convex Lens refraction */}
                    <svg viewBox="0 0 300 140" className="w-full max-w-[240px] h-auto">
                      <line x1="20" y1="70" x2="280" y2="70" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                      {/* Convex Lens symbol */}
                      <path d="M 150 15 Q 165 70 150 125" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <path d="M 150 15 Q 135 70 150 125" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      {/* Rays */}
                      <path d="M 20 30 L 150 30 L 230 70 L 280 95" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      <path d="M 20 110 L 150 110 L 230 70 L 280 45" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      <circle cx="230" cy="70" r="3" fill="#38bdf8" />
                      <text x="230" y="60" fill="#38bdf8" fontSize="11" textAnchor="middle">F</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">{activeTrans.theorySec.concaveTitle}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{activeTrans.theorySec.concaveDesc}</p>
                  <div className="flex justify-center bg-slate-950 p-4 rounded-lg">
                    {/* SVG representing Concave Lens refraction */}
                    <svg viewBox="0 0 300 140" className="w-full max-w-[240px] h-auto">
                      <line x1="20" y1="70" x2="280" y2="70" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                      {/* Concave Lens symbol */}
                      <path d="M 145 15 Q 155 70 145 125" fill="none" stroke="#a855f7" strokeWidth="3" />
                      <path d="M 155 15 Q 145 70 155 125" fill="none" stroke="#a855f7" strokeWidth="3" />
                      <line x1="140" y1="15" x2="160" y2="15" stroke="#a855f7" strokeWidth="3" />
                      <line x1="140" y1="125" x2="160" y2="125" stroke="#a855f7" strokeWidth="3" />
                      {/* Incident rays (parallel, y=48 and y=92) then refracted collinear with F */}
                      {/* Top: lens hit (150,48), slope=(48-70)/(150-80)=-22/70; at x=280: y≈7 */}
                      <path d="M 20 48 L 150 48 L 280 7" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      {/* Bottom: lens hit (150,92), slope=(92-70)/(150-80)=+22/70; at x=280: y≈133 */}
                      <path d="M 20 92 L 150 92 L 280 133" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                      {/* Dashed virtual focus extension – collinear with refracted rays above */}
                      <path d="M 150 48 L 80 70" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                      <path d="M 150 92 L 80 70" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                      <circle cx="80" cy="70" r="3" fill="#a855f7" />
                      <text x="80" y="60" fill="#a855f7" fontSize="11" textAnchor="middle">F</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Form Conventions */}
              <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  {activeTrans.theorySec.signTitle}
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{activeTrans.theorySec.signDesc}</p>
                <ul className="space-y-2.5 text-sm text-slate-300 list-disc list-inside">
                  {activeTrans.theorySec.signList.map((item, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Formulas section with clean block rendering */}
              <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 p-6 rounded-xl border border-indigo-900/40">
                <h3 className="text-lg font-bold text-white mb-4">{activeTrans.theorySec.formulas}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-950/80 p-5 rounded-lg border border-slate-800 flex flex-col justify-center">
                    <span className="text-xs text-indigo-400 font-bold tracking-wider uppercase mb-1">
                      {activeTrans.theorySec.formula1}
                    </span>
                    <div className="text-2xl font-mono text-center my-2 text-white font-semibold">
                      <span className="text-indigo-400">1</span>/u + <span className="text-emerald-400">1</span>/v = <span className="text-rose-400">1</span>/f
                    </div>
                    <span className="text-xs text-slate-400 mt-2 text-center">
                      (u = Object Distance, v = Image Distance, f = Focal Length)
                    </span>
                  </div>

                  <div className="bg-slate-950/80 p-5 rounded-lg border border-slate-800 flex flex-col justify-center">
                    <span className="text-xs text-cyan-400 font-bold tracking-wider uppercase mb-1">
                      {activeTrans.theorySec.formula2}
                    </span>
                    <div className="text-2xl font-mono text-center my-2 text-white font-semibold">
                      m = h<sub>i</sub> / h<sub>o</sub> = |v| / u
                    </div>
                    <span className="text-xs text-slate-400 mt-2 text-center">
                      (m = Linear Magnification, h_i = Image Height, h_o = Object Height)
                    </span>
                  </div>
                </div>
              </div>

              {/* Principal Rays Details */}
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/50 space-y-4">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{activeTrans.theorySec.threeRaysTitle}</h3>
                <div className="space-y-4">
                  {activeTrans.theorySec.threeRaysList.map((rayDesc, idx) => (
                    <div key={idx} className="flex gap-3 items-start bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">{rayDesc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. INTERACTIVE SIMULATION TAB */}
          {activeTab === 'simulation' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                  <Maximize className="h-6 w-6" />
                  {activeTrans.simSec.title}
                </h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Control sliders (Left panel) */}
                <div className="lg:col-span-4 bg-slate-900/60 p-6 rounded-xl border border-slate-800 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-indigo-500 rounded-full inline-block"></span>
                      {activeTrans.simSec.controls}
                    </h3>

                    {/* Lens selector */}
                    <div className="space-y-3 mb-6">
                      <label className="text-xs text-slate-400 font-bold tracking-wider uppercase">
                        {activeTrans.simSec.lensType}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => { setLensType('convex'); }}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                            lensType === 'convex'
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {activeTrans.simSec.convex}
                        </button>
                        <button
                          onClick={() => { setLensType('concave'); }}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                            lensType === 'concave'
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {activeTrans.simSec.concave}
                        </button>
                      </div>
                    </div>

                    {/* Variable Sliders */}
                    <div className="space-y-5">
                      {/* Focal length f */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300">{activeTrans.simSec.focalLength}</span>
                          <span className="text-indigo-400 font-mono font-semibold">{focalLength} px</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          step="5"
                          value={focalLength}
                          onChange={(e) => setFocalLength(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Object distance u */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300">{activeTrans.simSec.objectDist}</span>
                          <span className="text-indigo-400 font-mono font-semibold">{objectDist} px</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="320"
                          step="5"
                          value={objectDist}
                          onChange={(e) => setObjectDist(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Object height ho */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300">{activeTrans.simSec.objectHeight}</span>
                          <span className="text-indigo-400 font-mono font-semibold">{objectHeight} px</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="80"
                          step="5"
                          value={objectHeight}
                          onChange={(e) => setObjectHeight(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculations Live readout */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                      {activeTrans.simSec.natureTitle}
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between font-mono">
                        <span>{activeTrans.simSec.natureLabels.u}</span>
                        <span className="font-semibold text-white">{u_val} px</span>
                      </div>
                      <div className="flex justify-between font-mono border-b border-slate-800/80 pb-1.5">
                        <span>{activeTrans.simSec.natureLabels.v}</span>
                        <span className="font-semibold text-white">
                          {isInfinity ? '∞' : `${v_val.toFixed(1)} px`}
                        </span>
                      </div>
                      <div className="flex justify-between font-mono border-b border-slate-800/80 pb-1.5">
                        <span>{activeTrans.simSec.natureLabels.m}</span>
                        <span className="font-semibold text-white">
                          {isInfinity ? '∞' : mag.toFixed(2)}
                        </span>
                      </div>

                      {/* Decoded image nature details */}
                      <div className="pt-1.5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-1">
                          {activeTrans.simSec.natureLabels.type}
                        </span>
                        {isInfinity ? (
                          <span className="text-amber-400 font-medium font-semibold text-sm">
                            {lang === 'EN' ? 'No clear image (At Infinity)' : '無限遠處不成清晰像'}
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {/* Real/Virtual badge */}
                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              v_val > 0 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' 
                                : 'bg-rose-950 text-rose-400 border border-rose-900/50'
                            }`}>
                              {v_val > 0 ? activeTrans.simSec.natureLabels.real : activeTrans.simSec.natureLabels.virtual}
                            </span>
                            {/* Inverted/Erect badge */}
                            <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                              {v_val > 0 ? activeTrans.simSec.natureLabels.inverted : activeTrans.simSec.natureLabels.erect}
                            </span>
                            {/* Magnification size badge */}
                            <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                              {mag > 1.05 
                                ? activeTrans.simSec.natureLabels.magnified 
                                : mag < 0.95 
                                  ? activeTrans.simSec.natureLabels.diminished 
                                  : activeTrans.simSec.natureLabels.sameSize}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulation Canvas / SVG (Right panel) */}
                <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-800 p-4 relative overflow-hidden">
                  
                  {/* Interactive SVG Diagram */}
                  <div className="w-full overflow-x-auto">
                    <svg viewBox="0 0 600 400" className="w-full min-w-[550px] h-[360px] mx-auto select-none">
                      {/* Grid Lines for layout help */}
                      <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="0.5">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                        ))}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <line key={`h-${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
                        ))}
                      </g>

                      {/* Principal Axis */}
                      <line x1="10" y1="200" x2="590" y2="200" stroke="#64748b" strokeWidth="2" />
                      
                      {/* Focal Marks */}
                      {/* Left Focus F */}
                      <circle cx={300 - focalLength} cy="200" r="4" fill="#38bdf8" />
                      <text x={300 - focalLength} y="220" fill="#38bdf8" fontSize="12" textAnchor="middle" className="font-bold">F</text>
                      {/* Left 2F */}
                      <circle cx={300 - 2 * focalLength} cy="200" r="4" fill="#38bdf8" />
                      <text x={300 - 2 * focalLength} y="220" fill="#38bdf8" fontSize="12" textAnchor="middle" className="font-bold">2F</text>
                      
                      {/* Right Focus F' */}
                      <circle cx={300 + focalLength} cy="200" r="4" fill="#38bdf8" />
                      <text x={300 + focalLength} y="220" fill="#38bdf8" fontSize="12" textAnchor="middle" className="font-bold">F'</text>
                      {/* Right 2F' */}
                      <circle cx={300 + 2 * focalLength} cy="200" r="4" fill="#38bdf8" />
                      <text x={300 + 2 * focalLength} y="220" fill="#38bdf8" fontSize="12" textAnchor="middle" className="font-bold">2F'</text>

                      {/* Center Mark C */}
                      <text x="290" y="220" fill="#94a3b8" fontSize="12" className="italic font-bold">C</text>

                      {/* Object Drawing */}
                      {/* X_obj = 300 - u_val */}
                      <g stroke="#3b82f6" strokeWidth="3">
                        <line x1={300 - objectDist} y1="200" x2={300 - objectDist} y2={200 - objectHeight} />
                        {/* Object Arrow Head */}
                        <path d={`M ${300 - objectDist - 6} ${200 - objectHeight + 10} L ${300 - objectDist} ${200 - objectHeight} L ${300 - objectDist + 6} ${200 - objectHeight + 10}`} fill="none" strokeWidth="2.5" />
                      </g>
                      <text x={300 - objectDist} y={200 - objectHeight - 8} fill="#3b82f6" fontSize="12" textAnchor="middle" className="font-bold">
                        {lang === 'EN' ? 'Object (O)' : '物體 (O)'}
                      </text>

                      {/* Image Drawing (if not infinity) */}
                      {!isInfinity && (
                        <g>
                          {/* X_img = 300 + v_val, Height_img = - (v_val/u_val) * ho */}
                          {/* Real Image: v_val > 0, Virtual Image: v_val < 0 */}
                          <g stroke={v_val > 0 ? "#10b981" : "#f43f5e"} strokeWidth="3" strokeDasharray={v_val > 0 ? "none" : "3 3"}>
                            <line x1={300 + v_val} y1="200" x2={300 + v_val} y2={200 + (v_val / objectDist) * objectHeight} />
                            {/* Image Arrow Head */}
                            {v_val > 0 ? (
                              // Inverted Arrow pointing Down
                              <path d={`M ${300 + v_val - 6} ${200 + (v_val / objectDist) * objectHeight - 10} L ${300 + v_val} ${200 + (v_val / objectDist) * objectHeight} L ${300 + v_val + 6} ${200 + (v_val / objectDist) * objectHeight - 10}`} fill="none" strokeWidth="2.5" />
                            ) : (
                              // Erect Arrow pointing Up
                              <path d={`M ${300 + v_val - 6} ${200 + (v_val / objectDist) * objectHeight + 10} L ${300 + v_val} ${200 + (v_val / objectDist) * objectHeight} L ${300 + v_val + 6} ${200 + (v_val / objectDist) * objectHeight + 10}`} fill="none" strokeWidth="2.5" />
                            )}
                          </g>
                          <text 
                            x={300 + v_val} 
                            y={v_val > 0 ? 200 + (v_val / objectDist) * objectHeight + 16 : 200 + (v_val / objectDist) * objectHeight - 8} 
                            fill={v_val > 0 ? "#10b981" : "#f43f5e"} 
                            fontSize="12" 
                            textAnchor="middle" 
                            className="font-bold"
                          >
                            {lang === 'EN' ? 'Image (I)' : '像 (I)'}
                          </text>
                        </g>
                      )}

                      {/* Lens Representation Drawing */}
                      <g stroke={lensType === 'convex' ? "#38bdf8" : "#a855f7"} strokeWidth="3">
                        <line x1="300" y1="30" x2="300" y2="370" />
                        {lensType === 'convex' ? (
                          <>
                            {/* Top Arrow pointing outwards */}
                            <path d="M 292 42 L 300 30 L 308 42" fill="none" />
                            {/* Bottom Arrow pointing outwards */}
                            <path d="M 292 358 L 300 370 L 308 358" fill="none" />
                          </>
                        ) : (
                          <>
                            {/* Top Arrow pointing inwards */}
                            <path d="M 292 30 L 300 42 L 308 30" fill="none" />
                            {/* Bottom Arrow pointing inwards */}
                            <path d="M 292 370 L 300 358 L 308 370" fill="none" />
                          </>
                        )}
                      </g>

                      {/* --- LIGHT RAYS --- */}
                      {/* 1. Parallel Ray (Red) */}
                      <line x1={300 - objectDist} y1="200" x2={300 - objectDist} y2={200 - objectHeight} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" />
                      <line x1={300 - objectDist} y1={200 - objectHeight} x2="300" y2={200 - objectHeight} stroke="#ef4444" strokeWidth="1.5" />
                      {/* Arrow marker on Incident parallel ray */}
                      <path d={`M 150 ${198 - objectHeight} L 156 ${200 - objectHeight} L 150 ${202 - objectHeight}`} fill="none" stroke="#ef4444" strokeWidth="1.5" />

                      {/* Refracted Parallel Ray */}
                      {lensType === 'convex' ? (
                        <>
                          {/* Goes through Focus F' (300+f, 200) */}
                          <line 
                            x1="300" 
                            y1={200 - objectHeight} 
                            x2={300 + focalLength * 2.5} 
                            y2={200 + (objectHeight / focalLength) * (focalLength * 2.5 - focalLength)} 
                            stroke="#ef4444" 
                            strokeWidth="1.5" 
                          />
                          {v_val < 0 && !isInfinity && (
                            // Dashed virtual backward projection
                            <line 
                              x1="300" 
                              y1={200 - objectHeight} 
                              x2={300 + v_val} 
                              y2={200 + (v_val / objectDist) * objectHeight} 
                              stroke="#ef4444" 
                              strokeWidth="1.2" 
                              strokeDasharray="3 3" 
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {/* Diverges from Left Focus F (300-f, 200) */}
                          <line 
                            x1="300" 
                            y1={200 - objectHeight} 
                            x2="500" 
                            y2={200 - objectHeight - (objectHeight / focalLength) * 200} 
                            stroke="#ef4444" 
                            strokeWidth="1.5" 
                          />
                          {/* Virtual backward extension to left focus F */}
                          <line 
                            x1="300" 
                            y1={200 - objectHeight} 
                            x2={300 - focalLength} 
                            y2="200" 
                            stroke="#ef4444" 
                            strokeWidth="1.2" 
                            strokeDasharray="3 3" 
                          />
                        </>
                      )}

                      {/* 2. Central Ray (Green) */}
                      <line 
                        x1={300 - objectDist} 
                        y1={200 - objectHeight} 
                        x2={Math.min(590, 300 + (300 / objectDist) * objectDist)} 
                        y2={200 + (300 / objectDist) * objectHeight} 
                        stroke="#10b981" 
                        strokeWidth="1.5" 
                      />
                      {v_val < 0 && !isInfinity && (
                        // Virtual backward extension
                        <line 
                          x1={300 - objectDist} 
                          y1={200 - objectHeight} 
                          x2={300 + v_val} 
                          y2={200 + (v_val / objectDist) * objectHeight} 
                          stroke="#10b981" 
                          strokeWidth="1.2" 
                          strokeDasharray="3 3" 
                        />
                      )}
                    </svg>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2 flex flex-col sm:flex-row justify-between border-t border-slate-800/80 pt-2 gap-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-red-500 inline-block rounded-sm"></span>
                      {lang === 'EN' ? 'Ray 1: Parallel Refraction' : '光線 1：平行軸折射'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-500 inline-block rounded-sm"></span>
                      {lang === 'EN' ? 'Ray 2: Central Path' : '光線 2：直穿光心線'}
                    </span>
                    <span>
                      {lang === 'EN' ? '*Note: Virtual extensions are drawn in dashed lines.' : '*註：虛擬延長線以虛線表示。'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. RAY DRAWING DRILL TAB */}
          {}
          {activeTab === 'drill' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                    <RefreshCw className="h-6 w-6" />
                    {activeTrans.drillSec.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{activeTrans.drillSec.instructions}</p>
                </div>
                
                {/* Level Selectors */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-400 font-bold tracking-wider uppercase">
                    {activeTrans.drillSec.level}
                  </label>
                  <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                    {[1, 2, 3].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => { 
                          setDrillLevel(lvl); 
                          setDrillChallengeIdx(0); // Reset challenge index when jumping levels manually
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                          drillLevel === lvl
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {lang === 'EN' ? `Lvl ${lvl}` : `關卡 ${lvl}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Header for levels & exercises */}
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 text-xs font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/60 rounded-md">
                    {lang === 'EN' ? `Level ${drillLevel}` : `關卡 ${drillLevel}`}
                  </span>
                  <span className="text-sm font-bold text-cyan-400">
                    {drillLevel === 1 && activeTrans.drillSec.lvl1}
                    {drillLevel === 2 && activeTrans.drillSec.lvl2}
                    {drillLevel === 3 && activeTrans.drillSec.lvl3}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="bg-slate-950 px-2 py-1 rounded font-mono border border-slate-800 text-emerald-400 font-semibold">
                    {activeTrans.drillSec.exerciseLabel} {drillParams.name}
                  </span>
                  <span className="italic text-slate-500">
                    f = {drillParams.f}px, u = {drillParams.u}px, h = {drillParams.h}px
                  </span>
                </div>
              </div>

              {/* Interactive Drawing Frame */}
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Visual Engine Wrapper with Relative Container */}
                <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-4 relative">
                  <svg 
                    ref={drillSvgRef} 
                    viewBox="0 0 600 400" 
                    className="w-full h-[360px] mx-auto select-none overflow-visible"
                  >
                    {/* Grid lines */}
                    <g stroke="#ffffff" strokeOpacity="0.02" strokeWidth="0.5">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <line key={`vd-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
                      ))}
                    </g>

                    {/* Principal axis */}
                    <line x1="10" y1="200" x2="590" y2="200" stroke="#475569" strokeWidth="1.5" />

                    {/* Focus Points F / F' (Dynamically placed based on the current challenge's focus value) */}
                    <circle cx={300 - drillParams.f} cy="200" r="4" fill="#38bdf8" />
                    <text x={300 - drillParams.f} y="222" fill="#38bdf8" fontSize="11" textAnchor="middle" className="font-bold">F</text>
                    <circle cx={300 + drillParams.f} cy="200" r="4" fill="#38bdf8" />
                    <text x={300 + drillParams.f} y="222" fill="#38bdf8" fontSize="11" textAnchor="middle" className="font-bold">F'</text>

                    {/* Object */}
                    <g stroke="#3b82f6" strokeWidth="3">
                      <line x1={300 - drillParams.u} y1="200" x2={300 - drillParams.u} y2={200 - drillParams.h} />
                      <path d={`M ${300 - drillParams.u - 5} ${200 - drillParams.h + 8} L ${300 - drillParams.u} ${200 - drillParams.h} L ${300 - drillParams.u + 5} ${200 - drillParams.h + 8}`} fill="none" />
                    </g>
                    <text x={300 - drillParams.u} y={200 - drillParams.h - 8} fill="#3b82f6" fontSize="12" textAnchor="middle" className="font-bold">O</text>

                    {/* Target Image (Revealed only when drill is verified successfully) */}
                    {isDrillSuccess && (
                      <g className="animate-bounce">
                        <line 
                          x1={drillParams.imageX} 
                          y1="200" 
                          x2={drillParams.imageX} 
                          y2={drillParams.imageY} 
                          stroke="#10b981" 
                          strokeWidth="3" 
                        />
                        {drillParams.imageY > 200 ? (
                          <path d={`M ${drillParams.imageX - 5} ${drillParams.imageY - 8} L ${drillParams.imageX} ${drillParams.imageY} L ${drillParams.imageX + 5} ${drillParams.imageY - 8}`} fill="none" stroke="#10b981" strokeWidth="3" />
                        ) : (
                          <path d={`M ${drillParams.imageX - 5} ${drillParams.imageY + 8} L ${drillParams.imageX} ${drillParams.imageY} L ${drillParams.imageX + 5} ${drillParams.imageY + 8}`} fill="none" stroke="#10b981" strokeWidth="3" />
                        )}
                        <text 
                          x={drillParams.imageX} 
                          y={drillParams.imageY > 200 ? drillParams.imageY + 16 : drillParams.imageY - 8} 
                          fill="#10b981" 
                          fontSize="13" 
                          textAnchor="middle" 
                          className="font-bold animate-pulse"
                        >
                          {activeTrans.drillSec.successTitle}
                        </text>
                      </g>
                    )}

                    {/* Incident Rays - Rendered cleanly via JavaScript Expression coordinates */}
                    {/* Ray 1 (Parallel) */}
                    <line x1={300 - drillParams.u} y1={200 - drillParams.h} x2={300} y2={200 - drillParams.h} stroke="#ef4444" strokeWidth="2" />
                    <path d={`M 220 ${198 - drillParams.h} L 226 ${200 - drillParams.h} L 220 ${202 - drillParams.h}`} fill="none" stroke="#ef4444" strokeWidth="2" />

                    {/* Ray 2 (Central) */}
                    <line x1={300 - drillParams.u} y1={200 - drillParams.h} x2={300} y2={200} stroke="#eab308" strokeWidth="2" />

                    {/* Draggable/Interactive Refracted Paths */}
                    {/* Ray 1 Refracted Path - controlled by handle: from (300, 200-h) to (480, ray1TargetY) */}
                    <line 
                      x1="300" 
                      y1={200 - drillParams.h} 
                      x2="480" 
                      y2={ray1TargetY} 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                    />
                    {/* Extra extension beyond the handle line to x=580 */}
                    <line 
                      x1="480" 
                      y1={ray1TargetY} 
                      x2="580" 
                      y2={200 - drillParams.h + ((ray1TargetY - (200 - drillParams.h)) / 180) * 280} 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                    />

                    {/* Ray 2 Refracted Path - controlled by handle: from (300, 200) to (480, ray2TargetY) */}
                    <line 
                      x1="300" 
                      y1="200" 
                      x2="480" 
                      y2={ray2TargetY} 
                      stroke="#eab308" 
                      strokeWidth="2" 
                    />
                    <line 
                      x1="480" 
                      y1={ray2TargetY} 
                      x2="580" 
                      y2={200 + ((ray2TargetY - 200) / 180) * 280} 
                      stroke="#eab308" 
                      strokeWidth="2" 
                    />

                    {/* If Level 2 / 3, draw virtual backward extensions dynamically based on active handle location */}
                    {(drillLevel === 2 || drillLevel === 3) && (
                      <>
                        {/* Ray 1 virtual backward extension */}
                        <line 
                          x1="300" 
                          y1={200 - drillParams.h} 
                          x2="100" 
                          y2={200 - drillParams.h - ((ray1TargetY - (200 - drillParams.h)) / 180) * 200} 
                          stroke="#ef4444" 
                          strokeWidth="1.2" 
                          strokeDasharray="3 3" 
                        />
                        {/* Ray 2 virtual backward extension */}
                        <line 
                          x1="300" 
                          y1="200" 
                          x2="100" 
                          y2={200 - ((ray2TargetY - 200) / 180) * 200} 
                          stroke="#eab308" 
                          strokeWidth="1.2" 
                          strokeDasharray="3 3" 
                        />
                      </>
                    )}

                    {/* Interactive Draggable Handle Dots on X = 480 */}
                    {/* STATIC RADIUS CIRCLES WITH HOVER FILL TRANSITIONS - No CSS scaling/translation to guarantee 0% jumping! */}
                    <g>
                      {/* Vertical Handle Alignment Track Line */}
                      <line x1="480" y1="20" x2="480" y2="380" stroke="#334155" strokeDasharray="2 4" strokeWidth="1.5" />
                      
                      {/* Handle 1 (Ray 1 - Red) */}
                      <circle 
                        cx="480" 
                        cy={ray1TargetY} 
                        r="12" 
                        fill="#ef4444" 
                        stroke="#f87171" 
                        strokeWidth="2.5" 
                        className="cursor-ns-resize hover:fill-red-500 hover:stroke-white transition-colors duration-150"
                        onMouseDown={(e) => handleMouseDown('ray1', e)}
                        onTouchStart={(e) => handleTouchStart('ray1', e)}
                      />
                      <circle cx="480" cy={ray1TargetY} r="3.5" fill="#ffffff" pointerEvents="none" />

                      {/* Handle 2 (Ray 2 - Yellow) */}
                      <circle 
                        cx="480" 
                        cy={ray2TargetY} 
                        r="12" 
                        fill="#eab308" 
                        stroke="#fef08a" 
                        strokeWidth="2.5" 
                        className="cursor-ns-resize hover:fill-yellow-500 hover:stroke-white transition-colors duration-150"
                        onMouseDown={(e) => handleMouseDown('ray2', e)}
                        onTouchStart={(e) => handleTouchStart('ray2', e)}
                      />
                      <circle cx="480" cy={ray2TargetY} r="3.5" fill="#ffffff" pointerEvents="none" />
                    </g>

                    {/* Lens Representative Symbol */}
                    <g stroke={drillParams.type === 'convex' ? "#38bdf8" : "#a855f7"} strokeWidth="3">
                      <line x1="300" y1="30" x2="300" y2="370" />
                      {drillParams.type === 'convex' ? (
                        <>
                          <path d="M 292 40 L 300 30 L 308 40" fill="none" />
                          <path d="M 292 360 L 300 370 L 308 360" fill="none" />
                        </>
                      ) : (
                        <>
                          <path d="M 292 30 L 300 40 L 308 30" fill="none" />
                          <path d="M 292 370 L 300 360 L 308 370" fill="none" />
                        </>
                      )}
                    </g>
                  </svg>
                </div>

                {/* Info and Help panel (Right side of drill) */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-white flex items-center gap-2">
                      <Info className="h-5 w-5 text-indigo-400" />
                      {lang === 'EN' ? 'Ray Goal Alignment' : '折射光目標定位'}
                    </h3>

                    {/* Dynamic help description tailored to scenario */}
                    <div className="text-sm space-y-3 text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <div>
                        <span className="font-bold text-red-400 block text-xs tracking-wider uppercase mb-1">
                          {activeTrans.drillSec.parallelRay}
                        </span>
                        <p className="text-xs leading-relaxed text-slate-400">
                          {drillParams.type === 'concave' 
                            ? activeTrans.drillSec.concaveEmergentParallel 
                            : activeTrans.drillSec.emergentParallel}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800">
                        <span className="font-bold text-yellow-400 block text-xs tracking-wider uppercase mb-1">
                          {activeTrans.drillSec.centralRay}
                        </span>
                        <p className="text-xs leading-relaxed text-slate-400">
                          {activeTrans.drillSec.emergentCentral}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons & Validation output feedback */}
                  {}
                  <div className="space-y-3">
                    {drillFeedback && (
                      <div className={`p-4 rounded-xl flex flex-col gap-3 text-xs leading-relaxed border ${
                        drillFeedback.success 
                          ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-300 animate-fade-in' 
                          : 'bg-rose-950/80 border-rose-800/80 text-rose-300'
                      }`}>
                        <div className="flex gap-2.5 items-start">
                          {drillFeedback.success ? <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" /> : <XCircle className="h-5 w-5 flex-shrink-0 text-rose-400" />}
                          <div className="w-full">
                            <p className="font-bold text-sm mb-0.5">{drillFeedback.success ? 'Success!' : 'Try Again!'}</p>
                            <p className="text-slate-300">{drillFeedback.text}</p>
                          </div>
                        </div>
                        
                        {/* Dual Trigger Option Box revealed only on correct match */}
                        {drillFeedback.success && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-800/40">
                            {/* Button 1: Next Challenge in Same Level */}
                            <button
                              onClick={handleNextChallenge}
                              className="flex items-center justify-center gap-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-[11px] cursor-pointer transition active:scale-95 shadow-md shadow-cyan-600/10"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>{activeTrans.drillSec.nextChallengeBtn}</span>
                            </button>

                            {/* Button 2: Go to Next Level entirely */}
                            <button
                              onClick={handleNextLevel}
                              className="flex items-center justify-center gap-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] cursor-pointer transition active:scale-95 shadow-md shadow-emerald-600/10"
                            >
                              <span>{drillLevel < 3 ? activeTrans.drillSec.nextLevelBtn : activeTrans.drillSec.nextBtnFinal}</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setRay1TargetY(200);
                          setRay2TargetY(220);
                          setDrillFeedback(null);
                          setIsDrillSuccess(false);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {activeTrans.drillSec.resetBtn}
                      </button>
                      <button
                        onClick={verifyDrill}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-lg text-xs font-bold text-white transition cursor-pointer shadow-lg shadow-indigo-600/10"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        {activeTrans.drillSec.checkBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. MISCONCEPTIONS TAB */}
          {activeTab === 'misconceptions' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                  <AlertTriangle className="h-6 w-6" />
                  {activeTrans.misconSec.title}
                </h2>
              </div>

              {/* Grid of customized Myth vs. Reality blocks */}
              <div className="grid gap-6">
                {[
                  {
                    mythEN: "Real images are always upright, virtual images are always inverted.",
                    mythTC: "實像永遠是正立的，虛像永遠是倒立的。",
                    realityEN: "In single lens systems, all real images are inverted, and all virtual images are erect. A virtual image (e.g., magnifying glass view) is erect and magnified, whereas a real image projected on a screen is inverted.",
                    realityTC: "在單透鏡系統中，所有實像均是倒立的，而所有虛像均是正立的。例如，放大鏡看見的虛像是正立放大的；而在光屏上投影產生的實像必定是倒立的。"
                  },
                  {
                    mythEN: "If the top half of a convex lens is covered, only the bottom half of the image is formed on the screen.",
                    mythTC: "若把凸透鏡的上半部分遮住，光屏上便只能得到物體下半部分的像。",
                    realityEN: "This is a classical DSE trap! A complete image is still formed because light rays from every part of the object still pass through the bottom half. However, since less light gets through, the image will simply be dimmer (lower intensity).",
                    realityTC: "這是極經典的 DSE 陷阱！只要仍有部分透鏡外露，光屏上依然會形成物體完整的像。因為物體每一點發出的無數光線中，仍有一半光線能穿過下半部透鏡會聚。唯一變化是因通過光量減少，成像會變暗。"
                  },
                  {
                    mythEN: "Virtual images are purely imaginary and cannot be seen by the human eye.",
                    mythTC: "虛像純粹是虛幻的，人眼無法觀看得到。",
                    realityEN: "We see virtual images directly with our eyes! When you look through a magnifying glass or spectacles, the diverging rays entering your eye are converged by your eye's lens to form a real image on your retina. Virtual images only cannot be projected on a flat screen.",
                    realityTC: "我們每天都能親眼看到虛像！當你使用放大鏡或近視眼鏡時，進入眼睛的折射光線雖然是發散的，但會被眼球晶狀體再次折射並會聚在視網膜上成實像，使我們看得清楚。虛像只是「無法投影到平面光屏上」而已。"
                  },
                  {
                    mythEN: "A concave lens can sometimes produce real images of real objects if u is very large.",
                    mythTC: "假若物距很大，凹透鏡有時也能對實物產生實像。",
                    realityEN: "For real objects, a concave (diverging) lens can ONLY ever form a virtual, erect, and diminished image, regardless of where the object is placed (from zero distance to infinity). It is impossible to form a real image.",
                    realityTC: "對於真實物體，不論物體被放置在甚麼位置（從近在咫尺到無限遠），凹（發散）透鏡恆常只能產生一個「正立、縮小、虛像」，絕不可能產生實像。"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="grid md:grid-cols-12 gap-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                    <div className="md:col-span-5 flex gap-3">
                      <div className="p-2 bg-rose-950/50 rounded-lg text-rose-400 h-fit">
                        <XCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-[11px] uppercase tracking-wider text-rose-400 font-bold mb-1">
                          {activeTrans.misconSec.myth}
                        </h4>
                        <p className="text-sm font-semibold text-slate-200">
                          {lang === 'EN' ? item.mythEN : item.mythTC}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-1 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-slate-600 hidden md:block" />
                      <div className="h-px w-full bg-slate-800 md:hidden my-1"></div>
                    </div>

                    <div className="md:col-span-6 flex gap-3">
                      <div className="p-2 bg-emerald-950/50 rounded-lg text-emerald-400 h-fit">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold mb-1">
                          {activeTrans.misconSec.reality}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {lang === 'EN' ? item.realityEN : item.realityTC}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. EXERCISE TAB */}
          {activeTab === 'exercise' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                  <HelpCircle className="h-6 w-6" />
                  {activeTrans.exerciseSec.title}
                </h2>
              </div>

              {/* Questions Loop */}
              <div className="space-y-8">
                {[activeTrans.exerciseSec.q1, activeTrans.exerciseSec.q2, activeTrans.exerciseSec.q3].map((qObj, idx) => {
                  const qId = `q${idx + 1}`;
                  const isSubmitted = submitted[qId];
                  const chosenOpt = userAnswers[qId];
                  const showHint = showHints[qId];

                  return (
                    <div key={qId} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/80 space-y-4">
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <h3 className="text-md font-semibold text-slate-200 leading-relaxed">
                          {qObj.q}
                        </h3>
                      </div>

                      {/* Options Grid */}
                      <div className="grid gap-2.5 pl-10">
                        {qObj.opts.map((opt, optIdx) => {
                          const isSelected = chosenOpt === optIdx;
                          let btnStyle = "bg-slate-950/50 hover:bg-slate-800 text-slate-300 border-slate-800";
                          
                          if (isSelected) {
                            btnStyle = "bg-indigo-950 border-indigo-500 text-indigo-200";
                          }
                          if (isSubmitted) {
                            if (optIdx === qObj.ans) {
                              btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-950 border-rose-500 text-rose-200 opacity-60";
                            } else {
                              btnStyle = "bg-slate-950/20 text-slate-500 border-slate-900 opacity-40";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectOption(qId, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-sm transition font-medium flex items-center justify-between ${btnStyle} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && optIdx === qObj.ans && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                              {isSubmitted && isSelected && optIdx !== qObj.ans && <XCircle className="h-4 w-4 text-rose-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Controls and Feedback line */}
                      <div className="pl-10 flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowHints(prev => ({ ...prev, [qId]: !showHint }))}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition cursor-pointer"
                          >
                            <Info className="h-3.5 w-3.5" />
                            {activeTrans.exerciseSec.hint}
                          </button>
                          {isSubmitted && (
                            <button
                              onClick={() => resetQuestion(qId)}
                              className="text-xs font-semibold text-slate-400 hover:text-slate-300 flex items-center gap-1 transition cursor-pointer"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              {activeTrans.exerciseSec.retry}
                            </button>
                          )}
                        </div>

                        {!isSubmitted && (
                          <button
                            disabled={chosenOpt === undefined}
                            onClick={() => checkAnswer(qId, qObj.ans)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                              chosenOpt === undefined 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md shadow-indigo-600/10'
                            }`}
                          >
                            {activeTrans.exerciseSec.check}
                          </button>
                        )}
                      </div>

                      {/* Display Hint if triggered */}
                      {showHint && (
                        <div className="ml-10 p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 leading-relaxed">
                          <span className="font-bold text-indigo-400 block mb-1">Hint / 提示:</span>
                          {qObj.hint}
                        </div>
                      )}

                      {/* Display Explanation post-submission */}
                      {isSubmitted && (
                        <div className="ml-10 p-4 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-emerald-400 block mb-1">DSE Explanation / 詳解:</span>
                          {qObj.explain}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. CONSOLIDATION TAB */}
          {activeTab === 'consolidation' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
                  <CheckSquare className="h-6 w-6" />
                  {activeTrans.consolidationSec.title}
                </h2>
              </div>

              {/* Revision Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
                  <thead className="bg-slate-900 text-slate-200 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3 font-semibold">{activeTrans.consolidationSec.tableHeader.lens}</th>
                      <th className="p-3 font-semibold">{activeTrans.consolidationSec.tableHeader.pos}</th>
                      <th className="p-3 font-semibold">{activeTrans.consolidationSec.tableHeader.imgPos}</th>
                      <th className="p-3 font-semibold">{activeTrans.consolidationSec.tableHeader.nature}</th>
                      <th className="p-3 font-semibold">{activeTrans.consolidationSec.tableHeader.app}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      {
                        lens: lang === 'EN' ? "Convex (凸)" : "凸透鏡",
                        pos: "u > 2f",
                        imgPos: "f < v < 2f",
                        nature: lang === 'EN' ? "Real, Inverted, Diminished (實、倒、縮)" : "實、倒、縮小",
                        app: lang === 'EN' ? "Camera / Eye" : "照相機 / 人眼"
                      },
                      {
                        lens: lang === 'EN' ? "Convex (凸)" : "凸透鏡",
                        pos: "u = 2f",
                        imgPos: "v = 2f",
                        nature: lang === 'EN' ? "Real, Inverted, Same Size (實、倒、等)" : "實、倒、等大",
                        app: lang === 'EN' ? "Photocopying machine" : "影印機"
                      },
                      {
                        lens: lang === 'EN' ? "Convex (凸)" : "凸透鏡",
                        pos: "f < u < 2f",
                        imgPos: "v > 2f",
                        nature: lang === 'EN' ? "Real, Inverted, Magnified (實、倒、放)" : "實、倒、放大",
                        app: lang === 'EN' ? "Projector" : "幻燈機"
                      },
                      {
                        lens: lang === 'EN' ? "Convex (凸)" : "凸透鏡",
                        pos: "u < f",
                        imgPos: lang === 'EN' ? "v < 0 (same side)" : "v < 0 (與物同側)",
                        nature: lang === 'EN' ? "Virtual, Erect, Magnified (虛、正、放)" : "虛、正、放大",
                        app: lang === 'EN' ? "Magnifying Glass" : "放大鏡 / 閱讀鏡"
                      },
                      {
                        lens: lang === 'EN' ? "Concave (凹)" : "凹透鏡",
                        pos: lang === 'EN' ? "Any distance (任何位置)" : "任何位置",
                        imgPos: lang === 'EN' ? "v < 0 (inside F)" : "v < 0 (F 以內)",
                        nature: lang === 'EN' ? "Virtual, Erect, Diminished (虛、正、縮)" : "虛、正、縮小",
                        app: lang === 'EN' ? "Spectacles for short-sightedness" : "近視眼鏡 / 門窺眼"
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/35 transition">
                        <td className="p-3 font-semibold text-slate-100">{row.lens}</td>
                        <td className="p-3 font-mono">{row.pos}</td>
                        <td className="p-3 font-mono text-slate-400">{row.imgPos}</td>
                        <td className="p-3 text-slate-200">{row.nature}</td>
                        <td className="p-3 text-indigo-300 font-medium">{row.app}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Checklist Objective Tracker */}
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-indigo-400" />
                  {activeTrans.consolidationSec.checklistTitle}
                </h3>

                <div className="space-y-3">
                  {activeTrans.consolidationSec.checklist.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => toggleChecklistItem(idx)}
                      className="flex gap-3 items-center p-3.5 bg-slate-950/60 rounded-lg border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems[idx]}
                        readOnly
                        className="h-4.5 w-4.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 accent-indigo-500 pointer-events-none"
                      />
                      <span className={`text-sm leading-relaxed transition ${checkedItems[idx] ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 HKDSE Physics Interactive Toolkit. Formulated for high scoring in Section A & B.</p>
      </footer>
    </div>
  );
}
