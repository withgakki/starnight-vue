import store from "@/store"

// 年级 Level 字典
export const levelEnum = [
  { key: 1, value: '一年级' },
  { key: 2, value: '二年级' },
  { key: 3, value: '三年级' }, 
  { key: 4, value: '四年级' }, 
  { key: 5, value: '五年级' }, 
  { key: 6, value: '六年级' },
  { key: 7, value: '初一' }, 
  { key: 8, value: '初二' }, 
  { key: 9, value: '初三' },
  { key: 10, value: '高一' }, 
  { key: 11, value: '高二' }, 
  { key: 12, value: '高三' },
];

// 性别 Sex 字典
export const sexEnum = [
  { key: 1, value: '男' }, 
  { key: 2, value: '女' },
];

// 问题编辑页面 字典
export const questionTypeEnum = [
  { key: 1, value: "/question/edit/singleChoice", name: "单选题" },
  { key: 2, value: "/question/edit/multipleChoice", name: "多选题" },
  { key: 3, value: "/question/edit/trueFalse", name: "判断题" },
  { key: 4, value: "/question/edit/gapFilling", name: "填空题" },
  { key: 5, value: "/question/edit/shortAnswer", name: "简答题" },
];

// 试卷类型 字典
export const examPaperTypeEnum = [
  { key: 1, value: "固定试卷" },
  { key: 4, value: "时段试卷" },
  { key: 6, value: "任务试卷" },
]

export function parseLevel(levelId) {
  const level = formatDict(levelEnum, levelId)
  if (level === undefined || level === null) {
    return "未知"
  }
  return level.value
}

export function parseSex(sexId) {
  const sex = formatDict(sexEnum, sexId)
  if (sex === undefined || sex === null) {
    return "未知"
  }
  return sex.value
}

export function parseExamPaperType(typeId) {
  const type = formatDict(examPaperTypeEnum, typeId)
  if (type === undefined || type === null) {
    return "未知"
  }
  return type.value
}

export function parseQuestionType(typeId) {
  const type = formatDict(questionTypeEnum, typeId)
  if (type === undefined || type === null) {
    return "未知"
  }
  return type.name
}

/**
 * 该方法引用 vuex subject module
 * 请注意在使用该方法前, 使用 this.$store.dispatch('subject/getSubjectList'); 初始化 store
 */
export function parseSubject(subjectId) {
  const subject = store.getters.getSubjectById(subjectId)
  if (subject === undefined || subject === null) {
    return "未知"
  }
  return subject.name
}

// 从数组中获取指定key的值
export const formatDict = function (array, key) {
  for (let item of array) {
    if (item.key === key) {
      return item
    }
  }
  return null
}
