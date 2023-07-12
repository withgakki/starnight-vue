import * as SubjectApi from '@/api/subject'

export const state = {
  subjectList: [],
};

export const mutations = {
  SET_SUBJECT_LIST: (state, subjectList) => {
    state.subjectList = subjectList;
  },
};

export const actions = {
  getSubjectList({
    commit
  }) {
    return new Promise((resolve, reject) => {
      SubjectApi.listSubject()
        .then((response) => {
          const {
            data
          } = response;
          commit("SET_SUBJECT_LIST", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export const getters = {

  getSubjectById: (state) => id => {
    for (let item of state.subjectList) {
      if (item.id === id) {
        return item
      }
      return null
    }
  }

}
