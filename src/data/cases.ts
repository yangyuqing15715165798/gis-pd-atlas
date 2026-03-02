import type { PrpdProfile } from '../viz/prpd'

export type CaseMark = {
  id: string
  label: string
  phase: [number, number]
  amp: [number, number]
}

export type DefectGroup = {
  id: string
  name: string
  tagline: string
}

export type Case = {
  id: string
  groupId: string
  title: string
  oneLiner: string
  seed: number
  profile: PrpdProfile
  threeLines: string[]
  lookFors: string[]
  pitfalls: string[]
  explain: string
  marks: CaseMark[]
}

export const defectGroups: DefectGroup[] = [
  { id: 'internal', name: '内部/绝缘缺陷', tagline: '像“里面藏了个小气泡”' },
  { id: 'surface', name: '沿面/表面放电', tagline: '像“在表面爬电”' },
  { id: 'floating', name: '电位异常/悬浮', tagline: '像“金属片没接地在抖”' },
  { id: 'particle', name: '异物/颗粒运动', tagline: '像“砂粒滚来滚去”' },
  { id: 'field', name: '电场异常（尖端/毛刺等）', tagline: '像“针尖冒小火花”' },
  { id: 'measurement', name: '测量与干扰', tagline: '先学会“别被噪声骗”' },
  { id: 'compound', name: '复合与强度对比', tagline: '同一张图里可能不止一个故事' },
]

