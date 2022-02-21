import { types } from "../types/types";

const directory = {
  name: "root",
  toggled: true,
  children: [
    {
      name: "parent",
      children: [{ name: "child1" }, { name: "child2" }],
    },
    {
      name: "loading parent",
      children: [{ name: "childLoadingf1" }, { name: "childLoadingf2" }],
    },
    {
      name: "parent2",
      children: [
        {
          name: "nested parent",
          children: [{ name: "nested child 1" }, { name: "nested child 2" }],
        },
      ],
    },
  ],
};

const initialState = {
  files: directory.children,
  activeFile: "",
  nodo: "",
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.gestionSetActive:
      return {
        ...state,
        activeFile: action.payload,
      };

    case types.gestionAddNew:
      const findObject = (obj = {}, key, value, copiaObjeto = {}) => {
        const recursiveSearch = (obj = {}) => {
          if (!obj || typeof obj !== "object") {
            return;
          }
          if (obj[key] === value) {
            if (obj["children"]) {
              obj["children"].push(copiaObjeto);
            } else {
              obj["children"] = [];
              obj["children"].push(copiaObjeto);
            }
          }
          Object.keys(obj).forEach(function (k) {
            recursiveSearch(obj[k]);
          });
        };
        recursiveSearch(obj);
      };
      findObject(
        state.files,
        "name",
        action.payload.active,
        action.payload.event
      );
      return {
        ...state,
      };

    default:
      return state;
  }
};
