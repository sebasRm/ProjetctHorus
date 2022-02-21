import React, { useRef, useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Treebeard } from "react-treebeard";
import {
  Modal,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { useForm } from "../../hooks/useForm";

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
      name: "parent",
      children: [
        {
          name: "nested parent",
          children: [{ name: "nested child 1" }, { name: "nested child 2" }],
        },
      ],
    },
  ],
};

export const PanelVistaArbol = () => {
  const [data, setData] = useState(directory);
  const [cursor, setCursor] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [agregarCarpeta, setAgregarCarpeta] = useState("");
  const [estado, setEstado] = useState("");

  const [crearCarpetaValues, handleCrearCarpeta] = useForm({
    carpeta: "",
  });

  const { carpeta } = crearCarpetaValues;

  const onToggle = (node, toggled) => {
    setCursor(node);

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setData(Object.assign({}, data));
    setCursor(node);
  };

  var valorCopiar;

  var copiaObjeto;
  const obj = {};

  function handleClick(e, d) {
    const nameItem = d.target.innerHTML;
    const nojoHijos = d.foo.children;
    copiaObjeto = {
      name: nameItem,
      children: nojoHijos,
    };

    setEstado(nameItem);
    //console.log(estado)

    findObject(data, "name", "loading parent", copiaObjeto);
    // console.log(data);
    // valorCopiar=nameItem;
    //.__reactEventHandlers$f6wpoyzd59
  }

  const crearCarpeta = (datos) => {
    const nameItem = datos.target.innerHTML;
    console.log(datos);
  };

  function handleCrear(e, datos) {
    setAbierto(!abierto);
    const nameItem = datos.target.innerHTML;
    const nojoHijos = datos.foo.children;
    copiaObjeto = {
      name: nameItem,
      children: nojoHijos,
    };

    crearCarpeta(datos);
  }

  //console.log(estado)

  function clickPegar(e, datos) {
    const nameItem = datos.target.innerHTML;

    console.log(copiaObjeto);
    findObject(data, "name", nameItem, copiaObjeto);
  }

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
    console.log(data);
  };

  const copy = (e) => {
    console.log(cursor);
  };

  const menuConfig = {
    Copiar: (e) => copy(e),
    "Crear carpeta": () => console.log("Crear carpeta"),
    "Añadir a favoritos": () => console.log("Crear carpeta"),
    Propiedades: () => console.log("Crear carpeta"),
  };
  const decorators = {
    Toggle: (props) => {
      return (
        <div style={props.style}>
          <svg height={props.height} width={props.width}>
            // Vector Toggle Here
          </svg>
        </div>
      );
    },
  };

  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}

      <ContextMenuTrigger id="same_unique_identifier">
        <Treebeard className="toggle" data={data} onToggle={onToggle} />
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem
          data={{ foo: cursor }}
          onClick={handleClick}
          onToggle={onToggle}
        >
          Copiar
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleCrear}>
          Crear carpeta
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Añair a favoritos
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Propiedades
        </MenuItem>

        <MenuItem className="pegar" data={{ foo: "bar" }} onClick={clickPegar}>
          Pegar
        </MenuItem>
      </ContextMenu>

      <Modal isOpen={abierto}>
        <ModalHeader>Crea una carpeta</ModalHeader>
        <FormGroup>
          <Label>Nombre de carpeta</Label>
          <Input
            name="carpeta"
            value={carpeta}
            onChange={handleCrearCarpeta}
            className="nombreCarpeta"
            type="text"
            placeholder="Escriba nombre de la carpeta"
          />
        </FormGroup>

        <ModalFooter>
          <Button onClick={crearCarpeta}>Crear Carpeta</Button>
          <Button onClick={() => setAbierto(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

{
  /*
        <div className="App">
      <div className="box" onContextMenu={useCM(menuConfig)}>
        <code>
          <Treebeard data={data} onToggle={onToggle} />
        </code>
      </div>
      {contextMenu}
    </div>

<Treebeard data={data} onToggle={onToggle} />;

  */
}
