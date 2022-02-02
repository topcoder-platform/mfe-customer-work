export const getWorks = (state) => state.myWork.works;

export const getWorksCancelSource = (state) => state.myWork.worksCancelSource;

export const getWorksCount = (state) => state.myWork.works.length;

export const getWorksError = (state) => state.myWork.worksError;

export const getWorksIsLoading = (state) => !!state.myWork.worksCancelSource;
