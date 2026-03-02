import type { PrpdProfile } from '../viz/prpd'

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
}

export const defectGroups: DefectGroup[] = [
  { id: 'internal', name: '内部/绝缘缺陷', tagline: '像“里面藏了个小气泡”' },
  { id: 'floating', name: '电位异常/悬浮', tagline: '像“金属片没接地在抖”' },
  { id: 'particle', name: '异物/颗粒运动', tagline: '像“砂粒滚来滚去”' },
  { id: 'corona', name: '尖端/电晕类', tagline: '像“针尖冒小火花”' },
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
  },
  {
    id: 'corona',
    groupId: 'corona',
    title: '尖端/电晕（示例）',
    oneLiner: '像针尖附近电场太尖锐，先从边缘“漏电发光”。',
    seed: 41,
    profile: 'corona',
    threeLines: [
      '它是什么：尖端导致电场极不均匀，局部先发生微放电。',
      '图谱怎么看：在某些相位更容易出现，幅值可能偏低但重复率高。',
      '为什么会这样：电晕更像“持续的细小放电”，叠加成一片。',
    ],
    lookFors: ['是否有高重复率的“薄雾状”密集区', '幅值是否整体偏低', '相位窗口是否较固定'],
    pitfalls: ['把电晕当内部放电（看密度形态差别）', '仪器带宽/阈值设置会影响形态'],
    explain:
      '电晕更像“细小但频繁”的放电：每一次都不算大，但发生次数多，所以图上常出现比较均匀、连续的密集带。',
  },
]

export const casesById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<string, Case>

