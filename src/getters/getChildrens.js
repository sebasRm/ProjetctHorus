export const getChildrens = (directory, row, rows) => {
  const dataModificada = directory.children.filter(
    (item) => item.parentId === rows.id
  );
  dataModificada.length > 0 && dataModificada;
};
