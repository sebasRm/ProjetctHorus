import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar } from "material-table";

import { directory } from "../../helpers/directory";

export const GridView = () => {
  const [data, setData] = useState(directory.children);

  const iconFin = (rowData) => {
    console.log(rowData.extension);

    switch (rowData.extension) {
      case "folder":
        return <i class="fa-solid fa-folder"></i>;

      case "txt":
        return <i class="fa-solid fa-file-lines"></i>;

      default:
        return <i class="fa-solid fa-file-zipper"></i>;
    }
  };

  const [columns, setColumns] = useState([
    {
      title: "",
      field: "extension",
      render: (rowData) => iconFin(rowData),
      align: "right",
      filtering: false,
    },
    { title: "Nombre", field: "nombre" },
    {
      title: "Fecha de modificación",
      field: "fecha_modificacion",
    },
    { title: "Modificado por", field: "modificado_por" },
    {
      title: "Tamaño",
      field: "tamaño",
    },
  ]);

  const handleClick = (row, rows) => {
    const dataModificada = directory.children.filter(
      (item) => item.parentId === rows.id
    );

    dataModificada.length > 0 && setData(dataModificada);
  };

  const handlereturn = () => {
    const index = data[0].path.length - 3;

    if (index > -1) {
      const path = data[0].path[index];

      const dataMod = directory.children.filter(
        (item) => item.path[0] === path
      );
      dataMod.shift();
      return setData(dataMod);
    }

    setData(directory.children);
  };

  let typeIcon = "search";

  console.log(typeIcon);

  return (
    <>
      <MaterialTable
        title="DataTable"
        columns={columns}
        data={data}
        parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
        options={{
          selection: true,
          filtering: true,
        }}
        onRowClick={(row, rows) => handleClick(row, rows)}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <button
                  onClick={handlereturn}
                  label="Chip 1"
                  className="btn btn-danger m-3"
                  style={{ marginRight: 5 }}
                >
                  Atras
                </button>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};
