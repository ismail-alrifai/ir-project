/** @format */

export enum AppUrlForAccountManagement {
  account = "account",
  createAccount = "account/register",
  blockAccount = "account/block",
  edit = "profile",
  resetPassword = "account/reset-password",
  updatePassword = "account/update-password",
}

export enum AppUrlForClassManagement {
  class = "class",
  createClass = "class",
  classTeachers = "class/class-teachers",
  classChildren = "class/class-childs",
  classSpecialists = "class/class-specialists",
  specialistClasses = "class/specialist-classes",
  teacherClasses = "class/teacher-classes",
  childSpecialists = "class/child-specialists",
  childTeachers = "class/child-teachers",
  childUnassignToClass = "class/child-unassign-to-class",
}

export enum AppUrlForNeedsManagement {
  createNeed = "needs",
  deleteNeed = "needs",
  uploadSoundToNeed = "needs/add-sound-to-need",
  childNeedLogs = "needs/child-need-log",
  addContentWord = "content/word",
  addContentImage = "content/image",
  addContentSound = "content/sound",
  needsUrl = "needs/by-parent",
  updateChildNeedLevel = "needs/update-child-need-level",
}

export enum AppUrlForPep3Management {
  createPep3Test = "pep3-test",
  getQuestionsByDomainId = "pep3-test/question",
  submitDomainAnswers = "pep3-test/submit-domain-answers",
  submitPep3Test = "pep3-test/submit-pep3-test",
  answersOfDomain = "pep3-test/answers-of-domain",
  getDomains = "pep3-test/domain",
  getChildTests = "pep3-test/child-tests",
}
