import { listAllSubject } from "@/api/subject/index";

const state = {
  subjectList: [],
};

const mutations = {
  SET_SUBJECT_LIST: (state, subjectList) => {
    state.subjectList = subjectList;
  },
};

const actions = {
  getSubjectList({ commit }) {
    return new Promise((resolve, reject) => {
      listAllSubject()
        .then((response) => {
          const { data } = response;
          commit("SET_SUBJECT_LIST", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