export const cases: Case[] = [
  {
    id: 'internal-void',
    groupId: 'internal',
    title: '内部放电（示例：空隙/气隙）',
    oneLiner: '像绝缘里面藏了个小气泡，电场集中时更容易“打一下”。',
    seed: 11,
    profile: 'internalVoid',
    threeLines: [
      '它是什么：绝缘内部的小空隙导致局部电场更强。',
      '图谱怎么看：在特定相位窗口里更密集，常呈现对称的“成对云团”。',
      '为什么会这样：交流电每转到“最容易击穿”的位置，就更容易放电。',
    ],
    lookFors: ['相位窗口是否成对出现（正/负半周）', '点云是否有明显“密集区”', '幅值分布是否相对稳定'],
    pitfalls: ['噪声点会让图看起来“哪里都有”', '强度变化会让云团上下变厚，但形态不一定变'],
    explain:
      '把交流电想象成一个转盘：转到某些角度时，空隙两端的电压差更大，就更容易“啪”地放一次。很多次叠加，就形成了相位上有规律的点云。',
    marks: [
      { id: 'pos', label: '正半周典型窗口', phase: [35, 85], amp: [0.15, 0.95] },
      { id: 'neg', label: '负半周典型窗口', phase: [215, 265], amp: [0.15, 0.95] },
      { id: 'core', label: '密集核心区（更常出现）', phase: [50, 70], amp: [0.22, 0.65] },
    ],
  },
  {
    id: 'surface',
    groupId: 'surface',
    title: '沿面放电（示例）',
    oneLiner: '像绝缘表面在“爬电”，路径变长后更容易出现连续放电痕迹。',
    seed: 17,
    profile: 'surface',
    threeLines: [
      '它是什么：放电沿着绝缘表面发展，不一定发生在“里面”。',
      '图谱怎么看：相位窗口往往更宽，点云更“铺开”。',
      '为什么会这样：表面状态（潮湿/污秽/缺陷）让放电更容易持续发生。',
    ],
    lookFors: ['窗口是否更宽（比内部放电更“铺”）', '密集区是否更连续', '幅值是否时强时弱（受表面状态影响）'],
    pitfalls: ['把沿面放电当悬浮电位（都可能“散”，但沿面更像铺开）', '阈值设置会改变“铺开感”'],
    explain:
      '沿面放电可以理解成“在表面走路”：表面越容易导电/越粗糙，放电越可能沿着表面路径多次发生，所以点云往往更宽、更像一片。',
    marks: [
      { id: 'pos', label: '正半周宽窗口', phase: [75, 145], amp: [0.10, 0.95] },
      { id: 'neg', label: '负半周宽窗口', phase: [255, 325], amp: [0.10, 0.95] },
      { id: 'sheet', label: '更“铺开”的区域', phase: [95, 130], amp: [0.18, 0.70] },
    ],
  },
  {
    id: 'floating',
    groupId: 'floating',
    title: '悬浮电位（示例）',
    oneLiner: '像一片金属小片没接地，在电场里被反复“充放电”。',
    seed: 23,
    profile: 'floating',
    threeLines: [
      '它是什么：导体/金属件没有可靠连接，电位飘来飘去。',
      '图谱怎么看：点云常更“散”、窗口可能更宽，且稳定性较差。',
      '为什么会这样：悬浮体被电场带着充电，到阈值就放电释放。',
    ],
    lookFors: ['点云分布是否比内部放电更散', '相位窗口是否更宽或有漂移', '是否出现“忽多忽少”的状态'],
    pitfalls: ['把“散”误认为噪声（要看是否仍有相位规律）', '不同结构下表现差异大，别死记一张图'],
    explain:
      '悬浮体像一个小电容：电场让它慢慢充电，充到某个程度就放电一下又归零。因为它的“充电过程”会被环境影响，所以图谱可能更不稳定。',
    marks: [
      { id: 'pos', label: '正半周较宽窗口', phase: [55, 125], amp: [0.10, 0.95] },
      { id: 'neg', label: '负半周较宽窗口', phase: [235, 305], amp: [0.10, 0.95] },
      { id: 'scatter', label: '更“散”的分布感', phase: [70, 110], amp: [0.20, 0.80] },
    ],
  },
  {
    id: 'particle',
    groupId: 'particle',
    title: '自由金属颗粒运动（示例）',
    oneLiner: '像砂粒在气室里滚来滚去，放电位置变了，图谱也会跟着漂。',
    seed: 37,
    profile: 'particle',
    threeLines: [
      '它是什么：金属颗粒在电场力作用下移动。',
      '图谱怎么看：相位窗口/云团位置会随时间“慢慢挪”。',
      '为什么会这样：颗粒位置改变 → 电场最强的位置改变 → 放电更换“发生点”。',
    ],
    lookFors: ['同一时间段内相位规律是否清晰', '不同时间段是否出现整体偏移', '密度是否随时间段变化明显'],
    pitfalls: ['把漂移当成测量不稳定（有时确实是颗粒运动）', '如果采样时间太短，漂移看不出来'],
    explain:
      '你可以把它理解成“放电的开关”在移动：颗粒滚到哪里，哪里电场更尖锐，放电更容易发生。时间拉长后，你会看到图谱的主要密集区在缓慢移动。',
    marks: [
      { id: 'pos', label: '起始窗口（会漂）', phase: [45, 95], amp: [0.15, 0.95] },
      { id: 'neg', label: '对称窗口（会漂）', phase: [225, 275], amp: [0.15, 0.95] },
      { id: 'drift', label: '“漂移感”提示区', phase: [60, 120], amp: [0.20, 0.70] },
    ],
  },
  {
    id: 'protrusion',
    groupId: 'field',
    title: '金属尖端/毛刺（示例）',
    oneLiner: '像针尖把电场“挤尖了”，局部更容易击穿，放电更“扎实”。',
    seed: 29,
    profile: 'protrusion',
    threeLines: [
      '它是什么：尖端/毛刺使电场畸变，局部场强显著增大。',
      '图谱怎么看：窗口相对更窄、更集中，幅值可能更高。',
      '为什么会这样：电场被挤在尖端附近，触发条件更明确。',
    ],
    lookFors: ['相位窗口是否更“窄而集中”', '点云是否更“高”（幅值偏大）', '对称性是否仍存在（正负半周）'],
    pitfalls: ['和内部放电混淆（内部放电更像“成对云团”，尖端更集中更扎）', '不同电压水平下幅值会变，先看形态再看高低'],
    explain:
      '尖端/毛刺就像把电场线挤到一个很小的地方：当交流电转到某些相位，尖端附近更容易率先发生放电，所以看起来更集中、更像“扎在那一片”。',
    marks: [
      { id: 'pos', label: '正半周集中窗口', phase: [20, 60], amp: [0.20, 1.00] },
      { id: 'neg', label: '负半周集中窗口', phase: [200, 240], amp: [0.20, 1.00] },
      { id: 'high', label: '更高幅值区', phase: [30, 55], amp: [0.45, 0.95] },
    ],
  },
  {
    id: 'intermittent',
    groupId: 'field',
    title: '接触不良/间歇性放电（示例）',
    oneLiner: '像“忽明忽暗”的接触点：有时放电很密，有时又像没发生。',
    seed: 53,
    profile: 'intermittent',
    threeLines: [
      '它是什么：接触状态不稳定，放电呈现“时有时无”。',
      '图谱怎么看：密度忽高忽低，甚至看起来像缺了一段。',
      '为什么会这样：接触/压力/微动改变了触发条件。',
    ],
    lookFors: ['密度是否呈现明显“段落感”', '相位规律是否仍存在（有规律但不连续）', '同一测试内是否出现两种状态'],
    pitfalls: ['误以为采集系统故障（先排除采集链路）', '如果采样太短，可能只看到其中一种状态'],
    explain:
      '间歇性放电的核心不是“形状多奇怪”，而是“稳定性差”：它会在一些时段突然变得很活跃，过一会儿又安静下来，所以图谱密度会出现明显起伏。',
    marks: [
      { id: 'pos', label: '出现时的相位窗口', phase: [50, 100], amp: [0.10, 1.00] },
      { id: 'neg', label: '对称窗口', phase: [230, 280], amp: [0.10, 1.00] },
      { id: 'gap', label: '稀疏/缺段感', phase: [120, 170], amp: [0.00, 1.00] },
    ],
  },
  {
    id: 'noise',
    groupId: 'measurement',
    title: '外来噪声/干扰（示例）',
    oneLiner: '像“满天星”：看起来到处都是点，但不一定有清晰的相位规律。',
    seed: 7,
    profile: 'noise',
    threeLines: [
      '它是什么：不是设备缺陷，而是外部干扰/系统噪声。',
      '图谱怎么看：点分布更随机、更“满天”，缺乏稳定窗口。',
      '为什么会这样：噪声不是被交流相位“驱动”的，所以相位相关性弱。',
    ],
    lookFors: ['有没有清晰的相位窗口（通常没有）', '点是否近似均匀铺满', '换测点/换屏蔽后是否明显改变'],
    pitfalls: ['把噪声当“多源缺陷”（多源也有规律，噪声更随机）', '阈值太低会把噪声全收进来'],
    explain:
      '判断噪声最直观的思路是：它“不听相位的话”。真正的局放往往在某些相位更容易发生，而噪声更像随机落点，缺少稳定的相位窗口与对称结构。',
    marks: [
      { id: 'all', label: '“满天星”随机覆盖', phase: [0, 360], amp: [0.00, 1.00] },
      { id: 'noWin', label: '缺少明确窗口', phase: [40, 140], amp: [0.00, 1.00] },
      { id: 'noSym', label: '对称性不明显', phase: [200, 320], amp: [0.00, 1.00] },
    ],
  },
  {
    id: 'multi-source',
    groupId: 'compound',
    title: '多源叠加（示例：内部放电 + 电晕）',
    oneLiner: '像一张照片里有两个人：一部分点像内部放电，另一部分像电晕。',
    seed: 101,
    profile: 'multiSource',
    threeLines: [
      '它是什么：同一时段同时存在两种（或更多）放电来源。',
      '图谱怎么看：会出现两套“风格不同”的点云结构。',
      '为什么会这样：缺陷叠加时，图谱就是“混合饮料”，不是单一口味。',
    ],
    lookFors: ['是否能分出“两个族群”（一团 vs 一片）', '不同族群的幅值/密度差别', '是否能在相位上分开'],
    pitfalls: ['把多源当噪声（多源仍有规律）', '只盯一团云而忽略另一类结构'],
    explain:
      '多源叠加不是“更复杂就更高级”，而是提醒你：这张图里可能不止一个缺陷。一个常见组合是：内部放电形成成对云团，电晕形成更薄的雾状带，两者叠在一起就像两种笔触叠加。',
    marks: [
      { id: 'internal', label: '内部放电族群', phase: [35, 85], amp: [0.15, 0.95] },
      { id: 'corona', label: '电晕族群', phase: [5, 55], amp: [0.02, 0.45] },
      { id: 'mix', label: '叠加混合区', phase: [25, 75], amp: [0.10, 0.60] },
    ],
  },
  {
    id: 'intensity-compare',
    groupId: 'compound',
    title: '同缺陷不同强度对比（示例）',
    oneLiner: '像把同一种“指纹”按得更重：形态类似，但幅值与密度会变化。',
    seed: 202,
    profile: 'intensityHigh',
    threeLines: [
      '它是什么：同一类缺陷在不同工况下强度不同。',
      '图谱怎么看：形态相似，但点更高/更密，或云团变厚。',
      '为什么会这样：电压水平/缺陷发展程度会改变放电强弱与次数。',
    ],
    lookFors: ['形态是否保持（窗口/对称性）', '幅值是否整体抬升', '密度是否明显增加'],
    pitfalls: ['把“强度变化”误当“缺陷类型变化”', '只看高低不看形态（容易误判）'],
    explain:
      '教学上最重要的是：先认“形态指纹”，再谈强弱。强度变化往往是同一张指纹按得更重或更轻：图谱结构还在，但点更高、更密，云团更厚。',
    marks: [
      { id: 'pos', label: '窗口仍在（形态指纹）', phase: [35, 85], amp: [0.15, 1.00] },
      { id: 'neg', label: '对称窗口仍在', phase: [215, 265], amp: [0.15, 1.00] },
      { id: 'raise', label: '幅值抬升区', phase: [50, 75], amp: [0.40, 0.98] },
    ],
  },
]

export const casesById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<string, Case>
